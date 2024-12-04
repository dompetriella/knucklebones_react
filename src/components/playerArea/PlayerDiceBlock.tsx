import { getColorByEnum } from "../../logic/colorLogic";
import { calculateDiceDataColumn } from "../../logic/scoring";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";

export function PlayerDiceBlock({ player }: { player: Player }) {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const addUsableDieToPlayerColumnAction = useGameState(
    (state) => state.addUsableDieToPlayerColumn
  );

  const playerColor: PlayerColor = getColorByEnum(player?.color ?? null);

  const currentActivePlayer = 
    homePlayerState?.isActivePlayer ? homePlayerState : awayPlayerState
  
  return (
    <div className="flex-col">
        { player === awayPlayerState ? <div className="flex justify-evenly pt-1 font-bold text-2xl">
            
        <h3 style={{color: playerColor.onPrimary}} className=" w-4">{calculateDiceDataColumn(player.diceGrid[0])}</h3>
        <h3 style={{color: playerColor.onPrimary}} className="w-16 text-center">{calculateDiceDataColumn(player.diceGrid[1])}</h3>
        <h3 style={{color: playerColor.onPrimary}} className="w-4">{calculateDiceDataColumn(player.diceGrid[2])}</h3>
        </div> : null}
        
      <div
        style={{ backgroundColor: playerColor.secondary }}
        className="flex border-4 border-onSurface p-2 shadow-md rounded-lg"
      >
        {player?.diceGrid.map((_, i) => (
          <button
            onClick={() => {
              if (player === homePlayerState && player.isActivePlayer) {
                addUsableDieToPlayerColumnAction(currentActivePlayer!, i);
              }
            }}
            className="flex flex-col bg-surface m-1 pb-2 rounded-lg"
          >
            {player === awayPlayerState
              ? player?.diceGrid[i]
                  .slice()
                  .reverse()
                  .map((dice) => (
                    <DiceSlot
                      diceData={dice ?? null}
                      playerColor={playerColor}
                    />
                  ))
              : player?.diceGrid[i].map((dice) => (
                  <DiceSlot diceData={dice ?? null} playerColor={playerColor} />
                ))}
          </button>
        ))}
      </div>
      { player === homePlayerState ? <div className="flex pt-1 justify-evenly font-bold text-2xl">
            
            <h3 style={{color: playerColor.onPrimary}} className=" w-4">{calculateDiceDataColumn(player.diceGrid[0])}</h3>
            <h3 style={{color: playerColor.onPrimary}} className="w-16 text-center">{calculateDiceDataColumn(player.diceGrid[1])}</h3>
            <h3 style={{color: playerColor.onPrimary}} className="w-4">{calculateDiceDataColumn(player.diceGrid[2])}</h3>
            </div> : null}
    </div>
  );
}
