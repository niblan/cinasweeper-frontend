import { auth, login, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "./navbar.sass";

export default function NavBar() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="navbar">
      <Link to="/newgame"> new game</Link>
      <Link to="/leaderboard">leader board </Link>
      {user ? (
        <span className="user" onClick={logout}>
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
        <span onClick={login}>log in</span>
      )}
    </div>
  );
}

