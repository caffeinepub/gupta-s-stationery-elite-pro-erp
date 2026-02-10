import { useState, useEffect } from 'react';
import { getCurrentTime, getCurrentDateString } from '../lib/dateUtils';

export function useLiveClock() {
  const [time, setTime] = useState(getCurrentTime());
  const [date, setDate] = useState(getCurrentDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setDate(getCurrentDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time, date };
}
