import React from 'react';
import Module from './Module/Module';
import './Result.css';
const Result=(props)=>{
	let user_list=[]
	if( props.users.length>0){
	for( let user of props.users){
		let user_info=JSON.parse(user.info);
		let name=user.user_name;
		let id=user.user_id;
		let sended=user.friend_sended;
		let random_str=user.random_str.replace(/[0-9]/g, '').toLowerCase();
		let image=`http://social/img/users/${id}.jpeg?${Math.random()}`;
		user_list.push(<li key={id}><a href='#' data-toggle="modal" data-target={`#${random_str}`} ><img src={image} onError={(e)=>{e.target.src="../public/img/users/user.png"}}   width='130px'/></a>
  <p>{name}</p>
  <Module info={user_info} name={name} image={image} random_str={random_str}  hidden={user.hidden} id={id} sended={sended} is_friend_1={user.is_friend_1} is_friend_2={user.is_friend_2} />
  </li>)
	}
}else if(props.users === false){
	user_list=<div className="alert alert-danger" role="alert">
  No such users in our Cosmy-community!
</div>
}else{
	user_list.push(<div key={Math.random()}></div>);
}
	return(
	<div className="search_list" >
   <ul id='list'>{user_list}</ul>

</div>
)
}
export default Result;
