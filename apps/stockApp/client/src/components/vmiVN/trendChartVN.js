import React, { useContext, useEffect, useState } from 'react'
//dont delete import chart
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import vmiContext from '../../context/vmi-context'

const TrendChart = () => {
    const { incomeStatement, cashFlow } = useContext(vmiContext)
    const [index, setIndex] = useState(1);
    const [X, setX] = useState([])
    const [Y, setY] = useState([])
    const [label, setLabel] = useState("")

    const chartData = {
        labels: X,
        datasets: [
            {
                label: label,
                backgroundColor: '#0dcaf0',
                borderColor: '#0dcaf0',
                borderWidth: 2,
                data: Y
            }
        ]
    }

    const handleChange = (e) => {
        setIndex(e.target.value);
    }
    
    useEffect(() => {
        let renderData = {}

        if(
            Object.keys(incomeStatement).length !== 0 &&
            Object.keys(cashFlow).length !== 0
        ) {
            switch (index) {
                case "totalRevenue": 
                    setLabel("Revenue")
                    renderData = incomeStatement.find(element => element.id === 1); 
                    break;
                case "netIncome": 
                    setLabel("Net Income")
                    renderData = incomeStatement.find(element => element.id === 21); 
                    break;
                case "operatingCashflow": 
                    setLabel("Cash flow from operation")
                    renderData = cashFlow.find(element => element.id === 104); 
                    break;
                //freeCashFlow
                //ROE
                //EPS
                case "freeCashflow":
                    setLabel("Free CashFlow")
                    const operatingCashflow = cashFlow.find(element => element.id === 104).values.value
                    const capitalExpenditure = cashFlow.find(element => element.id === 201).values.value
                    let value = []
                    for(let i = 0; i < 6; i++) {
                        value.push(operatingCashflow[i] + capitalExpenditure[i])
                    }
                    renderData = {
                        values: {
                            period: cashFlow.find(element => element.id === 104).values.period,
                            value
                        }
                    }
                    break;
                default: 
                    setLabel("Revenue")
                    renderData = incomeStatement.find(element => element.id === 1); 
                    break;
            }
            setX(renderData.values.period)
            setY(renderData.values.value)
        }
    }, [index, incomeStatement, cashFlow])

    return (
        <div>
            <ButtonGroup value={index} onClick={handleChange} >
                <Button variant="secondary" value="totalRevenue">Total Revenue</Button>
                <Button variant="secondary" value="netIncome">Net Income</Button>
                <Button variant="secondary" value="operatingCashflow">Operating CashFlow</Button>
                <Button variant="secondary" value="freeCashflow">Free CashFlow</Button>
            </ButtonGroup>

            <Bar
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
}

export default TrendChart