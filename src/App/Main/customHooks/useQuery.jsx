/**
 *
 * @param {String} rawQuery
 * @param {navigate} navigate
 * @returns {{
 *  update: Function,
 *  forceUpdate: Function
 * }}
 */
function useQuery(rawQuery, navigate, initialValues = {}) {
  const searchQuery = rawQuery
    .replace("?", "")
    .split("&")
    .reduce((acc, cur) => {
      const retObj = { ...acc };
      const [key, value] = cur.split("=");
      if (key) retObj[key] = decodeURIComponent(value);
      return retObj;
    }, initialValues);

  searchQuery.update = (values) => {
    const newQuery = { ...searchQuery };
    Object.keys(values).forEach((key) => {
      if (values[key]) newQuery[key] = values[key];
      else delete newQuery[key];
    });
    const newSearch = Object.keys(newQuery).reduce((acc, cur, ind) => {
      if (typeof newQuery[cur] === "function") return acc;
      return (
        acc + `${ind ? "&" : ""}${cur}=${encodeURIComponent(newQuery[cur])}`
      );
    }, "?");
    if (navigate) {
      navigate(newSearch);
    }
  };
  searchQuery.forceUpdate = (values) => {
    const newQuery = values;
    const newSearch = Object.keys(newQuery).reduce((acc, cur, ind) => {
      if (typeof newQuery[cur] === "function") return acc;
      return (
        acc + `${ind ? "&" : ""}${cur}=${encodeURIComponent(newQuery[cur])}`
      );
    }, "?");
    if (navigate) {
      navigate(newSearch);
    }
  };
  return searchQuery;
}

export default useQuery;
