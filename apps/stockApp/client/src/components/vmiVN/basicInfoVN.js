import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import vmiContext from "../../context/vmi-context";
import { toRender } from "../vmiUS/function";

const BasicInfoVN = () => {
  const { dataBasicInfo } = useContext(vmiContext);
  const [validated, setValidated] = useState(false);
  const [basicInfo, setBasicInfo] = useState({});

  useEffect(() => {
    setBasicInfo(dataBasicInfo)
  },[dataBasicInfo])

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group md="3" controlId="EPS">
              <Form.Label>EPS</Form.Label>
              <Form.Control
                type="text"
                placeholder="EPS"
                defaultValue={toRender(basicInfo.epsNormalizedAnnual)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group md="3" controlId="epsIndustry">
              <Form.Label>EPS Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="EPS Industry"
                defaultValue={toRender(basicInfo.epsIndustry)}
              />
            </Form.Group>
          </Col>
        </Row>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip-2">
              For company losing money: less than 0.5; For Banks, REITS: 1-1.2
            </Tooltip>
          }
        >
          <Row>
            <Col>
              <Form.Group md="3" controlId="P/B">
                <Form.Label>P/B</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="P/B"
                  defaultValue={toRender(basicInfo.pbAnnual)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group md="3" controlId="pbIndustry">
                <Form.Label>P/B Industry</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="P/B Industry"
                  defaultValue={toRender(basicInfo.pbIndustry)}
                />
              </Form.Group>
            </Col>
          </Row>
        </OverlayTrigger>
        <Row>
          <Col>
            <Form.Group md="3" controlId="pe">
              <Form.Label>P/E</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/E"
                defaultValue={toRender(basicInfo.peNormalizedAnnual)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group md="3" controlId="peIndustry">
              <Form.Label>P/E Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/E Industry"
                defaultValue={toRender(basicInfo.peIndustry)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group md="3" controlId="ps">
              <Form.Label>P/S</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/S"
                defaultValue={toRender(basicInfo.psAnnual)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group md="3" controlId="psIndustry">
              <Form.Label>P/S Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="P/S Industry"
                defaultValue={toRender(basicInfo.psIndustry)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group md="4" controlId="epsGrowth5Y">
              <Form.Label>EPS Growth 5Y %</Form.Label>
              <Form.Control
                type="text"
                placeholder="EPS Growth5Y"
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
              <Form.Group md="6" controlId="peg">
                <Form.Label>PEG</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PEG"
                  defaultValue={toRender(basicInfo.peg)}
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
              <Form.Group md="6" controlId="psg">
                <Form.Label>PSG</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PSG"
                  defaultValue={toRender(basicInfo.psg)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip-2">At least 12%-15%</Tooltip>
              }
            >
              <Form.Group md="4" controlId="roae5Y">
                <Form.Label>ROE 5Y %</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ROE 5Y"
                  defaultValue={toRender(basicInfo.roae5Y)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
          <Col>
            <Form.Group md="4" controlId="roeIndustry">
              <Form.Label>ROE Industry %</Form.Label>
              <Form.Control
                type="text"
                placeholder="ROE Industry"
                defaultValue={toRender(basicInfo.roeIndustry)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">More than 1</Tooltip>}
            >
              <Form.Group md="4" controlId="currentRatioAnnual">
                <Form.Label>Current Ratio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Current Ratio"
                  defaultValue={toRender(basicInfo.currentRatioAnnual)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
          <Col>
            <Form.Group md="4" controlId="currentRatioIndustry">
              <Form.Label>Current Ratio Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Current Ratio Industry"
                defaultValue={toRender(basicInfo.currentRatioAnnualIndustry)}
              />
            </Form.Group>
          </Col>
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
                  placeholder="Debt/EBITDA"
                  defaultValue={toRender(basicInfo.debtEbitda)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group md="6" controlId="interestExpense">
              <Form.Label>Net Interest Income</Form.Label>
              <Form.Control
                type="text"
                placeholder="Net Interest Income"
                defaultValue={toRender(basicInfo.netInterestIncome)}
              />
            </Form.Group>
            <Form.Group md="6" controlId="CashFlowOperation">
              <Form.Label>Operating Cashflow</Form.Label>
              <Form.Control
                type="text"
                placeholder="Operating Cashflow"
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
                  placeholder="Interest expense/CFO"
                  defaultValue={toRender(basicInfo.debtServicingRatio)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">More than 1</Tooltip>}
            >
              <Form.Group md="4" controlId="currentRatioAnnual">
                <Form.Label>Dividend</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={toRender(basicInfo.dividend)}
                />
              </Form.Group>
            </OverlayTrigger>
          </Col>
          <Col>
            <Form.Group md="4" controlId="currentRatioIndustry">
              <Form.Label>Dividend Yield %</Form.Label>
              <Form.Control
                type="text"
                defaultValue={toRender(basicInfo.dividendYield)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BasicInfoVN;
