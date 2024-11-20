import { DiceData } from "../../models/DiceData";
import DiceDot from "./DiceDot";
import DotArray from "./DotArray";

function DiceSlot({ diceData }: { diceData?: DiceData }) {
  return (
    <>
      <div
        className={`h-20 w-20  ml-2 mr-2 mt-2 rounded-lg border-onSurface border-4 ${
          diceData != null ? "bg-primary" : "bg-transparent opacity-5"
        } `}
      >
        <DotArray numberValue={diceData?.numberValue} />
      </div>
    </>
  );
}

export default DiceSlot;
