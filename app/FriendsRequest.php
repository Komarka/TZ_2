<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FriendsRequest extends Model
{
    protected $table='friends_request';
     protected $fillable = ['sender_id','receiver_id','request_status'];
     public $timestamps=false;

}
