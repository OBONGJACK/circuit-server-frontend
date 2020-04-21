import React, {Component} from 'react'
import { Device_Status } from '../components/Icons'

class UserLogs extends Component {
    constructor(props){
        super(props)
        this.state = {
            names : [
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
            ]
        }

        this.controlUser = this.controlUser.bind(this)
    }

    controlUser(id){
        this.setState({
            names: this.state.names.map(name => {
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
    render(){
        const { names } = this.state;
        return (
            <div className="main-content">
            <h1 className="app-title">intelligent master Operator Page</h1>
                <h2>UserLogs</h2>
                <div className="user-logs-wrap">
                    <ul>
                        {
                          names.map(name => {
                              return (
                                <li key={name.id}>
                                    <div>
                                        {name.name}
                                    </div>
                                    <div>
                                        {name.status? Device_Status('on') : Device_Status('off')}
                                    </div>
                                    <div>
                                        <button onClick={() => this.controlUser(name.id)}>{name.status? 'Turn Off' : 'Turn On'}</button>
                                    </div>
                                    <div>
                                        <button>History</button>
                                    </div>
                                </li>
                              )
                          })
                        }
        
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserLogs