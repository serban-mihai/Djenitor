import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";

const ControlPanel = (props) => {

    const [sensors, setSensors] = useState(null);
    const url = props.endpoint;

    useEffect(() => {
        
    }, []);

    const getSensors = async () => {
        const result = await axios.get(`${url}/sensor/port`);
        setSensors(result);
    };

    const printSensors = () => {
        console.log(JSON.stringify(sensors));
    }

    const listSensors = () => {
        if(sensors !== null) {
            return sensors["data"].map((sensor) => <li>{String(sensor)}</li>);
        } else {
            return <li></li>
        }
        
    };

    return (
        <div className="ControlPanel-Outer">
            <Button variant="outlined" color="secondary" onClick={() => getSensors()}>Connect</Button>
            <Button variant="outlined" color="primary" onClick={() => printSensors()}>List</Button>
            <ul>
                {listSensors()}
            </ul>
        </div>
      );
};

export default ControlPanel;