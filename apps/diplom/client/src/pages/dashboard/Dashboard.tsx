import React, { useEffect, useState, useContext } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Checkbox, Stack, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerAddRow from './DrawerAddRow';
import ModalSendMessage from './ModalSendMessage';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
import { getStudents } from '../../data/database';
import { DashboardContext } from './context';
import Copyright from '@/components/Copyright';
import { AuthContext } from '@/context/AuthProvider';
// import { mockUsers } from '@/data/mock';
// const data = mockUsers(20);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const groupList = ['8191-22', '8191-21', '8191-31', '8191-11'].map(item => ({
  label: item,
  value: item
}));
const yearList = ['1', '2', '3', '4', '5'].map(item => ({ label: item, value: item }));

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [database, setDatabase] = useState<unknown | any>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<unknown>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [group, setGroup] = useState<string | null>('');
  const [year, setYear] = useState<string | null>('');

  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === database.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < database.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value, checked) => {
    const keys = checked ? database.map(item => item.id) : [];
    const users = checked ? database.map(item => ({ name: item.name, id_vk: item.id_vk })) : [];
    setCheckedKeys(keys);
    setCheckedUsers(users);
  };

  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    const userSelected = database.filter(item => keys.includes(item.id));
    const users = userSelected.map(item => ({ name: item.name, id_vk: item.id_vk }));
    setCheckedKeys(keys);
    setCheckedUsers(users);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    if (database.length !== 0) {
      const filtered = database.filter((item: any) => {
        if (
          !item.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item.group.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item.note.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item.email.toLowerCase().includes(searchKeyword.toLowerCase())
        ) {
          return false;
        }

        if (group && item.group !== group) {
          return false;
        }

        if (year && item.year !== year) {
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

  useEffect(() => {
    getStudents().then((data: any) => setDatabase(data));
  }, []);
  if (database.length !== 0) {
    return (
      <DashboardContext.Provider value={[database, setDatabase]}>
        <Stack className="table-toolbar" justifyContent="space-between">
          <Stack spacing="10px">
            {auth?.user?.role === 'admin' ? (
              <Button appearance="primary" onClick={() => setShowDrawer(true)}>
                Добавить студента
              </Button>
            ) : (
              <></>
            )}
            <Button appearance="primary" onClick={() => setShowModal(true)}>
              Отправить сообщение
            </Button>
          </Stack>

          <Stack spacing={6}>
            <SelectPicker
              label="Группа"
              data={groupList}
              searchable={false}
              value={group}
              onChange={setGroup}
            />
            <SelectPicker
              label="Курс"
              data={yearList}
              searchable={false}
              value={year}
              onChange={setYear}
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
          <Column width={40} fixed>
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </HeaderCell>
            <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
          <Column width={80} align="center">
            <HeaderCell>Аватар</HeaderCell>
            <ImageCell dataKey="avatar" />
          </Column>
          <Column width={250} sortable>
            <HeaderCell>ФИО</HeaderCell>
            <NameCell dataKey="name" />
          </Column>
          <Column width={90} sortable>
            <HeaderCell>Группа</HeaderCell>
            <Cell dataKey="group" />
          </Column>
          <Column width={70} sortable>
            <HeaderCell>Курс</HeaderCell>
            <Cell dataKey="year" />
          </Column>
          <Column width={160}>
            <HeaderCell>Телефон</HeaderCell>
            <NameCell dataKey="telephone" />
          </Column>
          <Column width={280}>
            <HeaderCell>Почта</HeaderCell>
            <NameCell dataKey="email" />
          </Column>
          <Column width={120} flexGrow={1}>
            <HeaderCell>Примечание</HeaderCell>
            <Cell dataKey="note" />
          </Column>
          <Column width={200}>
            <HeaderCell>Ссылка VK</HeaderCell>
            <Cell dataKey="linkVK" />
          </Column>
          <Column width={120}>
            <HeaderCell>
              <MoreIcon />
            </HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>

        <DrawerAddRow open={showDrawer} onClose={() => setShowDrawer(false)} />
        <ModalSendMessage
          checkedUsers={checkedUsers}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
        <Copyright />
      </DashboardContext.Provider>
    );
  } else {
    return <></>;
  }
};

export default Dashboard;
