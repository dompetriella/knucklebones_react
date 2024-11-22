import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import DiceSlot from "../components/dice/DiceSlot";
import { DiceData } from "../models/DiceData";
import useGameState from "../state/gameState";
import { DiceGridBody } from "../components/dice/DiceGridBody";

function GamePage() {
  const navigator = useNavigate();

  const homePlayer = useGameState((state) => state.homePlayer);
  const awayPlayer = useGameState((state) => state.awayPlayer);

  return (
    <div className="flex size-full flex-col justify-start items-center bg-surface">
      <button onClick={() => navigator({ pathname: AppRoutes.Start })}>
        Return Home
      </button>
      <DiceGridBody player={homePlayer} />
      <div className="h-20 w-full flex justify-around items-center">
        <div className="h-2 w-16 bg-onSurface"></div>
        <div className="h-2 w-16 bg-onSurface"></div>
      </div>
      <DiceGridBody player={awayPlayer} />
    </div>
  );
}

export default GamePage;
