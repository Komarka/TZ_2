import React from 'react';
import './ViewedMessage.css';
import { Link } from 'react-router';
const ViewedMessage=(props)=>{
  let id=props.info[0];
  let text=props.info[1].text;
  let date=props.info[1].date;
  let name=props.info[1].name;
  let route=`/message/${id}`;
  let friend_route=`/friend/${id}`;
let image=`http://social/img/users/${id}.jpeg?${Math.random()}`;
return (
  <div className="list-group hideOverflow  ">

  <Link to={route} className="list-group-item  ">

  <div>
  <img className="media-object" src={image} onError={(e)=>{e.target.src="../public/img/users/user.png"}} width='70px' height='80px' />

  </div>
  <div id='extra'>

   <div> <h4 className=" extra"><Link to={friend_route}>{name}</Link></h4></div>
    <div><h4 className="date extra">{date}</h4></div>
   <div> <p className="extra text">{text}</p></div>
    </div>
  </Link>
</div>
  )
}

export default ViewedMessage;