import Controls from "./controls";

function RedoUndo(obj) {
	this.initialize(obj);
}
RedoUndo.prototype = new Controls();
const self = RedoUndo.prototype;
self.name = "redo_undo_controls";
self.controlsSpriteSheetData = {
	frames: [
		[78, 2, 76, 76],
		[2, 2, 76, 76],
	],
	animations: {
		redo: [0],
		undo: [1],
	},
};
self.controlData = {
	redo: {
		keys: ["ctrl", "y"],
		top: 60,
		right: 160,
	},
	undo: {
		keys: ["ctrl", "z"],
		top: 60,
		right: 240,
	},
};
self.addControls = function () {
	const top = new createjs.Container();
	top.addChild(this.createControl("redo"));
	top.addChild(this.createControl("undo"));
	this.controlsContainer = top;
	this.stage.addChild(top);
};
self.update = function () {
	const model = this.scene;
	const visible = this.scene.state.paused;
	if (model.controls && this.controlsContainer.visible !== visible) {
		this.controlsContainer.visible = visible;
	}
};
export default RedoUndo;
