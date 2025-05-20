import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete, playSound = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (playSound) {
        // Play completion sound
        const audio = new Audio('/sounds/bell.mp3');
        audio.play();
      }
      onComplete();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete, playSound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer">
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
};

export default Timer;