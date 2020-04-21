import React, {Component} from 'react';
import axios from 'axios';
import { config } from '../config'


import SidePanel from '../components/SidePanel';
import Overview from '../views/Overview';
import Graphs from '../views/Graphs';
import UserLogs from '../views/UserLogs'
import Notifications from '../views/Notifications'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'overview',
      activeSource: 'Grid',
      communities: [
        {
            id: 1,
            name: 'AFIKPO',
            status: true
        },
        {
            id: 2,
            name: 'AMAZIRI',
            status: false
        },
        {
            id: 3,
            name: 'OZZIA',
            status: true
        },
        {
            id: 4,
            name: 'ENOHIA',
            status: false
        },
        {
            id: 5,
            name: 'UNWANA',
            status: false
        }
      ],
      notifications: [
        {
          title: 'AFIKPO Signed Up',
          date: '22/02/2020',
          id: 1
        },
        {
          title: 'AMAZIRI Signed Up',
          date: '23/02/2020',
          id: 2
        },
        {
          title: 'OZZIA Signed Up',
          date: '12/02/2020',
          id: 3
        },
        {
          title: 'ENOHIA Signed Up',
          date: '02/02/2020',
          id: 4
        },
        {
          title: 'UNWANA Signed Up',
          date: '22/03/2020',
          id: 5
        }
      ],
      bulbStatus: true,
      deviceStatus: true,
      voltage: 5.00,
      current: 2.00,
      powerProduced: 200.00,
      powerConsumed: 150.00
    }

    this.switchBulbStatus = this.switchBulbStatus.bind(this)
    this.switchDeviceStatus = this.switchDeviceStatus.bind(this)
    this.switchActiveTab = this.switchActiveTab.bind(this)
    this.setActiveSource = this.setActiveSource.bind(this)
    this.logOut = this.logOut.bind(this)
    this.controlUser = this.controlUser.bind(this)
    this.varyGenerated = this.varyGenerated.bind(this)
    this.fetchState = this.fetchState.bind(this)
  }

  fetchState(){
    axios.get()
  }

  varyGenerated(){
    
      this.setState({
        powerProduced: this.state.powerProduced + (Math.floor(Math.random() * 6) + 1),
        powerConsumed: this.state.powerConsumed + (Math.floor(Math.random() * 4) + 1)
      }) 
    
  }

  controlUser(id){
    this.setState({
        communities: this.state.communities.map(name => {
            if(name.id === id){
                return {
                    id: name.id,
                    name: name.name,
                    status: !name.status
                }
            } else {
                return name;
            }
        })
    }, console.log(this.state))
  }

  switchActiveTab(tab){
    this.setState({
      activeTab: tab
    })
  }

  setActiveSource(source){
      this.setState({
          activeSource: source
      })
  }

  switchBulbStatus(){
    
    this.setState({
      bulbStatus: !this.state.bulbStatus,
    })

  }

  logOut(){
    this.props.history.push('/login');
  }

  switchDeviceStatus(){
    if(this.state.deviceStatus === true){
        this.setState({
            activeSource: 'Grid'
        })
    }
    this.setState({
      deviceStatus: !this.state.deviceStatus,
      bulbStatus: false
    })
  }
  
  render(){
    const {activeTab} = this.state;
    setInterval(this.varyGenerated, 10000);
    return (
      <div className="App">
        <header className="App-header">
          <SidePanel 
            switchActiveTab={this.switchActiveTab} 
            activeTab={this.state.activeTab} 
            logOut={this.logOut} />
          {
            
            activeTab === 'overview' && 
              <Overview 
                data={this.state} 
                controlUser={this.controlUser}
                switchBulbStatus={this.switchBulbStatus}
                setActiveSource={this.setActiveSource}
                switchDeviceStatus={this.switchDeviceStatus} />
          }

          {
            activeTab === 'graphs' && 
            <Graphs />  
          }
          {
            activeTab === 'userlogs' && 
            <UserLogs />
          }
          {
            activeTab === 'notifications' &&
            <Notifications notifications={this.state.notifications}/>
          }
          
        </header>
      </div>
    );
  }
}

export default Home;
