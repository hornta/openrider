import GameContext from "./GameContext";
import { useRef } from "react";

const GameProvider = ({ children }) => {
	const game = useRef({});

	const initCanvas = (gameContainer) => {
		const canvas = document.createElement("canvas");
		game.current.gameContainer = gameContainer;
		gameContainer.append(canvas);

		const stage = new createjs.Stage(canvas);
		stage.autoClear = false;
		stage.enableMouseOver(30);
		stage.mouseMoveOutside = true;
		stage.preventSelection = false;
		game.current.stage = stage;

		// SetSize();
	};

	/*
	 * Const setSize = () => {
	 * 	let h = window.innerHeight;
	 * 	let w = window.innerWidth;
	 * 	if (!this.settings.fullscreen && !this.settings.isStandalone) {
	 * 		const scrollRoot = this.gameContainer;
	 * 		h = scrollRoot.clientHeight;
	 * 		w = scrollRoot.clientWidth;
	 * 	}
	 * 	if (this.currentScene) {
	 * 		const c = this.currentScene.getCanvasOffset();
	 * 		h -= c.height;
	 * 	}
	 * 	let ratio = window.devicePixelRatio;
	 * 	const width = w * ratio;
	 * 	const height = h * ratio;
	 * 	if (width !== this.width || height !== this.height) {
	 * 		this.width = width;
	 * 		this.height = height;
	 * 		this.canvas.width = width;
	 * 		this.canvas.height = height;
	 * 	}
	 * 	this.pixelRatio = ratio;
	 * 	this.canvas.style.width = `${w}px`;
	 * 	this.canvas.style.height = `${h}px`;
	 * 	if (this.currentScene) {
	 * 		this.currentScene.command("resize");
	 * 	}
	 * };
	 */

	const ctxValue = {
		initCanvas,
	};

	return (
		<GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>
	);
};

export default GameProvider;
