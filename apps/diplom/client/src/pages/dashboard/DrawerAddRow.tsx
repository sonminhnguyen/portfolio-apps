import React, { useContext } from 'react';
import {
  Drawer,
  Button,
  Form,
  Stack,
  Input
} from 'rsuite';
import { updateStudents } from '@/data/database';
import { DashboardContext } from './context';

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const DrawerAddRow = (props: any) => {
  const { onClose, ...rest } = props;
  const [database, setDatabase] = useContext<unknown | any>(DashboardContext);
  const [formValue, setFormValue] = React.useState({
    id: database.length + 1,
    id_vk: '',
    avatar: '',
    name: '',
    group: '',
    year: '',
    telephone: '',
    email: '',
    note: '',
    linkVK: '',
  });

  const handleSubmit = () => {
    onClose();
    const newDatabase = [...database, formValue];
    console.log(newDatabase);
    setDatabase(newDatabase);
    updateStudents(newDatabase);
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
              <Form.Control name="name" style={{ width: 200 }} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Группа</Form.ControlLabel>
              <Form.Control name="group" style={{ width: 200 }} />
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Курс</Form.ControlLabel>
            <Form.Control name="year" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="telephone" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Почта</Form.ControlLabel>
            <Form.Control name="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Примечание</Form.ControlLabel>
            <Form.Control rows={10} name="note" accepter={Textarea} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>ID Vkontakte</Form.ControlLabel>
            <Form.Control name="id_vk" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Ссылка VK</Form.ControlLabel>
            <Form.Control name="linkVK" />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerAddRow;
