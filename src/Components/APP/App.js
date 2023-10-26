import React, { useEffect, useState } from 'react'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import NoteFound from '../NoteFound/NoteFound'
import Register from '../Register/Register'
import {Route , Routes, useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import axios from 'axios'

function App() {
  let navigate = useNavigate()
  let [loginData , setLoginData] = useState(null)
  let [loading, setLoading] = useState(true);
  let [name, setName] = useState(null);

  function getUserData(){
    let token = localStorage.getItem("token");
    if (token) {
      let decode = jwt_decode(token);
      // console.log(decode);
      setLoginData(decode);
      setLoading(false); // Set loading to false after login data is retrieved
    }
  }
  function logOut(){
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login")
  }
  const userProfile = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (token) {
        const config = {
          headers: {
            'authorization': `ahmed_${token}`
          }
        };
  
        const { data } = await axios.get('http://localhost:5000/user/profile', config);
        // console.log(data.user.userName);
        setName(data.user.userName)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  }
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      getUserData();
      userProfile()
    } else {
      setLoading(false); // If there's no token, set loading to false
    }
  },[])
  return (
    <>
      <Navbar name = {name} loginData={loginData} logOut={logOut} />
      {loading ? (
        <span className='loading'><i className="fa-solid fa-spinner fa-spin"></i></span>
      ) : (
        <Routes>
          <Route element={<ProtectedRoute loginData={loginData} />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login userProfile = {userProfile} getUserData={getUserData} />} />
          <Route path="*" element={<NoteFound />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  )
}

export default App