import React, { useEffect, useState, useMemo } from 'react'
import Table from './table';
import { getPortfolio } from './data'

const Portfolio = () => {
    const [data, setData] = useState([])
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date'
            },
            {
                Header: 'Name',
                accessor: 'code', 
            }, 
            {
                Header: 'Quantity',
                accessor: 'totalQty', 
            },
            {
                Header: 'Cost Price',
                accessor: 'costPrice', 
            },
            {
                Header: 'Cost Value',
                accessor: 'costValue', 
            },
        ],
        []
    )

    const updateMyData = (rowIndex, columnId, value) => {
      setSkipPageReset(true)
      setData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        })
      )
    }

    useEffect(() => {
        getPortfolio()
        .then(data => setData(data))
    }, [])

    return (
        <>
            <h3>Portfolio</h3>
            <Table columns={columns} data={data} updateMyData={updateMyData} skipPageReset={skipPageReset} />
        </>
    )
}

export default Portfolio