import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Checkbox, Stack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerAddRow from './DrawerAddRow';
import ModalSendMessage from './ModalSendMessage';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
import { getUsers } from '../../data/database';
import { ManageUsersContext } from './context';
import Copyright from '@/components/Copyright';
import data from './data';
// import { mockUsers } from '@/data/mock';
// const data = mockUsers(20);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const ManageUsers = () => {
  const [database, setDatabase] = useState<unknown | any>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<unknown>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');


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
          !item?.username.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !item?.email.toLowerCase().includes(searchKeyword.toLowerCase())
        ) {
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
    setDatabase(data);
    // getUsers().then((data: any) => setDatabase(data));
  }, []);
  if (database.length !== 0) {
    return (
      <ManageUsersContext.Provider value={[database, setDatabase]}>
        <Stack className="table-toolbar" justifyContent="space-between">
          <Stack spacing="10px">
            <Button appearance="primary" onClick={() => setShowDrawer(true)}>
              Добавить пользователя
            </Button>
          </Stack>

          <Stack spacing={6}>
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
            <NameCell dataKey="username" />
          </Column>
          <Column width={70} sortable>
            <HeaderCell>Роль</HeaderCell>
            <Cell dataKey="role" />
          </Column>

          <Column width={160}>
            <HeaderCell>Телефон</HeaderCell>
            <NameCell dataKey="telephone" />
          </Column>

          <Column width={300}>
            <HeaderCell>Почта</HeaderCell>
            <NameCell dataKey="email" />
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
      </ManageUsersContext.Provider>
    );
  } else {
    return <></>;
  }
};

export default ManageUsers;
