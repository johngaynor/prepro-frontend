import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState(null);
  const [templates, setTemplates] = useState(null);
  // loading states
  const [checkInsLoading, setCheckInsLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // get check ins
  function getCheckIns() {
    setCheckInsLoading(true);
    apiCall("get", "/api/checkins")
      .then((res) => {
        if (res.result) {
          setCheckIns(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting check ins: ${err.message}`);
      })
      .finally(() => setCheckInsLoading(false));
  }

  // get templates
  function getTemplates() {
    setTemplatesLoading(true);
    apiCall("get", "/api/checkins/templates")
      .then((res) => {
        if (res.result) {
          setTemplates(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting check in templates: ${err.message}`);
      })
      .finally(() => setTemplatesLoading(false));
  }

  return (
    <CheckInContext.Provider
      value={{
        checkIns,
        checkInsLoading,
        getCheckIns,
        templates,
        templatesLoading,
        getTemplates,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
