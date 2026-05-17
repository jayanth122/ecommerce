import api from "../api";

export const getReviews = async (id) => {
  try {
    const response = await api.get(`public/product/${id}/reviews`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
