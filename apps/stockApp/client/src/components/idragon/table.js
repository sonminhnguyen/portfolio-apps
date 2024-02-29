import React from 'react';
import { useExpanded, useTable } from 'react-table';
import defaultColumn from './editableCell';

const Table = ({ columns, data, updateMyData , skipPageReset}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, 
    rows,
    prepareRow,
    state: { expanded }
  } = useTable({ 
      columns, 
      data, 
      defaultColumn, 
      updateMyData,
      skipPageReset
    },
    useExpanded       
  )

  return (
    <>
    <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
    </pre>
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

export default Table;