import React from 'react';
import {
  Overrides,
  getWeekdaysOverride,
  getWeekdayOverride,
} from './overrides';

const weekdays = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

export const Weekdays = ({ overrides }: { overrides?: Overrides }) => {
  const { Root, style } = getWeekdaysOverride(overrides, {
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

  const {
    Root: RootWeekday,
    className: classNameWeekday,
    style: styleWeekday,
  } = getWeekdayOverride(overrides, {
    className: 'border border-default',
    style: {
      width: 50,
      height: 50,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <div style={style}>
      {weekdays.map(weekday =>
        RootWeekday ? (
          <RootWeekday weekday={weekday} />
        ) : (
          <div className={classNameWeekday} key={weekday} style={styleWeekday}>
            {weekday}
          </div>
        )
      )}
    </div>
  );
};
