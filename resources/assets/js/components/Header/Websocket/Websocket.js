import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Websocket extends Component {
    constructor(props) {
      super(props);
      this.timer=null;
      this.state = {
        ws: new WebSocket(this.props.url, this.props.protocol),
        
      };
    }

    logging(logline) {
      if (this.props.debug === true) {
          console.log(logline);
      }
    }

   

    setupWebsocket() {
      let websocket = this.state.ws;
      websocket.onopen = () => {
        window._socket=websocket;
        this.timer=setInterval( () => { 
          this.sendMessage(document.getElementById('user_id').value);
         }, 500);
        this.logging('Websocket connecteddd');
       if (typeof this.props.onOpen === 'function') this.props.onOpen();

      };

      websocket.onmessage = (evt) => {
  
        this.props.onMessage(evt.data);
      };

      this.shouldReconnect = this.props.reconnect;
      websocket.onclose = () => {
        clearInterval(this.timer);
        this.logging('Websocket disconnected');
        if (typeof this.props.onClose === 'function') this.props.onClose();
       
        
      }
    }

    componentDidMount() {
      this.setupWebsocket();
    }

   

    sendMessage(message){
      let websocket = this.state.ws;
      websocket.send(message);
    }

    render() {
      return (
        <div></div>
      );
    }
}



