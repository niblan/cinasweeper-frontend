import "./main_page_styles.sass";
import NavBar from "./components/navbar";
import Button from "./components/button";

export default function MainPage() {
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
          <Button>PLAY SOLO</Button>
          <Button href="/newgame">PLAY WITH A FRIEND</Button>
        </div>
      </div>
    </div>
  );
}
