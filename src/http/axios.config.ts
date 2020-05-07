import axios from 'axios';

const BASE_API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  responseType: 'json',
});

axiosInstance.interceptors.request.use(config => {
  const { headers } = config;

  return config;
});

export { axiosInstance };
