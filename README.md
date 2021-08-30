# [DEPRECATED] React Availability Calendar

## Note: this project is no longer actively maintained.

A customizable React component for displaying booking availabilities on a calendar.

![Annotation 2020-01-30 161832](https://user-images.githubusercontent.com/7076175/73586646-f32e9480-4475-11ea-9019-30fe9bd7abb9.png)

![Annotation 2020-01-30 161839](https://user-images.githubusercontent.com/7076175/73495817-e9753600-437c-11ea-9eef-5a2aa751ebf3.png)

No `moment` dependency required, but accepts a `moment`-like prop that needs to implement a subset of `Moment`'s API.

## DatePoll app built on top of this component

[DatePoll](https://datepoll.web.app/)

## Example installation

`yarn add react-availability-calendar moment bootstrap` (or `npm install`)

## typescript definitions included

## Props:

Provide bookings, from which avails will be derived, or `avails` directly

```js
export interface AvailabilityCalendarProps {
  moment: MomentCtrFunc;
  theme?: CalendarThemeProp;
  onCalRangeChange?: (range: Range) => any;
  providerTimeZone: string;
  bookings: Booking[];
  avails?: AvailabilityEvent[];
  initialDate: Date | null;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  onDaySelected?: (d: Date | null) => any;
  blockOutPeriods?: MsSinceMidnightRange[];
  excludeWeekends?: boolean;
  excludeFn?: (date: Date) => boolean;
  slotLengthMs?: number;
  slotStepMs?: number;
}
```

### Customize "Request Appointment" label:

pass `theme={{requestAppointmentLabel: "Request Booking or other wording"}}`

### Installation:

`npm install react-availability-calendar --save`

### Demos:

- [Live demo](https://nyura123.github.io/react-availability-calendar/)

### non-typescript example:

- [Example repo](https://github.com/nyura123/react-availability-calendar-example-js/)

### Usage:

```js
import React from 'react';

import {
  AvailabilityCalendar,
  AvailabilityEvent,
  MsSinceMidnightRange,
  Booking,
  Range,
  CalendarThemeProp,
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
      />
    </div>
  );
};

export default App;
```

## Customizability via overrides

````js
const overrides =
{
      ...defaultComponents,
      // ToolBar: { Root: (p: any) => <div>{JSON.stringify(p)}</div> },
      ToolBar: {
        className: "border btn-group",
        style: { minHeight: undefined }
      },
      ToolBarButton: {
        className: "btn btn-outline-info",
        style: { outline: "none" }
      },
      Weekday: {
        style: {
          borderWidth: 0,
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderColor: "#dddddd"
        },
        className: "none"
      },
      AvailSlot: {
        className: p =>
          myAvailSlotLogic(p.date)
            ? "btn btn-success"
            : "btn btn-outline-primary"
      },
      DayCell: {
        style: p =>
          p.isSelected
            ? { transition: "width 200ms, height 200ms", height: 60, width: 60 }
            : { transition: "width 200ms, height 200ms" },
        className: p =>
          myDayLogic(p.date)
            ? "rounded-circle border-success"
            : p.isSelected || p.hasAvail
            ? "rounded-circle border-primary"
            : "rounded-circle border-default"
      }
    };

// ...
      <AvailabilityCalendar overrides={overrides} {...restOfProps} />
// ...
    ```

### Examples

- [Example](https://github.com/nyura123/react-availability-calendar/tree/master/examples/example1)

### Running an example

`cd example/example1`

`npm install`

`npm start`

## Bootstrapped with [TSDX](https://github.com/palmerhq/tsdx)
````
