import React, {useEffect, useRef, useState} from "react";
import TestProgress from "./TestProgress";
import {debounce} from "lodash";
import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks
import {completed} from "../Text/textSlice";

// Instead of recalculating you can make it incremental,
// but then you also have to add logic when backspace is done.
const calculateAccuracy = (state) => {
	let errors = 0;
	let charactersTyped = 0;
	state.words.some((w) => {
		if (w.start) {
			errors += w.errors.filter((e) => e).length;
			charactersTyped += w.typed.length;
			return false;
		} else return true;
	});

	if (charactersTyped < errors) errors = charactersTyped;
	if (charactersTyped == 0) return 100;
	return ((charactersTyped - errors) / charactersTyped) * 100;
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

const TestStats = () => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const context = useSelector((state) => state.text); // Select the text state
	const mode = useSelector((state) => state.test.mode); // Select the mode state
	const liveStats = useSelector((state) => state.settings.liveStats);
	const [liveWPM, setLiveWPM] = useState(0);
	const [avgWPM, setAvgWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const isTimed = mode.type === "time" && mode.value !== Infinity;
	const [timeLeft, setTimeLeft] = useState(isTimed ? Number(mode.value) : null);
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

		// only wpm is updating according to time
		const updateStats = debounce(() => {
			setAvgWPM(calculateAvgWPM(stateRef.current));
		}, 500);

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
			updateStats.cancel();
		};
	}, [mode]);

	return (
		<div className="live-stats" ref={liveRef}>
			<TestProgress
				isTimed={mode.type === "time"}
				timeLeft={timeLeft}
				index={context.index}
				isQuote={mode.type === "quote"}
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
						<span className="stats-data">{accuracy.toFixed(0)}%</span>
						<span className="stats-desc">Accuracy</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default TestStats;
