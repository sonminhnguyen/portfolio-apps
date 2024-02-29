import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import InQueue from './InQueue';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>В очереди</h2>
          <Breadcrumb style={{ height: 'auto' }}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Требовать</Breadcrumb.Item>
            <Breadcrumb.Item active>В очереди</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <InQueue />
    </Panel>
  );
};

export default Page;
