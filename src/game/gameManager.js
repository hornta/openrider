import {
	SOUND_ANTIGRAVITY,
	SOUND_BALLOON,
	SOUND_BIKE_AIR,
	SOUND_BIKE_FALL_1,
	SOUND_BIKE_FALL_2,
	SOUND_BIKE_FALL_3,
	SOUND_BIKE_GROUND,
	SOUND_BLOB,
	SOUND_BOMB,
	SOUND_BOOST,
	SOUND_CHECKPOINT,
	SOUND_GOAL,
	SOUND_GRAVITY,
	SOUND_HELICOPTER,
	SOUND_SLOWMO,
	SOUND_TELEPORT,
	SOUND_VICTORY,
} from "./utils/sounds";
import $ from "jquery";
import EventEmitter from "eventemitter3";
import Game from "./game";
import GameManifest from "./gameManifest";
import SoundManager from "./utils/soundManager";

const basePath = "https://www.freeriderhd.com";

let loader = false;
let res = false;
class GameManager extends EventEmitter {
	constructor() {
		super();
		this.loadRaceRequest = null;
		this.loadTrackRequest = null;
		this.baseAssetsLoaded = false;
		this.settings = null;
		this.game = null;
		this.scene = null;
		this.trackId = null;
		this.state = {
			preloading: true,
			loadingPercent: 0,
			loadingText: "Scripts",
		};

		this.pendingRaceCommands = [];
		this.pendingCommands = [];
		this.pendingAssetCount = 0;
		res = new createjs.LoadQueue(false, "", "Anonymous");
	}

	loadAssets() {
		loader = new createjs.LoadQueue(false, "", "Anonymous");
		loader.setMaxConnections(10);
		loader.maintainScriptOrder = true;
		loader.loadManifest(GameManifest);

		return new Promise((resolve) => {
			loader.addEventListener("complete", () => {
				resolve();
			});
		});
	}

	clearRequests() {
		if (this.loadTrackRequest) {
			this.loadTrackRequest.abort();
		}
		if (this.loadRaceRequest) {
			this.loadRaceRequest.abort();
		}
		this.loadTrackRequest = null;
		this.loadRaceRequest = null;
	}

	async init(value, key) {
		this.pendingCommands = [];
		this.clearRequests();
		this.settings = key;
		this.scene = value;
		this.ready = true;
		this.checkLoadingProgress();

		this.soundManager = new SoundManager([
			{
				id: SOUND_ANTIGRAVITY,
				url: "./sounds/antigravity.mp3",
			},
			{
				id: SOUND_BALLOON,
				url: "./sounds/balloon.mp3",
			},
			{
				id: SOUND_BIKE_AIR,
				url: "./sounds/bike_air.mp3",
			},
			{
				id: SOUND_BIKE_FALL_1,
				url: "./sounds/bike_fall_1.mp3",
			},
			{
				id: SOUND_BIKE_FALL_2,
				url: "./sounds/bike_fall_2.mp3",
			},
			{
				id: SOUND_BIKE_FALL_3,
				url: "./sounds/bike_fall_3.mp3",
			},
			{
				id: SOUND_BIKE_GROUND,
				url: "./sounds/bike_ground.mp3",
			},
			{
				id: SOUND_BLOB,
				url: "./sounds/blob.mp3",
			},
			{
				id: SOUND_BOMB,
				url: "./sounds/bomb.mp3",
			},
			{
				id: SOUND_BOOST,
				url: "./sounds/boost.mp3",
			},
			{
				id: SOUND_CHECKPOINT,
				url: "./sounds/checkpoint.mp3",
			},
			{
				id: SOUND_GOAL,
				url: "./sounds/goal.mp3",
			},
			{
				id: SOUND_GRAVITY,
				url: "./sounds/gravity.mp3",
			},
			{
				id: SOUND_HELICOPTER,
				url: "./sounds/helicopter.mp3",
			},
			{
				id: SOUND_SLOWMO,
				url: "./sounds/slowmo.mp3",
			},
			{
				id: SOUND_TELEPORT,
				url: "./sounds/teleport.mp3",
			},
			{
				id: SOUND_VICTORY,
				url: "./sounds/victory.mp3",
			},
		]);

		await Promise.all([this.soundManager.load(), this.loadAssets()]);
		this.loadGame();
	}

	checkLoadingProgress() {
		if (this.baseAssetsLoaded) {
			this.loadGame();
		}
	}

	handleProgress(event) {
		const namespacePrefixEq = Math.trunc((event.loaded / event.total) * 100);
		const { state } = this;
		state.loadingPercent = namespacePrefixEq;
		state.preloading = true;
		this.stateChange(state);
	}

	showLoading(tag) {
		let t = this.pendingAssetCount;
		if (t <= 0) {
			t = 0.5;
		}
		let r = Math.trunc((0.5 / t) * 100);
		r = Math.min(r, 100);
		const { state } = this;
		state.loadingPercent = r;
		state.preloading = true;
		state.loadingText = tag;
		this.stateChange(state);
	}

	handleFileLoad(evt) {
		const el = evt.item;
		const { state } = this;
		state.loadingText = el.name ? el.name : "Assets";
		this.stateChange(state);
	}

