import axios from 'axios';

const baseURL = 'http://localhost:8000'; 

const axiosInstance = axios.create({
  baseURL, // 기본 URL 적용
  timeout: 1000 * 60 * 5, // 요청 시간 초과: 5분
  headers: {
    'Content-Type': 'application/json', // 요청 데이터 형식 JSON
  },
});

export const UserformAPI = (data) => {
  return axiosInstance.post(`/Userform`, data);
};


export default axiosInstance;

