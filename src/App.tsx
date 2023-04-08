import "./App.sass";
import Board, { loader as boardLoader } from "./boards";
import TopGames from "./top_games";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./main_page";
import Newgame from "./newgame";
import NavBar from "./navbar";

const Page = ({ children }) => (
  <>
    <NavBar />
    <div className="content">{children}</div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/leaderboard",
    element: (
      <Page>
        <TopGames />
      </Page>
    ),
  },
  {
    path: "/games/:game_id",
    loader: boardLoader,
    element: (
      <Page>
        <Board />
      </Page>
    ),
  },
  {
    path: "/newgame",
    element: (
      <Page>
        <Newgame />
      </Page>
    ),
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
