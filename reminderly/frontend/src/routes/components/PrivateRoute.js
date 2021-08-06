import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DefaultLayout from "../../layouts/DefaultLayout";
import Loading from "../../components/loading";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (auth.isLoading) {
				return (
					<DefaultLayout noFooter={true}>
						<Loading />
					</DefaultLayout>
				);
			} else if (!auth.isAuthenticated) {
				return <Redirect to="/login" />;
			} else {
				return <Component {...props} />;
			}
		}}
	/>
);

const mapStateToProps = (state) => ({
	auth: state.AuthReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
