import './boards_styles.scss'
export default function Board() {
    return (
        <>
            <div className='games'>
                <div className='board'></div>
                <div className='board'></div>
            </div>
            <button className='button'>Share</button>
        </>
    )
}