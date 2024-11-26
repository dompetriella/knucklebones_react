import { useNavigate } from "react-router-dom";
import useGameState from "../state/gameState";
import DiceSlot from "../components/dice/DiceSlot";
import { PlayerArea } from "../components/PlayerArea";
import { getColorByEnum } from "../logic/colorLogic";
import { StatusBar } from "../components/StatusBar";
import { useEffect } from "react";

function GamePage() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const rollNewUsableDieAction = useGameState(
    (state) => state.rollNewUsableDie
  );

  useEffect(() => {
    rollNewUsableDieAction();
  }, []);

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
