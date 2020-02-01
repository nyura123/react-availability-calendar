import React from 'react';
import { Overrides, getWeekdaysOVerride } from 'overrides';

const weekdays = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

export const RenderWeekdays = ({ overrides }: { overrides?: Overrides }) => {
  const { Root, style } = getWeekdaysOVerride(overrides, {
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
  });

  if (Root) {
    return <Root />;
  }

  return (
    <div style={style}>
      {weekdays.map(weekday => (
        <div
          className="border border-default"
          key={weekday}
          style={{
            height: 50,
            width: 50,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {weekday}
        </div>
      ))}
    </div>
  );
};
