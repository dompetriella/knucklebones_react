import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { AppColors } from "../AppColors";

function StartPage() {
  const navigator = useNavigate();

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <div className="bg-secondary h-1/3 w-full flex justify-center border-b-4 border-onSurface items-center">
          <h1 className="text-3xl">{"KnuckleBones"}</h1>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"How To Play"}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.HowToPlay)}
          />
          <MenuButton
            text={"Play VS CPU"}
            onPressed={() => navigator(AppRoutes.CpuDifficulty)}
          />
        </div>
      </div>
    </>
  );
}

export default StartPage;
