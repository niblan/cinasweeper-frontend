import Board, { loader as boardLoader } from "./boards";
import TopGames from "./top_games";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./main_page";
import Newgame from "./newgame";
import Page from "./page";

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
        element: <MainPage />,
    },
]);

export default router;