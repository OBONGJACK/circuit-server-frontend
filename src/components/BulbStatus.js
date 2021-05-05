import React, {Component} from 'react'

import Button from './Button'
import {BulbOn, BulbOFF} from './Icons'

class BulbStatus extends Component {
    
    render(){
        const {bulbStatus, deviceStatus, switchBulbStatus} = this.props;
        
        return (
            <div className="device-card">
                {bulbStatus && deviceStatus? <BulbOn /> : <BulbOFF />}
                <h2>Supply Status: {bulbStatus && deviceStatus? 'ON' : 'OFF'}</h2>
                <Button status={bulbStatus} switchStatus={switchBulbStatus} />
            </div>
        )
    }
}

export default BulbStatus