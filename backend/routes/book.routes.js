const express = require("express");
const routes = express.Router();

const service = require("../service/book.service");


routes.post("/",service.buyTicket);

module.exports = routes;