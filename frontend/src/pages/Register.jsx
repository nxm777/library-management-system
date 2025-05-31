import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    setError(""); 
    setSuccess("");
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  try {
    await axios.post("http://localhost:8080/api/auth/register", data);
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    const fullMessage = err.response?.data?.message || "Registration failed";
    const firstMessage = fullMessage.split(".")[0];
    setError(firstMessage + ".");
  }
};
  return (
    <div className="container py-4">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="firstName" className="form-control mb-2" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" className="form-control mb-2" placeholder="Last Name" onChange={handleChange} required />
        <input name="username" className="form-control mb-2" placeholder="Username" onChange={handleChange} required />
        <input name="email" className="form-control mb-2" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" className="form-control mb-3" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;