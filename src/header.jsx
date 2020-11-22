import { NavLink } from "react-router-dom";
import React from "react";

const Header = () => {
	return (
		<header className="flex h-12 bg-green-900 text-white items-center">
			<div className="mx-8 text-lg font-medium">OpenRider</div>
			<div className="flex space-x-8 h-full">
				<NavLink
					exact
					className="h-full flex items-center"
					to="/"
					activeClassName="underline"
				>
					Play
				</NavLink>
				<NavLink
					className="h-full flex items-center"
					to="/editor"
					activeClassName="underline"
				>
					Editor
				</NavLink>
			</div>
		</header>
	);
};
export default Header;
