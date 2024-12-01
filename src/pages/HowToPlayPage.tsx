import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";

function HowToPlayPage() {
  const navigator = useNavigate();
  return (
    <>
      <div className="relative flex size-full flex-col justify-start items-center bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-1/3 w-full flex flex-col justify-center items-center border-b-4 border-onSurface ">
          <h1 className="text-3xl">How To Play</h1>
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>
        
      </div>
    </>
  );
}

export default HowToPlayPage;
