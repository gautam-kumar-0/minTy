import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCursor} from "./settingSlice";
import Select from "./Select";
import toast from "react-hot-toast";

function CursorSetting() {
	const cursor = useSelector((state) => state.settings.cursor);
	const dispatch = useDispatch();
	const [value, setValue] = useState(cursor);

	useEffect(() => {
		setValue(cursor);
	}, [cursor]);

	const options = [
		{value: "bar", label: "Bar"},
		{value: "block", label: "Block"},
		{value: "underline", label: "Underline"},
	];

	const handleChange = (newValue) => {
		setValue(newValue);
		dispatch(setCursor(newValue));
		toast.success(`Cursor style changed to ${newValue}`);
	};

	return (
		<div>
			<Select
				label="Cursor Style"
				value={value}
				onChange={handleChange}
				options={options}
				description="Choose how the cursor appears while typing"
			/>
		</div>
	);
}

export default CursorSetting;
