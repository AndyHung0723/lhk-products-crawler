const productList = require('./service/product-list');
const $fetch = require('./service/fetch');
const config = require('./config');

(async () => {
  let info = await productList.getAllProductsInfo();

  info.forEach((item) => console.log(item));

  await getAllProductDetail(info);

  // let $ = await $fetch(`${config.PRODUCT_URL}/${info[0].link}`);

  // console.log($(".prodcut-detail-price").html());
})();
