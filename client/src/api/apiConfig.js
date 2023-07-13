const axios = require("axios");

const instance = axios.create({
  baseUrl: "localhost:3001",
});

export default instance;
