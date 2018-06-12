import React from 'react';
import { browserHistory } from 'react-router';
import Modal from './Modal/Modal';
import './FriendInfo.css';
const FriendInfo=(props)=>{
    let id=props.user_info[0].user_id;
let age=props.user_info[0].age;
let bio=props.user_info[0].bio;
let role=props.user_info[0].role;
let name=props.user_info[1].name;
let email=props.user_info[1].email;
let avatar=  `http://social/img/users/${id}.jpeg?${Math.random()}`;
let value=`Remove ${name}`;
   const color={
   	color:'black'
   }

const time= new Date().toJSON().slice(0,10).replace(/-/g,'/');



function handleSubmit(event){
    event.preventDefault();
    axios.get(`http://social/removeFriend/${id}`)
      .then(res => {
        browserHistory.goBack();
      })
}
	return (
			<div className="panel-body inf-content">
    <div className="row">
        <div className="col-md-4">
            <img alt=""  title="" className=" img-thumbnail isTooltip" src={avatar} data-original-title="Usuario"/> 
            
        </div>
        <div className="col-md-6">
            <strong style={color}>Information</strong><br/>
            <div className="table-responsive">
            <table className="table table-condensed table-responsive table-user-information">
                <tbody>
                 
                    <tr>    
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-user  text-primary"></span>    
                                Name:                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                               {name} 
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                Age:                                              
                            </strong>
                        </td>
                        <td className="text-primary">
                            {age}  
                        </td>
                    </tr>

                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-bookmark text-primary"></span> 
                                Bio:                                              
                            </strong>
                        </td>
                        <td className="text-primary">
                            {bio } 
                        </td>
                    </tr>


                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-eye-open text-primary"></span> 
                                Role:                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            { role}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-envelope text-primary"></span> 
                                Email:                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {email} 
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-calendar text-primary"></span>
                                Created:                                              
                            </strong>
                        </td>
                        <td className="text-primary">
                            {time}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong style={color}>
                                <span className="glyphicon glyphicon-calendar text-primary"></span>
                                Modified:                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {time}
                        </td>
                    </tr>                                    
                </tbody>
            </table>
            </div>
        </div>
        
    </div>
   <form onSubmit={handleSubmit} >
<button type="submit" class="btn btn-labeled btn-danger">
                <span class="btn-label"><i class="glyphicon glyphicon-trash"></i></span>{value}</button>
   </form>
   <button type="button"  data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-lg btn3d"><span class="glyphicon glyphicon-envelope"></span> Write message</button>
   <Modal name={name}  id={id}/>
</div>
		)
     }
export default FriendInfo;