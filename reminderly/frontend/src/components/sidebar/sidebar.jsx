import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Profile from "../profile";
import "./sidebar.scss";

const Sidebar = ({ width, height, children }) => {
	const [xPosition, setX] = React.useState(0);

	const toggleMenu = () => {
		if (xPosition < 0) {
			setX(0);
		} else {
			setX(-width * 0.85);
		}
	};

	/* React.useEffect(() => {
      setX(0);
    }, []); */

	return (
		<Fragment>
			<div
				className="custom-side-bar"
				style={{
					transform: `translatex(${xPosition}px)`,
					width: width,
					minHeight: height,
				}}
			>
				<div className="custom-sidebar-toggle-button-conatiner ">
					<button
						/* onClick={() => toggleMenu()} */ className="float-right btn custom-sidebar-menu-button"
					>
						<img src="https://img.icons8.com/android/24/000000/menu.png" />
					</button>
					<div className="m-3">
						<Profile></Profile>
					</div>
				</div>
				<div className="content">{children}</div>
			</div>
		</Fragment>
	);
};

export default Sidebar;
