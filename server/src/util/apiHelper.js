const axios = require('axios');

const fetchFromApi = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

module.exports = {
  fetchFromApi
};