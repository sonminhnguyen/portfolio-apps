const cron = require('node-cron');
const updateTransactions = require('./id_transaction')
const updatePortfolio = require('./id_portfolio')


const autoUpdateData = () => {
  cron.schedule('* * * * * *', function() {
    // updatePortfolio();
  });
  // cron.schedule('59 23 * * *', function() {
  //   updateTransactions();
  // })
}
// autoUpdateData();

module.exports = autoUpdateData