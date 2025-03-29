import {useEffect} from "react";
import {useSelector} from "react-redux";

const useAppearance = () => {
	const {theme, fontSize, fontFamily} = useSelector((state) => state.settings);

	useEffect(() => {
		const rootStyle = document.documentElement.style;
		rootStyle.setProperty("--primary-background", theme.bg);
		rootStyle.setProperty("--primary-foreground", theme.fg);
		rootStyle.setProperty("--primary-color", theme.primary);
		rootStyle.setProperty("--setting-fontFamily", fontFamily);
		rootStyle.setProperty("--setting-fontSize", fontSize + "px");
	}, [theme, fontSize, fontFamily]);
};

export default useAppearance;
