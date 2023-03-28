import "./main_page_styles.scss";
import { auth, login, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MainPage() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="mainpage">
      <div className="navbar">
        {user ? (
          <span onClick={logout}>
            {user.photoURL && (
              <img
                src={user.photoURL}
                referrerPolicy="no-referrer"
                alt="user"
              />
            )}
            <span>{user.displayName}</span>
          </span>
        ) : (
          <span onClick={login}>Log in</span>
        )}
      </div>
      <div className="logos">
        <div className="title1">cin</div>
        <div className="title2">cin</div>
      </div>
      <div className="dscr">mini-game about life at apps faculty in ucu</div>
    </div>
  );
}
