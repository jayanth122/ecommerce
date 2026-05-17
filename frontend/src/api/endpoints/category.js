import api from "../api";

// Function to get all subcategories for a given category ID
export const getAllSubCategories = async (categoryId) => {
  try {
    const response = await api.get(
      `public/categories/subcategories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
