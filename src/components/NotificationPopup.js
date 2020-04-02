import React, {Component} from 'react'

class NotificationPopup extends Component {
    render(){
        return (
            <div className="notification-popup">
                <p><strong>Notification</strong></p>
                <ul>
                    <li>Name:</li>
                    <li>Phone Number:</li>
                    <li>Email:</li>
                    <li>ID Number:</li>
                </ul>

                <div>
                    <button>Verify</button>
                    <button onClick={() => this.props.hideNotification()}>Close</button>
                </div>
            </div>
        )
    }
}

export default NotificationPopup