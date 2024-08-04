import { useState, useEffect, useCallback } from "react";

type CountdownHook = {
  timeLeft: number;
  reset: () => void;
};

const useCountdown = (totalTimeInSeconds: number, onComplete?: () => void): CountdownHook => {
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const reset = useCallback(() => {
    setTimeLeft(totalTimeInSeconds);
  }, [totalTimeInSeconds]);

  return { timeLeft, reset };
};

export default useCountdown;
