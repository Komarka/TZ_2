<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SocketInfo extends Model
{
     protected $table='socket_info';
     protected $fillable = [ 'from_id','to_id'];
    public $timestamps=true;
}
