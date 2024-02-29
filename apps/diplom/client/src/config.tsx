import React from 'react';
import { Icon } from '@rsuite/icons';
import { VscCalendar, VscListUnordered } from 'react-icons/vsc';
import { MdDashboard } from 'react-icons/md';
import TaskIcon from '@rsuite/icons/Task';

export const appNavsAdmin = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Главная Страница',
    to: '/dashboard'
  },
  {
    eventKey: 'calendar',
    icon: <Icon as={VscCalendar} />,
    title: 'Календарь',
    to: '/calendar'
  },
  {
    eventKey: 'manageUsers',
    icon: <Icon as={VscCalendar} />,
    title: 'Управление пользователями',
    to: '/manageUsers'
  },
  {
    eventKey: 'require',
    icon: <Icon as={TaskIcon} />,
    title: 'Требовать',
    to: '/require',
    children: [
      {
        eventKey: 'inQueue',
        title: 'В Очереди',
        to: '/inqueue'
      },
      {
        eventKey: 'solved',
        title: 'Решено',
        to: '/solved'
      }
    ]
  },
  {
    eventKey: 'command',
    icon: <Icon as={VscListUnordered} />,
    title: 'Командный Чат-бот',
    to: '/command'
  },
  // {
  //   eventKey: 'authentication',
  //   title: 'Аутентификация',
  //   icon: <Icon as={MdFingerprint} />,
  //   children: [
  //     {
  //       eventKey: 'sign-in',
  //       title: 'Sign In',
  //       to: '/sign-in'
  //     },

  //     {
  //       eventKey: 'sign-up',
  //       title: 'Sign Up',
  //       to: '/sign-up'
  //     },

  //     {
  //       eventKey: 'error400',
  //       title: 'Error 404',
  //       to: '/error-404'
  //     },
  //     {
  //       eventKey: 'error500',
  //       title: 'Error 500',
  //       to: '/error-500'
  //     }
  //   ]
  // },
];
export const appNavsUser = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Главная Страница',
    to: '/dashboard'
  },
  {
    eventKey: 'calendar',
    icon: <Icon as={VscCalendar} />,
    title: 'Календарь',
    to: '/calendar'
  },
];
