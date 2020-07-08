import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";

const ControlPanel = (props) => {

    const [cors, setCors] = useState(null);
    const url = props.endpoint;

    useEffect(() => {
        
    }, []);

    const corsTest = async () => {
        const result = await axios.get(url);
        console.log(`Response: ${JSON.parse(result)}`);
        setCors(result);
    };

    return (
        <div className="ControlPanel-Outer">
            <Button variant="outlined" color="secondary" onClick={() => corsTest()}>Test</Button>
        </div>
      );
};

export default ControlPanel;