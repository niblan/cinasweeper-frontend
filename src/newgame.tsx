import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function Newgame({ mode }: { mode: string }) {
  const api_url = import.meta.env.VITE_API_URL;
  const user: any = useAuthState(auth)[0];
  const navigate = useNavigate();

  const createGame = async () => {
    if (!user) {
      return;
    }
    const jwt = user.accessToken;
    const game = await fetch(`${api_url}/games`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        gamemode: mode,
      }),
    }).then((res) => res.json());
    console.log(game.identifier);
    navigate(`/games/${game.identifier}`);
  };

  useEffect(() => {
    createGame();
  }, [mode]);

  return <div></div>;
}
