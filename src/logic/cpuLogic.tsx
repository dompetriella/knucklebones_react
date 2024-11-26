import { forEach } from "lodash";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import useGameState from "../state/gameState";
import { generateRandomInt } from "./utility";

export function runCpuTurn() {
  const cpuDifficultyState = useGameState((state) => state.playerType);

  switch (cpuDifficultyState) {
    case PlayerTypeEnum.Easy:
      easyCPULogic();
      break;

    default:
      easyCPULogic();
  }
}

function easyCPULogic() {
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const addDiceToColumnAction = useGameState(
    (state) => state.addUsableDieToPlayerColumn
  );

  const availableColumns = [];
  for (let i = 0; i < awayPlayerState?.diceGrid.length!; i++) {
    let columnIsAvailable = false;
    awayPlayerState?.diceGrid[i].forEach((die) => {
      if (die === null) {
        columnIsAvailable = true;
      }
    });
    if (columnIsAvailable) {
      availableColumns.push(i);
    }
  }

  const randomColumn = generateRandomInt({ max: availableColumns.length - 1 });

  addDiceToColumnAction(awayPlayerState!, randomColumn);
}
