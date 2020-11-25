import Controls from "./controls";
import store from "../../store";

class RedoUndo extends Controls {
	constructor(scene) {
		const controlData = {
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
		super(scene, "redo_undo_controls", controlData, {
			frames: [
				[78, 2, 76, 76],
				[2, 2, 76, 76],
			],
			animations: {
				redo: [0],
				undo: [1],
			},
		});
	}

	addControls() {
		const top = new createjs.Container();
		top.addChild(this.createControl("redo"));
		top.addChild(this.createControl("undo"));
		this.controlsContainer = top;
		this.stage.addChild(top);
	}

	update() {
		const model = this.scene;
		const isPaused = store.getState().game.paused;
		if (model.controls && this.controlsContainer.visible !== isPaused) {
			this.controlsContainer.visible = isPaused;
		}
	}
}

export default RedoUndo;
