import React, {memo} from "react";
import TestMode from "../features/Test/TestMode";
import Test from "../features/Test/Test";

const Main = memo(() => {
	return (
		<main>
			<TestMode />
			<Test />
		</main>
	);
});

export default Main;
