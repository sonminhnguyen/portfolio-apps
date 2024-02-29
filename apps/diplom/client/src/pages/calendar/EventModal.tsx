import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  // ModalProps,
  Checkbox,
  InputPicker
} from 'rsuite';
// import { format } from 'date-fns';
import { updateEvents } from '@/data/database';

// interface EventModalProps extends ModalProps {
//   onAddEvent: (event: React.MouseEvent) => void;
// }

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const groupArr = ['8191-21', '8191-22', '8191-31', '8191-11'].map(item => ({
  label: item,
  value: item
}));

const EventModal = (props: any) => {
  const {
    database,
    setDatabase,
    selectedDate,
    onClose,
    open,
    deletable,
    // onAddEvent,
    ...rest
  } = props;
  const [initialValue, setInitialValue] = useState({});
  const [formValue, setFormValue] = useState<unknown | any>(initialValue);
  const [hidden, setHidden] = useState(true);
  const [remindToGroup, setRemindToGroup] = React.useState(null);

  console.log(selectedDate);
  // console.log(formValue);
  const handleAddEvent = () => {
    handleClose();
    const newDatabase = [...database, formValue];
    setDatabase(newDatabase);
    updateEvents(newDatabase);
  };

  const handleDeleteEvent = () => {
    handleClose();
    const newDatabase = database.filter(data => data.id !== parseInt(formValue.id));
    const updatedID = newDatabase.map(data => {
      if (data.id > parseInt(formValue.id)) {
        return { ...data, id: data.id - 1 };
      }
      return data;
    });
    setDatabase(updatedID);
    updateEvents(newDatabase);
  };

  const handleClose = () => {
    onClose();
    setHidden(true);
    setRemindToGroup(null);
  };
  useEffect(() => {
    setInitialValue({
      id: selectedDate.id || database.length + 1,
      title: selectedDate.title || '',
      message: selectedDate?.extendedProps?.message || '',
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      remindToGroup: selectedDate?.extendedProps?.remindToGroup || ''
    });
    setFormValue({
      id: selectedDate.id || database.length + 1,
      title: selectedDate.title || '',
      message: selectedDate?.extendedProps?.message || '',
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      remindToGroup: selectedDate?.extendedProps?.remindToGroup || ''
    });
    setRemindToGroup(selectedDate?.extendedProps?.remindToGroup || '');
  }, [selectedDate]);
  return (
    <Modal open={open} onClose={handleClose} backdrop="static" {...rest}>
      <Modal.Header>
        <Modal.Title>Добавить новое событие</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Название события</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>
          <Form.Group controlId="textarea">
            <Form.ControlLabel>Сообщение</Form.ControlLabel>
            <Form.Control rows={5} name="message" accepter={Textarea} />
          </Form.Group>
          <Checkbox onChange={() => setHidden(!hidden)}>Напоминание для группы</Checkbox>
          <Form.Group controlId="inputPicker" hidden={hidden}>
            <Form.ControlLabel>Выберите группу</Form.ControlLabel>
            <Form.Control
              value={remindToGroup}
              onChange={setRemindToGroup}
              name="remindToGroup"
              accepter={InputPicker}
              data={groupArr}
            />
          </Form.Group>

          {/* <Form.Group controlId="start">
            <Form.ControlLabel>Время события</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                name="startDate"
                format="HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="Start Time"
              />
              <DatePicker format="HH:mm:ss" block style={{ width: 200 }} placeholder="End Time" />
              <Checkbox>Весь день</Checkbox>
            </Stack>
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {deletable ? (
          <Button onClick={handleDeleteEvent} appearance="primary">
            Удалить
          </Button>
        ) : (
          <Button onClick={handleAddEvent} appearance="primary">
            Подтвердить
          </Button>
        )}
        <Button onClick={handleClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
