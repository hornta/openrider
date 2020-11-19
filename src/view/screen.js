import Vector2 from "../math/vector2";

function Screen(data) {
	this.scene = data;
	this.game = data.game;
	this.size = new Vector2(0, 0);
	this.center = new Vector2(0, 0);
	this.setScreen();
}

Screen.prototype = {
	game: null,
	scene: null,
	size: null,
	center: null,
	width: 0,
	height: 0,
	setScreen() {
		const { width } = this.game;
		const { height } = this.game;
		this.width = width;
		this.height = height;
		this.size.x = width;
		this.size.y = height;
		this.center.x = width / 2;
		this.center.y = height / 2;
	},
	update() {
		const previous = this.game;
		if (previous.width !== this.width || previous.height !== this.height) {
			this.setScreen();
		}
	},
	realToScreen(b, i) {
		const { scene } = this;
		const { camera } = scene;
		const canvas = scene.screen;
		return (b - camera.position[i]) * camera.zoom + canvas.center[i];
	},
	toReal(percent, i) {
		const game = this.scene;
		const { camera } = game;
		const { screen } = game;
		return (percent - screen.center[i]) / camera.zoom + camera.position[i];
	},
	close() {
		this.width = null;
		this.height = null;
		this.center = null;
		this.size = null;
		this.game = null;
		this.scene = null;
	},
};

export default Screen;
