import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Input } from 'rsuite';

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const ModalFeedback = (props: any) => {
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
      feedback: ""
    });
    setFormValue({
      feedback: ""
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
            <Form.Group controlId="textarea">
              <Form.ControlLabel>Message</Form.ControlLabel>
              <Form.Control rows={5} name="feedback" accepter={Textarea} />
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

export default ModalFeedback;
