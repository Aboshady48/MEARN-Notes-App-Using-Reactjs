import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";

export const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Note App By Aboshady</Link>
            </div>

            {/* Hamburger Menu */}
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </button>

            {/* Navbar Links */}
            <div className={`navbar-links ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                <Link to="/">Home</Link>
                {user && <Link to="/notes">Notes</Link>}
                {user ? (
                    <Link to="/" className="navbar-links" onClick={logoutUser}>Logout</Link>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
