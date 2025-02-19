import React from "react";

const TestProgress = () => {
	const setting = {
		word: true,
	};
	return (
		<div className="test-progress">
			<div>
				{state.index + 1} / {state.words.length}
			</div>
		</div>
	);
};

export default TestProgress;
