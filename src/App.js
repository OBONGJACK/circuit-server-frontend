import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'



import './App.css'

class App extends Component{
  render(){
    return (
      <HashRouter basename="/">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
       </HashRouter> 
    );
  }
}

export default App;
