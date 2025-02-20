import React, {useEffect, useState} from "react";

import useTestContext from "../hooks/useTestContext.js";
import {FcNext} from "react-icons/fc";
import {RiRestartLine} from "react-icons/ri";
import TwoYAxisChart from "./TwoYAxisChart.jsx";

const TestResult = ({setText}) => {
	const [state, dispatch] = useTestContext();
	let totalwpm = 0;

	const [result, setResult] = useState(null);
	console.log(result);
	const handleNext = (e) => {
		console.log(e);
		setText((prev) => {
			console.log(prev);
			return "";
		});
	};
	const handleRestart = (e) => {
		setText((prev) => new String(prev));
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
					...(word.errors > 0 ? {errors: word.errors} : {}),
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
					<span>Average</span>
					<h1>{result ? result[result.length - 1].average : 0}</h1>
				</div>
				<div className="accuracy">
					<span>Accuracy</span>
					<h1>{result ? 90 : 0}%</h1>
				</div>
			</div>
			<div className="linechart">{renderChart}</div>
			<div className="result-details"></div>
			<div className="actions">
				<button onClick={handleNext}>
					<FcNext />
				</button>
				<button onClick={handleRestart}>
					<RiRestartLine />
				</button>
			</div>
		</div>
	);
};

export default TestResult;
