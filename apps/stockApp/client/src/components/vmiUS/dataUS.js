const fetch = require('node-fetch')
require('dotenv').config()

//use for US stock
const getSymbolList = async (symbol) => {
    try {
        const res = await fetch(`api/vmiUS/getSymbolList/${symbol}`)
        const reports = await res.json();
        const SYMBOL_LIST = reports.map(report => ({
            symbol: report.symbol,
            name: report.shortname,
            exchangeShortName: report.exchDisp
        }))

        return SYMBOL_LIST;
    } catch (error) {
        console.log(error);
        return new Error({ error });
    }
}

const getIncomeStatement = async (symbol) => {
    try {
        const res = await fetch(`api/vmiUS/getIncomeStatement/${symbol}`)
        const json = await res.json();
        return json;
    } catch (error) {
        return new Error({ error });
    }
}

const getBalanceSheet = async (symbol) => {
    try {
        const res = await fetch(`api/vmiUS/getBalanceSheet/${symbol}`)
        const json = await res.json();
        return json;
    } catch (error) {
        return new Error({ error });
    }
}

const getCashFlow = async (symbol) => {
    try {
        const res = await fetch(`api/vmiUS/getCashFlow/${symbol}`)
        const json = await res.json();
        return json;
    } catch (error) {
        return new Error({ error });
    }
}

const getRatio = async (symbol, key) => {
    try {
        const res = await fetch(`api/vmiUS/getRatio/${symbol}/${key}`)
        const json = await res.json();
        return json;
    } catch (error) {
        return new Error({ error });
    }
}

export {
    getSymbolList,
    getIncomeStatement,
    getBalanceSheet,
    getCashFlow,
    getRatio
}

// const getSymbolList = async (symbol, key) => {
//     try {
//         const res = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${symbol}&limit=10&apikey=${key}`)
//         const reports = await res.json();
//         const SYMBOL_LIST = reports.map(report => ({
//             symbol: report.symbol,
//             name: report.name,
//             exchangeShortName: report.exchangeShortName
//         }))
//         return SYMBOL_LIST;
//     } catch (error) {
//         console.log(error);
//         return new Error({ error });
//     }
// }

// const getCompanyQuote = async (symbol, key) => {
//     try {
//         const res = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${key}`)
//         const reports = await res.json();
//         const COMPANY_QUOTE = reports[0]
//         Object.entries(COMPANY_QUOTE).forEach(value => {
//             if (isNaN(value[1])) {
//                 COMPANY_QUOTE[value[0]] = 0
//             } else {
//                 COMPANY_QUOTE[value[0]] = parseFloat(value[1])
//             }
//         })
//         return COMPANY_QUOTE;
//     } catch (error) {
//         return new Error({ error });
//     }
// }

// const getIncomeStatement = async (symbol, key) => {
//     try {
//         const INCOME_STATEMENT = {
//             fiscalDateEnding: [],
//             reportedCurrency: [],
//             grossProfit: [],
//             totalRevenue: [],
//             costOfRevenue: [],
//             costofGoodsAndServicesSold: [],
//             operatingIncome: [],
//             sellingGeneralAndAdministrative: [],
//             researchAndDevelopment: [],
//             operatingExpenses: [],
//             investmentIncomeNet: [],
//             netInterestIncome: [],
//             interestIncome: [],
//             interestExpense: [],
//             nonInterestIncome: [],
//             otherNonOperatingIncome: [],
//             depreciation: [],
//             depreciationAndAmortization: [],
//             incomeBeforeTax: [],
//             incomeTaxExpense: [],
//             interestAndDebtExpense: [],
//             netIncomeFromContinuingOperations: [],
//             comprehensiveIncomeNetOfTax: [],
//             ebit: [],
//             ebitda: [],
//             netIncome: []
//         }
//         const res = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${key}`)
//         const data = await res.json();

