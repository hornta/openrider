import Controls from "./controls";

class Phone extends Controls {
	constructor(scene) {
		const controlData = {
			brake: {
				key: "down",
				bottom: 100,
				left: 100,
				hitArea: {
					width: 250,
					height: 200,
					x: -30,
					y: -15,
				},
			},
			direction: {
				key: "z",
				bottom: 250,
				right: 100,
				hitArea: {
					width: 200,
					height: 200,
					x: -20,
					y: -65,
				},
			},
			forward: {
				key: "up",
				bottom: 250,
				left: 100,
				hitArea: {
					width: 250,
					height: 200,
					x: -30,
					y: -65,
				},
			},
			last_checkpoint: {
				key: "enter",
				top: 60,
				left: 160,
			},
			left: {
				key: "left",
				bottom: 100,
				right: 250,
				hitArea: {
					width: 230,
					height: 230,
					x: -100,
					y: -65,
				},
			},
			right: {
				key: "right",
				bottom: 100,
				right: 100,
				hitArea: {
					width: 200,
					height: 200,
					x: -10,
					y: -15,
				},
			},
			replay: {
				key: "restart",
				top: 60,
				left: 80,
			},
			zoom_in: {
				key: "zoom_increase",
				bottom: 100,
				right: 100,
			},
			zoom_out: {
				key: "zoom_decrease",
				bottom: 100,
				left: 100,
			},
		};
		super(scene, "phone_controls", controlData, {
			frames: [
				[782, 2, 128, 128],
				[652, 2, 128, 128],
				[522, 2, 128, 128],
				[912, 78, 75, 75],
				[392, 2, 128, 128],
				[912, 2, 75, 75],
				[262, 2, 128, 128],
				[132, 2, 128, 128],
				[2, 2, 128, 128],
			],
			animations: {
				accelerate: [0],
				brake: [1],
				direction: [2],
				last_checkpoint: [3],
				left: [4],
				replay: [5],
				right: [6],
				zoom_in: [7],
				zoom_out: [8],
			},
		});

		this.mainResize = self.resize;
		this.zoomControlsContainer = null;
		this.lastCheckpointButton = null;
		this.replayButton = null;
	}

	addControls() {
		const def = this.createControl("last_checkpoint");
		const control = this.createControl("replay");
		const c = this.createControl("zoom_in");
		const r = this.createControl("zoom_out");
		const container = new createjs.Container();
		container.addChild(this.createControl("left"));
		container.addChild(this.createControl("right"));
		container.addChild(this.createControl("forward"));
		container.addChild(this.createControl("brake"));
		container.addChild(this.createControl("direction"));
		container.addChild(def);
		container.addChild(control);
		container.addChild(c);
		container.addChild(r);
		const target = new createjs.Container();
		target.addChild(c);
		target.addChild(r);
		target.visibility = false;
		this.lastCheckpointButton = def;
		this.replayButton = control;
		this.controlsContainer = container;
		this.zoomControlsContainer = target;
		this.stage.addChild(container);
		this.stage.addChild(target);
	}

	resize() {
		const data = this.scene.game;
		const x = (this.scene.screen, data.width);
		const y = data.height;
		const height = data.pixelRatio;
		const a = this.zoomControlsContainer.children;
		let key;
		for (key in a) {
			const me = a[key];
			const result = me.buttonDetails;
			if (result.bottom) {
				me.y = y - result.bottom * (height / 2);
			}
			if (result.left) {
				me.x = result.left * (height / 2);
			}
			if (result.right) {
				me.x = x - result.right * (height / 2);
			}
			if (result.top) {
				me.y = result.top * (height / 2);
			}
			me.scaleY = height / 2;
			me.scaleX = me.scaleY;
		}
		this.mainResize();
	}

	setZoomControlsVisibilty(value) {
		this.zoomControlsContainer.visible = value;
	}

	update() {
		const children = this.scene;
		this.lastCheckpointButton.visible = Boolean(
			children.playerManager.firstPlayer.hasCheckpoints()
		);
	}
}

export default Phone;
