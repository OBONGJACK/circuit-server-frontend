import React, {Component} from 'react'
import axios from 'axios'

import {constants} from '../config/constants'

class NotificationPopup extends Component {
    constructor(props){
        super(props)

        this.state = {
            loading: false,
            message: ''
        }
    }

    submitData(){
        this.setState({loading: true})
        axios.post(constants.authServer + 'api/auth/authorize', {
            status: this.props.data.status,
            email: this.props.data.email
        }).then(res => {
            this.setState({loading: false, message: res.data.success || res.data.error})

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
        const {status, firstName, lastName, phoneNumber, email, ID, community, date} = this.props.data;
        return (
            <div className="notification-popup">
                <p><strong>Notification</strong></p>
                <ul>
                    <li>First Name: {firstName}</li>
                    <li>Last Name: {lastName}</li>
                    <li>Phone Number: {phoneNumber}</li>
                    <li>Email: {email}</li>
                    <li>ID Number: {ID}</li>
                    <li>Community: {community}</li>
                    <li>Date: {date}</li>
                </ul>
                <div style={{color: 'orange'}}>{this.state.message}</div>
                <div>
                    <button onClick={() => this.submitData()}>{this.state.loading? 'Loading...' : (status === 0? 'Approve User' : 'Revoke Access')}</button>
                    <button onClick={() => this.props.hideNotification()}>Close</button>
                </div>
            </div>
        )
    }
}

export default NotificationPopup