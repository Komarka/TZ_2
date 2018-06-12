<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Cookie;
class MessageController extends Controller
{
	

    public function send(Request $request){
if($request->method('post')){
	$name=User::select('name')->where('id',$request->input('send_from'))->first();
	$to_name=User::select('name')->where('id',$request->input('send_to'))->first();
	$messages_update=Message::where(['from_id'=>$request->input('send_to'),'to_id'=>$request->input('send_from')])->update(['viewed'=>1]);
$message=new Message;
$message->to_id=(int)$request->input('send_to');
$message->from_id=(int)$request->input('send_from');
$message->date=Carbon::now();
$message->message=$request->input('message');
$message->name=$name->name;
$message->to_name=$to_name->name;
$message->save();
    }
}

public function getMessages(){
		$names=[];
		$not_viewed_names=Message::select('name')->where(['to_id'=>Auth::id(),'viewed'=>0])->orderBy('date', 'asc')->get();
foreach ($not_viewed_names as $value) {
	array_push($names, $value->name);
}

$viewed_messages=Message::select('from_id','message','date','name')->where(['to_id'=>Auth::id(),'viewed'=>1])->orderBy('date', 'asc')->get()->toJson();
$sended_not_viewed_messages=Message::select('to_id','to_name','from_id','message','date','name')->where(['from_id'=>Auth::id(),'viewed'=>0])->orderBy('date', 'desc')->first();
$sended_viewed_messages=Message::select('to_id','to_name','from_id','message','date','name')->where(['from_id'=>Auth::id(),'viewed'=>1])->orderBy('date', 'desc')->first();
$sended_viewed_messages= !is_null($sended_viewed_messages) ? $sended_viewed_messages->toJson() : $sended_viewed_messages;
$sended_not_viewed_messages= !is_null($sended_not_viewed_messages) ? $sended_not_viewed_messages->toJson() : $sended_not_viewed_messages;
$not_viewed_messages=Message::select('from_id','message','date','name')->where(['to_id'=>Auth::id(),'viewed'=>0])->orderBy('date', 'asc')->get()->toJson();
	

return ['not_viewed_messages'=>$not_viewed_messages,'viewed_messages'=>$viewed_messages,'sended_viewed_messages'=>$sended_viewed_messages,'sended_not_viewed_messages'=>$sended_not_viewed_messages,'names_not_viewed'=>$names];
}


public function getAllMessages($to_id){
	$from_id=Auth::id();
	$entered=User::find($from_id);
	$entered->entered_dialogue_with=$to_id;
	$entered->save();
	$update_1=Message::where(['to_id'=>$from_id,'from_id'=>$to_id])->update(['viewed'=>1]);
	$messages_from_user=Message::select('message','date','from_id','name','to_id','to_name')->where(['to_id'=>$to_id,'from_id'=>$from_id])->orderBy('date', 'asc')->get()->toArray();
	$messages_from_me=Message::select('message','date','from_id','name','to_id','to_name')->where(['to_id'=>$from_id,'from_id'=>$to_id])->orderBy('date', 'asc')->get()->toArray();
	$messages=array_merge($messages_from_me,$messages_from_user);
	usort($messages, function($a1, $a2) {
   $v1 = strtotime($a1['date']);
   $v2 = strtotime($a2['date']);
   return $v1 - $v2; 
});
foreach ($messages as  &$value) {
	if($value['from_id']===$from_id){
		$value['my_message']=true;
	}else{
		$value['my_message']=false;
	}
}
$status=User::select('online_status','leave_time','name')->where('id',$to_id)->first();

	return['messages'=>json_encode($messages),'status'=>$status->online_status,'leave_time'=>$status->leave_time,'to_name'=>$status->name];
}

public function getDialogMessages($to_id){
	$from_id=Auth::id();
	$is_entered_dialogue_me=User::where(['id'=>$from_id,'entered_dialogue_with'=>$to_id])->get()->isEmpty();
$is_entered_dialogue_he=User::where(['id'=>$to_id,'entered_dialogue_with'=>$from_id])->get()->isEmpty();
if($is_entered_dialogue_he===false  && $is_entered_dialogue_me===false ){
$update_1=Message::where(['to_id'=>$from_id,'from_id'=>$to_id])->update(['viewed'=>1]);
}

	$messages_from_user=Message::select('message','date','from_id','name','to_id','to_name')->where(['to_id'=>$to_id,'from_id'=>$from_id])->orderBy('date', 'asc')->get()->toArray();
	$messages_from_me=Message::select('message','date','from_id','name','to_id','to_name')->where(['to_id'=>$from_id,'from_id'=>$to_id])->orderBy('date', 'asc')->get()->toArray();
	$messages=array_merge($messages_from_me,$messages_from_user);
	usort($messages, function($a1, $a2) {
   $v1 = strtotime($a1['date']);
   $v2 = strtotime($a2['date']);
   return $v1 - $v2; 
});
foreach ($messages as  &$value) {
	if($value['from_id']===$from_id){
		$value['my_message']=true;
	}else{
		$value['my_message']=false;
	}
}
$status=User::select('online_status','leave_time','name')->where('id',$to_id)->first();

	return['messages'=>json_encode($messages),'status'=>$status->online_status,'leave_time'=>$status->leave_time,'to_name'=>$status->name];
}
}
