import { PlayerColor } from "../../models/PlayerColor";

function DiceDot({
  hasDot,
  playerColor,
}: {
  hasDot: boolean;
  playerColor: PlayerColor;
}) {
  return (
    <>
      <div
      style={{backgroundColor: hasDot ? playerColor.onPrimary : ""}}
        className={
          "h-2 w-2 rounded-full"
        }
      ></div>
    </>
  );
}

export default DiceDot;
