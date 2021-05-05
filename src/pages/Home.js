import React, {Component} from 'react';
import axios from 'axios';
import { constants } from '../config/constants'


import SidePanel from '../components/SidePanel';
import Overview from '../views/Overview';
import Graphs from '../views/Graphs';
import UserLogs from '../views/UserLogs'
import Notifications from '../views/Notifications'

import Modal from './../components/Modal';

const channelMapping_1 = new Map();
const channelMapping_2 = new Map();
const stateMapping = new Map();

channelMapping_1.set(1, {index: 1, field: 'field1'});
channelMapping_1.set(2, {index: 2, field: 'field2'});
channelMapping_1.set(3, {index: 3, field: 'field3'});
channelMapping_1.set(4, {index: 4, field: 'field4'});
channelMapping_1.set(5, {index: 5, field: 'field5'});
channelMapping_1.set('Grid', {index: 6, field: 'field6'});
channelMapping_1.set('Solar', {index: 7, field: 'field7'});
channelMapping_1.set('Generator', {index: 8, field: 'field8'});

channelMapping_2.set('Current', {index: 1, field: 'field1'})
channelMapping_2.set('Voltage', {index: 2, field: 'field2'})
channelMapping_2.set('General PHY', {index: 3, field: 'field3'})
channelMapping_2.set('General APP', {index: 4, field: 'field4'})




class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'overview',
      activeSource: 'none',
      modal: {
        show: true,
        message: 'This is some sample mesage for the modal'
      },
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

  componentDidMount(){
    this.fetchState()
  }

  fetchState(){
    // function to read the state of the read channel so the UI can be updated
    // this function should run every 15-20 seconds so it can get the latest changes
    // 

    // https://api.thingspeak.com/channels/1364933/status.json?api_key=3SRBW8RSLPYY499K get updates
    // https://api.thingspeak.com/channels/1364933/feeds.json?api_key=3SRBW8RSLPYY499K&results=2 read feeds
    // https://api.thingspeak.com/channels/1364933/fields/1.json?api_key=3SRBW8RSLPYY499K&results=2 read field
    // https://api.thingspeak.com/update?api_key=CTHEBDRAX5GRZ546&field1=0 write
    // axios.get(`${server+'channels/' + channelID + '/feeds.json?api_key='+readKey+'&results=1'}`).then(res => {
    //   console.log(res.data);
    // })

    

    // fetch the state from the first read channel

    for(const [key, value] of channelMapping_1.entries()){
      console.log(key, value);

      axios.get(`https://api.thingspeak.com/channels/${constants.readChannelID}/fields/${value.index}.json`, {
        params: {
          api_key: constants.readChannelReadKey,
          results: 1
        }
      }).then(res => {
        console.log(res.data);
          // update the state directly
          this.writeState(key, res.data);
      }).catch(err => {
        // try the request again
        console.log(err)
      })
      
    }


    // fetch the state from the general channel

    for(const [key, value] of channelMapping_2.entries()){
      console.log(key, value);

      axios.get(`https://api.thingspeak.com/channels/${constants.generalChanenlID}/fields/${value.index}.json`, {
        params: {
          api_key: constants.generalChannelReadKey,
          results: 1
        }
      }).then(res => {
        console.log(res.data);
          // update the state directly
          this.writeState(key, res.data);
      }).catch(err => {
        // try the request again
        console.log(err)
      })
      
    }


    
  }

  writeState(field, value){
    // Update the react state
    switch (field) {
      case 1:
        // destructure until you destructure to the first index which is for this particular state update
        this.setState({...this.state, communities: [{...this.state.communities[0], status: value === 1000 ? false : true}, ...this.state.communities.slice(1) ]})
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5: 
        break;
    
      default:
        break;
    }
  }

  varyGenerated(){
    
      this.setState({
        powerProduced: this.state.powerProduced + (Math.floor(Math.random() * 6) + 1),
        powerConsumed: this.state.powerConsumed + (Math.floor(Math.random() * 4) + 1)
      }) 
    
  }

  controlUser(id){
    // send an api request to switch off a particular user in the field according to the user id
    const userID = id;
    const newState = !this.state.communities.filter(item => item.id === id)[0].status;

    // decide which field corresponds to which user id

    //make the api call here
    axios.get('https://api.thingspeak.com/update', {
      params: {
        api_key: constants.writeChannelWriteKey,
        [channelMapping_1.get(id).field]: newState? 1000 : 500
      }
    }).then(res => {
      if(res.data !== 0){

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
        })

      } else {
        console.log('error')
      }
    }).catch(err => console.log(err))


    
  }

  switchActiveTab(tab){
    this.setState({
      activeTab: tab
    })
  }

  setActiveSource(source){

    axios.get('https://api.thingspeak.com/update', {
      params: {
        api_key: constants.writeKey,
      }
    }).then(res => {
      if(res.data !== 0){
        this.setState({
          activeSource: source
        })
      }
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
      bulbStatus: !this.false
    })
  }
  
  render(){
    const {activeTab} = this.state;
    return (

      <div className="App">
        <header className="App-header">
          {this.state.modal.show && <Modal message={this.state.modal.message} />}
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
            <UserLogs communities={this.state.communities} controlUser={this.controlUser} />
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
