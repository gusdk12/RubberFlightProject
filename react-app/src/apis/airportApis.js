import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

export const getAirportInfo = (codeIataAirport) => api.get(`${SERVER_HOST}/airport/${codeIataAirport}`);
