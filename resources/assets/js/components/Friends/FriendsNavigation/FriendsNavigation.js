import React from 'react';
import './FriendsNavigation.css';
import { Link } from 'react-router';
const FriendsNavigation=(props)=>{
return (
	<div id='FriendsNavigation'>
<ul className="nav nav-pills" role="tablist">
  <li role="presentation" ><Link   to='/friends/all' activeClassName='active_Link' ><span id='actived'>All</span></Link></li>
  <li role="presentation"><Link   to='/friends/online' activeClassName='active_Link' ><span id='actived'>Online<span className='badge'>{props.online_count}</span></span></Link></li>
</ul>
</div>
	)
}
export default FriendsNavigation;