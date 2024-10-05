import React from "react";
import moment from "moment/moment"; // use luxon for everything else
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";

const localizer = momentLocalizer(moment);

const MonthlyCalendar = ({
  suppItems,
  suppLogs,
  setActiveItems,
  setActiveDay,
}) => {
  const suppsToDisplay = suppLogs?.map((l) => ({
    ...l,
    title: suppItems?.find((i) => i.id === l.supplementId)?.name,
    description: suppItems?.find((i) => i.id === l.supplementId)?.description,
  }));

  return (
    <ReactBigCalendar
      localizer={localizer}
      events={suppsToDisplay || []}
      startAccessor="date"
      endAccessor="date"
      titleAccessor="title"
      onNavigate={(date) => setActiveDay(date)}
      style={{ height: 500 }}
      messages={{
        showMore: (total, hiddenItems, allItems) => (
          <div
            style={{ cursor: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setActiveItems(allItems);
            }}
          >
            {`+${total} more`}
          </div>
        ),
      }}
    />
  );
};

export default MonthlyCalendar;
