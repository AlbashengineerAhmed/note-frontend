import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({loginData}) {
  // console.log(loginData);
  return (
    <>
      {loginData ? <Outlet/> : <Navigate to="login"/>}
    </>
  )
}
