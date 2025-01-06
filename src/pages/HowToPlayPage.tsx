import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { Player } from "../models/Player";
import { PlayerDiceBlock } from "../components/playerArea/PlayerDiceBlock";
import { Scoreboard } from "../components/statusBar/Scoreboard";
import { v4 as uuidv4 } from "uuid";
import { characterDataList } from "../global/characterData";

function HowToPlayPage() {
  const playerId = uuidv4();
  const dieId = uuidv4();
  return (
    <>
      <div className="relative flex w-full flex-col justify-start items-center bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-48 w-full flex flex-col justify-center items-center border-b-4 border-onSurface ">
          <h1 className="text-3xl">How To Play</h1>
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>

        <p className="text-sm p-4 italic">
          All credit goes to MassiveMonster's Cult of the Lamb for gameplay and
          rules. If you enjoyed this game, please support them by going to their{" "}
          <a
            href="https://www.cultofthelamb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            website
          </a>{" "}
          and purchasing the game
        </p>

        <section className="p-8 text-left flex flex-col">
          <h2 className="text-xl font-bold">Objective</h2>
          <p>
            Score more points than your opponent by putting dice in your columns
          </p>
          <Scoreboard
            homePlayerState={
              new Player({
                id: "player",
                playerName: "Player",
                score: 42,
                diceGrid: [[null], [null], [null]],
                isActivePlayer: true,
                color: PlayerColorEnum.Red,
                character: characterDataList[0],
              })
            }
            awayPlayerState={
              new Player({
                id: "cpu",
                playerName: "CPU",
                score: 20,
                diceGrid: [[null], [null], [null]],
                isActivePlayer: false,
                color: PlayerColorEnum.Orange,
                character: characterDataList[1],
              })
            }
            usableDieState={new DiceData({ id: dieId, numberValue: 4 })}
          />
          <div className="flex justify-around">
            <h3 className="text-3xl">68</h3>
            <h3 className="text-3xl">24</h3>
          </div>

          <div className="py-4"></div>

          <h2 className="text-xl font-bold">How To Score</h2>
          <p>
            When it's your turn (indicated by the die in your color, and next to
            your player), click a column to add the rolled dice to it. Dice of
            the same value in the same column increase the amount scored by a
            factor of dice matched.
          </p>
          <div className="flex flex-col items-center">
            <h3 className="p-4 text-xl font-bold justify-evenly">Example</h3>
            <div className="flex justify-evenly pt-1 font-bold text-2xl">
              <h3 className="w-4">3</h3>
              <h3 className="w-36 text-center">12</h3>
              <h3 className="w-4">27</h3>
            </div>
            <PlayerDiceBlock
              player={
                new Player({
                  id: playerId,
                  playerName: "Player",
                  score: 0,
                  isActivePlayer: false,
                  color: PlayerColorEnum.Red,
                  diceGrid: [
                    [null, null, new DiceData({ id: dieId, numberValue: 3 })],
                    [
                      null,
                      new DiceData({ id: dieId, numberValue: 3 }),
                      new DiceData({ id: dieId, numberValue: 3 }),
                    ],
                    [
                      new DiceData({ id: dieId, numberValue: 3 }),
                      new DiceData({ id: dieId, numberValue: 3 }),
                      new DiceData({ id: dieId, numberValue: 3 }),
                    ],
                  ],
                  character: characterDataList[0],
                })
              }
              isHomePlayer={true}
            />
          </div>
          <div className="py-4"></div>
          <h2 className="text-xl font-bold">En Guarde!</h2>
          <p>
            When a player places the same value die in your column, it will
            remove all die of the same number in your column.
          </p>
          <br></br>
          <p>
            Both you and your opponent can use this to their advantage to clear
            a column in a fell swoop, so use it wisely!
          </p>
          <div className="py-4"></div>
        </section>
      </div>
    </>
  );
}

export default HowToPlayPage;
