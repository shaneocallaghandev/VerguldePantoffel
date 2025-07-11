import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/Login.css";
import PropTypes from "prop-types";
import { login } from "../login.js"; // Import the login function

const Login = ( {setIsAuthenticated} ) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password); // Call the login API
      console.log(data.message); // Log the success message
      setIsAuthenticated(true); // Update authentication state in App
      localStorage.setItem("isAuthenticated", "true"); // Persist authentication state
      navigate("/admin"); // Redirect to the admin page
    } catch (error) {
      alert(error.message || "An error occurred. Please try again."); // Show an error message
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
