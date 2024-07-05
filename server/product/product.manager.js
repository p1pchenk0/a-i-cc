const dbManager = require("../db/db.manager");

const productManager = {
  getAllProducts() {
    return dbManager.getAllProducts();
  },
};

module.exports = productManager;
