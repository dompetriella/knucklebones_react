import { useRive } from "@rive-app/react-canvas";

export function IdleRiveCharacter({
  path,
  width,
  height,
}: {
  path: string;
  width: number;
  height: number;
}) {
  const { rive, RiveComponent } = useRive({
    src: path,
    stateMachines: ["state_machine"],
    autoplay: true,
  });

  return (
    <RiveComponent
      style={{
        zIndex: 2,
        height: height,
        width: width,
      }}
    />
  );
}
