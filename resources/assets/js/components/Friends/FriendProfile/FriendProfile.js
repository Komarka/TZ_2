import React, { Component } from 'react';
import './FriendProfile.css';
import FriendInfo from './FriendInfo/FriendInfo';
export default class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {user_info:''};
     
  }
   componentDidMount(){
    axios.get(`http://social/getFriendInfo/${this.props.params.friendId}`)
      .then(res => {
        console.log('gaaaaaaaaaaaaaaaa');
        console.log(res);
        const user_info = res.data;
        this.setState({ user_info });
      })
    }
	render(){
    if(this.state.user_info !==''){
       return (
    <div className='container bootstrap snippet'>
    <FriendInfo user_info={this.state.user_info} />
    </div>
    )
     }else{
      return <span></span>
     }
 
  }
}