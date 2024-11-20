function DiceDot({ hasDot }: { hasDot: boolean }) {
  return (
    <>
      <div
        className={`h-[14px] w-[14px] rounded-full ${
          hasDot ? "bg-onPrimary" : "bg-transparent"
        } `}
      ></div>
    </>
  );
}

export default DiceDot;
