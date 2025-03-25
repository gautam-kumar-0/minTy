import {useSelector, useDispatch} from "react-redux";
const useModeSlice = () => {
	const mode = useSelector((state) => state.mode);
	const dispatch = useDispatch();
	return [mode, dispatch];
};

export default useModeSlice;
