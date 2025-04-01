import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSetting} from "../features/Setting/settingSlice";

const settingKey = "minty-setting";
const useLocalSetting = () => {
	const setting = useSelector((state) => state.settings);
	const dispatch = useDispatch();

	useEffect(() => {
		const savedSetting = localStorage.getItem(settingKey);

		if (savedSetting) dispatch(setSetting(JSON.parse(savedSetting)));
	}, []);

	useEffect(() => {
		localStorage.setItem(settingKey, JSON.stringify(setting));
	}, [setting]);
};

export default useLocalSetting;
