import { useEffect, useState } from "react";

export const useIsLandscape = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkLandscape = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const is = window.innerHeight <= 500;

      setIsLandscape(isLandscape && is);
    };

    checkLandscape();

    window.addEventListener("resize", checkLandscape);

    return () => {
      window.removeEventListener("resize", checkLandscape);
    };
  }, []);

  return isLandscape;
};
