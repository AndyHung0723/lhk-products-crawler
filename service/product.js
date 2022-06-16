const config = require("../config");
const $fetch = require("./fetch");
let { $ } = require("./share");

module.exports = {
  async $getProductList(params) {
    $ = await $fetch(config.PRODUCT_URL, params);
    return $(".product .m-list > li");
  },

  async getAllProducts() {
    for (let i = 0; i < config.PRODUCT_LIST.length; i++) {
      let titles = [];

      // 主頁
      titles = titles.concat(
        await this.getAllProductsByCategory(config.PRODUCT_LIST[i].root)
      );

      // 分類
      for (let j = 0; j < config.PRODUCT_LIST[i].kind.length; j++) {
        titles = titles.concat(
          await this.getAllProductsByCategory(
            config.PRODUCT_LIST[i].root,
            config.PRODUCT_LIST[i].kind[j]
          )
        );
      }

      titles = titles.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      console.log(titles.length);
    }
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
      let $list = await this.$getProductList(params);
      result = result.concat(this.getProductInfoInList($list));
    } while (!this.isLastPage(page));

    return result;
  },

  getProductInfoInList($list) {
    let titles = [];
    $list.find("h4.b-text-major b").each((idx, el) => {
      titles.push($(el).text());
    });

    return titles;
  },

  isLastPage(pageNum) {
    return (
      $(".product > .m-button-group")
        .find("li em")
        .toArray()
        .map((i) => Number($(i).text()))
        .filter(Boolean)
        .slice(-1)[0] === pageNum
    );
  },
};
