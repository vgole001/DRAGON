import React, { useState } from 'react';
import useInterval from './UseInterval'

const ShowTime = (props) => {
    const [now, setNow] = useState()
    const getTime = () => {
        const date = new Date();
        const time = date.toTimeString().split(' ')[0];
        setNow(time);
    };    
    useInterval(getTime, 1000);

    return (
       <p style={{fontSize:'0.9rem', marginLeft:'20px'}}>
        {now}
       </p>
    )
};

export default ShowTime