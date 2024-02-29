import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Solved from './Solved';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>Решено</h2>
          <Breadcrumb style={{ height: 'auto' }}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Требовать</Breadcrumb.Item>
            <Breadcrumb.Item active>Решено</Breadcrumb.Item>
            </Breadcrumb>
        </>
      }
    >
      <Solved />
    </Panel>
  );
};

export default Page;
