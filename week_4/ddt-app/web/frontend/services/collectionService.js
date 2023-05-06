import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getCollections = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/collections',
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};