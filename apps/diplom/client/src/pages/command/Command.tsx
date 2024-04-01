import React, { useEffect, useState } from 'react';
import { Table, ButtonToolbar, IconButton } from 'rsuite';
import { TestCell, LinkCell } from './Cells';
import PlusIcon from '@rsuite/icons/Plus';
import { CommandContext } from './context';
// import { getCommands } from '../../data/database';
import Copyright from '@/components/Copyright';
import data from './data';

const { Column, HeaderCell, Cell } = Table;

const Command = () => {
  const [database, setDatabase] = useState<unknown | any>([]);

  const handleAddCollection = () => {
    const newCollection = [
      ...database,
      {
        id: database.length + 1,
        label: '/команда',
        depth: 0,
        children: [
          {
            id: (database.length + 1) * 100 + 1,
            label: 'Ярлык',
            depth: 1,
            description: 'Это описание чат-бота',
            file: 'fileURL'
          }
        ]
      }
    ];
    setDatabase(newCollection);
    // updateCommand(newCollection)
  };

  useEffect(() => {
    setDatabase(data);
    // getCommands().then(data => setDatabase(data));
  }, []);
  if (database.length !== 0) {
    return (
      <CommandContext.Provider value={[database, setDatabase]}>
        <ButtonToolbar>
          <IconButton
            color="cyan"
            appearance="primary"
            onClick={handleAddCollection}
            icon={<PlusIcon />}
          >
            Добавить коллекцию
          </IconButton>
        </ButtonToolbar>
        <Table
          isTree
          defaultExpandAllRows
          bordered
          cellBordered
          rowKey="id"
          height={800}
          data={database}
          /** shouldUpdateScroll: whether to update the scroll bar after data update **/
          shouldUpdateScroll={false}
        >
          <Column flexGrow={2}>
            <HeaderCell>Команда</HeaderCell>
            <Cell dataKey="label" />
          </Column>
          <Column flexGrow={1} align={'center'}>
            <HeaderCell>Файлы</HeaderCell>
            <LinkCell dataKey="file"></LinkCell>
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>Ответ бота</HeaderCell>
            <Cell dataKey="answer" />
          </Column>
          <Column>
            <HeaderCell>...</HeaderCell>
            <TestCell />
          </Column>
        </Table>
        <Copyright />
      </CommandContext.Provider>
    );
  } else {
    return <></>;
  }
};

export default Command;
