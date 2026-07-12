import axios from "axios";

const API = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export const getProducts = (offset = 0, limit = 20) => {
  return API.get(`/products?offset=${offset}&limit=${limit}`);
};

export const getProductById = (id) => {
  return API.get(`/products/${id}`);
};

export const getCategories = () => {
  return API.get("/categories");
};

export const createProduct = (productData) => {
  return API.post("/products", productData);
};

export const updateProduct = (id, updatedData) => {
  return API.put(`/products/${id}`, updatedData);
};

export const deleteProduct = (id) => {
  return API.delete(`/products/${id}`);
};