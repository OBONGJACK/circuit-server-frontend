import React, {Component} from 'react';
import DigitalDisplay from './DigitalDisplay';


class PviCard extends Component {
    render(){
        const {title, value, setActiveSource, activeSource, source} = this.props;
        return (
            <div className="pvi-card">
                <h4>{title}</h4>
                {value && <DigitalDisplay value={value} /> }
                {!value && <button className="btn-control" onClick={() => setActiveSource(source)}>{activeSource === source ? "Active" : "Switch"}</button> }
                {source && activeSource === source && <div className="indicator"></div>}
            </div>
        )
    }
}

export default PviCard
  