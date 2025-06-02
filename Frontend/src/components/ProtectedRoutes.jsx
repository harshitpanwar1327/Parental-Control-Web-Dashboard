import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutes = () => {
  let isAuthenticated = window.sessionStorage.getItem('authToken');

  return isAuthenticated === 'true'? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoutes