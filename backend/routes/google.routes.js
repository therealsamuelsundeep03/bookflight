const express = require('express');
const router = express.Router();

const service = require("../service/google.service");

router.post("/",service.googleLogin);

module.exports = router;