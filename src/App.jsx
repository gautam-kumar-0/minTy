import {useState} from "react";
import Test from "./components/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import {LuKeyboard} from "react-icons/lu";
import useTestContext from "./hooks/useTestContext";
import Fadable from "./components/Fadable/Fadable";
import TestMode from "./components/TestMode";

function App() {
	const [state, dispatch] = useTestContext();
	return (
		<div className="app">
			<div className="starfall"></div>

			<header>
				<Fadable>
					<div className="logo">
						<h1>TYPING</h1>
						<LuKeyboard />
					</div>

					<nav>
						<RiSettings4Fill />
					</nav>
				</Fadable>
			</header>
			<TestMode mode={state.mode} dispatch={dispatch} />
			<Test />
		</div>
	);
}

export default App;
