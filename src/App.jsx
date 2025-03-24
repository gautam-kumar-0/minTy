import Test from "./Test/Test";
import {RiSettings4Fill} from "react-icons/ri";
import "./App.css";
import {LuKeyboard} from "react-icons/lu";
import Fadable from "./components/Fadable/Fadable";

function App() {
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

			<Test />
		</div>
	);
}

export default App;
