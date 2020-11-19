import TWEEN from "@tweenjs/tween.js";

function VehicleTimer(data) {
	this.scene = data;
	this.settings = data.settings;
	this.player = false;
	this.buildInterface();
	this.createPulseTween();
}
const self = VehicleTimer.prototype;
self.scene = null;
self.container = null;
self.cached = false;

self.buildInterface = function () {
	const scale = this.scene.game.pixelRatio;
	const container = new createjs.Container();
	const i = "helsinki";
	const bar = new createjs.Shape();
	bar.graphics
		.setStrokeStyle(5, "round")
		.beginStroke("rgba(242,144,66,1)")
		.beginFill("rgba(242,144,66,0.5)")
		.drawRoundRect(0, 0, 200, 60, 25);
	const text = new createjs.Text("00:00", `35px ${i}`, "#000000");
	text.textAlign = "center";
	text.textBaseline = "middle";
	text.x = 100;
	text.y = 30;
	container.addChild(bar);
	container.addChild(text);
	container.visible = false;
	container.scaleY = scale / 2;
	container.scaleX = container.scaleY;
	this.timeText = text;
	this.container = container;
	this.scene.game.stage.addChild(container);
	this.centerContainer();
};
self.setPlayer = function (item) {
	this.player = item;
};
self.removePlayer = function () {
	this.player = false;
};
self.playerAddedTime = function (item) {
	if (this.player === item) {
		this.createPulseTween();
	}
};
self.createPulseTween = function () {
	const controller = this.container;
	const pixelRatio = this.scene.game.pixelRatio;
	const destScale = pixelRatio / 2;
	const from = {
		scale: destScale,
	};
	const value = {
		scale: 1.2 * destScale,
	};
	this.pulse = new TWEEN.Tween(from)
		.to(value, 200)
		.repeat(1)
		.yoyo(true)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(function () {
			// eslint-disable-next-line no-invalid-this
			controller.scaleY = this.scale;
			controller.scaleX = controller.scaleY;
		})
		.start();
};
self.centerContainer = function () {
	const wh = this.scene.screen;
	const container = this.container;
	container.x = wh.width / 2 - 100 * container.scaleX;
	container.y = wh.height - 100 * container.scaleY;
};
self.update = function () {
	TWEEN.update();
	if (this.player && this.player._tempVehicleTicks > 0) {
		this.centerContainer();
		this.updateTime();
	} else {
		this.container.visible = false;
	}
};
self.updateTime = function () {
	const publicInfo = (this.container, this.timeText);
	const size = (this.player, this.player._tempVehicleTicks);
	const n = this.scene.settings.drawFPS;
	let s = size / n;
	s = s.toFixed(2);
	let title = "";
	if (s < 10) {
		title = "0";
	}
	title += s;
	publicInfo.text = title;
	this.container.visible = true;
};
self.close = function () {
	this.container = null;
	this.player = null;
	this.scene = null;
	this.settings = null;
	this.timeText = null;
};

export default VehicleTimer;
