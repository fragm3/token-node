var express = require('express');
var token = require('../controllers/TokenCtrl.js');
var router = express.Router();

router.post('/deployToken', token.deployToken);
module.exports = router;