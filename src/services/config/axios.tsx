import axios from "axios";

 //const BASE_URL = 'http://localhost:5000/api/v1/' ;
 const BASE_URL ='https://passcrafter-x.onrender.com/api/v1/'


const instance = axios.create({
    baseURL: BASE_URL,
  });
  
  export default instance;