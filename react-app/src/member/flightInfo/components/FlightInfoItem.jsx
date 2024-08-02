import React from 'react';

const FlightInfoItem = ({ info }) => {
  return (
    <div>
      {/* 항공편 상태 */}
      <p>상태: {info.status || "N/A"}</p>
      
      {/* 항공사 정보 */}
      {info.airline && (
        <>
          <p>항공사: {info.airline.name || "N/A"} ({info.airline.iataCode})</p>
        </>
      )}

      {/* 출발 정보 */}
      {info.departure && (
        <>
          <p>출발 공항: {info.departure.iataCode || "N/A"}</p>
          <p>출발 게이트: {info.departure.gate || "N/A"}</p>
          <p>출발 예정 시간: {new Date(info.departure.scheduledTime).toLocaleString() || "N/A"}</p>
          <p>출발 상태: {info.departure.delay ? `${info.departure.delay} 분 지연` : "정시 출발"}</p>
        </>
      )}

      {/* 도착 정보 */}
      {info.arrival && (
        <>
          <p>도착 공항: {info.arrival.iataCode || "N/A"}</p>
          <p>도착 예정 시간: {new Date(info.arrival.scheduledTime).toLocaleString() || "N/A"}</p>
        </>
      )}
      
      <hr />
    </div>
  );
};

export default FlightInfoItem;
