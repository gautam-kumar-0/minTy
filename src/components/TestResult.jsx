import React, {useEffect, useState} from "react";

import useTestContext from "../hooks/useTestContext.js";
import {FcNext} from "react-icons/fc";
import {RiRestartLine} from "react-icons/ri";
import TwoYAxisChart from "./TwoYAxisChart.jsx";

const TestResult = ({setMode}) => {
	const [state, dispatch] = useTestContext();
	let totalwpm = 0;

	const [result, setResult] = useState(null);
	console.log(result);
	const handleNext = (e) => {
		setMode((mode) => ({type: mode.type, index: mode.index}));
	};
	const handleRestart = (e) => {
		dispatch({type: "NEW", payload: state.text});
	};
	console.log(state, result);
	useEffect(() => {
		if (state.status == "complete") {
			const r = state.words.map((word, i) => {
				console.log("Inside R", word, i);
				totalwpm += word.wpm;
				return {
					name: i + 1,
					raw: Math.round(word.wpm),
					errors: word.errors,
					average: Math.round(totalwpm / (i + 1)),
				};
			});
			setResult(r);
		}
	}, [state]);
	let renderChart = <span>Loading</span>;
	if (result) {
		renderChart = <TwoYAxisChart result={result} />;
	}

	return (
		<div className="result">
			<div className="result-values">
				<div className="average">
					<h1>{result ? result[result.length - 1].average : 0}</h1>
					<span>Average</span>
				</div>
				<div className="accuracy">
					<h1>{result ? 90 : 0}%</h1>
					<span>Accuracy</span>
				</div>
			</div>
			<div className="linechart">{renderChart}</div>
			<div className="actions">
				<button
					onClick={handleNext}
					className="action-button"
					data-action="Next"
				>
					<FcNext />
				</button>
				<button
					onClick={handleRestart}
					className="action-button"
					data-action="Restart"
				>
					<RiRestartLine />
				</button>
			</div>
		</div>
	);
};

export default TestResult;
