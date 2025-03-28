import React, {memo} from "react";
import Test from "./components/Test/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";

import Fadable from "./components/Fadable/Fadable";
import TestMode from "./components/Test/TestMode";
import {PiKeyboardLight} from "react-icons/pi";
const Header = memo(() => (
	<Fadable>
		<header>
			<div>
				<div className="logo">
					<h1>minTY</h1>
					<PiKeyboardLight />
				</div>
				<nav>
					<RiSettings4Fill />
				</nav>
			</div>
			<div className="">User Profile</div>
		</header>
	</Fadable>
));

function App() {
	return (
		<div className="app">
			<Header />
			<TestMode />
			<Test />
		</div>
	);
}

export default App;
