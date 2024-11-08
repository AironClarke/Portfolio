import React, { useState, useEffect } from 'react';

const Clock = (): JSX.Element => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time className="clock" title="Clock">
      {time.toLocaleTimeString()}
    </time>
  );
};

export default Clock;
