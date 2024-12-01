export function MenuButton({
  text,
  bgColor,
  textColor,
  onPressed,
}: {
  text: string;
  bgColor?: string,
  textColor?: string
  onPressed: () => void;
}) {
  return (
    <>
      <button
      style={{backgroundColor: bgColor, color: textColor}}
        onClick={onPressed}
        className=" py-6 px-10 my-4 bg-primary filter hover:brightness-125 text-2xl shadow-xl text-onPrimary rounded-lg border-4 border-onSurface"
      >
        {text.toUpperCase()}
      </button>
    </>
  );
}
