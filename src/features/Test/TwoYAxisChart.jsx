import React from "react";
import {
	ComposedChart,
	Line,
	Scatter,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const chartConfig = {
	colors: {
		primary: "var(--text-muted)",
		grid: "var(--primary-50)",
		scatter: "var(--error)",
		lineAverage: "var(--primary-500)",
		lineRaw: "var(--text-unprocessed)",
		areaFill: "var(--bg-keyboard)",
		tooltipBackground: "var(--bg-keyboard)",
		tooltipText: "var(--text-tertiary)",
	},
	fontSize: 12,
	strokeWidth: {
		grid: 1,
		line: 2,
		dot: 0,
		activeDot: 4,
		tickLine: 0.5,
	},
	chartDimensions: {
		width: 600,
		height: 250,
		margin: {top: 20, right: 20, bottom: 20, left: 20},
	},
	yAxisLabelOffset: 80,
};

const animationConfig = {
	isAnimationActive: true,
	animationDuration: 600,
	animationEasing: "ease-in-out",
};

const CustomScatterShape = (props) => {
	const {cx, cy, payload} = props;
	return payload.errors !== 0 ? (
		<text
			x={cx}
			y={cy}
			textAnchor="middle"
			dominantBaseline="middle"
			fontSize={10}
			fill={chartConfig.colors.scatter}
		>
			✕ {/* Unicode cross symbol */}
		</text>
	) : null;
};

const TwoYAxisChart = ({result}) => {
	const maxErrors = Math.max(...result.map((d) => d.errors)) + 1;

	return (
		<ResponsiveContainer width="100%" height={300}>
			<ComposedChart
				width={chartConfig.chartDimensions.width}
				height={chartConfig.chartDimensions.height}
				data={result}
				margin={chartConfig.chartDimensions.margin}
			>
				<CartesianGrid
					stroke={chartConfig.colors.grid}
					strokeWidth={chartConfig.strokeWidth.grid}
				/>
				<XAxis
					dataKey="name"
					tick={{
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					label={{
						value: "Words",
						position: "insideBottom",
						offset: -10,
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: chartConfig.strokeWidth.tickLine}}
				/>
				<YAxis
					yAxisId="left"
					orientation="left"
					tick={{
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					label={{
						value: "Words per Minute",
						angle: -90,
						position: "insideLeft",
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
						dy: chartConfig.yAxisLabelOffset,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: chartConfig.strokeWidth.tickLine}}
				/>
				<YAxis
					yAxisId="right"
					orientation="right"
					min={0}
					max={maxErrors}
					tickFormatter={(tick) => (tick === 0 ? "" : tick)}
					tick={{
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					label={{
						value: "Errors",
						angle: -90,
						position: "insideRight",
						fill: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					axisLine={{strokeWidth: 0}}
					tickLine={{strokeWidth: chartConfig.strokeWidth.tickLine}}
				/>
				<Tooltip
					cursor={false}
					contentStyle={{
						backgroundColor: chartConfig.colors.tooltipBackground,
						border: "2px solid",
						borderColor: "var(--border-medium)",
						borderRadius: "8px",
					}}
					itemStyle={{
						color: chartConfig.colors.tooltipText,
						fontSize: chartConfig.fontSize,
					}}
					labelStyle={{
						color: chartConfig.colors.primary,
						fontSize: chartConfig.fontSize,
					}}
					formatter={(value, name) => [`${value}`, name]}
				/>
				<Area
					yAxisId="left"
					type="monotone"
					dataKey="raw"
					stroke={chartConfig.colors.lineRaw}
					strokeWidth={chartConfig.strokeWidth.line}
					dot={{
						strokeWidth: chartConfig.strokeWidth.dot,
						fill: chartConfig.colors.lineRaw,
					}}
					activeDot={{
						strokeWidth: chartConfig.strokeWidth.dot,
						fill: chartConfig.colors.lineRaw,
						r: chartConfig.strokeWidth.activeDot,
					}}
					fill={chartConfig.colors.areaFill}
					{...animationConfig}
				/>

				<Line
					isAnimationActive={false}
					yAxisId="left"
					type="monotone"
					dataKey="average"
					stroke={chartConfig.colors.lineAverage}
					strokeWidth={chartConfig.strokeWidth.line}
					dot={{
						strokeWidth: chartConfig.strokeWidth.dot,
						fill: chartConfig.colors.lineAverage,
						r: 2,
					}}
					activeDot={{
						strokeWidth: chartConfig.strokeWidth.dot,
						fill: chartConfig.colors.lineAverage,
						r: chartConfig.strokeWidth.activeDot,
					}}
					{...animationConfig}
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
