const express = require('express');
const packageInfo = require('../../../package.json');

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({
    version: packageInfo.version,
    name: packageInfo.name,
  });
});

module.exports = router;
