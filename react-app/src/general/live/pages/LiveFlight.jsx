import React, { useEffect, useState } from 'react';
import { Input, Button, Divider, Image } from '@chakra-ui/react';
import { getLiveInfo } from '../../../apis/liveInfoApis';
import { getAirportInfo1 } from '../../../apis/airportApis';
import Header from '../../../general/common/Header/Header';
import styles from '../CSS/LiveFlight.module.css';
import loadingImage from '../../../assets/images/main/loading.webp';

const LiveFlight = () => {
  const [flightIataInput, setFlightIataInput] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [depAirportData, setDepAirportData] = useState(null);
  const [arrAirportData, setArrAirportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#dde6f5';
    document.body.style.overflowY = 'scroll';
    document.body.style.overflowX = 'hidden';
  }, []);

  const searchFly = async () => {
    setLoading(true);

    try {
      const response = await getLiveInfo(flightIataInput);
      const data = response.data[0];

      if (!data) {
        window.alert("해당 IATA 코드에 대한 비행 정보가 없습니다.");
        setFlightIataInput('');
        setLoading(false);
        return;
      }

      const extractedData = {
        flightIata: data.flight.iataNumber,
        arrIataCode: data.arrival.iataCode,
        depIataCode: data.departure.iataCode,
        latitude: data.geography.latitude,
        longitude: data.geography.longitude,
        direction: data.geography.direction,
        altitude: data.geography.altitude,
        horizontal: data.speed.horizontal,
        airlineIata: data.airline.iataCode,
        status: data.status,
      };

      setFlightData(extractedData);

      const [arrAirportResponse, depAirportResponse] = await Promise.all([
        getAirportInfo1(extractedData.arrIataCode),
        getAirportInfo1(extractedData.depIataCode),
      ]);

      if (arrAirportResponse.data[0]) {
        setArrAirportData({
          name: arrAirportResponse.data[0].nameAirport,
          latitude: arrAirportResponse.data[0].latitudeAirport,
          longitude: arrAirportResponse.data[0].longitudeAirport,
        });
      }

      if (depAirportResponse.data[0]) {
        setDepAirportData({
          name: depAirportResponse.data[0].nameAirport,
          latitude: depAirportResponse.data[0].latitudeAirport,
          longitude: depAirportResponse.data[0].longitudeAirport,
        });
      }

      // 데이터가 모두 준비되었을 때 iframe에 메시지 전달
      if (extractedData && arrAirportResponse.data[0] && depAirportResponse.data[0]) {
        const iframe = document.getElementById('map-iframe');

        // Check if iframe and its contentWindow are available
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'UPDATE_COORDINATES',
            liveLat: extractedData.latitude,
            liveLng: extractedData.longitude,
            arrAirportLat: arrAirportResponse.data[0].latitudeAirport,
            arrAirportLng: arrAirportResponse.data[0].longitudeAirport,
            depAirportLat: depAirportResponse.data[0].latitudeAirport,
            depAirportLng: depAirportResponse.data[0].longitudeAirport,
          }, '*');
        } else {
          console.error('iframe or contentWindow is not available.');
        }
      } else {
        window.alert('해당 비행 정보가 없습니다.');
      }
    } catch (error) {
      console.error("Error fetching flight or airport data:", error);
      window.alert("존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header isMain={true} />

      <div className={styles.allCon}>
        <div className={styles.scheduleHeader}>비행기 위치를 실시간으로 - </div>
        <div className={styles.scheduleInfo}>
          비행기 코드를 통해 위치를 검색해보세요. <br />
          친구나 가족들이 타고있는 항공편의 실시간 위치를 알 수 있어요.
        </div>

        <Divider my={7} />

        <div className={styles.searchCon}>
          <Input
            id={styles.flightIata}
            type="text"
            placeholder='비행 코드 입력하기'
            _placeholder={{ opacity: 1, color: 'black.500' }}
            name="flightIata"
            value={flightIataInput}
            onChange={(e) => setFlightIataInput(e.target.value)}
          />
          <Button onClick={searchFly} id={styles.searchBtn} isLoading={loading}>Search</Button>
        </div>

        <div className={styles.earthCon}>
        {flightData && arrAirportData && depAirportData && (
            <div className={styles.aboutFlight}>
              Arrival Airport: {arrAirportData.name}<br />
              Departure Airport: {depAirportData.name}<br />
              Status: {flightData.status}<br />
              Speed: {flightData.horizontal} km/h<br />
            </div>
          )}
          <iframe
            id="map-iframe"
            src="/ApiTest.html"
            width="100%"
            height="100%"
            title="Google Map"
          ></iframe>
          {loading && (
            <div className={styles.loadingOverlay}>
              <Image src={loadingImage} alt="Loading" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveFlight;
