import { MomentCtrFunc } from './moment-types/moment-subset';
import { createUtils } from './utils';
import { CSSProperties } from 'react';

export interface CalendarTheme {
  dayClassBase: string;
  dayClassSelected: string;
  dayClassHasAvailability: string;
  dayClassDefault: string;

  slotsContainerStyleShow: CSSProperties;
  slotsContainerStyleHide: CSSProperties;
  slotContainerCloseClass: string;
  slotButtonClass: string;

  toolBarStyle: CSSProperties;
  toolBarButtonsContainerClass: string;
  toolBarButtonClass: string;
  toolBarLabelClass: string;

  requestAppointmentLabel: string;
}

export interface CalendarThemeProp {
  dayClassBase?: string;
  dayClassSelected?: string;
  dayClassHasAvailability?: string;
  dayClassDefault?: string;

  slotsContainerStyleShow?: CSSProperties;
  slotsContainerStyleHide?: CSSProperties;
  slotContainerCloseClass?: string;
  slotButtonClass?: string;

  toolBarStyle?: CSSProperties;
  toolBarButtonsContainerClass?: string;
  toolBarButtonClass?: string;
  toolBarLabelClass?: string;

  requestAppointmentLabel?: string;
}

export const defaultTheme: CalendarTheme = {
  dayClassBase: 'rounded-circle',
  dayClassSelected: 'border-primary',
  dayClassHasAvailability: 'border-info',
  dayClassDefault: 'border border-default',

  slotsContainerStyleShow: {
    transition: 'transform 300ms',
    transform: 'scale(1)',
  },
  slotsContainerStyleHide: {
    transition: 'transform 300ms',
    transform: 'scale(0)',
  },
  slotContainerCloseClass: 'close',
  slotButtonClass: 'btn btn-primary',

  toolBarStyle: {
    flexWrap: 'nowrap',
    width: '100%',
    minHeight: 50,
  },
  toolBarButtonsContainerClass: 'border btn-group w-100',
  toolBarButtonClass: 'btn',
  toolBarLabelClass: 'btn btn-link',

  requestAppointmentLabel: 'Request Appointment',
};

export interface AvailabilityEvent {
  startDate: Date;
  endDate: Date;
}

export interface Booking {
  startDate: Date;
  endDate: Date;
}

export type NavigateAction = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';
export interface Navigate {
  [key: string]: NavigateAction;
}

export interface ToolBarProps {
  label: string;
  onNavigate: (action: NavigateAction) => any;
  localizer: { messages: { [key: string]: string } };
}

export interface ToolBarButtonProps {
  message: string;
  onClicked: () => void;
}

type stringOrDate = string | Date;

export type Range = Date[] | { start: stringOrDate; end: stringOrDate };

export interface AvailabilityCalendarProps {
  moment: MomentCtrFunc;
  excludeWeekends?: boolean;
  excludeFn?: (date: Date) => boolean;
  theme?: CalendarThemeProp;
  onCalRangeChange?: (range: Range) => any;
  providerTimeZone: string;
  bookings: Booking[];
  avails?: AvailabilityEvent[];
  initialDate: Date | null;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  onDaySelected?: (d: Date | null) => any;
  blockOutPeriods?: MsSinceMidnightRange[];
  slotLengthMs?: number;
  slotStepMs?: number;
}

export interface MonthlyAvailabilityCalendarProps {
  availabilities: AvailabilityEvent[];
  excludeWeekends?: boolean;
  excludeFn?: (date: Date) => boolean;
  date: Date;
  style?: CSSProperties;
  onDaySelected?: (d: Date | null) => any;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  slotLengthMs?: number;
  slotStepMs?: number;
}

export interface DayCellProps {
  selectedDate: Date | null;
  shouldDisplay: boolean;
  date: Date;
  dayIndexInWeek: number;
  weekIndexInCalRange: number;
  handleSelected: (d: Date) => any;
  availsByIndex: HasAvail[];
  moment: MomentCtrFunc;
  utils: ReturnType<typeof createUtils>;
  theme: CalendarTheme;
}

export interface DayCellsProps {
  week: Date[];
  date: Date;
  selectedDate: Date | null;
  weekIndexInCalRange: number;
  handleSelected: (date: Date) => void;
  availsByIndex: {
    hasAvail: boolean;
  }[];

  moment: MomentCtrFunc;
  utils: ReturnType<typeof createUtils>;
  theme: CalendarTheme;
}

export interface AvailSlotsProps {
  viewingDayAvailabilities: AvailabilityEvent[];
  handleUnselect: () => any;
  show: boolean;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  slotLengthMs?: number;
  slotStepMs?: number;

  utils: ReturnType<typeof createUtils>;
  theme: CalendarTheme;
}

export interface AvailSlotProps {
  theme: CalendarTheme;
  onAvailabilitySelected: (e: AvailabilityEvent) => any;
  s: AvailabilityEvent;
  formatAsDateJustTime: (date: Date) => string;
}

export interface HasAvail {
  hasAvail: boolean;
}

export interface Booking {
  id?: string;
  startDate: Date;
  endDate: Date;
  isBlockout?: boolean;
  resourceId?: number;
}

export type MsSinceMidnightRange = number[];
