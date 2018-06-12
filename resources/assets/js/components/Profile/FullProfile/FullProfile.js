import React from 'react';
import { Link } from 'react-router';
import './FullProfile.css';
const FullProfile=(props)=>{
  let avatar_path=localStorage.getItem("has_image")== 'true' ? `http://social/img/users/${document.getElementById('user_id').value}.jpeg?${Math.random()}`: `../public/img/users/user.png`;

  return (
  	 <div className="card hovercard">
        <div className="card-background">
            <img className="card-bkimg" alt="" src={avatar_path}/>
        </div>
        <div className="useravatar">
            <img alt="" src={avatar_path}/>
        </div>
        <div className="card-info">

        </div>
    </div>
  	)
     }

export default FullProfile;