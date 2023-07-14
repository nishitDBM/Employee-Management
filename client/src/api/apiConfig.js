const axios = require("axios");

const instance = axios.create({
  baseUrl: "http://localhost:9000",
});

export default instance;
