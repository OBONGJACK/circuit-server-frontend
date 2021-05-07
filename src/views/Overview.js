import React, { Component } from "react";

import BulbStatus from "../components/BulbStatus";
import DeviceStatus from "../components/DeviceStatus";
import { Device_Status } from "../components/Icons";

import PviCard from "../components/pviCard";

class Overview extends Component {
  render() {
    const {
      activeSource,
      bulbStatus,
      deviceStatus,
      powerProduced,
      powerConsumed,
      communities,
    } = this.props.data;

    const {
      switchBulbStatus,
      switchDeviceStatus,
      setActiveSource,
      controlUser,
    } = this.props;

    return (
      <div className="main-content">
        <h1 className="app-title">
          Development of intelligent master controller for Hybridized power pool
          System Applications
        </h1>
        <div className="main-content-top">
          <PviCard
            title="GRID SOURCE"
            setActiveSource={setActiveSource}
            source="Grid"
            activeSource={activeSource}
          />
          <PviCard
            title="RENEWABLE SOURCE"
            setActiveSource={setActiveSource}
            source="Renewable"
            activeSource={activeSource}
          />
          <PviCard
            title="GENERATOR SOURCE"
            setActiveSource={setActiveSource}
            source="Generator"
            activeSource={activeSource}
          />
        </div>
        <div className="main-content-top">
          <PviCard
            title="VOLTAGE"
            value={deviceStatus ? powerProduced : "---"}
          />
          <PviCard
            title="CURRENT"
            value={deviceStatus ? powerConsumed : "---"}
          />
        </div>
        <div className="main-content-body">
          <DeviceStatus
            deviceStatus={deviceStatus}
            switchDeviceStatus={switchDeviceStatus}
            activeSource={activeSource}
          />
          <BulbStatus
            bulbStatus={bulbStatus}
            deviceStatus={deviceStatus}
            switchBulbStatus={switchBulbStatus}
          />
        </div>
        <div className="user-logs-wrap">
          <ul>
            {communities.map((name) => {
              return (
                <li key={name.id}>
                  <div> {name.name} </div>
                  <div>
                    {name.status
                      ? Device_Status("on")
                      : Device_Status("off")}
                  </div>
                  <div>
                    <button onClick={() => controlUser(name.id)}>
                      {name.status ? "Turn Off" : "Turn On"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Overview;
