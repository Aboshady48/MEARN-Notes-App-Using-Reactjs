import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for an existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const loginUser = async (userData) => {
    try {
      console.log("Logging in with:", userData);

      const { data } = await axios.post(
        "https://aboshady-mearn-stack-notes-endpoints.vercel.app/api/v1/users/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Response:", data);

      if (data.success) {
        setUser(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  const RegisterUser = async (userData) => {
    try {
      console.log("Sending user data:", userData);

      const { data } = await axios.post(
        "https://aboshady-mearn-stack-notes-endpoints.vercel.app/api/v1/users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", data);

      if (data.success) {
        setUser(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  };

  const ContextData = {
    user,
    loginUser,
    RegisterUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={ContextData}>
        {children}
        </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
