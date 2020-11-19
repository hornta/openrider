!(function e(t, n, r) {
	function s(o, s) {
		if (!n[o]) {
			if (!t[o]) {
				const i = typeof require == "function" && require;
				if (!s && i) {
					return i(o, true);
				}
				if (a) {
					return a(o, true);
				}
				/** @type {!Error} */
				const f = new Error(`Cannot find module '${o}'`);
				throw ((f.code = "MODULE_NOT_FOUND"), f);
			}
			const u = (n[o] = {
				exports: {},
			});
			t[o][0].call(
				u.exports,
				function (e) {
					const n = t[o][1][e];
					return s(n ? n : e);
				},
				u,
				u.exports,
				e,
				t,
				n,
				r
			);
		}
		return n[o].exports;
	}
	var a = typeof require == "function" && require;
	/** @type {number} */
	let o = 0;
	for (; o < r.length; o++) {
		s(r[o]);
	}
	return s;
})(
	{
		1: [
			function (require, Module) {
				const React = (GameSettings, require("react"));
				React.initializeTouchEvents(true);
				const RedBox = require("./components/loading/loading");
				const SettingsIcon = require("./components/leftmenu/leftmenu");
				const Input = require("./components/rightmenu/rightmenu");
				const ExpandIcon = require("./components/topmenu/topmenu");
				const Details = require("./components/bottommenu/bottommenu");
				const Button = require("./components/dialogs/dialogs");
				const template =
					(require("./components/focusoverlay/focusoverlay"),
					require("./components/chromeapp/header"));
				const html = React.createClass({
					displayName: "EditorGui",
					render() {
						/** @type {string} */
						let th_field = "";
						return (th_field = this.state.preloading
							? React.createElement(RedBox, {
									percent: this.state.loadingPercent,
									itemName: this.state.loadingItem,
							  })
							: React.createElement(
									"div",
									{
										className: "editorGui",
									},
									this.showHeader(),
									React.createElement(ExpandIcon, {
										data: this.state,
									}),
									React.createElement(SettingsIcon, {
										data: this.state,
									}),
									React.createElement(Input, {
										data: this.state,
									}),
									React.createElement(Details, {
										data: this.state,
									}),
									React.createElement(Button, {
										data: this.state,
									}),
									this.showFocusOverlay()
							  ));
					},
					showHeader() {
						/** @type {boolean} */
						let individualMD5 = false;
						return (
							GameSettings.isStandalone &&
								(individualMD5 = React.createElement(template, null)),
							individualMD5
						);
					},
					showFocusOverlay() {
						/** @type {boolean} */
						const e = false;
						return e;
					},
					getInitialState() {
						return {
							preloading: true,
							loadingPercent: 0,
							loadingText: "Loading game, please wait...",
							inFocus: true,
						};
					},
					componentDidMount() {
						this.bindToGame();
					},
					componentWillUnmount() {
						GameManager.removeListener(
							"stateChange",
							this.handleGameStateChange
						);
					},
					handleGameStateChange(toolState) {
						this.setState(toolState);
					},
					componentWillUpdate() {},
					bindToGame() {
						GameManager.on("stateChange", this.handleGameStateChange);
					},
				});
				window.React = React;
				window.EditorGui = React.createElement(html, null);
				Module.exports = html;
			},
			{
				"./components/bottommenu/bottommenu": 2,
				"./components/chromeapp/header": 14,
				"./components/dialogs/dialogs": 20,
				"./components/focusoverlay/focusoverlay": 26,
				"./components/leftmenu/leftmenu": 27,
				"./components/loading/loading": 28,
				"./components/rightmenu/rightmenu": 33,
				"./components/topmenu/topmenu": 69,
				react: "react",
			},
		],
		2: [
			function (require, module) {
				const React = require("react");
				const Input = require("./vehicle");
				const SettingsIcon = require("./grid");
				const ExpandIcon = require("./cameralock");
				const TableHead = require("./brushbottomtooloptions");
				const SelectBoxItem = require("./eraserbottomtooloptions");
				const PopoverItem = require("./camerabottomtooloptions");
				const HiddenSelectField = require("./straightlinebottomtooloptions");
				const button = require("./curvedlinebottomtooloptions");
				const ColorWrapper = require("./powerupbottomtooloptions");
				const RedBox = require("../chromeapp/bottommenu");
				const SelectivityReact = require("./vehiclepowerupbottomtooloptions");
				const storeMixin = React.createClass({
					displayName: "BottomMenu",
					render() {
						const eventName = this.props.data.tool;
						const usedOptions = this.props.data.toolOptions;
						/** @type {string} */
						let favourite = "";
						switch (eventName) {
							case "straightline":
								favourite = React.createElement(HiddenSelectField, {
									options: usedOptions,
								});
								break;
							case "curve":
								favourite = React.createElement(button, {
									options: usedOptions,
								});
								break;
							case "brush":
								favourite = React.createElement(TableHead, {
									options: usedOptions,
								});
								break;
							case "eraser":
								favourite = React.createElement(SelectBoxItem, {
									options: usedOptions,
								});
								break;
							case "powerup":
								favourite = React.createElement(ColorWrapper, {
									options: usedOptions,
								});
								break;
							case "vehiclepowerup":
								favourite = React.createElement(SelectivityReact, {
									options: usedOptions,
								});
								break;
							case "select":
								break;
							case "camera":
								favourite = React.createElement(PopoverItem, {
									options: usedOptions,
								});
						}
						/** @type {boolean} */
						let reactDays = false;
						return (
							GameSettings.isStandalone &&
								(reactDays = React.createElement(RedBox, null)),
							React.createElement(
								"div",
								{
									className: "bottomMenu unselectable",
								},
								React.createElement(
									"div",
									{
										className: "clearfix",
									},
									favourite,
									React.createElement(ExpandIcon, {
										active: this.props.data.cameraLocked,
									}),
									React.createElement(SettingsIcon, {
										active: this.props.data.grid,
									}),
									React.createElement(Input, {
										vehicle: this.props.data.vehicle,
									}),
									React.createElement("span", {
										className: "divider",
									})
								),
								reactDays
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../chromeapp/bottommenu": 13,
				"./brushbottomtooloptions": 3,
				"./camerabottomtooloptions": 4,
				"./cameralock": 5,
				"./curvedlinebottomtooloptions": 6,
				"./eraserbottomtooloptions": 7,
				"./grid": 8,
				"./powerupbottomtooloptions": 9,
				"./straightlinebottomtooloptions": 10,
				"./vehicle": 11,
				"./vehiclepowerupbottomtooloptions": 12,
				react: "react",
			},
		],
		3: [
			function (require, module) {
				const React = require("react");
				const ExpandIcon = require("react-slider");
				const storeMixin = React.createClass({
					displayName: "BrushBottomToolOptions",
					adjustTrailSpeed(s) {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool option", "trailSpeed", s);
						}
					},
					adjustBreakLength(s) {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool option", "breakLength", s);
						}
					},
					render() {
						const opt = this.props.options;
						/** @type {number} */
						let i = 0;
						/** @type {number} */
						let row = 0;
						/** @type {number} */
						let lruSize = 100;
						/** @type {number} */
						let step = 1;
						/** @type {number} */
						let baseURL = 0;
						/** @type {number} */
						let date = 0;
						/** @type {number} */
						let p = 100;
						/** @type {number} */
						let name = 1;
						/** @type {number} */
						const CMIIteractionsChildren = 0;
						return (
							opt &&
								((i = opt.trailSpeed),
								(row = opt.minTrailSpeed),
								(lruSize = opt.maxTrailSpeed),
								(step = opt.trailSpeedSensitivity),
								(baseURL = opt.breakLength),
								(date = opt.minBreakLength),
								(p = opt.maxBreakLength),
								(name = opt.breakLengthSensitivity)),
							React.createElement(
								"div",
								{
									className: "bottomToolOptions bottomToolOptions_brush",
								},
								React.createElement(
									"div",
									{
										className: "bottomToolOptions-toolTitle",
									},
									React.createElement("span", {
										className: "editorgui_icons editorgui_icons-icon_brush",
									}),
									React.createElement(
										"span",
										{
											className: "toolName",
										},
										"BRUSH : ",
										React.createElement(
											"span",
											{
												className: "bottomMenu-bold",
											},
											opt.lineType
										)
									)
								),
								React.createElement(
									"div",
									{
										className: "horizontal-slider-container",
									},
									React.createElement(
										"span",
										{
											className: "horizontal-slider-label",
										},
										"Brush Length"
									),
									React.createElement(ExpandIcon, {
										withBars: true,
										className: "horizontal-slider brush-slider_breaklength",
										onChanged: this.adjustBreakLength,
										defaultValue: CMIIteractionsChildren,
										max: p,
										min: date,
										step: name,
										value: baseURL,
									})
								),
								React.createElement(
									"div",
									{
										className: "horizontal-slider-container",
									},
									React.createElement(
										"span",
										{
											className: "horizontal-slider-label",
										},
										"Trail Speed"
									),
									React.createElement(ExpandIcon, {
										withBars: true,
										className: "horizontal-slider brush-slider_trailspeed",
										onChanged: this.adjustTrailSpeed,
										defaultValue: CMIIteractionsChildren,
										max: lruSize,
										min: row,
										step,
										value: i,
									})
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
				"react-slider": 74,
			},
		],
		4: [
			function (require, module) {
				const React = require("react");
				const storeMixin =
					(require("react-slider"),
					React.createClass({
						displayName: "CameraBottomToolOptions",
						changeZoom() {},
						render() {
							return React.createElement(
								"div",
								{
									className: "bottomToolOptions bottomToolOptions_camera",
								},
								React.createElement(
									"div",
									{
										className: "bottomToolOptions-toolTitle",
									},
									React.createElement("span", {
										className: "editorgui_icons editorgui_icons-icon_camera",
									}),
									React.createElement(
										"span",
										{
											className: "toolName",
										},
										"Camera"
									)
								)
							);
						},
					}));
				module.exports = storeMixin;
			},
			{
				react: "react",
				"react-slider": 74,
			},
		],
		5: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "CameraLock",
					setCameraLock() {
						if (typeof GameManager != "undefined") {
							GameManager.command("lock camera");
						}
					},
					render() {
						/** @type {string} */
						const valueClassName =
							"bottomMenu-button bottomMenu-button-right bottomMenu-button_cameralock";
						/** @type {string} */
						let langClass =
							"editorgui_icons editorgui_icons-icon_camera_lock_off icon";
						if (this.props.active) {
							/** @type {string} */
							langClass =
								"editorgui_icons editorgui_icons-icon_camera_lock_on icon";
						}
						/** @type {string} */
						const activeSnapElement = this.props.active ? "on" : "off";
						return React.createElement(
							"div",
							{
								className: valueClassName,
								onClick: this.setCameraLock,
							},
							React.createElement("span", {
								className: langClass,
							}),
							React.createElement(
								"span",
								{
									className: "name",
								},
								"Camera Lock : ",
								activeSnapElement
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		6: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "CurvedLineBottomToolOptions",
					render() {
						const { options } = this.props;
						return React.createElement(
							"div",
							{
								className: "bottomToolOptions bottomToolOptions_curvedline",
							},
							React.createElement(
								"div",
								{
									className: "bottomToolOptions-toolTitle",
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_curve",
								}),
								React.createElement(
									"span",
									{
										className: "toolName",
									},
									"Curved Line : ",
									React.createElement(
										"span",
										{
											className: "bottomMenu-bold",
										},
										options.lineType
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		7: [
			function (require, module) {
				const React = require("react");
				const ExpandIcon = require("react-slider");
				const storeMixin = React.createClass({
					displayName: "EraserBottomToolOptions",
					adjustEraserSize(s) {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool option", "radius", s);
						}
					},
					render() {
						const opt = this.props.options;
						/** @type {number} */
						let R = 0;
						/** @type {number} */
						let p = 100;
						/** @type {number} */
						let date = 0;
						/** @type {number} */
						let step = 1;
						/** @type {number} */
						const CMIIteractionsChildren = 0;
						return (
							opt &&
								((R = opt.radius),
								(p = opt.maxRadius),
								(date = opt.minRadius),
								(step = opt.radiusSizeSensitivity)),
							React.createElement(
								"div",
								{
									className: "bottomToolOptions bottomToolOptions_eraser",
								},
								React.createElement(
									"div",
									{
										className: "bottomToolOptions-toolTitle",
									},
									React.createElement("span", {
										className: "editorgui_icons editorgui_icons-icon_eraser",
									}),
									React.createElement(
										"span",
										{
											className: "toolName",
										},
										"ERASER"
									)
								),
								React.createElement(
									"div",
									{
										className: "horizontal-slider-container",
									},
									React.createElement(
										"span",
										{
											className: "horizontal-slider-label",
										},
										"Radius"
									),
									React.createElement(ExpandIcon, {
										withBars: true,
										className: "horizontal-slider eraser-slider_radius",
										onChange: this.adjustEraserSize,
										defaultValue: CMIIteractionsChildren,
										max: p,
										min: date,
										step,
										value: R,
									})
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
				"react-slider": 74,
			},
		],
		8: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Grid",
					setGrid(data) {
						console.log(data);
						if (typeof GameManager != "undefined") {
							GameManager.command("grid");
						}
					},
					changeGridSize(event) {
						const gridSize = event.target.value;
						return (
							(GameSettings.toolHandler.gridSize = gridSize),
							GameManager.command("redraw"),
							event.preventDefault(),
							event.stopPropagation(),
							false
						);
					},
					stopClickPropagation(event) {
						return event.preventDefault(), event.stopPropagation(), false;
					},
					renderGridSizeSelect() {
						const tileSize = GameSettings.toolHandler.gridSize;
						/** @type {!Array} */
						const navLinksArr = [2, 5, 10, 15, 20, 25, 50, 100];
						return React.createElement(
							"select",
							{
								ref: "gridSize",
								defaultValue: tileSize,
								onChange: this.changeGridSize,
								onClick: this.stopClickPropagation,
							},
							navLinksArr.map(function (cellText) {
								return React.createElement(
									"option",
									{
										value: cellText,
									},
									cellText
								);
							})
						);
					},
					render() {
						/** @type {string} */
						let valueClassName =
							"bottomMenu-button bottomMenu-button-right bottomMenu-button_grid ";
						/** @type {string} */
						let langClass = "editorgui_icons editorgui_icons-icon_grid_off";
						const val = this.props.active;
						if (val) {
							/** @type {string} */
							valueClassName += " bottomMenu-button-active";
							/** @type {string} */
							langClass = "editorgui_icons editorgui_icons-icon_grid_on";
						}
						/** @type {string} */
						const date = val ? "" : "off";
						return React.createElement(
							"div",
							{
								className: valueClassName,
								onClick: this.setGrid,
							},
							React.createElement("span", {
								className: langClass,
							}),
							React.createElement(
								"span",
								{
									className: "name",
								},
								"Grid : ",
								date
							),
							val ? this.renderGridSizeSelect() : false
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		9: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "PowerupBottomToolOptions",
					render() {
						const opt = this.props.options;
						return React.createElement(
							"div",
							{
								className: "bottomToolOptions bottomToolOptions_powerup",
							},
							React.createElement(
								"div",
								{
									className: "bottomToolOptions-toolTitle",
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_powerups",
								}),
								React.createElement(
									"span",
									{
										className: "toolName",
									},
									"Powerup : ",
									React.createElement(
										"span",
										{
											className: "bottomMenu-bold",
										},
										opt.selected
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		10: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "StraightLineBottomToolOptions",
					render() {
						const { options } = this.props;
						return React.createElement(
							"div",
							{
								className: "bottomToolOptions bottomToolOptions_straightline",
							},
							React.createElement(
								"div",
								{
									className: "bottomToolOptions-toolTitle",
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_line",
								}),
								React.createElement(
									"span",
									{
										className: "toolName",
									},
									"Straight Line : ",
									React.createElement(
										"span",
										{
											className: "bottomMenu-bold",
										},
										options.lineType
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		11: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Vehicle",
					toggleVehicle() {
						if (typeof GameManager != "undefined") {
							GameManager.command("toggle vehicle");
						}
					},
					render() {
						/** @type {string} */
						const valueClassName =
							"bottomMenu-button bottomMenu-button-right bottomMenu-button_vehicle ";
						/** @type {string} */
						let addClass = "editorgui_icons editorgui_icons-icon_mtb";
						/** @type {string} */
						let value = "MTB";
						return (
							this.props.vehicle &&
								((value = this.props.vehicle.toLowerCase()),
								(addClass = `editorgui_icons editorgui_icons-icon_${value}`)),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.toggleVehicle,
								},
								React.createElement("span", {
									className: addClass,
								}),
								React.createElement(
									"span",
									{
										className: "name",
									},
									"Vehicle : ",
									React.createElement(
										"span",
										{
											className: "bottomMenu-bold",
										},
										value
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		12: [
			function (require, module) {
				const React = require("react");
				const ExpandIcon = require("react-slider");
				const storeMixin = React.createClass({
					displayName: "VehiclePowerupBottomToolOptions",
					adjustTime(s) {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool option", "time", s);
						}
					},
					render() {
						const { options } = this.props;
						/** @type {number} */
						let value = 10;
						/** @type {number} */
						let date = 1;
						/** @type {number} */
						let label = 0;
						/** @type {number} */
						let interval = 1;
						return (
							options &&
								((label = options.time),
								(value = options.maxTime),
								(date = options.minTime),
								(interval = options.step)),
							React.createElement(
								"div",
								{
									className: "bottomToolOptions bottomToolOptions_eraser",
								},
								React.createElement(
									"div",
									{
										className: "bottomToolOptions-toolTitle",
									},
									React.createElement("span", {
										className:
											"editorgui_icons editorgui_icons-icon_vehicle_swap",
									}),
									React.createElement(
										"span",
										{
											className: "toolName",
										},
										"VEHICLE POWERUP"
									)
								),
								React.createElement(
									"div",
									{
										className: "horizontal-slider-container",
									},
									React.createElement(
										"span",
										{
											className: "horizontal-slider-label",
										},
										"Time"
									),
									React.createElement(ExpandIcon, {
										withBars: true,
										className: "horizontal-slider vehicleswap-slider_radius",
										onChange: this.adjustTime,
										defaultValue: label,
										max: value,
										min: date,
										step: interval,
										value: label,
									}),
									React.createElement("input", {
										type: "text",
										className:
											"bottomToolOptions-input bottomToolOptions-input_vehiclepoweruptime",
										value: label,
									}),
									React.createElement(
										"span",
										{
											className: "horizontal-slider-label",
										},
										"Seconds"
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
				"react-slider": 74,
			},
		],
		13: [
			function (require, module) {
				const React = require("react");
				const isFunction = require("../../../libs/jquery");
				const storeMixin = React.createClass({
					displayName: "ChromeAppBottomMenu",
					componentDidMount() {
						this.initSlider();
					},
					initSlider() {
						const opt = this.refs.content.getDOMNode();
						const xthen = this.refs.sliderButtonLeft.getDOMNode();
						const hoistNode = this.refs.sliderButtonRight.getDOMNode();
						const options = isFunction(opt);
						options.slick({
							dots: false,
							infinite: false,
							speed: 300,
							slidesToShow: 1,
							slidesToScroll: 1,
							touchThreshold: 12,
							nextArrow: isFunction(hoistNode),
							prevArrow: isFunction(xthen),
							mobileFirst: true,
							responsive: [
								{
									breakpoint: 250,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
									},
								},
								{
									breakpoint: 500,
									settings: {
										slidesToShow: 3,
										slidesToScroll: 1,
									},
								},
								{
									breakpoint: 750,
									settings: {
										slidesToShow: 4,
										slidesToScroll: 2,
									},
								},
							],
						});
					},
					render() {
						const type = GameSettings.portal;
						const pkg = {
							DOWNLOAD_MOBILE: {
								url: "https://www.freeriderhd.com/mobile",
								icon: "chromeapp_icons chromeapp_icons-mobile-icon",
								text: "Get the mobile game!",
							},
							PLAY_WEB: {
								url: "https://www.freeriderhd.com/",
								icon: "chromeapp_icons chromeapp_icons-web_promo_icon",
								text: "Play and Upload tracks at Freeriderhd.com",
							},
							ADD_GAME_TO_CHROME: {
								url:
									"https://chrome.google.com/webstore/detail/free-rider-hd/emikpifndnjfkgofoglceekhkbaicbde",
								icon: "chromeapp_icons chromeapp_icons-chrome_promo_icon",
								text: "Add the full game to Chrome",
							},
							RATE_IN_CHROME: {
								url:
									"https://chrome.google.com/webstore/detail/free-rider-hd-offline-edi/kffmoglgaljfcfaadaknkiipcclifcbn/reviews",
								icon: "chromeapp_icons chromeapp_icons-rate_promo_icon",
								text: "Rate in the Chrome Store",
							},
							SUBSCRIBE_TO_YOUTUBE: {
								url:
									"https://www.youtube.com/channel/UCTrw0oc3Is2YriS3VA28Ggw/?sub_confirmation=1",
								icon: "chromeapp_icons chromeapp_icons-youtube_promo_icon",
								text: "Subscribe to YouTube",
							},
							LIKE_ON_FACEBOOK: {
								url: "https://www.facebook.com/freeriderfans",
								icon: "chromeapp_icons chromeapp_icons-fb_like_promo_icon",
								text: "Like Us On Facebook",
							},
							FOLLOW_US_ON_TWITTER: {
								url: "https://twitter.com/FreeRider_HD",
								icon: "chromeapp_icons chromeapp_icons-twitter_icon",
								text: "Follow Us On Twitter",
							},
							JOIN_THE_COMMUNITY: {
								url:
									"https://www.youtube.com/channel/UCTrw0oc3Is2YriS3VA28Ggw/?sub_confirmation=1",
								icon: "chromeapp_icons chromeapp_icons-community_icon",
								text: "Join the Community",
							},
							PLAY_ON_FACEBOOK: {
								url: "https://apps.facebook.com/freeriderhd/",
								icon: "chromeapp_icons chromeapp_icons-fb_btn_icon",
								text: "Play and Upload Tracks on Facebook",
							},
						};
						/** @type {!Array} */
						const entries = [];
						switch (type) {
							case "kong":
								/** @type {string} */
								pkg.PLAY_WEB.url = `${pkg.PLAY_WEB.url}?t_1=ref&t_2=kong-editor`;
								/** @type {string} */
								pkg.DOWNLOAD_MOBILE.url = `${pkg.DOWNLOAD_MOBILE.url}?t_1=ref&t_2=kong-editor`;
								entries.push(pkg.DOWNLOAD_MOBILE);
								entries.push(pkg.PLAY_WEB);
								entries.push(pkg.SUBSCRIBE_TO_YOUTUBE);
								entries.push(pkg.LIKE_ON_FACEBOOK);
								entries.push(pkg.FOLLOW_US_ON_TWITTER);
								break;
							case "web":
								/** @type {string} */
								pkg.PLAY_WEB.url = `${pkg.PLAY_WEB.url}?t_1=ref&t_2=web-editor`;
								/** @type {string} */
								pkg.DOWNLOAD_MOBILE.url = `${pkg.DOWNLOAD_MOBILE.url}?t_1=ref&t_2=web-editor`;
								entries.push(pkg.DOWNLOAD_MOBILE);
								entries.push(pkg.PLAY_WEB);
								entries.push(pkg.SUBSCRIBE_TO_YOUTUBE);
								entries.push(pkg.LIKE_ON_FACEBOOK);
								entries.push(pkg.FOLLOW_US_ON_TWITTER);
								break;
							case "facebook":
								/** @type {string} */
								pkg.PLAY_ON_FACEBOOK.url = `${pkg.PLAY_WEB.url}?t_1=fb_ref&t_2=editor`;
								/** @type {string} */
								pkg.DOWNLOAD_MOBILE.url = `${pkg.DOWNLOAD_MOBILE.url}?t_1=fb_ref&t_2=editor`;
								entries.push(pkg.DOWNLOAD_MOBILE);
								entries.push(pkg.PLAY_ON_FACEBOOK);
								entries.push(pkg.LIKE_ON_FACEBOOK);
								entries.push(pkg.JOIN_THE_COMMUNITY);
								entries.push(pkg.SUBSCRIBE_TO_YOUTUBE);
								entries.push(pkg.FOLLOW_US_ON_TWITTER);
								break;
							default:
								/** @type {string} */
								pkg.PLAY_WEB.url = `${pkg.PLAY_WEB.url}?t_1=cws&t_2=editor`;
								/** @type {string} */
								pkg.DOWNLOAD_MOBILE.url = `${pkg.DOWNLOAD_MOBILE.url}?t_1=cws&t_2=editor`;
								entries.push(pkg.DOWNLOAD_MOBILE);
								entries.push(pkg.PLAY_WEB);
								entries.push(pkg.ADD_GAME_TO_CHROME);
								entries.push(pkg.RATE_IN_CHROME);
								entries.push(pkg.SUBSCRIBE_TO_YOUTUBE);
								entries.push(pkg.JOIN_THE_COMMUNITY);
						}
						return React.createElement(
							"div",
							{
								className: "buttomMenuChrome",
							},
							React.createElement(
								"div",
								{
									className: "sliderButton leftButton",
									ref: "sliderButtonLeft",
								},
								React.createElement("span", {
									className: "ico_moon icon-arrow-left",
								})
							),
							React.createElement(
								"div",
								{
									ref: "content",
									className: "content",
								},
								entries.map(function (options, awsKey) {
									return React.createElement(
										"a",
										{
											href: options.url,
											key: awsKey,
											target: "_blank",
											className: "promoCard",
										},
										React.createElement(
											"div",
											{
												className: "icon part",
											},
											React.createElement("span", {
												className: options.icon,
											})
										),
										React.createElement(
											"div",
											{
												className: "text part",
											},
											React.createElement("span", null, options.text)
										)
									);
								})
							),
							React.createElement(
								"div",
								{
									className: "sliderButton rightButton",
									ref: "sliderButtonRight",
								},
								React.createElement("span", {
									className: "ico_moon icon-arrow-right",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../../../libs/jquery": 75,
				react: "react",
			},
		],
		14: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ChromeAppHeader",
					appWindow: false,
					closeApp() {
						this.appWindow.close();
					},
					maximizeApp() {
						const mainWindow = this.appWindow;
						if (mainWindow.isMaximized()) {
							mainWindow.restore();
						} else {
							mainWindow.maximize();
						}
					},
					minimizeApp() {
						this.appWindow.minimize();
					},
					info() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", "info");
						}
					},
					componentDidMount() {
						if (typeof isChromeApp != "undefined") {
							this.appWindow = chrome.app.window.current();
						}
					},
					navigateToSite() {
						window.open("https://www.freeriderhd.com/?t_1=cws&t_2=editor");
					},
					render() {
						/** @type {string} */
						let n = "editor";
						return (
							typeof isChromeApp != "undefined" && (n = "offline_editor"),
							React.createElement(
								"div",
								{
									id: "header",
								},
								React.createElement("span", {
									className: "chromeapp_icons chromeapp_icons-btn_info info",
									onClick: this.info,
								}),
								React.createElement("span", {
									className: "chromeapp_icons chromeapp_icons-frhd_logo logo",
									onClick: this.navigateToSite,
								}),
								React.createElement("span", {
									className: `chromeapp_icons chromeapp_icons-${n}`,
								}),
								this.renderWindowControls()
							)
						);
					},
					renderWindowControls() {
						/** @type {boolean} */
						let n = false;
						return (
							typeof isChromeApp != "undefined" &&
								(n = React.createElement(
									"div",
									{
										className: "controls",
									},
									React.createElement("span", {
										className: "chromeapp_icons chromeapp_icons-btn_min",
										onClick: this.minimizeApp,
									}),
									React.createElement("span", {
										className: "chromeapp_icons chromeapp_icons-btn_max",
										onClick: this.maximizeApp,
									}),
									React.createElement("span", {
										className: "chromeapp_icons chromeapp_icons-btn_close",
										onClick: this.closeApp,
									})
								)),
							n
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		15: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "infodialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					render() {
						return React.createElement(
							"div",
							{
								className: "editorDialog-content chromeinfo-dialog",
							},
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"ABOUT THE OFFLINE EDITOR"
								)
							),
							React.createElement(
								"div",
								{
									className: "middle",
								},
								React.createElement(
									"p",
									null,
									"Free Rider HD Offline Editor is dedicated solely to creating tracks for Free Rider HD the game, that does not require an internet connection and can run independently of the Free Rider HD Websites and applications."
								),
								React.createElement("h3", null, "Free Rider in Education"),
								React.createElement(
									"p",
									null,
									"Free Rider has long been used in classrooms all over the world as a learning tool. Teachers have found that creating has a strong link to programming logic, develops persistence, and provides a fun environment to put basic science principles to use."
								),
								React.createElement(
									"p",
									null,
									"If you are a teacher and have specific requests for Free Rider HD in your classroom please let us know at ",
									React.createElement(
										"a",
										{
											href: "mailto:education@freeriderhd.com",
										},
										"education@freeriderhd.com"
									),
									" and we will do our best to accomodate your request!"
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		16: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ChomeappUploadDialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					componentWillMount() {},
					showExportDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", "export");
						}
					},
					render() {
						/** @type {boolean} */
						let label = (this.props.options, false);
						/** @type {boolean} */
						let activeSnapElement = false;
						const view = GameSettings.portal;
						return (
							(view && view !== "kong") ||
								((label = React.createElement(
									"a",
									{
										href: "http://www.freeriderhd.com/?t_1=cws&t_2=editor",
										target: "_blank",
										className: "promoButton left",
									},
									React.createElement(
										"div",
										{
											className: "wrap",
										},
										React.createElement("span", {
											className:
												"part chromeapp_icons chromeapp_icons-web_btn_icon",
										}),
										React.createElement(
											"span",
											{
												className: "part text",
											},
											"FreeRiderHD.com"
										)
									)
								)),
								console.log("hit")),
							(view && view !== "facebook") ||
								(activeSnapElement = React.createElement(
									"a",
									{
										href:
											"https://apps.facebook.com/freeriderhd/?t_1=cws&t_2=editor",
										target: "_blank",
										className: "promoButton right",
									},
									React.createElement(
										"div",
										{
											className: "wrap",
										},
										React.createElement("span", {
											className:
												"part chromeapp_icons chromeapp_icons-fb_btn_icon",
										}),
										React.createElement(
											"span",
											{
												className: "part text",
											},
											"Facebook App"
										)
									)
								)),
							React.createElement(
								"div",
								{
									className: "editorDialog-content chromeUpload-dialog",
								},
								React.createElement(
									"div",
									{
										className: "editorDialog-titleBar",
									},
									React.createElement(
										"span",
										{
											className: "editorDialog-close",
											onClick: this.closeDialog,
										},
										"\u00d7"
									),
									React.createElement(
										"h1",
										{
											className: "editorDialog-content-title",
										},
										"PUBLISH TRACK"
									)
								),
								React.createElement(
									"div",
									{
										className: "middle",
									},
									React.createElement(
										"p",
										{
											className: "blurb",
										},
										"Publishing tracks is currently only available online at FreeRiderHD.com and Free Rider HD on Facebook. Export your track code and upload to the options below.     "
									),
									React.createElement(
										"div",
										{
											className: "buttons",
										},
										label,
										activeSnapElement
									)
								),
								React.createElement(
									"div",
									{
										className: "bottom",
									},
									React.createElement(
										"p",
										{
											className: "text",
										},
										"Export your track code to publish online!"
									),
									React.createElement(
										"div",
										{
											className: "exportButton",
										},
										React.createElement(
											"span",
											{
												className: "primary-button primary-button-blue",
												onClick: this.showExportDialog,
											},
											"EXPORT TRACK CODE"
										)
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		17: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "HelpDialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					render() {
						return React.createElement(
							"div",
							{
								className:
									"editorDialog-content editorDialog-content_changeLog",
							},
							React.createElement(
								"span",
								{
									className: "editorDialog-close",
									onClick: this.closeDialog,
								},
								"\u00d7"
							),
							React.createElement(
								"h1",
								{
									className: "editorDialog-content-title",
								},
								React.createElement("b", null, "Read Me")
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								React.createElement(
									"b",
									null,
									"Welcome to the new and improved editor!"
								)
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								"First let me say, the editor behind this dialog is in",
								React.createElement("b", null, " super alpha phase"),
								". Meaning a lot of bugs may pop up. "
							),
							React.createElement(
								"div",
								{
									className: "box",
								},
								React.createElement(
									"div",
									{
										className: "line",
									},
									"The following items are still in the works:"
								),
								React.createElement(
									"ul",
									null,
									React.createElement(
										"li",
										null,
										"Checkpoints (currently working on them now)"
									),
									React.createElement("li", null, "Zoom to mouse"),
									React.createElement("li", null, "Redo & Undo"),
									React.createElement("li", null, "Tablet Controls"),
									React.createElement("li", null, "Uploading"),
									React.createElement("li", null, "Fullscreen"),
									React.createElement("li", null, "Sound")
								)
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								"Autos created on here, may not work on current version of the game so creator beware."
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								"Download Google Chrome Browser for best performance"
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								"If you want to log a bug, ",
								React.createElement(
									"a",
									{
										href:
											"http://community.freeriderhd.com/threads/new-editor-release-and-bug-report.2391/",
										target: "_blank",
									},
									"visit this thread"
								),
								" in the forum"
							),
							React.createElement(
								"div",
								{
									className: "line",
								},
								"Please ",
								React.createElement(
									"b",
									null,
									React.createElement(
										"a",
										{
											href:
												"http://community.freeriderhd.com/threads/new-editor-release-and-bug-report.2391/",
											target: "_blank",
										},
										"read the first post"
									)
								),
								" as to not log duplicate bugs"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		18: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ImportDialog",
					hasFileAPI: Boolean(
						window.File && window.FileList && window.FileReader
					),
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					clearTrack() {
						if (typeof GameManager != "undefined") {
							GameManager.command("clear track");
							this.closeDialog();
						}
					},
					getInitialState() {
						return {};
					},
					render() {
						/** @type {string} */
						const langClass =
							"editorDialog-content editorDialog-content_clearDialog";
						return React.createElement(
							"div",
							{
								className: langClass,
							},
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"CLEAR TRACK"
								)
							),
							React.createElement(
								"div",
								{
									className: "editorDialog-centerContent",
								},
								"Are you sure you want to clear the track?"
							),
							React.createElement(
								"div",
								{
									className: "editorDialog-bottomBar clearfix",
								},
								React.createElement(
									"button",
									{
										className:
											"primary-button primary-button-blue float-right margin-0-5",
										onClick: this.clearTrack,
									},
									"Yes"
								),
								React.createElement(
									"button",
									{
										className:
											"primary-button primary-button-black float-right margin-0-5",
										onClick: this.closeDialog,
									},
									"Cancel"
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		19: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ControlsDialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					render() {
						return React.createElement(
							"div",
							{
								className:
									"editorDialog-content editorDialog-content_controlsDialog",
							},
							React.createElement(
								"div",
								null,
								React.createElement(
									"div",
									{
										className: "editorDialog-titleBar",
									},
									React.createElement(
										"span",
										{
											className: "editorDialog-close",
											onClick: this.closeDialog,
										},
										"\u00d7"
									),
									React.createElement(
										"h1",
										{
											className: "editorDialog-content-title",
										},
										"VEHICLE CONTROLS"
									)
								),
								React.createElement(
									"div",
									{
										className: "keysContainer",
									},
									React.createElement(
										"table",
										null,
										React.createElement(
											"tr",
											null,
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-accelerate_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Accelerate"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-left_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Lean left"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-change_direction_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Turn Around"
												)
											)
										),
										React.createElement(
											"tr",
											null,
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-brake_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Brake"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-right_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Lean Right"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-restart_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Restart"
												)
											)
										),
										React.createElement(
											"tr",
											null,
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-enter_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Back to Checkpoint"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-cancel_checkpoint_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Remove Checkpoint"
												)
											),
											React.createElement(
												"td",
												null,
												React.createElement("span", {
													className:
														"keyboard_keys keyboard_keys-pause_key_small",
												}),
												React.createElement(
													"span",
													{
														className: "keyname",
													},
													"Pause"
												)
											)
										)
									)
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		20: [
			function (require, module) {
				const React = require("react");
				const TableHead = require("./import");
				const ReactInfiniteListApp = require("./export");
				const node = require("./help");
				const RedBox = require("./controls");
				const Settings = require("./changelog");
				const SelectBoxItem = require("./upload");
				const PopoverItem = require("./offline_editor_promo");
				const HiddenSelectField = require("../chromeapp/upload");
				const value = require("../chromeapp/infodialog");
				const html = require("./clear");
				const storeMixin = React.createClass({
					displayName: "Dialogs",
					className: "editorDialog",
					closeDialog(event) {
						if (
							event.target.className === this.className &&
							typeof GameManager != "undefined"
						) {
							GameManager.command("dialog", false);
						}
					},
					render() {
						const action = this.props.data.showDialog;
						const options = this.props.data.dialogOptions;
						let menuStyle = {};
						/** @type {string} */
						let component = "";
						switch (action) {
							case "import":
								component = React.createElement(TableHead, null);
								break;
							case "export":
								component = React.createElement(ReactInfiniteListApp, {
									options,
								});
								break;
							case "help":
								component = React.createElement(node, null);
								break;
							case "controls":
								component = React.createElement(RedBox, null);
								break;
							case "changeLog":
								component = React.createElement(Settings, null);
								break;
							case "upload":
								component = GameSettings.isStandalone
									? React.createElement(HiddenSelectField, {
											options,
									  })
									: React.createElement(SelectBoxItem, {
											options,
									  });
								break;
							case "info":
								component = React.createElement(value, null);
								break;
							case "offline_editor":
								component = React.createElement(PopoverItem, null);
								break;
							case "clear":
								component = React.createElement(html, null);
								break;
							default:
								menuStyle = {
									display: "none",
								};
						}
						return React.createElement(
							"div",
							{
								className: this.className,
								style: menuStyle,
								onClick: this.closeDialog,
							},
							component
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../chromeapp/infodialog": 15,
				"../chromeapp/upload": 16,
				"./changelog": 17,
				"./clear": 18,
				"./controls": 19,
				"./export": 21,
				"./help": 22,
				"./import": 23,
				"./offline_editor_promo": 24,
				"./upload": 25,
				react: "react",
			},
		],
		21: [
			function (require, module) {
				const React = require("react");
				const Blob = require("../utils/blob").saveAs;
				const { saveAs } = require("../utils/filesaver");
				const storeMixin = React.createClass({
					displayName: "ExportDialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					chromeApp: false,
					fileSaverSupport: false,
					isFileSaverSupported() {
						/** @type {boolean} */
						let e = false;
						try {
							/** @type {boolean} */
							e = Boolean(new Blob());
						} catch (t) {}
						/** @type {boolean} */
						this.fileSaverSupport = e;
					},
					isChromeApp() {
						if (typeof isChromeApp != "undefined") {
							/** @type {boolean} */
							this.chromeApp = true;
						}
					},
					calculateSize(width) {
						return encodeURI(width).split(/%..|./).length - 1;
					},
					componentWillMount() {
						this.isFileSaverSupported();
						this.isChromeApp();
					},
					createSaveFile() {
						const textToWrite = this.refs.code.getDOMNode().value;
						const blob = new Blob([textToWrite], {
							type: "text/plain",
						});
						if (this.chromeApp) {
							this.chromeAppSaveAs(blob);
						} else {
							/** @type {!Date} */
							const d = new Date();
							/** @type {number} */
							const scenarioTitle = d.getDate();
							/** @type {number} */
							const pidHex = d.getMonth();
							/** @type {number} */
							const id_month = d.getFullYear();
							/** @type {number} */
							const sota = d.getHours();
							/** @type {number} */
							const day_counter = d.getMinutes();
							/** @type {number} */
							const _transactionName = d.getSeconds();
							/** @type {string} */
							const file_name = `frhd_track_${scenarioTitle}-${pidHex}-${id_month}_${sota}_${day_counter}_${_transactionName}.txt`;
							saveAs(blob, file_name);
						}
					},
					chromeAppSaveAs(blob) {
						try {
							chrome.fileSystem.chooseEntry(
								{
									type: "saveFile",
								},
								function (fileEntry) {
									if (chrome.runtime.lastError) {
										console.warn("User Canceled File Save");
									} else if (fileEntry) {
										fileEntry.createWriter(function (fileWriter) {
											/**
											 * @param {?} line
											 * @return {undefined}
											 */
											fileWriter.onerror = function (line) {
												console.log(line);
											};
											/**
											 * @return {undefined}
											 */
											fileWriter.onwriteend = function () {
												console.log("write complete");
											};
											fileWriter.write(blob);
										}, this.chromeAppSaveFail);
									}
								}
							);
						} catch (t) {}
					},
					chromeAppSaveFail() {
						console.error("There was a problem saving your file");
					},
					selectAllText() {
						console.log("select all text");
						const location_field = this.refs.code.getDOMNode();
						location_field.focus();
						location_field.select();
					},
					render() {
						const result = this.props.options;
						/** @type {string} */
						let language = "Generating track code... this may take a minute";
						/** @type {string} */
						let groups = "";
						return (
							result &&
								result.code &&
								((language = result.code),
								this.fileSaverSupport &&
									(groups = React.createElement(
										"button",
										{
											className:
												"primary-button primary-button-blue float-right",
											onClick: this.createSaveFile,
										},
										"Save as File"
									))),
							React.createElement(
								"div",
								{
									className:
										"editorDialog-content editorDialog-content_exportDialog",
								},
								React.createElement(
									"div",
									{
										className: "editorDialog-titleBar",
									},
									React.createElement(
										"span",
										{
											className: "editorDialog-close",
											onClick: this.closeDialog,
										},
										"\u00d7"
									),
									React.createElement(
										"h1",
										{
											className: "editorDialog-content-title",
										},
										"EXPORT TRACK"
									)
								),
								React.createElement(
									"div",
									{
										className: "editorDialog-codeContainer",
									},
									React.createElement("textarea", {
										ref: "code",
										className: "exportDialog-code",
										defaultValue: "",
										autoComplete: "false",
										spellCheck: "false",
										value: language,
										onClick: this.selectAllText,
									})
								),
								React.createElement(
									"div",
									{
										className: "editorDialog-bottomBar clearfix",
									},
									React.createElement(
										"button",
										{
											className:
												"primary-button primary-button-black float-right margin-0-5",
											onClick: this.closeDialog,
										},
										"Close"
									),
									groups
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../utils/blob": 72,
				"../utils/filesaver": 73,
				react: "react",
			},
		],
		22: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "HelpDialog",
					getInitialState() {
						return {
							advancedSettings: false,
						};
					},
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					getKeyboardShortcuts() {
						return React.createElement(
							"div",
							null,
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"KEYBOARD SHORTCUTS"
								)
							),
							React.createElement(
								"div",
								{
									className: "hotkeys clearfix",
								},
								React.createElement(
									"div",
									{
										className: "hotkeys_tools",
									},
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Tools"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"C"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Camera"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Q"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Straight Line"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"A"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Brush "
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"W"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Curve"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"E"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Eraser"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"S"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Toggle Line Type"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Alt"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Toggle Snap"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Undo"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Ctrl"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Z"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Undo"
										)
									)
								),
								React.createElement(
									"div",
									{
										className: "hotkeys_powerups",
									},
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Powerups"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"P"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Select Powerup"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"1"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Goal"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"2"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Boost"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"3"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Gravity"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"4"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Slowmotion"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"5"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Bomb"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"6"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Checkpoint"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Redo"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Ctrl"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Y"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Redo"
										)
									)
								),
								React.createElement(
									"div",
									{
										className: "hotkeys_more",
									},
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Settings"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Shift"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Click"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Move Camera"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"G"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Toggle Grid"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"V"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Change Vehicle"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Eraser"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Shift"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Scroll"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Change Radius"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkeys-title",
										},
										"Brush"
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Shift"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Scroll"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Brush Length"
										)
									),
									React.createElement(
										"div",
										{
											className: "hotkey",
										},
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Ctrl"
										),
										"+",
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey helpDialog-hotkey_light",
											},
											"Scroll"
										),
										React.createElement(
											"span",
											{
												className: "helpDialog-hotkey-name",
											},
											"Trail Speed"
										)
									)
								)
							),
							React.createElement(
								"div",
								null,
								React.createElement(
									"span",
									{
										className: "helpDialog-advanced_settings link",
										onClick: this.gotoAdvancedSettings,
									},
									"Advanced Settings"
								)
							)
						);
					},
					getAdvancedSettings() {
						const memberDefinitionArg = GameSettings;
						const t = memberDefinitionArg.toolHandler;
						const tmp = t.visibleGrid;
						const lastEndItem = t.rightClickMove;
						return React.createElement(
							"div",
							null,
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"ADVANCED SETTINGS"
								)
							),
							React.createElement(
								"div",
								{
									className: "helpDialogAdvanced",
								},
								React.createElement(
									"table",
									null,
									React.createElement(
										"tr",
										null,
										React.createElement(
											"td",
											{
												className: "settingTitle",
											},
											React.createElement(
												"span",
												{
													className: "name",
												},
												"Visible Grid"
											)
										),
										React.createElement(
											"td",
											{
												className: "settingInput",
											},
											React.createElement("input", {
												type: "checkbox",
												ref: "visibleGrid",
												defaultChecked: tmp,
												onChange: this.toggleVisibleGrid,
											})
										)
									),
									React.createElement(
										"tr",
										null,
										React.createElement(
											"td",
											{
												className: "settingTitle",
											},
											React.createElement(
												"span",
												{
													className: "name",
												},
												"Right Click Camera Move"
											)
										),
										React.createElement(
											"td",
											{
												className: "settingInput",
											},
											React.createElement("input", {
												type: "checkbox",
												ref: "rightClickMove",
												defaultChecked: lastEndItem,
												onChange: this.toggleRightClickMove,
											})
										)
									),
									React.createElement(
										"tr",
										null,
										React.createElement(
											"td",
											{
												className: "settingTitle",
											},
											React.createElement(
												"span",
												{
													className: "name",
												},
												"Grid Size"
											)
										),
										React.createElement(
											"td",
											{
												className: "settingInput",
											},
											this.renderGridSizeSelect()
										)
									)
								)
							),
							React.createElement(
								"div",
								null,
								React.createElement(
									"span",
									{
										className: "helpDialog-advanced_settings link",
										onClick: this.gotoKeyboardShortcuts,
									},
									"Back To Keyboard Shortcuts"
								)
							)
						);
					},
					changeGridSize(e) {
						const gridSize = e.target.value;
						GameSettings.toolHandler.gridSize = gridSize;
						GameManager.command("redraw");
					},
					renderGridSizeSelect() {
						const tileSize = GameSettings.toolHandler.gridSize;
						/** @type {!Array} */
						const navLinksArr = [2, 5, 10, 15, 20, 25, 50, 100];
						return React.createElement(
							"select",
							{
								ref: "gridSize",
								defaultValue: tileSize,
								onChange: this.changeGridSize,
							},
							navLinksArr.map(function (cellText) {
								return React.createElement(
									"option",
									{
										value: cellText,
									},
									cellText
								);
							})
						);
					},
					toggleVisibleGrid() {
						const currentUseHttps = this.refs.visibleGrid.getDOMNode().checked;
						GameSettings.toolHandler.visibleGrid = currentUseHttps;
					},
					toggleRightClickMove() {
						const currentUseHttps = this.refs.rightClickMove.getDOMNode()
							.checked;
						GameSettings.toolHandler.rightClickMove = currentUseHttps;
					},
					gotoAdvancedSettings() {
						this.setState({
							advancedSettings: true,
						});
					},
					gotoKeyboardShortcuts() {
						this.setState({
							advancedSettings: false,
						});
					},
					render() {
						/** @type {boolean} */
						let columnResizerComponent = false;
						return (
							(columnResizerComponent = this.state.advancedSettings
								? this.getAdvancedSettings()
								: this.getKeyboardShortcuts()),
							React.createElement(
								"div",
								{
									className:
										"editorDialog-content editorDialog-content_helpDialog",
								},
								columnResizerComponent
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		23: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ImportDialog",
					hasFileAPI: Boolean(
						window.File && window.FileList && window.FileReader
					),
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					getInitialState() {
						return {
							isDragActive: false,
						};
					},
					importTrack() {
						const obj = this.refs.code.getDOMNode();
						const f = obj.getAttribute("data-paste-code");
						let init = obj.value;
						if (f) {
							init = f;
						}
						if (typeof GameManager != "undefined") {
							GameManager.command("import", init, true);
						}
					},
					onDragLeave(event) {
						const export_btn = event.target;
						if (!export_btn.getAttribute("data-ignoredragleave")) {
							this.setState({
								isDragActive: false,
							});
							/** @type {string} */
							this.refs.dropFile.getDOMNode().style.display = "none";
							/** @type {string} */
							this.refs.placeholder.getDOMNode().style.display = "block";
						}
					},
					onDragOver(event) {
						event.preventDefault();
						/** @type {string} */
						event.dataTransfer.dropEffect = "copy";
						/** @type {string} */
						this.refs.dropFile.getDOMNode().style.display = "block";
						/** @type {string} */
						this.refs.placeholder.getDOMNode().style.display = "none";
						this.setState({
							isDragActive: true,
						});
					},
					onDrop(event) {
						event.preventDefault();
						this.setState({
							isDragActive: false,
						});
						let files;
						if (event.dataTransfer) {
							files = event.dataTransfer.files;
						} else if (event.target) {
							files = event.target.files;
						}
						/** @type {!FileReader} */
						const reader = new FileReader();
						reader.onload = this.fileDropComplete;
						reader.onerror = this.fileDropError;
						reader.readAsText(files[0]);
					},
					fileDropComplete(fileLoadedEvent) {
						const count = fileLoadedEvent.target.result;
						const toolbar = this.refs.code.getDOMNode();
						toolbar.setAttribute("data-paste-code", count);
						this.importTrack();
					},
					fileDropError(contextReference) {
						console.log("There was an error", contextReference);
					},
					onPaste(e) {
						if (e.clipBoardData || window.clipboardData) {
							e.preventDefault();
							/** @type {boolean} */
							let clipboardData = false;
							/** @type {string} */
							let dateString = "";
							if (e.clipBoardData) {
								clipboardData = e.clipboardData;
								dateString = clipboardData.getData("text/plain");
							} else if (window.clipboardData) {
								/** @type {string} */
								dateString = window.clipboardData.getData("Text");
							}
							/** @type {number} */
							const readersLength = dateString.length;
							/** @type {string} */
							let order = dateString.slice(0, 5e4);
							if (readersLength > 5e4) {
								/** @type {string} */
								order +=
									"... track is too large to show, but will still import";
							}
							const instance = this.refs.code.getDOMNode();
							/** @type {string} */
							instance.value = order;
							instance.setAttribute("data-paste-code", dateString);
						}
						this.onInput();
					},
					openFileDialog() {
						this.refs.fileInput.getDOMNode().click();
					},
					onBlurInput() {
						/** @type {number} */
						this.refs.placeholder.getDOMNode().style.opacity = 1;
					},
					onFocusInput() {
						/** @type {number} */
						this.refs.placeholder.getDOMNode().style.opacity = 0.3;
					},
					onInput() {
						const aquery = this.refs.code.getDOMNode().value;
						const boxChild = this.refs.placeholder.getDOMNode();
						/** @type {string} */
						boxChild.style.display = aquery.length > 0 ? "none" : "block";
					},
					render() {
						const _txs = this.state.isDragActive;
						/** @type {string} */
						let valueClassName =
							"editorDialog-content editorDialog-content_importDialog";
						if (_txs) {
							/** @type {string} */
							valueClassName = `${valueClassName} editorDialog-content-dragActive`;
						}
						/** @type {string} */
						let children = "";
						if (this.hasFileAPI) {
							children = React.createElement(
								"span",
								null,
								",or ",
								React.createElement(
									"span",
									{
										className: "link",
										onClick: this.openFileDialog,
									},
									"select a file"
								)
							);
						}
						const part2 = React.createElement(
							"span",
							{
								className: "importDialog-placeholder",
								ref: "placeholder",
								"data-ignoredragleave": "true",
							},
							"Paste track code, drag and drop text files here ",
							children,
							" to import"
						);
						return React.createElement(
							"div",
							{
								className: valueClassName,
							},
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"IMPORT TRACK"
								)
							),
							React.createElement(
								"div",
								{
									className: "importDialog-codeContainer",
									onDragLeave: this.onDragLeave,
									onDragOver: this.onDragOver,
									onDrop: this.onDrop,
								},
								part2,
								React.createElement(
									"span",
									{
										className: "importDialog-dropFile",
										ref: "dropFile",
										"data-ignoredragleave": "true",
									},
									"Drop file to import"
								),
								React.createElement("textarea", {
									ref: "code",
									className: "importDialog-code",
									"data-ignoredragleave": "true",
									autoComplete: "false",
									spellCheck: "false",
									onPaste: this.onPaste,
									onChange: this.onInput,
									onFocus: this.onFocusInput,
									onBlur: this.onBlurInput,
								}),
								React.createElement("input", {
									style: {
										display: "none",
									},
									type: "file",
									ref: "fileInput",
									accept: "text/plain",
									onChange: this.onDrop,
								})
							),
							React.createElement(
								"div",
								{
									className: "editorDialog-bottomBar clearfix",
								},
								React.createElement(
									"button",
									{
										className:
											"primary-button primary-button-blue float-right margin-0-5",
										onClick: this.importTrack,
									},
									"Import"
								),
								React.createElement(
									"button",
									{
										className:
											"primary-button primary-button-black float-right margin-0-5",
										onClick: this.closeDialog,
									},
									"Cancel"
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		24: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "OfflineEditorPromoDialog",
					closeDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					render() {
						return React.createElement(
							"div",
							{
								className: "editorDialog-content offlineeditorpromo-dialog",
							},
							React.createElement(
								"div",
								{
									className: "editorDialog-titleBar",
								},
								React.createElement(
									"span",
									{
										className: "editorDialog-close",
										onClick: this.closeDialog,
									},
									"\u00d7"
								),
								React.createElement(
									"h1",
									{
										className: "editorDialog-content-title",
									},
									"OFFLINE EDITOR"
								)
							),
							React.createElement(
								"div",
								{
									className: "middle",
								},
								React.createElement(
									"p",
									null,
									"Now you can draw and save your tracks without an internet connection with the ",
									React.createElement(
										"a",
										{
											"data-route": "true",
											href:
												"https://chrome.google.com/webstore/detail/free-rider-hd-offline-edi/kffmoglgaljfcfaadaknkiipcclifcbn?utm_source=web_editor_dialog",
											target: "_blank",
										},
										"Offline Editor for Chrome"
									),
									". Click the button below to visit the Chrome Web Store and download the official Free Rider HD Offline Editor."
								),
								React.createElement(
									"div",
									{
										className: "promoButton",
									},
									React.createElement(
										"a",
										{
											href:
												"https://chrome.google.com/webstore/detail/free-rider-hd-offline-edi/kffmoglgaljfcfaadaknkiipcclifcbn?utm_source=web_editor_dialog",
											"data-route": "true",
											target: "_blank",
											className: "install",
										},
										React.createElement("span", {
											className:
												"icon editorgui_icons editorgui_icons-chrome_download_icon",
										}),
										React.createElement(
											"div",
											{
												className: "text",
											},
											React.createElement(
												"h3",
												null,
												"FREE RIDER HD OFFLINE EDITOR"
											),
											React.createElement(
												"span",
												null,
												"Download from the Chrome Web Store"
											)
										)
									)
								)
							),
							React.createElement(
								"div",
								{
									className: "bottom",
								},
								React.createElement(
									"p",
									null,
									"Please note that the Free Rider HD Offline Editor requires the ",
									React.createElement(
										"a",
										{
											href:
												"https://www.google.com/chrome/browser/desktop/index.html",
											"data-route": "true",
											target: "_blank",
										},
										"Chrome Web Browser"
									),
									" to be installed on your computer in order to run"
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		25: [
			function (require, module) {
				const React = require("react");
				const me = GameSettings;
				const http_methods = Application.Helpers.AjaxHelper;
				const _self = Application.Helpers.ShareHelper;
				const that = Application.Helpers.GoogleAnalyticsHelper;
				const storeMixin = React.createClass({
					displayName: "UploadDialog",
					getDefaultProps() {
						return {
							maxTitleChars: 30,
							minTitleChars: 3,
							maxDescChars: 300,
							minDescChars: 5,
						};
					},
					uploadData: null,
					uploadResponseData: null,
					getInitialState() {
						return {
							titleCharCountLeft: this.props.maxTitleChars,
							descCharCountLeft: this.props.maxDescChars,
							defaultVehicle: "MTB",
							vehiclesAllowed: {
								mtb: true,
								bmx: true,
							},
							uploadingEnabled: false,
							canClose: true,
							errorMsg: "",
							showErrorMsg: false,
							uploading: false,
							uploadComplete: false,
						};
					},
					getUser() {
						return Application.User;
					},
					onTitleChange() {
						const menu = this.refs.trackTitle;
						const s2 = menu.getDOMNode().value;
						const y = s2.length;
						/** @type {number} */
						const yv = this.props.maxTitleChars - y;
						const oRemind = this.refs.titleCharCountLeft.getDOMNode();
						/** @type {string} */
						oRemind.style.color = yv <= 0 ? "#E5302F" : "#595959";
						this.setState({
							titleCharCountLeft: yv,
						});
						this.checkEnableUpload();
					},
					onDescriptionChange() {
						const menu = this.refs.trackDesc;
						const s2 = menu.getDOMNode().value;
						const y = s2.length;
						/** @type {number} */
						const yv = this.props.maxDescChars - y;
						const oRemind = this.refs.descCharCountLeft.getDOMNode();
						/** @type {string} */
						oRemind.style.color = yv <= 0 ? "#E5302F" : "#595959";
						this.setState({
							descCharCountLeft: yv,
						});
						this.checkEnableUpload();
					},
					checkEnableUpload() {
						const o = this.refs;
						const thisState = this.state;
						const $scope = this.props;
						const listF = o.trackTitle.getDOMNode();
						const msg = o.trackDesc.getDOMNode();
						const i = thisState.vehiclesAllowed.mtb;
						const hourNow = thisState.vehiclesAllowed.bmx;
						const val = listF.value;
						const choice = msg.value;
						/** @type {boolean} */
						let u = true;
						/** @type {boolean} */
						let PL$11 = false;
						if (val.length <= $scope.minTitleChars) {
							/** @type {boolean} */
							u = false;
						}
						if (choice.length <= $scope.minDescChars) {
							/** @type {boolean} */
							u = false;
						}
						if (i === false && hourNow === false) {
							/** @type {boolean} */
							u = false;
						}
						if (!$scope.options.verified) {
							/** @type {boolean} */
							u = false;
							/** @type {string} */
							PL$11 = "You must complete your track before uploading";
						}
						const _target = this.getUser().get("user_stats");
						const sum = me.trackUploadCost;
						const width = _target.tot_cns;
						if (sum > width) {
							/** @type {boolean} */
							u = false;
							/** @type {string} */
							PL$11 = "Not enough coins";
						}
						this.setState({
							uploadingEnabled: u,
							errorMsg: PL$11,
						});
					},
					closeDialog() {
						if (this.state.canClose && typeof GameManager != "undefined") {
							GameManager.command("dialog", false);
						}
					},
					toggleCheckbox(event) {
						const roleLabel = event.currentTarget;
						const tmpJ = roleLabel.getAttribute("data-vehicle");
						const text = this.state.vehiclesAllowed;
						const goToKey = this.state.defaultVehicle;
						/** @type {boolean} */
						text[tmpJ] = !text[tmpJ];
						/** @type {boolean} */
						text[goToKey] = true;
						this.setState(text);
						this.checkEnableUpload();
					},
					uploadTrack() {
						const { state } = this;
						if (state.uploadingEnabled) {
							this.setState({
								uploading: true,
								uploadingEnabled: false,
								canClose: false,
								loading: true,
								showErrorMsg: false,
							});
							const obj = this.refs;
							const featureServiceName = obj.trackTitle.getDOMNode().value;
							const errorMessage = obj.trackDesc.getDOMNode().value;
							const idnum2expr = state.defaultVehicle;
							const i = state.vehiclesAllowed.mtb;
							const s = state.vehiclesAllowed.bmx;
							const l = this.props.options;
							const c = l.code;
							const data = {
								name: featureServiceName,
								desc: errorMessage,
								default_vehicle: idnum2expr,
								allowed_vehicles: {
									MTB: i,
									BMX: s,
								},
								code: c,
							};
							this.uploadData = data;
							const createReturn = http_methods.post("create/submit", data);
							createReturn.done(this.uploadTrackComplete);
							createReturn.done(this.uploadTrackFail);
						}
					},
					trackEvent(name, value, type) {
						const types = {
							category: "track-upload",
							action: name,
							label: value,
							value: type,
							non_interaction: true,
						};
						that.track_event(types);
					},
					uploadTrackComplete(result) {
						if (result.result) {
							this.trackEvent("submit", "success", me.trackUploadCost);
							this.uploadResponseData = result.data;
							this.setState({
								uploading: false,
								uploadComplete: true,
								canClose: true,
							});
						} else {
							this.trackEvent("submit-error", result.msg, 0);
							this.setState({
								uploading: false,
								canClose: true,
								errorMsg: result.msg,
								showErrorMsg: true,
							});
						}
					},
					uploadTrackFail(animate_param) {
						console.log(animate_param);
					},
					setDefaultVehicle() {
						const bContentType = this.refs.trackDefaultVehicle.getDOMNode();
						const cupcakeInput =
							bContentType.options[bContentType.selectedIndex].value;
						const _genesis = cupcakeInput.toLowerCase();
						const _txs = this.state.vehiclesAllowed;
						/** @type {boolean} */
						_txs[_genesis] = true;
						this.setState({
							defaultVehicle: cupcakeInput,
							vehiclesAllowed: _txs,
						});
					},
					getForm() {
						const options = this.state;
						const { props } = this;
						/** @type {string} */
						let mainClassName = "";
						/** @type {string} */
						let additionalClasses = "";
						const r = options.defaultVehicle.toLowerCase();
						if (options.vehiclesAllowed.mtb) {
							/** @type {string} */
							additionalClasses = "checked";
						}
						if (options.vehiclesAllowed.bmx) {
							/** @type {string} */
							mainClassName = "checked";
						}
						if (r === "mtb") {
							/** @type {string} */
							additionalClasses += " disabled";
						} else {
							/** @type {string} */
							mainClassName += " disabled";
						}
						/** @type {string} */
						let text = "";
						return (
							options.uploading &&
								(text = React.createElement("div", {
									className: "ud-form-overlay",
								})),
							React.createElement(
								"div",
								{
									className: "ud-form",
								},
								React.createElement(
									"div",
									{
										className: "ud-form-input",
									},
									React.createElement(
										"span",
										{
											className: "title",
										},
										"Track Title: "
									),
									React.createElement(
										"span",
										{
											className: "input-desc",
										},
										"(max ",
										props.maxTitleChars,
										" characters)"
									),
									React.createElement(
										"span",
										{
											className: "char-left float-right",
											ref: "titleCharCountLeft",
										},
										options.titleCharCountLeft
									),
									React.createElement(
										"div",
										null,
										React.createElement("input", {
											type: "text",
											onChange: this.onTitleChange,
											maxLength: props.maxTitleChars,
											className: "ud-form-text-input",
											ref: "trackTitle",
											name: "track-title",
										})
									)
								),
								React.createElement(
									"div",
									{
										className: "ud-form-input",
									},
									React.createElement(
										"span",
										{
											className: "title",
										},
										"Track Description: "
									),
									React.createElement(
										"span",
										{
											className: "input-desc",
										},
										"(max ",
										this.props.maxDescChars,
										" characters)"
									),
									React.createElement(
										"span",
										{
											className: "char-left float-right",
											ref: "descCharCountLeft",
										},
										options.descCharCountLeft
									),
									React.createElement(
										"div",
										null,
										React.createElement("textarea", {
											onChange: this.onDescriptionChange,
											maxLength: props.maxDescChars,
											className: "ud-form-text-input",
											ref: "trackDesc",
											name: "trackDesc",
										})
									)
								),
								React.createElement(
									"div",
									{
										className: "ud-form-vehicles clearfix",
									},
									React.createElement(
										"div",
										{
											className: "ud-form-input float-left",
										},
										React.createElement(
											"div",
											{
												className: "title",
											},
											"Default Vehicle"
										),
										React.createElement(
											"select",
											{
												className: "select-dropdown",
												ref: "trackDefaultVehicle",
												onChange: this.setDefaultVehicle,
											},
											React.createElement(
												"option",
												{
													value: "MTB",
												},
												"Mountain Bike"
											),
											React.createElement(
												"option",
												{
													value: "BMX",
												},
												"BMX Bike"
											)
										)
									),
									React.createElement(
										"div",
										{
											className: "ud-form-input float-right",
										},
										React.createElement(
											"div",
											{
												className: "title",
											},
											"Vehicles Allowed"
										),
										React.createElement(
											"div",
											{
												className: `ud-form-checkbox ${additionalClasses}`,
												ref: "mtbEnabled",
												"data-vehicle": "mtb",
												onClick: this.toggleCheckbox,
											},
											React.createElement(
												"span",
												{
													className: "checkbox",
												},
												"\u00a0"
											),
											React.createElement(
												"span",
												{
													className: "name",
												},
												"Mountain Bike"
											)
										),
										React.createElement(
											"div",
											{
												className: `ud-form-checkbox ${mainClassName}`,
												ref: "bmxEnabled",
												"data-vehicle": "bmx",
												onClick: this.toggleCheckbox,
											},
											React.createElement(
												"span",
												{
													className: "checkbox",
												},
												"\u00a0"
											),
											React.createElement(
												"span",
												{
													className: "name",
												},
												"BMX Bike"
											)
										)
									)
								),
								text
							)
						);
					},
					getShareData(value) {
						const _ref = value.track;
						const text = GameSettings.basePlatformExternalUrl;
						/** @type {string} */
						const subs = `Play ${_ref.title} by ${_ref.author}!`;
						/** @type {string} */
						const r = `${_ref.title} by ${_ref.author} is a Free Rider HD Track`;
						/** @type {string} */
						const part = "Play Track";
						/** @type {string} */
						const url = `${text}/t/${_ref.url}`;
						/** @type {string} */
						const title = `${_ref.title} by ${_ref.author}`;
						/** @type {string} */
						const c = `Checkout ${_ref.title} by ${_ref.author}, a Free Rider HD Track`;
						/** @type {string} */
						const u = `${_ref.title} by ${_ref.author} is a Free Rider HD Track! Play Now : `;
						const { descr } = _ref;
						/** @type {string} */
						const d = `${_ref.title} by ${_ref.author}`;
						/** @type {string} */
						const m = "HTML5, game";
						const { author } = _ref;
						/** @type {string} */
						const via = "freerider_hd";
						const data = React.createElement("div", {
							ref: "shareTrackInfo",
							"data-name": subs,
							"data-caption": r,
							"data-action": part,
							"data-url": url,
							"data-title": title,
							"data-subject": c,
							"data-body": u,
							"data-description": descr,
							"data-tweet": d,
							"data-tweet_hashtags": m,
							"data-author": author,
							"data-via": via,
						});
						return data;
					},
					shareTrack(keyView) {
						const data = this.refs.shareTrackInfo.getDOMNode().dataset;
						const url = keyView.target.dataset.service;
						_self.share(url, data);
					},
					getUploadCompleteScreen() {
						const unusedImport = this.uploadData;
						const nextMsg = this.uploadResponseData;
						const _name = unusedImport.name;
						const fileName = nextMsg.track.url;
						const yearRangeNodes = nextMsg.user_stats.tot_cns;
						/** @type {string} */
						const depth0 = `${me.basePlatformUrl}/t/${fileName}/uploaded`;
						return React.createElement(
							"div",
							{
								className: "ud-upload-complete",
							},
							this.getShareData(nextMsg),
							React.createElement(
								"div",
								{
									className: "ud-upload-complete-message margin-bottom-10",
								},
								React.createElement(
									"a",
									{
										href: depth0,
										ref: "trackLink",
										className: "track-title",
									},
									_name
								),
								" was successfully uploaded!"
							),
							React.createElement(
								"div",
								{
									className: "ud-upload-complete-balance margin-bottom-10",
								},
								"Your new coin balance is ",
								React.createElement(
									"span",
									{
										className: "balance",
									},
									yearRangeNodes
								)
							),
							React.createElement(
								"div",
								{
									className: "ud-upload-complete-share margin-bottom-10",
								},
								React.createElement(
									"div",
									{
										className: "title",
									},
									"Share your track"
								),
								React.createElement(
									"div",
									{
										className: "options",
									},
									React.createElement("span", {
										className: "share_icons share_icons-share_facebook",
										"data-service": "facebook",
										onClick: this.shareTrack,
									}),
									React.createElement("span", {
										className: "share_icons share_icons-share_google",
										"data-service": "google_plus",
										onClick: this.shareTrack,
									}),
									React.createElement("span", {
										className: "share_icons share_icons-share_twitter",
										"data-service": "twitter",
										onClick: this.shareTrack,
									}),
									React.createElement("span", {
										className: "share_icons share_icons-share_gmail",
										"data-service": "gmail",
										onClick: this.shareTrack,
									}),
									React.createElement("span", {
										className: "share_icons share_icons-share_mail",
										"data-service": "mail",
										onClick: this.shareTrack,
									}),
									React.createElement("span", {
										className: "share_icons share_icons-share_reddit",
										"data-service": "reddit",
										onClick: this.shareTrack,
									})
								)
							),
							React.createElement(
								"div",
								null,
								React.createElement(
									"div",
									{
										className: "margin-bottom-10",
									},
									"Copy Track Link:"
								),
								React.createElement(
									"div",
									null,
									React.createElement("input", {
										type: "text",
										ref: "trackLinkInput",
										readOnly: true,
										onFocus: this.selectTrackLinkInput,
										className: "ud-upload-complete-link-input",
										value: depth0,
									})
								)
							)
						);
					},
					selectTrackLinkInput() {
						const logoRef = this.refs.trackLinkInput.getDOMNode();
						logoRef.select();
					},
					viewTrack() {
						if (this.state.uploadComplete) {
							this.refs.trackLink.getDOMNode().click();
						}
					},
					getFooter() {
						const options = this.state;
						const state = this.props;
						const schemaCode = state.options.code;
						/** @type {string} */
						let cssClass = "";
						/** @type {string} */
						let name = "";
						/** @type {string} */
						var id = "disabled";
						if (options.canClose) {
							/** @type {string} */
							id = "";
						}
						/** @type {string} */
						let val = "Cancel";
						/** @type {string} */
						let index = "";
						if (
							(options.uploadComplete &&
								((val = "Close"),
								(index = React.createElement(
									"button",
									{
										className:
											"primary-button primary-button-blue float-right margin-0-5",
										onClick: this.viewTrack,
									},
									"View Track"
								))),
							options.uploadComplete === false)
						) {
							/** @type {string} */
							var id = "disabled";
							if (options.uploadingEnabled) {
								/** @type {string} */
								id = "";
							}
							index = React.createElement(
								"button",
								{
									className: `primary-button primary-button-blue float-right margin-0-5 ${id}`,
									onClick: this.uploadTrack,
								},
								"Upload"
							);
						}
						const e = React.createElement(
							"button",
							{
								className: `primary-button primary-button-black float-right margin-0-5 ${id}`,
								onClick: this.closeDialog,
							},
							val
						);
						if (
							options.uploading === false &&
							options.uploadComplete === false &&
							schemaCode
						) {
							const deck = this.getUser().get("user_stats");
							const items = me.trackUploadCost;
							const cards = deck.tot_cns;
							const toolbarButtonStyle = {};
							if (items > cards) {
								/** @type {string} */
								toolbarButtonStyle.color = "#E5302F";
							}
							name = React.createElement(
								"div",
								{
									className: "ud-uploading-cost",
								},
								React.createElement(
									"div",
									null,
									React.createElement("span", null, "Track publish cost: "),
									React.createElement("span", {
										className: "core_icons core_icons-coin_icon_sm",
									}),
									React.createElement(
										"span",
										{
											className: "num",
										},
										items
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement("span", null, "Your coin balance: "),
									React.createElement("span", {
										className: "core_icons core_icons-coin_icon_sm",
									}),
									React.createElement(
										"span",
										{
											className: "num",
											style: toolbarButtonStyle,
										},
										cards
									)
								)
							);
						}
						if (options.uploading) {
							name = React.createElement(
								"div",
								{
									className: "ud-uploading-message",
								},
								React.createElement("span", {
									className: "loading-hourglass",
								}),
								React.createElement(
									"span",
									{
										className: "text",
									},
									"Uploading track..."
								)
							);
						}
						if (options.uploadComplete) {
							name = React.createElement(
								"div",
								{
									className: "ud-uploading-message",
								},
								React.createElement(
									"span",
									{
										className: "text",
									},
									"Upload Complete"
								)
							);
						}
						if (options.errorMsg) {
							name = React.createElement(
								"span",
								{
									className: "ud-bottom-message",
								},
								options.errorMsg
							);
							/** @type {string} */
							cssClass = "error";
						}
						const ret = React.createElement(
							"div",
							{
								className: `editorDialog-bottomBar clearfix ${cssClass}`,
							},
							name,
							index,
							e
						);
						return ret;
					},
					render() {
						const self = this.state;
						const state = this.props;
						const err = state.options.code;
						const info = React.createElement(
							"div",
							{
								className: "ud-exporting-track",
							},
							"Generating track code...  ",
							React.createElement(
								"span",
								{
									className: "warning",
								},
								"( This might take a minute )"
							)
						);
						/** @type {string} */
						let texts = "";
						texts =
							err && self.uploadComplete === false
								? this.getForm()
								: self.uploadComplete === true
								? this.getUploadCompleteScreen()
								: info;
						const footer = this.getFooter();
						/** @type {string} */
						let id = "disabled";
						return (
							self.canClose && (id = ""),
							React.createElement(
								"div",
								{
									className: "editorDialog-content",
								},
								React.createElement(
									"div",
									{
										className: "editorDialog-titleBar",
									},
									React.createElement(
										"span",
										{
											className: `editorDialog-close ${id}`,
											onClick: this.closeDialog,
										},
										"\u00d7"
									),
									React.createElement(
										"h1",
										{
											className: "editorDialog-content-title",
										},
										"PUBLISH TRACK"
									)
								),
								texts,
								footer
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		26: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "FocusOverlay",
					render() {
						return React.createElement(
							"div",
							{
								className: "gameFocusOverlay",
							},
							React.createElement(
								"div",
								{
									className: "text",
								},
								" Click to resume "
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		27: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/straightlinetool");
				const ExpandIcon = require("../tools/curvedlinetool");
				const SettingsIcon = require("../tools/brushtool");
				const Input = require("../tools/erasertool");
				const Details = require("../tools/poweruptool");
				const Button = require("../tools/vehicletool");
				const MemoFieldset =
					(require("../tools/selecttool"), require("../tools/cameratool"));
				const storeMixin = React.createClass({
					displayName: "LeftMenu",
					render() {
						const undefined = this.props.data.tool;
						const t = this.props.data.hideMenus;
						/** @type {number} */
						const u = 48.6;
						const style = {};
						return (
							(style.marginTop = -((7 * u) / 2)),
							t && (style.display = "none"),
							React.createElement(
								"div",
								{
									className: "leftMenu",
									style,
								},
								React.createElement(DragAndDrop, {
									active: undefined === "straightline",
								}),
								React.createElement(ExpandIcon, {
									active: undefined === "curve",
								}),
								React.createElement(SettingsIcon, {
									active: undefined === "brush",
								}),
								React.createElement(Input, {
									active: undefined === "eraser",
								}),
								React.createElement(Details, {
									active: undefined === "powerup",
								}),
								React.createElement(Button, {
									active: undefined === "vehiclepowerup",
								}),
								React.createElement(MemoFieldset, {
									active: undefined === "camera",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/brushtool": 39,
				"../tools/cameratool": 40,
				"../tools/curvedlinetool": 42,
				"../tools/erasertool": 43,
				"../tools/poweruptool": 47,
				"../tools/selecttool": 49,
				"../tools/straightlinetool": 52,
				"../tools/vehicletool": 59,
				react: "react",
			},
		],
		28: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Loading",
					render() {
						const { percent } = this.props;
						const useStyleString =
							(this.props.itemName,
							{
								width: `${percent}%`,
							});
						return React.createElement(
							"div",
							{
								className: "gameLoading",
							},
							React.createElement(
								"div",
								{
									className: "gameLoading-container",
								},
								React.createElement(
									"div",
									{
										className: "gameLoading-bar",
									},
									React.createElement("div", {
										className: "gameLoading-progress",
										style: useStyleString,
									})
								)
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		29: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/physicsline");
				const ExpandIcon = require("../tools/sceneryline");
				const SettingsIcon = require("../tools/snap");
				const storeMixin = React.createClass({
					displayName: "BrushToolOptions",
					render() {
						const opts = this.props.options;
						return React.createElement(
							"div",
							null,
							React.createElement(DragAndDrop, {
								active: opts.lineType === "physics",
							}),
							React.createElement(ExpandIcon, {
								active: opts.lineType === "scenery",
							}),
							React.createElement(SettingsIcon, {
								active: opts.snap === true,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/physicsline": 46,
				"../tools/sceneryline": 48,
				"../tools/snap": 51,
				react: "react",
			},
		],
		30: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/physicsline");
				const ExpandIcon = require("../tools/sceneryline");
				const SettingsIcon = require("../tools/snap");
				const storeMixin = React.createClass({
					displayName: "CurvedLineToolOptions",
					render() {
						const opts = this.props.options;
						return React.createElement(
							"div",
							null,
							React.createElement(DragAndDrop, {
								active: opts.lineType === "physics",
							}),
							React.createElement(ExpandIcon, {
								active: opts.lineType === "scenery",
							}),
							React.createElement(SettingsIcon, {
								active: opts.snap === true,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/physicsline": 46,
				"../tools/sceneryline": 48,
				"../tools/snap": 51,
				react: "react",
			},
		],
		31: [
			function (require, module) {
				const React = require("react");
				const storeMixin =
					(require("../tools/physicsline"),
					require("../tools/sceneryline"),
					require("../tools/poweruptool"),
					React.createClass({
						displayName: "EraserToolOptions",
						togglePhysicsEraser() {
							if (typeof GameManager != "undefined") {
								/** @type {boolean} */
								this.props.options.types.physics = !this.props.options.types
									.physics;
								GameManager.command(
									"change tool option",
									"types",
									this.props.options.types
								);
							}
						},
						toggleSceneryEraser() {
							if (typeof GameManager != "undefined") {
								/** @type {boolean} */
								this.props.options.types.scenery = !this.props.options.types
									.scenery;
								GameManager.command(
									"change tool option",
									"types",
									this.props.options.types
								);
							}
						},
						togglePowerupEraser() {
							if (typeof GameManager != "undefined") {
								/** @type {boolean} */
								this.props.options.types.powerups = !this.props.options.types
									.powerups;
								GameManager.command(
									"change tool option",
									"types",
									this.props.options.types
								);
							}
						},
						render() {
							const units = this.props.options;
							/** @type {string} */
							const prefix = "sideButton";
							/** @type {string} */
							let iconClass = `${prefix} sideButton_eraserPhysics`;
							/** @type {string} */
							let classed = `${prefix} sideButton_eraserScenery`;
							/** @type {string} */
							let result = `${prefix} sideButton_eraserPowerups`;
							return (
								units.types &&
									(units.types.physics && (iconClass += " active"),
									units.types.scenery && (classed += " active"),
									units.types.powerups && (result += " active")),
								React.createElement(
									"div",
									null,
									React.createElement(
										"div",
										{
											className: iconClass,
											onClick: this.togglePhysicsEraser,
										},
										React.createElement("span", {
											className: "editorgui_icons editorgui_icons-icon_physics",
										})
									),
									React.createElement(
										"div",
										{
											className: classed,
											onClick: this.toggleSceneryEraser,
										},
										React.createElement("span", {
											className: "editorgui_icons editorgui_icons-icon_scenery",
										})
									),
									React.createElement(
										"div",
										{
											className: result,
											onClick: this.togglePowerupEraser,
										},
										React.createElement("span", {
											className:
												"editorgui_icons editorgui_icons-icon_powerups",
										})
									)
								)
							);
						},
					}));
				module.exports = storeMixin;
			},
			{
				"../tools/physicsline": 46,
				"../tools/poweruptool": 47,
				"../tools/sceneryline": 48,
				react: "react",
			},
		],
		32: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/goalpoweruptool");
				const ExpandIcon = require("../tools/boostpoweruptool");
				const SettingsIcon = require("../tools/gravitypoweruptool");
				const Input = require("../tools/slowmopoweruptool");
				const Details = require("../tools/bombpoweruptool");
				const Window = require("../tools/antigravitypoweruptool");
				const Button = require("../tools/checkpointpoweruptool");
				const Tip = require("../tools/teleportpoweruptool");
				const storeMixin = React.createClass({
					displayName: "PowerupToolOptions",
					render() {
						const { options } = this.props;
						return React.createElement(
							"div",
							null,
							React.createElement(DragAndDrop, {
								options,
							}),
							React.createElement(ExpandIcon, {
								options,
							}),
							React.createElement(SettingsIcon, {
								options,
							}),
							React.createElement(Input, {
								options,
							}),
							React.createElement(Details, {
								options,
							}),
							React.createElement(Button, {
								options,
							}),
							React.createElement(Window, {
								options,
							}),
							React.createElement(Tip, {
								options,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/antigravitypoweruptool": 36,
				"../tools/bombpoweruptool": 37,
				"../tools/boostpoweruptool": 38,
				"../tools/checkpointpoweruptool": 41,
				"../tools/goalpoweruptool": 44,
				"../tools/gravitypoweruptool": 45,
				"../tools/slowmopoweruptool": 50,
				"../tools/teleportpoweruptool": 53,
				react: "react",
			},
		],
		33: [
			function (require, module) {
				const React = require("react");
				const RedBox = require("./straightlinetooloptions");
				const HiddenSelectField = require("./curvedlinetooloptions");
				const SelectBoxItem = require("./brushtooloptions");
				const PopoverItem = require("./poweruptooloptions");
				const TableHead = require("./vehiclepoweruptooloptions");
				const div = require("./erasertooloptions");
				const storeMixin = React.createClass({
					displayName: "RightMenu",
					render() {
						const isvalid = this.props.data.tool;
						const usedOptions = this.props.data.toolOptions;
						let style = {};
						/** @type {string} */
						let columnResizerComponent = "";
						/** @type {number} */
						const p = 48.6;
						const fromGroup = this.props.data.hideMenus;
						switch ((fromGroup && (style.display = "none"), isvalid)) {
							case "straightline":
								/** @type {number} */
								style.marginTop = -((3 * p) / 2);
								columnResizerComponent = React.createElement(RedBox, {
									options: usedOptions,
								});
								break;
							case "curve":
								/** @type {number} */
								style.marginTop = -((3 * p) / 2);
								columnResizerComponent = React.createElement(
									HiddenSelectField,
									{
										options: usedOptions,
									}
								);
								break;
							case "brush":
								/** @type {number} */
								style.marginTop = -((3 * p) / 2);
								columnResizerComponent = React.createElement(SelectBoxItem, {
									options: usedOptions,
								});
								break;
							case "eraser":
								/** @type {number} */
								style.marginTop = -((3 * p) / 2);
								columnResizerComponent = React.createElement(div, {
									options: usedOptions,
								});
								break;
							case "powerup":
								/** @type {number} */
								style.marginTop = -((8 * p) / 2);
								columnResizerComponent = React.createElement(PopoverItem, {
									options: usedOptions,
								});
								break;
							case "vehiclepowerup":
								/** @type {number} */
								style.marginTop = -((6 * p) / 2);
								columnResizerComponent = React.createElement(TableHead, {
									options: usedOptions,
								});
								break;
							case "select":
								break;
							case "camera":
								style = {
									display: "none",
								};
						}
						return React.createElement(
							"div",
							{
								className: "rightMenu unselectable",
								style,
							},
							columnResizerComponent
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"./brushtooloptions": 29,
				"./curvedlinetooloptions": 30,
				"./erasertooloptions": 31,
				"./poweruptooloptions": 32,
				"./straightlinetooloptions": 34,
				"./vehiclepoweruptooloptions": 35,
				react: "react",
			},
		],
		34: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/physicsline");
				const ExpandIcon = require("../tools/sceneryline");
				const SettingsIcon = require("../tools/snap");
				const storeMixin = React.createClass({
					displayName: "StraightLineToolOptions",
					render() {
						const opts = this.props.options;
						return React.createElement(
							"div",
							null,
							React.createElement(DragAndDrop, {
								active: opts.lineType === "physics",
							}),
							React.createElement(ExpandIcon, {
								active: opts.lineType === "scenery",
							}),
							React.createElement(SettingsIcon, {
								active: opts.snap === true,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/physicsline": 46,
				"../tools/sceneryline": 48,
				"../tools/snap": 51,
				react: "react",
			},
		],
		35: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("../tools/vehicles/helicoptertool");
				const SettingsIcon = require("../tools/vehicles/balloontool");
				const TabTemplate =
					(require("../tools/vehicles/unicycletool"),
					require("../tools/vehicles/trucktool"));
				const Input = require("../tools/vehicles/blobtool");
				const storeMixin = React.createClass({
					displayName: "PowerupToolOptions",
					render() {
						const { options } = this.props;
						return React.createElement(
							"div",
							null,
							React.createElement(DragAndDrop, {
								options,
							}),
							React.createElement(TabTemplate, {
								options,
							}),
							React.createElement(SettingsIcon, {
								options,
							}),
							React.createElement(Input, {
								options,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"../tools/vehicles/balloontool": 54,
				"../tools/vehicles/blobtool": 55,
				"../tools/vehicles/helicoptertool": 56,
				"../tools/vehicles/trucktool": 57,
				"../tools/vehicles/unicycletool": 58,
				react: "react",
			},
		],
		36: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "AntigravityPowerupTool",
					name: "antigravity",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-antigravity",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		37: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "BombPowerupTool",
					name: "bomb",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-bomb",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		38: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "BoostPowerupTool",
					name: "boost",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-speed",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		39: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "BrushTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "brush");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_brushTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_brush",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		40: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "CameraTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "camera");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName =
							"sideButton sideButton-bottom sideButton_cameraTool ";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_camera",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		41: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "CheckpointPowerupTool",
					name: "checkpoint",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-checkpoint",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		42: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "CurvedLineTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "curve");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_curvedLineTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_curve",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		43: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "EraserTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "eraser");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_eraserTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_eraser",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		44: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "GoalPowerupTool",
					name: "goal",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-goal",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		45: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "GravityPowerupTool",
					name: "gravity",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-gravity",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		46: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "PhysicsLine",
					changeLineType() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change lineType", "physics");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_physicsLine";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeLineType,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_physics",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		47: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "PowerupTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_powerups",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		48: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "SceneryLine",
					changeLineType() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change lineType", "scenery");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_sceneryLine";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeLineType,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_scenery",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		49: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "SelectTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "select");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_selectTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_select",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		50: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "SlowmoPowerupTool",
					name: "slowmo",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-slowmotion",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		51: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Snap",
					toggleSnap() {
						if (typeof GameManager != "undefined") {
							GameManager.command("snap");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_snap";
						/** @type {string} */
						let langClass = "editorgui_icons editorgui_icons-icon_snap";
						return (
							this.props.active &&
								((valueClassName += " active"),
								(langClass = "editorgui_icons editorgui_icons-icon_snap_on")),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.toggleSnap,
								},
								React.createElement("span", {
									className: langClass,
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		52: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "StraightLineTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "straightline");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName =
							"sideButton sideButton-top sideButton_straightLineTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-icon_line",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		53: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "TeleportPowerupTool",
					name: "teleport",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "powerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let n = "sideButton sideButton_powerupTool";
						/** @type {string} */
						let result = "";
						return (
							this.props.options.selected === this.name &&
								((result = ""),
								(n = "sideButton sideButton_powerupTool active")),
							React.createElement(
								"div",
								{
									className: n,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-portal",
									title: result,
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		54: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Balloontool",
					name: "balloon",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "vehiclepowerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-balloon",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		55: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "BlobTool",
					name: "blob",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "vehiclepowerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-blob",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		56: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "HelicopterTool",
					name: "helicopter",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "vehiclepowerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-helicopter",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		57: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "TruckTool",
					name: "truck",
					changePowerup() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "vehiclepowerup");
							GameManager.command("change tool option", "selected", this.name);
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-truck",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		58: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "UnicycleTool",
					name: "unicycle",
					changePowerup() {},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.options.selected === this.name &&
								(valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changePowerup,
								},
								React.createElement("span", {
									className: "editorgui_icons editorgui_icons-unicycle",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		59: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "VehicleTool",
					changeTool() {
						if (typeof GameManager != "undefined") {
							GameManager.command("change tool", "vehiclepowerup");
						}
					},
					render() {
						/** @type {string} */
						let valueClassName = "sideButton sideButton_powerupTool";
						return (
							this.props.active && (valueClassName += " active"),
							React.createElement(
								"div",
								{
									className: valueClassName,
									onClick: this.changeTool,
								},
								React.createElement("span", {
									className:
										"editorgui_icons editorgui_icons-icon_vehicle_swap",
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		60: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ClearTrack",
					clearTrack() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", "clear");
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_clear";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_clear_track";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.clearTrack,
								title: "Clear Track",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Clear"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		61: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Controls",
					dialogName: "controls",
					openDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", this.dialogName);
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_controls";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_controls";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.openDialog,
								title: "Controls",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Controls"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		62: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ExportTrack",
					dialogName: "export",
					openDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", this.dialogName);
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_export";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_export";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.openDialog,
								title: "Export Track",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Export"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		63: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Fullscreen",
					toggleFullscreen() {
						if (typeof GameManager != "undefined") {
							GameManager.command("fullscreen");
						}
					},
					render() {
						const fs = GameSettings.fullscreen;
						/** @type {string} */
						const langClass =
							"topMenu-button topMenu-button-right topMenu-button_fullscreen";
						/** @type {string} */
						let valueClassName = "editorgui_icons";
						return (
							(valueClassName += fs
								? " editorgui_icons-icon_exit_fullscreen"
								: " editorgui_icons-icon_fullscreen"),
							React.createElement(
								"div",
								{
									className: langClass,
									onClick: this.toggleFullscreen,
								},
								React.createElement("span", {
									className: valueClassName,
								})
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		64: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "Help",
					dialogName: "help",
					openDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", this.dialogName);
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_help";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_hotkeys";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.openDialog,
								title: "Hotkeys",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Hotkeys"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		65: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ImportTrack",
					dialogName: "import",
					openDialog() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", this.dialogName);
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_import";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_import";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.openDialog,
								title: "Import Track",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Import"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		66: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "IncreaseZoom",
					increaseZoom() {
						if (typeof GameManager != "undefined") {
							GameManager.command("increase zoom");
						}
					},
					render() {
						/** @type {string} */
						const langClass =
							"topMenu-button topMenu-button-right topMenu-button_increase_zoom";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_zoom_in";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.increaseZoom,
							},
							React.createElement("span", {
								className: valueClassName,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		67: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "OfflineEditor",
					clearTrack() {
						if (typeof GameManager != "undefined") {
							GameManager.command("dialog", "offline_editor");
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_offline";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_offline_editor";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.clearTrack,
								title: "Offline Editor",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Offline"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		68: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ReduceZoom",
					decreaseZoom() {
						if (typeof GameManager != "undefined") {
							GameManager.command("decrease zoom");
						}
					},
					render() {
						/** @type {string} */
						const langClass =
							"topMenu-button topMenu-button-right topMenu-button_reduce_zoom";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_zoom_out";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.decreaseZoom,
							},
							React.createElement("span", {
								className: valueClassName,
							})
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		69: [
			function (require, module) {
				const React = require("react");
				const DragAndDrop = require("./cleartrack");
				const ExpandIcon = require("./importtrack");
				const SettingsIcon = require("./exporttrack");
				const Input = require("./uploadtrack");
				const RedBox = require("./help");
				const template = require("./controls");
				const Tip = require("./reducezoom");
				const FormWithPassWord = require("./increasezoom");
				const SubmitButton = require("./zoomlevel");
				const TableHead = require("./fullscreen");
				const type = require("./offlineeditor");
				const storeMixin = React.createClass({
					displayName: "TopMenu",
					render() {
						return React.createElement(
							"div",
							{
								className: "topMenu unselectable",
							},
							React.createElement(DragAndDrop, null),
							React.createElement(ExpandIcon, null),
							React.createElement(SettingsIcon, null),
							React.createElement(Input, null),
							this.showHelp(),
							this.showControls(),
							this.showOfflineEditorIcon(),
							this.showFullscreen(),
							React.createElement(FormWithPassWord, null),
							React.createElement(SubmitButton, {
								percent: this.props.data.zoomPercentage,
							}),
							React.createElement(Tip, null)
						);
					},
					showOfflineEditorIcon() {
						/** @type {boolean} */
						let parentTag = false;
						/** @type {boolean} */
						const nativeSel =
							navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
						return (
							nativeSel &&
								typeof isChromeApp == "undefined" &&
								(parentTag = React.createElement(type, null)),
							parentTag
						);
					},
					showHelp() {
						/** @type {boolean} */
						let safeImageSource = false;
						return (
							GameSettings.mobile === false &&
								(safeImageSource = React.createElement(RedBox, null)),
							safeImageSource
						);
					},
					showControls() {
						/** @type {boolean} */
						let defineStub = false;
						return (
							GameSettings.mobile === false &&
								(defineStub = React.createElement(template, null)),
							defineStub
						);
					},
					showFullscreen() {
						/** @type {boolean} */
						let JIM_KEY = false;
						return (
							GameSettings.fullscreenAvailable &&
								!GameSettings.isStandalone &&
								(JIM_KEY = React.createElement(TableHead, null)),
							JIM_KEY
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				"./cleartrack": 60,
				"./controls": 61,
				"./exporttrack": 62,
				"./fullscreen": 63,
				"./help": 64,
				"./importtrack": 65,
				"./increasezoom": 66,
				"./offlineeditor": 67,
				"./reducezoom": 68,
				"./uploadtrack": 70,
				"./zoomlevel": 71,
				react: "react",
			},
		],
		70: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "UploadTrack",
					dialogName: "upload",
					openDialog() {
						if (GameSettings.isStandalone) {
							if (typeof GameManager != "undefined") {
								GameManager.command("dialog", this.dialogName);
							}
						} else if (Application.User.is_logged_in() === false) {
							Application.events.publish("prompt.login");
						} else if (typeof GameManager != "undefined") {
							GameManager.command("dialog", this.dialogName);
						}
					},
					render() {
						/** @type {string} */
						const langClass = "topMenu-button topMenu-button_import";
						/** @type {string} */
						const valueClassName =
							"editorgui_icons editorgui_icons-icon_upload";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.openDialog,
								title: "Publish Track",
							},
							React.createElement("span", {
								className: valueClassName,
							}),
							React.createElement(
								"span",
								{
									className: "text",
								},
								"Publish"
							)
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
		71: [
			function (require, module) {
				const React = require("react");
				const storeMixin = React.createClass({
					displayName: "ZoomLevel",
					resetZoom() {
						if (typeof GameManager != "undefined") {
							GameManager.command("reset zoom");
						}
					},
					render() {
						let expanderText = this.props.percent;
						if (!expanderText) {
							/** @type {number} */
							expanderText = 100;
						}
						/** @type {string} */
						const langClass =
							"topMenu-button topMenu-button-right topMenu-button_zoom";
						return React.createElement(
							"div",
							{
								className: langClass,
								onClick: this.resetZoom,
							},
							expanderText,
							"%"
						);
					},
				});
				module.exports = storeMixin;
			},
			{
				react: "react",
			},
		],
	},
	{},
	[1]
);
