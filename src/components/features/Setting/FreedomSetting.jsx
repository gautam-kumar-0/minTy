import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setFreedom} from "./settingSlice";
import Toggle from "./Toggle";
import toast from "react-hot-toast";

function FreedomSetting() {
	const freedom = useSelector((state) => state.settings.freedom);
	const dispatch = useDispatch();
	const [value, setValue] = useState(freedom);

	useEffect(() => {
		setValue(freedom);
	}, [freedom]);

	const handleChange = (newValue) => {
		setValue(newValue);
		dispatch(setFreedom(newValue));
		toast.success(`Freedom Mode ${newValue ? "enabled" : "disabled"}`);
	};

	return (
		<div>
			<Toggle
				label="Freedom Mode"
				value={value}
				onChange={handleChange}
				description="Allow typing without restrictions"
			/>
		</div>
	);
}

export default FreedomSetting;
