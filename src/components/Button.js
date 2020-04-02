import React, {Component} from 'react'

class Button extends Component {

    render(){
        const {status} = this.props;
        return (
            <button className="btn-toggle" onClick={this.props.switchStatus}>{status? 'TURN OFF' : 'TURN ON'}</button>
        )
    }
}

export default Button