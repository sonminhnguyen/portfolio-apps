import { EventInput } from '@fullcalendar/react';
import uniqueId from 'lodash/uniqueId';
import { startOfMonth, addDays, format, endOfMonth } from 'date-fns';

const today = new Date();
const firstDay = startOfMonth(today);
const lastDay = endOfMonth(today);
const todayStr = format(today, 'yyyy-MM-dd');

// console.log(todayStr);

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: uniqueId(),
    title: '🎊 Стартовая встреча проекта',
    allDay: true,
    start: format(firstDay, 'yyyy-MM-dd'),
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '🎉 Запуск продукта',
    start: format(addDays(firstDay, 2), 'yyyy-MM-dd') + 'T10:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },

  {
    id: uniqueId(),
    title: 'Обучение продукту.',
    start: format(addDays(firstDay, 3), 'yyyy-MM-dd') + 'T10:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: 'Демонстрация продукта',
    start: format(addDays(firstDay, 3), 'yyyy-MM-dd') + 'T11:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: 'Экзамен продукта',
    start: format(addDays(firstDay, 3), 'yyyy-MM-dd') + 'T12:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },

  {
    id: uniqueId(),
    title: 'Мониторинг и оповещение о дизайне сервисов',
    start: format(addDays(firstDay, 5), 'yyyy-MM-dd') + 'T10:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: 'Мозговой штурм дизайн-системы',
    start: format(addDays(firstDay, 5), 'yyyy-MM-dd') + 'T11:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },

  {
    id: uniqueId(),
    title: 'Обзор тестового примера',
    start: format(addDays(firstDay, 15), 'yyyy-MM-dd') + 'T14:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: 'Обзор разработки разработки',
    start: format(addDays(firstDay, 15), 'yyyy-MM-dd') + 'T16:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },

  {
    id: uniqueId(),
    title: '💎 Встреча продукта',
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T10:30:00',
    message: null,
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '👨‍💻 Кодирование ',
    start: todayStr + 'T10:00:00',
    end: todayStr + 'T11:30:00',
    message: null,
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '📖 Подготовки руководящих кадров',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T14:00:00',
    message: null,
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '☕️ Послеобеденное чаепитие',
    start: todayStr + 'T14:00:00',
    end: todayStr + 'T16:00:00',
    message: null,
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: 'Интервью инженеров.',
    start: todayStr + 'T16:00:00',
    end: todayStr + 'T18:00:00',
    message: null,
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '🎉 Выпуск продукта',
    allDay: true,
    start: format(lastDay, 'yyyy-MM-dd') + 'T14:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  },
  {
    id: uniqueId(),
    title: '🔬 Принятие продукта',
    start: format(lastDay, 'yyyy-MM-dd') + 'T16:00:00',
    message: null,
    end: todayStr + 'T11:30:00',
    remindToGroup: null
  }
];
