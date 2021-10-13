import axios from 'axios';

let APIKit = axios.create({
  //baseURL:'http://localhost:8080/api',
  baseURL: 'http://api-sefin-rrhh-gateway-desa-api-rrhh-pool.apps.galel.sefin.gob.hn/api',
  timeout: 45000,
});

export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `${token}`;
    return config;
  });
};

export default APIKit;