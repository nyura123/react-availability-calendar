import React from 'react';
import { RenderAvailSlot } from './types';
import { Overrides, getAvailOverride } from 'overrides';

export function RenderAvailSlot({
  i,
  theme,
  onAvailabilitySelected,
  s,
  formatAsDateJustTime,
  overrides,
}: RenderAvailSlot & { overrides?: Overrides }) {
  const { Root, style } = getAvailOverride(overrides, {
    style: { marginBottom: 10 },
  });

  if (Root) {
    return (
      <Root
        {...{
          i,
          theme,
          onAvailabilitySelected,
          s,
          formatAsDateJustTime,
        }}
      />
    );
  }

  return (
    <div key={'b_' + i} style={style}>
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
