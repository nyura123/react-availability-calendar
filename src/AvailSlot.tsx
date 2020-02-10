import React from 'react';
import { AvailSlotProps } from './types';
import { Overrides, getAvailOverride } from './overrides';

export function AvailSlot({
  theme,
  onAvailabilitySelected,
  s,
  formatAsDateJustTime,
  overrides,
}: AvailSlotProps & { overrides?: Overrides }) {
  const { Root, className, style } = getAvailOverride(
    overrides,
    {
      className: theme.slotButtonClass,
      style: { minWidth: 200 },
    },
    { date: s.startDate }
  );

  if (Root) {
    return (
      <Root
        {...{
          theme,
          onAvailabilitySelected,
          s,
          formatAsDateJustTime,
        }}
      />
    );
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        className={className}
        disabled={false}
        // variant="contained"
        style={style}
        onClick={() =>
          onAvailabilitySelected({
            startDate: new Date(s.startDate),
            endDate: new Date(s.endDate),
          })
        }
      >
        {formatAsDateJustTime(new Date(s.startDate))}
      </button>
    </div>
  );
}
