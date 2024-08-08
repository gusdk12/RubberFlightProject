import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

export const getAirportInfo1 = (codeIataAirport) => api.get(`${SERVER_HOST}/airport/${codeIataAirport}`);

export const getAirportInfo2 = (codeIataAirport, codeIso2Country) => api.get(`${SERVER_HOST}/airport/${codeIataAirport}/${codeIso2Country}`);
