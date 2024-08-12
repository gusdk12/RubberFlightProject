import React, { createContext, useState, useEffect } from "react";
import { getFlightTimetable, getFlightHistory } from "../../../apis/flightApis";

export const FlightInfoContext = createContext();

export const FlightInfoProvider = ({ children }) => {
  const [flightInfo, setFlightInfo] = useState(null);
  const [flightHistory, setFlightHistory] = useState(null); 
  const [flightId, setFlightId] = useState(null);

  const fetchFlightInfo = async () => {
    if (flightId) {
      const startTime = performance.now();

      const response = await getFlightTimetable(flightId);
      const fetchedData = response.data; 
      console.log("Timetable:", fetchedData);

      const endTime = performance.now();
      const duration = endTime - startTime; 
      console.log(`API 호출 소요 시간: ${duration.toFixed(2)}ms`); 

      setFlightInfo(fetchedData); 
    }
  };

  const fetchFlightHistory = async () => {
    if (flightId) {
      const startTime = performance.now();

      const response = await getFlightHistory(flightId); 
      const fetchedHistory = response.data; 
      console.log("History:", fetchedHistory);

      const endTime = performance.now();
      const duration = endTime - startTime; 
      console.log(`API 호출 소요 시간: ${duration.toFixed(2)}ms`); 

      setFlightHistory(fetchedHistory);
    }
  };

  useEffect(() => {
    fetchFlightInfo();
    fetchFlightHistory(); 
  }, [flightId]);

  return (
    <FlightInfoContext.Provider value={{ flightInfo, flightHistory, setFlightId }}>
      {children}
    </FlightInfoContext.Provider>
  );
};
