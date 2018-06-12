<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table='messages';
     protected $fillable = [ 'to_id','from_id' ,'message','date','name'];
    public $timestamps=false;

}
