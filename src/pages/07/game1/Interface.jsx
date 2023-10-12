import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame.jsx';
import { useEffect, useRef, useState } from 'react';

export default function Interface() {
    const controls = useKeyboardControls((state) => state);
    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const jump = useKeyboardControls((state) => state.jump);

    const [elapsedTime, setElapsedTime] = useState(0);
    const restart = useGame((state) => state.restart);
    const phase = useGame((state) => state.phase);

    useEffect(() => {
        let intervalId;

        if (phase === 'playing') {
            const startTime = Date.now();
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
                setElapsedTime(elapsedTime);
            }, 10); // Update every 10 milliseconds (adjust as needed)
        } else if (phase === 'ended') {
            clearInterval(intervalId); // Stop the timer if the game has ended
        }

        return () => {
            clearInterval(intervalId); // Clean up the interval when unmounting
        }
    }, [phase]);

    return (
        <div className="interface">
            <div className="time">{elapsedTime}</div>
            {phase === 'ended' && <div className="restart" onClick={restart}>Restart</div>}
            {/* ... rest of your UI */}
        </div>
    );
}
