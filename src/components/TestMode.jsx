import React, {useState} from "react";
import "./TestMode.css";
import Fadable from "./Fadable/Fadable";
import {BsWrench} from "react-icons/bs";
import useTestContext from "../hooks/useTestContext";

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
	const [value, setValue] = useState(0);
	const [state] = useTestContext();
	return (
		<div
			className={`custom-value ${state.mode.value == value ? "active" : ""}`}
			onClick={() => setShow(!show)}
		>
			<div className="pop-up">
				<span>
					<BsWrench />
				</span>
				<form
					onSubmit={() => {
						setShow(false);
						onSubmit(value);
					}}
				>
					<input
						type="text"
						id="custom"
						value={value}
						onChange={(e) => setValue(e)}
					/>
					<label htmlFor="custom">{label}</label>
					<button type="submit">OK</button>
				</form>
			</div>
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
		// console.log(value);
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
