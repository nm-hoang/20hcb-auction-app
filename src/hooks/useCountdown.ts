import { useEffect, useState } from 'react';

/**
 * @param timestamp
 * @return [hours, minutes, seconds]
 */
const useCountdown = (timestamp: number) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      const localeCloseDate = new Date(timestamp * 1000);
      const localeNow = new Date(new Date().getTime());
      const dateDiff = localeCloseDate.getTime() - localeNow.getTime();

      setHours(Math.floor(dateDiff / (1000 * 3600)));
      setMinutes(Math.floor((dateDiff % (1000 * 3600)) / (1000 * 60)));
      setSeconds(Math.floor((dateDiff % (1000 * 60)) / 1000));

      if (dateDiff < 0) {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        clearInterval(countdown);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  });

  return [hours, minutes, seconds];
};

export default useCountdown;
