import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import RoutesList from "./routes/Routes";
import PrivateRoutesList from "./routes/PrivateRoutes";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/Store";

import PrivateRoute from "./routes/components/PrivateRoute";

import { Provider } from "react-redux";
import { store } from "./redux/Store";

import PlainLayout from "./layouts/PlainLayout";
import Loading from "./components/loading";

import { loadUser } from "./redux/actions/Auth";

export class App extends Component {
	constructor(props) {
		super(props);

		this.onBeforeLift = this.onBeforeLift.bind(this);
	}

	onBeforeLift = () => {
		store.dispatch(loadUser(store.getState().AuthReducer.user.id));
	};

	render() {
		return (
			<Provider store={store}>
				<PersistGate
					loading={
						<PlainLayout>
							<Loading />
						</PlainLayout>
					}
					onBeforeLift={this.onBeforeLift}
					persistor={persistor}
				>
					<div className="App">
						<BrowserRouter>
							<Switch>
								{RoutesList.map((route, index) => {
									return (
										<Route
											key={index}
											path={route.path}
											exact={route.exact}
											component={() => {
												return (
													<route.layout>
														<route.component />
													</route.layout>
												);
											}}
										/>
									);
								})}
								{PrivateRoutesList.map((route, index) => {
									return (
										<PrivateRoute
											key={index}
											path={route.path}
											exact={route.exact}
											component={() => {
												return (
													<route.layout>
														<route.component />
													</route.layout>
												);
											}}
										/>
									);
								})}
							</Switch>
						</BrowserRouter>
					</div>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
