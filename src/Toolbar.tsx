import React from 'react';
import { Navigate, ToolBarProps, CalendarTheme } from './types';
import { useCalendarContext } from './calendar-context';
import {
  Overrides,
  getToolBarOverride,
  getToolBarButtonOverride,
} from 'overrides';

const navigate: Navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};

export const Toolbar = ({
  localizer: { messages },
  label,
  onNavigate,
  overrides,
}: ToolBarProps & { overrides?: Overrides }) => {
  const { theme } = useCalendarContext();

  const { Root, style, className } = getToolBarOverride(overrides, {
    style: theme.toolBarStyle,
    className: theme.toolBarButtonsContainerClass,
  });

  if (Root) {
    return <Root {...{ localizer: { messages }, label, onNavigate }} />;
  }

  return (
    <div style={style}>
      <div className={className} role="group">
        <ToolbarButton
          theme={theme}
          overrides={overrides}
          onClick={() => onNavigate(navigate.TODAY)}
          message={messages.TODAY}
        />

        <ToolbarButton
          theme={theme}
          overrides={overrides}
          onClick={() => onNavigate(navigate.PREVIOUS)}
          message={messages.PREVIOUS}
        />

        <ToolbarButton
          theme={theme}
          overrides={overrides}
          onClick={() => onNavigate(navigate.NEXT)}
          message={messages.NEXT}
        />

        <button
          disabled
          className={theme.toolBarLabelClass}
          style={{ width: 110 }}
        >
          <span>{label}</span>
        </button>
      </div>
    </div>
  );
};

function ToolbarButton({
  message,
  onClick,
  overrides,
  theme,
}: { theme: CalendarTheme; message: string; onClick: () => void } & {
  overrides?: Overrides;
}) {
  const { Root, internalProps, className } = getToolBarButtonOverride(
    overrides,
    {
      className: theme.toolBarButtonClass,
    }
  );

  if (Root !== undefined) {
    return <Root message={message} onClicked={onClick} />;
  }

  return (
    <button className={className} onClick={onClick} {...internalProps}>
      {message}
    </button>
  );
}
