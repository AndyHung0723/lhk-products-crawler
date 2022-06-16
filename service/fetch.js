const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function (url, params) {
  let res = await axios.get(url, { params });
  if (!res.data) {
    return;
  }

  return cheerio.load(res.data);
};
