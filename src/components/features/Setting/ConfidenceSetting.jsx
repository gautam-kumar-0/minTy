import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setConfidence} from "./settingSlice";
import Toggle from "./Toggle";
import toast from "react-hot-toast";

function ConfidenceSetting() {
	const confidence = useSelector((state) => state.settings.confidence);
	const dispatch = useDispatch();
	const [value, setValue] = useState(confidence);

	useEffect(() => {
		setValue(confidence);
	}, [confidence]);

	const handleChange = (newValue) => {
		setValue(newValue);
		dispatch(setConfidence(newValue));
		toast.success(`Confidence Mode ${newValue ? "enabled" : "disabled"}`);
	};

	return (
		<div>
			<Toggle
				label="Confidence Mode"
				value={value}
				onChange={handleChange}
				description="Disable showing typing error"
			/>
		</div>
	);
}

export default ConfidenceSetting;
