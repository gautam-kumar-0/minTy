import React, {memo} from "react";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import {Toaster} from "react-hot-toast";

import Fadable from "./components/Fadable/Fadable";

import {PiKeyboardLight} from "react-icons/pi";
import {Link, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Setting from "./pages/Setting";
import useAppearance from "./hooks/useAppearance";
import useLocalSetting from "./hooks/useLocalSetting";

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
					<Link to="/setting">
						<RiSettings4Fill />
					</Link>
				</nav>
			</div>
			<div className="">User Profile</div>
		</header>
	</Fadable>
));

function App() {
	useLocalSetting();
	useAppearance();
	return (
		<div className="app">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/setting" element={<Setting />} />
			</Routes>
			<Toaster
				position="top-right"
				toastOptions={{
					className: "toast",
					style: {
						background: "var(--bg-tertiary)",
						color: "var(--text-color)",
						border: "2px solid var(--primary-300)",
					},
				}}
			/>
		</div>
	);
}

export default App;
