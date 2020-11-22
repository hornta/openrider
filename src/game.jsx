import React, { useEffect } from "react";
import GameManager from "./game/gameManager";
import GameSettings from "./game/gameSettings";

const Game = () => {
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

	return <div className="app" id="canvas"></div>;
};

export default Game;
