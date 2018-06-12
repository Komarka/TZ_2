import React from 'react';
import './MessagingPanel.css';
import OneMessage from './OneMessage/OneMessage';
import SeparateMessage from './SeparateMessage/SeparateMessage';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
const MessagingPanel=(props)=>{

 function handleTyping(event){
   if(event.key == 'Enter' ){
    let info=[];
  let message=event.target.value;
  let from_id=document.getElementById('user_id').value;
  let name=document.getElementById('user_name').value;
let to_id=props.withId;
let to_name=props.to_name;

info.push(from_id);
info.push(to_id);
info.push(name);
info.push(to_name);
info.push(message);

info=JSON.stringify(info);

  _socket.send(info);
  event.target.value='';
  }
 }
  function handleClick(e){
    e.preventDefault();
    if(e.target.id==='back'){
      browserHistory.goBack();
    }
  }




 if(Array.isArray(props.messages)){
    let head_information=props.messages.filter(obj => obj.my_message===false);
let head_information_image;
let head_information_name;
let status;
    if(head_information.length>0){
     head_information_image=`http://social/img/users/${head_information[0].from_id}.jpeg?${Math.random()}`;
     head_information_name=head_information[0].name;
 status=props.status==='online' ?  <span className='state online'><i className='fa fa-circle '></i></span> :  <span className='state offline'>
         <i className='time'>Last seen : {props.leave_time}</i>
         <i className='fa fa-circle'></i></span>
       }else{
        head_information_image=`http://social/img/users/${props.messages[0].to_id}.jpeg?${Math.random()}`;
     head_information_name=props.messages[0].to_name;
status=props.status==='online' ?  <span className='state online'><i className='fa fa-circle '></i></span> :  <span className='state offline'>
         <i className='time'>Last seen : {props.leave_time}</i>
         <i className='fa fa-circle'></i></span> 
     }  
let messages=  props.messages.map((message,index) =>
    <OneMessage message={message} key={index} />
  );
  

  return (
    <div>
    <div className="menu hideOverflow">
            <div className="back"><i className="fa fa-chevron-left" id='back' onClick={handleClick}></i> <img src={head_information_image} onError={(e)=>{e.target.src="../public/img/users/user.png"}} draggable="false"/></div>
            <div className="name">{head_information_name}{status}</div>
        </div>
    <ol className="chat">
    { messages }
    </ol>
    <input className="textarea" type="text"  onKeyPress={handleTyping} placeholder="Type here!"/>
    </div>
    )
}else if(typeof props.messages=== 'object' ){
    let head_information_image=`http://social/img/users/${props.messages.to_id}.jpeg?${Math.random()}`;
    let head_information_name=props.messages.to_name;
let message= <SeparateMessage message={props.messages[0]}/>
let status=props.status==='online' ?  <span className='state online'><i className='fa fa-circle '></i></span> :  <span className='state offline'>
         <i className='time'>Last seen : {props.leave_time}</i>
         <i className='fa fa-circle'></i></span>
 return (
    <div>
    <div className="menu hideOverflow">
            <div className="back"><i className="fa fa-chevron-left" id='back' onClick={handleClick}></i> <img src={head_information_image} onError={(e)=>{e.target.src="../public/img/users/user.png"}} draggable="false"/></div>
            <div className="name">{head_information_name}{status}</div>
        </div>
    <ol className="chat">
    { message }
    </ol>
    <input className="textarea" type="text"   onKeyPress={handleTyping} placeholder="Type her!"/>
    </div>
    )
}else{
  return <span></span>
}
 
}
export default MessagingPanel;