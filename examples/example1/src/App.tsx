import React, { useMemo, useState } from 'react';

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
import { Overrides } from 'react-availability-calendar/dist/overrides';

const msInHour = 60 * 60 * 1000;

// aka DayMode - which part of the day to display time slots for
type CalMode = 'allDay' | 'morning' | 'evening' | 'noon';

const App: React.FC = () => {
  const [selectedAvails, setSelectedAvails] = useState<{
    [key: number]: AvailabilityEvent | null;
  }>({});

  // for optional custom toolbar
  const [showCustomToolBar, setShowCustomToolBar] = useState(false);
  const [timeOfDayMode, setTimeOfDayMode] = useState<CalMode>('evening');
  const [lastSelectedDay, setLastSelectedDay] = useState<Date>(new Date());
  const [calVersion, setCalVersion] = useState(1);

  const onAvailabilitySelected = (a: AvailabilityEvent) => {
    console.log('Availability slot selected!: ', a);
    const startMs = a.startDate.getTime();
    const wasSelected = !!selectedAvails[startMs];
    setSelectedAvails((selectedAvails) => ({
      ...selectedAvails,
      [startMs]: wasSelected ? null : a,
    }));
  };
  // for optional custom toolbar
  const onDaySelected = (day: Date | null) => {
    setShowCustomToolBar(!!day);

    // to restore the next time calVersion upates
    if (day) {
      setLastSelectedDay(day);
    }
  };
  const handleCloseToolBar = () => {
    setShowCustomToolBar(false);

    // remount calendar to close the day view
    //(we're using version as "key" below)
    setCalVersion((version) => version + 1);
  };

  const onChangedCalRange = (r: Range) =>
    console.log('Calendar range selected (fetch bookings here): ', r);

  const providerTimeZoneForBlockOutHours = 'America/New_York';
  // const blockOutPeriods: MsSinceMidnightRange[] = [
  //   [0 * msInHour, 9 * msInHour],
  //   [19 * msInHour, 24 * msInHour],
  // ];
  const blockOutPeriods = blockOutsForCalMode(timeOfDayMode);

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
      AvailSlot: {
        className: (p) =>
          selectedAvails[p.date.getTime()]
            ? 'btn btn-secondary'
            : 'btn btn-primary',
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
      DayCell: {
        style: (p) =>
          p.isSelected
            ? { transition: 'width 200ms, height 200ms', height: 60, width: 60 }
            : { transition: 'width 200ms, height 200ms' },
        className: (p) => {
          const wasSelected = p.date.getTime() === lastSelectedDay.getTime();
          const additionalClassForWasSelected = wasSelected
            ? ' font-weight-bold'
            : '';
          return (
            (p.isSelected
              ? 'rounded-circle border-success'
              : p.hasAvail
              ? 'rounded-circle border-primary'
              : 'rounded-circle border-secondary') +
            additionalClassForWasSelected
          );
        },
      },
    }),
    [selectedAvails, lastSelectedDay]
  );

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div>
        <a href="https://github.com/nyura123/react-availability-calendar/tree/master/examples/example1">
          Code
        </a>
      </div>
      <div style={{ maxWidth: 350, maxHeight: 520, overflowY: 'auto' }}>
        <AvailabilityCalendar
          key={'cal_v' + calVersion}
          bookings={bookings}
          providerTimeZone={providerTimeZoneForBlockOutHours}
          moment={moment}
          initialDate={lastSelectedDay}
          onAvailabilitySelected={onAvailabilitySelected}
          onDaySelected={onDaySelected}
          onCalRangeChange={onChangedCalRange}
          blockOutPeriods={blockOutPeriods}
          overrides={overrides}
        />
      </div>
      <div
        className="shadow"
        style={{
          width: '100%',
          maxWidth: 350,
          backgroundColor: 'rgba(200, 200, 200, 1)',
          ...(showCustomToolBar ? styleShow : styleHide),
          top: 0,
          left: 0,
        }}
      >
        <CalModeToolbar calMode={timeOfDayMode} setCalMode={setTimeOfDayMode} />
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleCloseToolBar}
        >
          Close
        </button>
        {lastSelectedDay && (
          <div
            className="text-primary"
            style={{ float: 'right', paddingRight: 50 }}
          >
            <small>Selected:</small> {moment(lastSelectedDay).format('ddd, ll')}
          </div>
        )}
      </div>
    </div>
  );
};

// Optional example custom tool bar

const CalModeToolbar = ({
  calMode,
  setCalMode,
}: {
  calMode: CalMode;
  setCalMode: (c: CalMode) => any;
}) => (
  <div className="m-1 btn-group">
    <CalModeButton
      label="Morning"
      calModeTarget="morning"
      {...{ setCalMode, calMode }}
    />
    <CalModeButton
      label="Noon"
      calModeTarget="noon"
      {...{ setCalMode, calMode }}
    />
    <CalModeButton
      label="Evening"
      calModeTarget="evening"
      {...{ setCalMode, calMode }}
    />
    <CalModeButton
      label="All Day"
      calModeTarget="allDay"
      {...{ setCalMode, calMode }}
    />
  </div>
);

const CalModeButton = ({
  calMode,
  setCalMode,
  calModeTarget,
  label,
}: {
  calMode: CalMode;
  setCalMode: (c: CalMode) => any;
  calModeTarget: CalMode;
  label: string;
}) => (
  <button
    onClick={() => setCalMode(calModeTarget)}
    className={calModeBtnStyle(calMode, calModeTarget)}
  >
    {label}
  </button>
);

const styleShow = {
  position: 'absolute' as 'absolute',
  transition: 'transform 300ms',
  transform: 'scale(1)',
};
const styleHide = {
  position: 'absolute' as 'absolute',
  transition: 'transform 300ms',
  transform: 'scale(0)',
};

const calModeBtnStyle = (calModeSelected: CalMode, calModeTarget: CalMode) =>
  calModeSelected === calModeTarget
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-default';

const blockOutAllDay: MsSinceMidnightRange[] = [];

const blockOutMorning: MsSinceMidnightRange[] = [
  [0 * msInHour, 5 * msInHour],
  [12 * msInHour, 24 * msInHour],
];

const blockOutNoon: MsSinceMidnightRange[] = [
  [0 * msInHour, 12 * msInHour],
  [17 * msInHour, 24 * msInHour],
];

const blockOutEvening: MsSinceMidnightRange[] = [[0 * msInHour, 17 * msInHour]];

function blockOutsForCalMode(calMode: CalMode): MsSinceMidnightRange[] {
  switch (calMode) {
    case 'allDay':
      return blockOutAllDay;
    case 'morning':
      return blockOutMorning;
    case 'noon':
      return blockOutNoon;
    case 'evening':
      return blockOutEvening;

      return 'unhandled calMode' as never;
  }
}

export default App;
