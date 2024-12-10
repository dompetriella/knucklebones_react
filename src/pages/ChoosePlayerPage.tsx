import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

function ExamplePage() {
  const navigator = useNavigate();
  return (
    <>
      <button onClick={() => navigator(AppRoutes.Start)}>Go To Start</button>
    </>
  );
}

export default ExamplePage;
