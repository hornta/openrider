import Controls from "./controls";

function Settings(obj) {
	const settings = obj.settings;
	if (settings.fullscreenAvailable === false) {
		const horizonMargin = this.controlData["settings_btn-hover"];
		horizonMargin.top = 60;
		horizonMargin.right = 150;
	}
	this.initialize(obj);
}
Settings.prototype = new Controls();
const self = Settings.prototype;
self.name = "settings_controls";
self.controlsSpriteSheetData = {
	frames: [
		[78, 2, 76, 76],
		[2, 2, 76, 76],
	],
	animations: {
		"settings_btn-hover": [0],
		settings_btn: [1],
	},
};
self.controlData = {
	"settings_btn-hover": {
		top: 60,
		right: 230,
		key: "settings",
	},
};
self.update = function () {};
self.addControls = function () {
	const top = new createjs.Container();
	top.addChild(this.createControl("settings_btn-hover"));
	this.controlsContainer = top;
	this.stage.addChild(top);
};
export default Settings;
