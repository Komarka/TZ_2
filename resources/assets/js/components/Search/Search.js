import React, { Component } from 'react';
import Result from './Result/Result';
import './Search.css';
export default class Search extends Component {
 constructor(props) {
    super(props);
    this.state = {users: ''};
    this.timeout=null;
    this.searchFriend = this.searchFriend.bind(this);
  }


  searchFriend(event){
  clearTimeout(this.timeout);
  if(event.target.value!== ''){
  	let search = event.target.value;
  	this.timeout=setTimeout(()=> { 
  		axios.get(`http://social/search?search=${search}`)
      .then(res => {
        
        if( typeof res.data.user !== 'undefined'){
      	let users=res.data.user;
       this.setState({users})
       
}else{
 let users=false;
 this.setState({users});
}
      })
  	 }, 1000);
  }else{
    let users=true;
    this.setState({users})
  }
  }

render(){
	return (
		<div className="search__container">
    <input className="search__input" type="text" placeholder="Search for your Cosmy-friend" onChange={this.searchFriend}/>
<Result users={this.state.users} > </Result>
    </div>

		)
}
			 
}