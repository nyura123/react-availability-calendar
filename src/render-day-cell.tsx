import React from 'react';
import { RenderDayCellProps } from './types';
import { Overrides, getDayCellOVerride } from './overrides';

export const RenderDayCell = ({
  date,
  dayIndexInWeek,
  weekIndexInCalRange,
  availsByIndex,
  selectedDate,
  handleSelected,
  moment,
  utils,
  theme,
  overrides,
}: RenderDayCellProps & { overrides?: Overrides }) => {
  const { Root } = getDayCellOVerride(overrides, {});

  if (Root) {
    return (
      <Root
        {...{
          date,
          dayIndexInWeek,
          weekIndexInCalRange,
          availsByIndex,
          selectedDate,
          handleSelected,
          moment,
          utils,
          theme,
        }}
      />
    );
  }

  const dayIndexInCalRange = weekIndexInCalRange * 7 + dayIndexInWeek;

  return (
    <div
      key={'d_' + dayIndexInWeek}
      className={
        theme.dayClassBase +
        ' ' +
        (selectedDate && utils.datesEqual(date, selectedDate)
          ? theme.dayClassSelected
          : availsByIndex[dayIndexInCalRange].hasAvail
          ? theme.dayClassHasAvailability
          : theme.dayClassDefault)
      }
      style={{
        cursor: 'pointer',
        border:
          selectedDate && utils.datesEqual(date, selectedDate)
            ? '4px solid'
            : availsByIndex[dayIndexInCalRange].hasAvail
            ? '3px solid'
            : '',
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => handleSelected(date)}
    >
      {moment(date).format('D')}
    </div>
  );
};
