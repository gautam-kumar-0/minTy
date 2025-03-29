import {useSelector} from "react-redux";

const useSound = () => {
	const {enableSound, sound} = useSelector((state) => state.settings);
};

export default useSound;
