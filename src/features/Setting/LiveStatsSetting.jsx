import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setLiveStats} from "./settingSlice";
import Toggle from "./Toggle";
import toast from "react-hot-toast";

function LiveStatsSetting() {
	const liveStats = useSelector((state) => state.settings.liveStats);
	const dispatch = useDispatch();
	const [value, setValue] = useState(liveStats);

	useEffect(() => {
		setValue(liveStats);
	}, [liveStats]);

	const handleChange = (newValue) => {
		setValue(newValue);
		dispatch(setLiveStats(newValue));
		toast.success(`Live Statistics ${newValue ? "enabled" : "disabled"}`);
	};

	return (
		<div>
			<Toggle
				label="Live Statistics"
				value={value}
				onChange={handleChange}
				description="Show real-time typing statistics"
			/>
		</div>
	);
}

export default LiveStatsSetting;
