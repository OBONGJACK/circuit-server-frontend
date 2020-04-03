import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// Full NAme
// Username
// School ID
// Password
// Password Confirmation
// Email Address
// Phone Number

class Login extends Component {
    constructor(props){
        super(props)

        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin(){
        this.props.history.push('/');
    }

    render(){
        return (
            <div className="login-wrap">

                <div className="login-left">
                    <div className="login-content">
                        <h1>Digital Master Control Interface</h1>
                        <div></div>
                        <input type="mail" placeholder="Email" /><br />
                        <input type="password" placeholder="Password" /><br />
                        <button onClick={() => this.checkLogin()}>SIGN IN</button>
                        <p><Link to="">Forgot Your Password?</Link></p>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-content">
                        <h1>New Operator</h1>
                        <p>Enter your personal details to sign up</p>
                        <Link to="/signup">SIGN UP</Link>
                        <p>POWER POOL SYSTEM</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login