import './App.scss'
import Board, {loader as boardLoader} from "./boards"
import TopGames from './top_games'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './main_page';

const router = createBrowserRouter([
  {
    path: "/leaderboard",
    element: <TopGames />,
    },
  {
    path: "/games/:games_id",
    loader: boardLoader,
    element: <Board />,
  },

  {
    path: "/",
    loader: boardLoader,
    element: <MainPage />,
  }
]);

function App(){
  return (
    <div className="game-page">
      <RouterProvider router={router} />
    </div>
  )
}
export default App