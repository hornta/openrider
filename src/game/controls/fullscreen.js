import Controls from "./controls";
import store from "../../store";
import watch from "redux-watch";

class Fullscreen extends Controls {
	constructor(scene) {
		const controlData = {
			"fullscreen_btn-hover": {
				top: 60,
				right: 150,
				key: "fullscreen",
			},
		};
		super(scene, "fullscreen_controls", controlData, {
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
		});

		const watcher = watch(store.getState, "game.fullscreen");
		store.subscribe(
			watcher((fullscreen) => {
				if (fullscreen) {
					this.fullscreenControl.gotoAndStop("exit_fullscreen_btn-hover");
				} else {
					this.fullscreenControl.gotoAndStop("fullscreen_btn-hover");
				}
			})
		);
	}

	addControls() {
		const container = new createjs.Container();
		container.addChild(this.createControl("fullscreen_btn-hover"));
		this.controlsContainer = container;
		this.fullscreenControl = container.getChildByName("fullscreen_btn-hover");
		this.stage.addChild(container);
	}
}

export default Fullscreen;
