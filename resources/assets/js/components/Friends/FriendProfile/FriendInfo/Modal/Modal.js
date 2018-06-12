import React from 'react';
import { browserHistory } from 'react-router';
import './Modal.css';
const Modal=(props)=>{

	function handleSubmit(event){
		 event.preventDefault();
	let message=event.target.querySelector("#message").value;
	if(message.length===0){
		let alert_danger=event.target.querySelector(".alert-danger");
		alert_danger.hidden=false;
		return false;
	}else{
    const data = new FormData();
    data.append('message',message)
    data.append('send_to', props.id);
    data.append('send_from',document.getElementById('user_id').value);
    axios.post('http://social/send', data)
    .then((response)=> {
    	console.log(response);
    	document.getElementById('close').click();
    	document.querySelector('#message_form').querySelector('#message').value='';
    	document.querySelector('#message_form').querySelector('#danger').hidden=true;

    	
    })
 
}
}
return (
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-body">
        
        <form id='message_form' onSubmit={handleSubmit}>
          <p>To:<span id='to'>{props.name}</span></p>
          <p>Message:</p>
           <p><textarea rows="10" cols="45" name="text" id='message'></textarea></p>
            <p><button type="submit" class="btn btn-warning" >Send</button></p>
        
<div class="alert alert-danger" id='danger' role="alert" hidden='true'>
  Please  type some text!
</div>
            </form>
        </div>
        <div class="modal-footer" id='m_footer'>
          
          <button type="button" class="btn btn-primary" data-dismiss="modal" id='close'>Close</button>
        </div>
      </div>
      
    </div>
  </div>
	)
}
export default Modal;