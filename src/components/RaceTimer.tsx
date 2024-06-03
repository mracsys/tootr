import { useEffect, useState } from "react";
import ContextMenuHandler from "./ContextMenuHandler";

import '@/styles/RaceTimer.css';

const RaceTimer = ({

}) => {
    const [startTime, setStartTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval = setInterval(() => {
            if (running) setCurrentTime(Date.now());
        }, 100);

        return () => clearInterval(interval);
    });

    const pauseTimer = () => {
        setRunning(false);
    }

    const startOrResumeTimer = () => {
        const newStartTime = Date.now() - (currentTime - startTime);
        setStartTime(newStartTime);
        setCurrentTime(Date.now());
        setRunning(true);
    }

    const resetTimer = () => {
        setStartTime(0);
        setCurrentTime(0);
        setRunning(false);
    }

    const handleClick = () => {
        if (running) {
            pauseTimer();
        } else {
            startOrResumeTimer();
        }
    }

    const handleRightClick = new ContextMenuHandler(resetTimer);

    // duration is in milliseconds
    const formatTime = (duration: number): string => {

        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const secs = Math.floor((duration % 60000) / 1000);
        //const msecs = duration % 1000;

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = secs.toString().padStart(2, '0');
        //const msecsStr = msecs.toString().padStart(3, '0');

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    return (
        <div
            className="raceTimer"
            onClick={handleClick}
            onContextMenu={handleRightClick.onContextMenu}
            onTouchStart={handleRightClick.onTouchStart}
            onTouchCancel={handleRightClick.onTouchCancel}
            onTouchEnd={handleRightClick.onTouchEnd}
            onTouchMove={handleRightClick.onTouchMove}
        >
            {formatTime(currentTime - startTime)}
        </div>
    );
}

export default RaceTimer;