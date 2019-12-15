import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Legend, Tooltip, LineChart, Line, XAxis, YAxis, Label } from 'recharts';
import AppLayout from '../src/AppLayout';

export default function Chart(props) {
	const theme = useTheme();
	const [data, setData] = useState({
		"2019-12-14": [
			{
				"time": "19:40",
				"emotion": 0.3125,
				"probability": 0.6269212333375976
			},
			{
				"time": "19:41",
				"emotion": -0.07692307692307693,
				"probability": 0.41124704984995086
			}
		]
	});
	useEffect(() => {
		async function fetchData() {
			const url = 'http://eco-courses.project.corpberry.com:8000/courses/courseprogress/test-course-user/633437c0-f1bd-4316-8d26-b83d957420ae/';
			const response = await fetch(url);
			const data = await response.json();
			const { user_attention: MLData } = data.formsList[0].data;
			setData(MLData);
		}
		fetchData();
	}, []);

	function createData(date, emotion, probability) {
		return {
			date: date.toISOString().slice(5, 16).replace('-', '.').replace('T', ' '),
			emotion,
			probability
		};
	}

	const chartData = Object.entries(data).reduce((acc, [date, item]) => {

		item.forEach(point => {
			const { time, emotion, probability } = point;
			const fullDate = new Date(`${date}T${time}`);
			acc.push(createData(fullDate, emotion, probability));
		});

		return acc;
	}, []);

	console.log('data', chartData);

	return (
		<AppLayout>
			<div>
				<LineChart
					width={1200} height={300}
					data={chartData}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis dataKey="date" stroke={theme.palette.text.primary} />
					<YAxis stroke={theme.palette.text.primary}>
					</YAxis>
					<Tooltip />
					<Legend verticalAlign="top" height={36}/>
					<Line type="monotone" dataKey="emotion" stroke={theme.palette.primary.main} dot={true} />
					<Line type="monotone" dataKey="probability" stroke={theme.palette.secondary.main} dot={true} />
				</LineChart>
			</div>
		</AppLayout>
	)
}
