import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import vmiContext from "../../context/vmi-context";
import {
  calculateInitialIV,
  toRender,
} from "../vmiUS/function";

const StockValuationVN = () => {
  const {
    dataStockV
  } = useContext(vmiContext);
  // const [validated, setValidated] = useState(false);
  const [initialState, setInitialState] = useState({});
  const [stockV, setStockV] = useState({});
  const [stockVCalculate, setStockVCalculate] = useState({});
  const [index, setIndex] = useState("netIncome");
  const [indexData, setIndexData] = useState("");
  const formRef = React.useRef(initialState);

  const handleChange = (event) => {
    setIndex(event.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setStockV(initialState);
    formRef.current.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formObj = {
      ...stockV,
      totalDebt: parseFloat(event.target.totalDebt.value),
      cashAndShortTermInvestments: parseFloat(
        event.target.cashAndShortTermInvestments.value
      ),
      epsGrowth5Y: parseFloat(event.target.epsGrowth5Y.value),
      epsGrowth10Y: parseFloat(event.target.epsGrowth10Y.value),
      gdpGrowthRate: parseFloat(event.target.gdpGrowthRate.value),
      discountRate: parseFloat(event.target.discountRate.value),
      sharesOutstanding: parseFloat(event.target.sharesOutstanding.value),
      price: parseFloat(event.target.price.value),
    };
    setStockV(formObj);
  };

  //   useEffect(() => {
  //     if (
  //       Object.keys(incomeStatement).length !== 0 &&
  //       Object.keys(balanceSheet).length !== 0 &&
  //       Object.keys(cashFlow).length !== 0 &&
  //       Object.keys(profile).length !== 0 &&
  //       Object.keys(ratio).length !== 0 &&
  //       Object.keys(ratioCafeF).length !== 0
  //     ) {
  //       const netIncome = cashFlow.find((element) => {
  //         return element.id === 101 ? element.values.value.slice(-1)[0] : null;
  //       });
  //       const operatingCashflow = cashFlow.find((element) => {
  //         return element.id === 104 ? element.values.value.slice(-1)[0] : null;
  //       });
  //       const capitalExpenditure = cashFlow.find((element) => {
  //         return element.id === 201 ? element.values.value.slice(-1)[0] : null;
  //       });
  //       const freeCashflow = operatingCashflow + capitalExpenditure;
  //       const cashAndShortTermInvestments =
  // 	  balanceSheet.find((element) => {
  //         return element.id === 1010102
  //           ? element.values.value.slice(-1)[0]
  //           : null;
  //       })
  //       +
  // 	  balanceSheet.find((element) => {
  //         return element.id === 10102 ? element.values.value.slice(-1)[0] : null;
  //       });

  //       const epsGrowth5Y = growthRate5Y(ratioCafeF.EPS);
  //       const epsGrowth10Y = growthRate10Y(ratioCafeF.EPS);
  //       const shortTermDebt = balanceSheet.find((element) => {
  //         return element.id === 3010101 ? element.values.value.slice(-1)[0] : null;
  //       });
  //       const longTermDebt = balanceSheet.find((element) => {
  //         return element.id === 3010206 ? element.values.value.slice(-1)[0] : null;
  //       });

  //       const discountRate = calculateDiscountRate(profile.beta);
  //       const sharesOutstanding = profile.sharesOutstanding;
  //       const totalDebt = shortTermDebt + longTermDebt;

  //       let stockV = {
  //         netIncome,
  //         operatingCashflow,
  //         freeCashflow,
  //         totalDebt,
  //         cashAndShortTermInvestments,
  //         epsGrowth5Y,
  //         epsGrowth10Y,
  //         gdpGrowthRate: 4.18,
  //         discountRate,
  //         sharesOutstanding,
  //       };
  //       setStockV(stockV);
  //       setInitialState(stockV);
  //     }
  //   }, [ratio, ratioCafeF, cashFlow, balanceSheet, incomeStatement, profile]);

  useEffect(() => {
    setStockV(dataStockV);
    setInitialState(dataStockV);
  }, [dataStockV]);
  useEffect(() => {
    try {
      let value = 0;
      switch (index) {
        case "netIncome":
          value = stockV.netIncome;
          setIndexData(stockV.netIncome);
          break;
        case "operatingCashflow":
          value = stockV.operatingCashflow;
          setIndexData(stockV.operatingCashflow);
          break;
        case "freeCashflow":
          value = stockV.freeCashflow;
          setIndexData(stockV.freeCashflow);
          break;
        default:
          value = stockV.netIncome;
          setIndexData(stockV.netIncome);
          break;
      }

      const pv20Y = calculateInitialIV(
        value,
        stockV.epsGrowth5Y / 100,
        stockV.discountRate / 100,
        stockV.gdpGrowthRate / 100
      );
      const initialIV = (pv20Y * 1000000) / stockV.sharesOutstanding;
      const debtPerShare =
        (stockV.totalDebt * 1000000) / stockV.sharesOutstanding;
      const cashPerShare =
        (stockV.cashAndShortTermInvestments * 1000000) /
        stockV.sharesOutstanding;
      const finalIV = initialIV - debtPerShare + cashPerShare;

      let calculatedData = {
        pv20Y,
        initialIV,
        debtPerShare,
        cashPerShare,
        finalIV,
        premium: (stockV.price / finalIV - 1) * 100,
      };
      setStockVCalculate(calculatedData);
    } catch (error) {
      console.log(error);
    }
  }, [index, stockV]);

  return (
    <>
      <h1 className="border-top mt-2">Stock Valuation</h1>
      <Container>
        <Row xs="1" md="2">
          <Col>
            <ButtonGroup className="w-25" value={index} onClick={handleChange}>
              <Button variant="secondary" value="netIncome">
                Net Income
              </Button>
              <Button variant="secondary" value="operatingCashflow">
                Operating Cash Flow
              </Button>
              <Button variant="secondary" value="freeCashflow">
                FreeCashFlow
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} ref={formRef} className="mb-3">
              <Row>
                <Form.Group md="3" controlId="indexData">
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Number"
                    autoComplete="off"
                    defaultValue={toRender(indexData)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="6" controlId="totalDebt">
                  <Form.Label>Total Debt</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Total Debt"
                    autoComplete="off"
                    defaultValue={toRender(stockV.totalDebt)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="6" controlId="cashAndShortTermInvestments">
                  <Form.Label>Cash and ShortTerm-Investments</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cash And ShortTerm Investments"
                    autoComplete="off"
                    defaultValue={toRender(stockV.cashAndShortTermInvestments)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="4" controlId="epsGrowth5Y">
                  <Form.Label>EPS Growth5Y %</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="EPS Growth5Y"
                    autoComplete="off"
                    defaultValue={toRender(stockV.epsGrowth5Y)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="4" controlId="epsGrowth10Y">
                  <Form.Label>EPS Growth10Y %</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="EPS Growth10Y"
                    autoComplete="off"
                    defaultValue={toRender(stockV.epsGrowth10Y)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="4" controlId="gdpGrowthRate">
                  <Form.Label>GDP GrowthRate %</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="GDP Growth Rate"
                    defaultValue={toRender(stockV.gdpGrowthRate)}
                  />
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group md="4" controlId="discountRate">
                  <Form.Label>Discount Rate %</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Discount Rate"
                    defaultValue={toRender(stockV.discountRate)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="4" controlId="sharesOutstanding">
                  <Form.Label>SharesOutstanding</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="SharesOutstanding"
                    autoComplete="off"
                    defaultValue={toRender(stockV.sharesOutstanding)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group md="4" controlId="price">
                  <Form.Label>Last Close</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    autoComplete="off"
                    defaultValue={toRender(stockV.price)}
                  />
                </Form.Group>
              </Row>
              <br />
              <Button variant="secondary" type="submit">
                Calculate Insintric Value
              </Button>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group md="3" controlId="pv20Y">
                <Form.Label>PV of 20 yr</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PV20Y"
                  defaultValue={toRender(stockVCalculate.pv20Y)}
                />
              </Form.Group>
              <Form.Group md="6" controlId="initialIV" readOnly>
                <Form.Label>Intrinsic Value before cash/debt</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Initial IV"
                  defaultValue={toRender(stockVCalculate.initialIV)}
                />
              </Form.Group>
              <Form.Group md="6" controlId="debtPerShare" readOnly>
                <Form.Label>Less (-) Debt Per Share</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Debt Per Share"
                  defaultValue={toRender(stockVCalculate.debtPerShare)}
                />
              </Form.Group>
              <Form.Group md="4" controlId="cashPerShare" readOnly>
                <Form.Label>Plus (+) Cash Per Share</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EPS Growth 5Y"
                  defaultValue={toRender(stockVCalculate.cashPerShare)}
                />
              </Form.Group>
              <Form.Group md="4" controlId="finalIV" readOnly>
                <Form.Label>Final Intrinsic Value Per Share</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Final IV"
                  defaultValue={toRender(stockVCalculate.finalIV)}
                />
              </Form.Group>
              <Form.Group md="4" controlId="premium" readOnly>
                <Form.Label>(Discount)/Premium %</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Premium"
                  defaultValue={toRender(stockVCalculate.premium)}
                />
              </Form.Group>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StockValuationVN;
