import React, { useState, useEffect, useRef } from "react";
import {
	BarChart,
	CartesianGrid,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import { startOfHour, parseISO, format } from "date-fns";

import useDashboard from "../../hooks/useDashboard";

const Chart = () => {

	const date = useRef(new Date().toISOString());
	const { tickets } = useDashboard({ date: date.current });

	const [chartData, setChartData] = useState([
		{ time: "08:00", amount: 0 },
		{ time: "09:00", amount: 0 },
		{ time: "10:00", amount: 0 },
		{ time: "11:00", amount: 0 },
		{ time: "12:00", amount: 0 },
		{ time: "13:00", amount: 0 },
		{ time: "14:00", amount: 0 },
		{ time: "15:00", amount: 0 },
		{ time: "16:00", amount: 0 },
		{ time: "17:00", amount: 0 },
		{ time: "18:00", amount: 0 },
		{ time: "19:00", amount: 0 },
		{ time: "20:00", amount: 0 },
		{ time: "21:00", amount: 0 },
		{ time: "22:00", amount: 0 },
		{ time: "23:00", amount: 0 },
		{ time: "00:00", amount: 0 },
	]);

	useEffect(() => {
		setChartData(prevState => {
			let aux = [...prevState];

			aux.forEach(a => {
				tickets.forEach(ticket => {
					format(startOfHour(parseISO(ticket.createdAt)), "HH:mm") === a.time &&
						a.amount++;
				});
			});

			return aux;
		});
	}, [tickets]);

	return (
		<React.Fragment>
			<h1 style={{color:"#d0d2d6", fontFamily:"Regular"}}>Atendimentos Hoje: {tickets.length}</h1>
			<ResponsiveContainer>
				<BarChart
					data={chartData}
					barSize={40}
					width={730}
					height={250}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" stroke={"white"} />
					<YAxis
						type="number"
						allowDecimals={false}
						stroke={"white"}
					>
						
					</YAxis>
					<Bar dataKey="amount" fill={"#a5f8cd"} />
				</BarChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default Chart;
