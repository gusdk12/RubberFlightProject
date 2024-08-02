import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

// country 정보 요청
export const countryInfo = (isoCode) => api.post(`${SERVER_HOST}/country/${isoCode}`);

// 특정 항공편 정보 요청
export const getFlightInfoById = (id) => api.get(`${SERVER_HOST}/flightInfo/flights/${id}`);