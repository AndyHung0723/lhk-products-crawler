const config = require('../config');
const $fetch = require('./fetch');
let $;

module.exports = {
  async getAllProductsInfo() {
    let result = [];

    for (let i = 0; i < config.PRODUCT_LIST.length; i++) {
      let list_all = [];
      let list_category = [];

      // 主頁
      list_all = list_all.concat(
        await this.getAllProductsByCategory(config.PRODUCT_LIST[i].root)
      );

      // 分類
      for (let j = 0; j < config.PRODUCT_LIST[i].kind.length; j++) {
        list_category = list_category.concat(
          await this.getAllProductsByCategory(
            config.PRODUCT_LIST[i].root,
            config.PRODUCT_LIST[i].kind[j]
          )
        );
      }

      //  get Info
      let info_all = [];
      let info_category = [];

      for (let i = 0; i < list_all.length; i++) {
        info_all.push(this.getProductInfo($(list_all[i])));
      }

      for (let i = 0; i < list_category.length; i++) {
        info_category.push(this.getProductInfo($(list_category[i])));
      }

      // unique
      info_all = info_all.filter((value, index, self) => {
        return !(info_category.map((v) => v.title).indexOf(value.title) !== -1);
      });

      result = result.concat(info_all);
      result = result.concat(info_category);
    }

    return result;
  },

  async getAllProductsByCategory(root, kind) {
    let result = [];
    let page = 0;

    do {
      let params = {
        root,
        kind,
        page: ++page,
      };

      let list = (await this.$getProductList(params)).toArray();
      result = result.concat(list);
    } while (!this.isLastPage(page));

    return result;
  },

  getProductInfo($product) {
    let title = $product.find('h4.b-text-major b').text();
    let link = $product.find('a').attr('href');
    let type = $('.jQ-menuButton.is-active em').text();

    return {
      type,
      title,
      link,
    };
  },

  async $getProductList(params) {
    $ = await $fetch(`${config.PRODUCT_URL}/list.php`, params);
    return $('.product .m-list > li');
  },

  isLastPage(pageNum) {
    return (
      $('.product > .m-button-group')
        .find('li em')
        .toArray()
        .map((i) => Number($(i).text()))
        .filter(Boolean)
        .slice(-1)[0] === pageNum
    );
  },
};
