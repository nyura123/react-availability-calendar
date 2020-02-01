import React from 'react';
import { RenderDayCellsProps } from './types';
import { RenderDayCell } from './render-day-cell';
import { Overrides, getDayCellsOVerride } from 'overrides';

export function RenderDayCells({
  week,
  selectedDate,
  weekIndexInCalRange,
  handleSelected,
  availsByIndex,
  moment,
  utils,
  theme,
  overrides,
}: RenderDayCellsProps & { overrides?: Overrides }) {
  const { Root, style } = getDayCellsOVerride(overrides, {
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
  });

  if (Root) {
    return (
      <Root
        {...{
          week,
          selectedDate,
          weekIndexInCalRange,
          handleSelected,
          availsByIndex,
          moment,
          utils,
          theme,
        }}
      />
    );
  }

  return (
    <div style={style}>
      {week.map((d, j) => (
        <RenderDayCell
          {...{
            date: d,
            selectedDate,
            weekIndexInCalRange,
            dayIndexInWeek: j,
            handleSelected,
            availsByIndex,
            moment,
            utils,
            theme,
            overrides,
          }}
        />
      ))}
    </div>
  );
}
