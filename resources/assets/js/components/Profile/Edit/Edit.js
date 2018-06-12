import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './Edit.css';
export default class Edit extends Component {
	constructor(props) {
    super(props);
    this.uploadInput='';
    if(localStorage.getItem('new_info')){
    	let new_info=JSON.parse(localStorage.getItem('new_info'));
    	this.info=[{...new_info}];
    	this.state = {is_sended:false,hideFlash:true,age:this.info[0].age ,bio:this.info[0].bio };
    } else if(this.props.user_info.user_info.length>2){
    this.info=JSON.parse(this.props.user_info.user_info);
    this.state = {is_sended:false,hideFlash:true,age:this.info[0].age ,bio:this.info[0].bio };
}else{
	 this.state = {is_sended:false,hideFlash:true,age:'' ,bio:''   };


}
    
    this.ageChange = this.ageChange.bind(this);
    this.bioChange = this.bioChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  
    
  }
   
 
  ageChange(event) {
    this.setState({age: event.target.value});
  }
  bioChange(event) {
    this.setState({bio: event.target.value});
  }
  

  handleSubmit(event) {
  	this.setState({is_sended:true});
    event.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('age',this.state.age);
    data.append('bio',this.state.bio);
    if(this.info) data.append('id',this.info[0].id );
    
    axios.post('http://social/upload', data)
      .then((response)=> {
  this.setState({is_sended:false});

   this.clearValues();
localStorage.setItem('new_info',response.data.user );

   if( document.getElementById("photo").files.length == 0 ){
    let has_image= this.props.user_info.has_image ? this.props.user_info.has_image : localStorage.getItem('has_image');
    browserHistory.push({
  pathname: '/profile/bio',
  state: { new_info: response,has_image}
})
}else{
  localStorage.setItem("has_image", true);
    browserHistory.push({
  pathname: '/profile/bio',
  state: { new_info: response,has_image:true }
})
}
   

      })
      .catch((error)=> {
           this.setState({hideFlash:false});
      });
  }

  clearValues(){
  	this.setState({email: '',user_name:'',age:'',bio:''})
  }

	
   render(){
   	const color={
   	color:'black'
   }
  

	return (
		<div  id='edit'>
		 <form onSubmit={this.handleSubmit}>
		
	<div className="form-group hideOverflow">
		<label htmlFor="age" style={color}>Age</label>
    <input type="number" className="form-control" id="age" min="10" max="90" value={this.state.age=== 0 ? '' : this.state.age } onChange={this.ageChange}/>
	</div>

	<div className="form-group hideOverflow">
    <label htmlFor="exampleFormControlTextarea1" style={color}>About me:</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.bio ==='null' ? '' : this.state.bio } onChange={this.bioChange}/>
  </div>
  <div className="form-group hideOverflow">
    <label htmlFor="photo" style={color}>Your photo</label>
    <input type="file" className="form-control-file"  ref={(ref) => { this.uploadInput = ref; }} id="photo"/>
  </div>
  <div className="alert alert-danger hideOverflow" hidden={this.state.hideFlash}>
  <strong>Success!</strong> Your data is updated.
</div>
  <input type="submit" disabled={this.state.is_sended} className='btn btn-success' value='Send' />
</form>
		</div>
		)
}
     }
