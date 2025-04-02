import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {FaChevronRight} from "react-icons/fa";
import {FaArrowRotateRight} from "react-icons/fa6";
import TwoYAxisChart from "./TwoYAxisChart.jsx";
import {formatMsConcise} from "../../utils/functions";
import {ActionButton} from "../../components/ActionButton/ActionButton.jsx";

const TestResult = ({startTest, resetTest}) => {
	const state = useSelector((state) => state.text);
	const mode = useSelector((state) => state.test.mode);

	const result = useMemo(() => {
		if (state.status !== "complete") return null;

		let totalWpm = 0;
		let totalErrors = 0;
		let totalCharacters = 0;
		let totalTypedCharacters = 0;

		const duration =
			state.words[state.words.length - 1]?.end - state.words[0]?.start || 0;

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
							<div>
								<span className="primary">{mode.type} : </span>
								<span className="secondary">{mode.value}</span>
							</div>

							<span className="muted">mode</span>
						</div>
						<div className="test-info-item">
							<div className=" summary">
								<div>
									<span className="primary">{result.characters}</span>
									<span className="muted">/</span>
								</div>
								<div>
									<span className="secondary">{result.errors}</span>
									<span className="muted">/</span>
								</div>
								<div>
									<span className="secondary">{result.missed}</span>
									<span className="muted">/</span>
								</div>
								<div>
									<span className="secondary">{result.extra}</span>
									<span className="muted">/</span>
								</div>
								<div className="info">
									<span>characters/</span>
									<span>errors/</span>
									<span>missed/</span>
									<span>extra</span>
								</div>
							</div>
							<span className="muted">summary</span>
						</div>
						<div className="test-info-item duration">
							<span className="primary">{result.duration}</span>
							<span className="muted">duration </span>
						</div>
					</div>
				</>
			) : (
				<span>Loading</span>
			)}
			<div className="actions">
				<ActionButton onClick={startTest} action="Next">
					<FaChevronRight />
				</ActionButton>
				<ActionButton onClick={resetTest} action="Restart">
					<FaArrowRotateRight />
				</ActionButton>
			</div>
		</div>
	);
};

export default TestResult;
