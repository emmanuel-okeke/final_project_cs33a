import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions/Auth";
import PropTypes from "prop-types";

export class Register extends Component {
	state = {
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		password2: "",
	};

	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		registrationSuccessful: PropTypes.bool.isRequired,
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { email, firstname, lastname, password, password2 } = this.state;
		if (password !== password2) {
			this.props.createMessage({
				passwordNotMatch: "Passwords do not match",
			});
		} else {
			const newUser = {
				firstname,
				lastname,
				password,
				email,
			};
			this.props.register(newUser);
		}
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		if (this.props.registrationSuccessful) {
			return (
				<div className="col-md-6 m-auto">
					<div className="card card-body mt-5">
						<h2 className="text-center">Thank You!</h2>
						<h6 className="m-3"> We hope you enjoy this app!</h6>
					</div>
					<p>
						Login Now! <Link to="/login">Login</Link>
					</p>
				</div>
			);
		}
		const { email, firstname, lastname, password, password2 } = this.state;
		return (
			<div className="col-md-6 m-auto">
				<div className="card card-body mt-5">
					<h2 className="text-center">Register</h2>
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
							<label>First Name</label>
							<input
								type="text"
								className="form-control"
								name="firstname"
								onChange={this.onChange}
								value={firstname}
							/>
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input
								type="text"
								className="form-control"
								name="lastname"
								onChange={this.onChange}
								value={lastname}
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
							<label>Confirm Password</label>
							<input
								type="password"
								className="form-control"
								name="password2"
								onChange={this.onChange}
								value={password2}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						</div>
						<p>
							Already have an account?{" "}
							<Link to="/login">Login</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.AuthReducer.isAuthenticated,
	registrationSuccessful: state.AuthReducer.registrationSuccessful,
});

export default connect(mapStateToProps, { register })(Register);
