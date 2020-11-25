import _ from "lodash";

class Controls {
	constructor(scene, name, controlData, spriteSheetData) {
		this.defaultControlOptions = {
			visible: true,
		};
		this.controlsSpriteSheetData = spriteSheetData;
		this.controlData = controlData;
		this.controlsContainer = null;
		this.controlsSprite = null;
		this.gamepad = null;

		this.name = name;
		this.scene = scene;
		this.game = scene.game;
		this.assets = scene.assets;
		this.settings = scene.settings;
		this.stage = scene.game.stage;
		this.mouse = scene.mouse;
		this.playerManager = scene.playerManager;
		this.createSprite();
		this.addControls();
		this.resize();
	}

	createSprite() {
		const n = this.scene.assets.getResult(this.name);
		const data = this.controlsSpriteSheetData;
		data.images = [n];
		const spritesheet = new createjs.SpriteSheet(data);
		const sprite = new createjs.Sprite(spritesheet);
		this.controlsSprite = sprite;
	}

	isVisible() {
		return this.controlsContainer.visible;
	}

	hide() {
		this.controlsContainer.visible = false;
	}

	show() {
		this.controlsContainer.visible = true;
	}

	setVisibility(isVisible) {
		this.controlsContainer.visible = isVisible;
	}

	createControl(name) {
		const postLi = this.controlsSprite;
		const options = _.extend(
			{},
			this.defaultControlOptions,
			this.controlData[name]
		);
		const clone = postLi.clone();
		clone.gotoAndStop(name);
		clone.buttonDetails = options;
		clone.cursor = "pointer";
		clone.on("mousedown", this.controlDown.bind(this));
		clone.on("pressup", this.controlUp.bind(this));
		clone.on("mouseover", this.mouseOver.bind(this));
		clone.on("mouseout", this.mouseOut.bind(this));
		const cssChanges = clone.getBounds();
		clone.regX = cssChanges.width / 2;
		clone.regY = cssChanges.height / 2;
		clone.alpha = 0.5;
		clone.name = name;
		clone.visible = options.visible;
		if (options.hitArea) {
			const point = options.hitArea;
			const shape = new createjs.Shape();
			if (point.radius) {
				shape.graphics
					.beginFill("#000")
					.drawCircle(point.x, point.y, point.radius);
			} else {
				shape.graphics
					.beginFill("#000")
					.drawRect(point.x, point.y, point.width, point.height);
			}
			clone.hitArea = shape;
		}
		return clone;
	}

	mouseOver(event) {
		const e = event.target;
		e.alpha = 0.8;
		this.mouse.enabled = false;
	}

	mouseOut(event) {
		const e = event.target;
		e.alpha = 0.5;
		this.mouse.enabled = true;
	}

	controlDown(dependency) {
		const child = dependency.target;
		const parent = child.buttonDetails;
		const gamePad = this.playerManager.firstPlayer.getGamepad();
		if (parent.key) {
			const result = parent.key;
			gamePad.setButtonDown(result);
		}
		if (parent.keys) {
			for (const key of parent.keys) {
				gamePad.setButtonDown(key);
			}
		}
		if (parent.downCallback) {
			parent.downCallback(dependency);
		}
		if (this.settings.mobile) {
			this.mouse.enabled = false;
		}
		child.alpha = 1;
	}

	controlUp(ownerContext) {
		const context = ownerContext.target;
		const me = context.buttonDetails;
		const player = this.playerManager.firstPlayer.getGamepad();
		if (me.key) {
			const key = me.key;
			player.setButtonUp(key);
		}
		if (me.keys) {
			const keys = me.keys;
			const i = keys.length;
			let l = 0;
			for (; i > l; l++) {
				const key = keys[l];
				player.setButtonUp(key);
			}
		}
		if (me.upCallback) {
			me.upCallback(ownerContext);
		}
		if (this.settings.mobile) {
			this.mouse.enabled = true;
			context.alpha = 0.5;
		} else {
			context.alpha = 0.8;
		}
	}

	resize() {
		const data = this.scene.game;
		const x = (this.scene.screen, data.width);
		const y = data.height;
		const height = data.pixelRatio;
		const a = this.controlsContainer.children;
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
	}
}

export default Controls;
