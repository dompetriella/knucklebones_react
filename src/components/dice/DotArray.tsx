import DiceDot from "./DiceDot";

function DotArray({ numberValue }: { numberValue?: number }) {
  return (
    <>
      <div className="size-full flex flex-col justify-between p-2">
        <div className="flex justify-between ">
          <DiceDot
            hasDot={numberValue === 4 || numberValue === 5 || numberValue === 6}
          />
          <DiceDot hasDot={false} />
          <DiceDot hasDot={numberValue !== 1} />
        </div>
        <div className="flex justify-between">
          <DiceDot hasDot={numberValue === 6} />
          <DiceDot
            hasDot={numberValue === 1 || numberValue === 3 || numberValue === 5}
          />
          <DiceDot hasDot={numberValue === 6} />
        </div>
        <div className="flex justify-between">
          <DiceDot hasDot={numberValue !== 1} />
          <DiceDot hasDot={false} />
          <DiceDot
            hasDot={numberValue === 4 || numberValue === 5 || numberValue === 6}
          />
        </div>
      </div>
    </>
  );
}

export default DotArray;
