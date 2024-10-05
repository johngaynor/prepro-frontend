import React, { useState, useContext } from "react";
import { Segment } from "semantic-ui-react";
import SupplementContext from "../../context/supplementContext";
import { DateTime } from "luxon";
import ItemsModal from "./components/ItemsModal";
import MonthlyCalendar from "./components/MonthlyCalendar";
import HeatMap from "./components/HeatMap";

const MonthlyView = () => {
  const [activeItems, setActiveItems] = useState(null);
  const [activeDay, setActiveDay] = useState(DateTime.now().toJSDate());
  const { suppItems, suppLogs } = useContext(SupplementContext);

  const activeMonth = DateTime.fromJSDate(activeDay).month;
  const activeYear = DateTime.fromJSDate(activeDay).year;

  return (
    <Segment>
      <ItemsModal
        activeItems={activeItems}
        handleClose={() => setActiveItems(null)}
      />
      <MonthlyCalendar
        suppItems={suppItems}
        suppLogs={suppLogs}
        setActiveItems={setActiveItems}
        setActiveDay={setActiveDay}
      />
      <HeatMap
        suppItems={suppItems}
        suppLogs={suppLogs}
        activeMonth={activeMonth}
        activeYear={activeYear}
      />
    </Segment>
  );
};

export default MonthlyView;
