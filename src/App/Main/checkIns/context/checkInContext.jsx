import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState(null);
  const [dailyLogs, setDailyLogs] = useState(null);
  const [templates, setTemplates] = useState(null);
  // loading states
  const [checkInsLoading, setCheckInsLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
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

  // get daily logs
  function getDailyLogs() {
    setLogsLoading(true);
    apiCall("get", "/api/checkins/daily")
      .then((res) => {
        if (res.result) {
          setDailyLogs(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting daily logs: ${err.message}`);
      })
      .finally(() => setLogsLoading(false));
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
  function addAttachments(formData, checkInId) {
    setEditLoading(true);
    formData.append("checkInId", checkInId);
    apiCall("post", "/api/checkins/attachments", formData)
      .then((res) => {
        // clear out old attachments
        setCheckIns(null);
        toast.success("Successfully added attachments!");
      })
      .catch((err) => {
        toast.error(`Error adding attachments: ${err.message}`);
        console.log("Error with sending attachment", err);
      })
      .finally(() => setEditLoading(false));
  }

  function deleteAttachment(id) {
    setEditLoading(true);
    apiCall("delete", `/api/checkins/attachment/${id}`)
      .then(() => {
        setCheckIns(null);
        toast.success("Successfully deleted photo!");
      })
      .catch((err) => {
        toast.error(`Error deleting photo: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  // send pdf to coach
  async function sendPdfToCoach(reportPdf, filename) {
    setEditLoading(true);
    const blob = await pdf(reportPdf).toBlob();
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("file", blob, "test-name-report");

    apiCall("post", "/api/checkins/send", formData)
      .then((res) => {
        toast.success("Successfully mailed PDF to coach!");
      })
      .catch((err) => {
        toast.error(`Error mailing pdf: ${err.message}`);
        console.log(err);
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
        deleteAttachment,
        sendPdfToCoach,
        dailyLogs,
        logsLoading,
        getDailyLogs,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
