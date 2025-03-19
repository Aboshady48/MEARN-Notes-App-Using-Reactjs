import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../Context/Auth"


export const PrivateRoutes = () => {
    const {user} = useAuth()
  return (
    <div>
        {user ? <Outlet/>:<Navigate to='/login'/>}        
    </div>
  )
}
