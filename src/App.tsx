import "./App.scss";
import Board, { loader as boardLoader } from "./boards";
import TopGames from "./top_games";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./main_page";
import Newgame from "./newgame";

const router = createBrowserRouter([
  {
    path: "/leaderboard",
    element: <TopGames />,
  },
  {
    path: "/games/:game_id",
    loader: boardLoader,
    element: <Board />,
  },
  {
    path: "/newgame",
    element: <Newgame />,
  },

  {
    path: "/",
    loader: boardLoader,
    element: <MainPage />,
  },
]);

function App() {
  return (
    <div className="game-page">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

