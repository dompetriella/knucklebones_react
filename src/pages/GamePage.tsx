import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import DiceSlot from "../components/dice/DiceSlot";
import { DiceData } from "../models/DiceData";

function GamePage() {
  const navigator = useNavigate();
  return (
    <div className="flex size-full flex-col justify-start items-center bg-surface">
      <button onClick={() => navigator({ pathname: AppRoutes.Start })}>
        Return
      </button>
      <div className="flex border-4 border-onSurface p-2 bg-secondary rounded-lg">
        <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
          <DiceSlot diceData={new DiceData(0, 1)} />
          <DiceSlot diceData={new DiceData(0, 1)} />
          <DiceSlot diceData={new DiceData(0, 1)} />
        </div>
        <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
          <DiceSlot />
          <DiceSlot />
          <DiceSlot />
        </div>
        <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
          <DiceSlot />
          <DiceSlot />
          <DiceSlot />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
