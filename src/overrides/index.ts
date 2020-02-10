import {
  DayCellProps,
  DayCellsProps,
  ToolBarProps,
  AvailSlotsProps,
  ToolBarButtonProps,
  AvailSlotProps,
} from '../types';
import {
  OverridableComponentProps,
  ResolvedOverride,
  getOverride,
} from './general';

const DefaultToolBar: OverridableComponentProps<ToolBarProps, {}, {}> = {};

const DefaultToolBarButton: OverridableComponentProps<
  ToolBarButtonProps,
  {},
  {}
> = {};

const DefaultWeekdays: OverridableComponentProps<{}, {}, {}> = {};
const DefaultWeekday: OverridableComponentProps<
  { weekday: string },
  {},
  {}
> = {};

const DefaultDayCells: OverridableComponentProps<DayCellsProps, {}, {}> = {};

const DefaultDayCell: OverridableComponentProps<
  DayCellProps,
  {},
  { date: Date; isSelected: boolean; hasAvail: boolean }
> = {};

const DefaultAvailabiliies: OverridableComponentProps<
  AvailSlotsProps,
  {},
  {}
> = {};

const DefaultAvailSlot: OverridableComponentProps<
  AvailSlotProps,
  {},
  { date: Date }
> = {};

// type ExtractComponentProps<
//   Overridable
// > = Overridable extends OverridableComponentProps<infer T, infer _U, infer _Z>
//   ? T
//   : never;
// type ExtractInternalProps<
//   Overridable
// > = Overridable extends OverridableComponentProps<infer _T, infer U, infer _Z>
//   ? U
//   : never;
type ExtractStyleProps<
  Overridable
> = Overridable extends OverridableComponentProps<infer _T, infer _U, infer Z>
  ? Z
  : never;

export const defaultComponents = {
  ToolBar: DefaultToolBar,
  ToolBarButton: DefaultToolBarButton,
  Weekdays: DefaultWeekdays,
  Weekday: DefaultWeekday,
  DayCells: DefaultDayCells,
  DayCell: DefaultDayCell,
  Availabilities: DefaultAvailabiliies,
  AvailSlot: DefaultAvailSlot,
};

export type Overrides = typeof defaultComponents;

// export function getOverride<Key extends keyof Overrides>(
//   key: Key,
//   overrides: Overrides | undefined,
//   props?: ExtractInternalProps<Overrides[Key]>,
//   style?: CSSProperties
// ): OverridableComponentProps<
//   ExtractComponentProps<Overrides[Key]>,
//   ExtractInternalProps<Overrides[Key]>
// > {
//   if (overrides === undefined) {
//     return { Component: undefined, style, props };
//   }

//   const o = overrides[key];

//   if (o === undefined) {
//     return { Component: undefined, style, props };
//   }

//   if (o.Component !== undefined) {
//     const Component = o.Component;
//     return { Component };
//   }

//   const oStyle = o.style;
//   if (oStyle !== undefined) {
//     const o2Style = oStyle;
//     if (typeof o2Style === 'function') {
//       const o3Style = o2Style;
//       //TODO
//     } else {
//       return {
//         Component: undefined,
//         style: { ...style, ...o2Style },
//         props: { ...props, ...o.props },
//       };
//     }
//   }

//   return { Component: undefined, style, props };
// }

// export function getOverride<Key extends keyof Overrides>(
//   key: Key,
//   overrides: Overrides | undefined,
//   defaultSpec: OverridableComponentProps<
//     ExtractComponentProps<Overrides[Key]>,
//     ExtractInternalProps<Overrides[Key]>,
//     ExtractStyleProps<Overrides[Key]>
//   >
// ): OverridableComponentProps<
//   ExtractComponentProps<Overrides[Key]>,
//   ExtractInternalProps<Overrides[Key]>,
//   ExtractStyleProps<Overrides[Key]>
// > {
//   type ComponentProps = ExtractComponentProps<Overrides[Key]>;

//   if (overrides === undefined || overrides[key] === undefined) {
//     return {
//       Component: undefined,
//       style: defaultSpec.style,
//       internalProps: defaultSpec.internalProps,
//     };
//   }

//   const o = overrides[key];

//   if (o.Component !== undefined) {
//     return { Component: o.Component };
//   }

//   return {
//     Component: undefined,
//     style: { ...defaultSpec.style, ...o.style },
//     internalProps: { ...defaultSpec.internalProps, ...o.internalProps },
//   };
// }

export function getToolBarOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultToolBar
): ResolvedOverride<ToolBarProps, {}> {
  const o = overrides ? overrides.ToolBar : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getToolBarButtonOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultToolBarButton
): ResolvedOverride<ToolBarButtonProps, {}> {
  const o = overrides ? overrides.ToolBarButton : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getWeekdaysOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultWeekdays
): ResolvedOverride<{}, {}> {
  const o = overrides ? overrides.Weekdays : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getWeekdayOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultWeekday
): ResolvedOverride<{ weekday: string }, {}> {
  const o = overrides ? overrides.Weekday : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getDayCellsOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultDayCells
): ResolvedOverride<DayCellsProps, {}> {
  const o = overrides ? overrides.DayCells : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getDayCellOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultDayCell,
  styleProps?: ExtractStyleProps<typeof DefaultDayCell>
): ResolvedOverride<DayCellProps, {}> {
  const o = overrides ? overrides.DayCell : undefined;
  return getOverride(o, defaultSpec, styleProps);
}

export function getAvailsOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultAvailabiliies
): ResolvedOverride<AvailSlotsProps, {}> {
  const o = overrides ? overrides.Availabilities : undefined;
  return getOverride(o, defaultSpec, {});
}

export function getAvailOverride(
  overrides: Overrides | undefined,
  defaultSpec: typeof DefaultAvailSlot,
  styleProps?: ExtractStyleProps<typeof DefaultAvailSlot>
): ResolvedOverride<AvailSlotProps, {}> {
  const o = overrides ? overrides.AvailSlot : undefined;
  return getOverride(o, defaultSpec, styleProps);
}
