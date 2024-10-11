import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import { DateTime } from "luxon";
import ItemsModal from "./components/ItemsModal";
import MonthlyCalendar from "./components/MonthlyCalendar";
import HeatMap from "./components/HeatMap";
import { connect } from "react-redux";

const MonthlyView = ({ supplements, logs }) => {
  const [activeItems, setActiveItems] = useState(null);
  const [activeDay, setActiveDay] = useState(DateTime.now().toJSDate());

  const activeMonth = DateTime.fromJSDate(activeDay).month;
  const activeYear = DateTime.fromJSDate(activeDay).year;

  return (
    <Segment>
      <ItemsModal
        activeItems={activeItems}
        handleClose={() => setActiveItems(null)}
      />
      <MonthlyCalendar
        supplements={supplements}
        logs={logs}
        setActiveItems={setActiveItems}
        setActiveDay={setActiveDay}
      />
      <HeatMap
        supplements={supplements}
        logs={logs}
        activeMonth={activeMonth}
        activeYear={activeYear}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements.supplements,
    logs: state.supplements.logs,
  };
}

export default connect(mapStateToProps)(MonthlyView);
