/**
 * Holds the config for the axios instance
 */

import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': true,
        "host_name": window.location.host
    },
    withCredentials: true
});


console.log(window.location);

export default instance;