import { useState } from "react";

const useWarnings = () => {
  const [warnings, _setWarnings] = useState<Array<string>>([]);

  const setWarnings = (message: string) => {
    _setWarnings([message]);
  };

  const pushWarning = (message: string) => {
    _setWarnings((prev) => [...prev, message]);
  };

  const clearWarnings = () => {
    _setWarnings([]);
  };

  return {
    warnings,
    setWarnings,
    pushWarning,
    clearWarnings,
  };
};

export default useWarnings;
