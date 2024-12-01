import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/AppRoutes";

export function BackButton() {
    const navigator = useNavigate();
    return   <button
    className="absolute top-4 left-4 bg-primary text-onPrimary px-4 py-2 rounded-md border-onSurface"
    onClick={() => navigator(AppRoutes.Start)}
  >
    Back
  </button>
}