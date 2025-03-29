import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setEnableSound, setSound} from "./settingSlice";
import Toggle from "./Toggle";
import Select from "./Select";
import toast from "react-hot-toast";

function SoundSetting() {
	const enableSound = useSelector((state) => state.settings.enableSound);
	const sound = useSelector((state) => state.settings.sound);
	const dispatch = useDispatch();
	const [isEnabled, setIsEnabled] = useState(enableSound);
	const [selectedSound, setSelectedSound] = useState(sound);

	useEffect(() => {
		setIsEnabled(enableSound);
		setSelectedSound(sound);
	}, [enableSound, sound]);

	const soundOptions = [
		{value: "mechanical", label: "Mechanical"},
		{value: "membrane", label: "Membrane"},
		{value: "silent", label: "Silent"},
	];

	const handleEnableChange = (newValue) => {
		setIsEnabled(newValue);
		dispatch(setEnableSound(newValue));
		toast.success(`Sound ${newValue ? "enabled" : "disabled"}`);
	};

	const handleSoundChange = (newValue) => {
		setSelectedSound(newValue);
		dispatch(setSound(newValue));
		toast.success(`Sound type changed to ${newValue}`);
	};

	return (
		<div>
			<Toggle
				label="Enable Sound"
				value={isEnabled}
				onChange={handleEnableChange}
				description="Enable or disable typing sound effects"
			/>

			{isEnabled && (
				<Select
					label="Sound Type"
					value={selectedSound}
					onChange={handleSoundChange}
					options={soundOptions}
					description="Choose the type of keyboard sound"
				/>
			)}
		</div>
	);
}

export default SoundSetting;
