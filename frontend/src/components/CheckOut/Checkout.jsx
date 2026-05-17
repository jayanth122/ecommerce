import { Button } from "@mui/material";
import { useState } from "react";
import AddEditCardDialog from "../PaymentCard/AddEditCardDialog";
import useToast from "../utils/Toast";

const Checkout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        sx={{
          backgroundColor: "#BBFF0F",
          color: "#000",
        }}
      >
        Add Payment Method
      </Button>

      <AddEditCardDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        showToast={showToast}
      />
      {ToastComponent}
    </div>
  );
};

export default Checkout;
