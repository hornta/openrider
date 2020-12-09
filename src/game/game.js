import Editor from "./scenes/editor";
import GameSettings from "./gameSettings";
import Main from "./scenes/main";
import { Ticker } from "@pixi/ticker";

const scenes = {
	Editor,
	Main,
};
class Game {
	constructor(error, assets, options, soundManager) {
		this.gameContainer = null;
		this.tickCount = 0;
		this.currentScene = null;
		this.stage = null;
		this.canvas = null;
		this.stats = null;
		this.width = 0;
		this.height = 0;
		this.onStateChange = null;

		this.assets = assets;
		this.settings = options;
		this.soundManager = soundManager;
		this.initCanvas();
		this.initStage();
		this.setSize();
		this.switchScene(error);
		this.setSize();
		this.startTicker();
	}

	initCanvas() {
		const canvas = document.createElement("canvas");
		const panFrame = document.querySelector(this.settings.defaultContainerID);
		panFrame.append(canvas);
		this.gameContainer = panFrame;
		this.canvas = canvas;
	}

	initStage() {
		const stage = new createjs.Stage(this.canvas);
		stage.autoClear = false;
		createjs.Touch.enable(stage);
		stage.enableMouseOver(30);
		stage.mouseMoveOutside = true;
		stage.preventSelection = false;
		this.stage = stage;
	}

	setSize() {
		let h = window.innerHeight;
		let w = window.innerWidth;
		if (!this.settings.isStandalone) {
			const scrollRoot = this.gameContainer;
			h = scrollRoot.clientHeight;
			w = scrollRoot.clientWidth;
		}
		const ratio = window.devicePixelRatio;
		const width = w * ratio;
		const height = h * ratio;
		if (width !== this.width || height !== this.height) {
			this.width = width;
			this.height = height;
			this.canvas.width = width;
			this.canvas.height = height;
		}
		this.pixelRatio = ratio;
		this.canvas.style.width = `${w}px`;
		this.canvas.style.height = `${h}px`;
		if (this.currentScene) {
			this.currentScene.command("resize");
		}
	}

	startTicker() {
		this.renderTicker = new Ticker();
		this.renderTicker.add(this.render.bind(this));
		this.renderTicker.start();

		this.updateObject = {};
		this.updateTicker = new Ticker();
		this.updateTicker.minFPS = GameSettings.drawFPS;
		this.updateTicker.maxFPS = GameSettings.drawFPS;
		this.updateTicker.add(this.update.bind(this));
		this.updateTicker.start();
	}

	update(deltaTime) {
		this.updateObject.deltaTime = deltaTime;
		this.updateObject.tick += 1;
		this.currentScene.update();
		this.tickCount++;
	}

	render() {
		this.currentScene.render();
	}

	switchScene(sceneId) {
		if (this.currentScene !== null) {
			this.currentScene.close();
		}
		this.currentScene = new scenes[sceneId](this);
	}

	command() {
		this.currentScene.command(...arguments);
	}

	close() {
		this.renderTicker.stop();
		this.updateTicker.stop();
		this.currentScene.close();
		this.currentScene = null;
		this.assets = null;
		this.settings = null;
		this.stage.autoClear = true;
		this.stage.removeAllChildren();
		this.stage.update();
		this.stage.enableDOMEvents(false);
		this.stage.removeAllEventListeners();
		this.stage = null;
		this.canvas.remove();
		this.canvas = null;
		this.tickCount = null;
		this.height = null;
		this.width = null;
	}
}

export default Game;
