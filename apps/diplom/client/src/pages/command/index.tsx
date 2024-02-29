import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Command from './Command';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>Команда</h2>
          <Breadcrumb style={{ height: 'auto' }}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Команда</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Command />
    </Panel>
  );
};

export default Page;
