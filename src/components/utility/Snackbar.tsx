import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppColors } from "../../AppColors";
import useSystemState from "../../state/systemState";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobalSnackbar: React.FC = () => {
  const snackbar = useSystemState((state) => state.snackbar);
  const hideSnackbar = useSystemState((state) => state.hideSnackbar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    hideSnackbar();

    if (event) {
    }
    if (reason) {
    }
  };

  const snackbarBackgroundColor = () => {
    switch (snackbar.severity) {
      case "success":
        return AppColors.Green;
      case "info":
        return AppColors.Secondary;

      case "warning":
        return AppColors.Tertiary;

      case "error":
        return AppColors.Primary;

      default:
        return AppColors.Secondary;
    }
  };

  const snackbarTexColor = () => {
    switch (snackbar.severity) {
      case "success":
        return AppColors.onGreen;
      case "info":
        return AppColors.onOrange;

      case "warning":
        return AppColors.onPurple;

      case "error":
        return AppColors.onRed;

      default:
        return AppColors.onOrange;
    }
  };

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        style={{
          background: snackbarBackgroundColor(),
          color: snackbarTexColor(),
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
