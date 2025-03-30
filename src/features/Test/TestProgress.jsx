import React from "react";

const TestProgress = ({isTimed, timeLeft, index, isQuote, length, value}) => {
	const format = (n) => (n != Infinity ? n : "∞ ");

	return (
		<div className="test-progress progress">
			{isTimed ? (
				<div className="time">
					<span>{format(timeLeft)}</span>
					<span className="subtle">s</span>
				</div>
			) : (
				<div className="number">
					<span>{index + 1}</span>
					<span className="subtle">/{isQuote ? length : format(value)}</span>
				</div>
			)}
		</div>
	);
};

export default TestProgress;
