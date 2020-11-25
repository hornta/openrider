import Controls from "./controls";

class Tablet extends Controls {
	constructor(scene) {
		const controlData = {
			brake: {
				key: "down",
				bottom: 120,
				left: 285,
				hitArea: {
					radius: 150,
					x: 75,
					y: 90,
				},
			},
			direction: {
				key: "z",
				bottom: 285,
				right: 450,
				hitArea: {
					radius: 150,
					x: 40,
					y: 40,
				},
			},
			forward: {
				key: "up",
				bottom: 285,
				left: 140,
				hitArea: {
					radius: 150,
					x: 75,
					y: 75,
				},
			},
			last_checkpoint: {
				key: "enter",
				top: 60,
				left: 160,
			},
			left: {
				key: "left",
				bottom: 120,
				right: 285,
				hitArea: {
					radius: 150,
					x: 75,
					y: 75,
				},
			},
			right: {
				key: "right",
				bottom: 285,
				right: 140,
				hitArea: {
					radius: 150,
					x: 100,
					y: 40,
				},
			},
			replay: {
				key: "restart",
				top: 60,
				left: 80,
			},
			zoom_in: {
				key: "zoom_increase",
				bottom: 285,
				right: 140,
			},
			zoom_out: {
				key: "zoom_decrease",
				bottom: 285,
				left: 140,
			},
		};
		super(scene, "tablet_controls", controlData, {
			frames: [
				[154, 306, 150, 150],
				[154, 154, 150, 150],
				[382, 154, 75, 75],
				[306, 2, 150, 150],
				[154, 2, 150, 150],
				[306, 154, 75, 75],
				[2, 306, 150, 150],
				[2, 154, 150, 150],
				[2, 2, 150, 150],
			],
			animations: {
				accelerate: [0],
				brake: [1],
				last_checkpoint: [2],
				direction: [3],
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

	addControls() {
		const c = this.createControl("zoom_in");
		const bc = this.createControl("zoom_out");
		const container = new createjs.Container();
		container.addChild(this.createControl("left"));
		container.addChild(this.createControl("right"));
		container.addChild(this.createControl("forward"));
		container.addChild(this.createControl("brake"));
		container.addChild(this.createControl("direction"));
		container.addChild(this.createControl("last_checkpoint"));
		container.addChild(this.createControl("replay"));
		const path = new createjs.Container();
		path.addChild(c);
		path.addChild(bc);
		path.visible = false;
		this.lastCheckpointButton = container.getChildByName("last_checkpoint");
		this.controlsContainer = container;
		this.zoomControlsContainer = path;
		this.stage.addChild(container);
		this.stage.addChild(path);
	}

	update() {
		const children = this.scene;
		this.lastCheckpointButton.visible = Boolean(
			children.playerManager.firstPlayer.hasCheckpoints()
		);
	}
}

export default Tablet;
