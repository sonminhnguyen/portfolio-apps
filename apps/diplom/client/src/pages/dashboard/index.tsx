import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Dashboard from './Dashboard';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>Главная Страница</h2>
          <Breadcrumb style={{height: "auto"}}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Главная Страница</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Dashboard />
    </Panel>
  );
};

export default Page;
