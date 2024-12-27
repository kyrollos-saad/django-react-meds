import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import API from "../api/api";

function ChartDashboard() {
	const [chartData, setChartData] = useState({});
	const [chartType, setChartType] = useState("pie");

	const chartTypes = [
		{ type: "bar", label: "Bar Chart" },
		{ type: "pie", label: "Pie Chart" },
		{ type: "doughnut", label: "Doughnut Chart" },
	];

	const fetchRefillStats = async () => {
		try {
			const res = await API.get("/api/medications/refill-requests-list");
			const stats = res.data.medications;

			const labels = stats.map((item) => item.name);
			const data = stats.map((item) => item.refillRequestsCount);

			setChartData({
				labels,
				datasets: [
					{
						label: "Refill Requests per Medication",
						data,
						backgroundColor: "rgba(120, 200, 130, 1)",
					},
				],
			});
		} catch (error) {
			console.error("Error fetching refill stats:", error);
		}
	};

	useEffect(() => {
		fetchRefillStats();
	}, []);

	return (
		<div class="chart-component">
			<h2>Dashboard</h2>

			<div class="chart-type-radios">
				{chartTypes.map((chart) => (
					<label key={chart.type} style={{ marginRight: "20px" }}>
						<input
							type="radio"
							name="chartType"
							value={chart.type}
							checked={chartType === chart.type}
							onChange={() => setChartType(chart.type)}
						/>
						{chart.label}
					</label>
				))}
			</div>

			<div class="chart-container">
				{/* Pie */}
				{chartType === "pie" &&
					(chartData.labels ? (
						<Pie
							data={chartData}
							options={{
								responsive: true,
								scales: {
									y: {
										beginAtZero: true,
										stepSize: 1,
									},
								},
							}}
						/>
					) : (
						<p>Loading chart data...</p>
					))}
				{/* Doughnut */}
				{chartType === "doughnut" &&
					(chartData.labels ? (
						<Doughnut
							data={chartData}
							options={{
								responsive: true,
								scales: {
									y: {
										beginAtZero: true,
										stepSize: 1,
									},
								},
							}}
						/>
					) : (
						<p>Loading chart data...</p>
					))}
				{/* Bar */}
				{chartType === "bar" &&
					(chartData.labels ? (
						<Bar
							data={chartData}
							options={{
								responsive: true,
								scales: {
									y: {
										beginAtZero: true,
										stepSize: 1,
									},
								},
							}}
						/>
					) : (
						<p>Loading chart data...</p>
					))}
			</div>
		</div>
	);
}

export default ChartDashboard;
