<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\FriendsRequest;
use App\User;
use App\Friends;
use App\UserInfo;
class FriendsController extends Controller
{
    public function addFriend(Request $request){
    if ($request->method('post') && $request->has('friend_id')){
    $friend_request = new FriendsRequest;
        $friend_request->sender_id = Auth::id();
        $friend_request->receiver_id=(int)$request->input('friend_id');
        $friend_request->request_status='sended';
        $friend_request->save();
    }

}

    public function getNews(){
    	$news=FriendsRequest::select('sender_id')->where(['receiver_id'=>Auth::id(),'request_status'=>'sended'])->get();
    $news_array=[];
    foreach ($news as $n) {
    	$news_array['friend_request'][]=$this->getUserInfo($n->sender_id);
    	}
    	return $news_array;
    }


    private function getUserInfo($id){
return ['user_info'=>User::select('name','id')->where('id',$id)->get()->toJson()];
    }


    public function acceptFriend(Request $request){
    	 if ($request->method('post') && $request->has('sender_id')){
    	$friend=new Friends;
    	$friend->user_id=Auth::id();
    	$friend->friend_id=$request->input('sender_id');
    	$friend->save();
    	$this->friendRequestDelete($request->input('sender_id'),Auth::id());
    }
}

    public function cancelFriend(Request $request){
    	 if ($request->method('post') && $request->has('sender_id')){
    	$this->friendRequestDelete($request->input('sender_id'),Auth::id());
    }
    }

    private function friendRequestDelete($sender_id,$receiver_id){
    	return FriendsRequest::where(['receiver_id'=>$receiver_id,'sender_id'=>$sender_id])->delete();
    }

    public function getFriendsList(){
        $friends=[];
        $list_1=Friends::select('friend_id')->where('user_id',Auth::id())->get()->toArray();
        $list_2=Friends::select('user_id')->where(['friend_id'=>Auth::id()])->get()->toArray();
        $friends_list=array_merge($list_1,$list_2);
foreach ($friends_list as  $list) {
    foreach ($list as $id) {
    $friends[]=User::select('id','name','online_status','leave_time')->where('id',$id)->get()->toJson();
    }
}
return ['friends'=>$friends];
      
    }
  
 public function onlineCount(){
    $count=0;
    $list_1=Friends::select('friend_id')->where('user_id',Auth::id())->get()->toArray();
        $list_2=Friends::select('user_id')->where(['friend_id'=>Auth::id()])->get()->toArray();
        $friends_list=array_merge($list_1,$list_2);
        foreach ($friends_list as  $list) {
    foreach ($list as $id) {
    $count+=User::where(['id'=>$id,'online_status'=>'online'])->count();
    }
}
return ['online_count'=>$count,'has_friends'=>$this->hasFriends()];
 }

 private function hasFriends(){
    $count=0;
    $list_1=Friends::where('user_id',Auth::id())->count();
        $list_2=Friends::where(['friend_id'=>Auth::id()])->count();
        $count+=$list_1+$list_2;
        return $count > 0 ? true: false;
 }

 public function getFriendInfo($id){
    $user_info=UserInfo::where('user_id',$id)->get();
    $user=User::where('id',$id)->get();
    $merged = $user_info->merge($user);
$result = $merged->all();
return $result;
 }
 public function removeFriend($id){
    $delete_relation_1=Friends::where(['user_id'=>Auth::id(),'friend_id'=>$id])->delete();
    if(!$delete_relation_1){
    $delete_relation_2=Friends::where(['user_id'=>$id,'friend_id'=>Auth::id()])->delete();
}

 }



}
