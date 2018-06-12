import React from 'react';
import { Link } from 'react-router';
import Bio from './Bio/Bio';
import FullProfile from './FullProfile/FullProfile';
import './Profile.css';

const Profile=(props)=>{
  let has_image='';
  if(props.location.state){
     has_image=props.location.state.has_image;
  }else if(props.user_info.has_image) {
has_image=props.user_info.has_image;
  }else{
    has_image=localStorage.getItem("has_image");
  }

const userProfile= <FullProfile  user={props} has_image={has_image}/>
  

    let children = React.Children.map(props.children,  (child)=> {
    return React.cloneElement(child, {
      user_info: props.user_info
    })
  })
		return (
			<div className='container'>
			<div className="col-lg-12 col-sm-14">
    {userProfile}
    <div className="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
        <div className="btn-group" role="group">
                    <Link   to='/profile/bio' activeClassName='active_Link' ><button type="button" id="stars" className="btn btn-default  "   ><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                <div className="hidden-xs">
Bio</div>
        </button></Link>
        </div>
        <div className="btn-group" role="group">
             <Link   to='/profile/edit' activeClassName='active_Link' ><button type="button" id="following" className="btn btn-default" ><span className="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                <div className="hidden-xs">Edit</div>
            </button></Link>
        </div>
    </div>

        <div className="well">
      <div className="tab-content">
        <div className="tab-pane fade in active" id="tab1">
         <div className='container'>
          {children}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
 
			)
		 
}
export default Profile;