	loadRacesFromSettings() {
		const { settings } = this;
		let t = settings.raceUids;
		if (!t) {
			t = [];
		}
		const backgroundPageId = settings.track.id;
		if (
			t.length > 0 &&
			settings.raceData &&
			settings.raceData.length == t.length
		) {
			this.command("add race", settings.raceData, false);
		} else if (t.length > 0) {
			const id = t.join(",");
			this.loadRace(backgroundPageId, id, false);
		}
	}

	loadTrackFromSettings() {
		const options = this.settings;
		const query = options.track;
		const { id } = query;
		const path = query.cdn;
		this.loadTrack(id, path);
	}

	loadGame() {
		this.game = new Game(this.scene, loader, this.settings, this.soundManager);
		this.game.onStateChange = this.stateChange.bind(this);
		this.executePendingCommands();
		this.executePendingRaceCommands();
		if (this.scene === "Main") {
			this.loadTrackFromSettings();
			this.loadRacesFromSettings();
		}
	}

	loadRace(formatters, initialValue, context) {
		if (typeof Application != "undefined") {
			const header = {
				// eslint-disable-next-line camelcase
				t_id: formatters,
				// eslint-disable-next-line camelcase
				u_ids: initialValue,
			};
			this.pendingAssetCount++;
			this.showLoading("Loading Race...");
			// eslint-disable-next-line no-undef
			const handler = Application.Helpers.AjaxHelper.post(
				"/track_api/load_races",
				header,
				{
					track: false,
				}
			);
			handler.done(
				context
					? this.loadRaceCompleteWithDialog.bind(this)
					: this.loadRaceComplete.bind(this)
			);
			this.loadRaceRequest = handler;
		}
	}

	loadRaceCompleteWithDialog(e) {
		if (e.result) {
			this.command("add race", e.data, true);
		}
		this.loadRaceRequest = null;
	}

	loadRaceComplete(e) {
		if (e.result) {
			this.command("add race", e.data, false);
		}
		this.loadRaceRequest = null;
	}

	closeGame() {
		if (this.game) {
			this.game.close();
			this.game = null;
		}
	}

	executePendingCommands() {
		const commands = this.pendingCommands;
		const { length } = commands;
		let i = 0;
		for (; length > i; i++) {
			const value = commands[i];
			this.command(...value);
		}
		this.pendingCommands = [];
	}

	executePendingRaceCommands() {
		const commands = this.pendingRaceCommands;
		const { length } = commands;
		let i = 0;
		for (; length > i; i++) {
			const value = commands[i];
			this.command(...value);
		}
		this.pendingRaceCommands = [];
	}

	command(respectCounter) {
		if (this.game) {
			this.game.command(...arguments);
		} else if (respectCounter == "add race") {
			this.pendingRaceCommands.push(arguments);
		} else {
			this.pendingCommands.push(arguments);
		}
	}

	loadTrack(trackId, callback) {
		this.pendingAssetCount++;
		this.showLoading("Loading Track...");
		this.trackId = trackId;
		if (callback) {
			this.cdnTrackRequest(callback);
		} else {
			this.svrTrackRequest(trackId);
		}
	}

	cdnTrackRequest(object) {
		const t = $.ajax({
			type: "GET",
			url: object,
			async: true,
			cache: true,
			jsonpCallback: "t",
			contentType: "application/json",
			dataType: "jsonp",
			success: this.cdnTrackRequestSuccess.bind(this),
			error: this.cdnTrackRequestError.bind(this),
		});
		this.loadTrackRequest = t;
	}

	async svrTrackRequest(trackId) {
		const path = `/track_api/load_track?id=${trackId}&fields[]=id&fields[]=code&fields[]=vehicle&fields[]=vehicles`;

		try {
			const response = await fetch(basePath + path, {
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
		this.command("add track");
		// const t = Application.Helpers.AjaxHelper.get(s);
		// t.done(this.svrTrackRequestSuccess.bind(this));
		this.loadTrackRequest = t;
	}

	cdnTrackRequestSuccess(value) {
		if (this.settings.track && value.id == this.trackId) {
			this.command("add track", value);
			this.loadTrackRequest = null;
		}
	}

	svrTrackRequestSuccess(event) {
		if (
			this.settings.track &&
			event.result == 1 &&
			event.data.track.id == this.trackId
		) {
			if (event.result == 1) {
				this.command("add track", event.data.track);
			}
			this.loadTrackRequest = null;
		}
	}

	cdnTrackRequestError() {
		this.svrTrackRequest(this.trackId);
		this.loadTrackRequest = null;
	}

	resize() {
		if (this.game) {
			this.game.setSize();
		}
	}

	stateChange(state) {
		this.emit("stateChange", state);
	}

	// eslint-disable-next-line class-methods-use-this
	loadFile(e) {
		res.loadFile({
			id: e,
			src: e,
		});
	}

	close() {
		this.clearRequests();
		this.pendingCommands = [];
		this.pendingRaceCommands = [];
		this.ready = false;
		this.closeGame();
	}
}

export default GameManager;
