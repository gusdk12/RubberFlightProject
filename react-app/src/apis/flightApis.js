import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

// country 정보 요청
export const countryInfo = (isoCode) => api.post(`${SERVER_HOST}/country/${isoCode}`);

// Flight Tracking 정보 요청
export const getFlightInfo = (depIata = "ICN", arrIata = "PVG") => api.get(`${SERVER_HOST}/flightInfo/flights/${depIata}/${arrIata}`); // 임시 데이터

export const searchFlight = (iataCode, depDate, arrIataCode, arrDate, mode) => api.get(`${SERVER_HOST}/search`, {
    params: {
        iataCode,
        depDate,
        arrIataCode,
        arrDate,
        mode
    }
});