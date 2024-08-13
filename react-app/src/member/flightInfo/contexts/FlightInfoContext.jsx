import React, { createContext, useState, useEffect } from "react";
import { getFlightInfo } from "../../../apis/flightApis"; 

export const FlightInfoContext = createContext();

export const FlightInfoProvider = ({ children }) => {
  const [flightInfo, setFlightInfo] = useState(null);
  const [history, setHistory] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [flightId, setFlightId] = useState(null);

  const fetchFlightData = async () => {
    if (flightId) {
      const startTime = performance.now();

      try {
        const response = await getFlightInfo(flightId);
        const fetchedData = response.data; 

        setFlightInfo(fetchedData.flightInfo || null);
        setHistory(fetchedData.history || []);
        setTimetable(fetchedData.timetable || []);

        console.log("History:", fetchedData.history);
        console.log("Timetable:", fetchedData.timetable);

        const endTime = performance.now();
        const duration = endTime - startTime; 
        console.log(`API 호출 소요 시간: ${duration.toFixed(2)}ms`); 
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    }
  };

  useEffect(() => {
    fetchFlightData();
  }, [flightId]);

  return (
    <FlightInfoContext.Provider value={{ flightInfo, history, timetable, setFlightId }}>
      {children}
    </FlightInfoContext.Provider>
  );
};
