import { useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";

export function LoadingDie({ isConnected }: { isConnected: boolean }) {
  const { rive, RiveComponent } = useRive({
    src: "animations/dice_loading.riv",
    stateMachines: ["state_machine"],
    autoplay: true,
  });

  useEffect(() => {
    if (isConnected) {
      connectDie();
    }
  }, [isConnected]);

  // Function to trigger the "connected" state
  function connectDie() {
    const input = rive
      ?.stateMachineInputs("state_machine")
      ?.find((input) => input.name === "connected");
    if (input) {
      input.value = true;
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <RiveComponent style={{ width: 128, height: 128 }} />
    </div>
  );
}

export default LoadingDie;
