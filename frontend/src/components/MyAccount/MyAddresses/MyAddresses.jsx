import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import {
  getAllUserAddresses,
  deleteAddress,
  updateAddress,
} from "../../../api/endpoints/address";
import AddNewAddressModal from "./AddNewAddressModal";
import DeleteAddressConfirmationModal from "./DeleteAddressConfirmationModal";
import EditAddressModal from "./EditAddressModal";

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [addressToEdit, setAddressToEdit] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAllUserAddresses();

      const sortedAddresses = response.sort(
        (a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0)
      );

      setAddresses(sortedAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress(addressId);
      setAddresses(addresses.filter((address) => address.id !== addressId));
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };
  const handleEditClick = (address) => {
    setAddressToEdit(address);
    setOpenEditModal(true);
  };

  const handleSetDefault = async (address) => {
    try {
      const defaultAddress = addresses.find((addr) => addr.default);
      if (defaultAddress && defaultAddress.id !== address.id) {
        await updateAddress({ ...defaultAddress, default: false });
      }

      await updateAddress({ ...address, default: true });

      fetchAddresses();
    } catch (error) {
      console.error("Failed to set default address", error);
    }
  };
  const handleAddressUpdated = async () => {
    try {
      const response = await getAllUserAddresses();
      const sortedAddresses = response.sort(
        (a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0)
      );
      setAddresses(sortedAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setOpenEditModal(false);
    }
  };

  const handleAddressAdded = async () => {
    try {
      const response = await getAllUserAddresses();
      const sortedAddresses = response.sort(
        (a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0)
      );
      setAddresses(sortedAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setOpenAddModal(false);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          My Addresses
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#BBFF0F",
            color: "black",
            marginRight: 3,
            "&:hover": { backgroundColor: "#A0E60D" },
          }}
          onClick={() => setOpenAddModal(true)}
        >
          + Add New Address
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading addresses...</Typography>
      ) : addresses.length === 0 ? (
        <Typography>No addresses found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} key={address.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  backgroundColor: address.default ? "#d1ffd1" : "white",
                  padding: 2,
                  marginRight: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Card Content */}
                  <CardContent sx={{ padding: 0 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <PersonIcon sx={{ marginRight: 1 }} />
                      {address.firstName} {address.lastName}
                      {address.default && (
                        <Typography
                          variant="caption"
                          sx={{ ml: 1, color: "green", fontWeight: "bold" }}
                        >
                          (Default)
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HomeIcon sx={{ marginRight: 1 }} />
                      {address.unitNumber}, {address.streetNumber}{" "}
                      {address.streetName}, {address.city}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 4,
                      }}
                    >
                      {address.stateProvince}, {address.country} -{" "}
                      {address.postalCode}
                    </Typography>

                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <CallIcon sx={{ marginRight: 1 }} />
                      {address.phoneNumber}
                    </Typography>
                  </CardContent>

                  {/* Card Buttons - Vertical Layout */}
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        height: 30,
                        borderRadius: 3,
                        width: 150,
                      }}
                      onClick={() => handleEditClick(address)}
                    >
                      Edit
                    </Button>

                    {!address.default && (
                      <Button
                        sx={{
                          backgroundColor: "#BBFF0F",
                          color: "black",
                          height: 30,
                          borderRadius: 3,
                          width: 150,
                        }}
                        onClick={() => handleSetDefault(address)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDeleteClick(address)}
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        height: 30,
                        borderRadius: 3,
                        width: 150,
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <AddNewAddressModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        onAddressAdded={handleAddressAdded}
        isAuthenticated={true}
      />
      <DeleteAddressConfirmationModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
        address={addressToDelete}
      />
      <EditAddressModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        address={addressToEdit}
        onAddressUpdated={handleAddressUpdated}
      />
    </Box>
  );
};

export default MyAddresses;
