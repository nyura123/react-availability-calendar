import React, { useState, useMemo, useEffect } from 'react';

import { RenderWeekdays } from './render-weekdays';
import { MonthlyAvailabilityCalendarProps } from './types';

import { RenderAvailSlots } from './render-avail-slots';
import { RenderDayCells } from './render-day-cells';
import { useCalendarContext } from './calendar-context';
import { Overrides } from 'overrides';

export const MonthlyAvailabilityCalendar = ({
  availabilities,
  onAvailabilitySelected,
  slotLengthMs,
  slotStepMs,
  date,
  style,
  overrides,
}: MonthlyAvailabilityCalendarProps & { overrides?: Overrides }) => {
  const { moment, theme, utils } = useCalendarContext();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(null);
  }, [date]);

  const handleSelected = (date: Date) => {
    if (selectedDate && utils.datesEqual(date, selectedDate)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handleUnselect = () => {
    setSelectedDate(null);
  };

  const { days, weeks } = useMemo(() => utils.monthDaysForDate(date), [
    date,
    utils,
  ]);

  const availsByIndex = useMemo(
    () => utils.availByIndex(days, availabilities),
    [days, availabilities, utils]
  );

  const viewingDayAvailabilities = useMemo(() => {
    if (selectedDate !== null) {
      return (availabilities || []).filter(({ startDate }) =>
        utils.datesEqual(startDate, selectedDate)
      );
    } else {
      return [];
    }
  }, [selectedDate, availabilities, utils]);

  return (
    <div style={{ minHeight: 368, ...style }}>
      {/* render weekdays header */}
      <RenderWeekdays overrides={overrides} />

      {/* render each week in cal range */}
      {weeks.map((w, i) => {
        const showWeek = utils.shouldShowWeek(
          selectedDate,
          w,
          viewingDayAvailabilities
        );
        const hideWeek = utils.shouldHideWeek(
          selectedDate,
          w,
          viewingDayAvailabilities
        );
        return hideWeek ? null : (
          <React.Fragment key={'w_' + i}>
            <RenderDayCells
              {...{
                week: w,
                selectedDate,
                weekIndexInCalRange: i,
                handleSelected,
                availsByIndex,
                moment,
                utils,
                theme,
                overrides,
              }}
            />
            <RenderAvailSlots
              {...{
                show: showWeek,
                onAvailabilitySelected,
                viewingDayAvailabilities,
                handleUnselect,
                slotLengthMs,
                slotStepMs,
                utils,
                theme,
                overrides,
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
