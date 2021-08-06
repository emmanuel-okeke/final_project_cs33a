import React from "react";

import AlertManager from "../../components/alert";

const PlainLayout = ({ children }) => (
	<div className="container-fluid">
		<AlertManager />
		{children}
	</div>
);

export default PlainLayout;
