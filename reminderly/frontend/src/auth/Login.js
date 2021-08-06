import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/actions/Auth";

export class Login extends Component {
	state = {
		email: "",
		password: "",
	};

	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state.email, this.state.password);
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}
		const { email, password } = this.state;
		return (
			<div className="col-md-6 m-auto">
				<div className="card card-body mt-5">
					<h2 className="text-center">Login</h2>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								onChange={this.onChange}
								value={email}
							/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								onChange={this.onChange}
								value={password}
							/>
						</div>

						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</div>
						<Row>
							<Col>
								<p>
									Don't have an account?{" "}
									<Link to="/register">Register</Link>
								</p>
							</Col>
						</Row>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.AuthReducer.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
