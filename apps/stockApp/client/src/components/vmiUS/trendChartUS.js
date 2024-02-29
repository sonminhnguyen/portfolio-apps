import React, { useContext, useState, useEffect } from 'react'
//dont delete import chart
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import vmiContext from '../../context/vmi-context'

const TrendChart = () => {
    const { incomeStatement, cashFlow } = useContext(vmiContext)
    const [label, setLabel] = useState("")
    const [index, setIndex] = useState("totalRevenue");
    const [X, setX] = useState([0])
    const [Y, setY] = useState([0])

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
            Object.keys(incomeStatement).length !== 0 
            && Object.keys(cashFlow).length !== 0
        ) {
            switch (index) {
                case "totalRevenue": 
                    setLabel("Revenue")
                    renderData = {
                        period: incomeStatement["endDate"],
                        values: incomeStatement["totalRevenue"] 
                    }
                    break;
                case "netIncome": 
                    setLabel("Net Income")
                    renderData = {
                        period: incomeStatement["endDate"],
                        values: incomeStatement["netIncome"] 
                    } 
                    break;
                case "operatingCashflow": 
                    setLabel("Operating CashFlow")
                    renderData = {
                        period: cashFlow["endDate"],
                        values: cashFlow["totalCashFromOperatingActivities"] 
                    } 
                    break;
                case "freeCashflow": 
                    setLabel("Free CashFlow")
                    const operatingCashflow = cashFlow["totalCashFromOperatingActivities"] 
                    const capitalExpenditures = cashFlow["capitalExpenditures"]
                    let values = []
                    for(let i = 0; i < 4; i++) {
                        values.push(operatingCashflow[i] + capitalExpenditures[i])
                    }
                    renderData = {
                        period: cashFlow["endDate"],
                        values
                    } 
                    break;
                default: 
                    renderData = {
                        period: incomeStatement["endDate"],
                        values: incomeStatement["totalRevenue"] 
                    } 
                    break;
            }
            setX(renderData.period)
            setY(renderData.values)
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