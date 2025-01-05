import { motion } from "framer-motion";

export function MenuButton({
  text,
  bgColor,
  textColor,
  width,
  onPressed,
  shouldAnimate = true,
  animationDelay = 0
}: {
  text: string;
  bgColor?: string;
  textColor?: string;
  width?: number;
  onPressed: () => void;
  shouldAnimate?: boolean
  animationDelay?: number
}) {
  return (
    <>
      <motion.button
        initial={shouldAnimate ? { y: 8, opacity: 0 } : false}
        animate={shouldAnimate ? { y: 0, opacity: 1, transition: { delay: animationDelay } } : false}

        style={{
          backgroundColor: bgColor,
          color: textColor,
          width: `${width}px`,
        }}
        onClick={onPressed}
        className=" py-6 px-10 my-4 bg-primary filter hover:brightness-125 text-2xl shadow-xl text-onPrimary rounded-lg border-4 border-onSurface"
      >
        {text.toUpperCase()}
      </motion.button>
    </>
  );
}
