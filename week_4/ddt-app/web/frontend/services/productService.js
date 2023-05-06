import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getProducts = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/products',
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsCollection = async (handles) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/products/product-collection',
      params: {
        handles
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsTag = async (tags) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/products/product-tag',
      params: {
        tags
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};