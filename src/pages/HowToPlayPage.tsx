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

function HowToPlayPage() {
  const navigator = useNavigate();
  return (
    <>
      <div className="relative flex size-full flex-col justify-start items-center bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-1/3 w-full flex flex-col justify-center items-center border-b-4 border-onSurface ">
          <h1 className="text-3xl">How To Play</h1>
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>
        <section className="p-8 text-left">
          <h2 className="text-xl font-bold">Objective</h2>
          <p>
            Score more points than your opponent by putting dice in your columns
          </p>
          <div className="py-4"></div>
          <h2 className="text-xl font-bold">How-To</h2>
          <p>
            When it's your turn click a column to add the rolled dice to it.
            Dice of the same number in the same column increase the amount
            scored by a factor dice matched.
          </p>
          <div className="py-4"></div>
          <h3 className="font-bold text-center">Example</h3>
          <div className="py-2"></div>
          <div className="flex justify-evenly items-start">
            <div className="flex flex-col items-center">
              <p className="font-bold text-3xl">3</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-3xl">12</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
              <p className="font-bold text-3xl">+</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-3xl">27</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
              <p className="font-bold text-3xl">+</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
              <p className="font-bold text-3xl">+</p>
              <DiceSlot
                playerColor={getColorByEnum(PlayerColorEnum.Red)}
                diceData={new DiceData({ id: 0, numberValue: 3 })}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HowToPlayPage;
