import {
  Range,
  MsSinceMidnightRange,
  AvailabilityEvent,
  Booking,
} from '../types';
import { MomentCtrFunc } from '../moment-types/moment-subset';

export function createUtils(moment: MomentCtrFunc) {
  function intervalLengthMs(interval: AvailabilityEvent) {
    return interval.endDate.getTime() - interval.startDate.getTime();
  }

  function chunkify(
    intervals: AvailabilityEvent[],
    chunkLenMs: number,
    stepLenMs: number
    // shouldMerge = false
  ) {
    // const merged = shouldMerge ? mergeIntervals(intervals) : intervals;
    const res: AvailabilityEvent[] = [];
    for (const interval of intervals) {
      const endMs = interval.endDate.getTime();
      for (let ms = interval.startDate.getTime(); ms < endMs; ms += stepLenMs) {
        // const msRounded = Math.floor(ms / (msInHour / 2.0)) * (msInHour / 2.0);
        const msRounded = ms;
        const chunk = {
          startDate: new Date(msRounded),
          endDate: new Date(Math.min(endMs, msRounded + chunkLenMs)),
        };
        if (intervalLengthMs(chunk) >= chunkLenMs) {
          res.push(chunk);
        }
      }
      // if (res.length > 0 && intervalLengthMs(res[res.length - 1]) < chunkLenMs) {
      //   const last = res.pop();
      // if (res.length > 0) {
      //   // append the too-short last chunk to previous chunk if it's there
      //   res[res.length - 1].endDate = (last as Interval).endDate;
      // }
      // }
    }
    return res;
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const msInHour = 1 * 60 * 60 * 1000;

  function rotateMs(ms: number, msOffset: number) {
    msOffset =
      msOffset > 0 ? Math.min(msInDay, msOffset) : Math.max(-msInDay, msOffset);
    ms = Math.min(msInDay, Math.max(0, ms));
    const rotated = ms - msOffset;
    return rotated < 0 ? rotated + msInDay : rotated;
  }

  function rotateRangesByms(ranges: MsSinceMidnightRange[], msOffset: number) {
    // make sure ranges are not overlapping
    const shifted = ranges.map(r => [
      rotateMs(r[0], msOffset) % msInDay,
      rotateMs(r[1], msOffset) % msInDay,
    ]);

    // if the new "midnight" happens in the middle of a range, break it into 2
    const foldedRangeIndices = shifted
      .map((range, i) => (range[1] < range[0] ? i : -1))
      .filter(i => i >= 0);
    for (const foldedRangeIndex of foldedRangeIndices) {
      const foldedRange = shifted[foldedRangeIndex];
      shifted[foldedRangeIndex] = [-1, -1]; // mark for deletion (do not disturb indices)
      shifted.push([foldedRange[0], msInDay]); //start till midnight
      shifted.push([0, foldedRange[1]]); // beginning-of-day till end
    }

    const filtered = shifted.filter(r => r[0] >= 0);

    filtered.sort((a, b) => a[0] - b[0]);

    return filtered;
  }

  function calcOffsetFromProviderTimeZoneMs(
    localMs: number,
    providerTimeZone: string
  ) {
    if (!providerTimeZone) return 0;

    const localDate = new Date(localMs);

    var localDateInProviderTz = new Date(
      localDate.toLocaleString('en-US', {
        timeZone: providerTimeZone,
      })
    );
    const offsetRoundedToNearestHour =
      Math.floor(
        (localDateInProviderTz.getTime() - localDate.getTime()) / msInHour + 0.5
      ) * msInHour;

    return offsetRoundedToNearestHour;
  }

  const ms_in_hour = 60 * 60 * 1000;

  function roundToHour(ms: number) {
    return Math.floor(ms / msInHour) * msInHour;
  }

  function formatAsDate(date: Date) {
    return moment(date).format('ddd, MMM Do YYYY');
  }

  function formatAsDateWithTime(date: Date) {
    return moment(date).format('ddd, MMM Do h:mma');
  }

  function formatAsDateJustTime(date: Date) {
    return moment(date).format('h:mma');
  }

  function formatAsMonth(date: Date) {
    return moment(date).format('MMM YYYY');
  }

  function isWeekend(date: Date) {
    return [0, 6].indexOf(date.getDay()) >= 0;
  }

  function shouldIncludeDate(
    d: Date,
    excludeWeekends: boolean,
    excludeFn?: (date: Date) => boolean
  ) {
    return (!excludeWeekends || !isWeekend(d)) && (!excludeFn || !excludeFn(d));
  }

  function availByIndex(
    days: Date[],
    avails: AvailabilityEvent[],
    excludeWeekends: boolean,
    excludeFn?: (date: Date) => boolean
  ) {
    return (days || []).map(d => ({
      hasAvail:
        shouldIncludeDate(d, excludeWeekends, excludeFn) &&
        avails.some(a => datesEqual(a.startDate, d)),
    }));
  }

  function sameWeek(d1: Date, d2: Date) {
    return datesEqual(
      moment(d1)
        .startOf('week')
        .toDate(),
      moment(d2)
        .startOf('week')
        .toDate()
    );
  }

  function sameMonth(d1: Date, d2: Date) {
    return datesEqual(
      moment(d1)
        .startOf('month')
        .toDate(),
      moment(d2)
        .startOf('month')
        .toDate()
    );
  }

  function datesEqual(d1: Date, d2: Date) {
    return (
      d1 &&
      d2 &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function monthDaysForDate(date: Date) {
    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');
    const numDays = endOfWeek.diff(startOfWeek, 'days') + 1;

    const weeks = [];
    const days = [];
    const d = startOfWeek;

    const numWeeks = Math.floor(numDays / 7);
    for (let i = 0; i < numWeeks; ++i) {
      const w: Date[] = [];
      weeks.push(w);
      for (let j = 0; j < 7; ++j) {
        w.push(d.toDate());
        days.push(d.toDate());
        d.add(1, 'day');
      }
    }

    return { weeks, days };
  }

  function shouldHideWeek(
    selectedDate: Date | null,
    week: Date[],
    viewingDayAvailabilities: AvailabilityEvent[]
  ) {
    return (
      selectedDate &&
      !sameWeek(selectedDate, week[0]) &&
      viewingDayAvailabilities.length > 0
    );
  }

  function addBlockOutBookings(
    blockOutPeriods: MsSinceMidnightRange[],
    providerTimeZone: string,
    bookings: Booking[],
    localStart: Date, //client local start, might not be midnight
    localEnd: Date //client local end midnight
  ) {
    const res = [...bookings];
    const periodStartRoundedToDayMs = new Date(
      localStart.getFullYear(),
      localStart.getMonth(),
      localStart.getDate()
    ).getTime();
    const periodEndRoundedToDayMs = new Date(
      localEnd.getFullYear(),
      localEnd.getMonth(),
      localEnd.getDate()
    ).getTime();

    for (
      let i = periodStartRoundedToDayMs;
      i <= periodEndRoundedToDayMs;
      i = i + msInDay
    ) {
      const tzOffsetMs = calcOffsetFromProviderTimeZoneMs(i, providerTimeZone);
      const blockOutPeriodsTz = rotateRangesByms(blockOutPeriods, tzOffsetMs);
      for (const period of blockOutPeriodsTz) {
        res.push({
          startDate: new Date(i + period[0]),
          endDate: new Date(i + period[1]),
        });
      }

      // Ensure each availability is broken up at local EOD and doesn't span days
      res.push({
        startDate: new Date(i + msInDay - 1),
        endDate: new Date(i + msInDay),
      });
    }
    return res;
  }

  function availabilitiesFromBookings(
    blockOutPeriods: MsSinceMidnightRange[],
    providerTimeZone: string,
    bookings: Booking[],
    now: Date,
    periodStartArg: Date,
    periodEnd: Date
  ) {
    const periodStartMs = Math.max(
      roundToHour(now.getTime()) + ms_in_hour,
      periodStartArg.getTime()
    );
    const periodStart = new Date(periodStartMs);
    if (periodEnd.getTime() <= periodStart.getTime()) {
      return [];
    }
    const withBlockouts = addBlockOutBookings(
      blockOutPeriods,
      providerTimeZone,
      bookings,
      periodStart,
      periodEnd
    );
    const sorted = withBlockouts.sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
    // Mark the whole period available to start
    const res: AvailabilityEvent[] = [
      {
        startDate: periodStart,
        endDate: periodEnd,
      },
    ];
    for (const booking of sorted) {
      const lastAvailability = res[res.length - 1];
      const bookingStartMs = booking.startDate.getTime();
      const bookingEndMs = booking.endDate.getTime();
      if (
        !booking.startDate ||
        !booking.endDate ||
        bookingStartMs >= bookingEndMs
      ) {
        continue;
      }
      if (bookingStartMs < lastAvailability.startDate.getTime()) {
        // move lastAvailability start date to be past booking end
        lastAvailability.startDate = new Date(
          Math.max(lastAvailability.startDate.getTime(), bookingEndMs)
        );
      } else if (bookingStartMs < lastAvailability.endDate.getTime()) {
        const saveEndDate = lastAvailability.endDate;
        // cut off lastAvailability before booking start
        lastAvailability.endDate = new Date(bookingStartMs);
        if (bookingEndMs < saveEndDate.getTime()) {
          //create new availability after booking end
          res.push({ startDate: new Date(bookingEndMs), endDate: saveEndDate });
        }
      }
    }
    return res;
  }

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

  function monthRangeForDate(d: Date) {
    return {
      start: moment(d)
        .startOf('month')
        .toDate(),
      end: moment(d)
        .endOf('month')
        .toDate(),
    };
  }

  return {
    msInHour,
    datesEqual,
    formatAsMonth,
    sameMonth,
    formatAsDateWithTime,
    formatAsDateJustTime,
    formatAsDate,
    shouldHideWeek,
    availByIndex,
    addBlockOutBookings,
    availabilitiesFromBookings,
    toStartAndEnd,
    monthRangeForDate,
    monthDaysForDate,
    shouldIncludeDate,
    chunkify,
  };
}
