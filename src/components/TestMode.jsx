import React from "react";
import "./TestMode.css";

const MODE = {
	time: [30, 60, 120, "custom"],
	words: [10, 25, 50, 100, "custom"],
	quote: ["short", "medium", "long"],
	custom: ["change"],
};

const TestMode = ({mode, setMode, className}) => {
	const handleModeChange = (key) => {
		setMode({type: key, index: 0});
	};
	const handleValueChange = (index) => {
		setMode({...mode, index: index});
	};

	return (
		<div className={`mode-container ${className}`}>
			<div className="mode-ribbon">
				<div className="additional"></div>
				<div className="mode-type">
					{Object.keys(MODE).map((key, i) => (
						<div
							className={`${mode.type == key ? "active" : ""} mode`}
							key={i}
							onClick={() => handleModeChange(key)}
						>
							<span>{key}</span>
						</div>
					))}
				</div>
				<div className="mode-values">
					{mode &&
						MODE[mode.type].map((v, i) => (
							<div
								className={`${mode.index == i ? "active" : ""} values`}
								key={i}
								onClick={() => handleValueChange(i)}
							>
								<span>{v}</span>
							</div>
						))}
				</div>
			</div>{" "}
		</div>
	);
};

export default TestMode;
