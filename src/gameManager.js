import $ from "jquery";
import EventEmitter from "./eventEmitter";
import Game from "./game";
import GameManifest from "./GameManifest";

let loader = false;
let res = false;
const GameManager = function () {
	this.pendingRaceCommands = [];
	this.pendingCommands = [];
	this.pendingAssetCount = 0;
	loader = new createjs.LoadQueue(false, "", "Anonymous");
	loader.setMaxConnections(10);
	loader.maintainScriptOrder = true;
	loader.installPlugin(createjs.Sound);
	loader.loadManifest(GameManifest);
	loader.addEventListener("fileload", this.handleFileLoad.bind(this));
	loader.addEventListener("progress", this.handleProgress.bind(this));
	loader.addEventListener("complete", this.handleComplete.bind(this));
	res = new createjs.LoadQueue(false, "", "Anonymous");
};
GameManager.prototype = new EventEmitter();
const self = GameManager.prototype;
self.state = null;
self.pendingAssetCount = 0;
self.loadRaceRequest = null;
self.loadTrackRequest = null;
self.baseAssetsLoaded = false;
self.settings = null;
self.game = null;
self.scene = null;
self.trackId = null;
self.trackEvent = function (name, val, type, value) {};
self.state = {
	preloading: true,
	loadingPercent: 0,
	loadingText: "Scripts",
};
self.clearRequests = function () {
	if (this.loadTrackRequest) {
		this.loadTrackRequest.abort();
	}
	if (this.loadRaceRequest) {
		this.loadRaceRequest.abort();
	}
	this.loadTrackRequest = null;
	this.loadRaceRequest = null;
};
self.init = function (value, key) {
	this.pendingCommands = [];
	this.clearRequests();
	this.settings = key;
	this.scene = value;
	this.ready = true;
	this.checkLoadingProgress();
};
self.checkLoadingProgress = function () {
	if (this.baseAssetsLoaded) {
		this.loadGame();
	}
};
self.handleComplete = function () {
	if (this.ready) {
		this.loadGame();
	}
	this.baseAssetsLoaded = true;
};
self.handleProgress = function (event) {
	const namespacePrefixEq = ((event.loaded / event.total) * 100) | 0;
	const { state } = this;
	state.loadingPercent = namespacePrefixEq;
	state.preloading = true;
	this.stateChange(state);
};
self.showLoading = function (tag) {
	let t = this.pendingAssetCount;
	if (t <= 0) {
		t = 0.5;
	}
	let r = ((0.5 / t) * 100) | 0;
	r = Math.min(r, 100);
	const { state } = this;
	state.loadingPercent = r;
	state.preloading = true;
	state.loadingText = tag;
	this.stateChange(state);
};
self.handleFileLoad = function (evt) {
	const el = evt.item;
	const { state } = this;
	state.loadingText = el.name ? el.name : "Assets";
	this.stateChange(state);
};
self.loadRacesFromSettings = function () {
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
};
self.loadTrackFromSettings = function () {
	const options = this.settings;
	const query = options.track;
	const { id } = query;
	const path = query.cdn;
	this.loadTrack(id, path);
};
self.loadGame = function () {
	this.game = new Game(this.scene, loader, this.settings);
	this.game.onStateChange = this.stateChange.bind(this);
	this.executePendingCommands();
	this.executePendingRaceCommands();
	if (this.scene === "Main") {
		this.loadTrackFromSettings();
		this.loadRacesFromSettings();
	}
};
self.loadRace = function (formatters, initialValue, context) {
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
};
self.loadRaceCompleteWithDialog = function (e) {
	if (e.result) {
		this.command("add race", e.data, true);
	}
	this.loadRaceRequest = null;
};
self.loadRaceComplete = function (e) {
	if (e.result) {
		this.command("add race", e.data, false);
	}
	this.loadRaceRequest = null;
};
self.closeGame = function () {
	if (this.game) {
		this.game.close();
		this.game = null;
	}
};
self.executePendingCommands = function () {
	const commands = this.pendingCommands;
	const { length } = commands;
	let i = 0;
	for (; length > i; i++) {
		const value = commands[i];
		this.command(...value);
	}
	this.pendingCommands = [];
};
self.executePendingRaceCommands = function () {
	const commands = this.pendingRaceCommands;
	const { length } = commands;
	let i = 0;
	for (; length > i; i++) {
		const value = commands[i];
		this.command(...value);
	}
	this.pendingRaceCommands = [];
};
self.command = function (respectCounter) {
	if (this.game) {
		this.game.command(...arguments);
	} else if (respectCounter == "add race") {
		this.pendingRaceCommands.push(arguments);
	} else {
		this.pendingCommands.push(arguments);
	}
};
self.loadTrack = function (trackId, callback) {
	this.pendingAssetCount++;
	this.showLoading("Loading Track...");
	this.trackId = trackId;
	if (callback) {
		this.cdnTrackRequest(callback);
	} else {
		this.svrTrackRequest(trackId);
	}
};
self.cdnTrackRequest = function (object) {
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
};
self.svrTrackRequest = function (trackId) {
	const data = {
		id: trackId,
		fields: ["id", "code", "vehicle", "vehicles"],
	};
	const s = `/track_api/load_track?${decodeURIComponent($.param(data))}`;
	// eslint-disable-next-line no-undef
	const t = Application.Helpers.AjaxHelper.get(s);
	t.done(this.svrTrackRequestSuccess.bind(this));
	t.fail(this.svrTrackRequestError.bind(this));
	this.loadTrackRequest = t;
};
self.cdnTrackRequestSuccess = function (value) {
	if (this.settings.track && value.id == this.trackId) {
		if (this.settings.isCampaign) {
			this.trackEvent(
				"campaign-track",
				"track-loaded-success",
				this.settings.track.id
			);
		} else {
			this.trackEvent("track", "track-loaded-success", this.settings.track.id);
		}
		this.command("add track", value);
		this.loadTrackRequest = null;
	}
};
self.svrTrackRequestSuccess = function (event) {
	if (
		this.settings.track &&
		event.result == 1 &&
		event.data.track.id == this.trackId
	) {
		if (this.settings.isCampaign) {
			this.trackEvent(
				"campaign-track",
				"track-loaded-success",
				this.settings.track.id
			);
		} else {
			this.trackEvent("track", "track-loaded-success", this.settings.track.id);
		}
		if (event.result == 1) {
			this.command("add track", event.data.track);
		}
		this.loadTrackRequest = null;
	}
};
self.cdnTrackRequestError = function (lstnrs, eventName) {
	if (this.settings.isCampaign) {
		this.trackEvent(
			"campaign-track",
			"track-loaded-fail-cdn",
			`${this.settings.track.id}-${eventName}`
		);
	} else {
		this.trackEvent(
			"track",
			"track-loaded-fail-cdn",
			`${this.settings.track.id}-${eventName}`
		);
	}
	this.svrTrackRequest(this.trackId);
	this.loadTrackRequest = null;
};
self.svrTrackRequestError = function (lstnrs, eventName) {
	if (this.settings.isCampaign) {
		this.trackEvent(
			"campaign-track",
			"track-loaded-fail-svr",
			`${this.settings.track.id}-${eventName}`
		);
	} else {
		this.trackEvent(
			"track",
			"track-loaded-fail-svr",
			`${this.settings.track.id}-${eventName}`
		);
	}
};
self.resize = function () {
	if (this.game) {
		this.game.setSize();
	}
};
self.stateChange = function (state) {
	this.emit("stateChange", state);
};
self.loadFile = function (e) {
	res.loadFile({
		id: e,
		src: e,
	});
};
self.close = function () {
	this.clearRequests();
	this.pendingCommands = [];
	this.pendingRaceCommands = [];
	this.ready = false;
	this.closeGame();
};

const gameManager = new GameManager();
export default gameManager;
