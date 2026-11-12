import { useContext } from "react";
import ReadingContext from "../context/ReadingContext";

export const useReadings = () => {
  const context = useContext(ReadingContext);

  if (!context) {
    throw new Error(
      "useReadings must be used inside ReadingProvider"
    );
  }

  return context;
};
