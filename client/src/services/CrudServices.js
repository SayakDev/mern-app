import axios from "axios";
import {getTokenFromLocalStorage} from "../utils/helper";

const token = getTokenFromLocalStorage()
console.log(token)
const privateAxios = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
        timeout: 1000,
      });

privateAxios.interceptors.request.use(function (config) {
  const token = getTokenFromLocalStorage()
  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }else{
    window.location.href = '/login'
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


export const submitCrud = async (data) => {
    return privateAxios.post('/submit-crud', data).then(res=> res.data);
}