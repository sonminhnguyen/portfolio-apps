import React, { useContext, useState } from 'react';
import { Popover, Whisper, Dropdown, IconButton, Table, CellProps } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import ModalEditRow from './ModalEditRow';
import { CommandContext } from './context';
import CommandCollections from "./CommandCollections";

const { Cell } = Table;

export const LinkCell = ({ rowData, dataKey, ...props }: CellProps) => (
  <Cell {...props} style={{ padding: 0 }}>
    {rowData.depth === 0 ? <></> :
      <div
        style={{
          padding: '15px',
          overflow: 'hidden',
          display: 'inline-block'
        }}
      >
        {rowData.file === "fileURL" ? <></> :
          JSON.parse(rowData[dataKey!]).map((link, i) => <a key={i} href={link} target="_blank" rel='noreferrer'>{`File${i}  `}</a>)
        }
      </div>
    }
  </Cell >
);

export const TestCell = ({ ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [database, setDatabase] = useContext<unknown | any>(CommandContext);


  const handleDeleteCollection = () => {
    const newDatabase = database.filter(data => data.id !== props.rowData.id);
    const updatedID = newDatabase.map(data => {
      if (data.id > props.rowData.id) {
        const updatedChilrenKey = data.children.map((child, i) => {
          return { ...child, id: (data.id - 1) * 100 + i + 1 };
        });
        const newData = { ...data, id: data.id - 1, children: updatedChilrenKey };
        return newData;
      }
      return data;
    });
    setDatabase(updatedID);
  };



  const handleAddRow = () => {
    const newDatabase = database.map(data => {
      if (data.id === props.rowData.id) {
        const children = [...data.children, {
          id: (props.rowData.id) * 100 + props.rowData.children.length + 1,
          label: 'ярлык',
          answer: 'Это ответ чат-бота',
          file: 'fileURL',
          depth: 1,
        }];

        const newData = { ...data, children };
        return newData;
      }
      return data;
    });
    setDatabase(newDatabase);
  };

  const handleDeleteRow = () => {
    const newDatabase = database.map(data => {
      const parentKey = Math.floor(props.rowData.id / 100);
      if (data.id === parentKey) {
        const children = data.children.filter(children => children.id !== props.rowData.id);
        const childrenUpdatedId = children.map(child => {
          if (child.id > props.rowData.id) {
            return { ...child, id: child.id - 1 };
          }
          return child;
        });

        const newData = { ...data, children: childrenUpdatedId };
        return newData;
      }
      return data;
    });
    setDatabase(newDatabase);
  };

  const handleEditRow = () => {
    setShowModal(true);
  };

  const renderMenuParent = ({ onClose, left, top, className }: any, ref) => {
    const handleSelect = eventKey => {
      onClose();
      if (eventKey === 1) {
        setShowCollection(true);
        console.log('change label command');
      } else if (eventKey === 2) {
        handleAddRow();
      } else if (eventKey === 3) {
        handleDeleteCollection();
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>Изменить ярлык</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Добавить ряд</Dropdown.Item>
          <Dropdown.Item eventKey={3}>Удалить коллекцию</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };


  const renderMenuChilren = ({ onClose, left, top, className }: any, ref) => {
    const handleSelect = eventKey => {
      onClose();
      if (eventKey === 1) {
        handleEditRow();
      } else if (eventKey === 2) {
        handleDeleteRow();
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>Изменить</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Удалить</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <>
      <Cell {...props} className="link-group">
        {props.rowData.depth === 0 ?
          <Whisper placement="autoVerticalEnd" trigger="click" speaker={renderMenuParent}>
            <IconButton appearance="subtle" icon={<MoreIcon />} />
          </Whisper>
          :
          <Whisper placement="autoVerticalEnd" trigger="click" speaker={renderMenuChilren}>
            <IconButton appearance="subtle" icon={<MoreIcon />} />
          </Whisper>
        }

      </Cell >
      <ModalEditRow rowData={props.rowData} open={showModal} onClose={() => setShowModal(false)} />
      <CommandCollections rowData={props.rowData} open={showCollection} onClose={() => setShowCollection(false)} />
    </>
  );
};