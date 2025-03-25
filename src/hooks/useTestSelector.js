import {useSelector, useDispatch} from "react-redux";

const useTestSelector = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.test);
	return [state, dispatch];
};

export default useTestSelector;
