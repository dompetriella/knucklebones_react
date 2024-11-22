import { DiceData } from "../../models/DiceData";
import { PlayerColor } from "../../models/PlayerColor";
import { PlayerColorEnum } from "../../models/PlayerColorEnum";
import DotArray from "./DotArray";

function DiceSlot({
  diceData,
  playerColor,
}: {
  diceData: DiceData | null;
  playerColor: PlayerColor;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor:
            diceData != null ? playerColor.primary : "transparent",
        }}
        className={`h-14 w-14  ml-2 mr-2 mt-2 rounded-lg border-onSurface border-4 ${
          diceData != null ? "" : "opacity-5"
        } `}
      >
        <DotArray
          numberValue={diceData?.numberValue}
          playerColor={playerColor}
        />
      </div>
    </>
  );
}

export default DiceSlot;
