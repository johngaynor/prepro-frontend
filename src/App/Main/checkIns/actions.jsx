import API from "../../services/api";

export function getCheckIns() {
  return API.get(
    "/api/checkins",
    "Error getting check ins",
    (checkIns) => ({ type: "LOAD_CHECKINS", checkIns }),
    () => ({ type: "FETCH_CHECKINS" })
  );
}
