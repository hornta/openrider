import Powerup from "../../powerup";

function Teleport(x, data, obj) {
	this.x = x;
	this.y = data;
	this.id = Math.random().toString(36).slice(2);
	this.init(obj);
}
const getAlignItem = (Math.max, Math.sqrt);
const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 29,
	height: 32,
};
Teleport.prototype = new Powerup();
const self = Teleport.prototype;
self.id = null;
self.otherPortal = null;
self.hit = false;
self.x = 0;
self.y = 0;
self.name = "teleport";
self.recorded = false;
self.erase = function (obj, prop) {
	let instance = false;
	if (!this.remove) {
		const alignContentAlignItem = getAlignItem(
			(obj.x - this.x) ** 2 + (obj.y - this.y) ** 2
		);
		if (prop >= alignContentAlignItem) {
			instance = [this, this.otherPortal];
			this.removeAllReferences();
			this.otherPortal.removeAllReferences();
		}
	}
	return instance;
};
self.addOtherPortalRef = function (array2) {
	this.otherPortal = array2;
};
self.getCode = function () {
	let tHfield = "";
	return (
		this.recorded === false && this.otherPortal.recorded === true
			? (this.recorded = true)
			: this.recorded === false && this.otherPortal.recorded === false
			? ((this.recorded = true),
			  (tHfield = `W ${this.x.toString(32)} ${this.y.toString(
					32
			  )} ${this.otherPortal.x.toString(32)} ${this.otherPortal.y.toString(
					32
			  )}`))
			: this.recorded === true &&
			  this.otherPortal.recorded === true &&
			  ((this.otherPortal.recorded = false),
			  (tHfield = `W ${this.x.toString(32)} ${this.y.toString(
					32
			  )} ${this.otherPortal.x.toString(32)} ${this.otherPortal.y.toString(
					32
			  )}`)),
		tHfield
	);
};
self.setDirty = function (value) {
	options.dirty = value;
};
self.recache = function (value) {
	options.dirty = false;
	this.drawPowerup(value, options);
};
self.drawPowerup = function (scale, e) {
	const canvas = e.canvas;
	canvas.width = e.width * scale;
	canvas.height = e.height * scale;
	const ctx = canvas.getContext("2d");
	const n = (ctx.width / 2, ctx.height / 2, 0.65 * scale);
	ctx.save();
	ctx.scale(n, n);
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(44, 0);
	ctx.lineTo(44, 48);
	ctx.lineTo(0, 48);
	ctx.closePath();
	ctx.clip();
	ctx.translate(0, 0);
	ctx.translate(0, 0);
	ctx.scale(1, 1);
	ctx.translate(0, 0);
	ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.lineCap = "butt";
	ctx.lineJoin = "miter";
	ctx.miterLimit = 4;
	ctx.save();
	ctx.restore();
	ctx.save();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "rgba(0, 0, 0, 0)";
	ctx.strokeStyle = "rgba(0, 0, 0, 0)";
	ctx.lineWidth = 1;
	ctx.translate(-788, -50);
	ctx.save();
	ctx.translate(790, 52);
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(17, 3);
	ctx.bezierCurveTo(
		16.9424049,
		2.83458834,
		16.4420628,
		2.62968665,
		15.9196825,
		2.4515011
	);
	ctx.lineTo(8.51063934, -0.0757469011);
	ctx.lineTo(16.223952, -1.41205186);
	ctx.bezierCurveTo(
		21.2423806,
		-2.2814774,
		25.8773816,
		-1.40451316,
		29.9447883,
		0.583562762
	);
	ctx.bezierCurveTo(
		31.7394578,
		1.46076529,
		33.0361403,
		2.35169307,
		33.7316821,
		2.95217334
	);
	ctx.bezierCurveTo(
		35.1972328,
		4.14751314,
		36.509471,
		5.52829294,
		37.6336956,
		7.05811132
	);
	ctx.bezierCurveTo(
		39.8993675,
		10.1439271,
		41.2801108,
		13.6041318,
		41.7252304,
		17.3208639
	);
	ctx.bezierCurveTo(
		41.7397043,
		17.4414782,
		41.7543021,
		17.5670407,
		41.7704814,
		17.7094344
	);
	ctx.bezierCurveTo(
		41.7921038,
		17.9009058,
		41.7921038,
		17.9009058,
		41.8132645,
		18.0904969
	);
	ctx.lineTo(41.840873, 18.3390683);
	ctx.lineTo(41.8856209, 18.735971);
	ctx.lineTo(41.8856209, 21.4226506);
	ctx.lineTo(41.8542399, 21.5977061);
	ctx.bezierCurveTo(
		41.8009577,
		21.89487,
		41.7866262,
		21.9747988,
		41.7740749,
		22.044061
	);
	ctx.bezierCurveTo(
		41.759051,
		22.1809078,
		41.759051,
		22.1809078,
		41.7559584,
		22.2091488
	);
	ctx.bezierCurveTo(
		41.6872107,
		22.8267498,
		41.6438556,
		23.1562694,
		41.5609313,
		23.6049736
	);
	ctx.bezierCurveTo(
		40.8769441,
		27.3127264,
		39.3221077,
		30.5993535,
		36.9456235,
		33.3462518
	);
	ctx.bezierCurveTo(
		32.8945821,
		38.029004,
		27.65733,
		40.5391341,
		21.868366,
		40.5391341
	);
	ctx.bezierCurveTo(
		21.742671,
		40.5391341,
		21.6184358,
		40.538205,
		21.4955986,
		40.5363608
	);
	ctx.bezierCurveTo(
		22.1492681,
		41.0434881,
		22.8806236,
		41.5794806,
		23.6943816,
		42.1440112
	);
	ctx.lineTo(28.4276887, 45.4276613);
	ctx.lineTo(22.6779106, 45.7834802);
	ctx.bezierCurveTo(
		18.1741264,
		46.062192,
		14.0554746,
		45.155711,
		10.4302114,
		43.4736066
	);
	ctx.bezierCurveTo(
		8.54152696,
		42.5972663,
		7.17424655,
		41.7066293,
		6.38621142,
		41.0629331
	);
	ctx.bezierCurveTo(
		4.99599225,
		40.025971,
		3.38305673,
		38.3146562,
		2.25448469,
		36.778713
	);
	ctx.bezierCurveTo(
		-0.0125398982,
		33.6943248,
		-1.39399999,
		30.2338948,
		-1.84021156,
		26.5118367
	);
	ctx.bezierCurveTo(
		-1.86468983,
		26.3063181,
		-1.88762639,
		26.1042985,
		-1.92006182,
		25.811651
	);
	ctx.lineTo(-1.95463612, 25.5020237);
	ctx.lineTo(-2.00013072, 25.1020716);
	ctx.lineTo(-2.00013072, 22.4141906);
	ctx.lineTo(-1.96885958, 22.2394346);
	ctx.bezierCurveTo(
		-1.92214724,
		21.9784071,
		-1.90657901,
		21.8914122,
		-1.89618079,
		21.8334198
	);
	ctx.bezierCurveTo(
		-1.83478692,
		21.2274076,
		-1.79887919,
		20.9331002,
		-1.72945035,
		20.5323584
	);
	ctx.bezierCurveTo(
		-0.927733904,
		15.885014,
		1.1979378,
		11.9079902,
		4.5664052,
		8.76464131
	);
	ctx.bezierCurveTo(
		8.29993169,
		5.27968493,
		12.7861394,
		3.24768826,
		17.4210789,
		3.06365477
	);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#dd45ec";
	ctx.beginPath();
	ctx.moveTo(23.9052288, 5.91261647);
	ctx.bezierCurveTo(
		23.9052288,
		5.91261647,
		22.5543791,
		5.13614588,
		18.1099346,
		5.04995765
	);
	ctx.bezierCurveTo(
		13.6479739,
		5.05021647,
		9.39411765,
		6.99424,
		5.93111111,
		10.2266871
	);
	ctx.bezierCurveTo(
		2.88431373,
		13.0698635,
		0.969542484,
		16.6517224,
		0.241437908,
		20.8723576
	);
	ctx.bezierCurveTo(
		0.169019608,
		21.2903576,
		0.131372549,
		21.6617694,
		0.101045752,
		21.9601929
	);
	ctx.bezierCurveTo(
		0.0960784314,
		22.0104047,
		0.0911111111,
		22.0611341,
		0.0858823529,
		22.1113459
	);
	ctx.bezierCurveTo(
		0.0837908497,
		22.1227341,
		0.0816993464,
		22.1341224,
		0.0796078431,
		22.1452518
	);
	ctx.lineTo(-0.000130718954, 22.5917224);
	ctx.lineTo(-0.000130718954, 23.0451812);
	ctx.lineTo(-0.000130718954, 24.6993224);
	ctx.lineTo(-0.000130718954, 24.9886871);
	ctx.lineTo(0.0325490196, 25.2759812);
	ctx.lineTo(0.0675816993, 25.5896753);
	ctx.bezierCurveTo(
		0.0929411765,
		25.8184753,
		0.118562092,
		26.0470165,
		0.145751634,
		26.2752988
	);
	ctx.bezierCurveTo(
		0.550457516,
		29.6511341,
		1.80196078,
		32.7860047,
		3.86601307,
		35.59424
	);
	ctx.bezierCurveTo(
		4.76326797,
		36.8153694,
		6.27176471,
		38.4928047,
		7.6179085,
		39.4864282
	);
	ctx.bezierCurveTo(
		7.6179085,
		39.4864282,
		13.4911111,
		44.3481694,
		22.5543791,
		43.7872988
	);
	ctx.bezierCurveTo(
		16.5849673,
		39.6461224,
		15.7624837,
		37.5460282,
		15.7624837,
		37.5460282
	);
	ctx.bezierCurveTo(
		16.4521569,
		37.6208282,
		18.1535948,
		38.5391341,
		21.868366,
		38.5391341
	);
	ctx.bezierCurveTo(
		27.0628758,
		38.5391341,
		31.7535948,
		36.2909929,
		35.4330719,
		32.0377459
	);
	ctx.bezierCurveTo(
		37.5739869,
		29.5631341,
		38.9739869,
		26.6037459,
		39.5941176,
		23.2421459
	);
	ctx.bezierCurveTo(
		39.6816993,
		22.76824,
		39.7295425,
		22.3354871,
		39.7682353,
		21.9878871
	);
	ctx.bezierCurveTo(
		39.7768627,
		21.9092047,
		39.7852288,
		21.8300047,
		39.7946405,
		21.7510635
	);
	ctx.bezierCurveTo(
		39.7983007,
		21.7319106,
		39.8019608,
		21.7124988,
		39.8053595,
		21.6930871
	);
	ctx.lineTo(39.8856209, 21.2448047);
	ctx.lineTo(39.8856209, 20.7895341);
	ctx.lineTo(39.8856209, 19.1356518);
	ctx.lineTo(39.8856209, 18.8483576);
	ctx.lineTo(39.8534641, 18.5631341);
	ctx.lineTo(39.8254902, 18.3112988);
	ctx.bezierCurveTo(
		39.7975163,
		18.0607576,
		39.7695425,
		17.8096988,
		39.7394771,
		17.5591576
	);
	ctx.bezierCurveTo(
		39.3355556,
		14.1864282,
		38.0845752,
		11.0515576,
		36.0215686,
		8.24176941
	);
	ctx.bezierCurveTo(
		34.9975163,
		6.84826353,
		33.8019608,
		5.59038118,
		32.4675817,
		4.50202824
	);
	ctx.bezierCurveTo(
		32.4675817,
		4.50202824,
		25.996732,
		-1.07536,
		16.5653595,
		0.558592941
	);
	ctx.bezierCurveTo(
		21.6393464,
		2.28934588,
		23.9052288,
		5.91261647,
		23.9052288,
		5.91261647
	);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#fefefe";
	ctx.beginPath();
	ctx.moveTo(5.22875817, 24.6992965);
	ctx.lineTo(5.22875817, 23.0451553);
	ctx.bezierCurveTo(
		5.24078431,
		22.97812,
		5.25647059,
		22.9113435,
		5.26457516,
		22.8437906
	);
	ctx.bezierCurveTo(
		5.30823529,
		22.4770376,
		5.33254902,
		22.1071788,
		5.39555556,
		21.7440494
	);
	ctx.bezierCurveTo(
		5.9179085,
		18.7173671,
		7.26117647,
		16.0988494,
		9.5179085,
		13.9930612
	);
	ctx.bezierCurveTo(
		12.7882353,
		10.9404965,
		16.6520261,
		9.83428471,
		21.0614379,
		10.8020259
	);
	ctx.bezierCurveTo(
		23.1579085,
		11.2619553,
		24.9563399,
		12.2887082,
		26.3997386,
		13.8804729
	);
	ctx.bezierCurveTo(
		27.8005229,
		15.4251318,
		28.5681046,
		17.2482847,
		28.8130719,
		19.3033435
	);
	ctx.bezierCurveTo(
		29.0044444,
		20.9103788,
		28.7861438,
		22.4467553,
		28.0836601,
		23.9122141
	);
	ctx.bezierCurveTo(
		26.5186928,
		27.1764965,
		23.3458824,
		28.74652,
		19.8862745,
		27.9666847
	);
	ctx.bezierCurveTo(
		17.6018301,
		27.4518847,
		16.0658824,
		25.7762612,
		15.7793464,
		23.4833435
	);
	ctx.bezierCurveTo(
		15.7513725,
		23.2566141,
		15.7422222,
		23.0278141,
		15.7233987,
		22.7920259
	);
	ctx.bezierCurveTo(
		15.6826144,
		22.7959082,
		15.6577778,
		22.7959082,
		15.6345098,
		22.8013435
	);
	ctx.bezierCurveTo(
		15.2580392,
		22.8929671,
		15.0844444,
		23.1867318,
		14.9532026,
		23.5037906
	);
	ctx.bezierCurveTo(
		14.6407843,
		24.2592965,
		14.6128105,
		25.0383553,
		14.8180392,
		25.8238847
	);
	ctx.bezierCurveTo(
		15.1252288,
		26.9999788,
		15.8075817,
		27.9480494,
		16.7301961,
		28.7162376
	);
	ctx.bezierCurveTo(
		19.105098,
		30.6939082,
		21.8201307,
		31.2356259,
		24.7777778,
		30.3869435
	);
	ctx.bezierCurveTo(
		27.9027451,
		29.4903788,
		30.1628758,
		27.5002847,
		31.6556863,
		24.6703082
	);
	ctx.bezierCurveTo(
		33.1751634,
		21.7893435,
		33.4169935,
		18.73652,
		32.7003922,
		15.5969906
	);
	ctx.bezierCurveTo(
		32.1134641,
		13.0263553,
		30.9056209,
		10.7471553,
		29.2807843,
		8.67397882
	);
	ctx.bezierCurveTo(
		29.2345098,
		8.61496706,
		29.1887582,
		8.55595529,
		29.1427451,
		8.49694353
	);
	ctx.bezierCurveTo(
		30.1487582,
		9.31767294,
		31.0295425,
		10.2476259,
		31.7918954,
		11.2855082
	);
	ctx.bezierCurveTo(
		33.305098,
		13.3460024,
		34.2433987,
		15.6329671,
		34.5471895,
		18.1681435
	);
	ctx.bezierCurveTo(
		34.5856209,
		18.4903788,
		34.6206536,
		18.8131318,
		34.6569935,
		19.1356259
	);
	ctx.lineTo(34.6569935, 20.7897671);
	ctx.bezierCurveTo(
		34.6449673,
		20.8565435,
		34.629281,
		20.92332,
		34.620915,
		20.9908729
	);
	ctx.bezierCurveTo(
		34.5644444,
		21.4313906,
		34.5309804,
		21.8763082,
		34.4501961,
		22.3121671
	);
	ctx.bezierCurveTo(
		34.0122876,
		24.6873906,
		33.0475817,
		26.8374376,
		31.4616993,
		28.6706847
	);
	ctx.bezierCurveTo(
		28.1134641,
		32.5408729,
		23.9121569,
		34.11012,
		18.8256209,
		33.0287553
	);
	ctx.bezierCurveTo(
		16.5994771,
		32.5553671,
		14.72,
		31.4287082,
		13.2504575,
		29.68372
	);
	ctx.bezierCurveTo(
		11.9879739,
		28.1846141,
		11.2983007,
		26.4463553,
		11.0705882,
		24.5126847
	);
	ctx.bezierCurveTo(
		10.871634,
		22.8236024,
		11.1286275,
		21.2212259,
		11.9113725,
		19.7042612
	);
	ctx.bezierCurveTo(
		13.5228758,
		16.5810376,
		16.6386928,
		15.0982376,
		19.9803922,
		15.8646141
	);
	ctx.bezierCurveTo(
		22.303268,
		16.3975318,
		23.7997386,
		18.0288965,
		24.1079739,
		20.3696965
	);
	ctx.bezierCurveTo(
		24.136732,
		20.5899553,
		24.1440523,
		20.8128024,
		24.1662745,
		21.1008729
	);
	ctx.bezierCurveTo(
		24.343268,
		20.9921671,
		24.5147712,
		20.9334141,
		24.6146405,
		20.8153906
	);
	ctx.bezierCurveTo(
		24.7620915,
		20.6414612,
		24.8909804,
		20.4375082,
		24.970719,
		20.2255318
	);
	ctx.bezierCurveTo(
		25.28,
		19.4032494,
		25.2648366,
		18.5688024,
		24.9890196,
		17.7405671
	);
	ctx.bezierCurveTo(
		24.5738562,
		16.4935553,
		23.7654902,
		15.5263318,
		22.715817,
		14.7615082
	);
	ctx.bezierCurveTo(
		20.315817,
		13.0147082,
		17.6664052,
		12.6334612,
		14.8541176,
		13.5207082
	);
	ctx.bezierCurveTo(
		11.8538562,
		14.4672259,
		9.67267974,
		16.4187553,
		8.23006536,
		19.1622847
	);
	ctx.bezierCurveTo(
		6.68470588,
		22.1014847,
		6.45960784,
		25.2078847,
		7.22352941,
		28.3996965
	);
	ctx.bezierCurveTo(
		7.82248366,
		30.8996729,
		9.0096732,
		33.1206376,
		10.5921569,
		35.1438612
	);
	ctx.bezierCurveTo(
		10.6420915,
		35.2083082,
		10.692549,
		35.2724965,
		10.743268,
		35.3364259
	);
	ctx.bezierCurveTo(
		9.97568627,
		34.7698612,
		8.83764706,
		33.5606376,
		8.09385621,
		32.5486376
	);
	ctx.bezierCurveTo(
		6.57986928,
		30.4886612,
		5.6420915,
		28.2016965,
		5.33830065,
		25.66652
	);
	ctx.bezierCurveTo(
		5.29960784,
		25.3442847,
		5.26535948,
		25.0215318,
		5.22875817,
		24.6992965
	);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
};
self.draw = function (option, size, r, result) {
	if (options.dirty) {
		this.recache(r);
	}
	const w = options.width * r;
	const d = options.height * r;
	const halfWidth = w / 2;
	const h = d / 2;
	const value = option;
	const height = size;
	result.globalAlpha = this.hit === false ? 1 : 0.2;
	result.translate(value, height);
	result.drawImage(options.canvas, -halfWidth, -h, w, d);
	result.translate(-value, -height);
};
self.collide = function (other) {
	const ctx = other.parent;
	const player = ctx.player;
	const nodesOnScreen = player._powerupsConsumed.misc;
	if (!nodesOnScreen.includes(this.id)) {
		const dx = other.pos.x - this.x;
		const dy = other.pos.y - this.y;
		const a = dx ** 2 + dy ** 2;
		if (a < 1000 && player.isAlive()) {
			nodesOnScreen.push(this.id);
			nodesOnScreen.push(this.otherPortal.id);
			ctx.moveVehicle(this.otherPortal.x - this.x, this.otherPortal.y - this.y);
			if (player.isGhost() === false) {
				this.hit = true;
				this.otherPortal.hit = true;
				this.sector.powerupCanvasDrawn = false;
				this.otherPortal.sector.powerupCanvasDrawn = false;
				this.scene.sound.play("teleport_sound", 0.3);
				this.scene.message.show("Teleport Engaged", 50, "#8ac832");
			}
		}
	}
};
export default Teleport;
