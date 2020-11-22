import _ from "lodash";

function Controls() {}
const self = Controls.prototype;
self.defaultControlOptions = {
	visible: true,
};
self.name = null;
self.controlsSpriteSheetData = null;
self.controlData = null;
self.game = null;
self.scene = null;
self.settings = null;
self.stage = null;
self.controlsContainer = null;
self.controlsSprite = null;
self.gamepad = null;
self.initialize = function (options) {
	this.scene = options;
	this.game = options.game;
	this.assets = options.assets;
	this.settings = options.settings;
	this.stage = options.game.stage;
	this.mouse = options.mouse;
	this.playerManager = options.playerManager;
	this.createSprite();
	this.addControls();
	this.resize();
};
self.addControls = function () {};
self.createSprite = function () {
	const n = this.scene.assets.getResult(this.name);
	const data = this.controlsSpriteSheetData;
	data.images = [n];
	const image = new createjs.SpriteSheet(data);
	const module = new createjs.Sprite(image);
	this.controlsSprite = module;
};
self.isVisible = function () {
	return this.controlsContainer.visible;
};
self.hide = function () {
	this.controlsContainer.visible = false;
};
self.show = function () {
	this.controlsContainer.visible = true;
};
self.setVisibility = function (isVisible) {
	this.controlsContainer.visible = isVisible;
};
self.createControl = function (name) {
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
	if (
		((clone.regX = cssChanges.width / 2),
		(clone.regY = cssChanges.height / 2),
		(clone.alpha = 0.5),
		(clone.name = name),
		(clone.visible = options.visible),
		options.hitArea)
	) {
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
};
self.mouseOver = function (event) {
	const e = event.target;
	e.alpha = 0.8;
	this.mouse.enabled = false;
};
self.mouseOut = function (event) {
	const e = event.target;
	e.alpha = 0.5;
	this.mouse.enabled = true;
};
self.controlDown = function (dependency) {
	const child = dependency.target;
	const parent = child.buttonDetails;
	const player = this.playerManager.firstPlayer.getGamepad();
	if (parent.key) {
		const result = parent.key;
		player.setButtonDown(result);
	}
	if (parent.keys) {
		const arr = parent.keys;
		const len = arr.length;
		let i = 0;
		for (; len > i; i++) {
			const result = arr[i];
			player.setButtonDown(result);
		}
	}
	if (parent.downCallback) {
		parent.downCallback(dependency);
	}
	if (this.settings.mobile) {
		this.mouse.enabled = false;
	}
	child.alpha = 1;
};
self.controlUp = function (ownerContext) {
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
};
self.close = function () {};
self.update = function () {};
self.resize = function () {
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
};
export default Controls;
