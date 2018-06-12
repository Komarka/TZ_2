<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserInfo;
use App\User;
use App\FriendsRequest;
use App\Friends;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function search(Request $request){
    if(!empty(ucwords(strtolower($request->query()['search'])))){
    	$user=$this->searchForUserByName($request->query()['search']);
    	return $user;
    }
    }


    private function searchForUserByName($name){
    	$user=User::select('id','name')->where('name',$name)->get();
    	$user_array=[];
    	foreach ($user as $u) {
    	$user_array['user'][]=$this->getUserInfo($u->id,$u->name);
    	}
    	return $user_array;
    }


    private function getUserInfo($id,$name){
        $hidden=Auth::user()->id === $id ? true : false;
        $friend_request_sended=FriendsRequest::where('receiver_id',$id)->get()->isEmpty(); // Save in Session for the socket
        $is_friend_1=Friends::where(['user_id'=>Auth::id(),'friend_id'=>$id])->get()->isEmpty();
        $is_friend_2=Friends::where(['user_id'=>$id,'friend_id'=>Auth::id()])->get()->isEmpty();
    	return ['info'=>UserInfo::select('age','bio','role')->where('user_id',$id)->get()->toJson(),'user_name'=>$name,'user_id'=>$id,'random_str'=>str_random(5),'hidden'=>$hidden,'friend_sended'=>!$friend_request_sended,'is_friend_1'=>!$is_friend_1,'is_friend_2'=>!$is_friend_2];
    }


}
