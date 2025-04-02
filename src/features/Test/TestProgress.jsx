import React from "react";
const format = (n) => (n != Infinity ? n : "∞ ");

const TestProgress = ({type, timeLeft, index, length, value}) => {
	return (
		<div className="test-progress progress">
			{type === "time" ? (
				<div className="time">
					<span className="primary">A{format(timeLeft)}</span>
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
