import BrushTool from "../tools/brushTool";
import Camera from "../view/camera";
import CameraTool from "../tools/cameraTool";
import CurveTool from "../tools/curveTool";
import EraserTool from "../tools/eraserTool";
import LoadingCircle from "../utils/loadingCircle";
import MessageManager from "../utils/messageManager";
import MouseHandler from "../mouseHandler";
import Pause from "../controls/pause";
import Phone from "../controls/phone";
import PlayerManager from "../vehicles/playerManager";
import PowerupTool from "../tools/powerupTool";
import RedoUndo from "../controls/redoUndo";
import Score from "../utils/score";
import Screen from "../view/screen";
import SelectTool from "../tools/selectTool";
import SoundManager from "../utils/soundManager";
import StraightLineTool from "../tools/straightLineTool";
import Tablet from "../controls/tablet";
import ToolHandler from "../tools/toolHandler";
import Track from "../tracks/track";
import VehiclePowerupTool from "../tools/vehiclePowerupTool";
import VehicleTimer from "../utils/vehicleTimer";
import inventoryManager from "../inventoryManager";

function Editor(options) {
	this.game = options;
	this.assets = options.assets;
	this.stage = options.stage;
	this.settings = options.settings;
	this.sound = new SoundManager(this);
	this.mouse = new MouseHandler(this);
	this.mouse.disableContextMenu();
	this.message = new MessageManager(this);
	this.camera = new Camera(this);
	this.screen = new Screen(this);
	this.createTrack();
	this.loadingcircle = new LoadingCircle(this);
	this.playerManager = new PlayerManager(this);
	this.vehicleTimer = new VehicleTimer(this);
	this.score = new Score(this);
	this.createMainPlayer();
	this.createControls();
	this.registerTools();
	this.state = this.setStateDefaults();
	this.oldState = this.setStateDefaults();
	this.restart();
	this.stage.addEventListener(
		"stagemousedown",
		this.tapToStartOrRestart.bind(this)
	);
}

