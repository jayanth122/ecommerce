import api from "../api";

export const getProduct = async (id) => {
    try {
        const response = await api.get(`public/products/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getProductsByIds = async (ids) => {
    try {
        const response = await api.get(`public/products`, {
            params: { ids: ids.join(",") },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

