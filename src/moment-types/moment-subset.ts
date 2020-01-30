declare function moment1(...args: any): MomentSubset;

export type MomentCtrFunc = typeof moment1;

type RelativeTimeKey =
  | 's'
  | 'ss'
  | 'm'
  | 'mm'
  | 'h'
  | 'hh'
  | 'd'
  | 'dd'
  | 'M'
  | 'MM'
  | 'y'
  | 'yy';
type CalendarKey =
  | 'sameDay'
  | 'nextDay'
  | 'lastDay'
  | 'nextWeek'
  | 'lastWeek'
  | 'sameElse'
  | string;
type LongDateFormatKey =
  | 'LTS'
  | 'LT'
  | 'L'
  | 'LL'
  | 'LLL'
  | 'LLLL'
  | 'lts'
  | 'lt'
  | 'l'
  | 'll'
  | 'lll'
  | 'llll';

interface Locale {
  calendar(key?: CalendarKey, m?: MomentSubset, now?: MomentSubset): string;

  longDateFormat(key: LongDateFormatKey): string;
  invalidDate(): string;
  ordinal(n: number): string;

  preparse(inp: string): string;
  postformat(inp: string): string;
  relativeTime(
    n: number,
    withoutSuffix: boolean,
    key: RelativeTimeKey,
    isFuture: boolean
  ): string;
  pastFuture(diff: number, absRelTime: string): string;
  set(config: Object): void;

  months(): string[];
  months(m: MomentSubset, format?: string): string;
  monthsShort(): string[];
  monthsShort(m: MomentSubset, format?: string): string;
  monthsParse(monthName: string, format: string, strict: boolean): number;
  monthsRegex(strict: boolean): RegExp;
  monthsShortRegex(strict: boolean): RegExp;

  week(m: MomentSubset): number;
  firstDayOfYear(): number;
  firstDayOfWeek(): number;

  weekdays(): string[];
  weekdays(m: MomentSubset, format?: string): string;
  weekdaysMin(): string[];
  weekdaysMin(m: MomentSubset): string;
  weekdaysShort(): string[];
  weekdaysShort(m: MomentSubset): string;
  weekdaysParse(weekdayName: string, format: string, strict: boolean): number;
  weekdaysRegex(strict: boolean): RegExp;
  weekdaysShortRegex(strict: boolean): RegExp;
  weekdaysMinRegex(strict: boolean): RegExp;

  isPM(input: string): boolean;
  meridiem(hour: number, minute: number, isLower: boolean): string;
}

interface Duration {
  clone(): Duration;

  humanize(withSuffix?: boolean): string;

  abs(): Duration;

  as(units: Base): number;
  get(units: Base): number;

  milliseconds(): number;
  asMilliseconds(): number;

  seconds(): number;
  asSeconds(): number;

  minutes(): number;
  asMinutes(): number;

  hours(): number;
  asHours(): number;

  days(): number;
  asDays(): number;

  weeks(): number;
  asWeeks(): number;

  months(): number;
  asMonths(): number;

  years(): number;
  asYears(): number;

  add(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;
  subtract(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;

  locale(): string;
  locale(locale: LocaleSpecifier): Duration;
  localeData(): Locale;

  toISOString(): string;
  toJSON(): string;

  isValid(): boolean;

  /**
   * @deprecated since version 2.8.0
   */
  lang(locale: LocaleSpecifier): MomentSubset;
  /**
   * @deprecated since version 2.8.0
   */
  lang(): Locale;
  /**
   * @deprecated
   */
  toIsoString(): string;
}

type Base =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms';

type _quarter = 'quarter' | 'quarters' | 'Q';
type _isoWeek = 'isoWeek' | 'isoWeeks' | 'W';
type _date = 'date' | 'dates' | 'D';
type DurationConstructor = Base | _quarter;

type StartOf = Base | _quarter | _isoWeek | _date | void; // null

type Diff = Base | _quarter;

interface MomentInputObject {
  years?: number;
  year?: number;
  y?: number;

  months?: number;
  month?: number;
  M?: number;

  days?: number;
  day?: number;
  d?: number;

  dates?: number;
  date?: number;
  D?: number;

  hours?: number;
  hour?: number;
  h?: number;

  minutes?: number;
  minute?: number;
  m?: number;

  seconds?: number;
  second?: number;
  s?: number;

  milliseconds?: number;
  millisecond?: number;
  ms?: number;
}

interface DurationInputObject extends MomentInputObject {
  quarters?: number;
  quarter?: number;
  Q?: number;

  weeks?: number;
  week?: number;
  w?: number;
}

interface FromTo {
  from: MomentInput;
  to: MomentInput;
}

type MomentInput =
  | MomentSubset
  | Date
  | string
  | number
  | (number | string)[]
  | MomentInputObject
  | void; // null | undefined

type MomentInputSubset =
  | MomentSubset
  | Date
  | string
  | number
  | (number | string)[]
  | MomentInputObject
  | void; // null | undefined

type DurationInputArg1 =
  | Duration
  | number
  | string
  | FromTo
  | DurationInputObject
  | void; // null | undefined
type DurationInputArg2 = DurationConstructor;
type LocaleSpecifier = string | MomentSubset | Duration | string[] | boolean;

export interface MomentSubset extends Object {
  format(format?: string): string;

  startOf(unitOfTime: StartOf): MomentSubset;
  endOf(unitOfTime: StartOf): MomentSubset;

  add(amount?: DurationInputArg1, unit?: DurationInputArg2): MomentSubset;

  diff(b: MomentInputSubset, unitOfTime?: Diff, precise?: boolean): number;

  toDate(): Date;
}

export const momentSubsetStub: MomentSubset = {
  format: (_format?: string) => {
    throw new Error('not implemented');
  },

  startOf: (_unitOfTime: StartOf) => {
    throw new Error('not implemented');
  },
  endOf: (_unitOfTime: StartOf) => {
    throw new Error('not implemented');
  },

  add: (_amount?: DurationInputArg1, _unit?: DurationInputArg2) => {
    throw new Error('not implemented');
  },

  diff: (_b: MomentInputSubset, _unitOfTime?: Diff, _precise?: boolean) => {
    throw new Error('not implemented');
  },

  toDate: () => {
    throw new Error('not implemented');
  },
};
