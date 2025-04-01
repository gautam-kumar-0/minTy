import {useEffect, useCallback} from "react";
import {useSelector} from "react-redux";

const useAppearance = () => {
	const {theme, fontSize, fontFamily} = useSelector((state) => state.settings);

	const updateStyles = useCallback(() => {
		try {
			const rootStyle = document.documentElement.style;
			rootStyle.setProperty("--primary-background", theme.bg);
			rootStyle.setProperty("--primary-foreground", theme.fg);
			rootStyle.setProperty("--primary-color", theme.primary);
			rootStyle.setProperty("--setting-fontFamily", fontFamily);
			rootStyle.setProperty("--setting-fontSize", `${fontSize}px`);
		} catch (error) {
			console.error("Error updating styles:", error);
		}
	}, [theme, fontSize, fontFamily]);

	useEffect(() => {
		updateStyles();
	}, [updateStyles]);
};

export default useAppearance;
