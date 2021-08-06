import React, { Component } from "react";
import PropTypes from "prop-types";
import "./profile.scss";

import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/Auth";

export class Profile extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		user: PropTypes.object.isRequired,
		loadUser: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className="custom-profile-container">
				<h4>Hello, {this.props.user.firstname}</h4>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.AuthReducer.user,
});

export default connect(mapStateToProps, { loadUser })(Profile);
