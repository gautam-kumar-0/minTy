import React, {useEffect, useState, useMemo, useRef} from "react";

import TwoYAxisChart from "./TwoYAxisChart.jsx";
import {useSelector} from "react-redux";
import {FaChevronRight} from "react-icons/fa";
import {FaArrowRotateRight} from "react-icons/fa6";
import {formatMsConcise} from "../../utils/functions";
const TestResult = ({startTest, resetTest}) => {
	const state = useSelector((state) => state.text);
	const mode = useSelector((state) => state.test.mode);
	const averageAcc = useRef(0);
	const result = useMemo(() => {
		if (state.status === "complete") {
			let totalwpm = 0;
			let totalacc = 0;
			if (state.words.length == 0) {
				averageAcc.current = 100;
				return {
					name: 1,
					raw: 0,
					errors: 0,
					average: 0,
				};
			}
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

	const additionalInfo = useMemo(() => {
		if (state.status === "complete") {
			let duration =
				state.words[state.words.length - 1].end - state.words[0].start;
			duration = formatMsConcise(duration);
			console.log("Additional Info", state);
			const originalText = state.words.map((word) => word.original).join(" ");
			console.log("OriginalText", originalText);
			const typedText = state.words.map((word) => word.typed).join(" ");
			return {
				duration,
				characters: originalText.length,
				skipped: Math.max(originalText.length - typedText.length, 0),
				extra: Math.max(typedText.length - originalText.length, 0),
			};
		}
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
			{additionalInfo && (
				<div className="test-info">
					<div className="test-info-item mode-info">
						<span>Mode </span>
						<span>{mode.type}</span>
						<span>{mode.value}</span>
					</div>

					<div className="test-info-item summary">
						<span>{additionalInfo.characters}/</span>
						<span>{additionalInfo.skipped}/</span>
						<span>{additionalInfo.extra}</span>
					</div>
					<div className="test-info-item duration">
						<span>Duration </span>
						<span>{additionalInfo.duration}</span>
					</div>
				</div>
			)}
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
