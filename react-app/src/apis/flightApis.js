import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

// country 정보 요청
export const countryInfo = (isoCode) => api.post(`${SERVER_HOST}/country/${isoCode}`);

// Flight Tracking 정보 요청
const FLIGHT_KEY = process.env.REACT_APP_FLIGHT_KEY;
export const getFlightInfo = () => api.get(`https://aviation-edge.com/v2/public/flights?key=${FLIGHT_KEY}&depIata=ICN&arrIata=PVG`); // 임시 데이터
// export const getFlightInfo = (depIata, arrIata) => api.get(`${SERVER_HOST}/flightInfo/flights/${depIata}/${arrIata}`);