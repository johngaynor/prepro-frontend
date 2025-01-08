import {
  FETCH_CHECKINS,
  LOAD_CHECKINS,
  FETCH_CHECKIN_COMMENTARY,
  LOAD_CHECKIN_COMMENTARY,
  FETCH_EDIT_CHECKIN,
  LOAD_EDIT_CHECKIN,
  FETCH_DELETE_CHECKIN,
  LOAD_DELETE_CHECKIN,
  FETCH_ADD_CHECKIN_COMMENTARY,
  LOAD_ADD_CHECKIN_COMMENTARY,
  FETCH_SEND_CHECKIN_PDF,
  LOAD_SEND_CHECKIN_PDF,
  FETCH_CHECKIN_SLEEP_SUMMARY,
  LOAD_CHECKIN_SLEEP_SUMMARY,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getCheckIns() {
  return API.get(
    "/api/checkins",
    "Error getting check ins",
    (checkIns) => ({ type: LOAD_CHECKINS, checkIns }),
    () => ({ type: FETCH_CHECKINS })
  );
}

export function getCommentary(id) {
  return API.get(
    `/api/checkins/commentary/${id}`,
    "Error getting check in commentary",
    (commentary) => ({
      type: LOAD_CHECKIN_COMMENTARY,
      commentary,
      checkInId: id,
    }),
    () => ({ type: FETCH_CHECKIN_COMMENTARY })
  );
}

export function editCheckIn(values) {
  return API.post(
    "/api/checkins",
    "Error updating check in",
    values,
    () => ({ type: LOAD_EDIT_CHECKIN }),
    () => ({ type: FETCH_EDIT_CHECKIN })
  );
}

export function deleteCheckIn(checkInId) {
  return API.delete(
    `/api/checkins/checkin/${checkInId}`,
    "Error deleting check in",
    (failed) => ({ type: LOAD_DELETE_CHECKIN, failed }),
    () => ({ type: FETCH_DELETE_CHECKIN, checkInId })
  );
}

export function addCommentary(values) {
  return API.post(
    "/api/checkins/commentary",
    "Error adding commentary",
    values,
    (failed) => ({ type: LOAD_ADD_CHECKIN_COMMENTARY, failed }),
    () => ({ type: FETCH_ADD_CHECKIN_COMMENTARY, values })
  );
}

export function sendPdfToCoach(formData) {
  return API.post(
    "/api/checkins/send",
    "Error sending check in pdf to coach",
    formData,
    () => ({ type: LOAD_SEND_CHECKIN_PDF }),
    () => ({ type: FETCH_SEND_CHECKIN_PDF })
  );
}

export function generateSleepSummary(date) {
  return API.get(
    "/api/checkins",
    "Error generating sleep summary",
    // date,
    () => ({ type: LOAD_CHECKIN_SLEEP_SUMMARY }),
    () => ({ type: FETCH_CHECKIN_SLEEP_SUMMARY })
  );
}
