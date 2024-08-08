import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'


export const getLiveInfo = (flightIata) => api.get(`${SERVER_HOST}/live/${flightIata}`)


