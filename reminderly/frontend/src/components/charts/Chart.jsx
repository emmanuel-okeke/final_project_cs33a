import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chart as JSChart } from "chart.js";

export class Chart extends Component {
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
	}

	static propTypes = {
		data: PropTypes.array.isRequired,
		title: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	};

	componentDidMount() {
		this.myChart = new JSChart(this.chartRef.current, {
			type: this.props.type,
			options: {
				maintainAspectRatio: true,
			},
			data: {
				labels: this.props.data.map((d) => d.label),
				datasets: [
					{
						label: this.props.title,
						data: this.props.data.map((d) => d.value),
						fill: "none",
						backgroundColor: this.props.color,
						pointRadius: 2,
						borderColor: this.props.color,
						borderWidth: 1,
						lineTension: 0,
					},
				],
			},
		});
	}

	componentDidUpdate() {
		this.myChart = new JSChart(this.chartRef.current, {
			type: this.props.type,
			options: {
				maintainAspectRatio: true,
			},
			data: {
				labels: this.props.data.map((d) => d.label),
				datasets: [
					{
						label: this.props.title,
						data: this.props.data.map((d) => d.value),
						fill: "none",
						backgroundColor: this.props.color,
						pointRadius: 2,
						borderColor: this.props.color,
						borderWidth: 1,
						lineTension: 0,
					},
				],
			},
		});
	}

	render() {
		return (
			<div class="card">
				<div class="card-body">
					<canvas ref={this.chartRef} />
				</div>
			</div>
		);
	}
}

export default Chart;
