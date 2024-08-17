import axios from "axios";

// 자주 사용하게 되는 axios는 인스턴스를 만들어 export 해둡니다.
// https://axios-http.com/kr/docs/instance
//  axios.create({사용자 지정 config})


const api = axios.create();

export const SERVER_HOST = process.env.REACT_APP_BACK_URL;// `http://localhost:8282`;

export default api;