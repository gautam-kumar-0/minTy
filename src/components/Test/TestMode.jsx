import React, {useEffect, useState} from "react";
import "./TestMode.css";
import Fadable from "../Fadable/Fadable";
import {BsWrench} from "react-icons/bs";
import useTestContext from "../../hooks/useTestContext";

const MODE = {
	time: [10, 30, 60, 120, null],
	words: [10, 25, 50, 100, null],
	quote: ["short", "medium", "long"],
};
const ModeValue = ({value, onClick}) => {
	const [state] = useTestContext();
	return (
		<div
			className={`mode-value ${state.mode.value == value ? "active" : ""}`}
			onClick={() => onClick(value)}
		>
			<span>{value}</span>
		</div>
	);
};
const CustomValue = ({label, onSubmit}) => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(null);
	const [state] = useTestContext();
	useEffect(() => {
		let hidePop = (e) => {
			if (!e.target.closest(".custom-value-container")) {
				setShow(false);
			}
		};
		window.addEventListener("click", hidePop);
		return () => removeEventListener("click", hidePop);
	});
	return (
		<div className="custom-value-container">
			<div
				className={`custom-value ${state.mode.value == value ? "active" : ""}`}
				onClick={() => setShow(!show)}
			>
				<span>
					<BsWrench />
				</span>
			</div>
			{show && (
				<div className="pop-up">
					<button className="close-btn" onClick={() => setShow(false)}>
						&times;
					</button>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setShow(false);
							onSubmit(value);
						}}
					>
						<input
							type="number"
							id="custom"
							value={value}
							onKeyDown={(e) => e.stopPropagation()}
							onChange={(e) => {
								setValue(e.target.value);
								e.stopPropagation();
							}}
							max={1000}
							placeholder="0"
						/>
						<label htmlFor="custom">
							<span>Enter the amount of {label}</span>
							<br />
							<span>(Max 1000) use 0 for infinity.</span>
						</label>
						<button type="submit" disabled={!value}>
							OK
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
const TestMode = ({mode, dispatch}) => {
	const [custom, setCustom] = React.useState(0);
	const [showCustom, setShowCustom] = React.useState(false);
	const [activeMode, setActiveMode] = useState();

	const handleModeChange = (key) => {
		dispatch({type: "SET_MODE", payload: {type: key, value: MODE[key][0]}});
	};
	const handleValueChange = (value) => {
		console.log(value);
		dispatch({type: "SET_MODE", payload: {...mode, value}});
	};

	return (
		<Fadable className="mode-container">
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
						MODE[mode.type]?.map((v, i) =>
							v ? (
								<ModeValue key={i} value={v} onClick={handleValueChange} />
							) : (
								<CustomValue
									key={i}
									label={mode.type}
									onSubmit={handleValueChange}
								/>
							)
						)}
				</div>
			</div>{" "}
		</Fadable>
	);
};

export default TestMode;
