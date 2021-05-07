import Axios from "axios";
import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import {constants} from '../config/constants'
// Full NAme
// Username
// School ID
// Password
// Password Confirmation
// Email Address
// Phone Number

import Generator from "../assets/generator.png";
import Grid from "../assets/grid.png";
import Renewable from "../assets/renewable.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null, 
      password: null,
      message: null,
      loading: false
    }

    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin() {
    this.setState({loading: true})
    const {email,password} = this.state;

    if(email && password){
      this.submitData();
    } else {
      this.setState({loading: false, message: 'Please fill al fields correctly'})
    }
    
  }

  submitData(){
    axios.post(constants.authServer + 'api/auth/login', {...this.state}).then(res => {
      this.setState({loading: false});
      if(res.data.success){
        const {token} = res.data;
        localStorage.setItem('token', token)
        this.props.history.push("/");

        
      } else {
        this.setState({message: res.data.error || 'An Unknown Error Occured'})
      }
    }).catch(err => {
      this.setState({loading: false})
      if(err.response){
          console.log({...err})
          this.setState({message: err.response.data.error});
      } else {
          this.setState({message: 'An Unknown Error Occured, Please Try Again'});
      }
    })
  }

  render() {
    return (
      <div className="login-wrap">
        <div className="login-left">
          <div className="login-content">
            <div className="images">
              <img src={Generator} alt="generator" />
              <img src={Grid} alt="Grid" />
              <img src={Renewable} alt="Renewable" />
            </div>{" "}
            <h1>
              {" "}
              Intelligent Master <br /> Controller Interface{" "}
            </h1>{" "}
            <div style={{color: 'orange'}}>{this.state.message}</div>
            <input type="mail" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/> <br />
            <input type="password" placeholder="Password"  onChange={(e) => this.setState({password: e.target.value})}/> <br />
            <button onClick={() => this.checkLogin()}> {this.state.loading? 'Loading...' : 'SIGN IN'} </button>{" "}
            <p>
              {" "}
              {/* <Link to=""> Forgot Your Password ? </Link> */}
            </p>
          </div>{" "}
        </div>
        <div className="login-right">
          <div className="login-content">
            <h1> New IMC Operator 's </h1>{" "}
            <p> Enter your personal details to sign up </p>{" "}
            <Link to="/signup"> SIGN UP </Link>{" "}
            <p> AFIKPO UNIFIED ENERGY SYSTEM </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Login;
