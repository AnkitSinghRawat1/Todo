import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const localStorageVal = localStorage.getItem(key);
    if (localStorageVal) return localStorageVal;
    return initialValue;
  });

  useEffect(() => {
    console.log(state, key)
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}
