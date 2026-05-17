import api from "../api";

export const getShoppingCart = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await api.get("cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addToShoppingCart = async (cartItem) => {
  try {
    const token = localStorage.getItem("token");
    console.log("###" + token);
    const response = await api.post("cart/add-item", cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMultipleToShoppingCart = async (cartItems) => {
  try {
    const token = localStorage.getItem("token");
    console.log("****" + token);

    const response = await api.post("cart/add-items", cartItems, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateQuantity = async (cartItemId, quantity) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.patch(
      `cart-items/${cartItemId}?quantity=${quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating quantity:", err);
    throw err;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(
      `cart-items/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting item from cart:", err);
    throw err;
  }
};

