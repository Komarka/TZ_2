import React, { PureComponent } from 'react';
 import Websocket from './Websocket/Websocket';
import './Header.css';
import { Link } from 'react-router';
export default class Header extends PureComponent {
	 constructor(props) {
      super(props);
      this.state = {
         message_count:0,
        news_count:0,
       
      };
    }

    
onData(data){
if(data !=='update'){
    let d=JSON.parse(data);
let news_count=d.news_count;
let message_count=d.message_count;
this.setState({message_count,news_count});
}
}
    onOpen(){
        console.log('connected to the socket');
    }
    render(){
        let news_count=this.state.news_count;
        let message_count=this.state.message_count;
let news_count_span= news_count > 0 ? <span className="badge">{news_count}</span> : '';
let message_count_span=message_count > 0 ? <span className="badge">{message_count}</span> : '';
        const log_out='http://social/logout';
	return (

		<nav className="navbar navbar-default" id="colorful-nav">
          <Websocket url='ws://localhost:8080' onMessage={this.onData.bind(this)} onOpen={this.onOpen.bind(this)} debug={true}/>
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li className="home"><Link to="/home"><span className="glyphicon glyphicon-home"></span><h5>HOME</h5></Link></li>
                    <li className="profile"><Link to="/profile/bio"><span className="glyphicon glyphicon-user"></span><h5>PROFILE</h5></Link></li>
                    <li className="messages"><Link to="/messages"><span className="glyphicon glyphicon-envelope"></span>{message_count_span}<h5>MESSAGES</h5></Link></li>
                    <li className="friends"><Link to="/friends/all"><span className="glyphicon glyphicon-sunglasses"></span><h5>FRIENDS</h5></Link></li>
                    <li className="news"><Link to="/news"><span className="glyphicon glyphicon-bell"></span>{news_count_span}<h5>NEWS</h5></Link></li>
                    <li className="search"><Link to="/search"><span className="glyphicon glyphicon-search"></span><h5>SEARCH</h5></Link></li>
                    <li className="log-out"><a href={log_out}><span className="glyphicon glyphicon-log-out"></span><h5>LOG OUT</h5></a></li>
                    
                </ul>
            </div>
        </div>
    </nav>

    )
}
}