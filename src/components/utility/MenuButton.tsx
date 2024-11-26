export function MenuButton({
  text,
  onPressed,
}: {
  text: string;
  onPressed: () => void;
}) {
  return (
    <>
      <button
        onClick={onPressed}
        className=" py-6 px-10 my-4 bg-primary text-2xl shadow-xl text-onPrimary rounded-lg border-4 border-onSurface"
      >
        {text.toUpperCase()}
      </button>
    </>
  );
}
