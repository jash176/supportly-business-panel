import { useEffect, useState } from "react";

export function usePageFocus(): boolean {
  const [isFocused, setIsFocused] = useState(!document.hidden);

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", () => {
      setIsFocused(!document.hidden);
    });

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", () => {
        setIsFocused(!document.hidden);
      });
    };
  }, []);

  return isFocused;
}
