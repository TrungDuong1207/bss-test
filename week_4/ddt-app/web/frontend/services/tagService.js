import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getTags = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/tags',
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTags = async (tag) => {
  
  try {
    const response = await axios({
      method: 'post',
      url: '/tags',
      data: {tag: tag}
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
