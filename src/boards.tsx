import "./boards_styles.sass";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Modal from "react-modal";
import { useInterval } from "usehooks-ts";
import { BiCopy } from "react-icons/bi";
import Button from "./components/button";

export async function loader({ params }: { params: any }) {
  const api_url = import.meta.env.VITE_API_URL;

  if (!params.game_id) {
    return null;
  }
  const game = await fetch(`${api_url}/games/${params.game_id}`).then((res) =>
    res.json()
  );

  return { game: game, api_url: api_url };
}

function Cell({
  cell,
  row,
  column,
  setBoard,
  game_id,
  api_url,
  game,
  setGame
}: {
  cell: number | null;
  row: number;
  column: number;
  setBoard: any;
  game_id: string;
  api_url: string;
  game: any;
  setGame?: (game: any) => void;
}) {
  const [user, loading] = useAuthState(auth);

  const openCell = async (
    row: number,
    column: number,
    setBoard: any,
    user: any,
    mode: number
  ) => {
    const jwt = user.accessToken;
    const request = await fetch(`${api_url}/games/${game_id}/moves`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        x: row,
        y: column,
        action: mode,
      }),
    });
    if (request.status === 200) {
      const move_result = await request.json();
      setBoard(move_result.state.board);
      if (move_result.game_changed && game && setGame) {
        setGame({...game, ended: true, score: null});
        const updated_game = await fetch(`${api_url}/games/${game_id}`).then((res) => res.json());
        setGame(updated_game);
      }
    }
  };

  return (
    <span
      className="cell"
      onClick={() => openCell(row, column, setBoard, user, 1)} // -1 opens the cell
      onContextMenu={(e) => {
        openCell(row, column, setBoard, user, 0);
        e.preventDefault();
      }}
    >
      {cell === -1 ? "🥨" : cell == -2 ? "🥄" : cell}
    </span>
  );
}

function Board({ api_url, id, game=null, setGame }: { api_url: string; id: string, game?: any, setGame?: (game: any) => void }) {
  const [board, setBoard] = useState([]);

  const fetchBoard = async () => {
    const request = await fetch(`${api_url}/games/${id}/state`);
    if (request.status === 200) {
      const game_state = await request.json();
      setBoard(game_state.board);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [api_url, id]);

  useInterval(fetchBoard, 2000);

  return (
    <div className="board">
      {board.map((row: number[], rowNum: number) => (
        <div className="board-row">
          {row.map((cell: number, columnNum: number) => (
            <Cell
              cell={cell}
              row={rowNum}
              column={columnNum}
              setBoard={setBoard}
              game_id={id}
              api_url={api_url}
              game={game}
              setGame={setGame}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ShareButton({ opponent_id }: { opponent_id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCopied(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Share"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "2rem",
          },
        }}
      >
        <span className="share">
          <span>
            {window.location.origin}/games/{opponent_id}
          </span>
          <span
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/games/${opponent_id}`
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            {copied ? "Copied" : <BiCopy />}
          </span>
        </span>
      </Modal>
      <Button onClick={openModal}>
        SHARE
      </Button>
    </>
  );
}

function extract_loader_data(loader_data: unknown) {
  if (
    !loader_data ||
    typeof loader_data !== "object" ||
    !("game" in loader_data) ||
    !("api_url" in loader_data)
  ) {
    return { game: null, loader_data: null }
  }
  const game: any = loader_data.game;
  const api_url: any = loader_data.api_url;
  return { game: game, api_url: api_url };
}

function TimeSince({ start_time }: { start_time: string }) {
  const [now, setNow] = useState(Date.now());
  const start_datetime = new Date(start_time + 'Z');
  useInterval(() => {
    setNow(Date.now());
  }, 1000);
  const diff = Math.floor((now - start_datetime.getTime()) / 1000);
  const hours = Math.floor(diff / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = Math.floor((diff % (60 * 60)) % 60);
  return (
    <div className="timer">{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</div>
  );
}

export default function Boards() {
  const loader_data = useLoaderData();
  const { api_url } = extract_loader_data(loader_data);
  const [game, setGame] = useState(extract_loader_data(loader_data).game);
  const user: any = useAuthState(auth)[0];

  useInterval(() => {
    const refetch_game = () => {
      fetch(`${api_url}/games/${game.identifier}`)
        .then((res) => res.json())
        .then((game) => {
          setGame(game);
        });
    };
    refetch_game();
  }, game.started ? null : 1000);

  useEffect(() => {
    if (!user) {
      return;
    }
    const jwt = user.accessToken;
    if (!game.owner) {
      fetch(`${api_url}/games/${game.identifier}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${jwt}`,
          "content-type": "application/json",
        },
      });
    }
  }, [api_url, game, user]);

  return (
    <>
      <div className="games">
        <Board game={game} setGame={setGame} api_url={api_url} id={game.identifier} />
        {game.opponent_id && <Board api_url={api_url} id={game.opponent_id} />}
      </div>
      {game.opponent_id && <ShareButton opponent_id={game.opponent_id} />}
      {game.started ? (game.ended ? (
        <div className="score">
          Score: {game.score === null ? "Loading..." : game.score}
        </div>
      ) : (
        <TimeSince start_time={game.started_time} />
      )) : (
        <div className="waiting">
          Waiting for opponent...
        </div>
      )}
    </>
  );
}
