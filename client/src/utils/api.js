import axios from 'axios';
// import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'csrf-token': Cookies.get("XSRF-TOKEN"),
  },
  withCredentials: true
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/


export default api;
