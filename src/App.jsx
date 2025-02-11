import {useState} from "react";
import Test from "./components/Test";
import "./App.css";
import ResultContext from "./components/context/ResultContext.js";
import TestResult from "./components/TestResult.jsx";
function App() {
	const [status, setStatus] = useState("idle");
	const text =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, illum!";
	// todo find a way to store wpm and other stats
	return (
		<>
			<div className="starfall"></div>
			<Test status={status} setStatus={setStatus} text={text} />
		</>
	);
}

export default App;
