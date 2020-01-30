import React, { useMemo } from 'react';
import {
  RenderAvailProps,
  Booking,
  AvailabilityEvent,
  CalendarTheme,
} from './types';
import { createUtils } from './utils';

export const RenderAvailSlots: React.SFC<RenderAvailProps> = ({
  viewingDayAvailabilities,
  handleUnselect,
  onAvailabilitySelected,
  show,
  slotStepMs,
  slotLengthMs,
  utils,
  theme,
}) => {
  return (
    <div
      style={
        show ? theme.slotsContainerStyleShow : theme.slotsContainerStyleHide
      }
    >
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
          />
        </div>
      )}
    </div>
  );
};

export const AddBookingFromAvailabilitySlots = ({
  avails,
  // onAdded,
  slotLengthMs,
  slotStepMs,
  onAvailabilitySelected,
  theme,
  utils,
}: // durationMinutes //duration of the booking to create
{
  avails: Booking[];
  theme: CalendarTheme;
  durationMinutes: number;
  slotLengthMs?: number;
  slotStepMs?: number;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  utils: ReturnType<typeof createUtils>;
  // onAdded: () => any;
}) => {
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
      <h4>Request Appointment</h4>
      <h5>
        {avails && avails.length > 0 ? formatAsDate(avails[0].startDate) : ''}
      </h5>
      {slots.map((s, i) => (
        <div key={'b_' + i} style={{ marginBottom: 10 }}>
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
      ))}
    </div>
  );
};
