import './App.css'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import Login from './pages/authentication/Login'
import Dashboard from './pages/main/Dashboard'

function App() {
  const location = useLocation();
  const hideNavigationBar = ["/", "/login"];
  const isAuthenticated = window.sessionStorage.getItem('isAuthenticated');

  return (
    <>
      {!hideNavigationBar.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route path='/' element={isAuthenticated === 'true'? <Navigate to='/dashboard' />: <Login />}/>
        <Route path='/login' element={isAuthenticated === 'true'? <Navigate to='/dashboard' />: <Login />}/>

        <Route path='/dashboard' element={<Dashboard />}/>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App