//         //GET ANNUAL REPORT
//         const reports = data.annualReports
//         reports.forEach(report =>
//             Object.entries(report).forEach(value => {
//                 if (value[0] === "fiscalDateEnding" || value[0] === "reportedCurrency") {
//                     INCOME_STATEMENT[value[0]].push(value[1])
//                 } else {
//                     if (isNaN(value[1])) {
//                         INCOME_STATEMENT[value[0]].push(0)
//                     } else {
//                         //convert to millions with fixed 2 decimal
//                         const num = parseFloat(value[1]) / 1000000
//                         INCOME_STATEMENT[value[0]].push(num)
//                     }
//                 }
//             })
//         )
//         return INCOME_STATEMENT;
//     } catch (error) {
//         return new Error({ error });
//     }
// }

// const getBalanceSheet = async (symbol, key) => {
//     try {
//         const res = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${key}`)
//         const data = await res.json();

//         //GET ONLY THE LATEST QUARTER
//         const BALANCE_SHEET = data.quarterlyReports[0]
//         Object.entries(BALANCE_SHEET).forEach(value => {
//             // convert to millions if not 2 cases
//             if (value[0] !== "fiscalDateEnding" && value[0] !== "reportedCurrency") {
//                 if (isNaN(value[1])) {
//                     BALANCE_SHEET[value[0]] = 0
//                 } else {
//                     BALANCE_SHEET[value[0]] = parseFloat(value[1]) / 1000000
//                 }
//             }
//         })
//         return BALANCE_SHEET
//     } catch (error) {
//         return new Error({ error });
//     }
// }

// const getCashFlow = async (symbol, key) => {
//     try {
//         const CASH_FLOW = {
//             fiscalDateEnding: [],
//             reportedCurrency: [],
//             operatingCashflow: [],
//             paymentsForOperatingActivities: [],
//             proceedsFromOperatingActivities: [],
//             changeInOperatingLiabilities: [],
//             changeInOperatingAssets: [],
//             depreciationDepletionAndAmortization: [],
//             capitalExpenditures: [],
//             changeInReceivables: [],
//             changeInInventory: [],
//             profitLoss: [],
//             cashflowFromInvestment: [],
//             cashflowFromFinancing: [],
//             proceedsFromRepaymentsOfShortTermDebt: [],
//             paymentsForRepurchaseOfCommonStock: [],
//             paymentsForRepurchaseOfEquity: [],
//             paymentsForRepurchaseOfPreferredStock: [],
//             dividendPayout: [],
//             dividendPayoutCommonStock: [],
//             dividendPayoutPreferredStock: [],
//             proceedsFromIssuanceOfCommonStock: [],
//             proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: [],
//             proceedsFromIssuanceOfPreferredStock: [],
//             proceedsFromRepurchaseOfEquity: [],
//             proceedsFromSaleOfTreasuryStock: [],
//             changeInCashAndCashEquivalents: [],
//             changeInExchangeRate: [],
//             netIncome: []
//         }
//         const res = await fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${key}`)
//         const data = await res.json();

//         //GET ANNUAL REPORT
//         const reports = data.annualReports
//         reports.forEach(report =>
//             Object.entries(report).forEach(value => {
//                 //push string with 2 cases
//                 if (value[0] === "fiscalDateEnding" || value[0] === "reportedCurrency") {
//                     CASH_FLOW[value[0]].push(value[1])
//                 } else {
//                     if (isNaN(value[1])) {
//                         CASH_FLOW[value[0]].push(0)
//                     } else {
//                         //convert to millions with fixed 2 decimal
//                         const num = parseFloat(value[1]) / 1000000
//                         CASH_FLOW[value[0]].push(num)
//                     }
//                 }
//             })
//         )
//         return CASH_FLOW;
//     } catch (error) {
//         return new Error({ error });
//     }
// }

// const getRatio = async (symbol, key) => {
//     try {
//         const res = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${key}`)
//         const data = await res.json();
//         const RATIO = data.metric;
//         return RATIO;
//     } catch (error) {
//         return new Error({ error });
//     }
// }

// export {
//     getSymbolList,
//     getCompanyQuote,
//     getIncomeStatement,
//     getBalanceSheet,
//     getCashFlow,
//     getRatio
// }