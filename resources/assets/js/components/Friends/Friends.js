import React, { Component } from 'react';
import './Friends.css';
import FriendsNavigation from './FriendsNavigation/FriendsNavigation';
export default class Friends extends Component {
	constructor(props) {
    super(props);
    this.state = {online_count:'',has_friends:''};
    
  }

  

  componentDidMount(){
  	axios.get(`http://social/onlineCount`)
      .then(res => {
      	
        const online_count=res.data.online_count;
        const has_friends=res.data.has_friends;
        this.setState({ online_count,has_friends });
      })
    }
    render(){
    	if(this.state.has_friends===true){
        return <div >
        <FriendsNavigation online_count={this.state.online_count} />
        {this.props.children}
        </div>;
        } else if(this.state.has_friends===false) {
        	return <h1 id='no_news'>You have no friends!</h1>
        }else{
        	return <b></b>
        }
    }
    }
    
