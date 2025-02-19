import React, {useEffect, useState} from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";
import useTestContext from "../hooks/useTestContext.js";

const TestResult = ({setText}) => {
	const [state, dispatch] = useTestContext();
	let totalwpm = 0;

	const [result, setResult] = useState(null);
	console.log(result);
	const handleNext = (e) => {
		console.log(e);
		setText((prev) => {
			console.log(prev);
			return "";
		});
	};
	console.log(state, result);
	useEffect(() => {
		if (state.status == "complete") {
			const r = state.words.map((word, i) => {
				console.log("Inside R", word, i);
				totalwpm += word.wpm;
				return {
					name: i + 1,
					raw: Math.round(word.wpm),
					errors: word.errors,
					average: Math.round(totalwpm / (i + 1)),
				};
			});
			setResult(r);
		}
	}, [state]);
	const renderLineChart = (
		<LineChart
			width={600}
			height={300}
			data={result}
			margin={{top: 5, right: 20, bottom: 5, left: 0}}
		>
			<Line type="monotone" dataKey="raw" stroke="#8884d8" />
			<Line type="monotone" dataKey="average" stroke="#0ff1ce" />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
		</LineChart>
	);

	return (
		<div className="result">
			{renderLineChart}
			<button onClick={handleNext}>Next Test</button>
		</div>
	);
};

export default TestResult;
