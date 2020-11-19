import Camera from "../view/camera";
import CameraTool from "../tools/cameraTool";
import CampaignScore from "../utils/campaignScore";
import Fullscreen from "../controls/fullscreen";
import GameSettings from "../gameSettings";
import LoadingCircle from "../utils/loadingCircle";
import MessageManager from "../utils/messageManager";
import MouseHandler from "../mouseHandler";
import Pause from "../controls/pause";
import Phone from "../controls/phone";
import PlayerManager from "../vehicles/playerManager";
import RaceTimes from "../utils/raceTimes";
import Score from "../utils/score";
import Screen from "../view/screen";
import Settings from "../controls/settings";
import SoundManager from "../utils/soundManager";
import Tablet from "../controls/tablet";
import ToolHandler from "../tools/toolHandler";
import Track from "../tracks/track";
import VehicleTimer from "../utils/vehicleTimer";
import _ from "lodash";
import formatNumber from "../utils/formatNumber";
import inventoryManager from "../inventoryManager";

function Main(options) {
	this.game = options;
	this.assets = options.assets;
	this.stage = options.stage;
	this.settings = options.settings;
	this.sound = new SoundManager(this);
	this.mouse = new MouseHandler(this);
	this.initalizeCamera();
	this.screen = new Screen(this);
	this.createTrack();
	this.score = new Score(this);
	this.raceTimes = new RaceTimes(this);
	this.message = new MessageManager(this);
	if (this.settings.isCampaign) {
		this.campaignScore = new CampaignScore(this);
	}
	this.loadingcircle = new LoadingCircle(this);
	this.loading = false;
	this.ready = false;
	this.playerManager = new PlayerManager(this);
	this.vehicleTimer = new VehicleTimer(this);
	this.races = [];
	this.state = this.setStateDefaults();
	this.oldState = this.setStateDefaults();
	this.createMainPlayer();
	this.createControls();
	this.registerTools();
	this.setStartingVehicle();
	this.restart();
	this.initializeAnalytics();
	this.stage.addEventListener(
		"stagemousedown",
		this.tapToStartOrRestart.bind(this)
	);
}
Main.prototype = {
	game: null,
	assets: null,
	stage: null,
	settings: null,
	camera: null,
	score: null,
	screen: null,
	mouse: null,
	track: null,
	player: null,
	players: null,
	ticks: 0,
	races: null,
	state: null,
	oldState: null,
	stateDirty: true,
	onStateChange: null,
	playing: false,
	ready: false,
	vehicle: "Mtb",
	showDialog: false,
	importCode: false,
	preloading: true,
	loading: true,
	pauseControls: null,
	fullscreenControls: null,
	settingsControls: null,
	controls: null,
	message: null,
	showSkip: false,
	getCanvasOffset() {
		const finalSizeCropProperties = {
			height: 0,
			width: 0,
		};
		return finalSizeCropProperties;
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
	analytics: null,
	initializeAnalytics() {
		this.analytics = {
			deaths: 0,
		};
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
		this.pauseControls = new Pause(this);
		if (this.settings.fullscreenAvailable) {
			this.fullscreenControls = new Fullscreen(this);
		}
		this.settingsControls = new Settings(this);
	},
	play() {
		if (!this.state.playing) {
			this.state.playing = true;
			this.hideControlPlanel();
		}
	},
	buttonDown(type) {
		if (!this.state.showDialog) {
			const camera = this.camera;
			switch (type) {
				case "change_camera":
					camera.focusOnNextPlayer();
					break;
				case "pause":
					this.state.paused = !this.state.paused;
					break;
				case "settings":
					this.openDialog("settings");
					break;
				case "exit_fullscreen":
					this.exitFullscreen();
					break;
				case "change_vehicle":
					this.toggleVehicle();
					break;
				case "zoom_increase":
					camera.increaseZoom();
					break;
				case "zoom_decrease":
					camera.decreaseZoom();
					break;
				case "fullscreen":
					this.toggleFullscreen();
					break;
				default:
			}
		}
	},
	exitFullscreen() {
		if (this.settings.fullscreenAvailable) {
			this.settings.fullscreen = false;
			this.state.fullscreen = false;
		}
	},
	toggleFullscreen() {
		if (this.settings.embedded) {
			const options = this.settings;
			const facebookString = `${options.basePlatformUrl}/t/${options.track.url}`;
			window.open(facebookString);
		} else if (this.settings.fullscreenAvailable) {
			this.settings.fullscreen = !this.settings.fullscreen;
			this.state.fullscreen = !this.settings.fullscreen;
		}
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
	createMainPlayer() {
		const self = this.playerManager;
		const p3 = self.createPlayer(this, this.settings.user);
		const action = p3.getGamepad();
		action.setKeyMap(this.settings.playHotkeys);
		action.recordKeys(this.settings.keysToRecord);
		action.onButtonDown = this.buttonDown.bind(this);
		action.listen();
		this.playerManager.firstPlayer = p3;
		this.playerManager.addPlayer(p3);
	},
	createTrack() {
		if (this.track) {
			this.track.close();
		}
		const track = new Track(this);
		const partial = this.getAvailableTrackCode();
		if (partial != 0) {
			track.read(partial);
			this.track = track;
			this.setTrackAllowedVehicles();
			this.state.preloading = false;
			this.loading = false;
			this.restartTrack = true;
			this.ready = true;
		}
		this.track = track;
	},
	setTrackAllowedVehicles() {
		const vehicleObj = this.track;
		const data = this.settings.track;
		if (data) {
			vehicleObj.allowedVehicles = data.vehicles;
		}
	},
	initalizeCamera() {
		this.camera = new Camera(this);
	},
	updateControls() {
		if (this.controls) {
			const value = this.state.paused;
			if (this.controls.isVisible() === value) {
				if (!value) {
					this.state.playing = false;
					this.camera.focusOnMainPlayer();
					this.toolHandler.setTool("camera");
				}
				this.controls.setVisibility(!value);
				this.controls.setZoomControlsVisibilty(value);
				this.updateState();
			}
			this.controls.update();
		}
		this.pauseControls.update();
		if (this.settings.fullscreenAvailable) {
			this.fullscreenControls.update();
		}
	},
	registerTools() {
		const self = new ToolHandler(this);
		this.toolHandler = self;
		self.registerTool(CameraTool);
		self.setTool("Camera");
	},
	updateToolHandler() {
		if (!(this.controls && this.controls.isVisible() !== false)) {
			this.toolHandler.update();
		}
	},
	update() {
		if (this.ready) {
			this.updateToolHandler();
			this.mouse.update();
			if (!(this.state.paused || this.state.showDialog)) {
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
				if (this.playerManager.firstPlayer.complete) {
					this.trackComplete();
				} else {
					this.ticks++;
				}
			}
			this.updateScore();
			this.vehicleTimer.update();
			if (this.isStateDirty()) {
				this.updateState();
			}
			this.camera.updateZoom();
		} else if (this.importCode) {
			this.createTrack();
		}
	},
	render() {
		if (this.ready) {
			this.stage.clear();
			this.draw();
			this.stage.update();
		}
	},
	isStateDirty() {
		const evalContextV1 = this.oldState;
		const state = this.state;
		if (state.fullscreen != GameSettings.fullscreen) {
			state.fullscreen = GameSettings.fullscreen;
		}
		let i = false;
		let prop;
		for (prop in state) {
			if (state[prop] !== evalContextV1[prop]) {
				i = true;
				this.oldState[prop] = state[prop];
			}
		}
		return i;
	},
	updateScore() {
		this.score.update();
		if (this.campaignScore) {
			this.campaignScore.update();
		}
		this.raceTimes.update();
	},
	restart() {
		if (this.settings.mobile) {
			this.message.show("Press Any Button To Start", 1, "#333333");
		} else {
			this.message.show("Press Any Key To Start", 1, "#333333", "#FFFFFF");
		}
		this.track.resetPowerups();
		this.restartTrack = false;
		this.state.paused = false;
		this.state.playing = !this.settings.waitForKeyPress;
		this.ticks = 0;
		this.playerManager.reset();
		if (this.playerManager.getPlayerCount() > 0) {
			this.camera.focusIndex = 1;
		}
		this.camera.focusOnPlayer();
		this.camera.fastforward();
		this.showControlPlanel("main");
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
	setStartingVehicle() {
		const data = this.settings;
		let vehicles = data.startVehicle;
		if (data.track) {
			vehicles = data.track.vehicle;
		}
		this.vehicle = vehicles;
	},
	updateGamepads() {
		this.playerManager.updateGamepads();
	},
	checkGamepads() {
		this.playerManager.checkKeys();
	},
	updatePlayers() {
		this.playerManager.update();
	},
	drawPlayers() {
		this.playerManager.draw();
	},
	hideControlPlanel() {
		if (this.state.showSkip) {
			this.state.showSkip = false;
		}
		if (this.state.showControls !== false) {
			this.state.showControls = false;
		}
	},
	showControlPlanel(val) {
		if (
			this.settings.isCampaign &&
			!this.settings.mobile &&
			this.settings.campaignData.can_skip &&
			this.analytics &&
			this.analytics.deaths > 5
		) {
			this.state.showSkip = true;
		}
		if (this.stateshowControls !== val && this.settings.showHelpControls) {
			this.state.showControls = val;
		}
	},
	draw() {
		this.toolHandler.drawGrid();
		this.track.draw();
		this.drawPlayers();
		if (!(this.controls && this.controls.isVisible() !== false)) {
			this.toolHandler.draw();
		}
		if (this.loading) {
			this.loadingcircle.draw();
		}
		this.message.draw();
	},
	redraw() {
		this.track.undraw();
		inventoryManager.redraw();
		this.toolHandler.resize();
	},
	resize() {
		this.pauseControls.resize();
		if (this.settings.fullscreenAvailable) {
			this.fullscreenControls.resize();
		}
		this.settingsControls.resize();
		if (this.controls) {
			this.controls.resize();
		}
	},
	updateState() {
		if (this.game.onStateChange !== null) {
			this.game.onStateChange(this.state);
		}
	},
	stateChanged() {
		this.updateState();
	},
	setStateDefaults() {
		const settings = {};
		return (
			(settings.playing = !this.settings.waitForKeyPress),
			(settings.paused = false),
			(settings.playerAlive = true),
			(settings.inFocus = true),
			(settings.preloading = true),
			(settings.fullscreen = this.settings.fullscreen),
			(settings.showControls = false),
			(settings.showSkip = false),
			(settings.showDialog = false),
			(settings.dialogOptions = false),
			settings
		);
	},
	toggleVehicle() {
		const format = this.track.allowedVehicles;
		const l = format.length;
		let separator = this.vehicle;
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
		this.state.playing = false;
		this.state.showDialog = name;
	},
	command() {
		const v = Array.prototype.slice.call(arguments, 0);
		const type = v.shift();
		switch (type) {
			case "resize":
				this.resize();
				break;
			case "dialog": {
				const cb = v[0];
				if (cb === false) {
					this.listen();
				} else {
					this.unlisten();
				}
				this.openDialog(cb);
				break;
			}
			case "focused": {
				const blobId = v[0];
				if (blobId === true) {
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
			case "add track": {
				const min = v[0];
				this.importCode = min.code;
				break;
			}
			case "clear race":
				this.races = [];
				this.restartTrack = true;
				this.raceTimes.clear();
				break;
			case "add race": {
				const versions = v[0];
				const timeSignDenom = v[1];
				this.addRaces(versions);
				if (timeSignDenom) {
					this.state.dialogOptions = {
						races: this.races,
					};
					this.command("dialog", "race_dialog");
				}
				break;
			}
			case "change vehicle": {
				const x = v[0];
				this.selectVehicle(x);
				break;
			}
			case "restart":
				this.command("dialog", false);
				this.restartTrack = true;
				break;
			case "resume":
				this.state.paused = false;
				break;
			case "fullscreen":
				this.toggleFullscreen();
				break;
			case "exit_fullscreen":
				this.exitFullscreen();
				break;
			default:
		}
	},
	addRaces(type) {
		this.mergeRaces(type);
		this.sortRaces();
		this.formatRaces();
		this.addRaceTimes();
		this.addPlayers();
		this.restartTrack = true;
	},
	addRaceTimes() {
		const pieBackgroundColor = this.settings.raceColors;
		const pBCL = pieBackgroundColor.length;
		const mqs = this.races;
		const s = this.raceTimes;
		s.clear();
		let i;
		for (i in mqs) {
			const val = mqs[i];
			val.user.color = pieBackgroundColor[i % pBCL];
			s.addRace(val, i);
		}
	},
	addPlayers() {
		const defined = this.races;
		const game = this.playerManager;
		game.clear();
		const i = this.settings.keysToRecord;
		let id;
		for (id in defined) {
			const e = defined[id];
			const x = e.user;
			const data = e.race;
			let value = data.code;
			if (typeof value == "string") {
				value = JSON.parse(value);
			}
			const p1 = game.createPlayer(this, x);
			p1.setBaseVehicle(data.vehicle);
			p1.setAsGhost();
			const harParser = p1.getGamepad();
			harParser.loadPlayback(value, i);
			game.addPlayer(p1);
		}
	},
	formatRaces() {
		const bookIDs = this.races;
		let bookIdIndex;
		for (bookIdIndex in bookIDs) {
			const msg = bookIDs[bookIdIndex].race;
			let data = msg.code;
			if (typeof data == "string") {
				data = JSON.parse(data);
				let i;
				for (i in data) {
					const result = data[i];
					const parsed = _.countBy(result, _.identity);
					data[i] = parsed;
				}
				msg.code = data;
			}
		}
	},
	removeDuplicateRaces() {
		const t = _.uniq(this.races, this.uniqesByUserIdIterator.bind(this));
		this.races = t;
	},
	uniqesByUserIdIterator(htmlAndUser) {
		const user = htmlAndUser.user;
		return user.u_id;
	},
	sortRaces() {
		const t = _.sortBy(this.races, this.sortByRunTicksIterator.bind(this));
		this.races = t;
	},
	mergeRaces(attrValues) {
		const e = this.races;
		_.each(attrValues, function (object) {
			const i = _.find(e, function ($scope) {
				return $scope.user.u_id === object.user.u_id;
			});
			if (i) {
				_.extend(i, object);
			} else {
				e.push(object);
			}
		});
	},
	sortByRunTicksIterator(q) {
		const s = this.settings;
		const i = Number.parseInt(q.race.run_ticks, 10);
		const n = formatNumber((i / s.drawFPS) * 1e3);
		q.runTime = n;
		return i;
	},
	verifyComplete() {
		const THIS = this.playerManager.firstPlayer;
		const targets = THIS._powerupsConsumed.targets;
		const radius = this.track.targets;
		let s = true;
		let side;
		for (side in radius) {
			const r = radius[side];
			const source = r.id;
			if (!targets.includes(source)) {
				s = false;
			}
		}
		return s;
	},
	trackComplete() {
		if (this.verifyComplete()) {
			this.sound.play("victory_sound");
			const $scope = this.playerManager;
			$scope.mutePlayers();
			const ctrl = $scope.firstPlayer;
			const applyViewModelsSpy = ctrl.getGamepad();
			const aerisCode = applyViewModelsSpy.getReplayString();
			const metadata = this.settings;
			const encoderPadding = this.ticks;
			const time = formatNumber((encoderPadding / metadata.drawFPS) * 1e3);
			const trackId = document.querySelector("#track-data").dataset.t_id;
			const data = {
				t_id: trackId,
				u_id: metadata.user.u_id,
				code: aerisCode,
				vehicle: ctrl._baseVehicleType,
				run_ticks: encoderPadding,
				fps: 25,
				time,
			};
			const value = `${data.t_id}|${data.u_id}|${data.code}|${data.run_ticks}|${data.vehicle}|${data.fps}|erxrHHcksIHHksktt8933XhwlstTekz`;
			// CryptoJS.SHA256(value).toString();
			const uid = value;
			data.sig = uid;
			const candidate_globals = this.races;
			const xmax = candidate_globals.length;
			const betterBeans = [];
			if (xmax > 0) {
				let x = 0;
				for (; xmax > x; x++) {
					betterBeans.push(candidate_globals[x].user.u_id);
				}
				data.races = betterBeans;
			}
			if (metadata.isCampaign) {
				data.is_campaign = true;
			}
			this.state.dialogOptions = {
				postData: data,
				analytics: this.analytics,
			};
			if (metadata.isCampaign) {
				this.command("dialog", "campaign_complete");
			} else {
				this.command("dialog", "track_complete");
			}
			applyViewModelsSpy.reset(true);
			this.listen();
		}
	},
	close() {
		this.fullscreenControls = null;
		this.settingsControls = null;
		this.pauseControls = null;
		this.raceTimes = null;
		this.score = null;
		this.campaignScore = null;
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
export default Main;
