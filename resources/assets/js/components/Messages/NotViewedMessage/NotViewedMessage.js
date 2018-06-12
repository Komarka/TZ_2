import React from 'react';
import './NotViewedMessage.css';
import { Link } from 'react-router';
const NotViewedMessage=(props)=>{
	let id=props.info[0];
	let badge_count=props.info[1].count;
	let text=props.info[1].text;
	let date=props.info[1].date;
	let name=props.info[1].name;
  let route=`/message/${id}`;
	let friend_route=`/friend/${id}`;
let image=`http://social/img/users/${id}.jpeg?${Math.random()}`;
return (
	<div className="list-group hideOverflow " >

  <Link to={route} className="list-group-item active ">

  <div>
  <img className="media-object" src={image}  onError={(e)=>{e.target.src="../public/img/users/user.png"}} width='70px' height='80px' />

  </div>
  <div id='extra' >
   <div> <h4 className=" extra" id='message'><Link to={friend_route} id='message_name'>{name}</Link></h4></div>
    <div><h4 className="date extra">{date}</h4></div>
   <div> <p className="extra">{text}</p></div>
   <div id='count'><span className="badge">{badge_count}</span></div>
    </div>
  </Link>
</div>
	)
}
export default NotViewedMessage;