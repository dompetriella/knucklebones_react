import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { Player } from "../models/Player";
import { PlayerDiceBlock } from "../components/playerArea/PlayerDiceBlock";
import { Scoreboard } from "../components/statusBar/Scoreboard";
import { v4 as uuidv4 } from "uuid";
import { characterDataList } from "../global/characterData";
import useScreenWidth from "../hooks/useScreenWidth";
import { MenuButton } from "../components/utility/MenuButton";
import useGameState from "../state/gameState";
import useSystemState from "../state/systemState";

function HowToPlayPage() {
  const playerId = uuidv4();
  const dieId = "1";

  const screenWidthState = useScreenWidth();
  const showSnackbarAction = useSystemState((state) => state.showSnackbar);

  return (
    <>
      <div className="flex w-full flex-col justify-start items-center bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-60 w-full flex flex-col justify-center items-center border-b-4 border-onSurface ">
          <h1 className="text-3xl">How To Play</h1>
          <img
            style={{ width: screenWidthState * 0.9, maxWidth: 600 }}
            src="/images/Title.svg"
          />
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

        <section className="p-8 text-left flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold">Objective</h2>
          <p>
            Score more points than your opponent by putting dice in your
            columns.
          </p>

          <p className="pt-4">
            Game is over when a player fills their dice board. Player with the
            most points win.
          </p>

          <div className="py-4"></div>

          <h2 className="text-xl font-bold">How To Score</h2>
          <p>
            When it's your turn click an empty column to add the rolled dice to
            it.
          </p>
          <p className="pt-4">
            Dice of the same value in the same column increase the amount scored
            by a factor of dice matched.
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

          <p className="pt-4">
            Both you and your opponent can use this to their advantage to clear
            a column in a fell swoop, so use it wisely!
          </p>
          <div className="py-4"></div>
          <div className="py-8"></div>
          <h2 className="text-xl font-bold">Playing vs Computer</h2>
          <p>You can play against the CPU all day!</p>

          <p className="pt-4">
            To start, press the Player Vs. CPU button at the main page
          </p>
          <MenuButton
            width={250}
            text={"Player VS CPU"}
            onPressed={() => {
              showSnackbarAction(
                "Not this one, nice try though.  Scroll up, click back, and use that one"
              );
            }}
            shouldAnimate={false}
          />

          <div className="py-8"></div>

          <h2 className="text-xl font-bold">Playing Online</h2>
          <p>Knucklebones can be played online with a friend (or enemy)</p>

          <p className="pt-4">
            To start, press the Player Vs. Player button at the main menu
          </p>
          <MenuButton
            width={250}
            text={"Player VS Player"}
            onPressed={() => {
              showSnackbarAction(
                "Not this one, nice try though.  Scroll up, click back, and use that one"
              );
            }}
            shouldAnimate={false}
          />

          <div className="py-4"></div>
          <h2 className="text-xl font-bold">Create Room</h2>
          <p>Select Create Room to start a game as the "host"</p>

          <p className="pt-4">
            Once you create a room, share the code given to the person you want
            to join.
          </p>
          <p className="pt-4">
            <strong>HINT:</strong> You can copy the code (share link) to your
            clipboard by clicking on it.
          </p>
          <p className="pt-4">
            Just send that link to your friend to connect quickly
          </p>
          <MenuButton
            width={250}
            text={"Create Room"}
            onPressed={() => {
              showSnackbarAction(
                "Not this one, nice try though.  Scroll up, click back, and use that one"
              );
            }}
            shouldAnimate={false}
          />

          <div className="py-4"></div>
          <div className="py-4"></div>
          <h2 className="text-xl font-bold">Join Room</h2>
          <p>Select Create Room to join a game started by a "host"</p>

          <p className="pt-4">
            Enter the code given by the host and click continue
          </p>
          <p className="pt-4">
            <strong>HINT:</strong> If you have a share link from a host, you can
            skip most of these steps
          </p>
          <MenuButton
            width={250}
            text={"Join Room"}
            onPressed={() => {
              showSnackbarAction(
                "Not this one, nice try though.  Scroll up, click back, and use that one"
              );
            }}
            shouldAnimate={false}
          />

          <div className="py-4"></div>
          <h1 className="text-4xl">HAVE FUN!</h1>
        </section>
      </div>
    </>
  );
}

export default HowToPlayPage;
