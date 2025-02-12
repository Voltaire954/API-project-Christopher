// src/components/Navigation/UserDropdown.jsx (example)
import { NavLink } from "react-router-dom";

function UserDropdown() {
  return (
    <div className="user-dropdown">
      <NavLink to="/spots/manage">Manage Spots</NavLink>
      {/* Other dropdown items */}
    </div>
  );
}
