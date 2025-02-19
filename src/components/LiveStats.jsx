import React, {useContext, useEffect, useRef, useState} from "react";
import {TestContext} from "./context/TestContextProvider";

const LiveStats = () => {
	const context = useContext(TestContext);
	const [liveWPM, setLiveWPM] = useState(0);
	const [avgWPM, setAvgWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const stateRef = useRef(context);

	const calculateAccuracy = () => {
		let errors = 0;
		stateRef.current.words.some((w) => {
			if (w.start) {
				if (w.errors > 0) errors++;
				return false;
			} else return true;
		});
		setAccuracy((1 - errors / (stateRef.current.index + 1)) * 100);
	};

	const calculateAvgWPM = (state, interval) => {
		console.log("Live Calculation", state, avgWPM);
		if (state.isCompleted) {
			clearInterval(interval);
			return;
		}
		if (!state.words[0].start) {
			return;
		}
		const start = state.words[0].start;
		let timeElapsed = 1;
		if (start) {
			timeElapsed = performance.now() - start;
			let character = 0;
			for (let i = 0; i <= state.index; i++) {
				character += state.words[i].typed.length;
			}
			setAvgWPM((character * 12000) / timeElapsed);
		}
	};
	const liveRef = useRef(null);
	useEffect(() => {
		liveRef.current.style.opacity = "1";
		const liveUpdateInterval = setInterval(() => {
			calculateAvgWPM(stateRef.current, liveUpdateInterval);
		}, 1000);
		return () => {
			clearInterval(liveUpdateInterval);
		};
	}, []);

	useEffect(() => {
		stateRef.current = context;
		calculateAccuracy();
	}, [context]);

	useEffect(() => {
		if (context.index > 0) setLiveWPM(context.words[context.index - 1].wpm);
	}, [context.index]);

	return (
		<div className="live-stats" ref={liveRef}>
			<div className="progress">
				{context.index}/{context.words.length}
			</div>
			<div className="data">
				<div className="live-wpm">
					<span className="stats-data">{liveWPM.toFixed(0)}</span>
					<span className="stats-desc">Live WPM</span>
				</div>
				<div className="average-wpm">
					<span className="stats-data">{avgWPM.toFixed(0)}</span>
					<span className="stats-desc">Average WPM</span>
				</div>
				<div className="accuracy">
					<span className="stats-data">{accuracy.toFixed(0)}%</span>
					<span className="stats-desc">Accuracy</span>
				</div>
			</div>
		</div>
	);
};

export default LiveStats;
