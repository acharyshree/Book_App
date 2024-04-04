import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
      console.log(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="loginpage">
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        
       <div style={{display:"flex",justifyContent:"space-between"}}>
       <button
          type="submit"
          className="btn btn-primary"
          
          onClick={handleSubmit}
        >
          Login
        </button>
        
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handlesignup}
        >
          Register
        </button>
       </div>

       <div style={{margin:"30px 0px",cursor:"pointer",color:"blue"}}>Forgot Password</div>
      </div>
    </div>
  );
  
}

export default Login;