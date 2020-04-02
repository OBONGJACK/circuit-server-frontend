import React, {Component} from 'react'
import NotificationItem from '../components/NotificationItem'
import NotificationPopup from '../components/NotificationPopup'

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayNotification: false
        }

        this.displayNotification = this.displayNotification.bind(this)
        this.hideNotification = this.hideNotification.bind(this)
    }

    displayNotification(){
        this.setState({
            displayNotification: true
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
                {this.state.displayNotification && <NotificationPopup hideNotification={this.hideNotification}/>}
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