import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getDevices = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/devices',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDevice = async (token, values) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/devices',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
