import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async () => {};
  const RegisterUser = async () => {};
  const logoutUser = async () => {};

  const ContextData = {
    user,
    loginUser,
    RegisterUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
