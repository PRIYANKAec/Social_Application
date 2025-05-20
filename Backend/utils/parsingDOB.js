function parsingDOB(date) {
  const [day, month, year] = date.split('-').map(Number);

  if (!day || !month || !year || date.split('-').length !== 3) {
    throw new Error('Invalid date format. Use DD-MM-YYYY.');
  }

  // Fix month (0-based), and avoid timezone offset by using UTC
  return new Date(Date.UTC(year, month - 1, day));
}

module.exports = { parsingDOB };
