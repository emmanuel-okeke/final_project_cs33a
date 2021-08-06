import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import SideBar from "../../components/sidebar";
import SideBarItem from "../../components/sidebarItem";
import "./defaultLayout.scss";

import { connect } from "react-redux";
import { logout } from "../../redux/actions/Auth";

import AlertManager from "../../components/alert";

export class DefaultLayout extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		logout: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className="wrapper">
				<div className="d-flex flex-row">
					<SideBar width={300} height={"100vh"}>
						<SideBarItem icon="house" link="/">
							Home
						</SideBarItem>
						<SideBarItem icon="flag" link="/flagged">
							Flagged
						</SideBarItem>
						<SideBarItem
							icon="exit_to_app"
							logout
							logoutFunc={this.props.logout}
						>
							Logout
						</SideBarItem>
					</SideBar>
					<div className="page-content-wrapper">
						<AlertManager />
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(DefaultLayout);
