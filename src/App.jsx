import React, {memo, useEffect, useRef, useState, useCallback} from "react";
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

const Logo = memo(() => (
	<Link to="/" className="logo">
		<h1>minTY</h1>
		<PiKeyboardLight />
	</Link>
));

const Navigation = memo(() => (
	<nav>
		<Link to="/setting">
			<RiSettings4Fill />
		</Link>
	</nav>
));

const ProjectInfo = memo(() => (
	<div className="project-info">
		<a href="https://github.com/gautam-kumar-0/minTy">&lt;View Source/&gt;</a>
		<span>
			Made with <FaHeart />
		</span>
	</div>
));

const throttle = (fn, wait) => {
	let isExecuted = false;
	return () => {
		if (isExecuted) return;
		isExecuted = true;
		fn();
		setTimeout(() => (isExecuted = false), wait);
	};
};

const Header = memo(() => {
	const [visible, setVisible] = useState(true);
	const prevScrollRef = useRef(0);

	const handleScroll = throttle(() => {
		const currentScrollPos = window.pageYOffset;
		const isVisible = prevScrollRef.current > currentScrollPos;
		setVisible(isVisible);
		prevScrollRef.current = currentScrollPos;
	}, 500);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Fadable className="headerContainer">
			<header className={`header ${visible ? "show" : ""}`}>
				<div>
					<Logo />
					<Navigation />
				</div>
				<ProjectInfo />
			</header>
		</Fadable>
	);
});

const App = () => {
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
};

export default memo(App);
