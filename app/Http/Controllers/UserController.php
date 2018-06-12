<?php

namespace App\Http\Controllers;
//сделать приватніе методі одинаковые картинки и перезагрузку стейта
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\UserInfo;
use App\User;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
class UserController extends Controller
{
    public function index(){
          if(Auth::check()) {
   $user=User::find(Auth::id());
   $user->online_status='online';
   $user->leave_time=null;
   $user->save();
}
    	return view('index');
    }
    public function getUserInfo(){
    	$user_info=UserInfo::where('user_id',Auth::id())->get();
    	$has_image=file_exists(public_path('/img/users/'.Auth::user()->id.'.jpeg')) ? true : false;
    	return ['user_info'=>$user_info->toJson(),'user_name'=>Auth::user()->id,'user_email'=>Auth::user()->email,'has_image'=>$has_image];
    }

    public function upload(Request $request){
  if ($request->method('post')){
    $user_info=UserInfo::find((int)$request->input('id'));
   $toDO=$user_info ? $this->updateUserInfo($user_info,$request) : $this->createUserInfo($request);	  	
}

if($request->hasFile('file')){
  $this->savePhoto($request->file('file'));
 }
 return ['user'=>$toDO];

}

    	 

    
    private function updateUserInfo($user_info,$request){
    	$user_info->age= $request->has('age') ? (int)$request->input('age') : $user_info->getOriginal('age');
    	$user_info->bio=$request->has('bio') ? $request->input('bio') : $user_info->getOriginal('bio');
    	$user_info->save();
    	return $user_info->toJson();

    }
    private function createUserInfo($request){
    	$user_create =new UserInfo;
    	$user_create->age=$request->has('age') ? (int)$request->input('age'): 0;
    	$user_create->bio=$request->has('bio') ? $request->input('bio'): null;
    	$user_create->role='User';
    	$user_create->user_id=Auth::id();
    	$user_create->save();
    	return $user_create->toJson();
    }


    private function savePhoto($photo){
 $photo_name = Auth::user()->id.'.jpeg';
  $img = Image::make($photo->getRealPath())->stream();
  
  Storage::disk('public')->put($photo_name, $img);

    }


   public function  onUserLeft(Request $request){
    if($request->ajax()){
      $user=User::find(Auth::id());
   $user->online_status='offline';
   $user->leave_time= Carbon::now();
   $user->save();
    }
   }
public function onUserLeftDialogue(Request $request){
   if($request->ajax()){
      $user=User::find(Auth::id());
   $user->entered_dialogue_with=null;
   $user->save();
    }
}
}
