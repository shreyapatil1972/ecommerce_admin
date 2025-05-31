import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTasks, FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logoutAPI } from "../API/Api.js";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    navigate("/LoginPage");
  };

  return (
    <div
      className="vh-100"
      style={{
        width: "20%",
        backgroundColor: "#0D0D0D", // Primary
        color: "#E0E0E0", // Text
        padding: "1.5rem",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h4 style={{ color: "#C19A6B", marginBottom: "2rem", fontWeight: "bold" }}>
        Admin Panel
      </h4>
      <ul className="list-unstyled">
        <li className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#C19A6B" : "#E0E0E0",
              textDecoration: "none",
            })}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#C19A6B" : "#E0E0E0",
              textDecoration: "none",
            })}
          >
            Profile
          </NavLink>
        </li>
        <hr style={{ borderColor: "#E0E0E0" }} />
        <li className="nav-item mt-3">
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#C19A6B" : "#E0E0E0",
              textDecoration: "none",
            })}
          >
            <FaTasks className="me-2" />
            Products
          </NavLink>
        </li>

        <li className="mt-4">
          <NavLink
            to="/brand"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#C19A6B" : "#E0E0E0",
              textDecoration: "none",
            })}
          >
            <FaUser className="me-2" />
            Brand
          </NavLink>
        </li>

        <li className="mt-4">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#C19A6B" : "#E0E0E0",
              textDecoration: "none",
            })}
          >
            <FaUser className="me-2" />
            Category
          </NavLink>
        </li>

        <li className="mt-4">
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              background: "none",
              border: "none",
              color: "#E0E0E0",
              textAlign: "left",
              padding: "0",
              cursor: "pointer",
            }}
          >
            <RiLogoutCircleRLine className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
