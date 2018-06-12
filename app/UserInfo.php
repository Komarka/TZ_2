<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    protected $table='user_info';
     protected $fillable = ['age','bio','role','user_id'];
     public $timestamps=false;
}
