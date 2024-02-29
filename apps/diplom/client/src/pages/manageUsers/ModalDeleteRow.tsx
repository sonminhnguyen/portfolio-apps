import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { updateUsers } from '@/data/database';
import { ManageUsersContext } from './context';


const ModalDeteleRow = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [database, setDatabase] = useContext<unknown | any>(ManageUsersContext);

  const handleDelete = () => {
    onClose();
    const newDatabase = database.filter(data => data.id !== rowData.id);
    const updatedID = newDatabase.map(data => {
      if (data.id > rowData.id) {
        return { ...data, id: data.id - 1 };
      }
      return data;
    });
    console.log(updatedID);
    
    setDatabase(updatedID);
    updateUsers(updatedID);
  };

  return (
    <Modal onClose={onClose} {...rest}>
      <Modal.Header>
        <Modal.Title>Удалить пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить этого пользователя?</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete} appearance="primary">
          Да
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Нет
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeteleRow;