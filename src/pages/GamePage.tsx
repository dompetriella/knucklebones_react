import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import useGameState from "../state/gameState";
import DiceSlot from "../components/dice/DiceSlot";
import { DiceData } from "../models/DiceData";
import { PlayerArea } from "../components/PlayerArea";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { getColorByEnum } from "../logic/colorLogic";

function GamePage() {
  const navigator = useNavigate();

  const homePlayer = useGameState((state) => state.homePlayer);
  const awayPlayer = useGameState((state) => state.awayPlayer);

  return (
    <div className="flex size-full flex-col justify-evenly items-center bg-surface">
      {/* <button onClick={() => navigator({ pathname: AppRoutes.Start })}>
        Return Home
      </button> */}

      <PlayerArea player={awayPlayer} />

      <div className="flex w-full justify-between">
        <div className="w-full bg-surface"></div>

        <div className="w-ful px-4 pb-4 pt-2 flex justify-center items-center">
          <DiceSlot
            diceData={new DiceData({ id: 0, numberValue: 5 })}
            playerColor={
              homePlayer?.isActivePlayer
                ? getColorByEnum(homePlayer.color ?? null)
                : getColorByEnum(awayPlayer?.color ?? null)
            }
          />
        </div>

        <div className="w-full bg-surface"></div>
      </div>

      <PlayerArea player={homePlayer} />
    </div>
  );
}

export default GamePage;
