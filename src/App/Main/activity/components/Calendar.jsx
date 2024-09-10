import React, { useEffect, useContext } from "react";
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import { Segment } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import moment from "moment/moment"; // use luxon for everything else
import ActivityContext from "../context/activityContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { activities, activitiesLoading, getActivities } =
    useContext(ActivityContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activities && !activitiesLoading) getActivities();
  }, [activities, activitiesLoading]);

  // changing colors of calendar items
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // default color

    switch (event.type) {
      case "workout":
        backgroundColor = "#0E6EB8";
        break;
      case "checkin":
        backgroundColor = "#016936";
        break;
      default:
        backgroundColor = "#909399";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  function handleClickItem(item) {
    switch (item.type) {
      case "checkin":
        navigate(`/checkins/${item.date}?report=false`);
        break;
      case "workout":
        navigate(`/fitness/log/${item.date}`);
        break;
      default:
        toast.error("Invalid calendar event type");
    }
  }

  return (
    <Segment>
      {activitiesLoading && <Spinner />}

      <ReactBigCalendar
        localizer={localizer}
        events={activities || []}
        startAccessor="date"
        endAccessor="date"
        titleAccessor="title"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(e) => handleClickItem(e)}
      />
    </Segment>
  );
};

export default Calendar;
