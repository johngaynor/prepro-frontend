import axios from "axios";
import toast from "react-hot-toast";

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        if (err && err.response && err.response.data._unauthorized) {
          window.location.reload(false);
        } else if (err.response) {
          return reject(err.response.data.error);
        } else {
          return reject(
            "Error retrieving data from the server. Please try again in a moment."
          );
        }
      });
  });
}

const API = {
  /**
   * @param {String} [path] api route to call
   * @param {String} [errorMessage] error message you want to display on api err
   * @param {function} [loadAction] action to dispatch api data response
   * @param {function} [fetchAction] action to dispatch before api call is made
   * @returns {void} dispatch function
   */
  get: (path, errorMessage, loadAction, fetchAction) => {
    return (dispatch) => {
      if (fetchAction) dispatch(fetchAction());
      return new Promise((resolve, reject) => {
        return apiCall("get", path, { credentials: "include" })
          .then((res) => {
            if (loadAction) dispatch(loadAction(res));
            resolve(res);
          })
          .catch((err) => {
            toast.error(`${errorMessage}: ${err}`);
            if (loadAction) dispatch(loadAction()); // Should always work fine for each instance
            reject();
          });
      });
    };
  },
  /**
   * @param {String} path api route to call
   * @param {String} errorMessage error message you want to display on api err
   * @param {object} data data to pass to api
   * @param {function} loadAction action to dispatch api data response
   * @param {function} fetchAction action to dispatch before api call is made
   * @returns {void} dispatch function
   */
  options: (path, errorMessage, data, loadAction, fetchAction) => {
    return (dispatch) => {
      if (fetchAction) dispatch(fetchAction());
      return new Promise((resolve, reject) => {
        return apiCall("options", path, { credentials: "include", data })
          .then((res) => {
            if (loadAction) dispatch(loadAction(res.length === 0 ? [{}] : res));
            resolve(res);
          })
          .catch((err) => {
            toast.error(`${errorMessage}: ${err}`);
            if (loadAction) dispatch(loadAction()); // Should always work fine for each instance
            reject();
          });
      });
    };
  },
  /**
   * @param {String} path api route to call
   * @param {String} errorMessage error message you want to display on api err
   * @param {object} data data to pass to api
   * @param {function} loadAction action to dispatch api data response
   * @param {function} fetchAction action to dispatch before api call is made
   * @param {String}  successMessage green success message
   * @returns {void} dispatch function
   */
  post: (path, errorMessage, data, loadAction, fetchAction, successMessage) => {
    return (dispatch) => {
      if (fetchAction) dispatch(fetchAction());
      return new Promise((resolve, reject) => {
        return apiCall("post", path, {
          credentials: "include",
          ...(Array.isArray(data) ? { data } : data),
        })
          .then((res) => {
            if (loadAction) dispatch(loadAction(res.result));
            if (successMessage) toast.success(successMessage);
            resolve(res);
          })
          .catch((err) => {
            toast.error(`${errorMessage}: ${err}`);
            if (loadAction) dispatch(loadAction({ failed: true }));
            reject(err);
          });
      });
    };
  },
  /**
   * @param {String} path api route to call
   * @param {String} errorMessage error message you want to display on api err
   * @param {object} data data to pass to api
   * @param {function} loadAction action to dispatch api data response
   * @param {function} fetchAction action to dispatch before api call is made
   * @returns {void} dispatch function
   */
  put: (path, errorMessage, data, loadAction, fetchAction) => {
    return (dispatch) => {
      if (fetchAction) dispatch(fetchAction());
      return new Promise((resolve, reject) => {
        return apiCall("put", path, {
          credentials: "include",
          ...(Array.isArray(data) ? { data } : data),
        })
          .then((res) => {
            if (loadAction) dispatch(loadAction(res));
            resolve(res);
          })
          .catch((err) => {
            toast.error(`${errorMessage}: ${err}`);
            if (loadAction) dispatch(loadAction([{}]));
            reject(err);
          });
      });
    };
  },
  /**
   * @param {String} path api route to call
   * @param {String} errorMessage error message you want to display on api err
   * @param {object} data data to pass to api
   * @param {function} loadAction action to dispatch api data response
   * @param {function} fetchAction action to dispatch before api call is made
   * @returns {void} dispatch function
   */
  // addPhoto: (path, errorMessage, data, loadAction, fetchAction) => {
  //   return (dispatch) => {
  //     if (fetchAction) dispatch(fetchAction());
  //     return new Promise((resolve, reject) => {
  //       return apiAddPhoto(
  //         path,
  //         { credentials: "include", ...data },
  //         data.attachment
  //       )
  //         .then((res) => {
  //           if (loadAction) dispatch(loadAction(res));
  //           dispatch(addFlashMessage(`Document Saved Successfully`, "green"));
  //           resolve();
  //         })
  //         .catch((err) => {
  //           dispatch(addFlashMessage(`${errorMessage}: ${err}`, "red"));
  //           reject();
  //         });
  //     });
  //   };
  // },
  /**
   * @param {String} path api route to call
   * @param {String} errorMessage error message you want to display on api err
   * @param {function} loadAction action to dispatch api data response
   * @param {function} fetchAction action to dispatch before api call is made
   * @returns {void} dispatch function
   */
  delete: (path, errorMessage, loadAction, fetchAction) => {
    return (dispatch) => {
      if (fetchAction) dispatch(fetchAction());
      return new Promise((resolve, reject) => {
        return apiCall("delete", path, { credentials: "include" })
          .then((res) => {
            if (loadAction) dispatch(loadAction(res));
            // dispatch(addFlashMessage(`Document Saved Successfully`, "green"));
            resolve(res);
          })
          .catch((err) => {
            toast.error(`${errorMessage}: ${err}`);
            if (loadAction) dispatch(loadAction([{}]));
            reject(err);
          });
      });
    };
  },
};

export default API;
