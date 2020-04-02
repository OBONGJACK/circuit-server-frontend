import React, {Component} from 'react'
import DigitalDisplay from './DigitalDisplay'

class PVI extends Component {
    render(){
        return (
            <div className="pvi-details">
                <ul>
                    <li>VOLTAGE: <DigitalDisplay /></li>
                    <li>CURRENT: <DigitalDisplay /></li>
                    <li>POWER PRODUCED: <DigitalDisplay /></li>
                    <li>POWER CONSUMED: <DigitalDisplay /></li>
                </ul>
            </div>
        )
    }
}

export default PVI