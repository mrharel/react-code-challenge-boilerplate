const express = require('express');
const packageInfo = require('../../../package.json');

const router = express.Router();

// we might take the profile id from a session or parameter
router.get('/version', (req, res) => {
  res.json({
    version: packageInfo.version,
    name: packageInfo.name,
  });
});

module.exports = router;
