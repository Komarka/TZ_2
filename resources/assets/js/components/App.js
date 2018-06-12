import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Welcome from '../components/Welcome/Welcome';
export default class App extends Component {
	constructor(props) {
    super(props);
    this.state = {user_info:''};
     this.onUnload = this.onUnload.bind(this);
    localStorage.clear();
  }
  

   onUnload(event) {
 if(!window.isRefresh) {
  axios.get(`http://social/userLeft`)
   axios.get(`http://social/userLeftDialogue`)
   }
    }

  componentDidMount(){
    window.addEventListener("beforeunload", this.onUnload);
  	axios.get(`http://social/getUserInfo`)
      .then(res => {
        const user_info = res.data;
localStorage.setItem('has_image',res.data.has_image);
        this.setState({ user_info });
      })
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }

    render() {
    	let children = React.Children.map(this.props.children,  (child)=> {
    return React.cloneElement(child, {
      user_info: this.state.user_info
    })
  })
         return (
         	<div>
     <Header/>
     { children || <Welcome/>}
     </div>
    )
    }
}

