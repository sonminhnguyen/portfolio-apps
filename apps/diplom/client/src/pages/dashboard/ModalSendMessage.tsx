import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Modal, Uploader } from 'rsuite';
import { sendMessage } from '@/data/database';

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const ModalSendMessage = (props: any) => {
  const { checkedUsers, onClose, ...rest } = props;
  const [sendTo, setSendTo] = useState('');
  const [files, setFiles] = useState<unknown | any>([]);
  const [initialValue] = useState({
    sendTo: sendTo,
    title: '',
    message: ''
  });

  const checkedID_VK = checkedUsers.map(user => user.id_vk);
  const [formValue, setFormValue] = React.useState(initialValue);

  const handleSendMessage = async e => {
    onClose();
    e.preventDefault();
    setFormValue(initialValue);
    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('message', formValue.message);
    formData.append('id_vk', JSON.stringify(checkedID_VK));
    files.map(file => {
      formData.append('file', file.blobFile);
    });

    sendMessage(formData);
  };

  useEffect(() => {
    setSendTo(checkedUsers.map(user => user.name).join(', ') || 'Пожалуйста, выберите студента..');
  }, [checkedUsers]);

  return (
    <Modal backdrop="static" onClose={onClose} {...rest} size="xs">
      <Modal.Header>
        <Modal.Title>Отправить сообщение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid formValue={formValue} onChange={setFormValue} {...rest}>
          <Form.Group controlId="sendTo-9">
            <Form.ControlLabel>Отправить:</Form.ControlLabel>
            <Form.Control name="sendTo" value={sendTo} plaintext />
          </Form.Group>
          <Form.Group controlId="name-9">
            <Form.ControlLabel>Тема</Form.ControlLabel>
            <Form.Control name="title" />
            <Form.HelpText>Необходимый!</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="textarea-9">
            <Form.ControlLabel>Сообщения</Form.ControlLabel>
            <Form.Control rows={10} name="message" accepter={Textarea} />
          </Form.Group>
          <Form.Group controlId="file-10">
            <Form.ControlLabel>Загружать Файлы</Form.ControlLabel>
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
        <Button onClick={handleSendMessage} appearance="primary">
          Отправить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSendMessage;
