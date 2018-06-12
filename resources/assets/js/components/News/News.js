import React, { Component } from 'react';
import SeparateNews from './SeparateNews/SeparateNews';
import './News.css';
export default class News extends Component {
  constructor(props) {
    super(props);
    this.state={friend_request:''};
  }
  componentDidMount(){
    axios.get(`http://social/news`)
      .then(res => {
        if(typeof res.data.friend_request !== 'undefined'){
           let friend_request= res.data.friend_request ;
        this.setState({friend_request});
        }else{
           let friend_request= false ;
        this.setState({friend_request});
        }
       
      })
  }
    render() {
let news='';
if(Array.isArray(this.state.friend_request)){
  news=this.state.friend_request.map((_,i,array) =>
    <SeparateNews key={i} news={array[i]} />);
}else if(this.state.friend_request===false ){
  news=<h1 id='no_news'>No news</h1>
}
   return <div id='news'>{news}</div>
            
    }
         }
