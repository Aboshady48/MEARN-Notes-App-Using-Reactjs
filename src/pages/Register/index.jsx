import React, { useState,useRef } from "react";
import { useAuth } from "../../Context/Auth";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const registerRef = useRef(null)
  
  const {RegisterUser} = useAuth()

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerRef.current);
    const data = Object.fromEntries(formData)

    RegisterUser(data)

  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit} ref={registerRef}>
        <input type="email" placeholder="Email" name="email" required />
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required/>
          
          <button type="submit" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};
