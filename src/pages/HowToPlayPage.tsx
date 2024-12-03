import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { DiceData } from "../models/DiceData";
import DiceSlot from "../components/dice/DiceSlot";
import { AppColors } from "../AppColors";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { PlayerColor } from "../models/PlayerColor";
import { Player } from "../models/Player";
import { getColorByEnum } from "../logic/colorLogic";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { PlayerDiceBlock } from "../components/playerArea/PlayerDiceBlock";
import { Scoreboard } from "../components/statusBar/Scoreboard";

function HowToPlayPage() {
  const navigator = useNavigate();
  return (
    <>
      <div className="relative flex size-fit flex-col justify-start items-center bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-48 w-full flex flex-col justify-center items-center border-b-4 border-onSurface ">
          <h1 className="text-3xl">How To Play</h1>
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>
        <section className="p-8 text-left">
          <h2 className="text-xl font-bold">Objective</h2>
          <p>
            Score more points than your opponent by putting dice in your columns
          </p>
          <Scoreboard />
          <div className="py-4"></div>
          
          <h2 className="text-xl font-bold">How-To</h2>
          <p>
            When it's your turn, click a column to add the rolled dice to it.
            Dice of the same number in the same column increase the amount
            scored by a factor dice matched.
          </p>
          <div className="flex flex-col items-center">
            <h3 className="p-4 text-xl font-bold justify-evenly">Example</h3>
            <PlayerDiceBlock
              player={
                new Player({
                  id: 0,
                  playerName: "Jeff",
                  score: 0,
                  isActivePlayer: false,
                  color: PlayerColorEnum.Red,
                  diceGrid: [
                    [null, null, new DiceData({ id: 0, numberValue: 3 })],
                    [
                      null,
                      new DiceData({ id: 0, numberValue: 3 }),
                      new DiceData({ id: 0, numberValue: 3 }),
                    ],
                    [
                      new DiceData({ id: 0, numberValue: 3 }),
                      new DiceData({ id: 0, numberValue: 3 }),
                      new DiceData({ id: 0, numberValue: 3 }),
                    ],
                  ],
                })
              }
            />
          </div>
          <div className="py-4"></div>
          <h2 className="text-xl font-bold">Objective</h2>
          <p>
            Score more points than your opponent by putting dice in your columns
          </p>
          <div className="py-4"></div>
          
          <h2 className="text-xl font-bold">How-To</h2>
          <p>
            When it's your turn, click a column to add the rolled dice to it.
            Dice of the same number in the same column increase the amount
            scored by a factor dice matched.
          </p>
        </section>
      </div>
    </>
  );
}

export default HowToPlayPage;
