import React from "react";
import { apiCall } from "../../../../services/api";
import toast from "react-hot-toast";

export const SupplementContext = React.createContext();

export const SupplementProvider = ({ children }) => {
  const [suppItems, setSuppItems] = React.useState([]);
  // loading states
  const [suppsLoading, setSuppsLoading] = React.useState(false);

  // api calls
  function getAllSupplements() {
    setSuppsLoading(true);
    apiCall("get", "/api/supplements/items", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setSuppItems(res.result);
        } else {
          toast.error("No supplements returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting supplements: ${err}`);
      })
      .finally(() => setSuppsLoading(false));
  }

  return (
    <SupplementContext.Provider
      value={{ suppItems, suppsLoading, getAllSupplements }}
    >
      {children}
    </SupplementContext.Provider>
  );
};

export default SupplementContext;
