import React from 'react';
import { Panel, Breadcrumb } from 'rsuite';
import Calendar from './Calendar';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>Календарь</h2>
          <Breadcrumb style={{ height: 'auto' }}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item active>Календарь</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Calendar />
    </Panel>
  );
};

export default Page;
