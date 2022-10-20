const express = require("express");
const routes = express.Router();

const service = require("../service/flights.service");


routes.get("/",service.getFlights);
routes.get("/:from/:to",service.getFlight);

module.exports = routes;