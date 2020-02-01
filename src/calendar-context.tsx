import React, { useContext, useMemo } from 'react';
import { createUtils } from './utils';
import { CalendarTheme, defaultTheme } from './types';
import { MomentCtrFunc, momentSubsetStub } from './moment-types/moment-subset';

export interface CalendarContextValue {
  moment: MomentCtrFunc;
  utils: ReturnType<typeof createUtils>;
  theme: CalendarTheme;
}

export const CalendarContext = React.createContext<CalendarContextValue>({
  moment: () => momentSubsetStub,
  utils: createUtils(() => momentSubsetStub),
  theme: defaultTheme,
});

export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarContextProvider = ({ moment, theme, children }: any) => {
  const utils = useMemo(() => createUtils(moment), [moment]);

  return (
    <CalendarContext.Provider
      value={{
        moment,
        utils,
        theme,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
