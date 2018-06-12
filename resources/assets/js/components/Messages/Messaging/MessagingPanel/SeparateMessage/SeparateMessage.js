import React from 'react';

const SeparateMessage=(props)=>{
  let img=`http://social/img/users/${props.message.from_id}.jpeg?${Math.random()}`;
  let li=props.message.my_message === true ?  <li className="self">
        <div className="avatar"><img src={img} onError={(e)=>{e.target.src="../public/img/users/user.png"}} draggable="false"/></div>
      <div className="msg">
        <p>{props.message.message}</p>
        <time>{props.message.date}</time>
      </div>
    </li> :   <li className="other">
        <div className="avatar"><img src={img} onError={(e)=>{e.target.src="../public/img/users/user.png"}} draggable="false"/></div>
      <div className="msg">
        <p>{props.message.message}</p>
        <time>{props.message.date}</time>
      </div>
    </li>
  return <div>{li}</div>

}
export default SeparateMessage;