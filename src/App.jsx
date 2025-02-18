import {useState} from "react";
import Test from "./components/Test";
import "./App.css";
import TestContextProvider from "./components/context/TestContextProvider.jsx";
function App() {
	const [status, setStatus] = useState("idle");
	const text =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, illum!";
	// todo find a way to store wpm and other stats
	return (
		<>
			<div className="starfall"></div>
			<TestContextProvider>
				<Test status={status} setStatus={setStatus} text={text} />
			</TestContextProvider>
		</>
	);
}

export default App;
