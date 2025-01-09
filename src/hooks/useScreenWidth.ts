import { useState, useEffect } from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0, // Fallback for SSR
  );

  useEffect(() => {
    if (typeof window === "undefined") return; // Exit if not on the client

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
};
