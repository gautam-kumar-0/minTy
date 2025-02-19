import {useState} from "react";
import Test from "./components/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import TestContextProvider from "./components/context/TestContextProvider.jsx";
import {LuKeyboard} from "react-icons/lu";
function App() {
	const [status, setStatus] = useState("idle");
	const text =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, illum!";
	// todo find a way to store wpm and other stats
	return (
		<div className="app">
			<div className="starfall"></div>

			<TestContextProvider>
				<header>
					<div className="logo">
						<h1>TYPING</h1>
						<LuKeyboard />
					</div>

					<nav>
						<RiSettings4Fill />
					</nav>
				</header>
				<Test status={status} setStatus={setStatus} text={text} />
			</TestContextProvider>
		</div>
	);
}

export default App;
