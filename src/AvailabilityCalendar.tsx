import React, { useState, useMemo, useEffect, useRef } from 'react';

// import { stringOrDate, NavigateAction, View } from "react-big-calendar";

import { Toolbar } from './Toolbar';

import {
  NavigateAction,
  AvailabilityCalendarProps,
  Range,
  defaultTheme,
} from './types';

import { MonthlyAvailabilityCalendar } from './MonthlyAvailabilityCalendar';
import {
  useCalendarContext,
  CalendarContextProvider,
} from './calendar-context';

const AvailabilityCalendarComp = ({
  initialDate,
  onAvailabilitySelected,
  blockOutPeriods,
  providerTimeZone,
  bookings,
  onCalRangeChange,
  slotLengthMs,
  slotStepMs,
  renderAvailSlots,
  renderDayCell,
  renderDayCells,
}: Omit<Omit<AvailabilityCalendarProps, 'moment'>, 'theme'>) => {
  const { moment, utils } = useCalendarContext();

  // const classes = useStyles();
  const [now] = useState<Date>(initialDate || new Date());
  const [calRange, setCalRange] = useState<Range>(utils.monthRangeForDate(now));
  const [date, setDate] = useState<Date>(now);

  const lastCalRange = useRef<Range | null>(null);

  useEffect(() => {
    if (lastCalRange.current !== calRange) {
      onCalRangeChange && onCalRangeChange(calRange);
      lastCalRange.current = calRange;
    }
  }, [calRange, onCalRangeChange]);

  const availabilities = useMemo<
    { startDate: Date; endDate: Date; resourceId: number }[]
  >(() => {
    const startAndEnd = utils.toStartAndEnd(calRange);
    return (
      // chunkify(
      utils
        .availabilitiesFromBookings(
          blockOutPeriods || [],
          providerTimeZone,
          bookings,
          now,
          startAndEnd.startDate,
          startAndEnd.endDate
        )
        // ,
        //   1.5 * 60 * 60 * 1000
        // )
        .filter(
          a =>
            a.endDate.getTime() - a.startDate.getTime() > 0.5 * 60 * 60 * 1000
        )
        .map(interval => ({
          resourceId: 2,
          startDate: new Date(interval.startDate),
          endDate: new Date(interval.endDate),
        }))
    );
  }, [bookings, providerTimeZone, calRange, now, blockOutPeriods, utils]);

  const handleOnNavigate = (navigate: NavigateAction) => {
    if (navigate === 'TODAY') {
      const today = new Date();
      setDate(today);
      setCalRange(utils.monthRangeForDate(today));
      return;
    }

    if (navigate !== 'NEXT' && navigate !== 'PREV') return;

    const newDate = moment(date)
      .add(navigate === 'NEXT' ? 1 : -1, 'month')
      .toDate();
    setDate(newDate);

    setCalRange(utils.monthRangeForDate(newDate));
  };

  return (
    <div>
      <Toolbar
        onNavigate={handleOnNavigate}
        label={utils.formatAsMonth(date)}
        localizer={{
          messages: { today: 'Today', previous: 'Previous', next: 'Next' },
        }}
      />
      <MonthlyAvailabilityCalendar
        availabilities={availabilities}
        date={date}
        onAvailabilitySelected={onAvailabilitySelected}
        slotLengthMs={slotLengthMs}
        slotStepMs={slotStepMs}
        renderAvailSlots={renderAvailSlots}
        renderDayCell={renderDayCell}
        renderDayCells={renderDayCells}
      />
    </div>
  );
};

export const AvailabilityCalendar = ({
  moment,
  theme,
  ...props
}: AvailabilityCalendarProps) => {
  return (
    <CalendarContextProvider
      moment={moment}
      theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
    >
      <AvailabilityCalendarComp {...props} />
    </CalendarContextProvider>
  );
};