import TWEEN from "@tweenjs/tween.js";

class VehicleTimer {
	constructor(data) {
		this.container = null;
		this.cached = false;
		this.scene = data;
		this.settings = data.settings;
		this.player = false;
		this.buildInterface();
		this.createPulseTween();
	}

	buildInterface() {
		const scale = this.scene.game.pixelRatio;
		const container = new createjs.Container();
		const bar = new createjs.Shape();
		bar.graphics
			.setStrokeStyle(5, "round")
			.beginStroke("rgba(242,144,66,1)")
			.beginFill("rgba(242,144,66,0.5)")
			.drawRoundRect(0, 0, 200, 60, 25);
		const text = new createjs.Text("00:00", `35px helsinki`, "#000000");
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
	}

	setPlayer(item) {
		this.player = item;
	}

	removePlayer() {
		this.player = false;
	}

	playerAddedTime(item) {
		if (this.player === item) {
			this.createPulseTween();
		}
	}

	createPulseTween() {
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
	}

	centerContainer() {
		const wh = this.scene.screen;
		const container = this.container;
		container.x = wh.width / 2 - 100 * container.scaleX;
		container.y = wh.height - 100 * container.scaleY;
	}

	update() {
		TWEEN.update();
		if (this.player && this.player._tempVehicleTicks > 0) {
			this.centerContainer();
			this.updateTime();
		} else {
			this.container.visible = false;
		}
	}

	updateTime() {
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
	}

	close() {
		this.container = null;
		this.player = null;
		this.scene = null;
		this.settings = null;
		this.timeText = null;
	}
}

export default VehicleTimer;
