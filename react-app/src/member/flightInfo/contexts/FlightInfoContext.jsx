import React, { createContext, useState, useEffect } from "react";
import { getFlightInfoById } from "../../../apis/flightApis";

export const FlightInfoContext = createContext();

export const FlightInfoProvider = ({ children }) => {
  const [flightInfo, setFlightInfo] = useState(null);
  const [flightId, setFlightId] = useState(null);

  const fetchFlightInfo = async () => {
    if (flightId) {
      const response = await getFlightInfoById(flightId);
      const fetchedData = response.data; 
      console.log("Fetched Data:", fetchedData);
      setFlightInfo(fetchedData); 
    }
  };

  useEffect(() => {
    fetchFlightInfo();
  }, [flightId]);

  return (
    <FlightInfoContext.Provider value={{ flightInfo, setFlightId }}>
      {children}
    </FlightInfoContext.Provider>
  );
};
