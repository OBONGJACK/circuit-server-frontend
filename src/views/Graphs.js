import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'

class Graphs extends Component {
    render(){
        let data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Power Consumed",
                    // backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
                {
                    label: "Power Produced",
                    // backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0,0,255)',
                    data: [10, 20, 30, 20, 30, 50, 60]
                }
        ]
        }

        return (
            <div className="main-content">
                <h1 className="app-title">intelligent master Graph Page</h1>
                <h2>Graphs</h2>
                <Line 
                    data={data}
                    height={500}
                    width={800} />
            </div>
        )
    }
}

export default Graphs