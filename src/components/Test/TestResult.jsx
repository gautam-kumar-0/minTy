import React, {useEffect, useState, useMemo} from "react";

import {FcNext} from "react-icons/fc";
import {RiRestartLine} from "react-icons/ri";
import TwoYAxisChart from "./TwoYAxisChart.jsx";
import {useSelector} from "react-redux"; // Import useSelector from Redux

const TestResult = () => {
	const state = useSelector((state) => state.test); // Select the test state
	let totalwpm = 0;
	const result = useMemo(() => {
		if (state.status === "complete") {
			let totalwpm = 0;
			return state.words.map((word, i) => {
				totalwpm += word.wpm;
				return {
					name: i + 1,
					raw: Math.round(word.wpm),
					errors: word.errors,
					average: Math.round(totalwpm / (i + 1)),
				};
			});
		}
		return null;
	}, []);

	const handleNext = (e) => {
		console.log("Next");
	};
	const handleRestart = (e) => {
		console.log("Restart");
	};

	let renderChart = <span>Loading</span>;
	if (result) {
		renderChart = <TwoYAxisChart result={result} />;
	}

	return (
		<div className="result">
			<div className="result-values">
				<div className="average">
					<h1>{result ? result[result.length - 1]?.average : 0}</h1>
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
