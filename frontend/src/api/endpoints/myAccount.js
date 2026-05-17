import api from "../api";

export const getMyAccountUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`myAccount/getMyAccountUserInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching payment cards:", err);
    throw err;
  }
};
