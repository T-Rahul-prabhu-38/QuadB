const express = require('express');
const router = express.Router();
const cryptoService = require('../services/cryptoservice');

router.get('/crypto', async (req, res) => {
  try {
    const cryptoData = await cryptoService.getTopCryptos();
    res.json(cryptoData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching crypto data' });
  }
});

module.exports = router;