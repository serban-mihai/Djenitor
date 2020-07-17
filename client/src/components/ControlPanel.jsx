import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { red } from "@material-ui/core/colors";

const ControlPanel = (props) => {

    const [connected, setConnected] = useState(false);
    const url = props.endpoint;
    const headers = {
        "Content-Type": "application/json"
    }

    useEffect(() => {
        
    }, []);

    const fetchSensor = async () => {
        await axios.get(`${url}/sensor/port`)
            .then(async (result) => {
                result.data.forEach(async (element) => {
                    if(element["manufacturer"] === "Teensyduino") {
                        await axios.post(`${url}/sensor/port`, { port: element["path"] }, { headers: headers })
                            .then((res) => {
                                setConnected(true);
                                return;
                            })
                            .catch((post) => {
                                console.log(`POST Error: ${JSON.stringify(post)}`);
                            });
                    }
                });
            })
            .catch((get) => {
                console.log(`GET Error: ${JSON.stringify(get)}`);
            });
    };

    return (
        <div className="ControlPanel-Outer">
            <Button variant="outlined" color="secondary" onClick={() => fetchSensor()}>Connect</Button>
        </div>
      );
};

export default ControlPanel;