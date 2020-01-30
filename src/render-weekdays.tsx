import React from "react";

const weekdays = ["S", "M", "T", "W", "Th", "F", "Sa"];

export const renderWeekdays = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        flexDirection: "row"
      }}
    >
      {weekdays.map(weekday => (
        <div
          className="border border-default"
          key={weekday}
          style={{
            height: 50,
            width: 50,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {weekday}
        </div>
      ))}
    </div>
  );
};
