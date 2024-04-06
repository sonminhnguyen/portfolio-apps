const fetch = require("node-fetch");
require("dotenv").config();
const date = new Date()
const yesterday = new Date(Date.now() - 86400000).toISOString();
const today = new Date().toISOString();
const year = date.getFullYear();

//use for VN stock
const getSymbolListVN = async (symbol, key) => {

  try {
    const res = await fetch(
      `https://restv2.fireant.vn/search?keywords=${symbol}&type=symbol&offset=0&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Host: "restv2.fireant.vn",
        },
      }
    );
    const SYMBOL_LIST = await res.json();
    // console.log(SYMBOL_LIST)
    return SYMBOL_LIST;
  } catch (error) {
    return new Error({ error });
  }
};
//getSymbolListVN("C", key);

const getPriceVN = async (symbol, key) => {
  try {
    const res = await fetch(
      `https://api.fireant.vn/symbols/${symbol}/historical-quotes?startDate=${yesterday}&endDate=${today}`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Host: "restv2.fireant.vn",
        },
      }
    );
    const PRICE = await res.json();
    // console.log(PRICE);
    return PRICE[0];
  } catch (error) {
    return new Error({ error });
  }
};
// getPriceVN()

const getCompanyProfileVN = async (symbol, key) => {
  try {
    const res = await fetch(
      `https://restv2.fireant.vn/symbols/${symbol}/fundamental`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Host: "restv2.fireant.vn",
        },
      }
    );
    const COMPANY_PROFILE = await res.json();
    // console.log(COMPANY_PROFILE);
    return COMPANY_PROFILE;
  } catch (error) {
    return new Error({ error });
  }
};
// getCompanyProfile();

const getIncomeStatementVN = async (symbol, key) => {
  try {
    const res = await fetch(
      `https://restv2.fireant.vn/symbols/${symbol}/full-financial-reports?type=2&year=${year}&quarter=0&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Host: "restv2.fireant.vn",
        },
      }
    );

    const reports = await res.json();
    const INCOME_STATEMENT = [];

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const period = [];
      const value = [];
      report.values.forEach((element) => {
        period.push(element.period);
        value.push(element.value / 1000000);
      });
      const returnreport = {
        ...report,
        values: { period, value },
      };
      INCOME_STATEMENT.push(returnreport);
    }
    // console.log(INCOME_STATEMENT)
    return INCOME_STATEMENT;
  } catch (error) {
    return new Error({ error });
  }
};
// getIncomeStatementVN('VNM', "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9");

const getBalanceSheetVN = async (
  symbol,
  key = process.env.REACT_APP_FIREANT_KEY
) => {
  try {
    const res = await fetch(
      `https://restv2.fireant.vn/symbols/${symbol}/full-financial-reports?type=1&year=${year}&quarter=3&limit=6`,
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTU4OTA5NzA3LCJuYmYiOjE2NTg5MDk3MDcsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIyODVjNTdkMS1kMmRmLTRiYTUtOTE4Mi0yOTYyZDk1ZTM2ZDAiLCJhdXRoX3RpbWUiOjE2NTg5MDk3MDUsImlkcCI6Imlkc3J2IiwibmFtZSI6InNvbmJhdGdpb2kyQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiMzA0MjVhOTYtYzQyZS00ZmZjLWI0ZTgtMGU2ZDk4ZGQ0YzY3IiwianRpIjoiYmIxZmE4Njc4MzdiOThiOWNjMGI2NjNhYjhiZmM2MjQiLCJhbXIiOlsicGFzc3dvcmQiXX0.pZEgQ4RH7TOUSWo_eezAFumnxZzVMfzsM_nG1IKeFqs396uAeJuRpAgQl481S-MA-S2nqcq0yoUlUwaq4zBGs7qCFWuWMafuzRbyGt-IKHoY4QplILe1y7nODEgeOQXC8FY-qmtYK_Nbs5oEvYq_K-QUX3dqjlUwi_sPJwa4mPQd9Dow7-3IenniVAuqA9XW1XY2XEp6TkxcmZ-5cbnexTOECiIj_-XdYul0QVOFCZlEt2iEmFbRgdpPGP96e-YbmKgWswoCFXij81nsiHxDmm4Hu_AHi2-ZR9KM4XIe-eeKr2q-pMzkS2Ii9iVcEqHnvSq5eYb46W_qPB4ZmK-3pQ",
          Host: "restv2.fireant.vn",
        },
      }
    );
    const reports = await res.json();

    const BALANCE_SHEET = [];
    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const period = [];
      const value = [];
      report.values.forEach((element) => {
        period.push(element.period);
        value.push(element.value / 1000000);
      });
      const returnreport = {
        ...report,
        values: { period, value },
      };
      BALANCE_SHEET.push(returnreport);
    }
    // console.log(BALANCE_SHEET)
    return BALANCE_SHEET;
  } catch (error) {
    return new Error({ error });
  }
};

