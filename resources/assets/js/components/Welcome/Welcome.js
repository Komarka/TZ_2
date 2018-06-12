import React from 'react';
import './Welcome.css';
const Welcome=(props)=>{
	let user=document.getElementById('user_name').value;
	return(
		<div>
		 <h1><span id='name'>{user}</span>, welcome to </h1>
		 <img  id='logo' src='public/img/logo/logo.png'/>
		 </div>
		 )
}
export default Welcome;