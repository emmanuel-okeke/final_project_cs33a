import React, { Component } from "react";
import PropTypes from "prop-types";

import "./loading.scss";

export class loading extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		loadingText: PropTypes.string,
	};

	render() {
		return (
			<div className="container-fluid h-100 loading-container">
				<div className="d-flex flex-column align-items-center my-auto">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
					<div>{this.props.loadingText}</div>
				</div>
			</div>
		);
	}
}

export default loading;
