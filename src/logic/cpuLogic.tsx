import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { generateRandomInt } from "./utility";
import { Player } from "../models/Player";

export function runCpuTurn({cpuPlayerState, cpuDifficultyState, addDiceToColumn}: 
  {cpuPlayerState: Player, cpuDifficultyState: PlayerTypeEnum, addDiceToColumn: (player: Player, column: number) => void;}) {

    if (cpuPlayerState.isActivePlayer) {
      console.log('cpu is active turn');
      switch (cpuDifficultyState) {
        case PlayerTypeEnum.Easy:
          const availableColumns = [];
          for (let i = 0; i < cpuPlayerState.diceGrid.length!; i++) {
            let columnIsAvailable = false;
            cpuPlayerState.diceGrid[i].forEach((die) => {
              if (die === null) {
                columnIsAvailable = true;
              }
            });
            if (columnIsAvailable) {
              availableColumns.push(i);
            }
          }
        
          console.log(`cpu is choosing from column ${availableColumns}`)
          const randomColumn = availableColumns[ generateRandomInt({ max: availableColumns.length - 1 })];
          console.log( `cpu chose column ${randomColumn}`)
        
          addDiceToColumn(cpuPlayerState, randomColumn);
          break;
    
        default:
          console.log('oops')
          break;
      }
    }
  
}
