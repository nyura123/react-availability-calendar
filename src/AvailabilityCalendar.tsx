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
import { Overrides } from './overrides';

const AvailabilityCalendarComp = ({
  initialDate,
  onAvailabilitySelected,
  onDaySelected,
  blockOutPeriods,
  providerTimeZone,
  bookings,
  avails,
  onCalRangeChange,
  excludeFn,
  excludeWeekends,
  slotLengthMs,
  slotStepMs,
  overrides,
}: Omit<Omit<AvailabilityCalendarProps, 'moment'>, 'theme'> & {
  overrides?: Overrides;
}) => {
  const { moment, utils } = useCalendarContext();

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

  const availabilities = useMemo<{ startDate: Date; endDate: Date }[]>(() => {
    if (avails) return avails;

    const startAndEnd = utils.toStartAndEnd(calRange);
    return utils.availabilitiesFromBookings(
      blockOutPeriods || [],
      providerTimeZone,
      bookings,
      new Date() /*now*/,
      startAndEnd.startDate,
      startAndEnd.endDate
    );
  }, [
    avails,
    bookings,
    providerTimeZone,
    calRange,
    now,
    blockOutPeriods,
    utils,
  ]);

  const handleOnNavigate = (navigate: NavigateAction) => {
    if (navigate === 'TODAY') {
      const today = new Date();

      setDate(today);
      setCalRange(utils.monthRangeForDate(today));

      return;
    }

    if (navigate !== 'NEXT' && navigate !== 'PREV') {
      return;
    }

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
        overrides={overrides}
      />
      <MonthlyAvailabilityCalendar
        availabilities={availabilities}
        excludeFn={excludeFn}
        excludeWeekends={excludeWeekends}
        date={date}
        onAvailabilitySelected={onAvailabilitySelected}
        onDaySelected={onDaySelected}
        slotLengthMs={slotLengthMs}
        slotStepMs={slotStepMs}
        overrides={overrides}
      />
    </div>
  );
};

export const AvailabilityCalendar = ({
  moment,
  theme,
  ...props
}: AvailabilityCalendarProps & { overrides?: Overrides }) => {
  return (
    <CalendarContextProvider
      moment={moment}
      theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
    >
      <AvailabilityCalendarComp {...props} />
    </CalendarContextProvider>
  );
};
