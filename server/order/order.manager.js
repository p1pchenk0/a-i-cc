const dbManager = require("../db/db.manager");

const orderManager = {
  createOrder(orderData) {
    dbManager.saveOrder({ ordered: orderData, timestamp: Date.now() });
  },
};

module.exports = orderManager;
