import React from "react";

const TestProgress = ({isTimed, timeLeft, index, length}) => {
	return (
		<div className="test-progress progress">
			{isTimed ? (
				<div className="time">
					<span>{timeLeft}</span>
					<span className="subtle">s</span>
				</div>
			) : (
				<div className="number">
					<span>{index + 1}</span>
					<span className="subtle">/{length}</span>
				</div>
			)}
		</div>
	);
};

export default TestProgress;
