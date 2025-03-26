import React, {memo} from "react";
import Test from "./components/Test/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import {LuKeyboard} from "react-icons/lu";
import Fadable from "./components/Fadable/Fadable";
import TestMode from "./components/Test/TestMode";
const Header = memo(() => (
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
));

function App() {
	return (
		<div className="app">
			<div className="starfall"></div>
			<Header />
			<TestMode />
			<Test />
		</div>
	);
}

export default App;
