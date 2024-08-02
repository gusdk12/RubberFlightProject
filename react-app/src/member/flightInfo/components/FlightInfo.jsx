import React, { useEffect, useState } from 'react';
import { getFlightInfo } from '../../../apis/flightApis';

const FlightInfo = () => {
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    const fetchFlightInfo = async () => {
    const response = await getFlightInfo();
    console.log("Response:", response);

    const data = response.data;
    console.log("data:", data);

    const extractedData = data.map(flight => ({
      airlineIataCode: flight.airline.iataCode,
      departureIataCode: flight.departure.iataCode,
      arrivalIataCode: flight.arrival.iataCode,
      flightNumber: flight.flight.number,
      status: flight.status
    }));
    setFlight(extractedData);
    
    };
    fetchFlightInfo();
  }, []);

  return (
    <div>
      <h1>나의 항공편</h1>
      {flight.map((info, index) => (
        <div key={index}>
          <p>항공사 코드: {info.airlineIataCode}</p>
          <p>출발 공항 코드: {info.departureIataCode}</p>
          <p>도착 공항 코드: {info.arrivalIataCode}</p>
          <p>항공편 번호: {info.flightNumber}</p>
          <p>상태: {info.status}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightInfo;
