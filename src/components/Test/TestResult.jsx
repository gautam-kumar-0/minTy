import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {FaChevronRight} from "react-icons/fa";
import {FaArrowRotateRight} from "react-icons/fa6";
import TwoYAxisChart from "./TwoYAxisChart.jsx";
import {formatMsConcise} from "../../utils/functions";

const TestResult = ({startTest, resetTest}) => {
	const state = useSelector((state) => state.text);
	const mode = useSelector((state) => state.test.mode);

	const result = useMemo(() => {
		if (state.status !== "complete") return null;

		let totalWpm = 0;
		let totalErrors = 0;
		let totalCharacters = 0;
		let totalTypedCharacters = 0;

		const duration = state.words[state.index]?.end - state.words[0]?.start || 0;

		const data = state.words.map((word, i) => {
			totalWpm += word.wpm;
			totalCharacters += word.original.length;
			totalTypedCharacters += word.typed.length;

			const errors = word.errors.filter(Boolean).length;
			totalErrors += errors;

			return {
				name: i + 1,
				raw: Math.round(word.wpm),
				errors,
				average: Math.round(totalWpm / (i + 1)),
			};
		});

		const accuracy = Math.round(
			((totalTypedCharacters - totalErrors) / totalTypedCharacters) * 100
		);

		return {
			data: data.length ? data : [{name: 1, raw: 0, errors: 0, average: 0}],
			accuracy: accuracy || 100,
			duration: formatMsConcise(duration),
			average: data[data.length - 1]?.average || 0,
			characters: totalTypedCharacters,
			missed: Math.max(totalCharacters - totalTypedCharacters, 0),
			extra: Math.max(totalTypedCharacters - totalCharacters, 0),
			errors: totalErrors,
		};
	}, [state]);

	return (
		<div className="result">
			{result ? (
				<>
					<div className="result-values">
						<div className="average">
							<h1>{result.average}</h1>
							<span>Average</span>
						</div>
						<div className="accuracy">
							<h1>{result.accuracy}%</h1>
							<span>Accuracy</span>
						</div>
					</div>
					<div className="linechart">
						<TwoYAxisChart result={result.data} />
					</div>
					<div className="test-info">
						<div className="test-info-item mode-info">
							<span>Mode </span>
							<span>{mode.type}</span>
							<span>{mode.value}</span>
						</div>
						<div className="test-info-item summary">
							<span>{result.characters}/</span>
							<span>{result.errors}/</span>
							<span>{result.missed}/</span>
							<span>{result.extra}</span>
						</div>
						<div className="test-info-item duration">
							<span>Duration </span>
							<span>{result.duration}</span>
						</div>
					</div>
				</>
			) : (
				<span>Loading</span>
			)}
			<div className="actions">
				<button
					onClick={startTest}
					className="action-button"
					data-action="Next"
				>
					<FaChevronRight />
				</button>
				<button
					onClick={resetTest}
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
