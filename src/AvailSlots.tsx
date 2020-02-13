import React, { useMemo } from 'react';
import {
  AvailSlotsProps,
  Booking,
  AvailabilityEvent,
  CalendarTheme,
} from './types';
import { createUtils } from './utils';
import { AvailSlot } from './AvailSlot';
import { Overrides, getAvailsOverride } from './overrides';

export const AvailSlots: React.SFC<AvailSlotsProps & {
  overrides?: Overrides;
}> = ({
  viewingDayAvailabilities,
  handleUnselect,
  onAvailabilitySelected,
  show,
  slotStepMs,
  slotLengthMs,
  utils,
  theme,
  overrides,
}) => {
  const { Root, style } = getAvailsOverride(overrides, {
    style: show ? theme.slotsContainerStyleShow : theme.slotsContainerStyleHide,
  });

  if (Root) {
    return (
      <Root
        {...{
          viewingDayAvailabilities,
          handleUnselect,
          onAvailabilitySelected,
          show,
          slotStepMs,
          slotLengthMs,
          utils,
          theme,
        }}
      />
    );
  }

  return (
    <div style={style}>
      {show && (
        <div className="mt-2 mr-1">
          <button
            type="button"
            className={theme.slotContainerCloseClass}
            aria-label="Close"
            style={{ outline: 'none' }}
            onClick={handleUnselect}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <AddBookingFromAvailabilitySlots
            theme={theme}
            durationMinutes={60}
            avails={viewingDayAvailabilities}
            onAvailabilitySelected={onAvailabilitySelected}
            slotLengthMs={slotLengthMs}
            slotStepMs={slotStepMs}
            utils={utils}
            overrides={overrides}
          />
          {viewingDayAvailabilities.length > 7 && (
            <button
              type="button"
              className={theme.slotContainerCloseClass}
              aria-label="Close"
              style={{ outline: 'none' }}
              onClick={handleUnselect}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const AddBookingFromAvailabilitySlots = ({
  avails,
  slotLengthMs,
  slotStepMs,
  onAvailabilitySelected,
  theme,
  utils,
  overrides,
}: {
  avails: Booking[];
  theme: CalendarTheme;
  durationMinutes: number;
  slotLengthMs?: number;
  slotStepMs?: number;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  utils: ReturnType<typeof createUtils>;
} & { overrides?: Overrides }) => {
  const { chunkify, msInHour, formatAsDate, formatAsDateJustTime } = utils;
  const slots = useMemo(
    () =>
      chunkify(
        avails.map(a => ({
          startDate: a.startDate,
          endDate: a.endDate,
        })),
        slotLengthMs || 1 * msInHour,
        slotStepMs || 0.5 * msInHour
      ),
    [avails, msInHour, chunkify, slotLengthMs, slotStepMs]
  );

  return (
    <div>
      <h4>{theme.requestAppointmentLabel}</h4>
      <h5>
        {avails && avails.length > 0 ? formatAsDate(avails[0].startDate) : ''}
      </h5>
      {slots.map((s, i) => (
        <AvailSlot
          key={'b_' + i}
          {...{
            theme,
            onAvailabilitySelected,
            s,
            formatAsDateJustTime,
            overrides,
          }}
        />
      ))}
    </div>
  );
};
