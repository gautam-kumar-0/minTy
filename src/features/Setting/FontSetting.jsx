import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setFontSize, setFontFamily} from "./settingSlice";
import Select from "./Select";
import toast from "react-hot-toast";

function FontSetting() {
	const fontSize = useSelector((state) => state.settings.fontSize);
	const fontFamily = useSelector((state) => state.settings.fontFamily);
	const dispatch = useDispatch();
	const [size, setSize] = useState(fontSize);
	const [family, setFamily] = useState(fontFamily);

	useEffect(() => {
		setSize(fontSize);
		setFamily(fontFamily);
	}, [fontSize, fontFamily]);

	const fontFamilyOptions = [
		{value: "IBM Plex Mono", label: "IBM Plex Mono"},
		{value: "Fira Code", label: "Fira Code"},
		{value: "Source Code Pro", label: "Source Code Pro"},
		{value: "Consolas", label: "Consolas"},
	];

	const fontSizeOptions = [
		{value: "12", label: "Small"},
		{value: "14", label: "Medium"},
		{value: "16", label: "Large"},
		{value: "18", label: "Extra Large"},
	];

	const handleFontSizeChange = (newValue) => {
		setSize(parseInt(newValue));
		dispatch(setFontSize(parseInt(newValue)));
		toast.success(`Font size changed to ${newValue}`);
	};

	const handleFontFamilyChange = (newValue) => {
		setFamily(newValue);
		dispatch(setFontFamily(newValue));
		toast.success(`Font family changed to ${newValue}`);
	};

	return (
		<div>
			<Select
				label="Font Family"
				value={family}
				onChange={handleFontFamilyChange}
				options={fontFamilyOptions}
				description="Choose the font for typing"
			/>

			<Select
				label="Font Size"
				value={size.toString()}
				onChange={handleFontSizeChange}
				options={fontSizeOptions}
				description="Adjust the size of the text"
			/>
		</div>
	);
}

export default FontSetting;
