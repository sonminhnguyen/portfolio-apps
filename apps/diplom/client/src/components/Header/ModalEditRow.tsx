import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'rsuite';


const ModalEditRow = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [initialValue, setInitialValue] = useState({});
  const [formValue, setFormValue] = React.useState(initialValue);
  
  const handleSubmit = () => {
    onClose();
    setInitialValue(formValue);
  };

  const handleCancel = () => {
    onClose();
    setFormValue(initialValue);
  };

  useEffect(() => {
    setInitialValue({
      username: rowData?.username,
      telephone: rowData?.telephone,
      email: rowData?.email
    });
    setFormValue({
      username: rowData?.username,
      telephone: rowData?.telephone,
      email: rowData?.email
    });
  }, [rowData]);

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
              <Form.ControlLabel>Телефон</Form.ControlLabel>
              <Form.Control name="telephone" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Почта</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Пароль</Form.ControlLabel>
              <Form.Control name="password" type="email" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Подтвердите пароль</Form.ControlLabel>
              <Form.Control name="cfpassword" type="email" />
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
