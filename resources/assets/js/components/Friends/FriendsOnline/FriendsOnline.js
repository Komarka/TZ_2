import React, { Component } from 'react';
import './FriendsOnline.css';
import FriendOnline from '../Friend/FriendOnline';
export default class FriendsOnline extends Component {
	constructor(props) {
    super(props);
    this.state={friends:''}
   }
  componentDidMount(){
  	axios.get(`http://social/friends`)
      .then(res => {
      
        let friends=res.data.friends;
       this.setState({friends});
      })
  }
    render() {
      let friend;
      if (this.state.friends.length>0){
    	   friend = this.state.friends.map((data,i) =>
           <FriendOnline  data={data} key={i}/>
  );
      }
        return <div id='friendsList'>
        {friend}
        </div>;
         
    }
}