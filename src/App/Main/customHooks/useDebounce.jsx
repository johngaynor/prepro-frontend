import React from "react";

function useDebounce(callback, dependencies, delay = 1500) {
  const newDependencies = JSON.stringify(dependencies);
  const [lastDependencies, setLastDependencies] =
    React.useState(newDependencies);
  const [debounce, setDebounce] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    updateDebounce();
  });

  function clearDebounce() {
    if (debounce) clearTimeout(debounce);
  }

  function updateDebounce() {
    if (lastDependencies !== newDependencies) {
      clearDebounce();

      setLoading(true);
      const variable = setTimeout(async () => {
        setLoading(false);
        const callbackResult = await callback();
        setResult(callbackResult);
      }, delay);

      setLastDependencies(newDependencies);
      setDebounce(variable);
    }
  }

  const retResults = { result, loading };

  return retResults;
}

export default useDebounce;
