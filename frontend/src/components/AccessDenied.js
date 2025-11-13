import React from "react";
import { useApp } from "../context/AppContext";
import "./AccessDenied.css";

function AccessDenied() {
  const { user } = useApp();

  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <div className="access-denied-icon">🚫</div>
        <h2>Access Denied</h2>
        <p>
          {user
            ? "Sorry, you don't have admin privileges to add products."
            : "Please login as an administrator to access this feature."}
        </p>
        <div className="admin-info">
          <h4>Admin Login Information:</h4>
          <div className="credentials">
            <span>
              <strong>Username:</strong> admin
            </span>
            <span>
              <strong>Password:</strong> admin123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
