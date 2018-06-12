import React from 'react';
import './Friend.css';
import { Link } from 'react-router';
const Friend=(props)=>{
	let data=JSON.parse(props.data);
	let id=data[0].id;
	let name=data[0].name;
	let status=data[0].online_status;
	let leave_time=data[0].leave_time;
	let image=`http://social/img/users/${id}.jpeg?${Math.random()}`;
	let status_span= status==='online' ?  <span className='state online'><i className='fa fa-circle '></i></span> :  <span className='state offline'>
         <i className='time'>Last seen : {leave_time}</i>
         <i className='fa fa-circle'></i></span>


	return <Link to={`/friend/${id}`}><div className='friend hideOverflow'><img src={image} onError={(e)=>{e.target.src="../public/img/users/user.png"}}  width='70px' height='70px'/>
	<span className='name'>{name}</span>
       {status_span}   
	</div></Link>
}
export default Friend;