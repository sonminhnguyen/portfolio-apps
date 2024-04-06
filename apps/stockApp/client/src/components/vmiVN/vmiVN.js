import React, { useEffect, useState, Suspense } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vmiContext from "../../context/vmi-context";
import Error from "../vmiUS/error";
import SearchBar from "./searchBarVN";
import BasicInfoVN from "./basicInfoVN";
import TrendChartVN from "./trendChartVN";
import StockValuationVN from "./stockValuationVN";
import {
  getIncomeStatementVN,
  getRatioVN,
  getRatioCafeF,
  getBalanceSheetVN,
  getCashFLowVN,
  getCompanyProfileVN,
  getPriceVN,
} from "./utils/api";
import { calculateDiscountRate } from "../vmiUS/function";
import { growthRate5Y, growthRate10Y, average5Y } from "./utils/functionVN";

require("dotenv").config();

const VmiVN = () => {
  const [symbol, setSymbol] = useState([]);
  const [incomeStatement, setIncomeStatement] = useState({});
  const [balanceSheet, setBalanceSheet] = useState({});
  const [cashFlow, setCashFlow] = useState({});
  const [ratio, setRatio] = useState([]);
  const [ratioCafeF, setRatioCafeF] = useState([]);
  const [profile, setProfile] = useState({});
  const [priceVN, setPriceVN] = useState({});
  const [error, setError] = useState(false);
  const [dataBasicInfo, setDataBasicInfo] = useState({});
  const [dataStockV, setDataStockV] = useState({});
  const [dataTrendChart, setDataTrendChart] = useState({});

  useEffect(() => {
    try {
      if (symbol.length !== 0) {
        getCompanyProfileVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(
          (data) => setProfile(data)
        );
        getIncomeStatementVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(
          (data) => setIncomeStatement(data)
        );
        getBalanceSheetVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(
          (data) => setBalanceSheet(data)
        );
        getCashFLowVN(symbol, process.env.REACT_APP_FIREANT_KEY).then((data) =>
          setCashFlow(data)
        );
        getRatioVN(symbol, process.env.REACT_APP_FIREANT_KEY).then((data) =>
          setRatio(data)
        );
        getPriceVN(symbol, process.env.REACT_APP_FIREANT_KEY).then((data) =>
          setPriceVN(data)
        );
        getRatioCafeF(symbol).then((data) => setRatioCafeF(data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [symbol]);
  useEffect(() => {
    try {
      if (
        Object.keys(incomeStatement).length !== 0 &&
        Object.keys(balanceSheet).length !== 0 &&
        Object.keys(cashFlow).length !== 0 &&
        Object.keys(ratio).length !== 0 &&
        Object.keys(ratioCafeF).length !== 0
      ) {
        // console.log(incomeStatement);
        const epsGrowth5Y = growthRate5Y(ratioCafeF.EPS);
        const epsGrowth10Y = growthRate10Y(ratioCafeF.EPS);
        const roae5Y = average5Y(ratioCafeF.ROE); //This is ROE

        //id phia truoc cho cac aco phieu chung khoan va ngan hang, ex VND, VDS, TPB, MBB
        const revenue = incomeStatement.find((element) => element.id === 1)
          ?.values.value;
        const revenueGrowth5Y = growthRate5Y(revenue.slice().reverse());
        const netIncome = incomeStatement.find((element) => element.id === 11)
          ?.values.value;
        const shortTermDebt = balanceSheet
          .find((element) => element.id === 30101 || element.id === 3010101)
          ?.values.value.slice(-1)[0]; //Vay và nợ thuê tài sản tài chính ngắn hạn
        const longTermDebt = balanceSheet
          .find((element) => element.id === 30201 || element.id === 3010206)
          ?.values.value.slice(-1)[0]; // Vay và nợ thuê tài sản tài chính dài hạn
        const operatingCashflow = cashFlow.find(
          (element) => element.id === 107 || element.id === 104
        )?.values.value; // id 107 for VND, VDS,... Lưu chuyển tiền thuần từ hoạt động kinh doanh
        const capitalExpenditure = cashFlow.find(
          (element) => element.id === 201
        )?.values.value;
        const cashAndShortTermInvestments =
          balanceSheet
            .find(
              (element) =>
                element.id === 1010101 ||
                element.id === 10101 ||
                element.id === 101
            )
            ?.values.value.slice(-1)[0] +
          balanceSheet
            .find((element) => element.id === 1010103 || element.id === 10102)
            ?.values.value.slice(-1)[0]; //vnd: Các  khoản đầu tư  giữ đến ngày đáo hạn (HTM)

        const peg =
          ratio.find((element) => element.symbol === "P/E")?.value /
          epsGrowth5Y;
        const psg =
          ratio.find((element) => element.symbol === "P/S")?.value /
          revenueGrowth5Y;
        const epsNormalizedAnnual = ratio.find(
          (element) => element.symbol === "EPS"
        )?.value;
        const epsIndustry = ratio.find(
          (element) => element.symbol === "EPS"
        )?.industryValue;
        const pbAnnual = ratio.find(
          (element) => element.symbol === "P/B"
        )?.value;
        const pbIndustry = ratio.find(
          (element) => element.symbol === "P/B"
        )?.industryValue;
        const peNormalizedAnnual = ratio.find(
          (element) => element.symbol === "P/E"
        )?.value;
        const peIndustry = ratio.find(
          (element) => element.symbol === "P/E"
        )?.industryValue;
        const psAnnual = ratio.find(
          (element) => element.symbol === "P/S"
        )?.value;
        const psIndustry = ratio.find(
          (element) => element.symbol === "P/S"
        )?.industryValue;
        const roeIndustry = ratio.find(
          (element) => element.symbol === "ROE"
        )?.industryValue;
        const currentRatioAnnual = ratio.find(
          (element) => element.symbol === "TT Hiện hành"
        )?.value;
        const currentRatioAnnualIndustry = ratio.find(
          (element) => element.symbol === "TT Hiện hành"
        )?.industryValue;
        const netIncome_TTM = profile?.netProfit_TTM;

        const amortization = cashFlow
          .find((element) => element.id === 10201)
          ?.values.value.slice(-1)[0]; // Khấu hao TSCĐ
        const interestOnDeposits = cashFlow
          .find((element) => element.if === 302 || element.id === 10208)
          ?.values.value.slice(-1)[0];
        const interestIncome = cashFlow
          .find((element) => element.id === 205 || element.id === 10209)
          ?.values.value.slice(-1)[0]; //VND: Tiền thu về cổ tức và lợi nhuận được chia
        const interestExpense = cashFlow
          .find((element) => element.id === 10210)
          ?.values.value.slice(-1)[0]; //VnD: ko co
        const sharesOutstanding = profile?.sharesOutstanding;
        const price = priceVN?.priceClose;
        const dividend = profile?.dividend;
        const dividendYield = profile?.dividendYield * 100;

        const totalDebt = shortTermDebt + longTermDebt;
        const ebitda = netIncome.slice(-1)[0] + amortization + interestExpense;
        const netInterestIncome =
          interestOnDeposits + interestIncome - interestExpense;
        const debtEbitda = totalDebt / ebitda;
        const debtServicingRatio =
          netInterestIncome > 0
            ? 0
            : Math.abs(
                (netInterestIncome / operatingCashflow.slice(-1)[0]) * 100
              );
        const freeCashflow_TTM =
          operatingCashflow.slice(-1)[0] + capitalExpenditure.slice(-1)[0];
        const discountRate = calculateDiscountRate(profile.beta);

        let freeCashFlow = [];
        for (let i = 0; i < 6; i++) {
          freeCashFlow.push(operatingCashflow[i] + capitalExpenditure[i]);
        }
        //get Years of Data [2020, 2021, 2022,...]
        const period = incomeStatement.find((element) => element.id === 1)
          ?.values.period;

        setDataBasicInfo({
          epsNormalizedAnnual,
          epsIndustry,
          pbAnnual,
          pbIndustry,
          peNormalizedAnnual,
          peIndustry,
          psAnnual,
          psIndustry,
          epsGrowth5Y,
          peg,
          psg,
          epsGrowth10Y,
          roae5Y,
          roeIndustry,
          currentRatioAnnual,
          currentRatioAnnualIndustry,
          totalDebt,
          ebitda,
          debtEbitda,
          netInterestIncome,
          operatingCashflow: operatingCashflow.slice(-1)[0],
          debtServicingRatio,
          netIncome,
          dividend,
          dividendYield,
        });
        setDataStockV({
          netIncome: netIncome_TTM / 1000000,
          operatingCashflow,
          freeCashflow: freeCashflow_TTM,
          totalDebt,
          cashAndShortTermInvestments,
          epsGrowth5Y,
          epsGrowth10Y,
          gdpGrowthRate: 4.18,
          discountRate,
          sharesOutstanding,
          price,
        });
        setDataTrendChart({
          revenue,
          netIncome,
          operatingCashflow,
          freeCashFlow,
          period,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [incomeStatement, balanceSheet, cashFlow, ratio, ratioCafeF, priceVN, profile]);
  //   console.log(incomeStatement);
  //   console.log(balanceSheet);
  //   console.log(cashFlow);
  //   console.log(ratio);
  //   console.log(profile);

  return (
    <>
      <Suspense fallback={<h1>Still Loading…</h1>}>
        <vmiContext.Provider
          value={{
            profile,
            incomeStatement,
            balanceSheet,
            cashFlow,
            ratio,
            ratioCafeF,
            dataBasicInfo,
            dataStockV,
            dataTrendChart,
          }}
        >
          <Error error={error} setError={setError} />
          <Container fluid className="mt-3">
            <Row>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <div>Symbol</div>
              </Col>
              <Col xs={2} md={4}>
                <SearchBar setSymbol={setSymbol} />
              </Col>
              <div className="text-muted">All number is in millions</div>
            </Row>
            <Row>
              <Col xs lg="5">
                <h1 className="border-top mt-2">Basic Info</h1>
                <BasicInfoVN />
              </Col>
              <Col>
                <TrendChartVN />
              </Col>
            </Row>
            <Row>
              <Col xs>
                <StockValuationVN />
              </Col>
            </Row>
          </Container>
        </vmiContext.Provider>
      </Suspense>
    </>
  );
};

export default VmiVN;
