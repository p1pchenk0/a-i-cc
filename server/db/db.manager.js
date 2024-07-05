const { FSDB } = require("file-system-db");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "./db.json");
const dbDefaultPath = path.join(__dirname, "./db.default.json");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, fs.readFileSync(dbDefaultPath, "utf8"));
}

const db = new FSDB(dbPath);

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
