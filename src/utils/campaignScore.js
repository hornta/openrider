function CampaignScore(data) {
	this.scene = data;
	this.settings = data.settings;
	this.build_interface();
}
const _this = CampaignScore.prototype;
_this.scene = null;
_this.container = null;
_this.cached = false;
_this.build_interface = function () {
	this.sprite_sheet = this.create_sprite_sheet();
	const referenceWidth = this.scene.game.pixelRatio;
	const block = new createjs.Container();
	const i = "helsinki";
	const options = this.settings.campaignData;
	const data = options.goals;
	let label = data.third;
	const o = new createjs.Container();
	const a = this.get_sprite("bronze_medal");
	label = new createjs.Text(label, `30px ${i}`, "#000000");
	let msg = data.second;
	const container = new createjs.Container();
	const spec = this.get_sprite("silver_medal");
	msg = new createjs.Text(msg, `30px ${i}`, "#000000");
	let item = data.first;
	const p = new createjs.Container();
	const d = this.get_sprite("gold_medal");
	item = new createjs.Text(item, `30px ${i}`, "#000000");
	let scale = referenceWidth / 2.5;
	if (this.settings.controls === "phone") {
		scale = referenceWidth / 2.5;
	}
	a.y = 7;
	a.x = 16;
	label.x = 69;
	label.y = 14;
	spec.y = 7;
	spec.x = 175;
	msg.x = 229;
	msg.y = 14;
	d.y = 7;
	d.x = 350;
	item.y = 14;
	item.x = 400;
	o.addChild(a);
	o.addChild(label);
	container.addChild(spec);
	container.addChild(msg);
	p.addChild(d);
	p.addChild(item);
	o.alpha = 0.4;
	container.alpha = 0.4;
	p.alpha = 0.4;
	block.addChild(o);
	block.addChild(container);
	block.addChild(p);
	block.scaleY = scale;
	block.scaleX = block.scaleY;
	block.y = 80 * scale;
	block.x = 0;
	this.bronze_container = o;
	this.silver_container = container;
	this.gold_container = p;
	this.container = block;
	this.scene.game.stage.addChild(block);
	this.update_state();
};
_this.update_state = function () {
	const file = this.settings.campaignData;
	const ttr = file.user;
	switch (ttr.has_goal) {
		case 1:
		case "first":
			this.gold_container.alpha = 1;
			break;
		case "second":
		case 2:
			this.silver_container.alpha = 1;
			break;
		case "third":
		case 3:
			this.bronze_container.alpha = 1;
			break;
		case 0:
			break;
		default:
	}
};
_this.center_container = function () {
	const wh = this.scene.screen;
	const c = this.container;
	const foodIconDefinition = c.getBounds();
	const ratio = this.scene.game.pixelRatio;
	c.x = wh.width / 2 - (foodIconDefinition.width / 2) * c.scaleY;
	c.y = 40 * ratio;
};
_this.update = function () {
	if (this.settings.mobile) {
		this.center_container();
	}
	this.update_state();
};
_this.create_sprite_sheet = function () {
	const FileSchema = this.scene.assets.getResult("campaign_icons");
	const data = {
		images: [FileSchema],
		frames: [
			[548, 68, 44, 44],
			[2, 68, 452, 56],
			[502, 68, 44, 44],
			[2, 2, 588, 64],
			[456, 68, 44, 44],
		],
		animations: {
			bronze_medal: [0],
			center_panel: [1],
			silver_medal: [2],
			left_panel: [3],
			gold_medal: [4],
		},
	};
	const gifObj = new createjs.SpriteSheet(data);
	return gifObj;
};
_this.get_sprite = function (animation) {
	const image = this.sprite_sheet;
	const sprite = new createjs.Sprite(image, animation);
	sprite.stop();
	return sprite;
};
export default CampaignScore;
