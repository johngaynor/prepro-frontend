import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState(null);
  const [dailyLogs, setDailyLogs] = useState(null);
  const [commentary, setCommentary] = useState(null);
  const [commentaryId, setCommentaryId] = useState(null);
  const [poses, setPoses] = useState(null);
  // loading states
  const [checkInsLoading, setCheckInsLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [commentaryLoading, setCommentaryLoading] = useState(false);
  const [posesLoading, setPosesLoading] = useState(false);

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

  // get poses
  function getPoses() {
    setPosesLoading(true);
    apiCall("get", `/api/checkins/poses`)
      .then((res) => {
        if (res.result) {
          setPoses(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting poses: ${err.message}`);
      })
      .finally(() => setPosesLoading(false));
  }

  function assignPose(checkInId, photoId, poseId) {
    setEditLoading(true);
    // update locally
    const checkIn = checkIns.find((c) => c.id === checkInId);
    const photo = checkIn.photos.find((p) => p.id === photoId);

    const newPhoto = { ...photo, poseId };
    const newPhotos = checkIn.photos.map((p) =>
      p.id === photoId ? newPhoto : p
    );

    const newCheckIn = { ...checkIn, photos: newPhotos };
    const newCheckIns = checkIns.map((c) =>
      c.id === checkInId ? newCheckIn : c
    );
    setCheckIns(newCheckIns);

    apiCall("post", "/api/checkins/pose", { photoId, poseId })
      .then(() => {})
      .catch((err) => {
        toast.error(`Error changing pose: ${err.message}`);
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
        addAttachments,
        deleteAttachment,
        sendPdfToCoach,
        dailyLogs,
        logsLoading,
        getDailyLogs,
        commentary,
        commentaryLoading,
        commentaryId,
        getCommentary,
        addComment,
        getPoses,
        poses,
        posesLoading,
        assignPose,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
