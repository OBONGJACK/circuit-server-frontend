import React, {Component} from 'react'
import { NotificationIcon } from './Icons'

export default class NotificationItem extends Component {
    render(){
        const {status, firstName, lastName, phoneNumber, email, ID, community, date} = this.props.notification;
        return (
            <li>
                <div style={{width: '10%'}}>
                    <NotificationIcon />
                </div>
                <div style={{textAlign: 'left', width: '50%'}}>
                    <p>{firstName} Signed Up</p>
                </div>
                <div style={{width: '20%'}}>
                    <button onClick={() => this.props.displayNotification({status, firstName, lastName, phoneNumber, email, ID, community, date})}>View</button>
                </div>
                <div style={{width: '20%'}}>
                    <p>{date}</p>
                </div>
            </li>
        )
    }
}