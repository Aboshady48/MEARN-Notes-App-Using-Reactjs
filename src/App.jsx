import { Route, Routes,Navigate } from 'react-router-dom' 
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './Components/Navbar'
import { Notes } from './pages/Notes/Index'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { useAuth } from './Context/Auth'
import './Style/homeAndNav.css'
import './Style/Register.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuth()
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
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