Editor.prototype = {
	game: null,
	assets: null,
	stage: null,
	canvas: null,
	settings: null,
	camera: null,
	screen: null,
	mouse: null,
	track: null,
	player: null,
	players: null,
	ticks: 0,
	state: null,
	oldState: null,
	stateDirty: true,
	onStateChange: null,
	vehicle: "Mtb",
	showDialog: false,
	dialogOptions: false,
	importCode: false,
	clear: false,
	redoundoControls: null,
	pauseControls: null,
	inFocus: true,
	controls: null,
	verified: false,
	getCanvasOffset() {
		let myConfig = {
			height: 90,
			width: 0,
		};
		return (
			this.settings.isStandalone &&
				(myConfig = {
					height: 202,
					width: 0,
				}),
			myConfig
		);
	},
	tapToStartOrRestart() {
		if (this.settings.mobile) {
			const ctrl = this.playerManager.firstPlayer;
			if (ctrl && ctrl._crashed && !this.state.paused) {
				const player = ctrl.getGamepad();
				player.setButtonDown("enter");
			} else {
				this.play();
			}
		}
	},
	createMainPlayer() {
		const self = this.playerManager;
		const p3 = self.createPlayer(this, this.settings.user);
		const action = p3.getGamepad();
		action.setKeyMap(this.settings.editorHotkeys);
		action.onButtonDown = this.buttonDown.bind(this);
		action.listen();
		this.playerManager.firstPlayer = p3;
		this.playerManager.addPlayer(p3);
	},
	createControls() {
		if (this.settings.controls === "tablet") {
			this.controls = new Tablet(this);
			this.controls.hide();
		}
		if (this.settings.controls === "phone") {
			this.controls = new Phone(this);
			this.controls.hide();
		}
		this.redoundoControls = new RedoUndo(this);
		this.pauseControls = new Pause(this);
	},
	createTrack() {
		if (this.track) {
			this.track.close();
		}
		const scope = new Track(this);
		const partial = this.getAvailableTrackCode();
		if (partial == 0) {
			scope.addDefaultLine();
		} else {
			scope.read(partial);
			this.track = scope;
			this.state.preloading = false;
			this.state.loading = false;
		}
		this.importCode = false;
		this.restartTrack = true;
		this.clear = false;
		this.track = scope;
	},
	updateControls() {
		if (this.controls) {
			const visible = this.state.paused;
			if (this.controls.isVisible() === visible) {
				if (!visible) {
					this.state.playing = false;
					this.camera.focusOnMainPlayer();
					this.toolHandler.setTool("camera");
				}
				this.controls.setVisibility(!visible);
				this.updateState();
			}
			this.controls.update();
		}
		this.pauseControls.update();
	},
	registerTools() {
		const self = new ToolHandler(this);
		self.enableGridUse();
		this.toolHandler = self;
		self.registerTool(CameraTool);
		self.registerTool(CurveTool);
		self.registerTool(StraightLineTool);
		self.registerTool(BrushTool);
		self.registerTool(SelectTool);
		self.registerTool(EraserTool);
		self.registerTool(PowerupTool);
		self.registerTool(VehiclePowerupTool);
		self.setTool(this.settings.startTool);
	},
	updateToolHandler() {
		if (!(this.controls && this.controls.isVisible() !== false)) {
			this.toolHandler.update();
		}
	},
	play() {
		this.state.playing = true;
	},
	update() {
		this.updateToolHandler();
		this.mouse.update();
		if (!this.state.showDialog) {
			this.updateGamepads();
			this.checkGamepads();
		}
		this.screen.update();
		this.updateControls();
		this.camera.update();
		this.sound.update();
		if (this.restartTrack) {
			this.restart();
		}
		if (!this.state.paused && this.state.playing) {
			this.message.update();
			this.updatePlayers();
			this.score.update();
			if (this.playerManager.firstPlayer.complete) {
				this.trackComplete();
			} else {
				this.ticks++;
			}
		}
		this.vehicleTimer.update();
		if (this.importCode || this.clear) {
			this.createTrack();
		}
		if (this.isStateDirty()) {
			this.updateState();
		}
		this.stage.clear();
		// This.draw();
		this.stage.update();
		this.camera.updateZoom();
	},
	render() {
		this.draw();
	},
	isStateDirty() {
		const proto = this.oldState;
		const obj = this.state;
		let i = false;
		let prop;
		for (prop in obj) {
			if (obj[prop] !== proto[prop]) {
				i = true;
				this.oldState[prop] = obj[prop];
			}
		}
		return i;
	},
	updateGamepads() {
		this.playerManager.updateGamepads();
	},
	checkGamepads() {
		this.playerManager.checkKeys();
	},
	restart() {
		this.verified = !this.settings.requireTrackVerification;
		this.track.dirty = false;
		this.track.resetPowerups();
		this.message.hide();
		this.restartTrack = false;
		this.state.playing = false;
		this.ticks = 0;
		this.playerManager.reset();
		this.camera.focusOnPlayer();
		this.camera.fastforward();
		this.score.update();
	},
	buttonDown(event) {
		const camera = this.camera;
		switch (((this.state.playing = true), event)) {
			case "up":
			case "down":
			case "left":
			case "right":
				camera.focusOnMainPlayer();
				break;
			case "change_camera":
				camera.focusOnNextPlayer();
				break;
			case "pause":
				this.state.paused = !this.state.paused;
				break;
			case "settings":
				this.command("dialog", "settings");
				break;
			case "change_vehicle":
				this.toggleVehicle();
				this.stateChanged();
				break;
			case "zoom_increase":
				camera.increaseZoom();
				this.stateChanged();
				break;
			case "zoom_decrease":
				camera.decreaseZoom();
				this.stateChanged();
				break;
			case "fullscreen":
				this.toggleFullscreen();
				this.stateChanged();
				break;
			default:
		}
	},
	toggleFullscreen() {
		if (this.settings.embedded) {
			const options = this.settings;
			const facebookString = `${options.basePlatformUrl}/t/${options.track.url}`;
			window.open(facebookString);
		} else if (this.settings.fullscreenAvailable) {
			this.state.fullscreen = !this.settings.fullscreen;
			this.settings.fullscreen = this.state.fullscreen;
		}
	},
	updatePlayers() {
		this.playerManager.update();
	},
	drawPlayers() {
		this.playerManager.draw();
	},
	draw() {
		this.toolHandler.drawGrid();
		this.track.draw();
		this.drawPlayers();
		if (!(this.controls && this.controls.isVisible() !== false)) {
			this.toolHandler.draw();
		}
		if (this.state.loading) {
			this.loadingcircle.draw();
		}
		this.message.draw();
	},
	getAvailableTrackCode() {
		const attrs = this.settings;
		let isoOptions = false;
		return (
			attrs.importCode && attrs.importCode !== "false"
				? ((isoOptions = attrs.importCode), (attrs.importCode = null))
				: this.importCode &&
				  ((isoOptions = this.importCode), (this.importCode = null)),
			isoOptions
		);
	},
	redraw() {
		this.track.undraw();
		inventoryManager.redraw();
		this.toolHandler.resize();
	},
	resize() {
		this.pauseControls.resize();
		this.redoundoControls.resize();
		if (this.controls) {
			this.controls.resize();
		}
	},
	updateState() {
		if (this.game.onStateChange !== null) {
			const data = this.state;
			data.tool = this.toolHandler.currentTool;
			data.toolOptions = this.toolHandler.getToolOptions();
			data.grid = this.toolHandler.options.grid;
			data.cameraLocked = this.toolHandler.options.cameraLocked;
			data.zoomPercentage = this.camera.zoomPercentage;
			data.vehicle = this.vehicle;
			this.game.onStateChange(this.state);
		}
	},
	stateChanged() {
		this.updateState();
	},
	setStateDefaults() {
		const state = {
			paused: this.settings.mobile ? true : this.settings.startPaused,
			loading: false,
			playing: this.settings.waitForKeyPress,
			tool: this.toolHandler.currentTool,
			toolOptions: this.toolHandler.getToolOptions(),
			grid: this.toolHandler.options.grid,
			cameraLocked: this.toolHandler.options.cameraLocked,
			zoomPercentage: this.camera.zoomPercentage,
			vehicle: this.vehicle,
			showDialog: false,
			dialogOptions: false,
			preloading: false,
			fullscreen: this.settings.fullscreen,
			inFocus: true,
		};
		if (this.controls) {
			state.hideMenus = this.controls.isVisible();
		}
		return state;
	},
	toggleVehicle() {
		const format = this.track.allowedVehicles;
		const l = format.length;
		let separator = this.state.vehicle;
		let separatorIndex = format.indexOf(separator);
		separatorIndex++;
		if (separatorIndex >= l) {
			separatorIndex = 0;
		}
		separator = format[separatorIndex];
		this.selectVehicle(separator);
	},
	selectVehicle(separator) {
		const element = this.track.allowedVehicles;
		const separtorDimension = element.indexOf(separator);
		if (separtorDimension !== -1) {
			this.settings.track.vehicle = separator;
			this.vehicle = separator;
			this.playerManager.firstPlayer.setBaseVehicle(separator);
			this.restartTrack = true;
		}
	},
	openDialog(name) {
		switch (((this.state.dialogOptions = {}), name)) {
			case "import":
				break;
			case "export":
				setTimeout(this.getTrackCode.bind(this), 750);
				break;
			case "upload":
				if (typeof isChromeApp == "undefined") {
					setTimeout(this.getTrackCode.bind(this), 750);
				}
				break;
			default:
		}
		this.state.playing = false;
		this.state.showDialog = name;
	},

	getTrackCode() {
		this.state.dialogOptions = {};
		this.state.dialogOptions.verified = this.verified;
		this.state.dialogOptions.code = this.track.getCode();
	},
	trackComplete() {
		this.verified = !this.track.dirty;
	},
	hideControlPlanel() {},
	showControlPlanel() {},
	command() {
		const m = Array.prototype.slice.call(arguments, 0);
		const key = m.shift();
		switch (key) {
			case "change tool": {
				const type = m[0];
				this.toolHandler.setTool(type);
				break;
			}
			case "change tool option": {
				const an = m[0];
				const a4 = m[1];
				if (typeof m[2] == "undefined") {
					this.toolHandler.setToolOption(an, a4);
				} else {
					this.toolHandler.setToolOption(an, a4, m[2]);
				}
				break;
			}
			case "snap":
				this.toolHandler.toggleSnap();
				break;
			case "redraw":
				this.redraw();
				break;
			case "fullscreen":
				this.state.fullscreen = !this.settings.fullscreen;
				this.settings.fullscreen = this.state.fullscreen;
				break;
			case "grid":
				this.toolHandler.toggleGrid();
				break;
			case "lock camera":
				this.toolHandler.toggleCameraLock();
				break;
			case "toggle vehicle":
				this.toggleVehicle();
				this.stateChanged();
				break;
			case "reset zoom":
				this.camera.resetZoom();
				break;
			case "increase zoom":
				this.camera.increaseZoom();
				break;
			case "decrease zoom":
				this.camera.decreaseZoom();
				break;
			case "change lineType": {
				const lineType = m[0];
				this.toolHandler.options.lineType = lineType;
				this.stateChanged();
				break;
			}
			case "resize":
				this.resize();
				break;
			case "dialog": {
				const iframe = m[0];
				if (iframe === false) {
					this.listen();
				} else {
					this.unlisten();
				}
				this.openDialog(iframe);
				break;
			}
			case "focused": {
				const is_block = m[0];
				if (is_block === true) {
					this.state.inFocus = true;
					if (this.state.showDialog === false) {
						this.listen();
					}
				} else {
					this.state.inFocus = false;
					this.unlisten();
					this.state.playing = false;
				}
				break;
			}
			case "clear track":
				this.clear = true;
				break;
			case "import": {
				let args = m[0];
				if (args.length <= 0) {
					args = false;
				}
				this.importCode = args;
				this.clear = m[1];
				this.command("dialog", false);
				break;
			}
			default:
		}
	},
	listen() {
		const controller = this.playerManager.firstPlayer;
		const destServer = controller.getGamepad();
		destServer.listen();
	},
	unlisten() {
		const controller = this.playerManager.firstPlayer;
		const comm = controller.getGamepad();
		comm.unlisten();
	},
	stopAudio() {
		createjs.Sound.stop();
	},
	close() {
		this.pauseControls = null;
		this.mouse.close();
		this.mouse = null;
		this.camera.close();
		this.camera = null;
		this.screen.close();
		this.screen = null;
		this.vehicleTimer.close();
		this.vehicleTimer = null;
		this.playerManager.close();
		this.playerManager = null;
		this.sound.close();
		this.sound = null;
		this.track.close();
		this.toolHandler.close();
		this.game = null;
		this.assets = null;
		this.settings = null;
		this.stage = null;
		this.track = null;
		this.state = null;
		this.stopAudio();
	},
};

export default Editor;
