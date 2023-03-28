import './boards_styles.scss'
import { Form, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  return {game : params.game_id};
}

export default function Board() {
    const {game} = useLoaderData();
    return (
        <>
            <div className='title'>cincin</div>
            <div className='games'>
                <div className='board'></div>
                <div className='board'></div>
            </div>
            <button className='button'>Share</button>
        </>
    )
}