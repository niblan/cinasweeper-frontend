import "./main_page_styles.sass";
import NavBar from "./navbar";

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
      </div>
    </div>
  );
}
