import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { CommandContext } from './context';

const CommandCollections = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [initialValue, setInitialValue] = useState({});
  const [formValue, setFormValue] = React.useState(initialValue);
  const [database, setDatabase] = useContext<unknown | any>(CommandContext);

  const handleSubmit = () => {
    onClose();
    console.log(formValue);
    const newDatabase = [...database];
    newDatabase[rowData.id - 1].label = formValue.label;
    setDatabase(newDatabase);
    setInitialValue(formValue);
  };

  const handleCancel = () => {
    onClose();
    setFormValue(initialValue);
  };

  useEffect(() => {
    setInitialValue({
      label: rowData.label,
    });
    setFormValue({
      label: rowData.label,
    });
  }, []);

  return (
    <>
      <Modal onClose={handleCancel} {...rest} size="xs" keyboard={true}>
        <Modal.Header>
          <Modal.Title>Изменить студента</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
          <Form.Group controlId="command-9">
              <Form.ControlLabel>Команда</Form.ControlLabel>
              <Form.Control name="label" />
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

export default CommandCollections;
