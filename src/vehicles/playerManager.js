import Player from "../player";

const PlayerManager = function (data) {
	this.scene = data;
	this.game = data.game;
	this.settings = data.settings;
	this.firstPlayer = null;
	this._players = [];
	this._playerLookup = {};
};
PlayerManager.prototype.update = function () {
	const chYxis = this._players;
	const len = chYxis.length;
	let i = 0;
	for (; len > i; i++) {
		chYxis[i].update();
	}
};
PlayerManager.prototype.mutePlayers = function () {
	const onCompleteBindings = this._players;
	const len = onCompleteBindings.length;
	let i = 0;
	for (; len > i; i++) {
		const s = onCompleteBindings[i].getActiveVehicle();
		s.stopSounds();
	}
};
PlayerManager.prototype.updateGamepads = function () {
	const onCompleteBindings = this._players;
	const len = onCompleteBindings.length;
	let i = 0;
	for (; len > i; i++) {
		onCompleteBindings[i]._gamepad.update();
	}
};
PlayerManager.prototype.createPlayer = function (callback, options) {
	return new Player(this.scene, options);
};
PlayerManager.prototype.addPlayer = function (p) {
	this._players.push(p);
	this._playerLookup[p.id] = p;
};
PlayerManager.prototype.checkKeys = function () {
	const onCompleteBindings = this._players;
	const len = onCompleteBindings.length;
	let i = 0;
	for (; len > i; i++) {
		onCompleteBindings[i].checkKeys();
	}
};
PlayerManager.prototype.draw = function () {
	const s = this._players;
	const i = s.length;
	let l = 0;
	for (; i > l; l++) {
		s[l].draw();
	}
};
PlayerManager.prototype.getPlayerByIndex = function (newOwner) {
	return this._players[newOwner];
};
PlayerManager.prototype.getPlayerById = function (playerId) {
	return this._playerLookup[playerId];
};
PlayerManager.prototype.getPlayerCount = function () {
	return this._players.length;
};
PlayerManager.prototype.reset = function () {
	const forms = this._players;
	const len = forms.length;
	let i = 0;
	for (; len > i; i++) {
		forms[i].reset();
	}
};
PlayerManager.prototype.clear = function () {
	this._players = [];
	this._playerLookup = {};
	this._players.push(this.firstPlayer);
	this._playerLookup[this.firstPlayer.id] = this.firstPlayer;
};
PlayerManager.prototype._closePlayers = function () {
	const conns = this._players;
	const l = conns.length;
	let i = 0;
	for (; l > i; i++) {
		conns[i].close();
	}
};
PlayerManager.prototype.close = function () {
	this._closePlayers();
	this._players = null;
	this.firstPlayer = null;
	this._playerLookup = null;
	this.scene = null;
	this.game = null;
	this.settings = null;
};

export default PlayerManager;
