import useGameState from "../state/gameState";
import { PlayerArea } from "../components/PlayerArea";
import { StatusBar } from "../components/StatusBar";
import { useEffect } from "react";

function GamePage() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);

  return (
    <div className="flex size-full flex-col justify-evenly items-center bg-surface">
      {/* <button onClick={() => navigator({ pathname: AppRoutes.Start })}>
        Return Home
      </button> */}

      <PlayerArea player={awayPlayerState} />
      <StatusBar />
      <PlayerArea player={homePlayerState} />
    </div>
  );
}

export default GamePage;
