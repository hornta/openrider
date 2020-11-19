/* eslint-disable */
import $ from "jquery";
import applicationSettings from "./applicationSettings";

function AjaxHelper() {}
AjaxHelper.prototype = {
	post(method, url, params) {
		return (
			(params = params || {}),
			(url = url || {}),
			(params.type = "POST"),
			this._request(method, url, params)
		);
	},
	get(obj, value, data) {
		return (
			(data = data || {}),
			(value = value || {}),
			(data.type = "GET"),
			this._request(obj, value, data)
		);
	},
	_request(label, data, config) {
		data.ajax = true;
		if (applicationSettings.app_signed_request) {
			data.app_signed_request = applicationSettings.app_signed_request;
		}
		if (applicationSettings.fb_signed_request) {
			data.signed_request = applicationSettings.fb_signed_request;
		}
		if (applicationSettings.fb_auth_expired) {
			data.fb_auth_expired = applicationSettings.fb_auth_expired;
		}
		if (applicationSettings.t_1) {
			data.t_1 = applicationSettings.t_1;
			if (applicationSettings.t_2) {
				data.t_2 = applicationSettings.t_2;
			}
		}
		if (label.indexOf("/") !== 0) {
			label = `/${label}`;
		}
		const options = {
			dataType: "json",
			url: applicationSettings.base_request_url + label,
			data,
			track: true,
			check_status: true,
			track_timings: false,
		};
		const startTime = new Date().getTime();
		const self = $.extend(options, config);
		const job = $.ajax(self);
		const javaScriptButton = this;
		return (
			job.done(this._set_app_signed_request),
			job.done(this._update_user),
			job.done(this._check_app_version),
			job.done(this._set_page_title),
			job.done(this._check_event_notification),
			job.done(this._fire_application_event),
			job.done(this._check_fb_auth_expired),
			job.done(this._update_game_settings),
			self.check_status == 1 && job.fail(this._check_status),
			self.track_timings == 1 &&
				job.done(function () {
					if (typeof Application.Helpers.GoogleAnalyticsHelper != "undefined") {
						const event = {
							timingLabel: label,
							start_time: startTime,
						};
						if (typeof data.templates != "undefined") {
							event.timingCategory = "templates";
							if ($.isArray(data.templates)) {
								event.timingLabel += data.templates.join(",");
							}
						}
						Application.Helpers.GoogleAnalyticsHelper.track_user_timing(event);
					}
				}),
			job.done(this._track_pixel),
			self.track == 1 &&
				job.done(function (canCreateDiscussions) {
					javaScriptButton._track_pageview(label);
				}),
			job
		);
	},
	_fire_application_event(annotationID) {
		Application.events.publish("ajax.request", annotationID);
	},
	_check_event_notification(simpleselect) {
		if (typeof Application.Views.AchievementNotificationView != "undefined") {
			if (!Application.AchievementNotification) {
				const descriptions = {
					web: true,
				};
				if (typeof FreeRider != "undefined") {
					/** @type {boolean} */
					descriptions.web = false;
				}
				Application.AchievementNotification = new Application.Views.AchievementNotificationView(
					descriptions
				);
			}
			if (
				typeof simpleselect.data != "undefined" &&
				(typeof simpleselect.data.achievements_earned != "undefined" &&
					$.each(simpleselect.data.achievements_earned, function (
						canCreateDiscussions,
						e
					) {
						Application.AchievementNotification.notify(e);
					}),
				typeof simpleselect.data.campaign_events != "undefined" &&
					$.each(simpleselect.data.campaign_events, function (
						canCreateDiscussions,
						e
					) {
						/** @type {boolean} */
						e.campaign_event = true;
						Application.AchievementNotification.notify(e);
					}),
				typeof simpleselect.data.leaderboard_passed_events != "undefined" &&
					$.each(simpleselect.data.leaderboard_passed_events, function (
						canCreateDiscussions,
						e
					) {
						Application.AchievementNotification.notify(e);
					}),
				typeof simpleselect.data.inventory_events != "undefined" &&
					$.each(simpleselect.data.inventory_events, function (
						canCreateDiscussions,
						e
					) {
						Application.AchievementNotification.notify(e);
					}),
				typeof simpleselect.data.rewarded_video_event != "undefined" &&
					simpleselect.data.rewarded_video_event.ad_network === "ironsource")
			) {
				try {
					if (
						typeof Application.settings.rewarded_ads.ironsource !=
							"undefined" &&
						Application.settings.rewarded_ads.ironsource.campaigns_ready
					) {
						Application.AchievementNotification.notify(
							simpleselect.data.rewarded_video_event
						);
					}
				} catch (n) {}
			}
		}
	},
	_check_status(merged) {
		const s = merged.status;
		if (s === 404) {
			Application.router.do_route(
				`${Application.settings.base_platform_url}/page-not-found`
			);
		}
		if (s === 500) {
			Application.router.do_route(
				`${Application.settings.base_platform_url}/error`
			);
		}
		if (s === 0) {
			window.location.reload();
		}
	},
	_set_app_signed_request(canCreateDiscussions) {
		if (typeof canCreateDiscussions.app_signed_request != "undefined") {
			Application.settings.app_signed_request =
				canCreateDiscussions.app_signed_request;
		}
	},
	_set_fb_signed_request(params) {
		if (typeof params.fb_signed_request != "undefined") {
			Application.settings.fb_signed_request = params.fb_signed_request;
		}
	},
	_update_game_settings(modelEtc) {
		if (modelEtc.game_settings) {
			GameSettings = _.extend(GameSettings, modelEtc.game_settings);
		}
	},
	_update_user(options) {
		if (
			typeof options.data != "undefined" &&
			typeof options.data.update_user != "undefined" &&
			options.data.update_user
		) {
			/** @type {boolean} */
			let hoverUser = false;
			/** @type {boolean} */
			let n = false;
			if (typeof options.data.user != "undefined") {
				hoverUser = options.data.user;
			}
			if (typeof options.data.user_stats != "undefined") {
				n = options.data.user_stats;
			}
			/** @type {boolean} */
			let r = false;
			try {
				if (window.parent !== window) {
					window.parent.Application;
				}
			} catch (i) {
				/** @type {boolean} */
				r = true;
			}
			if (
				r == 0 &&
				window.parent !== window &&
				window.parent.Application &&
				window.parent.Application.User
			) {
				window.parent.Application.User.set_user(hoverUser, n);
			} else if (Application.User) {
				Application.User.set_user(hoverUser, n);
			}
		}
	},
	_check_app_version(deploymentsVersions) {
		if (
			typeof deploymentsVersions.app_version != "undefined" &&
			typeof Application.settings.app_version != "undefined" &&
			Application.settings.app_version != deploymentsVersions.app_version
		) {
			/** @type {boolean} */
			Application.router.version_changed = true;
		}
	},
	_check_fb_auth_expired(canCreateDiscussions) {
		if (typeof canCreateDiscussions.fb_auth_expired != "undefined") {
			Application.settings.fb_auth_expired =
				canCreateDiscussions.fb_auth_expired;
		}
	},
	_set_page_title(data) {
		if (typeof data.app_title != "undefined") {
			document.title = data.app_title;
		}
	},
	_track_pixel(cardMask) {
		if (typeof cardMask.kl_px != "undefined") {
			if ($("#kl_px").length) {
				$("#kl_px").attr("src", cardMask.kl_px);
			} else {
				const linkCont = $(
					`<img name="kl_px" id="kl_px" width="1" height="1" src="${cardMask.kl_px}" style="display:none;" />`
				);
				$("body").append(linkCont);
			}
		}
	},
	_track_pageview(place) {
		if (typeof Application.Helpers.GoogleAnalyticsHelper != "undefined") {
			Application.Helpers.GoogleAnalyticsHelper.track_pageview({
				page: place,
			});
		}
	},
};

export default AjaxHelper;
