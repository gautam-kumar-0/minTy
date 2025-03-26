import React, {useEffect, useState, useRef} from "react";
import "./TestMode.css";
import Fadable from "../Fadable/Fadable";
import {BsWrench} from "react-icons/bs";
import {BiFile} from "react-icons/bi";
import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks
import {setType, setValue} from "./modeSlice"; // Import actions

const ModeValue = ({value, handleSelect}) => {
	const mode = useSelector((state) => state.mode); // Select the mode state
	return (
		<div
			className={`mode-value ${parseInt(mode.value) == value ? "active" : ""}`}
			onClick={() => handleSelect(value)}
		>
			<span>{value}</span>
		</div>
	);
};

const CustomValue = ({label, handleSelect}) => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(null);
	const mode = useSelector((state) => state.mode); // Select the mode state
	const input = useRef(null);
	useEffect(() => {
		let hidePop = (e) => {
			if (!e.target.closest(".custom-value-container")) {
				setShow(false);
			}
		};

		window.addEventListener("click", hidePop);
		return () => removeEventListener("click", hidePop);
	}, []);
	return (
		<div className="custom-value-container">
			<div
				className={`custom-value ${mode.value == value ? "active" : ""}`}
				onClick={() => {
					setShow(!show);
				}}
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
							if (value == 0) handleSelect(Infinity);
							else handleSelect(value);
						}}
					>
						<input
							autoFocus
							ref={input}
							type="number"
							id="custom"
							value={value}
							onChange={(e) => {
								setValue(e.target.value);
							}}
							max={1000}
							min={0}
							placeholder="0"
						/>
						<label htmlFor="custom">
							<span>{label}</span>
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

const CustomText = ({label, handleSelect}) => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(null);
	const mode = useSelector((state) => state.mode); // Select the mode state
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
				className={`custom-value ${mode.value == value ? "active" : ""}`}
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
					<div className="actions">
						<button className="save-text">
							<BiFile />
						</button>
						<button className="open-saved">
							<BiFile />
						</button>
						<button className="open-file">
							<BiFile />
						</button>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setShow(false);
							if (value == 0) handleSelect(Infinity);
							else handleSelect(value);
						}}
					>
						<textarea
							id="custom"
							value={value}
							onKeyDown={(e) => e.stopPropagation()}
							onChange={(e) => {
								setValue(e.target.value);
								e.stopPropagation();
							}}
							placeholder="Paste or Enter your desired text here."
						/>
						<label htmlFor="custom">
							<span>{label}</span>
							<br />
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

const MODE = {
	time: [
		{
			Element: ModeValue,
			value: 10,
		},

		{
			Element: ModeValue,
			value: 30,
		},
		{
			Element: ModeValue,
			value: 60,
		},
		{
			Element: ModeValue,
			value: 120,
		},
		{
			Element: CustomValue,
			label: "Enter the number of seconds.",
		},
	],
	words: [
		{
			Element: ModeValue,
			value: 10,
		},
		{
			Element: ModeValue,
			value: 25,
		},
		{
			Element: ModeValue,
			value: 50,
		},
		{
			Element: ModeValue,
			value: 100,
		},
		{
			Element: CustomValue,
			label: "Enter the number of words.",
		},
	],
	quote: [
		{
			Element: ModeValue,
			value: "short",
		},
		{
			Element: ModeValue,
			value: "medium",
		},
		{
			Element: ModeValue,
			value: "long",
		},
	],
};

const TestMode = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const mode = useSelector((state) => state.mode); // Select the mode state
	const handleModeChange = (key) => {
		dispatch(setType(key));
	};
	const handleValueChange = (value) => {
		console.log(value);
		dispatch(setValue(value));
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
						MODE[mode.type]?.map(({Element, ...rest}, i) => {
							return (
								<Element key={i} handleSelect={handleValueChange} {...rest} />
							);
						})}
				</div>
			</div>
		</Fadable>
	);
};

export default TestMode;
