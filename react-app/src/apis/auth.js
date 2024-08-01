import axios from 'axios'
import api from './api'

import { SERVER_HOST } from './api'

// 요청하는 동작들에 대해서 함수로 만들어 export 해둔다

// 로그인 요청
// (username, password) => axios.post(`${SERVER_HOST}/login`, {username, password}) // axios는 기본적으로 json 으로  serialize 하여 데이터 전송함.
export const login = (username, password) => api.post(`${SERVER_HOST}/login`, {username, password}, {headers: {"Content-Type" : "application/x-www-form-urlencoded"}})

// user 정보 요청
export const userInfo = () => api.get(`${SERVER_HOST}/user`);

// auth 정보 요청
export const authInfo = () => api.get(`${SERVER_HOST}/auth`);

// 회원가입 요청
export const join = (formData) => api.post(`${SERVER_HOST}/user/join/user`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});