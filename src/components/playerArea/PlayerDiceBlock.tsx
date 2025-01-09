import { useState } from "react";
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
  const [isDiceAddOnCooldown, setIsDiceAddOnCooldown] = useState(false);

  const homePlayerState = useGameState((state) => state.homePlayer);

  const addUsableDieToPlayerColumnAction = useGameState(
    (state) => state.addUsableDieToPlayerColumn
  );

  const playerColor: PlayerColor = player.character?.color!;

  return (
    <div className="flex-col overflow-y-hidden overflow-x-hidden">
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
        style={{ backgroundColor: player.character?.color.secondary }}
        className="flex border-4 border-onSurface p-2 shadow-md rounded-lg overflow-y-hidden overflow-x-hidden"
      >
        {player?.diceGrid.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (
                player.isActivePlayer &&
                player.id === homePlayerState!.id &&
                !isDiceAddOnCooldown
              ) {
                setIsDiceAddOnCooldown(() => true);
                addUsableDieToPlayerColumnAction(player, i);
                setTimeout(() => {
                  setIsDiceAddOnCooldown(() => false);
                }, 1000);
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
                      key={dice?.id}
                      diceData={dice ?? null}
                      player={player}
                      columnIndex={i}
                      initialYDistance={-192}
                      initialScaling={2.5}
                    />
                  ))
              : player?.diceGrid[i].map((dice) => (
                  <DiceSlot
                    key={dice?.id}
                    diceData={dice ?? null}
                    player={player}
                    columnIndex={i}
                    initialYDistance={192}
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
