import React, { useEffect, useState, Suspense } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import vmiContext from '../../context/vmi-context'
import Error from '../vmiUS/error'
import SearchBar from './searchBarVN'
import BasicInfoVN from './basicInfoVN'
import TrendChartVN from './trendChartVN'
import StockValuationVN from './stockValuationVN'
import { getIncomeStatementVN, getRatioVN, getRatioCafeF, getBalanceSheetVN, getCashFLowVN, getCompanyProfileVN } from './dataVN'
require('dotenv').config()

const VmiVN = () => {
    const [symbol, setSymbol] = useState([]);
    const [incomeStatement, setIncomeStatement] = useState({})
    const [balanceSheet, setBalanceSheet] = useState({})
    const [cashFlow, setCashFlow] = useState({})
    const [ratio, setRatio] = useState([])
    const [ratioCafeF, setRatioCafeF] = useState([])
    const [profile, setProfile] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        if(symbol.length !== 0){
            try {
                getCompanyProfileVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(data => setProfile(data))
                getIncomeStatementVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(data => setIncomeStatement(data))
                getBalanceSheetVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(data => setBalanceSheet(data))
                getCashFLowVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(data => setCashFlow(data))
                getRatioVN(symbol, process.env.REACT_APP_FIREANT_KEY).then(data => setRatio(data))
                getRatioCafeF(symbol).then(data => setRatioCafeF(data))
            } catch (error) {
                console.log(error);
            }
        }
    }, [symbol])

    return (
        <>
            <Suspense fallback={<h1>Still Loading…</h1>}>
                <vmiContext.Provider value={{ profile, incomeStatement, balanceSheet, cashFlow, ratio, ratioCafeF }}>
                    <Error error={error} setError={setError} />
                    <Container fluid className="mt-3">
                        <Row>
                            <Col xs={1} className='d-flex align-items-center justify-content-center' >
                                <div >Symbol</div>
                            </Col>
                            <Col xs={2} md={4}>
                                <SearchBar setSymbol={ setSymbol } />
                            </Col>
                            <div className="text-muted">All number is in millions</div>
                        </Row>
                        <Row>
                            <Col xs lg="5">
                                <h1 className='border-top mt-2'>Basic Info</h1>
                                <BasicInfoVN />
                            </Col>
                            <Col>
                                <TrendChartVN />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs >
                                <StockValuationVN />
                            </Col>
                        </Row>
                    </Container>
                </vmiContext.Provider>
            </Suspense>
        </>
    )
}

export default VmiVN;