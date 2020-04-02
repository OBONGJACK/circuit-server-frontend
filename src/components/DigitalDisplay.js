import React, {Component} from 'react'

class DigitalDisplay extends Component {
    
    render(){
        return (
            <div className="digital-display">
                {this.props.value? this.props.value : '---'}
            </div>
        )
    }
}

export default DigitalDisplay