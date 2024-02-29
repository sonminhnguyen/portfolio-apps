import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { updateStudents } from '@/data/database';
import { DashboardContext } from './context';

const ModalDeteleRow = (props: any) => {
  const { rowData, onClose, ...rest } = props;
  const [database, setDatabase] = useContext<unknown | any>(DashboardContext);

  const handleDelete = () => {
    onClose();
    const newDatabase = database.filter(data => data.id !== rowData.id);
    const updatedID = newDatabase.map(data => {
      if (data.id > rowData.id) {
        return { ...data, id: data.id - 1 };
      }
      return data;
    });
    setDatabase(updatedID);
    updateStudents(updatedID);
  };

  return (
    <Modal onClose={onClose} {...rest}>
      <Modal.Header>
        <Modal.Title>Удалить студента</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить этого студента?</Modal.Body>
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
