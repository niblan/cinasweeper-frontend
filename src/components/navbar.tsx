import { auth, login, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.sass";

export default function NavBar() {
  const [user, loading] = useAuthState(auth);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <div className="navbar">
      <Link className="navbar-item" to="/">home</Link>
      <Link className="navbar-item" to="/leaderboard">top</Link>
      {user ? (
        <span className="navbar-item" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
          <span className="user">
            {user.photoURL && (
              <img
                className="avatar"
                src={user.photoURL}
                referrerPolicy="no-referrer"
                alt="user"
              />
            )}
            <span>{user.displayName}</span>
          </span>
          {dropdownIsOpen && (
            <div className="dropdown">
              <span className="dropdown-item" onClick={logout}>Log out</span>
            </div>
          )}
        </span>
      ) : (
        <span className="navbar-item" onClick={login}>log in</span>
      )}
    </div>
  );
}

