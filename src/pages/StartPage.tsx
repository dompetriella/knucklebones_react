import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

function StartPage() {
  const navigator = useNavigate();
  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <div className="bg-secondary h-1/3 w-full flex justify-center items-center">
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>
        <div className="flex size-full flex-col justify-evenly items-center">
          <button
            onClick={() => navigator({ pathname: AppRoutes.Game })}
            className=" py-6 px-10 bg-primary text-2xl shadow-xl text-onPrimary rounded-lg border-4 border-onSurface"
          >
            PLAY
          </button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
