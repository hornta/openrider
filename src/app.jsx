import React, { useEffect, useRef } from "react";
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
			<div>2</div>
			<div className="app" id="canvas" ref={gameContainerRef}></div>
		</>
	);
};

export default App;
