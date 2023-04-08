import "./main_page_styles.sass";
import NavBar from "./components/navbar";
import Button from "./components/button";
import { auth, login } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MainPage() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app mainpage">
      <NavBar />
      <div className="content">
        <div className="logos">
          <div className="title green">CIN</div>
          <div className="title purple">CIN</div>
        </div>
        <div className="description">mini-game about life at apps faculty in ucu</div>
        <div className="game-start-buttons">
          {user ? (
            <>
              <Button href="/newgame/singleplayer">PLAY SOLO</Button>
              <Button href="/newgame/1v1">PLAY WITH A FRIEND</Button>
            </>
          ) : (
            <Button onClick={login}>LOG IN</Button>
          )}
        </div>
      </div>
    </div>
  );
}
