import React, {memo, useEffect, useRef, useState} from "react";
import {RiSettings4Fill} from "react-icons/ri";
import {PiKeyboardLight} from "react-icons/pi";
import {FaHeart} from "react-icons/fa";
import {Link, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import "./App.css";
import Fadable from "./components/Fadable/Fadable";
import Main from "./pages/Main";
import Setting from "./pages/Setting";
import useAppearance from "./hooks/useAppearance";
import useLocalSetting from "./hooks/useLocalSetting";

const Header = memo(() => {
	const headerRef = useRef(null);
	const [prevScroll, setPrevScroll] = useState(window.scrollY);

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			if (currentScroll < prevScroll) {
				headerRef.current.classList.add("show");
			} else {
				headerRef.current.classList.remove("show");
			}
			setPrevScroll(currentScroll);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScroll]);

	return (
		<Fadable>
			<header className="header" ref={headerRef}>
				<div>
					<Logo />
					<Navigation />
				</div>
				<ProjectInfo />
			</header>
		</Fadable>
	);
});

const Logo = () => (
	<Link to="/" className="logo">
		<h1>minTY</h1>
		<PiKeyboardLight />
	</Link>
);

const Navigation = () => (
	<nav>
		<Link to="/setting">
			<RiSettings4Fill />
		</Link>
	</nav>
);

const ProjectInfo = () => (
	<div className="project-info">
		<a href="https://github.com/gautam-kumar-0/minTy">&lt;View Source/&gt;</a>
		<span>
			Made with <FaHeart />
		</span>
	</div>
);

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
