import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ message, severity, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // auto hide after 3 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // position
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const useToast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showToast = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return {
    showToast,
    ToastComponent: (
      <Toast
        message={message}
        severity={severity}
        open={open}
        onClose={() => setOpen(false)}
      />
    ),
  };
};

export default useToast;
