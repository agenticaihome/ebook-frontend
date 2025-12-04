import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center bg-slate-900/50 rounded-lg px-3 sm:px-4 py-2 min-w-[60px] sm:min-w-[70px]">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400 uppercase">{label}</div>
        </div>
    );

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Clock size={20} className="text-red-400 flex-shrink-0" />
            <div className="flex gap-1.5 sm:gap-2">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <TimeBox value={timeLeft.minutes} label="Min" />
                <TimeBox value={timeLeft.seconds} label="Sec" />
            </div>
        </div>
    );
};

export default CountdownTimer;
