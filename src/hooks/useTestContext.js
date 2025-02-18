import {useContext} from "react";
import {
	TestContext,
	TestDispatchContext,
} from "../components/context/TestContextProvider.jsx";

const useTestContext = () => {
	return [useContext(TestContext), useContext(TestDispatchContext)];
};
export default useTestContext;
