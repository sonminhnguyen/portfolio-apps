import React from 'react';
import ErrorPage from '@/components/ErrorPage';
import { IconButton } from 'rsuite';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';

export default () => (
  <ErrorPage code={500}>
    <p className="error-page-title">Ой… Вы только что нашли страницу с ошибкой</p>
    <p className="error-page-subtitle text-muted ">
      Сожалеем, но на нашем сервере произошла внутренняя ошибка
    </p>
    <IconButton icon={<ArrowLeftLine />} appearance="primary" href="/">
      Отведи меня домой{' '}
    </IconButton>
  </ErrorPage>
);
