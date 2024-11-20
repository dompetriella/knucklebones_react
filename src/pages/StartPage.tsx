import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

function StartPage() {
  const navigator = useNavigate();
  return (
    <>
      <button onClick={() => navigator(AppRoutes.Example)}>
        Go To Example
      </button>
    </>
  );
}

export default StartPage;
