const express = require("express");
const routes = express.Router();

const service = require("../service/login.service");

routes.post('/',service.findUser);
routes.get('/getemail/:id',service.findmail);

module.exports = routes