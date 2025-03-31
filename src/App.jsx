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
import {FaGithub, FaHeart} from "react-icons/fa";

const Header = memo(() => (
	<Fadable className="header">
		<header>
			<div>
				<Link to="/" className="logo">
					<h1>minTY</h1>
					<PiKeyboardLight />
				</Link>
				<nav>
					<Link to="/setting">
						<RiSettings4Fill />
					</Link>
				</nav>
			</div>
			<div className="project-info">
				<a href="https://github.com/gautam-kumar-0/minTy">
					&lt;View Source/&gt;
				</a>
				<span>
					Made with <FaHeart />
				</span>
			</div>
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
