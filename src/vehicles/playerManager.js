import Player from "../player";

const PlayerManager = function (data) {
	this.scene = data;
	this.game = data.game;
	this.settings = data.settings;
	this.firstPlayer = null;
	this.players = [];
	this.playerLookup = {};
};
PlayerManager.prototype.update = function () {
	const chYxis = this.players;
	const len = chYxis.length;
	let i = 0;
	for (; len > i; i++) {
		chYxis[i].update();
	}
};
PlayerManager.prototype.mutePlayers = function () {
	for (const player of this.players) {
		player.getActiveVehicle().stopSounds();
	}
};
PlayerManager.prototype.updateGamepads = function () {
	for (const player of this.players) {
		player.gamepad.update();
	}
};
PlayerManager.prototype.createPlayer = function (callback, options) {
	return new Player(this.scene, options);
};
PlayerManager.prototype.addPlayer = function (p) {
	this.players.push(p);
	this.playerLookup[p.id] = p;
};
PlayerManager.prototype.checkKeys = function () {
	for (const player of this.players) {
		player.checkKeys();
	}
};
PlayerManager.prototype.draw = function () {
	const s = this.players;
	const i = s.length;
	let l = 0;
	for (; i > l; l++) {
		s[l].draw();
	}
};
PlayerManager.prototype.getPlayerByIndex = function (newOwner) {
	return this.players[newOwner];
};
PlayerManager.prototype.getPlayerById = function (playerId) {
	return this.playerLookup[playerId];
};
PlayerManager.prototype.getPlayerCount = function () {
	return this.players.length;
};
PlayerManager.prototype.reset = function () {
	const forms = this.players;
	const len = forms.length;
	let i = 0;
	for (; len > i; i++) {
		forms[i].reset();
	}
};
PlayerManager.prototype.clear = function () {
	this.players = [];
	this.playerLookup = {};
	this.players.push(this.firstPlayer);
	this.playerLookup[this.firstPlayer.id] = this.firstPlayer;
};
PlayerManager.prototype._closePlayers = function () {
	const conns = this.players;
	const l = conns.length;
	let i = 0;
	for (; l > i; i++) {
		conns[i].close();
	}
};
PlayerManager.prototype.close = function () {
	this._closePlayers();
	this.players = null;
	this.firstPlayer = null;
	this.playerLookup = null;
	this.scene = null;
	this.game = null;
	this.settings = null;
};

export default PlayerManager;
