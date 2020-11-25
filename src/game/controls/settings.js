import Controls from "./controls";

class Settings extends Controls {
	constructor(scene) {
		const controlData = {
			"settings_btn-hover": {
				top: 60,
				right: 230,
				key: "settings",
			},
		};
		super(scene, "settings_controls", controlData, {
			frames: [
				[78, 2, 76, 76],
				[2, 2, 76, 76],
			],
			animations: {
				"settings_btn-hover": [0],
				settings_btn: [1],
			},
		});

		const horizonMargin = controlData["settings_btn-hover"];
		horizonMargin.top = 60;
		horizonMargin.right = 150;
	}

	addControls() {
		const top = new createjs.Container();
		top.addChild(this.createControl("settings_btn-hover"));
		this.controlsContainer = top;
		this.stage.addChild(top);
	}
}

export default Settings;
