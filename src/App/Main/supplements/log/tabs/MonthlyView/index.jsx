import React, { useState, useContext } from "react";
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import { Segment } from "semantic-ui-react";
import moment from "moment/moment"; // use luxon for everything else
import SupplementContext from "../../context/supplementContext";
import ItemsModal from "./components/ItemsModal";

const localizer = momentLocalizer(moment);

const MonthlyView = () => {
  const [activeItems, setActiveItems] = useState(null);
  const { suppItems, suppLogs } = useContext(SupplementContext);

  const suppsToDisplay = suppLogs?.map((l) => ({
    ...l,
    title: suppItems?.find((i) => i.id === l.supplementId)?.name,
    description: suppItems?.find((i) => i.id === l.supplementId)?.description,
  }));

  return (
    <Segment>
      <ItemsModal
        activeItems={activeItems}
        handleClose={() => setActiveItems(null)}
      />

      <ReactBigCalendar
        localizer={localizer}
        events={suppsToDisplay || []}
        startAccessor="date"
        endAccessor="date"
        titleAccessor="title"
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
    </Segment>
  );
};

export default MonthlyView;
