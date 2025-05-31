import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = form.login.includes("@")
        ? { email: form.login, password: form.password }
        : { username: form.login, password: form.password };

      const res = await login(payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("firstName", res.data.user.firstName);
      localStorage.setItem("lastName", res.data.user.lastName);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="login"
          placeholder="Email or Username"
          onChange={(e) => setForm({ ...form, login: e.target.value })}
          required
        />
        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;