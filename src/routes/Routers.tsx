import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/auth/Login"; 
import { Signup } from "../pages/auth/Signup";

export const Routers = () => {
  return (
    <div className='text-primary_dark dark:text-primary_light'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    </div>
  )
}
