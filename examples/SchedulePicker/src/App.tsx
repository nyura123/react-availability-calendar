import React, { useMemo, useState } from 'react';

import {
  AvailabilityCalendar,
  AvailabilityEvent,
  MsSinceMidnightRange,
  defaultTheme,
  Booking,
  Range,
  Overrides,
  defaultComponents,
  AvailSlot,
  CalendarTheme,
} from 'react-availability-calendar';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';

const msInHour = 60 * 60 * 1000;

const App: React.FC = () => {
  const now = new Date();

  const [selectedAvails, setSelectedAvails] = useState<{
    [key: number]: AvailabilityEvent | null;
  }>({});

  const onAvailabilitySelected = (a: AvailabilityEvent) => {
    console.log('Availability slot selected: ', a);
    const startMs = a.startDate.getTime();
    const wasSelected = !!selectedAvails[startMs];
    setSelectedAvails(selectedAvails => ({
      ...selectedAvails,
      [startMs]: wasSelected ? null : a,
    }));
  };

  const daysWithAvailabilities = useMemo(() => {
    const days = {};
    const daysAsAny = days as any;
    for (const ms of Object.keys(selectedAvails)) {
      const avail = (selectedAvails as any)[ms];
      console.log('MS for ', ms, { selectedAvails });
      const dayMs = moment(+ms)
        .startOf('day')
        .toDate()
        .getTime();
      if (avail) {
        if (!daysAsAny[dayMs]) {
          daysAsAny[dayMs] = [];
        }
        daysAsAny[dayMs].push(avail);
      }
    }
    console.log('DAYS', days);
    return days;
  }, [selectedAvails]);

  const onChangedCalRange = (r: Range) =>
    console.log('Calendar range selected (fetch bookings here): ', r);

  const providerTimeZoneForBlockOutHours = 'America/New_York';
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

  // Optional overrides to tweak appearance of various components
  const overrides = useMemo<Overrides>(
    () => ({
      ...defaultComponents,
      // ToolBar: { Root: (p: any) => <div>{JSON.stringify(p)}</div> },
      ToolBar: {
        className: 'border btn-group',
        style: { minHeight: undefined },
      },
      ToolBarButton: {
        className: 'btn btn-outline-info',
        style: { outline: 'none' },
      },
      Weekday: {
        style: {
          borderWidth: 0,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderColor: '#dddddd',
        },
        className: 'none',
      },
      AvailSlot: {
        className: p =>
          (selectedAvails as any)[p.date.getTime()]
            ? 'btn btn-success'
            : 'btn btn-primary',
      },
      DayCell: {
        style: p =>
          p.isSelected
            ? { transition: 'width 200ms, height 200ms', height: 60, width: 60 }
            : { transition: 'width 200ms, height 200ms' },
        className: p =>
          (daysWithAvailabilities as any)[p.date.getTime()]
            ? 'rounded-circle border-success'
            : p.isSelected || p.hasAvail
            ? 'rounded-circle border-primary'
            : 'rounded-circle border-default',
      },
    }),
    [selectedAvails, daysWithAvailabilities]
  );

  const handleCandidateSelected = (a: AvailabilityEvent) => {
    console.log('CANDIDATE a cliecked', a);
  };

  return (
    <div className="row">
      <div className="col">
        <div style={{ width: 350 }}>
          <AvailabilityCalendar
            bookings={bookings}
            providerTimeZone={providerTimeZoneForBlockOutHours}
            moment={moment}
            initialDate={now}
            onAvailabilitySelected={onAvailabilitySelected}
            onCalRangeChange={onChangedCalRange}
            blockOutPeriods={blockOutPeriods}
            overrides={overrides}
          />
        </div>
      </div>
      <div className="col">
        SUMMARy
        {Object.keys(daysWithAvailabilities).map((k, i) => (
          <SelectedSlotsForDay
            key={'ca_' + i}
            onAvailabilitySelected={handleCandidateSelected}
            theme={defaultTheme}
            avails={(daysWithAvailabilities as any)[k]}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

const SelectedSlotsForDay = ({
  avails,
  theme,
  onAvailabilitySelected,
}: {
  avails: Booking[];
  theme: CalendarTheme;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
}) => {
  const formatAsDateJustTime = (d: Date) => moment(d).format('h:mma');

  return (
    <>
      <h5>
        {avails && avails.length > 0
          ? moment(avails[0].startDate).format('ddd, MMM Do YYYY')
          : ''}
      </h5>
      {avails.map((s, i) => (
        <AvailSlot
          key={'b_' + i}
          {...{
            theme,
            onAvailabilitySelected,
            s,
            formatAsDateJustTime,
          }}
        />
      ))}
    </>
  );
};
