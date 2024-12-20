import {
  FETCH_USER,
  LOAD_USER,
  FETCH_USERS,
  LOAD_USERS,
  FETCH_APPS,
  LOAD_APPS,
  FETCH_CHANGELOG,
  LOAD_CHANGELOG,
  FETCH_APP_FAVORITES,
  LOAD_APP_FAVORITES,
  FETCH_UPDATE_APP_FAVORITE,
  LOAD_UPDATE_APP_FAVORITE,
} from "../store/actionTypes";
import API from "../services/api";

export function authUser() {
  return API.get(
    "/api/auth/user",
    "Error getting user",
    (user) => ({ type: LOAD_USER, user }),
    () => ({ type: FETCH_USER })
  );
}

export function getAllUsers() {
  return API.get(
    "/api/users",
    "Error getting users",
    (users) => ({ type: LOAD_USERS, users }),
    () => ({ type: FETCH_USERS })
  );
}

export function getApps() {
  return API.get(
    "/api/dashboard/apps",
    "Error getting apps",
    (apps) => ({ type: LOAD_APPS, apps }),
    () => ({ type: FETCH_APPS })
  );
}

export function getFavorites() {
  return API.get(
    "/api/dashboard/favorites",
    "Error getting favorites",
    (favorites) => ({ type: LOAD_APP_FAVORITES, favorites }),
    () => ({ type: FETCH_APP_FAVORITES })
  );
}

export function updateFavorite(appId) {
  return API.post(
    "/api/dashboard/favorite",
    "Error updating favorite",
    { appId },
    () => ({ type: LOAD_UPDATE_APP_FAVORITE }),
    () => ({ type: FETCH_UPDATE_APP_FAVORITE })
  );
}

// change log stuff to migrate later
// function getChangeLog() {
//   setLogLoading(true);
//   apiCall("get", "/api/dashboard/changelog")
//     .then((res) => {
//       if (res.result) {
//         setChangeLog(res.result);
//       } else {
//         toast.error("Something went wrong retrieving change log...");
//       }
//     })
//     .catch((err) => {
//       toast.error(`Error getting change log: ${err}`);
//     })
//     .finally(() => setLogLoading(false));
// }

// function clearLog(versions) {
//   apiCall("post", "/api/dashboard/changelog", { versions })
//     .then((res) => {})
//     .catch((err) => {
//       toast.error(`Error updating change log: ${err}`);
//     });
// }

// function publishBuild(versionType, changes, affectedUsers) {
//     setBuildLoading(true);
//     const users = Array.from(new Set(affectedUsers));
//     apiCall("post", "/api/admin/build", {
//       credentials: "include",
//       versionType,
//       changes,
//       users,
//     })
//       .then((res) => {
//         toast.success("Successfully published build #" + res.versionId);
//       })
//       .catch((err) => {
//         toast.error(`Error publishing build: ${err}`);
//       })
//       .finally(() => setBuildLoading(false));
//   }
