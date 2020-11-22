import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import GameManager from "./gameManager";
import GameSettings from "./gameSettings";

const App = () => {
	const gameContainerRef = useRef();

	useEffect(() => {
		const gameManager = new GameManager();
		gameManager.init("Main", GameSettings);
		const onResize = () => {
			gameManager.resize();
		};
		window.addEventListener("resize", onResize);

		return () => {
			gameManager.close();
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<>
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
			<div className="app" id="canvas" ref={gameContainerRef}></div>
		</>
	);
};

export default App;
