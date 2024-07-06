const utils = require("../utils");
const dbManager = require("../db/db.manager");
const { TAX_RATE } = require("../constants");

const reportManager = {
  getCustomReport(income) {
    return {
      ordersMade: 0,
      printsDone: 0,
      printsWon: 0,
      totalIncome: income,
      totalGifted: 0,
      taxesToPay: income * TAX_RATE,
    };
  },
  getMonthlyReport(month, year) {
    const { from, to } = utils.getMonthDateRange(month, year);

    const ordersWithinMonth = dbManager.getOrdersInDateRange(from, to);

    const { totalIncome, printsWon, printsDone, totalGifted } =
      ordersWithinMonth.reduce(
        (acc, curr) => {
          const freePrints = curr.ordered.filter((el) => el.free);

          acc.printsDone += curr.ordered.length;
          acc.printsWon += freePrints.length;
          acc.totalIncome += curr.ordered.find((el) => el.price).price || 0;
          acc.totalGifted += freePrints.reduce(
            (total, print) => total + print.price,
            0,
          );

          return acc;
        },
        { totalIncome: 0, printsWon: 0, printsDone: 0, totalGifted: 0 },
      );

    return {
      ordersMade: ordersWithinMonth.length,
      printsDone,
      printsWon,
      totalIncome,
      totalGifted,
      taxesToPay: totalIncome * TAX_RATE,
    };
  },
};

module.exports = reportManager;
