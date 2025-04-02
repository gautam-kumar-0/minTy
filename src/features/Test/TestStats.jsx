import React, {useEffect, useRef, useState} from "react";
import TestProgress from "./TestProgress";
import {debounce} from "lodash";
import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks
import {completed} from "../Text/textSlice";

const calculateAvgWPM = (state) => {
	if (state.index == 0) return 0;
	const timeElapsed = performance.now() - state.words[0].start;
	const average = (state.typedCharacters * 12000) / timeElapsed;

	return average;
};

const TestStats = () => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const context = useSelector((state) => state.text); // Select the text state
	const mode = useSelector((state) => state.test.mode); // Select the mode state
	const liveStats = useSelector((state) => state.settings.liveStats);
	const [liveWPM, setLiveWPM] = useState(0);
	const [avgWPM, setAvgWPM] = useState(0);

	const isTimed = mode.type === "time" && mode.value !== Infinity;
	const [timeLeft, setTimeLeft] = useState(isTimed ? Number(mode.value) : null);
	const stateRef = useRef(context);
	const liveRef = useRef(null);

	useEffect(() => {
		stateRef.current = context;
	}, [context]);

	useEffect(() => {
		if (context.index > 0) {
			setLiveWPM(context.words[context.index - 1].wpm);
		}
	}, [context.index]);

	useEffect(() => {
		liveRef.current.style.opacity = "1";

		const updateStats = () => {
			setAvgWPM(calculateAvgWPM(stateRef.current));
		};

		let liveUpdateInterval = null;
		if (!isTimed && !liveStats) return;

		liveUpdateInterval = setInterval(() => {
			if (liveStats) updateStats();
			if (isTimed) {
				setTimeLeft((prev) => {
					if (prev === 0) {
						dispatch(completed());
						return prev;
					} else return prev - 1;
				});
			}
		}, 1000);

		return () => {
			clearInterval(liveUpdateInterval);
		};
	}, [context.status]);

	return (
		<div
			className="live-stats"
			ref={liveRef}
			style={{
				display: context.status == "uncomplete" ? "flex" : "none",
			}}
		>
			<TestProgress
				type={mode.type}
				timeLeft={timeLeft}
				index={context.index}
				length={context.words.length}
				value={mode.value}
			/>

			{liveStats && (
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
						<span className="stats-data">
							{context.currentAccuracy.toFixed(0)}%
						</span>
						<span className="stats-desc">Accuracy</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default TestStats;
