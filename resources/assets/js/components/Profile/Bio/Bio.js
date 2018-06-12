import React, { PureComponent } from 'react';
import Info from './Info/Info';
export default class Bio extends PureComponent {
    constructor(props) {
    super(props);
    if(localStorage.getItem('bio_info')){
      let bio_info=JSON.parse(localStorage.getItem('bio_info'));
      let info=[{...bio_info}];
        this.state={user_info:info,user_email:props.user_info.user_email,user_id:document.getElementById('user_id').value};
    } else{
    this.state = {user_info:props.user_info.user_info,user_email:props.user_info.user_email,user_id:document.getElementById('user_id').value};
  }
  }
  componentDidMount(){

    if(this.props.location.state){
      localStorage.setItem('bio_info',this.props.location.state.new_info.data.user );
  const data=JSON.parse(this.props.location.state.new_info.data.user);
   let info=[{...data}];
   this.setState({user_info:info,user_email:this.props.user_info.user_email,user_id:document.getElementById('user_id').value,has_image:this.props.location.state.has_image});
}
  

  }
  render(){

    const has_image= this.state.has_image ? this.state.has_image : this.props.user_info.has_image;
    const hasInfo=this.props.user_info.user_info.length > 2 ? true : false;
    const info=<Info user_id={this.state.user_id} info={this.state.user_info} user_email={this.state.user_email} has_image={has_image} />
   
	return <div className='container bootstrap snippet'>{info}</div>
     }
}