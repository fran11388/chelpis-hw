const express = require('express')
const router = express.Router();
const path = require('path');

router.use('/users', require('./users'));
router.use('/api-docs', express.static(path.join(__dirname,'../../swagger/dist')));

module.exports = router