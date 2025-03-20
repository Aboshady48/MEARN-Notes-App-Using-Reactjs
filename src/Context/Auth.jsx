import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return { _id: decoded.id, token }; 
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  });

  // Check localStorage for an existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ _id: decoded.id, token });
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
  }, []);

  // ✅ Login function
  const loginUser = async (userData) => {
    try {
      console.log("Logging in with:", userData);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", data);

      if (data.success) {
        const decoded = jwtDecode(data.token);
        setUser({ _id: decoded.id, token: data.token });

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", decoded.id); // Save user ID separately

        toast.success("Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  // ✅ Register function
  const RegisterUser = async (userData) => {
    try {
      console.log("Sending user data:", userData);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response data:", data);

      if (data.success) {
        const decoded = jwtDecode(data.token);
        setUser({ _id: decoded.id, token: data.token });

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", decoded.id); // Save user ID

        toast.success("Registration successful");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const ContextData = { user, loginUser, RegisterUser, logoutUser };

  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
