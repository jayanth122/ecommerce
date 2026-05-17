import api from "../../../api/api";

const baseUrl = '/public/products/search';


const getAll = async () => {
  const response = await api.get(`/public/products/all`).then((res) => res.data);
  return response;
}

const getProduct = async (id) => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

const getProductsByCategory = async (page, size, keyword) => {
  const response = await api.get(`${baseUrl}/category`, { params: { page: page, size: size, keyword: keyword } });
  return response.data;

};

const getProductsBySearch = async (page, size, keyword) => {
  const response = await api.get(`${baseUrl}`, { params: { page: page, size: size, keyword: keyword } });
  return response.data;

};


export default {
  getAll,
  getProduct,
  getProductsByCategory,
  getProductsBySearch
}
