import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("loggedinemail", JSON.stringify({ loggedinemail: email }));
      navigate('/');
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/login');
  }

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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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

      

      <div className="form-group" style={{display:"flex",justifyContent:"space-between"}}>
      <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      </div>
    </div>
  );
}

export default Register;