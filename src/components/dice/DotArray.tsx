import { PlayerColor } from "../../models/PlayerColor";
import DiceDot from "./DiceDot";

function DotArray({
  numberValue,
  playerColor,
}: {
  numberValue?: number;
  playerColor: PlayerColor;
}) {
  if (numberValue != null ) return (
    <>
      <div className="size-full flex flex-col justify-between p-2">
        <div className="flex justify-between ">
          <DiceDot
            playerColor={playerColor}
            hasDot={numberValue === 4 || numberValue === 5 || numberValue === 6}
          />
          <DiceDot playerColor={playerColor} hasDot={false} />
          <DiceDot playerColor={playerColor} hasDot={numberValue !== 1} />
        </div>
        <div className="flex justify-between">
          <DiceDot playerColor={playerColor} hasDot={numberValue === 6} />
          <DiceDot
            playerColor={playerColor}
            hasDot={numberValue === 1 || numberValue === 3 || numberValue === 5}
          />
          <DiceDot playerColor={playerColor} hasDot={numberValue === 6} />
        </div>
        <div className="flex justify-between">
          <DiceDot playerColor={playerColor} hasDot={numberValue !== 1} />
          <DiceDot playerColor={playerColor} hasDot={false} />
          <DiceDot
            playerColor={playerColor}
            hasDot={numberValue === 4 || numberValue === 5 || numberValue === 6}
          />
        </div>
      </div>
    </>
  );
}

export default DotArray;
