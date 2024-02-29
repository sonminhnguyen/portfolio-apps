import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Modal, Uploader } from 'rsuite';
import { updateCommandChildren } from '../../data/database';
import { CommandContext } from './context';

const ModalEditRow = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [database, setDatabase] = useContext<unknown | any>(CommandContext);

  const [initialValue, setInitialValue] = useState({
    id: rowData.id,
    label: rowData.label,
    answer: rowData.answer
  });

  const [formValue, setFormValue] = React.useState(initialValue);
  const [files, setFiles] = React.useState<unknown | any>([]);

  const handleSubmit = () => {
    onClose();
    setInitialValue(formValue);
    const newDatabase = database.map(data => {
      const newChildren = data.children.map(child => {
        if (child.id === rowData.id) {
          return { ...child, ...formValue };
        }
        return child;
      });
      return { ...data, children: newChildren };
    });
    const formData = new FormData();
    formData.append('id', formValue.id);
    formData.append('label', formValue.label);
    formData.append('answer', formValue.answer);
    if (files.length !== 0) {
      files.map(file => {
        formData.append('file', file.blobFile);
      });
    }
    setDatabase(newDatabase);
    updateCommandChildren(formData);
  };

  const handleCancel = () => {
    onClose();
    setFormValue(initialValue);
  };
  useEffect(() => {
    setFormValue({
      id: rowData.id,
      label: rowData.label,
      answer: rowData.answer
    });
  }, [database]);
  return (
    <>
      <Modal backdrop="static" onClose={handleCancel} {...rest} size="xs" keyboard={true}>
        <Modal.Header>
          <Modal.Title>Изменить команду</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
            <Form.Group controlId="command-9">
              <Form.ControlLabel>Команда</Form.ControlLabel>
              <Form.Control name="label" />
            </Form.Group>
            <Form.Group controlId="answer-9">
              <Form.ControlLabel>Ответ бота</Form.ControlLabel>
              <Form.Control name="answer" />
            </Form.Group>
            <Form.Group controlId="file-10">
              <Form.ControlLabel>Загружать</Form.ControlLabel>
              <Uploader
                name="file"
                autoUpload={false}
                action="#"
                onChange={setFiles}
                multiple
                draggable
              >
                <div
                  style={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span>Нажмите или перетащите файлы в эту область, чтобы загрузить</span>
                </div>
              </Uploader>
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
