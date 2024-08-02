import React, { useContext, useEffect } from 'react';
import { FlightInfoContext } from '../contexts/FlightInfoContext';
import FlightInfoItem from '../components/FlightInfoItem';
import { useParams } from 'react-router-dom';

const FlightInfoPage = () => {
  const { flightId } = useParams();
  const { flightInfo, setFlightId } = useContext(FlightInfoContext); 
  
  useEffect(() => {
    setFlightId(flightId);
  }, [flightId, setFlightId]);

  return (
    <div>
      <h1>항공편 상세 정보</h1>

      {flightInfo ? (
        <>
          <FlightInfoItem info={flightInfo.flightInfo} />
          <h2>항공편 일정</h2>
          {flightInfo.timetable && flightInfo.timetable.length > 0 ? (
            flightInfo.timetable.map((info, index) => (
              <FlightInfoItem key={index} info={info} />
            ))
          ) : (
            <p>항공편 일정 정보가 없습니다.</p>
          )}
        </>
      ) : (
        <p>항공편 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FlightInfoPage;
