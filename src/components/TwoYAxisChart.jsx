import React from "react";
import {
	ComposedChart,
	Line,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const primaryColor = "#0ff1ce88"; // color for labels and values of x-axis and y-axis
const gridColor = "#eeeeee17"; // color for gridlines subtle
const scatterColor = "tomato"; // color for scatter
const Linewithaverage = "gray"; // color for line with datakey = average
const linewithraw = "springgreen"; // color for line with datakey = raw

const CustomScatterShape = (props) => {
	const {cx, cy, payload} = props;
	return payload.errors != 0 ? (
		<text
			x={cx}
			y={cy}
			textAnchor="middle"
			dominantBaseline="middle"
			fontFamily="VT323"
			fontSize={14}
			fill={scatterColor}
		>
			x
		</text>
	) : null;
};

const TwoYAxisChart = ({result}) => {
	const maxErrors = Math.max(...result.map((d) => d.errors)) + 1;

	return (
		<ResponsiveContainer width="100%" height={300}>
			<ComposedChart
				width={600}
				height={250}
				data={result}
				margin={{top: 20, right: 20, bottom: 20, left: 20}}
			>
				<CartesianGrid
					stroke={gridColor}
					strokeWidth={1}
					lightingColor={"red"}
				/>
				<XAxis
					dataKey="name"
					tick={{fill: primaryColor, fontSize: 12}}
					label={{
						value: "Words",
						position: "insideBottom",
						offset: -10,
						fill: primaryColor,
						fontSize: 12,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: 0.5}}
				/>
				<YAxis
					yAxisId="left"
					orientation="left"
					tick={{fill: primaryColor, fontSize: 12}}
					label={{
						value: "Words per Minute",
						angle: -90,
						position: "insideLeft",
						fill: primaryColor,
						fontSize: 12,
						dy: 80,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: 0.5}}
				/>
				<YAxis
					yAxisId="right"
					orientation="right"
					min={0}
					max={maxErrors}
					tickFormatter={(tick) => (tick === 0 ? "" : tick)}
					tick={{fill: primaryColor, fontSize: 12}}
					label={{
						value: "Errors",
						angle: -90,
						position: "insideRight",
						fill: primaryColor,
						fontSize: 12,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: 0.5}}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						border: "none",
						borderRadius: "5px",
					}}
					itemStyle={{color: "#ffffff", fontSize: "12px"}}
					labelStyle={{color: primaryColor, fontSize: "12px"}}
					formatter={(value, name) => [`${value}`, name]}
				/>
				<Line
					yAxisId="left"
					type="monotone"
					dataKey="raw"
					stroke={linewithraw}
					strokeWidth={2}
					dot={{strokeWidth: 0, fill: linewithraw}}
					activeDot={{strokeWidth: 0, fill: linewithraw, r: 4}}
					isAnimationActive={false}
				/>
				<Line
					isAnimationActive={false}
					yAxisId="left"
					type="monotone"
					dataKey="average"
					stroke={Linewithaverage}
					strokeWidth={2}
					dot={{strokeWidth: 0, fill: Linewithaverage}}
					activeDot={{strokeWidth: 0, fill: Linewithaverage, r: 4}}
				/>
				<Scatter
					yAxisId="right"
					dataKey="errors"
					shape={<CustomScatterShape />}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};

export default TwoYAxisChart;
