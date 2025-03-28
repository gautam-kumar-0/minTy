import React, {memo} from "react";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";

import Fadable from "./components/Fadable/Fadable";

import {PiKeyboardLight} from "react-icons/pi";
import {Link, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
const Header = memo(() => (
	<Fadable>
		<header>
			<div>
				<div className="logo">
					<Link to="/">
						<h1>minTY</h1>
					</Link>
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
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</div>
	);
}

export default App;
