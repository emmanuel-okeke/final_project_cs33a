import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { clearAlert } from "../../redux/actions/Alerts";

export class AlertManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: false,
		};

		this.returnIconClassName = this.returnIconClassName.bind(this);
		this.startClearAlert = this.startClearAlert.bind(this);
	}
	static propTypes = {
		alert: PropTypes.array.isRequired,
		clearAlert: PropTypes.func.isRequired,
	};

	returnIconClassName(theme) {
		switch (theme) {
			case "success":
				return "fa-check";
			case "failure":
				return "fa-exclamation";
			default:
				return "fa-info";
		}
	}

	startClearAlert() {
		setTimeout(() => {
			this.setState({ display: false }, this.props.clearAlert);
		}, 7000);
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.alert !== prevProps.alert && this.props.alert !== null) {
			this.setState({ display: true }, this.startClearAlert);
		}
	}

	render() {
		var currentAlert;
		if (this.props.alert === null) {
			currentAlert = {
				theme: "",
				text: "",
			};
		} else {
			currentAlert = this.props.alert;
		}

		return (
			<div
				className={`px-0 conatiner-fluid ${
					this.state.display ? "" : "d-none"
				}`}
			>
				<div
					className={`mb-0 alert alert-${currentAlert.theme}`}
					role="alert"
				>
					<i
						className={`fa ${this.returnIconClassName(
							currentAlert.theme
						)} mx-2`}
					></i>{" "}
					{currentAlert.text}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	alert: state.AlertReducer.alert,
});

export default connect(mapStateToProps, { clearAlert })(AlertManager);
