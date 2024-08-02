import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

export const getCountryInfo = (isoCode) => api.get(`${SERVER_HOST}/country/${isoCode}`);
