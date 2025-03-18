import {useState} from "react";
import Test from "./components/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import TestContextProvider from "./components/context/TestContextProvider.jsx";
import {LuKeyboard} from "react-icons/lu";

function App() {
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
				{/* <TestMode mode={mode} setMode={setMode} /> */}
				<Test />
			</TestContextProvider>
		</div>
	);
}

export default App;
