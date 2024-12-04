export function MenuButton({
  text,
  bgColor,
  textColor,
  width,
  onPressed,
}: {
  text: string;
  bgColor?: string;
  textColor?: string;
  width?: number;
  onPressed: () => void;
}) {
  return (
    <>
      <button
        style={{
          backgroundColor: bgColor,
          color: textColor,
          width: `${width}px`,
        }}
        onClick={onPressed}
        className=" py-6 px-10 my-4 bg-primary filter hover:brightness-125 text-2xl shadow-xl text-onPrimary rounded-lg border-4 border-onSurface"
      >
        {text.toUpperCase()}
      </button>
    </>
  );
}
