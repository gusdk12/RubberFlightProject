import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FlightInfoList = () => {
  const [flightInfoList, setFlightInfoList] = useState([]);

  useEffect(() => {
    const fetchFlightInfo = async () => {
      const response = await axios.get('http://localhost:8282/flightInfo/list'); 
      setFlightInfoList(response.data);
    };

    fetchFlightInfo();
  }, []);

  return (
    <div>
      <h1>나의 예약 목록</h1>

      {flightInfoList.length > 0 ? (
        flightInfoList.map((flight) => (
          <div key={flight.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>
              <Link to={`/flightInfo/${flight.id}`}>{flight.depAirport} → {flight.arrAirport}</Link>
            </h2>
            <p>항공사: {flight.airlineName}</p>
            <p>출발 일시: {new Date(flight.depSch).toLocaleString()}</p>
            <p>도착 일시: {new Date(flight.arrSch).toLocaleString()}</p>
            <p>인원: {flight.reserve.personnel}</p>
            <p>가격: {flight.price.toLocaleString()} 원</p>
          </div>
        ))
      ) : (
        <p>예약된 항공편이 없습니다.</p>
      )}
    </div>
  );
};

export default FlightInfoList;
