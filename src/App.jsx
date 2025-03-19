import { Route, Routes,Navigate } from 'react-router-dom' 
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './Components/Navbar'
import { Notes } from './pages/Notes/Index'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { useAuth } from './Context/Auth'

const App = () => {
  const { user } = useAuth()
  return (
    <div>
      <Navbar />

      <Routes>
        
        <Route element={<PrivateRoutes />}>
          <Route path="/notes" element={<Notes />} />
          <Route />
        </Route>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={
          user ? <Navigate to='/'/> : <Register/>
        } />

        <Route path="/login" element={
          user? <Navigate to='/'/> : <Login/>
        } />
      </Routes>
    </div>
  );
}

export default App
