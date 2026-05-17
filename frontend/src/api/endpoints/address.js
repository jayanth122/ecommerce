import api from "../api";

// Fetch the default user address
export const getDefaultUserAddress = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("delivery-addresses/getDefaultUserAddress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching default address:", err);
    throw err;
  }
};

// Fetch all user addresses
export const getAllUserAddresses = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("delivery-addresses/getUserAddresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching all addresses:", err);
    throw err;
  }
};

// Add a new address
export const addNewAddress = async (addressData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "delivery-addresses/addNewAddress",
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error adding new address:", err);
    throw err;
  }
};

// Update an existing address
export const updateAddress = async (addressData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      "delivery-addresses/updateAddress",
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error updating address:", err);
    throw err;
  }
};

// Delete an address by ID
export const deleteAddress = async (addressId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(
      `delivery-addresses/deleteAddress/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error deleting address:", err);
    throw err;
  }
};
