import React, {Component} from 'react'
import NotificationItem from '../components/NotificationItem'
import NotificationPopup from '../components/NotificationPopup'

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayNotification: false,
            status: null, 
            firstName: null, 
            lastName: null, 
            phoneNumber: null, 
            email: null, 
            ID: null, 
            community: null, 
            date: null
        }

        this.displayNotification = this.displayNotification.bind(this)
        this.hideNotification = this.hideNotification.bind(this)
    }

    displayNotification(data){
        this.setState({
            displayNotification: true,
            ...data
        })
    }

    hideNotification(){
        this.setState({
            displayNotification: false
        })
    }
    render(){
        return (
            <div className="main-content">
                <h1 className="app-title">IMC Authentication Page  </h1>
                {this.state.displayNotification && <NotificationPopup hideNotification={this.hideNotification} data={this.state} />}
                <h2>Notifications</h2>
                <div className="notification-wrap">
                    <ul>
                        {this.props.notifications.map(notification => {
                            return (
                                <NotificationItem notification={notification} displayNotification={this.displayNotification} hideNotification={this.hideNotification} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Notifications