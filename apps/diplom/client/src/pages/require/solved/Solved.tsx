import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Table, DOMHelper, Stack, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
// import { mockUsers } from '@/data/mock';
// import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
// const data = mockUsers(20);
// console.log(data);

import { getSolvedRequires, revertRequires } from '@/data/database';
import Copyright from '@/components/Copyright';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const eventList = ['Заявление', 'Результать', 'Договор'].map(item => ({
  label: item,
  value: item
}));

const Solved = () => {
  const [database, setDatabase] = useState<unknown | any>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [event, setEvent] = useState<string | null>('');

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    if (database.length !== 0) {
      const filtered = database.filter(item => {
        if (
          !item.event.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          // !item.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item.note.toLowerCase().includes(searchKeyword.toLowerCase())
        ) {
          return false;
        }

        if (event && item.event !== event) {
          return false;
        }

        return true;
      });

      if (sortColumn && sortType) {
        return filtered.sort((a, b) => {
          let x: any = a[sortColumn];
          let y: any = b[sortColumn];

          if (typeof x === 'string') {
            x = x.charCodeAt(0);
          }
          if (typeof y === 'string') {
            y = y.charCodeAt(0);
          }

          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return filtered;
    }
  };

  const handleRevertEvent = (rowData: any) => {
    const newDatabase = database.filter(data => data.id !== rowData.id);
    const updateRow = database.filter(data => data.id === rowData.id);
    setDatabase(newDatabase);
    revertRequires(updateRow[0]);
    alert(`id:${rowData.id} done!!!`);
  };

  useEffect(() => {
    getSolvedRequires().then(data => setDatabase(data));
  }, []);
  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Stack spacing={6}>
          <SelectPicker
            label="События"
            data={eventList}
            searchable={false}
            value={event}
            onChange={setEvent}
          />
          <InputGroup inside>
            <Input placeholder="Поиск" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        height={Math.max(getHeight(window) - 200, 400)}
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={60} align="center" fixed sortable>
          <HeaderCell>ИД</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={120} align="center" sortable>
          <HeaderCell>События</HeaderCell>
          <Cell dataKey="event" />
        </Column>

        <Column width={300} sortable>
          <HeaderCell>Титул</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={80}>
          <HeaderCell>Группа</HeaderCell>
          <Cell dataKey="group" />
        </Column>

        <Column width={180}>
          <HeaderCell>ФИО</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={300}>
          <HeaderCell>Примечание</HeaderCell>
          <Cell dataKey="note" />
        </Column>

        <Column width={120} fixed="right">
          <HeaderCell>...</HeaderCell>
          <Cell>
            {rowData => (
              <span>
                <a style={{ color: '#00BFFF' }} onClick={() => handleRevertEvent(rowData)}>
                  {' '}
                  Вернуть{' '}
                </a>
              </span>
            )}
          </Cell>
        </Column>
      </Table>
      <Copyright />
    </>
  );
};

export default Solved;
