import React from "react";
const format = (n) => (n != Infinity ? n : "∞ ");

const TestProgress = ({isTimed, type, timeLeft, index, length, value}) => {
	return (
		<div className="test-progress progress">
			{isTimed ? (
				<div className="time">
					<span className="primary">{format(timeLeft)}</span>
					<span className="subtle">s</span>
				</div>
			) : (
				<div className="number">
					<span>{index}</span>
					<span className="subtle">
						/{type === "quote" ? length : format(value)}
					</span>
				</div>
			)}
		</div>
	);
};

export default TestProgress;
