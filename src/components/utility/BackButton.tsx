import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/AppRoutes";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function BackButton({ route }: { route: AppRoutes }) {
  const navigator = useNavigate();
  return (
    <button
      className="absolute flex top-4 left-4 bg-primary text-onPrimary px-4 py-2 rounded-md border-onSurface filter hover:brightness-125"
      onClick={() => navigator(route)}
    >
      <ArrowBackIcon />
    </button>
  );
}
