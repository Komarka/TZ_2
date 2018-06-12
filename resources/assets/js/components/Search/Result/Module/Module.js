import React from 'react';
import './Module.css';
const Module=(props)=>{
let friend={
    color:'green'
}
 


    function addFriend(e){
        let button=e.target.children[0];
        e.preventDefault();
const data = new FormData();
    data.append('friend_id',props.id);
    axios.post('http://social/addFriend', data)
      .then((response)=> {
    
  let span_sign = document.createElement("span");
span_sign.id='is_sended';
span_sign.className='glyphicon glyphicon-ok';
button.parentNode.replaceChild(span_sign, button);
    })
}
let button;

if(props.is_friend_1 || props.is_friend_2){
    button=<span style={friend}>Your friend</span>
}else if( props.sended ){
 button=<span className='glyphicon glyphicon-ok' id='is_sended'></span>  
}else{
button=<button   hidden={props.hidden} type="submit" className="btn btn-primary">+ Add {props.name} </button>;
}

	return (
  <div  className="modal fade" id={props.random_str} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">More About {props.name}</h4>
                    </div>
                <div className="modal-body">
                    <center>
                    <img src={props.image} onError={(e)=>{e.target.src="../public/img/users/user.png"}} name="aboutme" width="140" height="140" border="0" className="img-circle" />
                    
                    </center>
                    <center>
                    <p className="text-left"><strong>Name: </strong>
                        {props.name}</p>
                    <p className="text-left"><strong>Age: </strong>
                        { typeof props.info[0] === 'undefined' || props.info[0].age === 0  ? 'No information' : props.info[0].age}</p>
                    
                    </center>
                
                    <center>
                    <p className="text-left"><strong>Bio: </strong>
                        { typeof props.info[0] === 'undefined' || props.info[0].bio === null || props.info[0].bio==='null' ? 'No information' : props.info[0].bio}</p>
                   
                    </center>
                </div>
                <div className="modal-footer">
                    <center>
                <form  method="post" onSubmit={addFriend}>
                    {button}
</form>
      
                    
                    </center>
                </div>
            </div>
        </div>
        </div>
		)
}
export default Module;