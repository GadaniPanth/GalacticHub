import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'
const AxiosInstance = axios.create({
    baseURL:baseUrl,
    timeout:5000,
    headers:{
        'Content-Type':'application/json',
        accept: 'application/json'
    }
})

export default AxiosInstance

//https://www.youtube.com/watch?v=Qv4JAguJvl4&list=PLmEKHA8iFrmBCo1Guf3xbM1af5p5Ja-fy&index=8