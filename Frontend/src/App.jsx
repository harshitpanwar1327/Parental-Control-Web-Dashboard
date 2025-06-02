import './App.css'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import Login from './pages/authentication/Login'
import Dashboard from './pages/main/Dashboard'
import Children from './pages/main/Children'
import Monitoring from './pages/main/Monitoring'
import Controls from './pages/main/Controls'
import Reports from './pages/main/Reports'
import Settings from './pages/main/Settings'

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

        <Route element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/children' element={<Children />}/>
          <Route path='/monitoring' element={<Monitoring />}/>
          <Route path='/controls' element={<Controls />}/>
          <Route path='/reports' element={<Reports />}/>
          <Route path='/settings' element={<Settings />}/>
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App