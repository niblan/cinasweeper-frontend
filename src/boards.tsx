import "./boards_styles.scss";
import { Form, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import NavBar from "./navbar";
import Modal from "react-modal";
import { useInterval } from "usehooks-ts";
import { BiCopy } from "react-icons/bi";

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
}: {
  cell: number | null;
  row: number;
  column: number;
  setBoard: any;
  game_id: string;
  api_url: string;
}) {
  const [user, loading] = useAuthState(auth);

  const openCell = async (row: number, column: number, setBoard: any, user: any) => {
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
        action: -1,
      }),
    });
    if (request.status === 200) {
      const game_state = await request.json();
      setBoard(game_state.board);
    }
  };

  return (
    <span
      className="cell"
      onClick={() => openCell(row, column, setBoard, user)}
    >
      {cell === -1 ? "🥨" : cell == -2 ? "🥄" : cell}
    </span>
  );
}

function Board({ api_url, id }: { api_url: string, id: string }) {
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
        <span className="share-link">
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
      <button className="button" onClick={openModal}>
        Share
      </button>
    </>
  );
}

export default function Boards() {
  const loader_data = useLoaderData();
  if (!loader_data || typeof loader_data !== "object" || !("game" in loader_data) || !("api_url" in loader_data)) {
    return null;
  }
  const game: any = loader_data.game;
  const api_url: any = loader_data.api_url;
  const user: any = useAuthState(auth)[0];

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
      <NavBar />
      <div className="games">
        <Board api_url={api_url} id={game.identifier} />
        {game.opponent_id && <Board api_url={api_url} id={game.opponent_id} />}
      </div>
      {game.opponent_id && <ShareButton opponent_id={game.opponent_id} />}
    </>
  );
}
