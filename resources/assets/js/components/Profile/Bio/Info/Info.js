import React from 'react';
const Info=(props)=>{
    let avatar=  localStorage.getItem("has_image")== 'true' ? `http://social/img/users/${document.getElementById('user_id').value}.jpeg?${Math.random()}`: `../public/img/users/user.png`;

   
   const color={
   	color:'black'
   }

   const info=Array.isArray(props.info) ? props.info : JSON.parse(props.info);

const time= new Date().toJSON().slice(0,10).replace(/-/g,'/');
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
                               {document.getElementById('user_name').value} 
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
                            { typeof info[0] === 'undefined' || info[0].age === 0  ? 'No information' : info[0].age}  
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
                            {typeof info[0] === 'undefined' || info[0].bio === null || info[0].bio==='null' ? 'No information' : info[0].bio } 
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
                            { typeof info[0] === 'undefined' ? 'No information' : info[0].role}
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
                            {props.user_email} 
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
</div>
		)
     }
export default Info;