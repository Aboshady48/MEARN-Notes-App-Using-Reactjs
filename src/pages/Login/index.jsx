import { useRef, useState } from "react";
import { useAuth } from "../../Context/Auth";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginRef = useRef(null)

  const { loginUser } = useAuth()

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(loginRef.current);
    const data = Object.fromEntries(formData)

    loginUser(data)
  };

  return (
    <div className="register-container">
      <h1>Login Your Account</h1>
      <form className="register-form" onSubmit={handleSubmit} ref={loginRef}>
        <input type="email" placeholder="Email" name="email" required />
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required/>
          
          <button type="submit" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
            
          </button>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
