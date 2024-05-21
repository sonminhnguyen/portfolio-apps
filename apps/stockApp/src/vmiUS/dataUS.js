const fetch = require("node-fetch");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default

const getSymbolList = async (symbol) => {
  try {
    const symbolList = [];
    const reports = await yahooFinance.search(symbol);
    reports.quotes.forEach((report) => {
      if (report.typeDisp === "Equity") {
        symbolList.push(report);
      }
    });
    return symbolList;
  } catch (err) {
    console.log(err);
    return new Error({ err });
  }
};
// getSymbolList("AAPL");
const getIncomeStatement = async (symbol) => {
  const incomeStatement = {
    maxAge: [],
    endDate: [],
    totalRevenue: [],
    costOfRevenue: [],
    grossProfit: [],
    researchDevelopment: [],
    sellingGeneralAdministrative: [],
    nonRecurring: [],
    otherOperatingExpenses: [],
    totalOperatingExpenses: [],
    operatingIncome: [],
    totalOtherIncomeExpenseNet: [],
    ebit: [],
    interestExpense: [],
    incomeBeforeTax: [],
    incomeTaxExpense: [],
    minorityInterest: [],
    netIncomeFromContinuingOps: [],
    discontinuedOperations: [],
    extraordinaryItems: [],
    effectOfAccountingCharges: [],
    otherItems: [],
    netIncome: [],
    netIncomeApplicableToCommonShares: [],
  };

  try {
    const results = await yahooFinance.quoteSummary(symbol, { modules: ["incomeStatementHistory"] });
    const reports = results.incomeStatementHistory.incomeStatementHistory;
    reports.forEach((report) => {
      Object.entries(report).forEach((element) => {
        if (element[0] === "endDate") {
          incomeStatement[element[0]].push(element[1].toLocaleDateString());
        } else {
          incomeStatement[element[0]].push(element[1] / 1000000);
        }
      });
    });
    return incomeStatement;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// getIncomeStatement("AAPL").then(data => console.log(data));

const getBalanceSheet = async (symbol) => {
  const balanceSheet = {
    maxAge: [],
    endDate: [],
    cash: [],
    shortTermInvestments: [],
    netReceivables: [],
    inventory: [],
    otherCurrentAssets: [],
    totalCurrentAssets: [],
    longTermInvestments: [],
    propertyPlantEquipment: [],
    goodWill: [],
    intangibleAssets: [],
    otherAssets: [],
    deferredLongTermAssetCharges: [],
    totalAssets: [],
    accountsPayable: [],
    shortLongTermDebt: [],
    otherCurrentLiab: [],
    longTermDebt: [],
    otherLiab: [],
    minorityInterest: [],
    totalCurrentLiabilities: [],
    totalLiab: [],
    commonStock: [],
    retainedEarnings: [],
    treasuryStock: [],
    capitalSurplus: [],
    otherStockholderEquity: [],
    totalStockholderEquity: [],
    netTangibleAssets: [],
  };
  try {
    const results = await yahooFinance.quoteSummary(symbol, {
      modules: ["balanceSheetHistoryQuarterly"],
    });
    const reports = results.balanceSheetHistoryQuarterly.balanceSheetStatements;
    reports.forEach((report) => {
      Object.entries(report).forEach((element) => {
        if (element[0] === "endDate") {
          balanceSheet[element[0]].push(element[1].toLocaleDateString());
        } else {
          balanceSheet[element[0]].push(element[1] / 1000000);
        }
      });
    });
    return balanceSheet;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// getBalanceSheet()

const getCashFlow = async (symbol) => {
  const cashFlow = {
    maxAge: [],
    endDate: [],
    netIncome: [],
    depreciation: [],
    changeToNetincome: [],
    changeToAccountReceivables: [],
    changeToLiabilities: [],
    changeToInventory: [],
    changeToOperatingActivities: [],
    totalCashFromOperatingActivities: [],
    capitalExpenditures: [],
    investments: [],
    otherCashflowsFromInvestingActivities: [],
    totalCashflowsFromInvestingActivities: [],
    dividendsPaid: [],
    netBorrowings: [],
    otherCashflowsFromFinancingActivities: [],
    totalCashFromFinancingActivities: [],
    effectOfExchangeRate: [],
    changeInCash: [],
    repurchaseOfStock: [],
    issuanceOfStock: [],
  };
  try {
    const results = await yahooFinance.quoteSummary(symbol, {
      modules: ["cashflowStatementHistory"],
    });
    const reports = results.cashflowStatementHistory.cashflowStatements;
    // console.log(reports[0])
    reports.forEach((report) => {
      Object.entries(report).forEach((element) => {
        if (element[0] === "endDate") {
          cashFlow[element[0]].push(element[1].toLocaleDateString());
        } else {
          cashFlow[element[0]].push(element[1] / 1000000);
        }
      });
    });
    return cashFlow;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// getCashFlow()

const getRatio = async (symbol, key) => {
  try {
    const quotes = await yahooFinance.quote(symbol);
    const { defaultKeyStatistics } = await yahooFinance.quoteSummary(symbol, {
      modules: ["defaultKeyStatistics"],
    });
    const { financialData } = await yahooFinance.quoteSummary(symbol, {
      modules: ["financialData"],
    });
    const { summaryDetail } = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryDetail"],
    });
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${key}`
    );
    const finnhub = await res.json();
    // console.log(finnhub);
    const ratio = {
      quotes,
      defaultKeyStatistics,
      financialData,
      summaryDetail,
      finnhub,
    };
    return ratio;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// getRatio()

module.exports = {
  getSymbolList,
  getIncomeStatement,
  getBalanceSheet,
  getCashFlow,
  getRatio,
};
