import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { updateUsers } from '@/data/database';
import { ManageUsersContext } from './context';


const ModalEditRow = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [initialValue, setInitialValue] = useState({});
  const [database, setDatabase] = useContext<unknown | any>(ManageUsersContext);
  const [formValue, setFormValue] = React.useState(initialValue);

  const handleSubmit = () => {
    onClose();
    setInitialValue(formValue);
    // add to database

    const newDatabase = database.map(data => {
      if (data.id == rowData.id) {
        return { ...data, ...formValue };
      }
      return data;
    });
    setDatabase(newDatabase);
    updateUsers(newDatabase);
  };

  const handleCancel = () => {
    onClose();
    setFormValue(initialValue);
  };

  useEffect(() => {
    setInitialValue({
      username: rowData.username,
      role: rowData.role,
      telephone: rowData.telephone,
      email: rowData.email
    });
    setFormValue({
      username: rowData.username,
      role: rowData.role,
      telephone: rowData.telephone,
      email: rowData.email
    });
  }, [database]);

  return (
    <>
      <Modal onClose={handleCancel} {...rest} size="xs" keyboard={true}>
        <Modal.Header>
          <Modal.Title>Изменить студента</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
            <Form.Group>
              <Form.ControlLabel>ФИО</Form.ControlLabel>
              <Form.Control name="username" />
            </Form.Group>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Подтверждать
          </Button>
          <Button onClick={handleCancel} appearance="subtle">
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditRow;
