import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import vmiContext from "../../context/vmi-context";
import { toRender } from "./function";

const BasicInfo = () => {
  const { incomeStatement, cashFlow, ratio, setShowError, setMessageError } = useContext(vmiContext);
  const [validated, setValidated] = useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  
  useEffect(() => {
    try {
      if (
        Object.keys(incomeStatement).length !== 0 &&
        Object.keys(cashFlow).length !== 0 &&
        Object.keys(ratio).length !== 0
      ) {
        const basicInfo = {
          EPS: ratio?.quotes?.epsTrailingTwelveMonths ?? 0,
          PB: ratio?.quotes?.priceToBook ?? 0,
          PE: ratio?.quotes?.trailingPE ?? 0,
          epsGrowth5Y: ratio?.finnhub?.metric?.epsGrowth5Y ?? 0,
          PEG: ratio?.defaultKeyStatistics?.pegRatio ?? 0,
          PSG:
            ratio?.quotes?.priceToBook / ratio?.finnhub?.metric?.revenueGrowth5Y ??
            0,
          ROE5Y: ratio?.financialData?.returnOnEquity ?? 0,
          currentRatio: ratio?.financialData?.currentRatio ?? 0,
          totalDebt: ratio?.financialData?.totalDebt / 1000000 ?? 0,
          ebitda: ratio?.financialData?.ebitda / 1000000 ?? 0,
          debtEbitda:
            ratio?.financialData?.totalDebt / ratio?.financialData?.ebitda ?? 0,
          netInterestIncome: incomeStatement?.interestExpense[0] ?? 0,
          operatingCashflow: cashFlow?.totalCashFromOperatingActivities[0] ?? 0,
          netInterestCFO:
            Math.abs(
              (incomeStatement?.interestExpense[0] /
                cashFlow?.totalCashFromOperatingActivities[0]) *
                100
            ) ?? 0,
        };
        setBasicInfo(basicInfo);
      }
    } catch (error) {
      console.log(error);
      setShowError(true);
      setMessageError("Can not retrieve basic information from server. Please try again later!")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeStatement, cashFlow, ratio]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // console.log(event.target.validationCustom02.defaultValue);
    setValidated(true);
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group md="3" controlId="EPS">
            <Form.Label>EPS</Form.Label>
            <Form.Control
              type="text"
              placeholder="EPS"
              defaultValue={toRender(basicInfo.EPS)}
            />
          </Form.Group>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-2">
                For company losing money: less than 0.5; For Banks, REITS: 1-1.2
              </Tooltip>
            }
          >
            <Form.Group md="3" controlId="P/B">
              <Form.Label>P/B</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/B"
                defaultValue={toRender(basicInfo.PB)}
              />
            </Form.Group>
          </OverlayTrigger>
        </Row>
        <Row>
          <Col>
            <Form.Group md="3" controlId="pe">
              <Form.Label>P/E</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/E"
                defaultValue={toRender(basicInfo.PE)}
              />
            </Form.Group>
            <Form.Group md="4" controlId="epsGrowth5Y">
              <Form.Label>EPS Growth 5Y %</Form.Label>
              <Form.Control
                type="text"
                placeholder="EPS Growth 5Y"
                defaultValue={toRender(basicInfo.epsGrowth5Y)}
              />
            </Form.Group>
          </Col>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip-2">Good if less than 1.5</Tooltip>
              }
            >
              <Form.Group md="6" controlId="PEG">
                <Form.Label>PEG</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PEG"
                  defaultValue={toRender(basicInfo.PEG)}
                />
              </Form.Group>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip-2">
                  For new Growth companies with strong revenue growth, 0.2 is
                  Fair value, above is overvalued
                </Tooltip>
              }
            >
              <Form.Group md="6" controlId="PSG">
                <Form.Label>PSG</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PSG"
                  defaultValue={toRender(basicInfo.PSG)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">At least 12%-15%</Tooltip>}
          >
            <Form.Group md="4" controlId="ROE5Y">
              <Form.Label>ROE 5Y %</Form.Label>
              <Form.Control
                type="text"
                placeholder="ROE 5Y"
                defaultValue={toRender(basicInfo.ROE5Y)}
              />
            </Form.Group>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">More than 1</Tooltip>}
          >
            <Form.Group md="4" controlId="currentRatio">
              <Form.Label>Current Ratio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Current Ratio"
                defaultValue={toRender(basicInfo.currentRatio)}
              />
            </Form.Group>
          </OverlayTrigger>
        </Row>
        <Row>
          <Col>
            <Form.Group md="6" controlId="totalDebt">
              <Form.Label>Total Debt</Form.Label>
              <Form.Control
                type="text"
                placeholder="Total Debt"
                defaultValue={toRender(basicInfo.totalDebt)}
              />
            </Form.Group>
            <Form.Group md="6" controlId="ebitda">
              <Form.Label>EBITDA</Form.Label>
              <Form.Control
                type="text"
                placeholder="EBITDA"
                defaultValue={toRender(basicInfo.ebitda)}
              />
            </Form.Group>
          </Col>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">Less than 3</Tooltip>}
            >
              <Form.Group md="6" controlId="Debt/EBITDA ">
                <Form.Label>Debt/EBITDA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Debt / EBITDA"
                  defaultValue={toRender(basicInfo.debtEbitda)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group md="6" controlId="Interestexpense">
              <Form.Label>Net Interest Income</Form.Label>
              <Form.Control
                type="text"
                placeholder="Net Interest Income"
                defaultValue={toRender(basicInfo.netInterestIncome)}
              />
            </Form.Group>
            <Form.Group md="6" controlId="CashFlowOperation">
              <Form.Label>Operating CashFlow</Form.Label>
              <Form.Control
                type="text"
                placeholder="Operating CashFlow"
                defaultValue={toRender(basicInfo.operatingCashflow)}
              />
            </Form.Group>
          </Col>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">Less than 30%</Tooltip>}
            >
              <Form.Group md="6" controlId="netInterestCFO">
                <Form.Label>Debt Servicing Ratio %</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Interest expense / CFO"
                  defaultValue={toRender(basicInfo.netInterestCFO)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BasicInfo;
