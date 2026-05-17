import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from "@mui/material";
import { getAllUserAddresses } from "../../api/endpoints/address";
import AddNewAddressModal from "./AddNewAddressModal"; // Import the new modal component

const AddressSelectionModal = ({
  open,
  handleClose,
  setDefaultAddress,
  isAuthenticated,
}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useState(false);

  // Fetch addresses depending on whether the user is authenticated
  useEffect(() => {
    if (open) {
      if (isAuthenticated) {
        // Fetch addresses from API if the user is logged in
        const fetchAddresses = async () => {
          try {
            const addressList = await getAllUserAddresses();
            setAddresses(addressList);

            const defaultAddress = addressList.find((addr) => addr.default);
            if (defaultAddress) {
              setSelectedAddress(defaultAddress);
            } else if (addressList.length > 0) {
              setSelectedAddress(addressList[0]);
            }
          } catch (err) {
            console.error("Error fetching addresses:", err);
          }
        };

        fetchAddresses();
      } else {
        // Fetch guest user address from local storage
        const guestAddress =
          JSON.parse(localStorage.getItem("guestAddress")) || null;

        if (guestAddress) {
          setAddresses([guestAddress]); // Store it as an array
          setSelectedAddress(guestAddress);
        } else {
          setAddresses([]); // Ensure addresses is an array
          setSelectedAddress(null);
        }
      }
    }
  }, [open, isAuthenticated]);

  const handleSave = () => {
    if (selectedAddress) {
      setDefaultAddress(selectedAddress);
      handleClose();
    }
  };

  const handleAddNewAddressClick = () => {
    setOpenAddNewAddressModal(true);
  };

  const handleCloseAddNewAddressModal = () => {
    setOpenAddNewAddressModal(false);
  };

  const handleAddressAdded = (newAddress) => {
    if (isAuthenticated) {
      const fetchAddresses = async () => {
        try {
          const addressList = await getAllUserAddresses();
          setAddresses(addressList);

          const defaultAddress = addressList.find((addr) => addr.default);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else if (addressList.length > 0) {
            setSelectedAddress(addressList[0]);
          }
        } catch (err) {
          console.error("Error fetching addresses:", err);
        }
      };

      fetchAddresses();
    } else {
      localStorage.setItem("guestAddress", JSON.stringify(newAddress));
      setAddresses([newAddress]);

      setSelectedAddress(newAddress);
    }

    setOpenAddNewAddressModal(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Select a Delivery Address
          </Typography>
          <RadioGroup
            value={selectedAddress?.id || ""}
            onChange={(e) => {
              const selected = addresses.find(
                (addr) => addr.id === e.target.value
              );
              setSelectedAddress(selected);
            }}
          >
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {addresses.map((addr) => (
                <Card
                  key={addr.id}
                  sx={{
                    mb: 1,
                    cursor: "pointer",
                    border:
                      selectedAddress?.id === addr.id
                        ? "2px solid #3D52A0"
                        : "1px solid #ddd", // Highlight the selected card
                    borderRadius: 1,
                  }}
                  onClick={() => setSelectedAddress(addr)}
                >
                  <CardContent>
                    <FormControlLabel
                      value={addr.id}
                      control={
                        <Radio
                          checked={selectedAddress?.id === addr.id} // Mark as checked when selected
                          sx={{
                            color: "primary.main",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                          >{`${addr.firstName} ${addr.lastName}`}</Typography>
                          <Typography variant="body2">{`${addr.streetNumber} ${addr.streetName}, ${addr.city}`}</Typography>
                        </>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </RadioGroup>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: "primary.main", cursor: "pointer" }}
              onClick={handleAddNewAddressClick}
            >
              Add New Delivery Address
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!selectedAddress}
              sx={{
                backgroundColor: "#ccff00",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#b8e600" },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <AddNewAddressModal
        open={openAddNewAddressModal}
        handleClose={handleCloseAddNewAddressModal}
        onAddressAdded={handleAddressAdded}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Increased width for better layout
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

export default AddressSelectionModal;
