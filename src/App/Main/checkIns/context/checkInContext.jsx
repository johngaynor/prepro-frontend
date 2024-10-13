import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState(null);
  const [commentary, setCommentary] = useState(null);
  const [commentaryId, setCommentaryId] = useState(null);
  // loading states
  const [checkInsLoading, setCheckInsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [commentaryLoading, setCommentaryLoading] = useState(false);

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

  // send pdf to coach
  async function sendPdfToCoach(reportPdf, filename, checkInId) {
    setEditLoading(true);
    const blob = await pdf(reportPdf).toBlob();
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("checkInId", checkInId);
    formData.append("file", blob, "test-name-report");

    apiCall("post", "/api/checkins/send", formData)
      .then((res) => {
        toast.success("Successfully mailed PDF to coach!");
        setCommentaryId(null); // clear comments to bring in new one
      })
      .catch((err) => {
        toast.error(`Error mailing pdf: ${err.message}`);
        console.log(err);
      })
      .finally(() => setEditLoading(false));
  }

  // get commentary
  function getCommentary(id) {
    setCommentaryLoading(true);
    setCommentaryId(id);
    apiCall("get", `/api/checkins/commentary/${id}`)
      .then((res) => {
        if (res.result) {
          setCommentary(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting check in commentary: ${err.message}`);
      })
      .finally(() => setCommentaryLoading(false));
  }

  // add comment
  function addComment(values) {
    setEditLoading(true);
    apiCall("post", "/api/checkins/commentary", values)
      .then((res) => {
        setCommentaryId(null);
        toast.success("Successfully added comment!");
      })
      .catch((err) => {
        toast.error(`Error adding comment: ${err.message}`);
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
        editLoading,
        editCheckIns,
        deleteCheckIns,
        sendPdfToCoach,
        commentary,
        commentaryLoading,
        commentaryId,
        getCommentary,
        addComment,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
