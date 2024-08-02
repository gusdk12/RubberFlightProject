import React, { useEffect, useState } from 'react';
import { getUserFlightInfo, getFlightDetails } from '../../../apis/flightApi'; 

const FlightInfo = ({ reservationId }) => {
  const [flightInfo, setFlightInfo] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);

  useEffect(() => {
    const fetchUserFlightInfo = async () => {
      try {
        const response = await getUserFlightInfo(reservationId);
        setFlightInfo(response.data);
      } catch (error) {
        console.error('Error fetching user flight info:', error);
      }
    };

    fetchUserFlightInfo();
  }, [reservationId]);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (flightInfo.length > 0) {
        const depIata = flightInfo[0].depIata; // 첫 번째 항공편 정보에서 출발 공항 코드 가져오기
        const arrIata = flightInfo[0].arrIata; // 도착 공항 코드 가져오기

        try {
          const response = await getFlightDetails(depIata, arrIata);
          setFlightDetails(response.data);
        } catch (error) {
          console.error('Error fetching flight details:', error);
        }
      }
    };

    fetchFlightDetails();
  }, [flightInfo]);

  return (
    <div>
      <h1>예약 항공편 정보</h1>
      {flightInfo.map((flight) => (
        <div key={flight.id}>
          <h2>항공편: {flight.flightIat}</h2>
          <p>출발 공항: {flight.depAirport} ({flight.depIata})</p>
          <p>도착 공항: {flight.arrAirport} ({flight.arrIata})</p>
          <p>가격: {flight.price} 원</p>
          <p>출발 예정 시간: {new Date(flight.depSch).toLocaleString()}</p>
          <p>도착 예정 시간: {new Date(flight.arrSch).toLocaleString()}</p>
        </div>
      ))}

      <h2>항공 정보</h2>
      {flightDetails.map((detail, index) => (
        <div key={index}>
          <p>항공사 코드: {detail.airline.iataCode}</p>
          <p>상태: {detail.status}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightInfo;
