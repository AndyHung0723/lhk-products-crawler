const config = require('../config');
const $fetch = require('./fetch');
let $;

module.exports = {
  async getAllProductDetail(info) {
    let result = [];
    for (let i = 0; i < info.length; i++) {
      await getProductDetail(info[0].link);
    }
  },

  async getProductDetail(path) {
    $ = await $fetch(`${config.PRODUCT_URL}/${path}`);
  },
};
