import { getColorByEnum } from "../../logic/colorLogic";
import { calculateDiceDataColumn } from "../../logic/scoring";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";

export function PlayerDiceBlock({
  player,
  isHomePlayer,
}: {
  player: Player;
  isHomePlayer: boolean;
}) {
  const addUsableDieToPlayerColumnAction = useGameState(
    (state) => state.addUsableDieToPlayerColumn
  );

  const playerColor: PlayerColor = getColorByEnum(player?.color ?? null);

  return (
    <div className="flex-col">
      {!isHomePlayer ? (
        <div className="flex justify-evenly pt-1 font-bold text-2xl">
          <h3 style={{ color: playerColor.onPrimary }} className=" w-4">
            {calculateDiceDataColumn(player.diceGrid[0])}
          </h3>
          <h3
            style={{ color: playerColor.onPrimary }}
            className="w-16 text-center"
          >
            {calculateDiceDataColumn(player.diceGrid[1])}
          </h3>
          <h3 style={{ color: playerColor.onPrimary }} className="w-4">
            {calculateDiceDataColumn(player.diceGrid[2])}
          </h3>
        </div>
      ) : null}

      <div
        style={{ backgroundColor: playerColor.secondary }}
        className="flex border-4 border-onSurface p-2 shadow-md rounded-lg"
      >
        {player?.diceGrid.map((_, i) => (
          <button
            onClick={() => {
              if (player.isActivePlayer) {
                addUsableDieToPlayerColumnAction(player, i);
              }
            }}
            className="flex flex-col bg-surface m-1 pb-2 rounded-lg"
          >
            {!isHomePlayer
              ? player?.diceGrid[i]
                  .slice()
                  .reverse()
                  .map((dice) => (
                    <DiceSlot
                      diceData={dice ?? null}
                      player={player}
                      columnIndex={i}
                      intialYDistance={-160}
                      initialScaling={3}
                    />
                  ))
              : player?.diceGrid[i].map((dice) => (
                  <DiceSlot
                    diceData={dice ?? null}
                    player={player}
                    columnIndex={i}
                    intialYDistance={160}
                    initialScaling={3}
                  />
                ))}
          </button>
        ))}
      </div>
      {isHomePlayer ? (
        <div className="flex pt-1 justify-evenly font-bold text-2xl">
          <h3 style={{ color: playerColor.onPrimary }} className=" w-4">
            {calculateDiceDataColumn(player.diceGrid[0])}
          </h3>
          <h3
            style={{ color: playerColor.onPrimary }}
            className="w-16 text-center"
          >
            {calculateDiceDataColumn(player.diceGrid[1])}
          </h3>
          <h3 style={{ color: playerColor.onPrimary }} className="w-4">
            {calculateDiceDataColumn(player.diceGrid[2])}
          </h3>
        </div>
      ) : null}
    </div>
  );
}
