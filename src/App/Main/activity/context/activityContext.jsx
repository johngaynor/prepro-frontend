import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(null);
  // loading states
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // get activities
  function getActivities() {
    setActivitiesLoading(true);
    apiCall("get", "/api/activity")
      .then((res) => {
        if (res.result) {
          setActivities(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting activities: ${err.message}`);
      })
      .finally(() => setActivitiesLoading(false));
  }

  return (
    <ActivityContext.Provider
      value={{ activities, activitiesLoading, getActivities }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
