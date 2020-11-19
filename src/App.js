import { useCallback, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import GameSettings from "./GameSettings";
import gameManager from "./gameManager";

const App = () => {
	useEffect(() => {
		const onResize = () => {
			gameManager.resize();
		};
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);
	const gameContainerRef = useCallback((node) => {
		gameManager.init("Main", GameSettings);
	}, []);

	return <div className="app" id="canvas" ref={gameContainerRef}></div>;
};

export default App;
