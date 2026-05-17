import api from "../api";

// Fetch user personal info
export const getUserPersonalInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("users/getPersonalInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching personal info:", err);
    throw err;
  }
};

// Update user personal info (general fields such as phone, address, etc.)
export const updateUserPersonalInfo = async (info) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put("users/updatePersonalInfo", info, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating personal info:", err);
    throw err;
  }
};

// Update username and email separately
export const updateUserCredentials = async (credentials) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put("users/update-credentials", credentials, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating credentials:", err);
    throw err;
  }
};

// Update password (old and new)
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put("users/change-password", passwordData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error changing password:", err);
    throw err;
  }
};
