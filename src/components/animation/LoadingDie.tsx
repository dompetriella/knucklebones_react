import { useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";

export function LoadingDie({ isConnected }: { isConnected: boolean }) {
  const { rive, RiveComponent } = useRive({
    src: "/dice_loading.riv",
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
    console.log(input);
    if (input) {
      input.value = true;
      console.log("triggered");
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <RiveComponent style={{ width: 160, height: 160 }} />
    </div>
  );
}

export default LoadingDie;
