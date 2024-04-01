import React, { useEffect, useState } from 'react';
import { EventInput } from '@fullcalendar/react';

import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
import EventModal from './EventModal';
// import ruLocale from '@fullcalendar/core/locales/ru';
// import { updateEvents } from '../../data/database';

import { INITIAL_EVENTS } from './event-utils';

import { getEvents } from '../../data/database';
// import { Button } from 'rsuite';

const Calendar = () => {
  const [database, setDatabase] = useState<EventInput[] | any>([]);
  const [editable, setEditable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [selectedDate, setSelectedDate] = useState<unknown | any>({});

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // console.log(selectInfo);
    setEditable(true);
    setSelectedDate(selectInfo);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // console.log(clickInfo);
    setEditable(true);
    setDeletable(true);
    setSelectedDate(clickInfo.event);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const { timeText, event } = eventContent;

    return (
      <>
        {timeText && (
          <>
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-time">{eventContent.timeText}</div>
          </>
        )}
        <div className="fc-event-title">{event.title}</div>
        {/* <Button className="fc-event-time" style={{float: "right"}} onClick={handleDelete}>
          X
        </Button> */}
      </>
    );
  };

  useEffect(() => {
    setDatabase(INITIAL_EVENTS);
    // getEvents().then(data => setDatabase(data));
  }, []);
  console.log(database)
  if (database.length !== 0) {
    return (
      <PageContent className="calendar-app">
        <FullCalendar
          locale="ru"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          weekends
          editable
          selectable
          selectMirror
          dayMaxEvents
          nextDayThreshold={'06:00:00'}
          events={database} // alternatively, use the `initialEvents` setting to static events
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
        />
        <EventModal
          database={database}
          setDatabase={setDatabase}
          selectedDate={selectedDate}
          open={editable}
          onClose={() => {
            setEditable(false);
            setDeletable(false);
          }}
          deletable={deletable}
        />
      </PageContent>
    );
  } else {
    return <></>;
  }
};

export default Calendar;
