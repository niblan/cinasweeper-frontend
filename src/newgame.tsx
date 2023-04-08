import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function Newgame() {
  const api_url = import.meta.env.VITE_API_URL;
  const [user, loading] = useAuthState(auth);
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
        gamemode: "1v1",
      }),
    }).then((res) => res.json());
    console.log(game.identifier);
    navigate(`/games/${game.identifier}`);
  };

  useEffect(() => {
    createGame();
  }, []);

  return <div></div>;
}

