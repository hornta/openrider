import Controls from "./controls";
import store from "../../store";
import watch from "redux-watch";

class Pause extends Controls {
	constructor(scene) {
		const controlData = {
			"pause_btn-hover": {
				key: "pause",
				top: 60,
				right: 70,
			},
		};
		super(scene, "pause_controls", controlData, {
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
		});

		const watcher = watch(store.getState, "game.paused");
		store.subscribe(
			watcher((paused) => {
				if (paused) {
					this.pauseControl.gotoAndStop("play_btn-hover");
				} else {
					this.pauseControl.gotoAndStop("pause_btn-hover");
				}
			})
		);
	}

	addControls() {
		const child = new createjs.Container();
		child.addChild(this.createControl("pause_btn-hover"));
		this.controlsContainer = child;
		this.pauseControl = child.getChildByName("pause_btn-hover");
		this.stage.addChild(child);
	}
}

export default Pause;
