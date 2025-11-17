import { useState, useEffect } from "react";

export const useDebounce = (input: string, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(input);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedVal;
};
