import React, {Component} from 'react'

class SidePanel extends Component {
    render(){
        const {switchActiveTab, activeTab, logOut} = this.props;

        return (
            <div className="side-panel">
                <ul>
                    <li className={activeTab === 'overview'? 'active' : ''} onClick={() => switchActiveTab('overview')}>Overview</li>
                    <li className={activeTab === 'graphs'? 'active' : ''} onClick={() => switchActiveTab('graphs')}>Graphs</li>
                    <li className={activeTab === 'userlogs'? 'active' : ''} onClick={() => switchActiveTab('userlogs')}>User Logs</li>
                    <li className={activeTab === 'notifications'? 'active' : ''} onClick={() => switchActiveTab('notifications')}>Notifications</li>
                    <li onClick={()=> logOut()}>Logout</li>
                </ul>
            </div>
        )
    }
}

export default SidePanel