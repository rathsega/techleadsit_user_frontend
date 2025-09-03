import { useState } from "react";

export function useExpiringLocalStorage(key = 'userDetails', initialValue, expiry) {
  const getStoredValue = () => {
    if (typeof window === "undefined" || !window.localStorage) return initialValue;
    const item = localStorage.getItem(key);
    if (!item) return initialValue;
    try {
      const { data, expiry: exp } = JSON.parse(item);
      if (exp == null) {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.removeItem(key);
        }
        return initialValue;
      }
      if (Date.now() > exp) {
        localStorage.removeItem(key);
        return initialValue;
      }
      if(key == 'userDetails'){
          return JSON.stringify(data);
      }
      return data;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  const setExpiringValue = (val, customExpiry) => {
    setValue(val);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        key,
        JSON.stringify({ data: val, expiry: customExpiry || expiry })
      );
    }
  };

  const clearValue = () => {
    setValue(initialValue);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  };

  return [value, setExpiringValue, clearValue];
}