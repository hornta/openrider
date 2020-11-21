import formatNumber from "./formatNumber";

function Score(data) {
	this.scene = data;
	this.stage = data.game.stage;
	this.build_interface();
}
const options = Score.prototype;
options.container = null;
options.cached = false;
options.scene = null;
options.state = null;
options.offset = {
	y: 0,
	x: 0,
};
options.build_interface = function () {
	const scene = this.scene;
	const referenceWidth = scene.game.pixelRatio;
	const o = scene.settings;
	const target = new createjs.Container();
	const n = "helsinki";
	const text = new createjs.Text("00:00.00", `40px ${n}`, "#000000");
	const obj = new createjs.Text("TIME:", `20px ${n}`, "#999999");
	const a = this.get_timer_sprite();
	const h = new createjs.Text(" -- : --.--", `35px ${n}`, "#999999");
	const l = new createjs.Text("BEST:", `20px ${n}`, "#999999");
	const shadow = new createjs.Text("0/0", `40px ${n}`, "#000000");
	const bitmapFontText = new createjs.Bitmap(
		scene.assets.getResult("targets_icon")
	);
	let scale = referenceWidth / 2.5;
	if (o.mobile) {
		scale = referenceWidth / 2.5;
	}
	text.y = 18;
	text.x = 57;
	obj.y = 3;
	obj.x = 59;
	a.y = 0;
	a.x = 0;
	h.x = 237;
	h.y = 21;
	l.x = 240;
	l.y = 3;
	shadow.y = 15;
	shadow.x = 460;
	bitmapFontText.y = 0;
	bitmapFontText.x = 400;
	target.addChild(text);
	target.addChild(obj);
	target.addChild(a);
	target.addChild(h);
	target.addChild(l);
	target.addChild(shadow);
	target.addChild(bitmapFontText);
	target.scaleY = scale;
	target.scaleX = target.scaleY;
	target.y = (10 + this.offset.y) * scale;
	target.x = 10 * scale;
	this.best_time_title = l;
	this.time_title = obj;
	this.container = target;
	this.time = text;
	this.goals = shadow;
	this.best_time = h;
	this.stage.addChild(target);
};
options.update = function () {
	const s = this.scene;
	const width = s.ticks;
	const data = s.settings;
	const el = s.track;
	const r = s.playerManager.firstPlayer;
	if (this.cached === false && width > 50) {
		this.cached = true;
		this.cache_fixed_text();
	}
	const xStride = width / data.drawFPS;
	this.time.text = formatNumber(1000 * xStride);
	const key = el.targetCount;
	const _cur = r.getTargetsHit();
	this.goals.text = `${_cur}/${key}`;
	let replyLines = " -- : --.--";
	if (data.isCampaign && data.campaignData.user.best_time) {
		replyLines = data.campaignData.user.best_time;
	} else if (data.userTrackStats && data.userTrackStats.best_time) {
		replyLines = data.userTrackStats.best_time;
	}
	this.best_time.text = replyLines;
	if (data.mobile) {
		this.center_container();
	}
};
options.center_container = function () {
	const c = this.container;
	const foodIconDefinition = c.getBounds();
	const wh = this.scene.screen;
	const ratio = this.scene.game.pixelRatio;
	c.x = wh.width / 2 - (foodIconDefinition.width / 2) * c.scaleY;
	c.y = 10 * ratio;
};
options.cache_fixed_text = function () {
	let bounds;
	const myContainer = this.best_time_title;
	const bitmap = this.time_title;
	const paddingTop = 10;
	bounds = myContainer.getBounds();
	myContainer.cache(
		bounds.x,
		bounds.y,
		bounds.width,
		bounds.height + paddingTop
	);
	bounds = bitmap.getBounds();
	bitmap.cache(bounds.x, bounds.y, bounds.width, bounds.height + paddingTop);
};
options.get_timer_sprite = function () {
	const FileSchema = this.scene.assets.getResult("time_icon");
	const data = {
		images: [FileSchema],
		frames: {
			width: 60,
			height: 60,
		},
	};
	const image = new createjs.SpriteSheet(data);
	const module = new createjs.Sprite(image);
	return module;
};
export default Score;
