import React, {Component} from 'react'

import Button from './Button'
import {BulbOn, BulbOFF} from './Icons'

class DeviceStatus extends Component {
    render(){
      const {deviceStatus, switchDeviceStatus, activeSource} = this.props;

        return (
            <div className="device-card">
                {deviceStatus? <BulbOn /> : <BulbOFF />}
                <h2>Source Status: {activeSource}</h2>
                <Button status={deviceStatus} switchStatus={switchDeviceStatus} />
            </div>
        )
    }
}

export default DeviceStatus