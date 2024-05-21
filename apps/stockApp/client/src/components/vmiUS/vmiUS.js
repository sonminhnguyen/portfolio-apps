import React, { useEffect, useState, Suspense } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import vmiContext from '../../context/vmi-context'
import SearchBar from './searchBarUS'
import TrendChart from './trendChartUS'
import Error from '../Error'
import { getIncomeStatement, getBalanceSheet, getCashFlow, getRatio } from './dataUS'
import BasicInfo from './basicInfoUS'
import StockValuation from './stockValuationUS'
require('dotenv').config()

const VmiUS = () => {

    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [symbol, setSymbol] = useState("");
    const [incomeStatement, setIncomeStatement] = useState({});
    const [balanceSheet, setBalanceSheet] = useState({});
    const [cashFlow, setCashFlow] = useState({});
    const [ratio, setRatio] = useState({});

    useEffect(() => {
        if (!!symbol) {
            try {
                getIncomeStatement(symbol).then(incomeStatement => setIncomeStatement(incomeStatement))
                getBalanceSheet(symbol).then(balanceSheet => setBalanceSheet(balanceSheet))
                getCashFlow(symbol).then(cashFlow => setCashFlow(cashFlow))
                getRatio(symbol, process.env.REACT_APP_FINNHUB_KEY).then(ratio => setRatio(ratio))
            } catch (error) {
                console.log(error);
                setShowError(true);
                setMessageError("Can not retrieve fundamental data from server. Please try again later!")
            }
        }
    }, [symbol])
    return (
        <>
            <Suspense fallback={<h1>Still Loading…</h1>}>
                <vmiContext.Provider value={{ incomeStatement, balanceSheet, cashFlow, ratio, setShowError, setMessageError}}>
                <Error showError={showError} setShowError={setShowError} messageError={messageError} />
                    <Container fluid className="mt-3">
                        <Row>
                            <Col xs={1} className='d-flex align-items-center justify-content-center' >
                                <div >Symbol</div>
                            </Col>
                            <Col xs={2} md={4}>
                                <SearchBar setSymbol={setSymbol} />
                            </Col>
                            <div className="text-muted">All number is in millions</div>
                        </Row>
                        <Row>
                            <Col>
                                <BasicInfo />
                            </Col>
                            <Col>
                                <TrendChart />
                            </Col>
                        </Row>
                        <Row>
                            <StockValuation />
                        </Row>
                    </Container>
                </vmiContext.Provider>
            </Suspense>
        </>
    )
}

export default VmiUS;