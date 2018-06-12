import React from 'react';
import './SeparateNews.css';

const SeparateNews=(props)=>{
let friend_request=JSON.parse(props.news.user_info);

 function acceptFriend(e){
        let div_buttons=e.target.parentNode;
        let p=e.target.parentNode.previousSibling;
        e.preventDefault();
const data = new FormData();
    data.append('sender_id',friend_request[0].id);
    axios.post('http://social/acceptFriend', data)
      .then((response)=> {
      	p.setAttribute('hidden',true);
        let span = document.createElement("span");
        span.id='accepted';
span.innerHTML=`${friend_request[0].name} and you are friends!`;
div_buttons.parentNode.replaceChild(span, div_buttons);
    })
}


 function cancelFriend(e){
        let div_to_remove=e.target.parentNode.parentNode;
        e.preventDefault();
const data = new FormData();
    data.append('sender_id',friend_request[0].id);
    axios.post('http://social/cancelFriend', data)
      .then((response)=> {
       div_to_remove.parentNode.removeChild(div_to_remove);
    })
}




let image=`http://social/img/users/${friend_request[0].id}.jpeg?${Math.random()}`;
	return <div id='separate_news'>
	<img src={image}  onError={(e)=>{e.target.src="../public/img/users/user.png"}} width='80px' height='80px' />
	<p><b>{friend_request[0].name}</b> wants to be your friend.</p>
	<div id='buttons'>
	<form  method="post" onSubmit={acceptFriend}>
	<button className='btn btn-success'>Accept</button>
	</form>
	<form  method="post" onSubmit={cancelFriend}>
	<button className='btn btn-danger'>Cancel</button></form></div></div>
}
export default SeparateNews;