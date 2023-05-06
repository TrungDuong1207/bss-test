import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getLogs = async (token, params) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/logs',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};