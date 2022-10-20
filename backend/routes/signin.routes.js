const express  = require('express');

const router = express.Router();

const service = require('../service/signin.service');

router.post("/",service.adduser);
router.get("/confirmation/:id",service.siginlink);

module.exports = router;
