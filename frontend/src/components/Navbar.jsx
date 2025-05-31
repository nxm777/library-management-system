import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/");
  };

  return (
    <nav className="d-flex justify-content-between align-items-center mb-4">
      <h3>Library</h3>
      <div className="d-flex align-items-center">
        {token && (
          <span className="me-3 fw-semibold">
            👋 {firstName} {lastName}
          </span>
        )}
        {!token ? (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-secondary">Register</Link>
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;