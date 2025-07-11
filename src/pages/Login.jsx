import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/Login.css";
import PropTypes from "prop-types";

const Login = ( {setIsAuthenticated} ) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const usernameDefault = import.meta.env.VITE_USERNAME;
  const passwordDefault = import.meta.env.VITE_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === usernameDefault && password === passwordDefault) {
      console.log("Login successful");
      setIsAuthenticated(true); // Update authentication state in App
      localStorage.setItem("isAuthenticated", "true"); 
      navigate("/admin"); // Redirect to the admin page
    } else {
      console.log("Login failed");
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-container">
         <h2>Login</h2>
         <form onSubmit={handleLogin}>
          <div>
             <label>Username:</label>
             <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
  );
};


Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
