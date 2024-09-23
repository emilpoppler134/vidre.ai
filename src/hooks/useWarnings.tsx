import { useState } from "react";

const useWarnings = () => {
  const [warnings, setWarnings] = useState<Array<string>>([]);

  const pushWarning = (item: string) => {
    setWarnings((prev) => [...prev, item]);
  };

  const clearWarnings = () => {
    setWarnings([]);
  };

  return {
    warnings,
    pushWarning,
    clearWarnings,
  };
};

export default useWarnings;
