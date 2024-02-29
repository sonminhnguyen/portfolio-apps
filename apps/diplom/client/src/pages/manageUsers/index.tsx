import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import ManageUsers from './ManageUsers';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h2>Управление пользователями</h2>
          <Breadcrumb style={{height: "auto"}}>
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Управление пользователями</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <ManageUsers />
    </Panel>
  );
};

export default Page;
