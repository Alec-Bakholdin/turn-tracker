import { useObjectVal } from "react-firebase-hooks/database";
import { ref, set } from "@firebase/database";
import { database } from "config/firebaseApp";
import { useMemo } from "react";
import { useUser } from "hooks/useUser";
import { Game } from "types/Game";
import { randomString } from "util/randomString";

function getGameRef(gameId: string) {
  return ref(database, `games/${gameId}`);
}

export function useGame() {
  const { user, loading: userLoading, updateUser } = useUser();
  const gameRef = useMemo(() => {
    if (user?.gameId) {
      return getGameRef(user.gameId);
    }
  }, [user?.gameId]);
  const [game, loading, error] = useObjectVal<Game>(gameRef);

  const createGame = async () => {
    if (gameRef) {
      throw new Error("User is already in a game");
    }
    const id = randomString(6);
    await set(getGameRef(id), { id, activeUsers: [] } as Game);
    await updateUser({ gameId: id });
  };

  return {
    game,
    loading: userLoading || loading,
    error,
    createGame,
  };
}
