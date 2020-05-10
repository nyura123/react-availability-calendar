import React, { useState, useMemo, useEffect } from 'react';

import { Weekdays } from './Weekdays';
import { MonthlyAvailabilityCalendarProps } from './types';

import { AvailSlots } from './AvailSlots';
import { DayCells } from './DayCells';
import { useCalendarContext } from './calendar-context';
import { Overrides } from './overrides';

export const MonthlyAvailabilityCalendar = ({
  availabilities,
  excludeWeekends,
  excludeFn,
  onAvailabilitySelected,
  onDaySelected,
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
    onDaySelected && onDaySelected(null);
  }, [date]);

  const handleSelected = (date: Date) => {
    if (selectedDate && utils.datesEqual(date, selectedDate)) {
      setSelectedDate(null);
      onDaySelected && onDaySelected(null);
    } else {
      setSelectedDate(date);
      onDaySelected && onDaySelected(date);
    }
  };

  const handleUnselect = () => {
    onDaySelected && onDaySelected(null);
    setSelectedDate(null);
  };

  const { days, weeks } = useMemo(() => utils.monthDaysForDate(date), [
    date,
    utils,
  ]);

  const availsByIndex = useMemo(
    () =>
      utils.availByIndex(
        days,
        availabilities,
        excludeWeekends || false,
        excludeFn
      ),
    [days, availabilities, utils]
  );

  const viewingDayAvailabilities = useMemo(() => {
    if (selectedDate !== null) {
      if (
        !utils.shouldIncludeDate(
          selectedDate,
          excludeWeekends || false,
          excludeFn
        )
      ) {
        return [];
      }
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
      <Weekdays overrides={overrides} />

      {/* render each week in cal range */}
      {weeks.map((w, i) => {
        const hideWeek = utils.shouldHideWeek(
          selectedDate,
          w,
          viewingDayAvailabilities
        );
        return hideWeek ? null : (
          <React.Fragment key={'w_' + i}>
            <DayCells
              {...{
                date,
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
          </React.Fragment>
        );
      })}

      <AvailSlots
        {...{
          show: !!selectedDate && viewingDayAvailabilities.length > 0,
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
    </div>
  );
};
