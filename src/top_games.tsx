import './top_games_styles.scss'
export default function TopGames() {
    return (
        <>
        <div className='title'>Top games</div>
            <div className='top_games'>
                <div className='rating'>
                    <div className='heading'>top site games</div>
                    <div className='content'></div>
                </div>
                <div className='buttons'>
                    <button className='button'>Single</button>
                    <button className='button'>Multiple</button>
                </div>
                <div className='rating'>
                    <div className='heading'>top your games</div>
                    <div className='content'></div>
                </div>
            </div>
            
        </>
    )
}