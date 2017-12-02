const express = require('express');
const packageInfo = require('../../../package.json');
const ads = require('./ads.json');

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({
    version: packageInfo.version,
    name: packageInfo.name,
  });
});

router.get('/ads', (req, res) => {
  res.json(ads);
});

module.exports = router;
