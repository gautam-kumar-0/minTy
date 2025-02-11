import React, {useContext} from "react";
import {resultContext} from "./context/ResultContext.js";

const TestResult = () => {
	const {data, isCompleted} = useContext(resultContext);
	console.log(data);
	return <div>Result</div>;
};

export default TestResult;
