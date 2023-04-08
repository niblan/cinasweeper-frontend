import "./main_page_styles.scss";
import NavBar from "./navbar";

export default function MainPage() {
  return (
    <div className="mainpage">
      <NavBar />
      <div className="logos">
        <div className="title1">cin</div>
        <div className="title2">cin</div>
      </div>
      <div className="dscr">mini-game about life at apps faculty in ucu</div>
    </div>
  );
}
