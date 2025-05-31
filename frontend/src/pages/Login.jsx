import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("firstName", res.data.user.firstName);
    localStorage.setItem("lastName", res.data.user.lastName);
    alert("Login successful");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;