import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setKeyboard} from "./settingSlice";
import Toggle from "./Toggle";
import toast from "react-hot-toast";

function KeyboardSetting() {
	const keyboard = useSelector((state) => state.settings.keyboard);
	const dispatch = useDispatch();
	const [value, setValue] = useState(keyboard);

	useEffect(() => {
		setValue(keyboard);
	}, [keyboard]);

	const handleChange = (newValue) => {
		setValue(newValue);
		dispatch(setKeyboard(newValue));
		toast.success(`Keyboard display ${newValue ? "enabled" : "disabled"}`);
	};

	return (
		<div>
			<Toggle
				label="Show Keyboard"
				value={value}
				onChange={handleChange}
				description="Display virtual keyboard while typing"
			/>
		</div>
	);
}

export default KeyboardSetting;
