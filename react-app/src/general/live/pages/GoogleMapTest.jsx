import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Input, Button, Divider } from '@chakra-ui/react';
import { getLiveInfo } from '../../../apis/liveInfoApis';
import Header from '../../../general/common/Header/Header';
import styles from '../CSS/LiveFlight.module.css';

const containerStyle = {
  width: '1200px',
  height: '600px'
};

const center = {
  lat: 54.254,
  lng: 170.546
};

const darkModeStyles = [
    [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]
];

const GoogleMapTest = () => {
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
        arrIataCode: data.arrival.iataCode,
        depIataCode: data.departure.iataCode,
        latitude: data.geography.latitude,
        longitude: data.geography.longitude,
        direction: data.geography.direction,
        altitude: data.geography.altitude,
        horizontal: data.speed.horizontal,
        airlineIata: data.airline.iataCode,
      };

      setFlightData(extractedData);
    } catch (error) {
      window.alert("존재하지 않습니다.");
    }
  };

  return (
    <>
      <Header isMain={true}/>

      <div className={styles.allCon}>
        <div className={styles.scheduleHeader}>비행기 위치를 실시간으로 - </div>
        <div className={styles.scheduleInfo}>
          비행기 코드를 통해 위치를 검색해보세요. <br/>
          친구나 가족들이 타고있는 항공편의 실시간 위치를 알 수 있어요.
        </div>

        <Divider my={7}/>

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
          <Button onClick={searchFly} id={styles.searchBtn}>Search</Button>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyAUE-qzPob_mpqr2KUELbQjHwuRe8-CUXc">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={{
              disableDefaultUI: true,
              styles: darkModeStyles, // 어두운 테마 적용
            }}
          >
            {flightData && (
              <Marker
                position={{ lat: flightData.latitude, lng: flightData.longitude }}
                label={`Flight ${flightData.flightIata}`}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default GoogleMapTest;
