import {
  FETCH_ALL_APPS,
  LOAD_ALL_APPS,
  FETCH_APP_ACCESS,
  LOAD_APP_ACCESS,
  FETCH_ADD_APP_ACCESS,
  LOAD_ADD_APP_ACCESS,
  FETCH_DELETE_APP_ACCESS,
  LOAD_DELETE_APP_ACCESS,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getAllApps() {
  return API.get(
    "/api/admin/apps",
    "Error getting all apps",
    (apps) => ({ type: LOAD_ALL_APPS, apps }),
    () => ({ type: FETCH_ALL_APPS })
  );
}

export function getAllAccess() {
  return API.get(
    "/api/admin/access",
    "Error getting app access",
    (access) => ({ type: LOAD_APP_ACCESS, access }),
    () => ({ type: FETCH_APP_ACCESS })
  );
}

export function addAppAccess(userId, appId) {
  return API.post(
    "/api/admin/access/add",
    "Error adding app access",
    { userId, appId },
    (failed) => ({ type: LOAD_ADD_APP_ACCESS, failed }),
    () => ({ type: FETCH_ADD_APP_ACCESS, userId, appId })
  );
}

export function removeAppAccess(userId, appId) {
  return API.delete(
    `/api/admin/access/delete/${userId}/${appId}`,
    "Error removing app access",
    (failed) => ({ type: LOAD_DELETE_APP_ACCESS, failed }),
    () => ({ type: FETCH_DELETE_APP_ACCESS, userId, appId })
  );
}

// toggle user app access old function
// function toggleUserAppAccess(activeUser, app) {
//   setAccessChanging(true);
//   const access = appAccess.find(
//     (a) => a.userId === activeUser && a.appId === app.id
//   );
//   if (access) {
//     // delete from db
//     apiCall("post", "/api/admin/access/delete", {
//       credentials: "include",
//       userId: activeUser,
//       appId: app.id,
//     })
//       .then((res) => {
//         const newAccess = appAccess.filter(
//           (a) => !(a.userId === activeUser && a.appId === app.id)
//         );
//         setAppAccess(newAccess);
//       })
//       .catch((err) => {
//         toast.error(`Error removing app access: ${err}`);
//       })
//       .finally(() => setAccessChanging(false));
//   } else {
//     // add access
//     apiCall("post", "/api/admin/access/add", {
//       credentials: "include",
//       userId: activeUser,
//       appId: app.id,
//     })
//       .then((res) => {
//         setAppAccess([
//           ...appAccess,
//           {
//             userId: activeUser,
//             appId: app.id,
//           },
//         ]);
//       })
//       .catch((err) => {
//         toast.error(`Error adding app access: ${err}`);
//       })
//       .finally(() => setAccessChanging(false));
//   }
// }

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
