import Controls from "./controls";

function Pause(obj) {
	this.initialize(obj);
}
Pause.prototype = new Controls();
const self = Pause.prototype;
self.name = "pause_controls";
self.pauseControl = null;
self.paused = false;
self.controlsSpriteSheetData = {
	frames: [
		[230, 2, 76, 76],
		[154, 2, 76, 76],
		[78, 2, 76, 76],
		[2, 2, 76, 76],
	],
	animations: {
		"pause_btn-hover": [0],
		pause_btn: [1],
		"play_btn-hover": [2],
		play_btn: [3],
	},
};
self.controlData = {
	"pause_btn-hover": {
		key: "pause",
		top: 60,
		right: 70,
	},
};
self.update = function () {
	const paused = this.scene.state.paused;
	if (this.paused !== paused) {
		if (paused) {
			this.pauseControl.gotoAndStop("play_btn-hover");
			this.paused = true;
		} else {
			this.pauseControl.gotoAndStop("pause_btn-hover");
			this.paused = false;
		}
	}
};
self.addControls = function () {
	const child = new createjs.Container();
	child.addChild(this.createControl("pause_btn-hover"));
	this.controlsContainer = child;
	this.pauseControl = child.getChildByName("pause_btn-hover");
	this.stage.addChild(child);
};
export default Pause;
