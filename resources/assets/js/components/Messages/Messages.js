import React, { Component } from 'react';
import NotViewedMessage from './NotViewedMessage/NotViewedMessage';
import ViewedMessage from './ViewedMessage/ViewedMessage';
import SendedNotViewed from './SendedNotViewed/SendedNotViewed';
import SendedViewed from './SendedViewed/SendedViewed';
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.not_viewed_names=[];
    this.state = {not_viewed_messages:'',viewed_messages:'',sended_viewed_messages:'',sended_not_viewed_messages:'',names_not_viewed:''};
    this.transformMessage=this.transformMessage.bind(this);
     this.clearDiv=this.clearDiv.bind(this);
  }
  
transformMessage(messages){
let viewed={};
       for( let el of messages){
viewed[el.from_id]={
          text:el.message,
          name:el.name,
          date:el.date,
          to_name:el.to_name
       }
       
}
return viewed;     
}
  
   componentDidMount(){
    axios.get(`http://social/getMessages`)
      .then(res => {
        let names_not_viewed=res.data.names_not_viewed;
        this.setState({names_not_viewed});
        let viewed_messages=JSON.parse(res.data.viewed_messages);
       let viewed=this.transformMessage(viewed_messages);    
viewed=Object.entries(viewed).map(e => Object.assign(e, { 0: +e[0] })).reverse();
this.setState({viewed_messages:viewed})

        let sended_viewed_messages=JSON.parse(res.data.sended_viewed_messages);
        let sended_not_viewed_messages=JSON.parse(res.data.sended_not_viewed_messages);
        this.setState({sended_viewed_messages,sended_not_viewed_messages});
      
let messages={};
       let not_viewed_messages=JSON.parse(res.data.not_viewed_messages);

for(let v of not_viewed_messages){ 
  window['counter_' + v.from_id] = 1;   
}
       for( let el of not_viewed_messages){
        if(messages.hasOwnProperty(el.from_id)){
            ++window['counter_'+el.from_id];
window.not_viewed_names=[];
window.not_viewed_names.push(el.name);
messages[el.from_id]={
          text:el.message,
          name:el.name,
          date:el.date,
          count:window['counter_'+el.from_id] 
       }
        }else{
        messages[el.from_id]={
          text:el.message,
          name:el.name,
          date:el.date,
          count:1
        }
}
       }
messages=Object.entries(messages).map(e => Object.assign(e, { 0: +e[0] })).reverse();
this.setState({not_viewed_messages:messages})
      })

    }

clearDiv(){
  if(document.querySelectorAll('#extra').length>0 ) {
    let obj={};
      let divs=Array.prototype.slice.apply(document.querySelectorAll('#extra'));
    divs.forEach((item)=>{
      if(item.children[0].getElementsByClassName('extra')[0].children[0].textContent in obj){
        let dom_name=item.children[0].getElementsByClassName('extra')[0].children[0].textContent;
        if(+new Date(item.children[1].children[0].textContent)>obj[dom_name].date){
          obj[dom_name].parent.parentNode.removeChild(obj[dom_name].parent);
          obj[dom_name]={
            date:+new Date(item.children[1].children[0].textContent),
            name:item.children[0].getElementsByClassName('extra')[0].children[0].textContent,
            parent:item.parentNode
          }
        }else{
          item.parentNode.parentNode.removeChild(item.parentNode);
        }
      }else{
obj[item.children[0].getElementsByClassName('extra')[0].children[0].textContent]={
  date:+new Date(item.children[1].children[0].textContent),
name:item.children[0].getElementsByClassName('extra')[0].children[0].textContent,
parent:item.parentNode
}
      }
    
    })
  
}


if(this.state.names_not_viewed.length>0){
   let divs=Array.prototype.slice.apply(document.querySelectorAll('#extra'));
   divs.forEach((item)=>{
      if(this.state.names_not_viewed.includes(item.children[0].getElementsByClassName('extra')[0].children[0].textContent)){
      item.parentNode.parentNode.removeChild(item.parentNode);
      }
    })
 }
    


}

render(){
  let not_viewed='';
  let viewed='';
  let sended_not_viewed='';
  let sended_viewed='';
  if(Array.isArray(this.state.not_viewed_messages)){
  
not_viewed= this.state.not_viewed_messages.map((item, index) => (
    <NotViewedMessage info={item} key={index} />
        
));
  }
    if(Array.isArray(this.state.viewed_messages)){
      
viewed= this.state.viewed_messages.map((item, index) => (
    <ViewedMessage info={item} key={index} />
        
));
  }else {
    viewed=<span></span>
  }
   if(this.state.sended_not_viewed_messages){

    sended_not_viewed=<SendedNotViewed info={this.state.sended_not_viewed_messages}  />
        
  }else {

    sended_not_viewed= <span></span>
  }
   if(this.state.sended_viewed_messages){

    sended_viewed=<SendedViewed info={this.state.sended_viewed_messages}  />
        
  }else {

    sended_viewed= <span></span>
  }

return (
    <div id='all_messages'>{not_viewed}
    {sended_not_viewed}
  {viewed}
    {sended_viewed}
     
    
    {this.clearDiv()}

    </div>
    )
  
  
}
    }

