import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react'
import { StatisticValue, StatisticLabel, Statistic } from 'semantic-ui-react'

import { useTranslation } from 'react-i18next';

const CountdownTimer = ({ targetDate }) => {
  const { t } = useTranslation();
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <h1>{t('reveals_in')}</h1>
      <div>
        {Object.keys(timeLeft).map((interval) => (
           <Statistic key={interval} color='yellow'>
            <StatisticValue>{timeLeft[interval]}</StatisticValue>
            <StatisticLabel>{t(interval)}</StatisticLabel>
          </Statistic>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
