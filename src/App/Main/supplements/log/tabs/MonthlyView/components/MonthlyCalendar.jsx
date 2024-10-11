import React from "react";
import moment from "moment/moment"; // use luxon for everything else
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";

const localizer = momentLocalizer(moment);

const MonthlyCalendar = ({
  supplements,
  logs,
  setActiveItems,
  setActiveDay,
}) => {
  const suppsToDisplay = logs?.map((l) => ({
    ...l,
    title: supplements?.find((i) => i.id === l.supplementId)?.name,
    description: supplements?.find((i) => i.id === l.supplementId)?.description,
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
