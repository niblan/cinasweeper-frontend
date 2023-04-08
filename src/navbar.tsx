import { auth, login, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "./navbar.sass";

export default function NavBar() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="navbar">
      <Link className="navbar-item" to="/newgame"> new game</Link>
      <Link className="navbar-item" to="/leaderboard">leader board </Link>
      {user ? (
        <span className="navbar-item user" onClick={logout}>
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
      ) : (
        <span className="navbar-item" onClick={login}>log in</span>
      )}
    </div>
  );
}

