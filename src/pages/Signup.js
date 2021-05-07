import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


import Generator from '../assets/generator.png';
import Grid from '../assets/grid.png';
import Renewable from '../assets/renewable.png';

import {constants} from '../config/constants';

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: null,
            lastName: null,
            phoneNumber: null,
            email: null,
            ID: null,
            community: null,
            password: null,
            password2: null,
            message: '',
            loading: false
        }
    }

    validateInputs(){
        this.setState({loading: true})
        const {firstName, lastName, phoneNumber, email, ID, community, password, password2} = this.state;
        if(firstName && lastName && phoneNumber && email && ID && community && password && password2){
            if(password !== password2){
                this.setState({loading: false})
                return this.setState({message: 'Passwords do not match'})
            }

            this.submitData();
        } else {    
            this.setState({loading: false})
            this.setState({message: 'Please Fill all fields Correctly'})
        }
    }

    submitData(){
        axios.post(constants.authServer + 'api/auth/signup', {...this.state}).then(res => {
            this.setState({loading: false})
            this.setState({message: res.data.success || res.data.error})
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

    render(){
        return (
            <div className="login-wrap">

                <div className="login-right signup-left">
                    <div className="login-content">
                    
                        <h1>Welcome Back</h1>
                        <p>To keep connected with us please log in with your personal info</p>
                        <Link to="/login">SIGN IN</Link>
                    </div>
                </div>

                <div className="login-left">
                    <div className="login-content">
                    <div className="images">
                        <img src={Generator} alt="generator" />
                        <img src={Grid} alt="Grid" />
                        <img src={Renewable} alt="Renewable" />
                    </div>
                        <h1>Create Account</h1>
                        <div style={{color: 'orange'}}>{this.state.message}</div>
                        <div className="input-details">
                            <input type="text" placeholder="*First Name" onChange={(e) => this.setState({firstName: e.target.value})} /><br />
                            <input type="text" placeholder="*Last Name" onChange={(e) => this.setState({lastName: e.target.value})}/><br />
                            <input type="number" placeholder="Phone Number" onChange={(e) => this.setState({phoneNumber: e.target.value})}/><br />
                            <input type="email" placeholder="*Email Address" onChange={(e) => this.setState({email: e.target.value})}/><br />
                            <input type="text" placeholder="*Identification Number" onChange={(e) => this.setState({ID: e.target.value})}/><br />
                            <input type="text" placeholder="*Community" onChange={(e) => this.setState({community: e.target.value})}/><br />
                            <input type="password" placeholder="*Password" onChange={(e) => this.setState({password: e.target.value})}/><br />
                            <input type="password" placeholder="*Verify Password" onChange={(e) => this.setState({password2: e.target.value})}/><br />
                        </div>
                        
                        <button onClick={() => this.validateInputs()}>{this.state.loading? 'Loading...' : 'SIGN UP'}</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Signup