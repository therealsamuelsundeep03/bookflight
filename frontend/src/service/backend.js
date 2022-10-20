import axios from "axios";

const baseURL = "https://flighhighback.herokuapp.com";

export default axios.create({baseURL});