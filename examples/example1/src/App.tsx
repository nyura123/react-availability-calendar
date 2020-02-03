import React, { useMemo } from 'react';

import {
  AvailabilityCalendar,
  AvailabilityEvent,
  MsSinceMidnightRange,
  Booking,
  Range,
  defaultComponents,
} from 'react-availability-calendar';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';

const msInHour = 60 * 60 * 1000;

const App: React.FC = () => {
  const now = new Date();

  const onAvailabilitySelected = (a: AvailabilityEvent) =>
    console.log('Availability slot selected: ', a);

  const onChangedCalRange = (r: Range) =>
    console.log('Calendar range selected (fetch bookings here): ', r);

  const blockOutPeriods: MsSinceMidnightRange[] = [
    [0 * msInHour, 9 * msInHour],
    [19 * msInHour, 24 * msInHour],
  ];

  const bookings: Booking[] = [
    {
      startDate: new Date(2020, 2, 1, 19),
      endDate: new Date(2020, 2, 1, 20),
    },
    {
      startDate: new Date(2020, 2, 1, 16, 30),
      endDate: new Date(2020, 2, 1, 17),
    },
  ];

  const providerTimeZone = 'America/New_York';

  const overrides = useMemo(
    () => ({
      ...defaultComponents,
      // ToolBar: { Root: (p: any) => <div>{JSON.stringify(p)}</div> },
      DayCell: {
        style: (p: any) =>
          p.isSelected
            ? { transition: 'width 200ms, height 200ms', height: 60, width: 60 }
            : { transition: 'width 200ms, height 200ms' },
        className: (p: any) =>
          p.isSelected
            ? 'rounded-circle border-success'
            : 'rounded-circle border-secondary',
      },
    }),
    []
  );

  return (
    <div style={{ width: 350 }}>
      <AvailabilityCalendar
        bookings={bookings}
        providerTimeZone={providerTimeZone}
        moment={moment}
        initialDate={now}
        onAvailabilitySelected={onAvailabilitySelected}
        onCalRangeChange={onChangedCalRange}
        blockOutPeriods={blockOutPeriods}
        overrides={overrides}
      />
    </div>
  );
};

export default App;
