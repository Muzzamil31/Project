import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // for navigation link between routes
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" }); //hold input value
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });//Navigate another route

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sends registration data to backend 
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful! Please login."); // shows success msg
      navigate("/login"); // navigate to login page
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account </h2>
        <p>Join the employee management portal</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        {/* link to login page */}
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link> 
        </p>
      </div>
    </div>
  );
};

export default Register;
