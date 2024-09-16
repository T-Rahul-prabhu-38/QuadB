const axios = require('axios');
const Crypto = require('../models/crypto');

const updateCryptoData = async () => {
  try {
    const response = await axios.get(process.env.API_URL);
    const tickers = Object.values(response.data).slice(0, 100);
    
    for (const ticker of tickers) {
      await Crypto.findOneAndUpdate(
        { name: ticker.name },
        {
          last: ticker.last,
          low: ticker.low,
          high: ticker.high,
          volume: ticker.volume,
          base_unit: ticker.base_unit
        },
        { upsert: true, new: true }
      );
    }
    console.log('Crypto data updated');
  } catch (error) {
    console.error('Error updating crypto data:', error);
  }
};

const getTopCryptos = async () => {
  return await Crypto.find().sort({ volume: -1 }).limit(100);
};

const startUpdateJob = () => {
  updateCryptoData(); // Initial update
  setInterval(updateCryptoData, 5 * 60 * 1000); // Update every 5 minutes
};

module.exports = {
  updateCryptoData,
  getTopCryptos,
  startUpdateJob
};
