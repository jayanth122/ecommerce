import api from "../api";

export const getPaymentCards = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await api.get(`cards/getCardsByUsername`, {
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
