const { FSDB } = require("file-system-db");

const path = require("path");

const db = new FSDB("./db/db.json");

const dbManager = {
  saveOrder(order) {
    db.push("orders", order);
  },
  getAllProducts() {
    return db.get("products");
  },
  getAllOrders() {
    return db.get("orders");
  },
  getOrdersInDateRange(from, to) {
    const allOrders = dbManager.getAllOrders();

    return allOrders.filter(
      (order) => order.timestamp < to && order.timestamp >= from,
    );
  },
};

module.exports = dbManager;
