import React, { Component } from "react";
import PropTypes from "prop-types";
import "./sidebarItem.scss";

export class SideBarItem extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		link: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		logout: PropTypes.bool,
		logoutFunc: PropTypes.func,
	};

	render() {
		return (
			<div className="custom-sidebar-item d-flex flex-row ml-3 my-3 align-items-center">
				<i className="material-icons">{this.props.icon}</i>
				<span className="ml-2">{this.props.children}</span>
				{this.props.logout ? (
					<a
						className="stretched-link text-decoration-none"
						onClick={this.props.logoutFunc}
					></a>
				) : (
					<a
						href={this.props.link}
						className="stretched-link text-decoration-none"
					></a>
				)}
			</div>
		);
	}
}

export default SideBarItem;
