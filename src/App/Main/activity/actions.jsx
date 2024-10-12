import {
  FETCH_USER_ACTIVITIES,
  LOAD_USER_ACTIVITIES,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getActivities() {
  return API.get(
    "/api/activity",
    "Error getting user activity",
    (activities) => ({ type: LOAD_USER_ACTIVITIES, activities }),
    () => ({ type: FETCH_USER_ACTIVITIES })
  );
}
