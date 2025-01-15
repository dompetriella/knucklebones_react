import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { PageHeader } from "../components/utility/PageHeader";
import { PageRoutes } from "../router/PageRoutes";

function SettingsPage() {
  const navigator = useNavigate();
  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface relative">
        <PageHeader headerText="Settings" returnRoute={AppRoutes.Start} />
      </div>
    </>
  );
}

export default SettingsPage;
