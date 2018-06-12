
require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Profile from './components/Profile/Profile';
import Welcome from './components/Welcome/Welcome';
import Bio from './components/Profile/Bio/Bio';
import Edit from './components/Profile/Edit/Edit';
import Search from './components/Search/Search';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import FriendsAll from './components/Friends/FriendsAll/FriendsAll';
import FriendsOnline from './components/Friends/FriendsOnline/FriendsOnline';
import FriendProfile from './components/Friends/FriendProfile/FriendProfile';
import Messages from './components/Messages/Messages';
import Messaging from './components/Messages/Messaging/Messaging';

render(
  <Router history={browserHistory}>
      <Route path="/" component={App} >
      <Route path="/home" component={Welcome} />
        <Route path="/profile" component={Profile}>
        <Route path="/profile/bio" component={Bio} />
        <Route path="/profile/edit" component={Edit} />
        <Route path="/search" component={Search} />
        <Route path="/messages" component={Messages}/>
        <Route path="/news" component={News}/>
        <Route path="/message/:withId" component={Messaging}/>
        <Route path="/friend/:friendId" component={FriendProfile}/>
        <Route path="/friends" component={Friends}>
        <Route path="/friends/all" component={FriendsAll}/>
        <Route path="/friends/online" component={FriendsOnline}/>
        
        </Route>
        </Route>
     
        </Route>
    </Router>,
        document.getElementById('app'));


