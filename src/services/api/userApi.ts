import axios from "../config/axios";

export const singupApi = (userData: { userName: string;email: string;password: string}) => {
 return axios.post("sign-up", userData);
};

export const loginApi = (userData: { email: string; password: string }) => {
  return axios.post("login", userData);
};

export const savePasswordApi = (userData: { appName: string; userName: string; password: string }, headers: any) => {
  return axios.post("saved-password", userData, { headers });
};

export const fetchSavedPassword = (headers:any) =>{
  return axios.get("fetchSavedData",{headers})
}