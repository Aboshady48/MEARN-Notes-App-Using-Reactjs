import { Link } from "react-router-dom"
import { useAuth } from "../Context/Auth"

export const Navbar = () => {
    const {user,logoutUser} = useAuth()
  return (
    <div>
        {
            user ? (
                <>
                <Link to='/'>Home</Link>
                <Link to='/notes'>Notes</Link>
                <Link to='/' onClick={logoutUser}>Logout</Link>
                </>
            ) : (
                <>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                </>
            )
        }
    </div>
  )
}
