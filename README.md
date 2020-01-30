## Bootstrapped with [TSDX](https://github.com/palmerhq/tsdx)

![Annotation 2020-01-30 161832](https://user-images.githubusercontent.com/7076175/73495816-e9753600-437c-11ea-8db4-0ee1de264be4.png)

![Annotation 2020-01-30 161839](https://user-images.githubusercontent.com/7076175/73495817-e9753600-437c-11ea-9eef-5a2aa751ebf3.png)

# React Availability Calendar

A customizable React component for displaying booking availabilities on a calendar.

No `moment` dependency required, but accepts a `moment`-like prop that needs to implement a subset of `Moment`'s API.

## Props:

```js
export interface AvailabilityCalendarProps {
  moment: MomentCtrFunc;
  theme?: CalendarThemeProp;
  onCalRangeChange?: (range: Range) => any;
  providerTimeZone: string;
  bookings: Booking[];
  initialDate: Date | null;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  blockOutPeriods?: MsSinceMidnightRange[];
  slotLengthMs?: number;
  slotStepMs?: number;

  renderDayCell?: (p: RenderDayCellProps) => JSX.Element | null;
  renderDayCells?: (p: RenderDayCellsProps) => JSX.Element | null;
  renderAvailSlots?: (p: RenderAvailProps) => JSX.Element | null;
}
```

### Installation:

`npm install react-availability-calendar --save`

### Demos:

- [Live demo](https://nyura123.github.io/react-availability-calendar/)

### Usage:

```js
import {
  AvailabilityCalendar,
  AvailabilityEvent,
  MsSinceMidnightRange,
  Booking,
  Range,
} from 'react-availability-calendar';
import moment from 'moment';

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
      startDate: new Date(2020, 1, 1, 13),
      endDate: new Date(2020, 1, 1, 14),
    },
    {
      startDate: new Date(2020, 1, 1, 10, 30),
      endDate: new Date(2020, 1, 1, 11),
    },
  ];

  const providerTimeZone = 'America/New_York';

  return (
    <div>
      <AvailabilityCalendar
        bookings={bookings}
        providerTimeZone={providerTimeZone}
        moment={moment}
        initialDate={now}
        onAvailabilitySelected={onAvailabilitySelected}
        onCalRangeChange={onChangedCalRange}
        blockOutPeriods={blockOutPeriods}
      />
    </div>
  );
};
```

### Examples

- [Example](https://github.com/nyura123/react-availability-calendar/tree/master/examples/example1)

### Running an example

`cd example/example1`

`npm install`

`npm start`
