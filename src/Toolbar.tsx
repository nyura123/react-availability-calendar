import React from 'react';
import { Navigate, ToolBarProps } from './types';
import { useCalendarContext } from './calendar-context';

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
}: ToolBarProps) => {
  const { theme } = useCalendarContext();
  return (
    <div>
      <div style={theme.toolBarStyle}>
        <div className={theme.toolBarButtonsContainerClass} role="group">
          <button
            type="button"
            className={theme.toolBarButtonClass}
            onClick={() => onNavigate(navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            className={theme.toolBarButtonClass}
            onClick={() => onNavigate(navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            className={theme.toolBarButtonClass}
            onClick={() => onNavigate(navigate.NEXT)}
          >
            {messages.next}
          </button>
          <button
            disabled
            className={theme.toolBarLabelClass}
            style={{ width: 110 }}
          >
            <span>{label}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
