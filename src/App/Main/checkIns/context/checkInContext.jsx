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
  const [editLoading, setEditLoading] = useState(false);

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

  // update check ins
  function editCheckIns(values) {
    setEditLoading(true);
    apiCall("post", "/api/checkins", values)
      .then((res) => {
        setCheckIns(null);
        toast.success("Successfully edited check in!");
      })
      .catch((err) => {
        toast.error(`Error editing check ins: ${err.message}`);
        console.log(err);
      })
      .finally(() => setEditLoading(false));
  }

  // delete check ins
  function deleteCheckIns(id) {
    setEditLoading(true);
    apiCall("delete", `/api/checkins/checkin/${id}`)
      .then(() => {
        setCheckIns(null);
        toast.success("Successfully deleted check in!");
      })
      .catch((err) => {
        toast.error(`Error deleting check in: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
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

  // send attachments
  function addAttachments(formData) {
    setEditLoading(true);
    apiCall("post", "/api/checkins/attachments", formData)
      .then((res) => {
        // clear out odl attachments
        toast.success("Successfully added attachments!");
      })
      .catch((err) => {
        toast.error(`Error adding attachments: ${err.message}`);
        console.log("Error with sending attachmeht", err);
      })
      .finally(() => setEditLoading(false));
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
        editLoading,
        editCheckIns,
        deleteCheckIns,
        addAttachments,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
