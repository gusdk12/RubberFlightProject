import React, { useState, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { getLiveInfo } from '../../../apis/liveInfoApis';

import Header from '../../../general/common/Header/Header';
import '../CSS/LiveFlight.css';

const LiveFlight = () => {
    const [flightIataInput, setFlightIataInput] = useState("");
    const [flightData, setFlightData] = useState(null);

    const searchFly = async () => {
        try {
            const response = await getLiveInfo(flightIataInput);
            const data = response.data[0];

            if (!data) {
                window.alert("해당 IATA 코드에 대한 비행 정보가 없습니다.");
                setFlightIataInput('');
                return;
            }

            const extractedData = {
                flightIata: data.flight.iataNumber,
                arrIataCode: data.arrival.iataCode, // 도착 공항
                depIataCode: data.departure.iataCode, // 출발 공항
                latitude: data.geography.latitude, // 위도
                longitude: data.geography.longitude, // 경도
                direction: data.geography.direction, // 방향
                altitude: data.geography.altitude, // 고도
                horizontal: data.speed.horizontal, // 속도
                airlineIata: data.airline.iataCode, // 항공사 정보
            };

            setFlightData(extractedData);
        } catch (error) {
            window.alert("존재하지 않습니다.");
        }
    }

    return (
        <>
            <Header isMain={true}/>

            <div className='live-scheduleHeader'>일정과 체크리스트를 한번에 - </div>
            <div className='live-scheduleInfo'>
                나만의 체크리스트를 만들어 놓치는 물건이 없나 확인해보세요.<br/>
                함께 여행하는 가족, 친구와 함께 일정을 짤 수도 있어요.
            </div>
            <Input
                id="flightIata"
                type="text"
                placeholder='비행 코드 입력하기'
                _placeholder={{ opacity: 1, color: 'black.500' }}
                name="flightIata"
                value={flightIataInput}
                onChange={(e) => setFlightIataInput(e.target.value)}
            />
            <Button onClick={searchFly} id='searchBtn'>Search</Button>

            {/* {flightData && (
                <div>
                    <h2>Flight Information</h2>
                    <p><strong>Flight IATA Code:</strong> {flightData.flightIata}</p>
                    <p><strong>Departure Airport IATA Code:</strong> {flightData.depIataCode}</p>
                    <p><strong>Arrival Airport IATA Code:</strong> {flightData.arrIataCode}</p>
                    <p><strong>Latitude:</strong> {flightData.latitude}</p>
                    <p><strong>Longitude:</strong> {flightData.longitude}</p>
                    <p><strong>Direction:</strong> {flightData.direction}</p>
                    <p><strong>Altitude:</strong> {flightData.altitude}</p>
                    <p><strong>Horizontal Speed:</strong> {flightData.horizontal}</p>
                    <p><strong>Airline IATA Code:</strong> {flightData.airlineIata}</p>
                </div>
            )} */}
        </>
    );
};

export default LiveFlight;
