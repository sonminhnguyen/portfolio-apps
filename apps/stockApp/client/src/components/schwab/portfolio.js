import React, { useEffect, useState } from 'react'
import { getPortfolio } from './data'


const Portfolio = () => {

    const [portfolio, setPortfolio] = useState([])

    useEffect(() => {
        getPortfolio()
        .then(data => setPortfolio(data))
    }, [])

    return (
        <>
            <h3>Portfolio</h3>
            {portfolio.map((value, i) => <div key={i}>{value.id}</div>)}
        </>
    )
}

export default Portfolio