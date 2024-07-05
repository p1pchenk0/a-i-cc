module.exports = {
  getMonthDateRange(startMonthIndex, startYearIndex) {
    const endMonthIndex = startMonthIndex + 1 > 11 ? 0 : startMonthIndex + 1;
    const endYear =
      endMonthIndex < startMonthIndex ? startYearIndex + 1 : startYearIndex;

    const from = new Date(startYearIndex, startMonthIndex, 1).getTime();
    const to = new Date(endYear, endMonthIndex, 1).getTime();

    return { from, to };
  },
};