//getBalanceSheet();

const getCashFLowVN = async (
  symbol = "FPT",
  key = process.env.REACT_APP_FIREANT_KEY
) => {
  try {
    const res = await fetch(
      `https://restv2.fireant.vn/symbols/${symbol}/full-financial-reports?type=4&year=${year}&quarter=0&limit=6`,
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTU4OTA5NzA3LCJuYmYiOjE2NTg5MDk3MDcsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIyODVjNTdkMS1kMmRmLTRiYTUtOTE4Mi0yOTYyZDk1ZTM2ZDAiLCJhdXRoX3RpbWUiOjE2NTg5MDk3MDUsImlkcCI6Imlkc3J2IiwibmFtZSI6InNvbmJhdGdpb2kyQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiMzA0MjVhOTYtYzQyZS00ZmZjLWI0ZTgtMGU2ZDk4ZGQ0YzY3IiwianRpIjoiYmIxZmE4Njc4MzdiOThiOWNjMGI2NjNhYjhiZmM2MjQiLCJhbXIiOlsicGFzc3dvcmQiXX0.pZEgQ4RH7TOUSWo_eezAFumnxZzVMfzsM_nG1IKeFqs396uAeJuRpAgQl481S-MA-S2nqcq0yoUlUwaq4zBGs7qCFWuWMafuzRbyGt-IKHoY4QplILe1y7nODEgeOQXC8FY-qmtYK_Nbs5oEvYq_K-QUX3dqjlUwi_sPJwa4mPQd9Dow7-3IenniVAuqA9XW1XY2XEp6TkxcmZ-5cbnexTOECiIj_-XdYul0QVOFCZlEt2iEmFbRgdpPGP96e-YbmKgWswoCFXij81nsiHxDmm4Hu_AHi2-ZR9KM4XIe-eeKr2q-pMzkS2Ii9iVcEqHnvSq5eYb46W_qPB4ZmK-3pQ",
          Host: "restv2.fireant.vn",
        },
      }
    );
    const reports = await res.json();

    const CASH_FLOW = [];
    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const period = [];
      const value = [];
      report.values.forEach((element) => {
        period.push(element.period);
        value.push(element.value / 1000000);
      });
      const returnreport = {
        ...report,
        values: { period, value },
      };
      CASH_FLOW.push(returnreport);
    }
    // console.log(CASH_FLOW)
    return CASH_FLOW;
  } catch (error) {
    return new Error({ error });
  }
};

//getCashFLow();

const getRatioVN = async (symbol, key) => {
  try {
    const res = await fetch(
      `https://restv2.fireant.vn/symbols/${symbol}/financial-indicators`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Host: "restv2.fireant.vn",
        },
      }
    );
    const reports = await res.json();
    const RATIO = reports.map((report) => ({
      symbol: report.shortName,
      value: report.value,
      change: report.change,
      industryValue: report.industryValue,
    }));
    // console.log(RATIO)
    return RATIO;
  } catch (error) {
    return new Error({ error });
  }
};
// getRatioVN("FPT", key);

//This function is use for get EPS 5Y, 10Y to calculate EPSGrowthRate
const getRatioCafeF = async (symbol) => {
  try {
    const res = await fetch(`https://e.cafef.vn/fi.ashx?symbol=${symbol}`);
    const reports = await res.json();
    const Symbol = reports[0].Symbol;
    const Year = [],
      EPS = [],
      BV = [],
      PE = [],
      ROA = [],
      ROE = [],
      ROS = [],
      GOS = [],
      DAR = [];
    reports.forEach((report) => {
      Year.push(report.Year);
      EPS.push(report.EPS);
      BV.push(report.BV);
      PE.push(report.PE);
      ROA.push(report.ROA);
      ROE.push(report.ROE);
      ROS.push(report.ROS);
      GOS.push(report.GOS);
      DAR.push(report.DAR);
    });
    const RATIO = {
      Symbol,
      Year,
      EPS,
      BV,
      PE,
      ROA,
      ROE,
      ROS,
      GOS,
      DAR,
    };
    return RATIO;
  } catch (error) {
    return new Error({ error });
  }
};
// getRatioCafeF("BCG")

export {
  getSymbolListVN,
  getCompanyProfileVN,
  getIncomeStatementVN,
  getBalanceSheetVN,
  getCashFLowVN,
  getRatioVN,
  getRatioCafeF,
  getPriceVN
};
