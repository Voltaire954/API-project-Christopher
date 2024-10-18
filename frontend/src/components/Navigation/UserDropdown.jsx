// src/components/Navigation/UserDropdown.jsx (example)
import { Link } from "react-router-dom";

function UserDropdown() {
  return (
    <div className="user-dropdown">
      <Link to="/spots/manage">Manage Spots</Link>
      {/* Other dropdown items */}
    </div>
  );
}
