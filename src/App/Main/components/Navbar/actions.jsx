import { apiCall } from "../../../services/api";
import { useCallback } from "react";
import useAppStore from "../../../store";
import toast from "react-hot-toast";

export const useAuthUser = () => {
  const { loadUser } = useAppStore();
  return useCallback(() => {
    return new Promise((resolve, reject) => {
      apiCall("get", "/api/auth/user", { credentials: "include" })
        .then((res) => {
          if (res.user) {
            loadUser(res.user);
            resolve();
          } else {
            toast.error("Unknown error occurred...");
            loadUser({});
            resolve();
          }
        })
        .catch((err) => {
          toast.error(`Error authenticating user: ${err}`);
          reject();
        });
    });
  }, [loadUser]);
};

export const useGetApps = () => {
  const { fetchApps, loadApps } = useAppStore();
  return useCallback(() => {
    return new Promise((resolve, reject) => {
      fetchApps();
      apiCall("get", "/api/dashboard/apps")
        .then((res) => {
          loadApps(res.result);
          resolve();
        })
        .catch((err) => {
          toast.error(`Error getting user apps: ${err}`);
          reject();
        });
    });
  });
};
