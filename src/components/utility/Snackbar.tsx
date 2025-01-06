import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useGameState from "../../state/gameState";
import { AppColors } from "../../AppColors";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobalSnackbar: React.FC = () => {
  // Get the full snackbar object and the hideSnackbar method individually
  const snackbar = useGameState((state) => state.snackbar); // Avoid creating new objects
  const hideSnackbar = useGameState((state) => state.hideSnackbar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return; // Prevent Snackbar from closing when the user clicks away
    }
    hideSnackbar();

    if (event) {
    }
  };

  let snackbarBackgroundColor;
  let snackbarTextColor;
  switch (snackbar.severity) {
    case "success":
      snackbarBackgroundColor = AppColors.Green;
      break;
    case "info":
      snackbarBackgroundColor = AppColors.Orange;
      break;
    case "warning":
      snackbarBackgroundColor = AppColors.Purple;
      break;
    case "error":
      snackbarBackgroundColor = AppColors.Red;
      break;
    default:
      snackbarBackgroundColor = AppColors.Orange;
      break;
  }

  switch (snackbar.severity) {
    case "success":
      snackbarTextColor = AppColors.onGreen;
      break;
    case "info":
      snackbarBackgroundColor = AppColors.onOrange;
      break;
    case "warning":
      snackbarBackgroundColor = AppColors.onPurple;
      break;
    case "error":
      snackbarBackgroundColor = AppColors.onPurple;
      break;
    default:
      snackbarBackgroundColor = AppColors.onOrange;
      break;
  }

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        style={{
          background: snackbarBackgroundColor,
          color: snackbarTextColor,
          fontSize: "1em",
        }}
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
