import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const submitRegistration = async (data) => {

    return await axios.post(`${BASE_URL}auth/submit-registration`, data).then((res)=> res.data).catch(err=>err);
}

export const checkAuthentication = async (data) => {
    const config = {headers: {Authorization: `Bearer ${data}`}}
    return await axios.post(`${BASE_URL}auth/check-auth`, {}, config).then(res=> res.data)
}

export const submitLogin = async (data) => {
    return axios.post(`${BASE_URL}auth/login-submit`, data).then(res=> res.data);
}