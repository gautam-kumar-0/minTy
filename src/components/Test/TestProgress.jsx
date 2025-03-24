import React from "react";

const TestProgress = ({isTimed, timeLeft, index, length}) => {
	return (
		<div className="test-progress progress">
			<div>{isTimed ? `${timeLeft}s` : `${index + 1}/${length}`}</div>
		</div>
	);
};

export default TestProgress;
