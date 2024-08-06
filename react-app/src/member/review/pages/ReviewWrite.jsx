import React, { useContext } from 'react';
import { FlightInfoContext, useFlightInfo } from '../../flightInfo/contexts/FlightInfoContext';

const ReviewWrite = () => {

    // const {flightInfo} = useFlightInfo();
    const { flightInfo, setFlightId } = useContext(FlightInfoContext);
    
    return (
        <>
            
        </>
    );
};

export default ReviewWrite
;