import React from "react";
import { RenderDayCellsProps } from "./types";
import { RenderDayCell } from "./render-day-cell";

export function RenderDayCells({
  week,
  selectedDate,
  weekIndexInCalRange,
  handleSelected,
  availsByIndex,
  renderDayCell,
  moment,
  utils,
  theme
}: RenderDayCellsProps) {
  renderDayCell = renderDayCell || RenderDayCell;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        flexDirection: "row"
      }}
    >
      {week.map(
        (d, j) =>
          renderDayCell &&
          renderDayCell({
            date: d,
            selectedDate,
            weekIndexInCalRange,
            dayIndexInWeek: j,
            handleSelected,
            availsByIndex,
            moment,
            utils,
            theme
          })
      )}
    </div>
  );
}
