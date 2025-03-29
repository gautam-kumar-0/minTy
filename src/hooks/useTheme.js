import {useEffect} from "react";
import {useSelector} from "react-redux";

const useTheme = () => {
	const {bg, fg, primary} = useSelector((state) => state.settings.theme);

	useEffect(() => {
		const rootStyle = document.documentElement.style;
		rootStyle.setProperty("--primary-background", bg);
		rootStyle.setProperty("--primary-foreground", fg);
		rootStyle.setProperty("--primary-color", primary);
	}, [bg, fg, primary]);
};

export default useTheme;
