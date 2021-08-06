import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import PlainLayout from "../layouts/PlainLayout";

// Route Views

import Login from "../auth/Login";
import Register from "../auth/Register";

export default [
	{
		path: "/register",
		layout: PlainLayout,
		component: Register,
		exact: true,
	},
	{
		path: "/login",
		layout: PlainLayout,
		component: Login,
		exact: true,
	},
];
