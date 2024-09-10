import React, { useEffect, useContext } from "react";
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import { Segment } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import moment from "moment/moment"; // use luxon for everything else
import ActivityContext from "../context/activityContext";

const localizer = momentLocalizer(moment);

// const testActivities = [
//   { start: "2024-09-09", title: "test" },
//   { start: "2024-09-09", title: "test" },
// ];

const Calendar = () => {
  const { activities, activitiesLoading, getActivities } =
    useContext(ActivityContext);

  useEffect(() => {
    if (!activities && !activitiesLoading) getActivities();
  });

  return (
    <Segment>
      {activitiesLoading && <Spinner />}
      <ReactBigCalendar
        localizer={localizer}
        // events={testActivities}
        event={activities}
        startAccessor="start"
        endAccessor="start"
        titleAccessor="title"
        style={{ height: 500 }}
      />
    </Segment>
  );
};

export default Calendar;
