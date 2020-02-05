import moment from 'moment';
import { Booking, RequestBookingParams } from '../models';

export async function throwResponseErrorIfAny(
  res: Response,
  messageAccessor = (m: any) => m.message
) {
  if (res.status >= 300) {
    let json = null;
    try {
      json = await (res.clone ? res.clone().json() : res.body);
    } catch (e) {
      console.log('Err json', e);
    }
    // console.log("ERROR JSON", json);
    throw json
      ? {
          statusText: res.statusText,
          status: res.status,
          message: messageAccessor(json) || json,
        }
      : {
          message: res.statusText || 'status ' + res.status,
        };
  }
}

interface ApiError {
  statusText: string;
  status: string;
  message: string;
}

export function apiErrorStr(e: ApiError | Error) {
  return e.message && typeof e.message === 'string'
    ? e.message
    : JSON.stringify(e);
}

// const apiUrl = "http://localhost:3002/api";
//const apiUrl = "https://plenary-shard-263303.firebaseapp.com";
// const apiUrl = "https://bookenstein.herokuapp.com/api";
const apiUrl = 'https://bookenstein-spadila.herokuapp.com/api';

export async function myFetch(url: string, init?: any): Promise<Response> {
  const options = {
    ...init,
    headers: { ...(init ? init.headers : {}) },
  };

  const res = await fetch(apiUrl + url, { ...options });
  await throwResponseErrorIfAny(res);
  return res.json();
}

interface StartEnd {
  start: string;
  end: string;
}
interface FreeBusyResponse {
  providerTimeZone: string;
  freeBusy: {
    calendars: {
      [calId: string]: {
        errors?: any;
        busy: StartEnd[];
      };
    };
  };
}

export class Api {
  db: any = null;

  getBookings = async ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }): Promise<{ providerTimeZone: string; bookings: Booking[] }> => {
    try {
      const booked = await ((myFetch(
        '/freeBusy/' + startDate.getTime() + '/' + endDate.getTime()
      ) as any) as Promise<FreeBusyResponse>);
      let bookings: Booking[] = [];
      for (const calId of Object.keys(booked.freeBusy.calendars)) {
        const cal = booked.freeBusy.calendars[calId];
        if (cal.errors) {
          throw apiErrorStr(
            new Error(
              'Error getting freeBusy from ' +
                calId +
                ': ' +
                JSON.stringify(cal.errors)
            )
          );
        }
        bookings = bookings.concat(
          cal.busy.map((item: StartEnd) => ({
            id: 'n/a',
            resourceId: 1,
            startDate: moment(item.start).toDate(),
            endDate: moment(item.end).toDate(),
          }))
        );
      }
      return {
        providerTimeZone: booked.providerTimeZone || 'America/New_York',
        bookings,
      };
    } catch (e) {
      throw apiErrorStr(e);
    }
  };

  requestBooking = async ({
    startDate,
    endDate,
    email,
    description,
    phone,
    name,
    message,
  }: RequestBookingParams) => {
    email = email || '';

    try {
      await myFetch('/requestBooking', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          startMs: startDate.getTime(),
          endMs: endDate.getTime(),
          attendee: { email, phone, name },
          description,
          message,
        }),
      });
      // return { startDate, endDate };
    } catch (e) {
      throw apiErrorStr(e);
    }
  };

  createApp = async ({
    providerEmail,
    providerName,
    providerCalendarId,
    providerTimeZone,
  }: {
    providerEmail: string;
    providerName: string;
    providerCalendarId: string;
    providerTimeZone: string;
  }) => {
    try {
      const result = await myFetch('/createApp', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          providerEmail,
          providerName,
          providerCalendarId,
          providerTimeZone,
        }),
      });
      return (result as any) as { app_id: string; app_secret: string };
      // return { startDate, endDate };
    } catch (e) {
      throw apiErrorStr(e);
    }
  };
}

export const api = new Api();
