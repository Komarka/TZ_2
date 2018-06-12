import React from 'react';
import './SendedNotViewed.css';
import { Link } from 'react-router';
const SendedNotViewed=(props)=>{
  let to_id=props.info.to_id;
  let message=props.info.message;
  let to_name=props.info.to_name;
  let from_name=props.info.name;
  let from_id=props.info.from_id;
  let date=props.info.date;
  let route=`/message/${to_id}`
    let friend_route=`/friend/${to_id}`;
let image_friend=`http://social/img/users/${to_id}.jpeg?${Math.random()}`;
let my_image=`http://social/img/users/${from_id}.jpeg?${Math.random()}`;
  return (
  <div className="list-group hideOverflow  ">

  <Link to={route} className="list-group-item  ">

  <div>
  <img className="media-object" src={image_friend} onError={(e)=>{e.target.src="../public/img/users/user.png"}} width='70px' height='80px' />

  </div>
  <div id='extra'>

   <div> <h4 className=" extra"><Link to={friend_route}>{to_name}</Link></h4></div>
    <div><h4 className="date extra">{date}</h4></div>
   <div id='sended_not_viewed'>

  <img className="media-object" src={my_image} onError={(e)=>{e.target.src="../public/img/users/user.png"}} width='30px' height='40px' />
    <p className="extra text">{message}</p></div>
    </div>
  </Link>
</div>
  )
}
 

export default SendedNotViewed;