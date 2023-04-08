import './top_games_styles.scss'
import { use, Suspense } from "react";
import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import NavBar from './navbar';

function GlobalLeaderboard({ api_url }) {
    const games = use(fetch(`${api_url}/leaders_board`).then(res => res.json()));

    return (
        <div className='content'>
            {games.map(game => (
                <Link className='game' to={`/games/${game.identifier}`}>
                    {game.owner}
                </Link>
            ))}
        </div>
    )
}

function YourGames({ api_url }) {
    const [user, loading] = useAuthState(auth);
    if(!user){return};
    const jwt = user.accessToken;
    const games = use(fetch(`${api_url}/games`, {
        headers: {
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        },
    }).then(res => res.json()));

    return (
        <div className='content'>
            {games.map(game => (
                <Link className='game' to={`/games/${game.identifier}`}>
                    {game.owner}
                </Link>
            ))}
        </div>
    )
}


export default function TopGames() {
    const api_url = "http://10.10.227.65:8000";

    return (
        <>
            <NavBar />
            <div className='top_games'>
                <div className='rating'>
                    <div className='heading'>top site games</div>
                    <Suspense fallback={<span className='loading'>Loading...</span>}>
                        <GlobalLeaderboard api_url={api_url} />
                    </Suspense>
                </div>
                <div className='buttons'>
                    <button className='button'>Single</button>
                    <button className='button'>Multiple</button>
                </div>
                <div className='rating'>
                    <div className='heading'>top your games</div>
                    <Suspense fallback={<span className='loading'>Loading...</span>}>
                        <YourGames api_url={api_url} />
                    </Suspense>
                </div>
            </div>
            
        </>
    )
}