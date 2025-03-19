import React, {useContext, useEffect, useRef, useState} from "react";
import {TestContext, TestDispatchContext} from "./context/TestContextProvider";
import TestProgress from "./TestProgress";

const calculateAccuracy = (state) => {
	let errors = 0;
	state.words.some((w) => {
		if (w.start) {
			if (w.errors > 0) errors++;
			return false;
		} else return true;
	});
	return (1 - errors / (state.index + 1)) * 100;
};

const calculateAvgWPM = (state) => {
	if (state.status !== "uncomplete") return 0;
	const timeElapsed = performance.now() - state.words[0].start;
	let characterCount = 0;
	for (let i = 0; i <= state.index; i++) {
		characterCount += state.words[i].typed.length;
	}
	return (characterCount * 12000) / timeElapsed;
};

const LiveStats = () => {
	const context = useContext(TestContext);
	const dispatch = useContext(TestDispatchContext);
	const [liveWPM, setLiveWPM] = useState(0);
	const [avgWPM, setAvgWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [timeLeft, setTimeLeft] = useState(
		context.mode.type === "time"
			? context.MODE[context.mode.type][context.mode.index]
			: null
	);
	const stateRef = useRef(context);
	const liveRef = useRef(null);

	useEffect(() => {
		stateRef.current = context;
		setAccuracy(calculateAccuracy(context));
	}, [context]);

	useEffect(() => {
		if (context.index > 0) {
			setLiveWPM(context.words[context.index - 1].wpm);
		}
	}, [context.index]);

	useEffect(() => {
		liveRef.current.style.opacity = "1";
		const liveUpdateInterval = setInterval(() => {
			const currentState = stateRef.current;
			setAvgWPM(calculateAvgWPM(currentState));

			if (context.mode.type === "time") {
				setTimeLeft((prev) => {
					if (prev === 0) {
						dispatch({type: "TIMEUP"});
						return 0;
					}
					return prev - 1;
				});
			}
		}, 1000);

		return () => clearInterval(liveUpdateInterval);
	}, [context.mode.type, dispatch]);

	return (
		<div className="live-stats" ref={liveRef}>
			<TestProgress
				isTimed={context.mode.type === "time"}
				timeLeft={timeLeft}
				index={context.index}
				length={context.words.length}
			/>
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
