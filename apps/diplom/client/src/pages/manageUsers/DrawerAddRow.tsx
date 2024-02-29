import React, { useContext } from 'react';
import {
  Drawer,
  Button,
  Form,
  Stack,
} from 'rsuite';
import { updateUsers } from '@/data/database';
import { ManageUsersContext } from './context';

const DrawerAddRow = (props: any) => {
  const { onClose, ...rest } = props;
  const [database, setDatabase] = useContext<unknown | any>(ManageUsersContext);
  const [formValue, setFormValue] = React.useState({
    id: database.length + 1,
    avatar: '',
    username: '',
    role: '',
    telephone: '',
    email: '',
  });

  const handleSubmit = () => {
    onClose();
    const newDatabase = [...database, formValue];
    console.log(newDatabase);
    setDatabase(newDatabase);
    updateUsers(newDatabase);
  };

  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Добавить нового ученика</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleSubmit} appearance="primary">
            Добавить
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Отмена
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>ФИО</Form.ControlLabel>
              <Form.Control name="username" style={{ width: 200 }} />
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Роль</Form.ControlLabel>
            <Form.Control name="role" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="telephone" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Почта</Form.ControlLabel>
            <Form.Control name="email" />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerAddRow;
