const express = require('express')
const router = express.Router();

const pdfController = require('../controller/pdf')

router.get('/', pdfController.pdf)

module.exports = router