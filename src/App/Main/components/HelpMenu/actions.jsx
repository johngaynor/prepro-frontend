import { apiCall } from "../../../services/api";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useSubmitSupportTicket = () => {
  return useCallback((type, message, user) => {
    return new Promise((resolve, reject) => {
      apiCall("post", "/api/support/submit", { user, type, message })
        .then((res) => {
          toast.success(
            "Thanks for submitting a ticket, we will contact you shortly with a solution!"
          );
          resolve();
        })
        .catch((err) => {
          toast.error(`Error submitting support ticket: ${err}`);
          reject();
        });
    });
  }, []);
};
