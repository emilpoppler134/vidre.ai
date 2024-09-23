import { useState, useEffect, useMemo } from "react";

type ViewportWidthReturn = {
  viewportWidth: number;
  isSmallWidth: boolean | null;
};

type ViewportWidthProps = {
  maxWidth?: number;
};

const useViewportWidth = ({
  maxWidth,
}: ViewportWidthProps): ViewportWidthReturn => {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);

  const isSmallWidth: boolean | null = useMemo(() => {
    if (maxWidth) {
      return viewportWidth <= maxWidth;
    } else return null;
  }, [maxWidth, viewportWidth]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    viewportWidth,
    isSmallWidth,
  };
};

export default useViewportWidth;
