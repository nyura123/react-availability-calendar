import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';

import { useAsyncHandler } from '../hooks';

import { SimpleLoadingOVerlay } from './LoadingOverlay';
import {
  AvailabilityCalendar,
  createUtils,
  Range,
  MsSinceMidnightRange,
  AvailabilityEvent,
  defaultComponents,
} from 'react-availability-calendar';
import { RequestModal } from './RequestModal';
import { api, Api } from '../api';

import moment from 'moment';
import { Overrides } from 'react-availability-calendar/dist/overrides';

const { msInHour } = createUtils(moment);

const msInDay = 24 * 60 * 60 * 1000;

function toStartAndEnd(range: Range) {
  const res = {
    startDate:
      (range as {
        start: Date;
      }).start || (range as Date[])[0],
    endDate:
      (range as {
        end: Date;
      }).end || (range as Date[])[(range as Date[]).length - 1],
  };
  if (res.startDate.getTime() === res.endDate.getTime()) {
    res.endDate = new Date(res.endDate.getTime() + msInDay);
  }
  return res;
}

export const blockOutPeriods: MsSinceMidnightRange[] = [
  [0 * msInHour, 9 * msInHour],
  [19 * msInHour, 24 * msInHour],
];

export const Cal = ({ calId }: { calId: string }) => {
  // const classes = useStyles();
  const [now] = useState<Date>(new Date());
  const [avails, setAvails] = useState<AvailabilityEvent[]>([]);
  const [bookingsVersion, setBookingsVersion] = useState<number>(1);

  const fetchBookings = useCallback(async (api, calRange) => {
    const res = await (api as Api).getBookings({
      calId,
      ...toStartAndEnd(calRange),
    });
    setAvails(res.avails);
  }, []);

  const {
    handlerWrapper: fetchBookingsWrapper,
    loading: fetchBookingsInProgress,
    // error: fetchBookingsError
  } = useAsyncHandler(fetchBookings);

  const lastCalRange = useRef<Range | null>(null);

  useEffect(() => {
    if (lastCalRange.current) {
      fetchBookingsWrapper(api, lastCalRange.current);
    }
  }, [bookingsVersion, fetchBookingsWrapper]);

  const onChangedCalRange = (calRange: Range) => {
    lastCalRange.current = calRange;
    fetchBookingsWrapper(api, calRange);
  };

  const [
    showRequestFromAvailability,
    setShowRequestFromAvailability,
  ] = useState<AvailabilityEvent | null>(null);

  const onAvailabilitySelected = useCallback(
    (avail: AvailabilityEvent) => {
      // setBookingsVersion(version => version + 1);
      setShowRequestFromAvailability(avail);
    },
    [setShowRequestFromAvailability]
  );

  const closeRequestModal = useCallback(() => {
    setShowRequestFromAvailability(null);
  }, [setShowRequestFromAvailability]);

  const handleRequested = useCallback(() => {
    closeRequestModal();
    setBookingsVersion(v => v + 1);
  }, [setBookingsVersion, closeRequestModal]);

  const overrides = useMemo<Overrides>(
    () => ({
      ...defaultComponents,
      DayCell: {
        style: p =>
          p.isSelected
            ? { transition: 'width 200ms, height 200ms', height: 60, width: 60 }
            : { transition: 'width 200ms, height 200ms' },
      },
    }),
    []
  );

  const empty = useRef([]);

  return (
    <div>
      <div>
        <AvailabilityCalendar
          bookings={empty.current}
          providerTimeZone={''}
          avails={avails}
          moment={moment}
          initialDate={now}
          onAvailabilitySelected={onAvailabilitySelected}
          onCalRangeChange={onChangedCalRange}
          blockOutPeriods={blockOutPeriods}
          overrides={overrides}
        />
        {fetchBookingsInProgress && <SimpleLoadingOVerlay />}
      </div>
      <RequestModal
        calId={calId}
        show={!!showRequestFromAvailability}
        handleClose={closeRequestModal}
        availability={showRequestFromAvailability}
        onRequested={handleRequested}
      />
    </div>
  );
};
