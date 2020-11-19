import Controls from "./controls";

function Fullscreen(obj) {
	this.initialize(obj);
}
Fullscreen.prototype = new Controls();
const self = Fullscreen.prototype;
self.name = "fullscreen_controls";
self.fullscreenControl = null;
self.fullscreen = false;
self.controlsSpriteSheetData = {
	frames: [
		[230, 2, 76, 76],
		[154, 2, 76, 76],
		[78, 2, 76, 76],
		[2, 2, 76, 76],
	],
	animations: {
		"exit_fullscreen_btn-hover": [0],
		exit_fullscreen_btn: [1],
		"fullscreen_btn-hover": [2],
		fullscreen_btn: [3],
	},
};
self.controlData = {
	"fullscreen_btn-hover": {
		top: 60,
		right: 150,
		key: "fullscreen",
	},
};
self.update = function () {
	const fullscreen = this.scene.settings.fullscreen;
	if (this.fullscreen !== fullscreen) {
		this.fullscreenControl.gotoAndStop(
			fullscreen ? "exit_fullscreen_btn-hover" : "fullscreen_btn-hover"
		);
		this.fullscreen = fullscreen;
	}
};
self.addControls = function () {
	const child = new createjs.Container();
	child.addChild(this.createControl("fullscreen_btn-hover"));
	this.controlsContainer = child;
	this.fullscreenControl = child.getChildByName("fullscreen_btn-hover");
	this.stage.addChild(child);
};
export default Fullscreen;
