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
        className={
          "h-2 w-2 rounded-full " + (hasDot ? `bg-onPrimary` : "bg-transparent")
        }
      ></div>
    </>
  );
}

export default DiceDot;
