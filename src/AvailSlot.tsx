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
  const { Root, style } = getAvailOverride(overrides, {
    style: { marginBottom: 10 },
  });

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
    <div style={style}>
      <button
        className={theme.slotButtonClass}
        disabled={false}
        // variant="contained"
        style={{ minWidth: 200 }}
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
