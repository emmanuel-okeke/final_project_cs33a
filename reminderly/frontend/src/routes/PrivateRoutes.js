import React from "react";
import { Redirect } from "react-router-dom";

import Home from "../components/home";
import DefaultLayout from "../layouts/DefaultLayout";
import Flagged from "../components/flagged";

export default [
	{
		path: "/",
		exact: true,
		layout: DefaultLayout,
		component: Home,
	},
	{
		path: "/flagged",
		layout: DefaultLayout,
		component: Flagged,
		exact: true,
	},
];
