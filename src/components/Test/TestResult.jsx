import React, {useEffect, useState, useMemo, useRef} from "react";

import TwoYAxisChart from "./TwoYAxisChart.jsx";
import {useSelector} from "react-redux";
import {FaChevronRight} from "react-icons/fa";
import {FaArrowRotateRight} from "react-icons/fa6";

const TestResult = ({startTest, resetTest}) => {
	const state = useSelector((state) => state.text);
	const averageAcc = useRef(0);
	const result = useMemo(() => {
		if (state.status === "complete") {
			let totalwpm = 0;
			let totalacc = 0;

			let r = state.words.map((word, i) => {
				totalwpm += word.wpm;
				totalacc += word.accuracy;

				return {
					name: i + 1,
					raw: Math.round(word.wpm),
					errors: word.errors,
					average: Math.round(totalwpm / (i + 1)),
				};
			});

			averageAcc.current = Math.round(totalacc / r.length);
			return r;
		}
		return null;
	}, [state]);

	const handleNext = (e) => {
		startTest();
	};
	const handleRestart = (e) => {
		resetTest();
	};

	let renderChart = <span>Loading</span>;
	if (result) {
		renderChart = (
			<>
				<TwoYAxisChart result={result} />
			</>
		);
	}

	return (
		<div className="result">
			<div className="result-values">
				<div className="average">
					<h1>{result ? result[result.length - 1]?.average : 0}</h1>
					<span>Average</span>
				</div>

				<div className="accuracy">
					<h1>{averageAcc.current}%</h1>
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
					<FaChevronRight />
				</button>
				<button
					onClick={handleRestart}
					className="action-button"
					data-action="Restart"
				>
					<FaArrowRotateRight />
				</button>
			</div>
		</div>
	);
};

export default TestResult;
