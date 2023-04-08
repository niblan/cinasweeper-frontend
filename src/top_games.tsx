import "./top_games_styles.sass";
import { use, Suspense } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import NavBar from "./navbar";

function GlobalLeaderboard({ api_url }: { api_url: string }) {
  const games = use(
    fetch(`${api_url}/leaders_board`).then((res) => res.json())
  );

  return (
    <div className="content">
      {games.map((game: any) => (
        <Link className="game" to={`/games/${game.identifier}`}>
          <span className="owner">{game.owner}</span>
          <span className="score">{game.score}</span>
        </Link>
      ))}
    </div>
  );
}

function YourGames({ api_url }: { api_url: string }) {
  const user: any = useAuthState(auth)[0];
  if (!user) {
    return null;
  }
  const jwt = user.accessToken;
  const games = use(
    fetch(`${api_url}/games`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  return (
    <div className="content">
      {games.map((game: any) => (
        <Link className="game" to={`/games/${game.identifier}`}>
          <span className="owner">{game.owner}</span>
          <span className="score">{game.score}</span>
        </Link>
      ))}
    </div>
  );
}

export default function TopGames() {
  const api_url = import.meta.env.VITE_API_URL;

  return (
    <>
      <div className="top_games">
        <div className="rating">
          <div className="heading">top site games</div>
          <Suspense fallback={<span className="loading">Loading...</span>}>
            <GlobalLeaderboard api_url={api_url} />
          </Suspense>
        </div>
        <div className="buttons">
          <button className="button">SIGNLE</button>
          <button className="button">MULTIPLE</button>
        </div>
        <div className="rating">
          <div className="heading">top your games</div>
          <Suspense fallback={<span className="loading">Loading...</span>}>
            <YourGames api_url={api_url} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
