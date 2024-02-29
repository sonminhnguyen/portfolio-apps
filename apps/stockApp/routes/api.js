var express = require('express');
var router = express.Router();
const { all } = require('../models/SchwabPortfolio')
const { getPortfolio } = require('../models/id_portfolio')
const { getSymbolList, getIncomeStatement, getBalanceSheet, getCashFlow, getRatio } = require ('../src/vmiUS/dataUS.js')

router.get('/schwab/portfolio', async (req, res, next) => {
    const data = await all()
    res.send(data)
});

router.get('/idragon/portfolio', async (req, res, next) => {
    const data = await getPortfolio()
    res.send(data)
});

router.get('/vmiUS/getSymbolList/:symbol', async (req, res, next) => {
    console.log("here")
    const data = await getSymbolList(req.params.symbol)
    res.send(data)
});
router.get('/vmiUS/getIncomeStatement/:symbol', async (req, res, next) => {
    const data = await getIncomeStatement(req.params.symbol)
    res.send(data)
});

router.get('/vmiUS/getBalanceSheet/:symbol', async (req, res, next) => {
    const data = await getBalanceSheet(req.params.symbol)
    res.send(data)
});

router.get('/vmiUS/getCashFlow/:symbol', async (req, res, next) => {
    const data = await getCashFlow(req.params.symbol)
    res.send(data)
});

router.get('/vmiUS/getRatio/:symbol/:key', async (req, res, next) => {
    console.log(req.params.key);
    const data = await getRatio(req.params.symbol, req.params.key)
    res.send(data)
});

// await yahooFinance.quoteSummary('AMZN', { modules: [ "summaryDetail" ] });
module.exports = router;