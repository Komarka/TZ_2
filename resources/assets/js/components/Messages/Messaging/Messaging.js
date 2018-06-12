import React, { Component } from 'react';
import MessagingPanel from './MessagingPanel/MessagingPanel';
export default class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {messages:'',status:'',leave_time:'',to_name:''};
     
     
  }
 componentWillUnmount() {
    axios.get(`http://social/userLeftDialogue`);
  }
  

 
  componentDidMount(){
 
     _socket.onmessage = (event)=> {
      if(event.data==='update'){
   axios.get(`http://social/getDialogMessages/${+this.props.params.withId}`)
      .then(res => {
        let messages=JSON.parse(res.data.messages);
        let status=res.data.status;
        let to_name=res.data.to_name;
        let leave_time=res.data.leave_time;
        this.setState({messages,status,leave_time,to_name});
      
      })
    
}
};
    axios.get(`http://social/getAllMessages/${+this.props.params.withId}`)
      .then(res => {
        
        let messages=JSON.parse(res.data.messages);
        let status=res.data.status;
        let to_name=res.data.to_name;
        let leave_time=res.data.leave_time;
        this.setState({messages,status,leave_time,to_name});
      })
    }
	render(){
   
    return <MessagingPanel  update={this.forceUpdate} messages={this.state.messages} status={this.state.status} leave_time={this.state.leave_time} withId={+this.props.params.withId} to_name={this.state.to_name}/>
  
  }
 
}

