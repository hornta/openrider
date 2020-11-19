
  var helpers = Application.Helpers.TemplateHelper;
  var e = Application.Helpers.AjaxHelper;
  var model = Application.Helpers.ShareHelper;
  var next = ["home/home_frame", "home/home_header", "home/home_header_guest", "ads/leaderboard_1_ad", "ads/leaderboard_2_ad", "track_listing/track_listing", "track_listing/track_listing_frame", "track_listing/track_listing_tile", "campaign/campaign_track_listing_tile", "campaign/progress_bar", "ads/track_list_ad", "ads/mobile_track_list_promote", "ads/300x250_1_ad"];
  var HomeView = Backbone.View.extend({
    templates : [],
    events : {
      "click #home_signup" : "prompt_signup",
      "click #home_login" : "prompt_login",
      "click .home-page .tab_buttons li" : "handle_tab_click",
      "change .tab_buttons_select select" : "handle_select",
      "click .sprite-share_small" : "share",
      "click #add_to_chrome" : "add_to_chrome",
      "click #rate_chrome" : "rate_chrome",
      "click #instagram_follow" : "instagram_follow_click",
      "click #facebook_like" : "facebook_like_click",
      "click #youtube_subscribe" : "youtube_subscribe_click",
      "click #twitter_follow" : "twitter_follow_click",
      "click #invite_friends_banner" : "invite_friends",
      "click .campaign-tile-skip" : "skip_campaign",
      "click .mobile-incentive-button" : "mobile_incentive_click",
      "click .curr-daily-track" : "curr_daily_track_click",
      "click .prev-daily-track" : "prev_daily_track_click"
    },
    initialize : function(castNode) {
      this.initial_page_load = castNode.initial_page_load;
      if (castNode.initial_page_load === true) {
        this.setup();
      } else {
        this.getTemplates();
      }
    },
    _start_timer : function() {
      clearInterval(this.countdownTimer);
      var view_attachment = this.$(".home_header");
      var i = view_attachment.find("#daily-achievements").find(".time-remaining");
      var watcher = this;
      if (i.length > 0) {
        var whiteRating = parseInt(i.data("time"));
        this.countdownTimer = setInterval(function() {
          var existingChoices = view_attachment.find(".daily-achievements").find(".time-remaining");
          whiteRating--;
          if (0 >= whiteRating) {
            watcher.close();
            Application.events.publish("refresh");
          }
          var seconds_left = whiteRating;
          parseInt(seconds_left / 86400);
          seconds_left = seconds_left % 86400;
          var p = parseInt(seconds_left / 3600);
          seconds_left = seconds_left % 3600;
          var d = parseInt(seconds_left / 60);
          var a = parseInt(seconds_left % 60);
          if (10 > p) {
            p = "0" + p;
          }
          if (10 > d) {
            d = "0" + d;
          }
          if (10 > a) {
            a = "0" + a;
          }
          var countRep = existingChoices.length;
          var i = 0;
          for (; countRep > i; i++) {
            var c = existingChoices[i];
            if ("undefined" != typeof c) {
              c.innerHTML = " " + p + ":" + d + ":" + a;
            } else {
              clearInterval(watcher.countdownTimer);
            }
          }
        }, 1e3);
      }
    },
    init_track_list : function() {
      this.$(".trackList").each(function() {
        var $oElemDragged = $(this);
        if (0 == $oElemDragged.hasClass("track-list-with-promote")) {
          var element = $oElemDragged.find(".slider");
          element.css({
            width : "100%"
          });
          element.slick({
            dots : false,
            infinite : false,
            speed : 300,
            slidesToShow : 8,
            slidesToScroll : 3,
            prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></div>',
            nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></div>',
            touchThreshold : 12,
            responsive : [{
              breakpoint : 1700,
              settings : {
                slidesToShow : 7,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1500,
              settings : {
                slidesToShow : 6,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1280,
              settings : {
                slidesToShow : 5,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1024,
              settings : {
                slidesToShow : 4,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 850,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 520,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }]
          });
        }
      });
      this.$(".track-list-with-promote").each(function() {
        var $oElemDragged = $(this);
        if ($oElemDragged.hasClass("mobile-track-list-promote")) {
          var options = $oElemDragged.find(".slider");
          options.slick({
            dots : false,
            infinite : false,
            speed : 300,
            slidesToShow : 4,
            slidesToScroll : 2,
            prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></div>',
            nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></div>',
            touchThreshold : 12,
            responsive : [{
              breakpoint : 1700,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 1
              }
            }, {
              breakpoint : 1500,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 1280,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 1024,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 850,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 720,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 520,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }]
          });
        } else {
          options = $oElemDragged.find(".slider");
          options.slick({
            dots : false,
            infinite : false,
            speed : 300,
            slidesToShow : 6,
            slidesToScroll : 3,
            prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></div>',
            nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></div>',
            touchThreshold : 12,
            responsive : [{
              breakpoint : 1700,
              settings : {
                slidesToShow : 5,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1500,
              settings : {
                slidesToShow : 4,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1280,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1024,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 850,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 2
              }
            }, {
              breakpoint : 520,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }]
          });
        }
      });
      this.slideToNextCampaignTrack();
      this.$el.find(".home_header").css({
        width : "100%"
      }).slick({
        dots : true,
        infinite : false,
        arrows : false,
        speed : 300,
        slidesToShow : 6,
        slidesToScroll : 1,
        touchThreshold : 12,
        autoplay : true,
        autoplaySpeed : 6e3,
        responsive : [{
          breakpoint : 1700,
          settings : {
            slidesToShow : 5,
            slidesToScroll : 3
          }
        }, {
          breakpoint : 1200,
          settings : {
            slidesToShow : 3,
            slidesToScroll : 2
          }
        }, {
          breakpoint : 800,
          settings : {
            slidesToShow : 2,
            slidesToScroll : 1
          }
        }, {
          breakpoint : 600,
          settings : {
            slidesToShow : 1,
            slidesToScroll : 1,
            autoplay : true,
            autoplaySpeed : 4e3
          }
        }, {
          breakpoint : 320,
          settings : {
            slidesToShow : 1,
            slidesToScroll : 1,
            autoplay : true,
            autoplaySpeed : 4e3
          }
        }]
      });
      this.slickEnabled = true;
    },
    slideToNextCampaignTrack : function() {
      var $sharepreview = $(".trackList.campaign");
      var bcofl_checkbox = $sharepreview.find(".trackTile").not(".disabled").not(".complete");
      var options = $sharepreview.find(".slider");
      if (bcofl_checkbox.length > 0) {
        var editingEl = $(bcofl_checkbox[0]);
        if (editingEl.data("slick-index")) {
          var incomingLayer = editingEl.data("slick-index");
          options.slick("slickGoTo", incomingLayer);
        }
      }
    },
    destroy_track_list : function() {
      if (this.slickEnabled) {
        this.$(".trackList").each(function() {
          var $sharepreview = $(this);
          var element = $sharepreview.find(".slider");
          element.css({
            width : "2000px"
          });
          element.slick("unslick");
        });
        this.$el.find(".home_header").slick("unslick");
        this.slickEnabled = false;
      }
    },
    update_social_value : function(name) {
      e.post("/home/update_social_value/" + name);
    },
    instagram_follow_click : function() {
      this.update_social_value("instagram");
      var globalOptions = {
        category : "social_page_visits",
        action : "banner_click",
        label : "instagram"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
    },
    facebook_like_click : function() {
      this.update_social_value("facebook");
      var globalOptions = {
        category : "social_page_visits",
        action : "banner_click",
        label : "facebook"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
    },
    youtube_subscribe_click : function() {
      this.update_social_value("youtube");
      var globalOptions = {
        category : "social_page_visits",
        action : "banner_click",
        label : "youtube"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
    },
    twitter_follow_click : function() {
      this.update_social_value("twitter");
      var globalOptions = {
        category : "social_page_visits",
        action : "banner_click",
        label : "twitter"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
    },
    rate_chrome : function(event) {
      if (event) {
        event.preventDefault();
      }
      var globalOptions = {
        category : "cws-rate",
        action : "cws-rate-click",
        label : "cws-rate-home-link"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
      e.post("account/cws_rate", {});
      window.open("https://chrome.google.com/webstore/detail/free-rider-hd/emikpifndnjfkgofoglceekhkbaicbde/reviews", "_blank");
    },
    add_to_chrome : function(event) {
      if (event) {
        event.preventDefault();
      }
      if ("undefined" != typeof chrome) {
        chrome.webstore.install("", function() {
          window.location.replace("http://www.freeriderhd.com/auth/google_oauth2/auth/chromewebstore");
          var entry = {
            category : "cws-inline-install",
            action : "cws-inline-install-success"
          };
          if (Application.User.is_logged_in()) {
            entry.label = "loggedin-home";
          } else {
            entry.label = "new-home";
          }
          Application.Helpers.GoogleAnalyticsHelper.track_event(entry);
        }, function(yes_label) {
          var globalOptions = {
            category : "cws-inline-install",
            action : "cws-inline-install-fail",
            label : yes_label
          };
          Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
        });
      }
    },
    handle_tab_click : function(element) {
      var $el = $(element.currentTarget);
      var itemPanelName = $el.data("panel");
      var itemPanel = $(itemPanelName);
      $el.siblings().removeClass("active");
      $el.addClass("active");
      itemPanel.siblings().hide();
      itemPanel.show();
      var newfield = this.$(".tab_buttons_select").find("select");
      newfield.find("option:selected").prop("selected", false);
      newfield.find('option[data-panel="' + itemPanelName + '"]').prop("selected", "selected");
      Application.events.publish("resize");
    },
    mobile_incentive_click : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "mobile_incentive",
        action : "link_click",
        label : "homepage_banner",
        value : 1
      });
    },
    curr_daily_track_click : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "daily_track_promotion",
        action : "curr_daily_track",
        label : "homepage",
        value : 1
      });
    },
    prev_daily_track_click : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "daily_track_promotion",
        action : "prev_daily_track",
        label : "homepage",
        value : 1
      });
    },
    handle_select : function(event) {
      var $sharepreview = $(event.currentTarget);
      var itemPanelName = $sharepreview.find(":selected").data("panel");
      var itemPanel = $(itemPanelName);
      itemPanel.siblings().hide();
      itemPanel.show();
      var parent_li = this.$(".tab_buttons-container").find('li[data-panel="' + itemPanelName + '"]');
      parent_li.siblings().removeClass("active");
      parent_li.addClass("active");
      Application.events.publish("resize");
    },
    share : function(link) {
      var $share_link = $(link.target).closest(".sprite-share_small");
      var response = $share_link.data("service");
      var key = $share_link.parents(".share-info").data();
      key.share_item = "home";
      model.share(response, key);
    },
    prompt_login : function() {
      Application.events.publish("prompt.login");
    },
    prompt_signup : function() {
      Application.events.publish("prompt.signup");
    },
    invite_friends : function() {
      Application.Helpers.FacebookHelper.inviteFriends();
      var globalOptions = {
        category : "fb-invite",
        action : "fb-invite-open",
        label : "home-invite-button"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
    },
    close : function() {
      this.destroy_track_list();
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
      }
      this.unsubscribe();
    },
    unsubscribe : function() {
      Application.events.unsubscribe("resize", this.resizeHandler);
    },
    subscribe : function() {
      this.resizeHandler = this.resize.bind(this);
      Application.events.subscribe("resize", this.resizeHandler);
    },
    resize : function() {
      this.slideToNextCampaignTrack();
    },
    check_chrome_install : function() {
      if (null !== Application.getParentUrl()) {
        this.hide_chrome_store_button();
      }
      if ("undefined" != typeof chome && chrome.app.isInstalled) {
        this.hide_chrome_store_button();
      }
    },
    hide_chrome_store_button : function() {
      if (this.$(".splash-add-to-chrome").length > 0) {
        this.$(".splash-add-to-chrome").hide();
      }
    },
    skip_campaign : function(event) {
      var $ele = $(event.currentTarget);
      var i = $ele.data("id");
      var cost = $ele.data("cost");
      new Application.Views.CampaignSkipModal({
        id : i,
        cost : cost,
        success : function(retu_data) {
          Application.router.refresh();
        },
        fail : function(res) {
          alert(res.msg);
        },
        cancel : function() {
        }
      });
    },
    setup : function() {
      this.check_chrome_install();
      this.subscribe();
      if (this.initial_page_load) {
        this.init_track_list();
      } else {
        setTimeout(this.init_track_list.bind(this), 100);
      }
      this._start_timer();
      Application.events.publish("mainview.loaded", {
        left_nav : "home",
        initial_page_load : this.initial_page_load,
        page_class : "home menu"
      });
    },
    getTemplates : function() {
      var self = this;
      helpers.getTemplates(next, function(data) {
        self.templates = data;
        self.getData(function(t) {
          self.render(t);
          self.setup();
        });
      });
    },
    getData : function(cb) {
      var i = e.get("/");
      i.done(function(errReadDir) {
        cb(errReadDir);
      });
    },
    render : function(str) {
      var template = this.templates["home/home_frame"];
      var token = {
        "home/home_header" : this.templates["home/home_header"],
        "home/home_header_guest" : this.templates["home/home_header_guest"],
        "ads/leaderboard_1_ad" : this.templates["ads/leaderboard_1_ad"],
        "ads/leaderboard_2_ad" : this.templates["ads/leaderboard_2_ad"],
        "track_listing/track_listing" : this.templates["track_listing/track_listing"],
        "track_listing/track_listing_frame" : this.templates["track_listing/track_listing_frame"],
        "track_listing/track_listing_tile" : this.templates["track_listing/track_listing_tile"],
        "campaign/campaign_track_listing_tile" : this.templates["campaign/campaign_track_listing_tile"],
        "campaign/progress_bar" : this.templates["campaign/progress_bar"],
        "ads/track_list_ad" : this.templates["ads/track_list_ad"],
        "ads/mobile_track_list_promote" : this.templates["ads/mobile_track_list_promote"],
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"]
      };
      var y = str;
      var result = helpers.render(template, token, y);
      this.$el.html(result);
    }
  });
  AllViews.HomeView = HomeView;
}(Application.Views = Application.Views || {}), function(HTMLSectionBuilder) {
  var self = Application.Helpers.TemplateHelper;
  var bsBad = Application.Helpers.AjaxHelper;
  var HTMLSection = Backbone.View.extend({
    cached_templates : [],
    events : {
      "change .leaderboard-type select" : "change_type",
      "change .leaderboard-timespan select" : "change_timespan",
      "click .cat-page a" : "show_loading",
      "click .invite_friends_link" : "invite_friends",
      "click #invite_friends_button" : "invite_friends"
    },
    show_loading : function() {
      $(".leaderboard-loading").show();
    },
    change_type : function(event) {
      var $sharepreview = $(event.currentTarget);
      var newTypes = $sharepreview.find(":selected").data("type");
      this.options.type = newTypes;
      this.options.page = 1;
      this.show_loading();
      this._refresh();
    },
    change_timespan : function(event) {
      var $sharepreview = $(event.currentTarget);
      var interval = $sharepreview.find(":selected").data("timespan");
      this.options.timespan = interval;
      this.options.page = 1;
      this.show_loading();
      this._refresh();
    },
    _refresh : function() {
      var childExp = this._build_url();
      Application.router.do_route(childExp);
    },
    initialize : function(o) {
      if (this.options = o, o.initial_page_load) {
        this._setup();
      } else {
        var t = o.templates;
        var after = this._createTemplatesArray(t);
        var that = this;
        var delayedWrite = this._getLeaderboards();
        delayedWrite.done(function(href) {
          that._getTemplates(after, function(data) {
            data = that._mapTemplates(t, data);
            that._render(data, href);
            that._setup();
          });
        });
      }
      if (!("undefined" != typeof this.options.timespan && this.options.timespan)) {
        this.options.timespan = "lifetime";
      }
      if (!("undefined" != typeof this.options.type && this.options.type)) {
        this.options.type = "player";
      }
    },
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        left_nav : this.options.left_nav,
        initial_page_load : this.options.initial_page_load
      });
    },
    close : function() {
    },
    invite_friends : function() {
      if (Application.settings.is_web) {
        if (Application.User.is_logged_in()) {
          var NON_CAP_IDENTITY_REGEX = Application.User.get("u_name");
          Application.router.do_route(Application.settings.base_platform_url + "/u/" + NON_CAP_IDENTITY_REGEX + "/friends");
        } else {
          Application.events.publish("prompt.signup", {
            analytics : "leaderboard-invite-friends"
          });
        }
      } else {
        if (Application.settings.is_fb_canvas) {
          Application.Helpers.FacebookHelper.inviteFriends();
        }
      }
    },
    _subscribe : function() {
    },
    _build_url : function() {
      var text = "/leaderboards";
      var options = this.options;
      return options.type && (text = text + ("/" + options.type)), options.timespan && (text = text + ("/" + options.timespan)), options.page && (text = text + ("/" + options.page)), text;
    },
    _getLeaderboards : function() {
      var j = this._build_url();
      var repArr = bsBad.get(j);
      return repArr;
    },
    _createTemplatesArray : function(template) {
      var _ = [];
      return _.push(template.main), _ = _.concat(template.partials);
    },
    _mapTemplates : function(options, args) {
      var data = {};
      return data.main = args[options.main], data.partials = {}, $.each(options.partials, function(s, key) {
        data.partials[key] = args[key];
      }), data;
    },
    _getTemplates : function(section, callback) {
      var freeExports = this;
      self.getTemplates(section, function(templates) {
        freeExports.templates = templates;
        callback(templates);
      });
    },
    _render : function(data, target) {
      var styles = self.render(data.main, data.partials, target);
      this.$el.html(styles);
    }
  });
  HTMLSectionBuilder.LeaderboardsView = HTMLSection;
}(Application.Views = Application.Views || {}), function(s) {
  var self = Application.Helpers.TemplateHelper;
  var $mmaModSurveyOffline = Application.Helpers.AjaxHelper;
  var Article = Application.Helpers.MentionsHelper;
  var insight = Application.Helpers.GoogleAnalyticsHelper;
  var opts = Application.Helpers.ShareHelper;
  var next = ["user/profile_friend"];
  var adblockTester = Backbone.View.extend({
    events : {
      "click .friend-accept" : "accept_friend_request",
      "click .friend-deny" : "deny_friend_request",
      "click .friend-remove" : "remove_friend",
      "click .friends-invite-button" : "show_invite_friends",
      "click .friends-invite-close" : "hide_invite_friends",
      "click .profile-friends-type-tab" : "handle_friend_tab_click",
      "click .friends-invite-input .placeholder" : "focus_input",
      "propertychange .friends-invite-input input" : "hide_placeholder",
      "keydown .friends-invite-input input" : "hide_placeholder_and_check_input",
      "input .friends-invite-input input" : "hide_placeholder",
      "paste .friends-invite-input input" : "hide_placeholder",
      "focus .friends-invite-input input" : "fade_placeholder",
      "blur .friends-invite-input input" : "reset_placeholder",
      "click #send_friend_request" : "send_friend_request",
      "click #invite_friends_button" : "invite_friends",
      "click .share-icon" : "share_game",
      "click .share-input" : "share_game_input"
    },
    share_game : function(event) {
      var $share_link = $(event.currentTarget);
      var response = $share_link.data("service");
      var content = $share_link.parents(".share").data();
      content.share_item = "invite";
      opts.share(response, content);
    },
    share_game_input : function(event) {
      $(event.currentTarget).select();
    },
    initialize : function(castNode) {
      this._init_mentions();
    },
    close : function() {
      this._destory_mentions();
    },
    handle_friend_tab_click : function(event) {
      var e = $(event.currentTarget);
      this.$el.find(".profile-friends-type-tab.active").removeClass("active");
      e.addClass("active");
      var length = e.data("list");
      this.$el.find(".friend-list.active").removeClass("active");
      this.$el.find("." + length).addClass("active");
    },
    hide_invite_friends : function() {
      this.$el.removeClass("invite");
    },
    show_invite_friends : function() {
      this.$el.addClass("invite");
    },
    deny_friend_request : function(event) {
      var t = $(event.currentTarget).closest("li");
      var salesTeam = t.data("id");
      var icnClass = "decline";
      return this.response_to_friend_request({
        u_id : salesTeam,
        action : icnClass
      }, function(data) {
        t.remove();
        self.check_if_requests_pending();
        if (data.result === true) {
          insight.track_event({
            category : "friends",
            action : "friend-request-declined",
            label : "success",
            value : data.f_cnt
          });
        } else {
          insight.track_event({
            category : "friends",
            action : "friend-request-declined",
            label : "error-" + data.msg
          });
        }
      }), false;
    },
    accept_friend_request : function(event) {
      var t = $(event.currentTarget).closest("li");
      var salesTeam = t.data("id");
      var STATE_ACCEPT = "accept";
      var userInfo = this;
      return this.response_to_friend_request({
        u_id : salesTeam,
        action : STATE_ACCEPT
      }, function(data) {
        t.remove();
        userInfo.check_if_requests_pending();
        if (data.result === true) {
          userInfo.render_new_friend(data.user);
          insight.track_event({
            category : "friends",
            action : "friend-request-accepted",
            label : "success",
            value : data.f_cnt
          });
        } else {
          alert(data.msg);
          insight.track_event({
            category : "friends",
            action : "friend-request-accepted",
            label : "error-" + data.msg
          });
        }
      }), false;
    },
    response_to_friend_request : function(name, i) {
      var s = $mmaModSurveyOffline.post("friends/respond_to_friend_request", name);
      return s.done(function(ch) {
        i(ch);
      }), false;
    },
    check_if_requests_pending : function() {
      var rawNotifications = this.$(".friend-requests").find("li");
      if (rawNotifications.length <= 0) {
        var arrowDiv = '<li class="no-friends">\t\t\t\t\t\t\t\t\t\t\t\t<span class="bold blurb">You have no friend requests pending</span>\t\t\t\t\t\t\t\t\t\t\t </li>';
        this.$(".friend-requests").prepend(arrowDiv);
      }
    },
    remove_friend : function(event) {
      var $newelem = $(event.currentTarget).closest("li");
      var salesTeam = $newelem.data("id");
      var delayedWrite = $mmaModSurveyOffline.post("friends/remove_friend", {
        u_id : salesTeam
      });
      return delayedWrite.done(function(data) {
        if (data.result === true) {
          $newelem.remove();
          insight.track_event({
            category : "friends",
            action : "friend-removed",
            label : "success",
            value : data.f_cnt
          });
        } else {
          alert(data.msg);
          insight.track_event({
            category : "friends",
            action : "friend-removed",
            label : "error-" + data.msg
          });
        }
      }), false;
    },
    _init_mentions : function() {
      var a = this.$el.find(".friends-invite-input").find("input");
      var options = {
        regex : /^[a-zA-Z0-9_+\-.]*/g,
        css : {
          width : "323px"
        },
        trigger : ""
      };
      this.mentions = new Article(a, options);
    },
    _destory_mentions : function() {
      if ("undefined" != typeof this.mentions) {
        this.mentions.destroy();
      }
    },
    send_friend_request : function() {
      var matchValue2 = this;
      var knob_elem = this.$el.find(".friends-invite-input").find("input");
      var n = knob_elem.val();
      if ("undefined" != typeof this.mentions) {
        this.mentions.removeMentions();
      }
      var delayedWrite = $mmaModSurveyOffline.post("friends/send_friend_request", {
        u_name : n
      });
      delayedWrite.done(function(data) {
        var msg = '<span class="ico_moon icon-checkmark"></span>';
        if (data.result) {
          knob_elem.val("");
          insight.track_event({
            category : "friends",
            action : "friend-request-sent",
            label : "success",
            value : data.f_cnt
          });
        } else {
          msg = '<span class="ico_moon icon-close"></span>';
          insight.track_event({
            category : "friends",
            action : "friend-request-sent",
            label : "error-" + data.msg
          });
        }
        msg = msg + data.msg;
        matchValue2.$(".sent-request-response").html(msg);
      });
    },
    invite_friends : function() {
      Application.Helpers.FacebookHelper.inviteFriends();
    },
    show_invite_box : function() {
    },
    show_all_friends : function() {
    },
    show_friend_requests : function() {
    },
    render_new_friend : function(file) {
      var matchValue2 = this;
      self.getTemplates(next, function(view_class) {
        var c = view_class["user/profile_friend"];
        var comment = self.render(c, {}, file);
        matchValue2.$(".friends-all").prepend(comment);
        var otweets = matchValue2.$(".friends-all").find(".no-friends");
        if (otweets.length > 0) {
          otweets.remove();
        }
        var ATTRIBUTES = matchValue2.$(".profile-friends-type-tab-all").find(".count");
        var o = matchValue2.$(".profile-friends-type-tab-requests").find(".count");
        var r = $(".friend-request-notification");
        var stat = parseInt(ATTRIBUTES.text()) + 1;
        var s = parseInt(o.text()) - 1;
        ATTRIBUTES.text(stat);
        o.text(s);
        if (s > 0) {
          r.text(s);
        } else {
          r.remove();
        }
      });
    },
    focus_input : function(jEvent) {
      var settingsItem = $(jEvent.target).closest(".placeholder").parents(".friends-invite-input");
      var checkedInput = settingsItem.find("input");
      checkedInput.trigger("focus");
    },
    hide_placeholder : function(e) {
      $(e.target).closest("input").parents(".friends-invite-input").find(".placeholder").hide();
    },
    hide_placeholder_and_check_input : function(e) {
      if (13 === e.keyCode) {
        this.send_friend_request();
      }
      this.hide_placeholder(e);
    },
    fade_placeholder : function(jEvent) {
      var filteredView = $(jEvent.target).closest("input").parents(".friends-invite-input");
      filteredView.find(".friends-invite-input").addClass("outlined");
      filteredView.find(".track-comment-actions").show();
      filteredView.find(".placeholder").addClass("faded");
    },
    reset_placeholder : function(e) {
      var settingsItem = $(e.target).parents(".friends-invite-input");
      settingsItem.find(".friends-invite-input").removeClass("outlined");
      var knob_elem = settingsItem.find("input");
      if ("" === knob_elem.val()) {
        settingsItem.find(".track-comment-actions").hide();
        settingsItem.find(".placeholder").show().removeClass("faded");
      }
    }
  });
  s.UserProfileFriendsView = adblockTester;
}(Application.Views = Application.Views || {}), function(app) {
  var self = Application.Helpers.TemplateHelper;
  var $http = Application.Helpers.AjaxHelper;
  var ToastrComponent = Application.Views.UserProfileFriendsView;
  var insight = Application.Helpers.GoogleAnalyticsHelper;
  var next = ["user/profile_frame", "user/profile_header", "user/profile_tabs", "user/profile_friends", "user/profile_friend", "user/profile_friend_request", "user/profile_moderation", "track_listing/track_listing_frame", "track_listing/track_listing_tile", "ads/leaderboard_2_ad", "ads/300x250_1_ad", "ads/track_list_ad"];
  var com_cloudant_meta = Backbone.View.extend({
    friends_view : null,
    templates : [],
    events : {
      "click .tab-active-name" : "toggle_tab_dropdown",
      "click .tab_buttons li" : "handle_tab_click",
      "change .tab_buttons_select select" : "handle_select",
      "click #send_verify_account" : "send_verify_account",
      "click .profile-account-settings" : "show_profile_settings_dd",
      "click .profile-account-settings-link" : "account_settings",
      "click .profile-account-settings-logout" : "logout",
      "click #subscribe_to_author" : "toggle_author_subscribe",
      "click .mobile-incentive-btn-android" : "mobile_incentive_click_android",
      "click .mobile-incentive-btn-ios" : "mobile_incentive_click_ios",
      "click #toggle-official-author" : "toggle_official_author",
      "click #pm-change-username-save" : "moderation_change_username",
      "click #pm-change-email-save" : "moderation_change_email",
      "click #pm-ban-user" : "moderation_ban_user",
      "click #pm-unban-user" : "moderation_unban_user",
      "click #pm-change-username-save" : "moderation_change_username",
      "click #pm-change-email-save" : "moderation_change_email"
    },
    moderation_ban_user : function(event) {
      var t = $(event.currentTarget);
      t.addClass("disabled");
      var s = $("#profile-user-data").data("u_id");
      var delayedWrite = $http.post("moderator/ban_user", {
        u_id : s
      });
      delayedWrite.done(function(data) {
        if (1 == data.result) {
          $("#pm-unban-user").show();
          t.hide();
        }
        t.removeClass("disabled");
        window.alert(data.msg);
      });
    },
    moderation_unban_user : function(event) {
      var t = $(event.currentTarget);
      t.addClass("disabled");
      var s = $("#profile-user-data").data("u_id");
      var delayedWrite = $http.post("moderator/unban_user", {
        u_id : s
      });
      delayedWrite.done(function(data) {
        if (1 == data.result) {
          $("#pm-ban-user").show();
          t.hide();
        }
        t.removeClass("disabled");
        window.alert(data.msg);
      });
    },
    moderation_change_username : function(event) {
      var t = $(event.currentTarget);
      t.addClass("disabled");
      var s = $("#profile-user-data").data("u_id");
      var inputUsername = $("#pm-change-username-input").val();
      var delayedWrite = $http.post("moderator/change_username", {
        u_id : s,
        username : inputUsername
      });
      delayedWrite.done(function(err) {
        t.removeClass("disabled");
        window.alert(err.msg);
      });
    },
    moderation_change_email : function(event) {
      var t = $(event.currentTarget);
      t.addClass("disabled");
      var s = $("#profile-user-data").data("u_id");
      var unameOther = $("#pm-change-email-input").val();
      var delayedWrite = $http.post("moderator/change_email", {
        u_id : s,
        email : unameOther
      });
      delayedWrite.done(function(err) {
        t.removeClass("disabled");
        window.alert(err.msg);
      });
    },
    handle_tab_click : function(element) {
      var $el = $(element.currentTarget);
      var itemPanelName = $el.data("panel");
      var itemPanel = $(itemPanelName);
      $el.siblings().removeClass("active");
      $el.addClass("active");
      itemPanel.siblings().hide();
      itemPanel.show();
      var newfield = this.$(".tab_buttons_select").find("select");
      newfield.find("option:selected").prop("selected", false);
      newfield.find('option[data-panel="' + itemPanelName + '"]').prop("selected", "selected");
      Application.events.publish("resize");
    },
    handle_select : function(event) {
      var $sharepreview = $(event.currentTarget);
      var itemPanelName = $sharepreview.find(":selected").data("panel");
      var itemPanel = $(itemPanelName);
      itemPanel.siblings().hide();
      itemPanel.show();
      var parent_li = this.$(".tab_buttons-container").find('li[data-panel="' + itemPanelName + '"]');
      parent_li.siblings().removeClass("active");
      parent_li.addClass("active");
      Application.events.publish("resize");
    },
    close_dd : function(canCreateDiscussions) {
      this.$(".profile-account-settings").removeClass("active");
    },
    show_profile_settings_dd : function(event) {
      event.stopPropagation();
      var formsearch = $(event.currentTarget);
      formsearch.addClass("active");
      $("html").off("click.profile-account-settings");
      $("html").on("click.profile-account-settings", this.close_dd.bind(this));
    },
    initialize : function(options) {
      this.username = options.username;
      this.initial_page_load = options.initial_page_load;
      this.flag = options.flag;
      if (options.initial_page_load === true) {
        this.setup();
      } else {
        this.getTemplates();
      }
    },
    account_settings : function(event) {
      event.preventDefault();
      var imageelement = $(event.currentTarget);
      var childExp = imageelement.data("href");
      return Application.router.do_route(childExp), false;
    },
    logout : function(event) {
      event.preventDefault();
      Application.User.logout();
      this.close_dd();
    },
    toggle_official_author : function(event) {
      var self = $(event.currentTarget);
      self.addClass("disabled");
      var paramsUrl = $("#profile-user-data").data("u_id");
      var input = $(".classic_author_icon");
      var delayedWrite = $http.get("moderator/toggle_official_author/" + paramsUrl);
      delayedWrite.done(function(event) {
        self.removeClass("disabled");
        if (1 == event.result) {
          if (self.hasClass("oa")) {
            self.text("Set OA");
          } else {
            self.text("Remove OA");
          }
          input.toggleClass("remove");
          self.toggleClass("oa");
        } else {
          alert(event.msg);
        }
      });
    },
    close : function() {
      this.close_friends_view();
      $("html").off("click.profile-account-settings");
    },
    subscribe : function() {
    },
    mobile_incentive_click_android : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "mobile_incentive",
        action : "link_click",
        label : "profile_android",
        value : 1
      });
    },
    mobile_incentive_click_ios : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "mobile_incentive",
        action : "link_click",
        label : "profile_ios",
        value : 1
      });
    },
    send_verify_account : function() {
      var delayedWrite = $http.post("account/resend_verification_email", {});
      delayedWrite.done(function(jdata) {
        if (jdata.result) {
          $("#account_verify_reminder").attr("class", "alert-message success");
        }
        $("#account_verify_reminder").html("<p>" + jdata.msg + "</p>");
        setTimeout(function() {
          $("#account_verify_reminder").hide();
        }, 5e3);
        jdata = null;
      });
    },
    init_profile_stat_scrollbar : function() {
      var t = $("#profile-stat-scroller");
      var syncedAnimals = $("#profile-stats").find(".stat");
      var d = 0;
      syncedAnimals.each(function(i, entryEl) {
        d = d + (parseInt($(entryEl).css("width").replace("px", "")) + 10);
      });
      t.width(d);
      this.profile_stat_scroll = new IScroll("#profile-stats", {
        scrollX : true,
        scrollY : false,
        mouseWheel : true,
        interactiveScrollbars : true,
        click : true,
        scrollbars : "custom"
      });
    },
    get_user_data : function() {
      return $("#profile-user-data").data();
    },
    toggle_tab_dropdown : function() {
      var $parent = this.$el.find(".tab-buttons");
      $parent.toggleClass("closed");
    },
    setup : function() {
      if (0 == $("#player_is_deactivated").length) {
        this.subscribe();
        this.init_friends_view();
      }
      Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load
      });
    },
    close_friends_view : function() {
      if (this.friends_view) {
        this.friends_view.close();
        this.friends_view.$el.unbind();
      }
    },
    init_friends_view : function() {
      this.close_friends_view();
      this.friends_view = new ToastrComponent({
        el : this.$el.find(".profile-friends")
      });
    },
    toggle_author_subscribe : function(event) {
      var $button = $(event.currentTarget);
      var obj = this.get_user_data();
      if ($button.hasClass("subscribed")) {
        this.unsubscribe_from_author(obj.u_id);
      } else {
        this.subscribe_to_author(obj.u_id);
      }
    },
    subscribe_to_author : function(vertexSet) {
      var t = $("#subscribe_to_author_container");
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = $http.post("/track_api/subscribe", {
          sub_uid : vertexSet,
          subscribe : 1
        });
        delayedWrite.done(this.subscribe_to_author_response.bind(this));
        delayedWrite.done(function() {
          t.removeClass("disabled");
          t = null;
        });
      }
    },
    unsubscribe_from_author : function(vertexSet) {
      var t = $("#subscribe_to_author_container");
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = $http.post("/track_api/subscribe", {
          sub_uid : vertexSet,
          subscribe : 0
        });
        delayedWrite.done(this.unsubscribe_from_author_response.bind(this));
        delayedWrite.done(function() {
          t.removeClass("disabled");
          t = null;
        });
      }
    },
    subscribe_to_author_response : function(data) {
      if (0 == data.result) {
        alert(data.msg);
        insight.track_event({
          category : "subscriptions",
          action : "subscribe-error",
          label : "error-" + data.msg
        });
      } else {
        var $copyFrom = $("#subscribe_to_author_count");
        $copyFrom.text(data.data.subscriber_cnt);
        this.switch_to_unsubscribe();
        insight.track_event({
          category : "subscriptions",
          action : "subscribe",
          label : "subscribe-track",
          value : data.data.subscriber_cnt
        });
      }
    },
    unsubscribe_from_author_response : function(data) {
      if (0 == data.result) {
        alert(data.msg);
        insight.track_event({
          category : "subscriptions",
          action : "unsubscribe-error",
          label : "error-" + data.msg
        });
      } else {
        var $copyFrom = $("#subscribe_to_author_count");
        $copyFrom.text(data.data.subscriber_cnt);
        this.switch_to_subscribe();
        insight.track_event({
          category : "subscriptions",
          action : "unsubscribe",
          label : "unsubscribe-track",
          value : data.data.subscriber_cnt
        });
      }
    },
    switch_to_subscribe : function() {
      var $button = $("#subscribe_to_author");
      $button.removeClass("subscribed");
      $button.text("Subscribe");
    },
    switch_to_unsubscribe : function() {
      var button = $("#subscribe_to_author");
      button.addClass("subscribed");
      button.text("Unsubscribe");
    },
    getTemplates : function() {
      var _this = this;
      self.getTemplates(next, function(data) {
        _this.templates = data;
        _this.getUserData(function(t) {
          _this.render(t);
          _this.setup();
        });
      });
    },
    getUserData : function(callback) {
      var val = "/u/" + this.username;
      if (this.flag) {
        val = val + ("/" + this.flag);
      }
      var s = $http.get(val);
      s.done(function(identifierPositions) {
        callback(identifierPositions);
      });
    },
    render : function(value) {
      var t = this.templates["user/profile_frame"];
      var list = {
        "user/profile_header" : this.templates["user/profile_header"],
        "user/profile_tabs" : this.templates["user/profile_tabs"],
        "user/profile_friends" : this.templates["user/profile_friends"],
        "user/profile_friend" : this.templates["user/profile_friend"],
        "user/profile_moderation" : this.templates["user/profile_moderation"],
        "user/profile_friend_request" : this.templates["user/profile_friend_request"],
        "track_listing/track_listing_frame" : this.templates["track_listing/track_listing_frame"],
        "track_listing/track_listing_tile" : this.templates["track_listing/track_listing_tile"],
        "ads/leaderboard_2_ad" : this.templates["ads/leaderboard_2_ad"],
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"],
        "ads/track_list_ad" : this.templates["ads/track_list_ad"]
      };
      var val = self.render(t, list, value);
      this.$el.html(val);
    }
  });
  app.UserProfileView = com_cloudant_meta;
}(Application.Views = Application.Views || {}), function(igv) {
  var self = Application.Helpers.TemplateHelper;
  var db = Application.Helpers.AjaxHelper;
  var button = Application.Helpers.ShareHelper;
  var IEListenerHandle = Application.Helpers.MentionsHelper;
  var that = Application.Helpers.GoogleAnalyticsHelper;
  var me = Application.Helpers.FacebookHelper;
  var utils = Application.Helpers.AdsHelper;
  var d = ["track/track_frame", "track_listing/track_listing_frame", "track/totd_entries"];
  var moreCrawlerUserAgents = ["track_listing/track_listing_tile", "track_listing/track_column"];
  var callback = ["campaign/campaign_column", "campaign/campaign_track_listing_tile", "campaign/campaign_list"];
  var name = ["track/track_comments", "track/track_comment"];
  var next = ["track/track_leaderboard", "track/track_race_leaderboard", "track/track_friends_leaderboard"];
  var miscFns = ["ads/300x250_1_ad", "ads/300x250_2_ad", "ads/leaderboard_1_ad", "ads/leaderboard_2_ad"];
  var checkRequired = ["help/desktop_controls", "help/mobile_controls"];
  var keys = {
    ENTER : 13
  };
  var run = null;
  var igvjs_version = Backbone.View.extend({
    gameContainerId : "#game-container",
    $gameContainer : null,
    is_campaign_track : false,
    campaignSkipView : null,
    trackUploadShareView : null,
    templates : [],
    trackCdnUrl : null,
    trackId : null,
    prerollAdShown : false,
    isPlayingAd : false,
    events : {
      "click .tab_buttons li" : "handle_tab_click",
      "change .tab_buttons_select select" : "handle_select",
      "click .track-about-panel.share .nav li" : "handle_share_submenu_click",
      "click .about-show-more-less a" : "toggle_about",
      "click .track-rate .track-rate-button" : "rate_track",
      "click #track-help" : "toggle_help_view",
      "click .track-comment-input .placeholder" : "focus_input",
      "propertychange .track-comment-input input" : "hide_placeholder",
      "keydown .track-comment-input input" : "hide_placeholder_and_check_input",
      "input .track-comment-input input" : "hide_placeholder",
      "paste .track-comment-input input" : "hide_placeholder",
      "focus .track-comment-input input" : "fade_placeholder",
      "blur .track-comment-input input" : "reset_placeholder",
      "click #track-comment-cancel" : "cancel_comment",
      "click #track-comment-post" : "post_comment",
      "click .track-comment-flag" : "confirm_flag",
      "click .track-comment-confirm-flag .no" : "confirm_flag_no",
      "click .track-comment-confirm-flag .yes" : "confirm_flag_yes",
      "click .show-hide-comment" : "show_hide_comment",
      "click .track-comment-delete" : "confirm_delete",
      "click .track-comment-confirm-delete .no" : "confirm_delete_no",
      "click .track-comment-confirm-delete .yes" : "confirm_delete_yes",
      "click #load-more-comments" : "load_comments",
      "click .track-comment-reply" : "reply_comment",
      "click .track-flag" : "confirm_track_flag",
      "click .track-confirm-flag .no" : "confirm_track_flag_no",
      "click .track-confirm-flag .yes" : "confirm_track_flag_yes",
      "click .track-leaderboard-race" : "load_race",
      "click #leaderboard_signup" : "signup_prompt",
      "click #friends-leaderboard-signup" : "signup_prompt_friends",
      "click #friends-leaderboard-add-invite" : "invite_friends_leaderboard",
      "click #friends-leaderboard-challenge" : "challenge_friends_dialog",
      "click #facebook_share_challenge" : "challenge_friends_dialog",
      "click .leaderboard-show-toggle" : "toggle_show_more_leaderboard",
      "click #cancel_challenge" : "clear_race",
      "click .track-about-share .sprite-share_small" : "share_track",
      "click .track-about-challenge .sprite-share_small" : "share_challenge",
      "click #facebook_share_track" : "share_track",
      "click .track-signup" : "prompt_signup",
      "click .track-login" : "prompt_login",
      "change .track-about-embed-select" : "change_embed",
      "click .campaign-tile-skip" : "skip_campaign_track_clickhandler",
      "click #remove_featured_track" : "remove_featured_track",
      "click #add_featured_track" : "add_featured_track",
      "click #hide_track" : "hide_track",
      "click #subscribe_to_author" : "toggle_author_subscribe",
      "click #show-mobile-play-screen" : "toggleGameView",
      "click .add-track-of-the-day-btn" : "add_track_of_the_day",
      "click .remove-track-of-the-day-btn" : "remove_track_of_the_day",
      "click .moderator-remove-race" : "remove_race"
    },
    remove_race : function(event) {
      var i = this._get_track_id();
      var s = $(event.currentTarget).data("u_id");
      if (window.confirm("Are you sure you want to remove this race?")) {
        var n = this;
        var delayedWrite = db.post("moderator/remove_race", {
          t_id : i,
          u_id : s
        });
        delayedWrite.done(function(event) {
          if (1 == event.result) {
            n.refresh_leaderboard();
          } else {
            alert(event.msg);
          }
        });
      }
    },
    clear_race : function() {
      $("#race_leaderboard").hide();
      GameManager.command("clear race");
      GameSettings.raceUids = [];
      GameManager.loadRacesFromSettings();
    },
    load_race : function(jEvent) {
      var cookies = $(jEvent.target).parents(".track-leaderboard-race-row");
      var researchTemp = cookies.data("u_id");
      if ("undefined" != typeof GameManager) {
        var character = this._get_track_id();
        GameManager.loadRace(character, researchTemp, true);
        Application.events.publish("scrollTo", {
          x : 0,
          y : 0
        });
      }
    },
    handle_tab_click : function(element) {
      var $el = $(element.currentTarget);
      var itemPanelName = $el.data("panel");
      var itemPanel = $(itemPanelName);
      if ("rate" !== $(element.currentTarget).data("skip")) {
        $el.siblings().removeClass("active");
        $el.addClass("active");
      }
      itemPanel.siblings(".track-about-panel").hide();
      itemPanel.show();
      var newfield = this.$(".tab_buttons_select").find("select");
      newfield.find("option:selected").prop("selected", false);
      newfield.find('option[data-panel="' + itemPanelName + '"]').prop("selected", "selected");
      Application.events.publish("resize");
    },
    handle_select : function(event) {
      var $sharepreview = $(event.currentTarget);
      var itemPanelName = $sharepreview.find(":selected").data("panel");
      var itemPanel = $(itemPanelName);
      itemPanel.siblings(".tab-panel").hide();
      itemPanel.show();
      var parent_li = this.$(".tab_buttons-container").find('li[data-panel="' + itemPanelName + '"]');
      parent_li.siblings().removeClass("active");
      parent_li.addClass("active");
      Application.events.publish("resize");
    },
    remove_featured_track : function(event) {
      var t = $(event.currentTarget);
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var newActiveEntry = t.siblings(".new-button");
        var update_id = this._get_track_id();
        var delayedWrite = db.get("track_api/feature_track/" + update_id + "/0");
        delayedWrite.done(function(event) {
          if (1 == event.result) {
            t.removeClass("active");
            newActiveEntry.addClass("active");
          } else {
            alert(event.msg);
          }
          t.removeClass("disabled");
        });
      }
    },
    add_featured_track : function(event) {
      var t = $(event.currentTarget);
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var newActiveEntry = t.siblings(".new-button");
        var i = this._get_track_id();
        var delayedWrite = db.get("track_api/feature_track/" + i + "/1");
        delayedWrite.done(function(event) {
          if (1 == event.result) {
            t.removeClass("active");
            newActiveEntry.addClass("active");
          } else {
            alert(event.msg);
          }
          t.removeClass("disabled");
        });
      }
    },
    hide_track : function(event) {
      var input = $(event.currentTarget);
      input.addClass("disabled");
      var design_doc_name = this._get_track_id();
      var delayedWrite = db.get("moderator/hide_track/" + design_doc_name);
      delayedWrite.done(function(event) {
        input.removeClass("disabled");
        if (1 == event.result) {
          if (input.hasClass("remove")) {
            input.text("Hide Track");
          } else {
            input.text("Unhide Track");
          }
          input.toggleClass("remove");
        } else {
          alert(event.msg);
        }
      });
    },
    initialize : function(options) {
      this.closing = false;
      this.options = options;
      this.flag = options.flag;
      this.races = [];
      this.initial_page_load = options.initial_page_load;
      if (options.random) {
        this.random = true;
      } else {
        this.trackname = options.trackname;
      }
      if (options.race_unames_path) {
        this.race_unames_path = options.race_unames_path;
      }
      if (this.initial_page_load === true) {
        this.bind_skip_campaign_column();
        this.setup();
      } else {
        this.getTemplates();
      }
    },
    load_preroll_ads : function() {
      if (this.prerollAdShown === false && $("#adContainer").length > 0) {
        var value = Application.settings.base_platform_url + "/t/" + this._get_track_id();
        var cssChanges = this._get_game_container();
        var s = cssChanges.width();
        var min_height = cssChanges.height();
        Application.events.publish("game.prerollAdPlaying");
        utils.init(s, min_height, encodeURIComponent(value));
        this.prerollAdShown = true;
        that.track_event({
          category : "ads",
          action : "ads-preroll-initiated",
          label : "google"
        });
      }
    },
    show_play_button : function() {
      var currentArrowButton = this.$mobilePlayScreen;
      if (!currentArrowButton) {
        this.$mobilePlayScreen = currentArrowButton = $("#mobilePlayScreen");
      }
      currentArrowButton.removeClass("show-rotate").addClass("show-play");
    },
    show_rotate_icon : function() {
      var currentArrowButton = this.$mobilePlayScreen;
      if (!currentArrowButton) {
        this.$mobilePlayScreen = currentArrowButton = $("#mobilePlayScreen");
      }
      currentArrowButton.removeClass("show-play").addClass("show-rotate");
    },
    change_embed : function(event) {
      var geckoTable = $(event.currentTarget).find(":selected");
      var e_width = geckoTable.data("embed_width");
      var e_height = geckoTable.data("embed_height");
      var a = this._get_track_slug();
      var o = '<iframe width="{{{width}}}" height="{{{height}}}" src="{{{base_platform_external_url}}}/game/{{{track_slug}}}?embedded=true" frameborder="0" allowfullscreen style="border: 1px solid #000;"></iframe>';
      var $inputEl = this.$(".track-about-embed-input");
      var options = {
        width : e_width,
        height : e_height,
        track_slug : a
      };
      var html = self.render(o, {}, options);
      $inputEl.val(html);
    },
    toggle_show_more_leaderboard : function(event) {
      var t = $(event.currentTarget).closest("table");
      t.toggleClass("show_hidden");
    },
    subscribe : function() {
      this.resize_proxy = $.proxy(this.resize, this);
      Application.events.subscribe("resize", this.resize_proxy);
      Application.events.subscribe("game.showAbout", this.gameShowAbout.bind(this));
      Application.events.subscribe("game.showHelp", this.gameShowHelp.bind(this));
      Application.events.subscribe("game.showChallenge", this.gameShowChallenge.bind(this));
      Application.events.subscribe("game.skipTrack", this.skip_campaign_track.bind(this));
      Application.events.subscribe("game.prerollAdPlaying", this.adStartedPlaying.bind(this));
      Application.events.subscribe("game.prerollAdStopped", this.adStoppedPlaying.bind(this));
      Application.events.subscribe("notification.leaderboard.click", this.highlightLeaderboad.bind(this));
    },
    adStartedPlaying : function() {
      this.isPlayingAd = true;
      this.unFocusOnGame();
    },
    adStoppedPlaying : function() {
      this.isPlayingAd = false;
      this.focusOnGame();
      this.resetAdContainer();
    },
    highlightLeaderboad : function() {
      this.unfullscreenGame();
      var target = $("#track_best_times");
      this.scrollToElement(target, 0, -100);
      target.addClass("animated flash");
    },
    gameShowAbout : function() {
      this.unfullscreenGame();
      this.show_about();
      var target = $("#track_about_button");
      this.scrollToElement(target, 0, -100);
    },
    gameShowHelp : function() {
      this.unfullscreenGame();
      this.show_help_view();
      var target = $("#track_help_button");
      this.scrollToElement(target, 0, -100);
    },
    gameShowChallenge : function() {
      this.unfullscreenGame();
      if (Application.User.is_logged_in()) {
        this.challenge_friends();
      } else {
        this.prompt_signup();
      }
    },
    resize : function() {
      var checked = this.isLandscapeMode();
      if (this.landscape != checked) {
        this.landscape = checked;
        if (!this.landscape) {
          this.unfullscreenGame();
        }
      }
      if (checked) {
        this.show_play_button();
      } else {
        this.show_rotate_icon();
      }
      this.resizeGame();
      this.resizeAdContainer();
    },
    isLandscapeMode : function() {
      return window.innerWidth > window.innerHeight;
    },
    resizeAdContainer : _.debounce(function() {
      var cssChanges = this._get_game_container();
      var e = cssChanges.width();
      var height = cssChanges.height();
      var _error = $(window).width();
      var autoHeight = $(window).height();
      if (e > $(window).width()) {
        e = _error;
      }
      if (height > $(window).height()) {
        height = autoHeight;
      }
      utils.resize(e, height);
    }, 700),
    resetAdContainer : function() {
      var e = $("#mainContainer");
      var $existing_results = $("#adContainer");
      var t = $("#track-data");
      if (GameSettings.mobile && e.length > 0 && $existing_results.length > 0 && t.length > 0) {
        e.css("display", "none");
        t.append(e);
      }
    },
    toggleGameViewTimeout : null,
    toggleGameView : function() {
      if (this.fullscreen) {
        this.unfullscreenGame();
      } else {
        this.fullscreenGame();
      }
    },
    resizeGame : function() {
      var paddingHandleBottom = this._get_game_container();
      var cloneH = paddingHandleBottom.width();
      var t = $(window).height();
      var notWindow = window.parent !== window;
      var tempW = "100%";
      var y = 0;
      var canvas = {};
      var scale = 9 / 16;
      if (this.fullscreen) {
        y = window.innerHeight;
      } else {
        var subMax = 650;
        if (0 == notWindow) {
          subMax = 600 >= t ? 425 : 768 >= t ? 550 : 800 >= t ? 575 : 1050 >= t ? 600 : 750;
        } else {
          if ("fb_canvas" === Application.settings.platform) {
            scale = 0.54;
          }
        }
        var width = 650;
        var max = Math.round(cloneH * scale);
        width = 650 >= max ? max : 650;
        max = Math.min(width, subMax);
        y = Math.max(max, 425);
      }
      canvas.height = y;
      canvas.width = tempW;
      paddingHandleBottom.css(canvas);
      GameManager.resize();
    },
    back : function() {
      Application.events.publish("router.back");
    },
    challenge_friends_dialog : function() {
      var e = this._get_track_slug();
      if ("mobile" === Application.settings.device) {
        Application.router.do_route("/challenge/track/" + e);
      } else {
        new Application.Views.AddInviteChallengeFriendsDialog({
          track_slug : e
        });
      }
    },
    invite_friends_leaderboard : function() {
      if (Application.User.is_logged_in()) {
        var pagesNum = Application.User.get("u_name");
        var childExp = "u/" + pagesNum + "/friends";
        Application.router.do_route(childExp, {
          trigger : true,
          replace : false
        });
      }
    },
    navigate : function(e) {
      Application.router.do_route(e, {
        trigger : true,
        replace : false
      });
    },
    play_random : function() {
      Application.router.do_route("random/track", {
        trigger : true,
        replace : false
      });
    },
    close : function() {
      this.closing = true;
      this.$el.unbind();
      if ("function" == typeof this.resize_proxy) {
        Application.events.unsubscribe("resize", this.resize_proxy);
      }
      Application.events.unsubscribe("game", true);
      this.campaignSkipView = null;
      if (this.trackUploadShareView) {
        this.trackUploadShareView.close();
        this.trackUploadShareView = null;
      }
      this.unfullscreenGame();
      this.closeGame();
      if (GameSettings.mobile) {
        this.showMobileClosingButton();
      }
      $("#right_content").unbind();
    },
    closeGame : function() {
      var fs = GameSettings.fullscreen;
      GameSettings.fullscreen = fs;
      if (this.stateChangedHandler) {
        GameManager.removeListener("stateChange", this.stateChangedHandler);
      }
      if (this.gameInitialized) {
        GameManager.close();
        React.unmountComponentAtNode(this._get_game_container()[0]);
        this.unlistenForGameFocusEvents();
        this.unlistenFromGameComplete();
        this.gameInitialized = false;
      }
    },
    scrollToElement : function(ele, callback, offset) {
      callback = "undefined" != typeof callback ? callback : 1e3;
      offset = "undefined" != typeof offset ? offset : 0;
      var container = ele;
      var top_menu_offset = container.offset();
      var newPos = top_menu_offset.top + offset;
      if ("fb_canvas" === Application.settings.platform) {
        Application.events.publish("scrollTo", {
          x : 0,
          y : newPos
        });
      } else {
        $("html, body").animate({
          scrollTop : newPos
        }, callback);
      }
    },
    challenge_friends : function() {
      if (that.track_event({
        category : "challenge-share",
        action : "challenge-share-view",
        label : "in-game"
      }), this.challenge_friends_dialog(), !Application.is_mobile) {
        var $allPanels = $(".track-about-challenge");
        $(".track-about");
        this.show_challenge_options();
        $allPanels.addClass("animated flash");
        setTimeout(function() {
          $allPanels.removeClass("animated flash");
        }, 2e3);
      }
    },
    flash_focus_on_comment : function() {
      var target = $(".track-comments-input");
      this.scrollToElement(target, 500);
      target.addClass("animated flash");
      target.find("input").trigger("keydown").focus();
      setTimeout(function() {
        target.removeClass("animated flash");
      }, 2e3);
    },
    reply_comment : function(e) {
      var geckoTable = $(e.target).closest(".track-comment");
      var target = this.$(".track-comment-input").find("input");
      var s = "@" + geckoTable.data("d_name") + " ";
      target.val(s).trigger("keydown").focus();
      this.scrollToElement(target, 500);
    },
    share_track : function(event) {
      var $share_link = $(event.currentTarget);
      var response = $share_link.data("service");
      var t = $share_link.parents(".track-about-share").data();
      t.share_item = "track";
      button.share(response, t);
    },
    share_challenge : function(event) {
      var $share_link = $(event.currentTarget);
      var response = $share_link.data("service");
      var t = $share_link.parents(".track-about-challenge").data();
      t.share_item = "challenge";
      button.share(response, t);
    },
    add_track_of_the_day : function() {
      var t = this._get_track_id();
      var lives = $("#track-lives-amount").val();
      var s = $("#track-refill-cost-amount").val();
      var gems = $("#track-gem-amount").val();
      var a = (new Date($("#track-of-the-day-date").val())).getTime() / 1e3;
      var delayedWrite = db.post("moderator/add_track_of_the_day", {
        t_id : t,
        lives : lives,
        rfll_cst : s,
        gems : gems,
        d_ts : a
      });
      delayedWrite.done(function(data) {
        $("#add-track-of-the-day").hide();
        $("#add-track-of-the-day-response").html("<p>" + data.msg + "</p>");
        if (data.result) {
          $("#add-track-of-the-day-response").children("p").addClass("success");
          $("#track_of_the_day_entries > tbody:last-child").append('<tr id="track-of-the-day-info" >  <td class="table-column"><p>' + data.data.t_id + '</p></td>  <td class="table-column"><p>' + data.data.d_ts + " " + $("#track-of-the-day-date").val() + '</p></td>  <td class="table-column"><p>' + data.data.gems + '</p></td>  <td class="table-column"><p>' + data.data.rfll_cst + '</p></td>  <td class="table-column"><p>' + data.data.lives + '</p></td>  <td class="table-column" style="text-align:center;border-right:none;"><span id="track-of-the-day-data" data-tid="' + 
          data.data.t_id + '" data-dts="' + data.data.d_ts + '" class="menu_icons menu_icons-icon_close_search remove-track-of-the-day-btn"></span></td></tr>');
        } else {
          $("#add-track-of-the-day-response").children("p").addClass("failed");
        }
        $("#add-track-of-the-day-response").show();
        data = null;
      });
    },
    remove_track_of_the_day : function(event) {
      const packet = $(event.currentTarget).data();
      var mid = packet.tid;
      var dts = packet.dts;
      var delayedWrite = db.post("admin/removeTrackOfTheDay", {
        t_id : mid,
        d_ts : dts
      });
      delayedWrite.done(function(jdata) {
        var $row = $(event.currentTarget).parent("td").parent("tr");
        $(event.currentTarget).parent("td").parent("tr").find("table-column").hide();
        $row.html('<td colspan="6"><p>' + jdata.msg + "</p></td>");
        if (jdata.result) {
          $row.addClass("success");
        } else {
          $row.addClass("failed");
        }
        $row.show();
        jdata = null;
      });
    },
    prompt_signup : function(canCreateDiscussions) {
      Application.events.publish("prompt.signup", {
        analytics : "about-challenge-friends"
      });
    },
    prompt_login : function(canCreateDiscussions) {
      Application.events.publish("prompt.login", {
        analytics : "about-challenge-friends"
      });
    },
    rate_track : function(event) {
      if (Application.User.is_logged_in() === false) {
        return void Application.events.publish("prompt.signup", {
          analytics : "rate-track"
        });
      }
      var vote;
      var shutdown_channel = this;
      var thumb = $(event.currentTarget);
      var direction = thumb.data("thumb");
      if ("up" === direction) {
        vote = 1;
      } else {
        if ("down" === direction) {
          vote = -1;
        }
      }
      if (thumb.hasClass("active") === true) {
        vote = 0;
        thumb.removeClass("active");
      } else {
        thumb.addClass("active");
      }
      thumb.siblings(".active").removeClass("active");
      var filteredView = this.$el.find(".track-about");
      var $innerblock = filteredView.find(".track-rating-stats");
      var searchContactPanel = filteredView.find(".track-rating-spinner");
      $innerblock.hide();
      searchContactPanel.show();
      var delayedWrite = db.post("track_api/vote", {
        t_id : shutdown_channel._get_track_id(),
        vote : vote
      });
      delayedWrite.done(function(event) {
        var query = {
          category : "vote"
        };
        if (event.result === true) {
          var self = event.data;
          self.vote = vote;
          shutdown_channel.update_votes(self);
          if (1 == vote) {
            query.action = "vote-up";
          } else {
            query.action = "vote-down";
          }
          query.label = "vote-success";
        } else {
          alert(event.msg);
          thumb.removeClass("active");
          if (1 == vote) {
            query.action = "vote-up";
          } else {
            query.action = "vote-down";
          }
          query.label = "vote-error-" + event.msg;
        }
        $innerblock.show();
        searchContactPanel.hide();
        that.track_event(query);
        event = null;
      });
    },
    update_votes : function(data) {
      var vote = data.vote;
      var i = Math.floor(data.vote_percent);
      var votes = data.votes;
      var a = data.up_votes;
      var o = data.dwn_votes;
      this.$("#track-vote-progress-bar").css("width", i + "%");
      this.$("#track-vote-percent").text(i);
      this.$("#track-votes").text(votes);
      this.$("#up-votes").text(a);
      this.$("#dwn-votes").text(o);
      var s;
      var oldActiveEntry = this.$(".track-about-btns-rate").find(".thumb");
      if (1 === vote) {
        this.show_share_options();
        s = this.$(".icon-thumbs-up").addClass("actve");
      } else {
        if (-1 === vote) {
          s = this.$(".icon-thumbs-down").addClass("actve");
        } else {
          oldActiveEntry.removeClass("active");
        }
      }
      this.toggle_share;
    },
    signup_prompt : function() {
      if (Application.User.is_logged_in() === false) {
        Application.events.publish("prompt.signup", {
          analytics : "track-leaderboard"
        });
      }
    },
    signup_prompt_friends : function() {
      if (Application.User.is_logged_in() === false) {
        Application.events.publish("prompt.signup", {
          analytics : "track-friends-leaderboard"
        });
      }
    },
    toggle_about : function(event) {
      event.preventDefault();
      $(event.currentTarget);
      return this.$("#about_main").toggleClass("more"), Application.events.publish("resize"), false;
    },
    handle_share_submenu_click : function(event) {
      var $el = $(event.currentTarget);
      $el.siblings(".active").removeClass("active");
      $el.addClass("active");
      var t = $($el.data("panel"));
      t.siblings(".track-about-share-panel").removeClass("active");
      t.addClass("active");
      Application.events.publish("resize");
    },
    show_about : function() {
      this.$("#about_main").removeClass("less").addClass("more");
      this.$("#track_about_button").click();
      Application.events.publish("resize");
    },
    show_share_options : function() {
      this.$("#track_share_button").click();
      this.$("#track_share_button_main").click();
      this.$(".gameGui").click();
      this.focusOnGame();
      Application.events.publish("resize");
    },
    show_challenge_options : function() {
      this.show_share_options();
      this.$("#track_challenge_button").click();
      this.$(".gameGui").click();
      Application.events.publish("resize");
    },
    show_help_view : function() {
      this.toggle_help_view();
    },
    toggle_help_view : function() {
      this.$("#track_help_button").click();
      Application.events.publish("resize");
    },
    toggle_share_options_sub : function() {
      this.show_share_options();
    },
    toggle_challenge_options : function() {
      this.show_challenge_options();
    },
    toggle_embed_options : function() {
      this.show_share_options();
      this.$("#track_embed_button").click();
    },
    setup : function() {
      if (this.subscribe(), Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load,
        page_class : "track-view"
      }), this._init_mentions(), this.options.show_challenge && this.challenge_friends(), this._check_is_campaign(), this.refresh_leaderboard(), me.isAppEventsEnabled()) {
        var e = this._get_track_id();
        if (this.is_campaign_track) {
          me.logCustomAppEvent("campaignTrackPlayed", {
            value : null,
            params : {
              t_id : e
            }
          });
        } else {
          me.logCustomAppEvent("trackPlayed", {
            value : null,
            params : {
              t_id : e
            }
          });
        }
      }
      if (Application.settings.is_mobile) {
        if (window.innerWidth > window.innerHeight) {
          this.fullscreenGame();
        }
      } else {
        if ("uploaded" == this.flag) {
          var post = this._get_share_data();
          if (Application.User.get("d_name") === post.author) {
            this.trackUploadShareView = new Application.Views.TrackUploadShareModalView({
              data : post
            });
          }
        }
        this._initialize_game();
        this.load_preroll_ads();
      }
    },
    _get_game_container : function() {
      var $ajaxBackground = this.$gameContainer;
      return (null === $ajaxBackground || 0 === $ajaxBackground.length) && ($ajaxBackground = $(this.gameContainerId)), $ajaxBackground;
    },
    _initialize_game : function() {
      if (!this.closing) {
        var $container = this._get_game_container();
        React.render(GameGui, $container[0]);
        this.stateChangedHandler = this.gameStateChanged.bind(this);
        GameManager.init("Main", GameSettings);
        GameManager.on("stateChange", this.stateChangedHandler);
        this.listenForGameFocusEvents();
        this.listenForGameComplete();
        this.resize();
        this.gameInitialized = true;
        $(window).focus();
        this.landscape = this.isLandscapeMode();
      }
    },
    gameCompleteHandler : null,
    listenForGameComplete : function() {
      this.gameCompleteHandler = this.gameComplete.bind(this);
      if ("undefined" != typeof GameManager) {
        GameManager.on("gameComplete", this.gameCompleteHandler);
      }
    },
    unlistenFromGameComplete : function() {
      if ("undefined" != typeof GameManager && this.gameCompleteHandler) {
        GameManager.removeListener("gameComplete", this.gameCompleteHandler);
      }
      this.gameCompleteHandler = null;
    },
    gameComplete : function(nophantom) {
      if ("campaign" === nophantom && this.refresh_campaign_tracks(), this.refresh_leaderboard(), me.isAppEventsEnabled()) {
        var t = this._get_track_id();
        if ("campaign" === nophantom) {
          me.logCustomAppEvent("campaignTrackCompleted", {
            value : null,
            params : {
              t_id : t
            }
          });
        } else {
          me.logCustomAppEvent("trackCompleted", {
            value : null,
            params : {
              t_id : t
            }
          });
        }
      }
      if (Application.User.is_logged_in()) {
        this.$("#track-about-challenge-user").show();
        this.$("#track-about-challenge-guest").hide();
        this.show_challenge_options();
      } else {
        this.show_share_options();
      }
    },
    listenForGameFocusEvents : function() {
      if (!GameSettings.mobile) {
        this.onBodyClickHandler = this.onBodyClick.bind(this);
        this.unfocusGameHandler = this.unFocusOnGame.bind(this);
        $(window).on("blur", this.unfocusGameHandler);
        document.addEventListener("click", this.onBodyClickHandler);
      }
    },
    unlistenForGameFocusEvents : function() {
      if (!GameSettings.mobile) {
        document.removeEventListener("click", this.onBodyClickHandler);
        $(window).off("blur", this.unfocusGameHandler);
        this.unfocusGameHandler = null;
        this.onBodyClickHandler = null;
      }
    },
    onBodyClickHandler : null,
    onBodyClick : function(event) {
      var $_cb = $(event.target);
      if ($_cb.is(".gameGui") || $_cb.parents(".gameGui").length > 0 || $_cb.is("#game-container") || $_cb.parents("#game-container").length > 0 || $_cb.is("#track_best_times") || $_cb.parents("#track_best_times").length > 0) {
        this.focusOnGame();
      } else {
        this.unFocusOnGame();
      }
    },
    unFocusOnGame : function() {
      GameManager.command("focused", false);
    },
    focusOnGame : function() {
      GameManager.command("focused", true);
    },
    fullscreen : false,
    unfullscreenGame : function() {
      if (!this.isPlayingAd) {
        var e = this._get_game_container();
        if (e.length > 0) {
          e.removeClass("game-fullscreen");
          this.$el.find(".game-box").html(e);
          $("html").removeClass("fullscreen");
          this.fullscreen = false;
          GameSettings.fullscreen = false;
          if (GameSettings.mobile) {
            this.closeGame();
            GameManager.command("focused", false);
          }
        }
      }
    },
    fullscreenGame : function() {
      if (!this.isPlayingAd) {
        var e = this._get_game_container();
        if (e.length > 0) {
          e.addClass("game-fullscreen");
          $("body").append(e);
          this.fullscreen = true;
          GameSettings.fullscreen = true;
          if (GameSettings.mobile) {
            if (!this.gameInitialized) {
              this._initialize_game();
            }
            GameManager.command("focused", true);
            if (!this.isPlayingAd) {
              this.load_preroll_ads();
              this.fullscreenAdContainer();
            }
          }
        }
      }
    },
    fullscreenAdContainer : function() {
      var t = $("#mainContainer");
      var nav = $("#adContainer");
      if (t.length > 0 && nav.length > 0) {
        $("body").append(t);
        t.css("display", "block");
        nav.css("left", "-1px");
        nav.css("top", "-1px");
        if (GameSettings.mobile) {
          nav.addClass("mobile");
        }
      }
    },
    readyToPlay : false,
    $mobilePlayScreen : null,
    $mobileProgressBar : null,
    $mobileProgressText : null,
    showMobileClosingButton : function() {
      var currentArrowButton = this.$mobilePlayScreen;
      if (!currentArrowButton) {
        this.$mobilePlayScreen = currentArrowButton = $("#mobilePlayScreen");
      }
      currentArrowButton.removeClass().addClass("track-play-overlay show-closing");
    },
    gameStateChanged : function(wsappui) {
      if (this.fullscreen && wsappui.fullscreen === false) {
        this.unfullscreenGame();
        this.resizeGame();
      } else {
        if (this.fullscreen === false && wsappui.fullscreen === true) {
          this.fullscreenGame();
          this.resizeGame();
        }
      }
    },
    _get_share_data : function() {
      return this.$(".track-about-share").data();
    },
    _init_mentions : function() {
      var el = this.$el.find(".track-comment-input").find("input");
      this.mentions = new IEListenerHandle(el);
    },
    _destory_mentions : function() {
      if ("undefined" != typeof this.mentions) {
        this.mentions.destroy();
      }
    },
    getTemplates : function() {
      var $scope = this;
      var id = _.union(d, moreCrawlerUserAgents, callback, name, next, miscFns, checkRequired);
      self.getTemplates(id, function(data) {
        $scope.templates = data;
        $scope.getTrackData(function(t) {
          if ($scope.random) {
            $scope.set_track_url(t);
          }
          $scope.render(t);
          $scope.setup();
        });
      });
    },
    set_track_url : function(result) {
      var id = result.track.slug;
      Application.router.navigate("/t/" + id, {
        trigger : false,
        replace : true
      });
    },
    _get_comment_template : function(saveNotifs) {
      var obj = this;
      self.getTemplates(name, function(config) {
        obj.templates = _.extend(obj.templates, config);
        saveNotifs();
      });
    },
    _get_leaderboard_template : function(saveNotifs) {
      var obj = this;
      self.getTemplates(next, function(config) {
        obj.templates = _.extend(obj.templates, config);
        saveNotifs();
      });
    },
    cancel_comment : function(e) {
      var knob_elem = $(e.target).parents(".track-comments-input").find("input");
      knob_elem.val("");
      this.reset_placeholder(e);
    },
    post_comment : function(comment) {
      if (Application.User.is_logged_in() === false) {
        return void Application.events.publish("prompt.signup", {
          analytics : "track-comment"
        });
      }
      var overlay = this;
      var num = overlay._get_track_id();
      this._get_comment_template(function() {
        var delayedWrite = db.post("track_comments/post", {
          t_id : num,
          msg : $("#track-comment").val()
        });
        delayedWrite.done(function(data) {
          if (data.result === true) {
            $("#track-comment").val("");
            var ul = $(self.render(overlay.templates["track/track_comment"], {}, data.data));
            var $scrollerElement = overlay.$el.find(".track-comments-list");
            $scrollerElement.prepend(ul);
            var otweets = $scrollerElement.find("#track-no-comments");
            if (otweets.length > 0) {
              otweets.remove();
            }
            Application.events.publish("resize");
            that.track_event({
              category : "comment",
              action : "comment-post",
              label : "success-" + num
            });
          } else {
            alert(data.msg);
            that.track_event({
              category : "comment",
              action : "comment-post",
              label : "error-" + data.msg
            });
          }
        });
      });
    },
    load_comments : function(jEvent) {
      var uuid = $(".track-comments-list div.track-comment:last").data("c_id");
      var _ddoc = this._get_track_id();
      var $innerblock = $(jEvent.target).closest(".track-prev-comments");
      $innerblock.hide();
      var searchContactPanel = $(".track-comments-loading");
      searchContactPanel.show();
      var overlay = this;
      this._get_comment_template(function() {
        var delayedWrite = db.post("track_comments/load_more/" + _ddoc + "/" + uuid);
        delayedWrite.done(function(result) {
          if (result.result === true && result.data.track_comments.length > 0) {
            var $li = $(self.render(overlay.templates["track/track_comment"], {}, result.data));
            var $uiTabsNav = overlay.$el.find(".track-comments-list");
            $uiTabsNav.append($li);
            if (result.data.track_comments_load_more === true) {
              $innerblock.show();
            }
          }
          searchContactPanel.hide();
          Application.events.publish("resize");
        });
      });
    },
    confirm_delete : function(jEvent) {
      var e = $(jEvent.target);
      var i = e.closest("div");
      e.hide();
      i.find(".track-comment-confirm-delete").show();
    },
    confirm_delete_no : function(jEvent) {
      var e = $(jEvent.target).closest(".track-comment-confirm-delete");
      var i = e.closest("div");
      e.hide();
      i.find(".track-comment-delete").show();
    },
    confirm_delete_yes : function(jEvent) {
      var headerSlider = $(jEvent.target).closest("div.track-comment");
      headerSlider.find(".track-comment-confirm-delete").hide();
      var i = headerSlider.data("c_id");
      var nameArgs = this._get_track_id();
      headerSlider.fadeOut(function() {
        $(this).remove();
      });
      this._delete_comment(nameArgs, i, function(canCreateDiscussions) {
      });
    },
    _delete_comment : function(t, i, s) {
      var delayedWrite = db.get("track_comments/delete/" + t + "/" + i);
      delayedWrite.done(function(a9) {
        s(a9);
      });
    },
    confirm_flag : function(jEvent) {
      var e = $(jEvent.target);
      var i = e.closest("div");
      e.hide();
      i.find(".track-comment-confirm-flag").show();
    },
    confirm_flag_no : function(jEvent) {
      var e = $(jEvent.target).closest(".track-comment-confirm-flag");
      var i = e.closest("div");
      e.hide();
      i.find(".track-comment-flag").show();
    },
    confirm_flag_yes : function(jEvent) {
      var headerSlider = $(jEvent.target).closest("div.track-comment");
      headerSlider.find(".track-comment-confirm-flag").hide();
      var i = headerSlider.data("c_id");
      var nameArgs = this._get_track_id();
      headerSlider.fadeOut(function() {
        $(this).remove();
      });
      this._flag_comment(nameArgs, i, function(canCreateDiscussions) {
      });
    },
    _flag_comment : function(t, i, s) {
      var delayedWrite = db.get("track_comments/flag/" + t + "/" + i);
      delayedWrite.done(function(a9) {
        s(a9);
      });
    },
    show_hide_comment : function(jEvent) {
      var t = $(jEvent.target);
      var i = t.closest("div");
      i.find(".track-comment-msg").toggle();
    },
    confirm_track_flag : function(jEvent) {
      var e = $(jEvent.target);
      var i = e.closest("div");
      e.hide();
      i.find(".track-confirm-flag").css({
        display : "block"
      });
    },
    confirm_track_flag_no : function(jEvent) {
      var e = $(jEvent.target).closest(".track-confirm-flag");
      var i = e.closest("div");
      e.hide();
      i.find(".track-flag").show();
    },
    confirm_track_flag_yes : function(jEvent) {
      var clojIsReversed = this._get_track_id();
      this._flag_track(clojIsReversed, function(t) {
        var i = $(jEvent.target).closest("div");
        if (t.result === true) {
          i.find(".track-confirm-flag").fadeOut(function() {
            $("#track-has-been-flagged").show();
          });
        } else {
          i.find(".track-confirm-flag").fadeOut(function() {
            $("#track-has-been-flagged").text(t.msg).show();
          });
        }
      });
    },
    _flag_track : function(upgrade_arr, saveNotifs) {
      var delayedWrite = db.get("track_api/flag/" + upgrade_arr);
      delayedWrite.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    _get_track_id : function() {
      return $("#track-data").data("t_id");
    },
    _get_track_slug : function() {
      return $("#track-data").data("track_slug");
    },
    _check_is_campaign : function() {
      this.is_campaign_track = $("#track-data").data("is_campaign");
    },
    focus_input : function(jEvent) {
      var settingsItem = $(jEvent.target).closest(".placeholder").parents(".track-comments-input");
      var checkedInput = settingsItem.find("input");
      checkedInput.trigger("focus");
    },
    hide_placeholder : function(e) {
      $(e.target).closest("input").parents(".track-comments-input").find(".placeholder").hide();
    },
    hide_placeholder_and_check_input : function(e) {
      if (e.keyCode === keys.ENTER) {
        this.post_comment();
      }
      this.hide_placeholder(e);
    },
    fade_placeholder : function(jEvent) {
      var filteredView = $(jEvent.target).closest("input").parents(".track-comments-input");
      filteredView.find(".track-comment-input").addClass("outlined");
      filteredView.find(".track-comment-actions").show();
      filteredView.find(".placeholder").addClass("faded");
    },
    reset_placeholder : function(e) {
      var settingsItem = $(e.target).parents(".track-comments-input");
      settingsItem.find(".track-comment-input").removeClass("outlined");
      var knob_elem = settingsItem.find("input");
      if ("" === knob_elem.val()) {
        settingsItem.find(".track-comment-actions").hide();
        settingsItem.find(".placeholder").show().removeClass("faded");
      }
    },
    refresh_leaderboard : function() {
      var audioComponent = this;
      var $photowrapper = this.$("#track_leaderboard").find(".track-leaderboard-refresh");
      $photowrapper.addClass("loading");
      var loadMore = this.$("#track_friends_leaderboard").find(".track-leaderboard-refresh");
      if (loadMore.length > 0) {
        loadMore.addClass("loading");
      }
      this._get_leaderboard_template(function() {
        audioComponent._get_leaderboard_data(function(load) {
          if (load.result === true) {
            audioComponent._render_leaderboards(load);
          }
          $photowrapper.removeClass("loading");
          if (loadMore.length > 0) {
            loadMore.removeClass("loading");
          }
          load = null;
        });
      });
    },
    _get_leaderboard_data : function(saveNotifs) {
      var t = this._get_track_id();
      var delayedWrite = db.post("track_api/load_leaderboard", {
        t_id : t
      }, {
        track : false
      });
      delayedWrite.done(function(notifications) {
        saveNotifs(notifications);
        notifications = null;
        t = null;
        delayedWrite = null;
      });
    },
    _render_leaderboards : function(name) {
      var value = this.templates["track/track_leaderboard"];
      var s = self.render(value, {}, name);
      var template = this.templates["track/track_friends_leaderboard"];
      var t = self.render(template, {}, name);
      var a = this.$("#track_leaderboard");
      var o = this.$("#track_friends_leaderboard");
      var r = (this.$("#race_leaderboard"), $("#track_best_times"));
      var l = $("#leaderboard_loading");
      var e = $("#track-300x250-2-ad");
      if (l.length > 0) {
        l.remove();
      }
      if (o.length > 0) {
        o.replaceWith(t);
      } else {
        if (e.length > 0) {
          e.before(t);
        } else {
          r.append(t);
        }
      }
      if (a.length > 0) {
        a.replaceWith(s);
      } else {
        if (e.length > 0) {
          e.before(s);
        } else {
          r.append(s);
        }
      }
    },
    getTrackData : function(receiveFunc) {
      var t = "t/" + this.trackname;
      if (this.random === true) {
        t = "random/track";
      }
      if (this.race_unames_path) {
        t = t + "/r/" + this.race_unames_path;
      }
      if (this.flag) {
        t = t + ("/" + this.flag);
      }
      if (run) {
        run.abort();
      }
      run = db.get(t);
      run.done(function(connector) {
        receiveFunc(connector);
        run = null;
      });
    },
    render : function(data) {
      var template = this.templates["track/track_frame"];
      var emailSearchResults = {
        "track_listing/track_listing_frame" : this.templates["track_listing/track_listing_frame"],
        "track_listing/track_listing_tile" : this.templates["track_listing/track_listing_tile"],
        "track/track_comments" : this.templates["track/track_comments"],
        "track/track_comment" : this.templates["track/track_comment"],
        "track/track_leaderboard" : this.templates["track/track_leaderboard"],
        "track/track_race_leaderboard" : this.templates["track/track_race_leaderboard"],
        "track/track_friends_leaderboard" : this.templates["track/track_friends_leaderboard"],
        "ads/leaderboard_1_ad" : this.templates["ads/leaderboard_1_ad"],
        "ads/300x250_2_ad" : this.templates["ads/300x250_2_ad"],
        "ads/leaderboard_2_ad" : this.templates["ads/leaderboard_2_ad"],
        "track/totd_entries" : this.templates["track/totd_entries"]
      };
      if (Application.settings.is_mobile) {
        emailSearchResults["help/mobile_controls"] = this.templates["help/mobile_controls"];
      } else {
        emailSearchResults["help/desktop_controls"] = this.templates["help/desktop_controls"];
      }
      if (data.campaign) {
        this.is_campaign_track = true;
        emailSearchResults["campaign/campaign_list"] = this.templates["campaign/campaign_list"];
        emailSearchResults["campaign/campaign_track_listing_tile"] = this.templates["campaign/campaign_track_listing_tile"];
      } else {
        this.is_campaign_track = false;
      }
      if (this.race_unames_path) {
        emailSearchResults["track/track_race_leaderboard"] = this.templates["track/track_race_leaderboard"];
      }
      var options = self.render(template, emailSearchResults, data);
      this.$el.html(options);
      if (data.campaign) {
        this.render_campaign_tracks_column(data.right_side_content);
      } else {
        this.render_suggested_tracks_column(data.right_side_content);
      }
    },
    render_suggested_tracks_column : function(fn) {
      var tmpl = this.templates["track_listing/track_column"];
      var status = {
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"],
        "track_listing/track_listing_tile" : this.templates["track_listing/track_listing_tile"]
      };
      var i = self.render(tmpl, status, fn);
      $("#right_content").html(i);
    },
    toggle_author_subscribe : function(event) {
      var $button = $(event.currentTarget);
      var obj = this.get_author_data();
      if ($button.hasClass("subscribed")) {
        this.unsubscribe_from_author(obj.u_id);
      } else {
        this.subscribe_to_author(obj.u_id);
      }
    },
    get_author_data : function() {
      var fields = $("#track-data");
      return {
        u_id : fields.data("author_id")
      };
    },
    subscribe_to_author : function(vertexSet) {
      var t = $("#subscribe_to_author_container");
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = db.post("/track_api/subscribe", {
          sub_uid : vertexSet,
          subscribe : 1
        });
        delayedWrite.done(this.subscribe_to_author_response.bind(this));
        delayedWrite.done(function() {
          t.removeClass("disabled");
          t = null;
        });
      }
    },
    unsubscribe_from_author : function(vertexSet) {
      var t = $("#subscribe_to_author_container");
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = db.post("/track_api/subscribe", {
          sub_uid : vertexSet,
          subscribe : 0
        });
        delayedWrite.done(this.unsubscribe_from_author_response.bind(this));
        delayedWrite.done(function() {
          t.removeClass("disabled");
          t = null;
        });
      }
    },
    subscribe_to_author_response : function(data) {
      if (0 == data.result) {
        alert(data.msg);
        that.track_event({
          category : "subscriptions",
          action : "subscribe-error",
          label : "error-" + data.msg
        });
      } else {
        var $copyFrom = $("#subscribe_to_author_count");
        if ($copyFrom.text(data.data.subscriber_cnt), this.switch_to_unsubscribe(), that.track_event({
          category : "subscriptions",
          action : "subscribe",
          label : "subscribe-track",
          value : data.data.subscriber_cnt
        }), me.isAppEventsEnabled()) {
          var n = this._get_track_id();
          me.logCustomAppEvent("subscribe", {
            value : null,
            params : {
              t_id : n
            }
          });
        }
      }
    },
    unsubscribe_from_author_response : function(data) {
      if (0 == data.result) {
        alert(data.msg);
        that.track_event({
          category : "subscriptions",
          action : "unsubscribe-error",
          label : "error-" + data.msg
        });
      } else {
        var $copyFrom = $("#subscribe_to_author_count");
        $copyFrom.text(data.data.subscriber_cnt);
        this.switch_to_subscribe();
        that.track_event({
          category : "subscriptions",
          action : "unsubscribe",
          label : "unsubscribe-track",
          value : data.data.subscriber_cnt
        });
      }
    },
    switch_to_subscribe : function() {
      var $button = $("#subscribe_to_author");
      $button.removeClass("subscribed");
      $button.text("Subscribe");
    },
    switch_to_unsubscribe : function() {
      var button = $("#subscribe_to_author");
      button.addClass("subscribed");
      button.text("Unsubscribe");
    },
    skip_campaign_track_clickhandler : function(event) {
      var $ele = $(event.currentTarget);
      var i = $ele.data("id");
      var thisj = $ele.data("cost");
      this.skip_campaign_track(i, thisj);
    },
    skip_campaign_track : function(i, j, t) {
      t = t ? t : false;
      var pos = this;
      new Application.Views.CampaignSkipModal({
        id : i,
        cost : j,
        mobile : t,
        success : function(src) {
          if (src.next_track) {
            var b = src.next_track;
            var value = "/t/" + b + "/c";
            pos.navigate(value);
          }
        },
        fail : function(errtype) {
        },
        cancel : function() {
        }
      });
    },
    refresh_campaign_tracks : function() {
      var outSvg = this;
      this._get_campaign_tracks_template(function() {
        outSvg._get_campaign_data(function(result) {
          if (result.result === true) {
            outSvg.render_campaign_tracks_column(result.data, true);
          } else {
            alert(result.msg);
          }
          result = null;
        });
      });
    },
    _get_campaign_tracks_template : function(saveNotifs) {
      var obj = this;
      self.getTemplates(callback, function(config) {
        obj.templates = _.extend(obj.templates, config);
        saveNotifs();
      });
    },
    _get_campaign_data : function(saveNotifs) {
      var t = this._get_track_id();
      var delayedWrite = db.post("track_api/get_campaign_tracks", {
        t_id : t
      }, {
        track : false
      });
      delayedWrite.done(function(notifications) {
        saveNotifs(notifications);
        notifications = null;
        t = null;
        delayedWrite = null;
      });
    },
    render_campaign_tracks_column : function(data, options) {
      $("#right_content").unbind();
      options = options ? options : false;
      var template = this.templates["campaign/campaign_column"];
      var emailSearchResults = {
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"],
        "campaign/campaign_track_listing_tile" : this.templates["campaign/campaign_track_listing_tile"]
      };
      var i = $(self.render(template, emailSearchResults, data));
      if (options) {
        var $oldButton = $(i).find(".track-list");
        $("#right_content").find(".track-list").replaceWith($oldButton);
      } else {
        $("#right_content").html(i);
      }
      this.bind_skip_campaign_column();
    },
    bind_skip_campaign_column : function() {
      $("#right_content").on("click", ".campaign-tile-skip", this.skip_campaign_track_clickhandler.bind(this));
    }
  });
  igv.TrackView = igvjs_version;
}(Application.Views = Application.Views || {}), function(state) {
  var View = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper, Application.Views.ViewTemplate);
  var size = (Application.Helpers.PopupHelper, Application.Helpers.GoogleAnalyticsHelper, View.extend({
    templates : {
      main : "track_listing/track_listing",
      partials : ["ads/leaderboard_1_ad", "ads/leaderboard_2_ad", "ads/track_list_ad", "ads/300x250_1_ad"]
    },
    request : "/tracks",
    events : {},
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        left_nav : "tracks",
        initial_page_load : this.initial_page_load,
        page_class : "tracks-view"
      });
      this.init_track_list();
      Application.events.publish("scrollTo", {
        x : 0,
        y : 0
      });
    },
    init_track_list : function() {
      this.$(".trackList").each(function() {
        var tree = $(this);
        if (0 == tree.hasClass("track-list-with-promote")) {
          var element = tree.find(".slider");
          if (element.css({
            width : "100%"
          }), element.slick({
            dots : false,
            infinite : false,
            speed : 300,
            slidesToShow : 8,
            slidesToScroll : 3,
            prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></span></div>',
            nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></span></div>',
            touchThreshold : 12,
            responsive : [{
              breakpoint : 1700,
              settings : {
                slidesToShow : 7,
                slidesToScroll : 4
              }
            }, {
              breakpoint : 1500,
              settings : {
                slidesToShow : 6,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1280,
              settings : {
                slidesToShow : 5,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1024,
              settings : {
                slidesToShow : 4,
                slidesToScroll : 4
              }
            }, {
              breakpoint : 850,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 480,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }]
          }), tree.hasClass("campaign")) {
            var bcofl_checkbox = tree.find(".trackTile").not(".disabled").not(".complete");
            if (bcofl_checkbox.length > 0) {
              var editingEl = $(bcofl_checkbox[0]);
              if (editingEl.data("slick-index")) {
                var classesLine = editingEl.data("slick-index");
                element.slick("slickGoTo", classesLine);
              }
            }
          }
        }
      });
      this.$(".track-list-with-promote").each(function() {
        var $sharepreview = $(this);
        var options = $sharepreview.find(".slider");
        options.slick({
          dots : false,
          infinite : false,
          speed : 300,
          slidesToShow : 6,
          slidesToScroll : 3,
          prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></div>',
          nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></div>',
          touchThreshold : 12,
          responsive : [{
            breakpoint : 1700,
            settings : {
              slidesToShow : 5,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1500,
            settings : {
              slidesToShow : 4,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1280,
            settings : {
              slidesToShow : 3,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1024,
            settings : {
              slidesToShow : 2,
              slidesToScroll : 2
            }
          }, {
            breakpoint : 850,
            settings : {
              slidesToShow : 3,
              slidesToScroll : 2
            }
          }, {
            breakpoint : 520,
            settings : {
              slidesToShow : 2,
              slidesToScroll : 2
            }
          }]
        });
      });
      this.slickEnabled = true;
    },
    destroy_track_list : function() {
      if (this.slickEnabled) {
        this.$(".trackList").each(function() {
          var $sharepreview = $(this);
          var element = $sharepreview.find(".slider");
          element.css({
            width : "2000px"
          });
          element.slick("unslick");
        });
        this.slickEnabled = false;
      }
    },
    close : function() {
      this.data = false;
      this.destroy_track_list();
    }
  }));
  state.TracksView = size;
}(Application.Views = Application.Views || {}), function(module) {
  var self = Application.Helpers.TemplateHelper;
  var footable = Application.Helpers.AjaxHelper;
  var next = ["track_listing/track_category", "track_listing/track_listing_frame", "track_listing/track_listing_tile", "pagination/pagination", "ads/300x250_1_ad", "ads/track_list_ad"];
  var CategoryView = Backbone.View.extend({
    templates : [],
    events : {},
    initialize : function(options) {
      this.category = options.category;
      this.initial_page_load = options.initial_page_load;
      if (this.initial_page_load === true) {
        this.setup();
      } else {
        this.getTemplates();
      }
    },
    close : function() {
    },
    subscribe : function() {
    },
    setup : function() {
      this.subscribe();
      Application.events.publish("mainview.loaded", {
        left_nav : this.category,
        dropdown_open : "browse_tracks",
        initial_page_load : this.initial_page_load,
        page_class : "category menu"
      });
    },
    getTemplates : function() {
      var thisPlot = this;
      self.getTemplates(next, function(data) {
        thisPlot.templates = data;
        thisPlot.getCategoryData(function(data) {
          thisPlot.render(data);
          thisPlot.setup();
        });
      });
    },
    getCategoryData : function(callback) {
      var delayedWrite = footable.get("/" + Backbone.history.fragment);
      delayedWrite.done(function(identifierPositions) {
        callback(identifierPositions);
      });
    },
    render : function(target) {
      var tmpl = this.templates["track_listing/track_category"];
      var status = {
        "track_listing/track_listing_frame" : this.templates["track_listing/track_listing_frame"],
        "track_listing/track_listing_tile" : this.templates["track_listing/track_listing_tile"],
        "pagination/pagination" : this.templates["pagination/pagination"],
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"],
        "ads/track_list_ad" : this.templates["ads/track_list_ad"]
      };
      var i = self.render(tmpl, status, target);
      this.$el.html(i);
    }
  });
  module.CategoryView = CategoryView;
}(Application.Views = Application.Views || {}), function(a) {
  var model = Application.Helpers.TemplateHelper;
  var $http = Application.Helpers.AjaxHelper;
  var me = Application.Helpers.FacebookHelper;
  var Chameleon = Application.Helpers.PopupHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  var next = ["auth/signup_login"];
  var newYFrac = Backbone.View.extend({
    templates : [],
    viewAsPage : false,
    isMobile : false,
    dialogSettings : {
      closeHTML : '<span class="core_icons core_icons-icon_close"></span>',
      closeClass : "signup-login-modal-close",
      containerId : "signup_login_container",
      escClose : false,
      maxWidth : 360
    },
    onModalClose : function() {
      metrics.track_event({
        category : "auth",
        action : "close",
        label : ""
      });
      Application.events.publish("dialog.close");
      $.modal.close();
    },
    onModalShow : function() {
      Application.events.publish("dialog.open");
    },
    events : {
      "click .dialog-tab" : "handle_tab_click",
      "click .auth-btn" : "auth_action",
      "click #auth_forgot_password" : "show_forgot_pass",
      "click #auth_back_to_login" : "hide_forgot_pass",
      "click #agree-to-terms-checkbox" : "toggle_signup_button",
      "click .placeholder" : "focus_input",
      "keypress .field" : "check_form_submit",
      "propertychange .field" : "hide_placeholder",
      "keydown .field" : "hide_placeholder",
      "input .field" : "hide_placeholder",
      "paste .field" : "hide_placeholder",
      "focus .field" : "fade_placeholder",
      "blur .field" : "reset_placeholder"
    },
    check_form_submit : function(event) {
      if (13 == event.keyCode) {
        var actionBtn = $(event.currentTarget);
        var type = actionBtn.data("form");
        switch(type) {
          case "signup":
            this.signup_with_email();
            break;
          case "login":
            this.login_with_email();
        }
      }
    },
    show_forgot_pass : function(jEvent) {
      var $tabSelector = $(jEvent.target).parents(".auth-form-wrapper");
      $tabSelector.find(".auth-form-submit").show();
      $tabSelector.find(".auth-form-response").hide();
      $tabSelector.addClass("auth-form-wrapper_forgot-pass");
    },
    hide_forgot_pass : function(jEvent) {
      var undoEl = $(jEvent.target).parents(".auth-form-wrapper");
      undoEl.removeClass("auth-form-wrapper_forgot-pass");
    },
    toggle_signup_button : function(jEvent) {
      if ($(jEvent.target).is(":checked")) {
        $("#signup-button").removeClass("disabled");
      } else {
        $("#signup-button").addClass("disabled");
      }
    },
    initialize : function(options) {
      this.options = {} || options;
      var deviceName = Application.settings.device;
      this.isMobile = "mobile" === deviceName || "tablet" === deviceName;
      this.subscribe();
    },
    subscribe : function() {
      var $scope = this;
      Application.events.subscribe("prompt.signup", function(options) {
        $("html").click();
        options = options || {};
        var fileName = "unknown";
        if (options.analytics) {
          fileName = options.analytics;
        }
        metrics.track_event({
          category : "auth",
          action : "prompt-signup",
          label : fileName
        });
        $.modal.close();
        if ($scope.is_user_logged_in() === false) {
          options.signup = true;
          model.getTemplates(next, function(template) {
            $scope.template = template["auth/signup_login"];
            $scope.options = options;
            $scope.setup();
          });
        } else {
          Application.router.initial_page_load = false;
          Application.router.do_route("/");
        }
        Application.events.publish("router.navigate");
      });
      Application.events.subscribe("prompt.login", function(options) {
        $("html").click();
        options = options || {};
        var fileName = "unknown";
        if (options.analytics) {
          fileName = options.analytics;
        }
        metrics.track_event({
          category : "auth",
          action : "prompt-login",
          label : fileName
        });
        $.modal.close();
        if ($scope.is_user_logged_in() === false) {
          options.login = true;
          model.getTemplates(next, function(template) {
            $scope.template = template["auth/signup_login"];
            $scope.options = options;
            $scope.setup();
          });
        } else {
          Application.router.initial_page_load = false;
          Application.router.do_route("/");
        }
        Application.events.publish("router.navigate");
      });
      Application.events.subscribe("auth.login", function() {
        $.modal.close();
      });
      Application.events.subscribe("auth.google.response", function(e) {
        if (e = JSON.parse(e), e.result) {
          var msg = e.data;
          Application.events.publish("auth.login", msg.user, msg.user_stats);
        }
      });
    },
    is_user_logged_in : function() {
      var e = false;
      return Application.User.is_logged_in() && ((this.isMobile || this.options.viewAsPage) && Application.events.publish("router.back"), e = true), e;
    },
    setup : function() {
      var html = model.render(this.template, {}, this.options);
      if (this.isMobile || this.options.viewAsPage) {
        Application.events.publish("route.before");
        $("#content").html(html);
        $("#signup_login_modal").show();
        Application.events.publish("mainview.loaded", {
          initial_page_load : false
        });
      } else {
        this.dialogSettings.onClose = this.onModalClose.bind(this);
        this.dialogSettings.onShow = this.onModalShow.bind(this);
        $("#dialog_content").html(html);
        $("#signup_login_modal").modal(this.dialogSettings);
      }
      this.setElement($("#signup_login_modal"));
    },
    focus_input : function(jEvent) {
      var pwsIntputElement = $(jEvent.target).closest(".placeholder").parent(".auth-input").find(".field");
      pwsIntputElement.trigger("focus");
    },
    hide_placeholder : function(e) {
      $(e.target).closest(".field").parents(".auth-input").find(".placeholder").hide();
    },
    fade_placeholder : function(jEvent) {
      $(jEvent.target).closest(".field").parents(".auth-input").find(".placeholder").addClass("faded");
    },
    reset_placeholder : function(e) {
      var $pathbrowser = $(e.target).closest(".field");
      if ("" == $pathbrowser.val()) {
        $pathbrowser.parents(".auth-input").find(".placeholder").show().removeClass("faded");
      }
    },
    auth_action : function(e) {
      var currentSprite = $(e.target).closest(".auth-btn");
      var action = currentSprite.data("action");
      metrics.track_event({
        category : "auth",
        action : action,
        label : ""
      });
      this[action](e);
    },
    submit_forgot_password : function(jEvent) {
      var filteredView = $(jEvent.target).parents(".auth-form_forgot-pass");
      var email = filteredView.find("#forgot_password_email");
      var registrationEmail = email.val();
      var user = {};
      user.email = registrationEmail;
      var oldData = $http.post("/auth/forgot_password", user);
      oldData.done(function(event) {
        if (1 == event.result) {
          filteredView.find(".auth-form-submit").hide();
          filteredView.find(".auth-form-response").show();
        } else {
          alert(event.msg);
        }
      });
    },
    connect_with_facebook : function(name, n) {
      var inOwner = this;
      me.exec("login", [function(loginStatus) {
        if (loginStatus.authResponse) {
          me.exec("api", ["/me", function(i) {
            $http.get("/auth/fb_connect").done(function(appid) {
              n(appid);
              inOwner.hide_loading();
            });
          }]);
        } else {
          inOwner.add_errors(name + "_errors", ["You cancelled or did not authorize facebook connect"]);
          inOwner.hide_loading();
        }
      }, {
        scope : "public_profile,email"
      }]);
    },
    signup_with_facebook : function() {
      if (0 == this.isMobile) {
        this.show_loading();
      }
      this.connect_with_facebook("signup", function(s) {
        if (s.result) {
          var message = s.data;
          Application.events.publish("auth.login", message.user, message.user_stats);
        }
      });
    },
    login_with_facebook : function() {
      if (0 == this.isMobile) {
        this.show_loading();
      }
      this.connect_with_facebook("login", function(s) {
        if (s.result) {
          var message = s.data;
          Application.events.publish("auth.login", message.user, message.user_stats);
        }
      });
    },
    connect_with_google : function() {
      var t = this;
      var event = {
        url : Application.settings.base_request_url + "/auth/google_oauth2/auth",
        onCloseHandler : function() {
          t.hide_loading();
        }
      };
      if (this.isMobile) {
        event.onOpenHandler = $.noop;
      } else {
        this.show_loading();
      }
      var details = Chameleon.create(event);
      details.popup(500, Math.min(window.innerHeight, 720));
    },
    signup_with_google : function() {
      this.connect_with_google();
    },
    login_with_google : function() {
      this.connect_with_google();
    },
    login_with_email : function() {
      var t = this;
      this.show_loading();
      var login = this.$("#login_username_email").val();
      var adminPassword = this.$("#login_password").val();
      var n = this.$("#recaptcha_login_response").val();
      var delayedWrite = $http.post("/auth/standard_login", {
        login : login,
        password : adminPassword,
        recaptcha : n
      });
      delayedWrite.done(function(s) {
        if (s.result) {
          var message = s.data;
          Application.events.publish("auth.login", message.user, message.user_stats);
        } else {
          t.add_errors("login_errors", [s.msg]);
        }
        t.hide_loading();
      });
    },
    signup_with_email : function() {
      if ($("#agree-to-terms-checkbox").is(":checked")) {
        var t = this;
        this.show_loading();
        var inputUsername = this.$("#signup_username").val();
        var unameOther = this.$("#signup_email").val();
        var adminPassword = this.$("#signup_password").val();
        var a = this.$("#recaptcha_signin_response").val();
        var delayedWrite = $http.post("/auth/standard_signup", {
          username : inputUsername,
          email : unameOther,
          password : adminPassword,
          recaptcha : a
        });
        delayedWrite.done(function(s) {
          if (s.result) {
            var message = s.data;
            Application.events.publish("auth.login", message.user, message.user_stats);
          } else {
            t.add_errors("signup_errors", [s.msg]);
          }
          t.hide_loading();
        });
      } else {
        this.add_errors("signup_errors", ["Please indicate that you agree to our Terms of Use and Privacy Policy below."]);
      }
    },
    show_loading : function() {
      this.$el.find("#auth_loading").show();
    },
    hide_loading : function() {
      this.$el.find("#auth_loading").hide();
    },
    clear_errors : function() {
      this.$el.find(".dialog-errors").hide().find("ul").remove();
    },
    add_errors : function(id, x) {
      var s = this.$el.find("#" + id);
      var error = "<ul>";
      var n = x.length;
      var p = 0;
      for (; n > p; p++) {
        var dy = '<li><span class="icon-close ico_moon icon" style="margin-right:10px;"></span>' + x[p] + "</li>";
        error = error + dy;
      }
      error = error + "</ul>";
      s.html(error);
      s.show();
      this.resize_dialog();
    },
    resize_dialog : function() {
      var diagramHeight = this.$el.css("height");
      $("#" + this.dialogSettings.containerId).height(diagramHeight);
      $(window).resize();
    },
    handle_tab_click : function(element) {
      var $el = $(element.target).closest(".dialog-tab");
      $el.siblings().removeClass("active");
      $el.addClass("active");
      this.clear_errors();
      var $selectedCategory = $($el.data("panel"));
      $selectedCategory.siblings(".dialog-panel").hide();
      $selectedCategory.show();
      this.resize_dialog();
    }
  });
  a.AuthDialogView = newYFrac;
}(Application.Views = Application.Views || {}), function(App) {
  var self = Application.Helpers.TemplateHelper;
  var User = Application.Helpers.AjaxHelper;
  var next = ["admin/admin_frame"];
  var serviceSettingsAdapter = Backbone.View.extend({
    templates : [],
    events : {
      "click .admin-build" : "build",
      "click #community_classic_track_author_signup" : "community_classic_signup",
      "click #community_classic_track_author_transfer" : "community_classic_transfer",
      "click #toggle_classic_user" : "toggle_classic_user",
      "click #user_messaging_ban" : "user_messaging_ban",
      "click #user_uploading_ban" : "user_uploading_ban",
      "click #hide_track" : "hide_track",
      "click #add_won_coins" : "add_won_coins",
      "click #ban_user" : "ban_user",
      "click #deactivate_user" : "deactivate_user",
      "click #change_username" : "change_username",
      "click #add_plus_days" : "add_plus_days",
      "click #cache_get" : "cache_get",
      "click #cache_delete" : "cache_delete",
      "click #change_user_email" : "change_user_email",
      "click #generate_coupon_code" : "generate_coupon_code",
      "change #coupon_code_platform" : "coupon_code_platform_changed",
      "click #delete_user_account" : "delete_user_account"
    },
    build : function(s) {
      var a = $(s.target);
      var n = a.data("name");
      var filteredView = a.parents(".admin-build-row");
      var phantom = this._build_request(n);
      var $innerblock = filteredView.find(".spinner-loader-small");
      $innerblock.show();
      phantom.done(function(req) {
        if (1 == req.result) {
          var prev = req.version_info;
          console.log(filteredView.find(".build-date"), prev.time);
          filteredView.find(".build-date").html(prev.time);
          filteredView.find(".build-major-version").html(prev.major);
        } else {
          alert(req.msg);
        }
        $innerblock.hide();
      });
    },
    _build_request : function(key) {
      return User.get("/admin/compress/" + key);
    },
    initialize : function(castNode) {
      this.initial_page_load = castNode.initial_page_load;
      if (this.initial_page_load === true) {
        this.setup();
      } else {
        this._get_admin_page();
      }
    },
    close : function() {
    },
    subscribe : function() {
    },
    community_classic_signup : function() {
      var delayedWrite = User.post("admin/community_classic_signup", {
        classic_username : $("#classic_username").val(),
        real_email : $("#real_email").val()
      });
      delayedWrite.done(function(jdata) {
        $("#classic_signup_response").hide();
        if (jdata.result) {
          $("#classic_signup_response").attr("class", "alert-message success");
        } else {
          $("#classic_signup_response").attr("class", "alert-message error");
        }
        $("#classic_signup_response").html("<p>" + jdata.msg + "</p>");
        $("#classic_signup_response").show();
        jdata = null;
      });
    },
    community_classic_transfer : function() {
      var delayedWrite = User.post("admin/community_classic_transfer", {
        classic_existing_email : $("#classic_existing_email").val(),
        classic_transfer_to_username : $("#classic_transfer_to_username").val(),
        classic_secondary_email : $("#classic_secondary_email").val()
      });
      delayedWrite.done(function(jdata) {
        $("#classic_transfer_response").hide();
        if (jdata.result) {
          $("#classic_transfer_response").attr("class", "alert-message success");
        } else {
          $("#classic_transfer_response").attr("class", "alert-message error");
        }
        $("#classic_transfer_response").html("<p>" + jdata.msg + "</p>");
        $("#classic_transfer_response").show();
        jdata = null;
      });
    },
    toggle_classic_user : function() {
      var delayedWrite = User.post("admin/toggle_classic_user", {
        toggle_classic_uname : $("#toggle_classic_uname").val()
      });
      delayedWrite.done(function(jdata) {
        $("#toggle_classic_user_response").hide();
        if (jdata.result) {
          $("#toggle_classic_user_response").attr("class", "alert-message success");
        } else {
          $("#toggle_classic_user_response").attr("class", "alert-message error");
        }
        $("#toggle_classic_user_response").html("<p>" + jdata.msg + "</p>");
        $("#toggle_classic_user_response").show();
        jdata = null;
      });
    },
    user_messaging_ban : function() {
      var delayedWrite = User.post("admin/user_ban_messaging", {
        messaging_ban_uname : $("#messaging_ban_uname").val()
      });
      delayedWrite.done(function(jdata) {
        $("#ban_user_messaging_response").hide();
        if (jdata.result) {
          $("#ban_user_messaging_response").attr("class", "alert-message success");
        } else {
          $("#ban_user_messaging_response").attr("class", "alert-message error");
        }
        $("#ban_user_messaging_response").html("<p>" + jdata.msg + "</p>");
        $("#ban_user_messaging_response").show();
        jdata = null;
      });
    },
    user_uploading_ban : function() {
      var delayedWrite = User.post("admin/user_ban_uploading", {
        uploading_ban_uname : $("#uploading_ban_uname").val()
      });
      delayedWrite.done(function(jdata) {
        $("#ban_user_uploading_response").hide();
        if (jdata.result) {
          $("#ban_user_uploading_response").attr("class", "alert-message success");
        } else {
          $("#ban_user_uploading_response").attr("class", "alert-message error");
        }
        $("#ban_user_uploading_response").html("<p>" + jdata.msg + "</p>");
        $("#ban_user_uploading_response").show();
        jdata = null;
      });
    },
    hide_track : function() {
      var delayedWrite = User.post("admin/hide_track", {
        track_id : $("#hide_track_id").val()
      });
      delayedWrite.done(function(jdata) {
        $("#hide_track_response").hide();
        if (jdata.result) {
          $("#hide_track_response").attr("class", "alert-message success");
        } else {
          $("#hide_track_response").attr("class", "alert-message error");
        }
        $("#hide_track_response").html("<p>" + jdata.msg + "</p>");
        $("#hide_track_response").show();
        jdata = null;
      });
    },
    add_won_coins : function() {
      var delayedWrite = User.post("admin/add_won_coins", {
        coins_username : $("#won_coins_username").val(),
        num_coins : $("#num_won_coins").val()
      });
      delayedWrite.done(function(jdata) {
        $("#add_won_coins_response").hide();
        if (jdata.result) {
          $("#add_won_coins_response").attr("class", "alert-message success");
        } else {
          $("#add_won_coins_response").attr("class", "alert-message error");
        }
        $("#add_won_coins_response").html("<p>" + jdata.msg + "</p>");
        $("#add_won_coins_response").show();
        jdata = null;
      });
    },
    ban_user : function() {
      var delayedWrite = User.post("admin/ban_user", {
        ban_secs : $("#num_seconds_to_ban").val(),
        username : $("#ban_user_username").val(),
        delete_race_stats : $("#ban_delete_race_stats").val()
      });
      delayedWrite.done(function(jdata) {
        $("#ban_user_response").hide();
        if (jdata.result) {
          $("#ban_user_response").attr("class", "alert-message success");
        } else {
          $("#ban_user_response").attr("class", "alert-message error");
        }
        $("#ban_user_response").html("<p>" + jdata.msg + "</p>");
        $("#ban_user_response").show();
        jdata = null;
      });
    },
    deactivate_user : function() {
      var delayedWrite = User.post("admin/deactivate_user", {
        username : $("#deactivate_uname").val()
      });
      delayedWrite.done(function(jdata) {
        $("#deactivate_user_response").hide();
        if (jdata.result) {
          $("#deactivate_user_response").attr("class", "alert-message success");
        } else {
          $("#deactivate_user_response").attr("class", "alert-message error");
        }
        $("#deactivate_user_response").html("<p>" + jdata.msg + "</p>");
        $("#deactivate_user_response").show();
        jdata = null;
      });
    },
    delete_user_account : function() {
      var inputUsername = $("#delete_uname").val();
      if (confirm("Are you sure you want to delete " + inputUsername + "?")) {
        var delayedWrite = User.post("admin/delete_user_account", {
          username : inputUsername
        });
        delayedWrite.done(function(jdata) {
          $("#delete_user_account_response").hide();
          if (jdata.result) {
            $("#delete_user_account_response").attr("class", "alert-message success");
          } else {
            $("#delete_user_account_response").attr("class", "alert-message error");
          }
          $("#delete_user_account_response").html("<p>" + jdata.msg + "</p>");
          $("#delete_user_account_response").show();
          jdata = null;
        });
      }
    },
    change_username : function() {
      var delayedWrite = User.post("admin/change_username", {
        change_username_current : $("#change_username_current").val(),
        change_username_new : $("#change_username_new").val()
      });
      delayedWrite.done(function(jdata) {
        $("#change_username_response").hide();
        if (jdata.result) {
          $("#change_username_response").attr("class", "alert-message success");
        } else {
          $("#change_username_response").attr("class", "alert-message error");
        }
        $("#change_username_response").html("<p>" + jdata.msg + "</p>");
        $("#change_username_response").show();
        jdata = null;
      });
    },
    add_plus_days : function() {
      var delayedWrite = User.post("admin/add_plus_days", {
        add_plus_days : $("#add_plus_days_to_add").val(),
        username : $("#add_plus_days_username").val(),
        add_plus_remove : $("#add_plus_remove").val()
      });
      delayedWrite.done(function(jdata) {
        $("#add_plus_days_response").hide();
        if (jdata.result) {
          $("#add_plus_days_response").attr("class", "alert-message success");
        } else {
          $("#add_plus_days_response").attr("class", "alert-message error");
        }
        $("#add_plus_days_response").html("<p>" + jdata.msg + "</p>");
        $("#add_plus_days_response").show();
        jdata = null;
      });
    },
    generate_coupon_code : function() {
      var delayedWrite = User.post("admin/generate_coupon_code", {
        platform : $("#coupon_code_platform").val(),
        coins : $("#coupon_code_coins").val(),
        gems : $("#coupon_code_gems").val()
      });
      delayedWrite.done(function(jdata) {
        $("#coupon_code_response").hide();
        if (jdata.result) {
          $("#coupon_code_response").attr("class", "alert-message success");
        } else {
          $("#coupon_code_response").attr("class", "alert-message error");
        }
        $("#coupon_code_response").html("<p>" + jdata.msg + "</p>");
        $("#coupon_code_response").show();
        jdata = null;
      });
    },
    coupon_code_platform_changed : function(e) {
      $(".platforms").hide();
      $("." + e.target.value).show();
    },
    change_user_email : function() {
      var delayedWrite = User.post("admin/change_user_email", {
        username : $("#change_email_uname").val(),
        email : $("#change_email_email").val()
      });
      delayedWrite.done(function(jdata) {
        $("#change_user_email_response").hide();
        if (jdata.result) {
          $("#change_user_email_response").attr("class", "alert-message success");
        } else {
          $("#change_user_email_response").attr("class", "alert-message error");
        }
        $("#change_user_email_response").html("<p>" + jdata.msg + "</p>");
        $("#change_user_email_response").show();
        jdata = null;
      });
    },
    cache_get : function() {
      var delayedWrite = User.post("admin/cache_get", {
        get_delete_cache_key : $("#get_delete_cache_key").val()
      });
      delayedWrite.done(function(jdata) {
        $("#cache_get_delete_response").hide();
        if (jdata.result) {
          $("#cache_get_delete_response").attr("class", "alert-message success");
        } else {
          $("#cache_get_delete_response").attr("class", "alert-message error");
        }
        $("#cache_get_delete_response").html("<p>" + jdata.msg + "</p>");
        $("#cache_get_delete_response").show();
        jdata = null;
      });
    },
    cache_delete : function() {
      var delayedWrite = User.post("admin/cache_delete", {
        get_delete_cache_key : $("#get_delete_cache_key").val()
      });
      delayedWrite.done(function(jdata) {
        $("#cache_get_delete_response").hide();
        if (jdata.result) {
          $("#cache_get_delete_response").attr("class", "alert-message success");
        } else {
          $("#cache_get_delete_response").attr("class", "alert-message error");
        }
        $("#cache_get_delete_response").html("<p>" + jdata.msg + "</p>");
        $("#cache_get_delete_response").show();
        jdata = null;
      });
    },
    _get_admin_page : function() {
      var results = User.get("/admin");
      var self = this;
      results.done(function(e) {
        self.getTemplates(function() {
          self.render(e);
        });
      });
    },
    setup : function() {
      this.subscribe();
      Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load
      });
    },
    getTemplates : function(type) {
      var Config = this;
      self.getTemplates(next, function(loggerOpts) {
        Config.templates = loggerOpts;
        type();
        Config.setup();
      });
    },
    render : function(target) {
      var tmpl = this.templates["admin/admin_frame"];
      var status = {};
      var i = self.render(tmpl, status, target);
      this.$el.html(i);
    }
  });
  App.AdminView = serviceSettingsAdapter;
}(Application.Views = Application.Views || {}), function(s) {
  var self = Application.Helpers.TemplateHelper;
  var $http = Application.Helpers.AjaxHelper;
  var Http = Application.Helpers.MentionsHelper;
  var insight = Application.Helpers.GoogleAnalyticsHelper;
  var next = ["account/settings"];
  var adblockTester = Backbone.View.extend({
    templates : [],
    events : {
      "click #account-photo-type" : "select_profile_image",
      "click .toggle-edit-button" : "toggle_edit_button",
      "click .save-data-button.personal" : "update_personal_data",
      "change .dropdown-menu" : "update_personal_data",
      "click .save-data-button.profile" : "edit_profile",
      "click #delete-all-personal-data" : "delete_all_personal_data",
      "click #update-password" : "change_password",
      "click #join-the-forum" : "forum_account",
      "click #plus_transfer_coins_button" : "plus_transfer_coins",
      "click #change_password_button" : "change_password"
    },
    initialize : function(castNode) {
      this.initial_page_load = castNode.initial_page_load;
      if (Application.User.is_logged_in()) {
        if (this.initial_page_load === true) {
          this.setup();
        } else {
          this._get_account_settings();
        }
      } else {
        Application.router.navigate("/", {
          trigger : true,
          replace : false
        });
      }
    },
    toggle_edit_button : function(jEvent) {
      var e = $(jEvent.target);
      if (e.hasClass("edit-button")) {
        e.toggle();
        e.parent().children(".edit-form-container").toggle();
        e.parent().children(".display-text").toggle();
        var mocha_treeview = e.parent().children(".response");
        if (mocha_treeview.is(":visible")) {
          mocha_treeview.toggle();
        }
      } else {
        var oCalen = e.parent().parent();
        e.parent().toggle();
        oCalen.children(".toggle-edit-button").toggle();
        oCalen.children(".display-text").toggle();
        mocha_treeview = oCalen.children(".response");
        if (mocha_treeview.is(":visible")) {
          mocha_treeview.toggle();
        }
      }
    },
    update_personal_data : function(jEvent) {
      var $item = $(jEvent.target);
      if ($item.hasClass("dropdown-menu")) {
        $item = $item.find(":selected");
        var action = $item.data("name");
        var val = $item.val();
      } else {
        action = $item.data("name");
        val = $item.parent().children(".account-settings-input-form").val();
      }
      var $this = $("#" + action + "_response");
      var delayedWrite = $http.post("account/update_personal_data", {
        name : action,
        value : val
      });
      delayedWrite.done(function(jdata) {
        $this.hide();
        if (jdata.result) {
          $this.addClass("alert-message success");
          if ("" === val) {
            val = "unknown";
          }
          $item.parent().parent().children(".display-text").children("p").text(val);
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-success"
          });
        } else {
          $this.addClass("alert-message error");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-error-" + jdata.msg
          });
        }
        $this.html("<p>" + jdata.msg + "</p>");
        $this.css("margin-top", "5px");
        $this.show();
        jdata = null;
      });
      $item.parent().children(".cancel-button").click();
    },
    edit_profile : function(res) {
      var s = $(res.target);
      var action = s.data("name");
      var a = s.parent().children(".account-settings-input-form").val();
      var $this = $("#" + action + "_response");
      var delayedWrite = $http.post("account/edit_profile", {
        name : action,
        value : a
      });
      delayedWrite.done(function(t) {
        $this.hide();
        if (t.result) {
          $this.addClass("alert-message success");
          s.parent().parent().children(".display-text").children("p").text(a);
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-success"
          });
          if ("undefined" != typeof t.data && "undefined" != typeof t.data.changes_left) {
            if (t.data.changes_left <= 0) {
              $("#edit-username-button").remove();
              $("#edit-username-save-container").remove();
            }
            $("#uname-change-count").text(t.data.changes_left);
          }
        } else {
          $this.addClass("alert-message error");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-error-" + t.msg
          });
        }
        $this.html("<p>" + t.msg + "</p>");
        $this.css("margin-top", "5px");
        $this.show();
        t = null;
      });
      s.parent().children(".cancel-button").click();
    },
    change_password : function(res) {
      var e = $("#user-change-password-response");
      var delayedWrite = $http.post("account/change_password", {
        old_password : $("#old-password").val(),
        new_password : $("#new-password").val()
      });
      delayedWrite.done(function(jdata) {
        e.hide();
        if (jdata.result) {
          e.attr("class", "alert-message success");
        } else {
          e.attr("class", "alert-message error");
        }
        e.html("<p>" + jdata.msg + "</p>");
        e.show();
        jdata = null;
      });
    },
    plus_transfer_coins : function(n) {
      var command_module_id = $("#transfer_coins_amount").val();
      var delayedWrite = $http.post("account/plus_transfer_coins", {
        transfer_coins_to : $("#transfer_coins_to").val(),
        transfer_coins_amount : command_module_id,
        msg : $("#transfer_coins_msg").val()
      });
      delayedWrite.done(function(jdata) {
        $("#transfer_coins_response").hide();
        if (jdata.result) {
          $("#transfer_coins_response").attr("class", "alert-message success");
          insight.track_event({
            category : "account",
            action : "plus-transfer-coins",
            label : "plus-transfer-success",
            value : command_module_id
          });
        } else {
          $("#transfer_coins_response").attr("class", "alert-message error");
          insight.track_event({
            category : "account",
            action : "plus-transfer-coins",
            label : "plus-transfer-error-" + jdata.msg
          });
        }
        $("#transfer_coins_response").html("<p>" + jdata.msg + "</p>");
        $("#transfer_coins_response").css("margin-top", "5px");
        $("#transfer_coins_response").show();
        jdata = null;
      });
    },
    forum_account : function(s) {
      var delayedWrite = $http.post("account/update_forum_account", {
        password : $("#forum_password").val()
      });
      delayedWrite.done(function(jdata) {
        $("#forum_account_response").hide();
        if (jdata.result) {
          $("#forum_account_response").attr("class", "alert-message success");
          $("#create-forum-account-header").text("Edit Forum Account");
          $("#register-forum-account-button").text("Update & Save");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-success"
          });
        } else {
          $("#forum_account_response").attr("class", "alert-message error");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-error-" + jdata.msg
          });
        }
        $("#forum_account_response").html("<p>" + jdata.msg + "</p>");
        $("#forum_account_response").css("margin-top", "5px");
        $("#forum_account_response").show();
        jdata = null;
      });
    },
    delete_all_personal_data : function() {
      var $this = $("#delete-all-data-response");
      var delayedWrite = $http.post("account/delete_all_personal_data");
      delayedWrite.done(function(jdata) {
        $(".response").hide();
        if (jdata.result) {
          $this.attr("class", "alert-message success");
          $("#personal-data-content").children(".list-item").children(".display-text").children("p").text("unknown");
          $("#dropdown-menu").val("unknown");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-success"
          });
        } else {
          $this.attr("class", "alert-message error");
          insight.track_event({
            category : "account",
            action : "forum-register",
            label : "forum-register-error-" + jdata.msg
          });
        }
        $this.html("<p>" + jdata.msg + "</p>");
        $this.css("margin-top", "5px");
        $this.show();
        jdata = null;
      });
    },
    select_profile_image : function(event) {
      var e = $(event.currentTarget);
      this.$(".account-photo-type").removeClass("selected");
      e.addClass("selected");
      var previewOnFunction = e.data("type");
      $http.post("account/update_photo", {
        img_type : previewOnFunction
      });
    },
    close : function() {
      this._destory_mentions();
    },
    subscribe : function() {
    },
    _destory_mentions : function() {
      if ("undefined" != typeof this.mentions) {
        this.mentions.destroy();
      }
    },
    _init_mentions : function() {
      var mokcBackend = this.$el.find("#transfer_coins_to");
      var opts = {
        regex : /^[a-zA-Z0-9_+\-.]*/g,
        css : {
          width : "323px"
        },
        trigger : ""
      };
      this.mentions = new Http(mokcBackend, opts);
    },
    _get_account_settings : function() {
      var settingsEndpoint = $http.get("/account/settings");
      var me = this;
      settingsEndpoint.done(function(t) {
        me.getTemplates(function() {
          me.render(t);
        });
      });
    },
    setup : function() {
      this.subscribe();
      Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load
      });
      this._init_mentions();
    },
    getTemplates : function(type) {
      var Config = this;
      self.getTemplates(next, function(loggerOpts) {
        Config.templates = loggerOpts;
        type();
        Config.setup();
      });
    },
    render : function(target) {
      var tmpl = this.templates["account/settings"];
      var status = {};
      var i = self.render(tmpl, status, target);
      this.$el.html(i);
    }
  });
  s.AccountSettingsView = adblockTester;
}(Application.Views = Application.Views || {}), function(i) {
  var _ = Application.Helpers.TemplateHelper;
  var app = Application.Helpers.AjaxHelper;
  var _self = Application.Helpers.ShareHelper;
  var imgloaded = Backbone.View.extend({
    on_leave : "Are you sure you want to leave? Your track will be erased",
    cached_templates : [],
    events : {
      "click #create_signup" : "prompt_signup",
      "click #create_login" : "prompt_login",
      "click .sprite-share_small" : "share",
      "click .splash-add-to-chrome" : "add_to_chrome",
      "click .splash-rate-chrome" : "rate_chrome",
      "click #editor-anchor" : "fullscreen"
    },
    initialize : function(description) {
      var that = this;
      if (this.initial_page_load = description.initial_page_load, this.left_nav = description.left_nav, Application.settings.is_mobile && (this.on_leave = false), description.initial_page_load) {
        this._setup();
      } else {
        var t = description.templates;
        var after = this._createTemplatesArray(t);
        this._getTemplates(after, function(data) {
          data = that._mapTemplates(t, data);
          that._get_page(function(href) {
            that._render(data, href);
            that._setup();
          });
        });
      }
    },
    focus : function(needsMoreTime) {
      this.$("iframe").get(0).contentWindow.focus();
    },
    _get_page : function(saveNotifs) {
      var xhr = app.get("create/");
      xhr.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    _setup : function() {
      this._subscribe();
      var opts = {
        left_nav : this.left_nav,
        initial_page_load : this.initial_page_load,
        page_class : "create"
      };
      if (Application.User.has("u_id") === false) {
        opts.page_class = "logged-out-create";
      }
      Application.events.publish("mainview.loaded", opts);
      this.focus();
    },
    close : function() {
      this.$el.unbind();
      this._unsubscribe();
    },
    _unsubscribe : function() {
      Application.events.unsubscribe("resize");
      Application.events.unsubscribe("game", true);
    },
    _subscribe : function() {
      Application.events.subscribe("resize", $.proxy(this.resize_iframe, this));
      Application.events.subscribe("game.fullscreen", $.proxy(this.fullscreen, this));
      Application.events.subscribe("game.redirect", $.proxy(this.redirect, this));
    },
    redirect : function(input) {
      console.log(this);
      this.on_leave = null;
      Application.router.do_route(input);
    },
    fullscreen : function() {
      if (Application.settings.is_mobile) {
        window.location = Application.settings.base_platform_url + "/editor";
      } else {
        if (confirm("Are you sure you want to go fullscreen? (This will erase the current track. You may export your track , and then import it back in when the new page loads)")) {
          window.location = Application.settings.base_platform_url + "/editor";
        }
      }
    },
    resize_iframe : function() {
      var $This = this.$(".create-track-wrapper");
      var count = $This.width();
      var i = $(document).width();
      if (count && i > count) {
        var s = Math.round(0.5625 * count);
        if (!(600 >= s)) {
          $This.height(600);
        }
      }
    },
    share : function(link) {
      var $share_link = $(link.target).closest(".sprite-share_small");
      var response = $share_link.data("service");
      var code = $share_link.parents(".splash-social-share").data();
      code.share_item = "track-creator";
      _self.share(response, code);
    },
    add_to_chrome : function() {
      if ("undefined" != typeof chrome) {
        chrome.webstore.install("", function() {
          window.location.replace("http://www.freeriderhd.com/auth/google_oauth2/auth/chromewebstore");
          var entry = {
            category : "cws-inline-install",
            action : "cws-inline-install-success"
          };
          if (Application.User.is_logged_in()) {
            entry.label = "loggedin-create";
          } else {
            entry.label = "new-create";
          }
          Application.Helpers.GoogleAnalyticsHelper.track_event(entry);
        }, function(yes_label) {
          var globalOptions = {
            category : "cws-inline-install",
            action : "cws-inline-install-fail",
            label : yes_label
          };
          Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
        });
      }
    },
    rate_chrome : function() {
      var globalOptions = {
        category : "cws-rate",
        action : "cws-rate-click",
        label : "cws-rate-create-link"
      };
      Application.Helpers.GoogleAnalyticsHelper.track_event(globalOptions);
      app.post("account/cws_rate", {});
      window.open("https://chrome.google.com/webstore/detail/free-rider-hd/emikpifndnjfkgofoglceekhkbaicbde/reviews", "_blank");
    },
    prompt_login : function() {
      Application.events.publish("prompt.login");
    },
    prompt_signup : function() {
      Application.events.publish("prompt.signup");
    },
    _createTemplatesArray : function(template) {
      var _ = [];
      return _.push(template.main), _ = _.concat(template.partials);
    },
    _mapTemplates : function(options, args) {
      var data = {};
      return data.main = args[options.main], data.partials = {}, $.each(options.partials, function(s, key) {
        data.partials[key] = args[key];
      }), data;
    },
    _getTemplates : function(section, callback) {
      var self = this;
      _.getTemplates(section, function(templates) {
        self.templates = templates;
        callback(templates);
      });
    },
    _render : function(data, options) {
      var state = _.render(data.main, data.partials, options);
      if (this.$el.html(state), Application.User.has("u_id") === false) {
        data = data.partials;
        var key = data["track_listing/track_column"];
        var deep = {
          "ads/300x250_1_ad" : data["ads/300x250_1_ad"],
          "track_listing/track_listing_tile" : data["track_listing/track_listing_tile"]
        };
        var n = _.render(key, deep, options.track_column_data);
        $("#right_content").html(n);
      }
    }
  });
  i.CreateView = imgloaded;
}(Application.Views = Application.Views || {}), function(state) {
  var View = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper, Application.Views.ViewTemplate);
  var aRequest = Application.Helpers.FacebookHelper;
  var size = View.extend({
    gameContainerId : "#game-container",
    $cachedGameContainer : null,
    templates : {
      main : "create/editor",
      partials : []
    },
    request : "/create",
    resizeHandler : null,
    fullscreen : false,
    events : {},
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        prompt : true,
        left_nav : "create",
        initial_page_load : this.initial_page_load,
        page_class : "editor-view"
      });
      this.resizeHandler = this.resize.bind(this);
      this.resizeEditor();
      this.stateChangedHandler = this.gameStateChanged.bind(this);
      this.startGame();
      this._subscribe();
      if (!Application.User.get("classic")) {
        GameManager.command("change tool option", "teleport_disabled", true, "powerup");
      }
    },
    getGameContainer : function() {
      return null === this.$cachedGameContainer && (this.$cachedGameContainer = $(this.gameContainerId)), this.$cachedGameContainer;
    },
    startGame : function() {
      var $container = this.getGameContainer();
      React.render(EditorGui, $container[0]);
      GameManager.init("Editor", GameSettings);
      GameManager.on("stateChange", this.stateChangedHandler);
      this.listenForGameFocusEvents();
    },
    listenForGameFocusEvents : function() {
      this.onBodyClickHandler = this.onBodyClick.bind(this);
      this.unfocusGameHandler = this.unFocusOnGame.bind(this);
      $(window).on("blur", this.unfocusGameHandler);
      document.addEventListener("click", this.onBodyClickHandler);
    },
    unlistenForGameFocusEvents : function() {
      document.removeEventListener("click", this.onBodyClickHandler);
      $(window).off("blur", this.unfocusGameHandler);
      this.unfocusGameHandler = null;
      this.onBodyClickHandler = null;
    },
    onBodyClick : function(event) {
      var $subHeader = $(event.target);
      if ($subHeader.parents("#game-container").length > 0) {
        this.focusOnGame();
      } else {
        this.unFocusOnGame();
      }
    },
    unFocusOnGame : function() {
      GameManager.command("focused", false);
    },
    focusOnGame : function() {
      GameManager.command("focused", true);
    },
    gameStateChanged : function(wsappui) {
      if (this.fullscreen && wsappui.fullscreen === false) {
        this.fullscreen = false;
        this.unfullscreenGame();
        this.resizeEditor();
      } else {
        if (this.fullscreen === false && wsappui.fullscreen === true) {
          this.fullscreen = true;
          this.fullscreenGame();
          this.resizeEditor();
        }
      }
    },
    unfullscreenGame : function() {
      this.$cachedGameContainer.removeClass("game-fullscreen");
      this.$el.find(".editor-page").html(this.$cachedGameContainer);
      $("html").removeClass("fullscreen");
      GameSettings.fullscreen = false;
      this.resize();
    },
    fullscreenGame : function() {
      this.$cachedGameContainer.addClass("game-fullscreen");
      $("body").prepend(this.$cachedGameContainer);
      $("html").addClass("fullscreen");
      GameSettings.fullscreen = true;
      this.resize();
    },
    bigScreenExit : function() {
      GameSettings.fullscreen = false;
    },
    bigScreenEnter : function() {
      GameSettings.fullscreen = true;
    },
    resizeEditor : function() {
      var n = this;
      var selectedDiv = this.getGameContainer();
      var reflectionWidth = "100%";
      var h = window.innerHeight;
      var info = $("#header");
      var canvas = {};
      if ("fb_canvas" === Application.settings.platform && this.fullscreen === false) {
        h = 600;
        canvas["border-bottom"] = "2px solid #333";
        aRequest.getPageInfo(function(header) {
          var i = n.getGameContainer();
          var e = {};
          e.width = "100%";
          e.height = header.clientHeight - header.offsetTop - info.height();
          i.css(e);
          GameManager.resize();
        });
      } else {
        if (this.fullscreen === false) {
          h = h - info.height();
        }
      }
      canvas.width = reflectionWidth;
      canvas.height = h;
      selectedDiv.css(canvas);
    },
    resize : function() {
      this.resizeEditor();
      GameManager.resize();
    },
    close : function() {
      this.unfullscreenGame();
      GameManager.removeListener("stateChange", this.stateChangedHandler);
      GameManager.close();
      React.unmountComponentAtNode(this.getGameContainer()[0]);
      this.unlistenForGameFocusEvents();
      this._unsubscribe();
      this.stateChangedHandler = null;
      this.resizeHandler = null;
    },
    _unsubscribe : function() {
      var events = Application.events;
      events.unsubscribe("resize", this.resizeHandler);
    },
    _subscribe : function() {
      var events = Application.events;
      events.subscribe("resize", this.resizeHandler);
    },
    render : function(type) {
      var html = this._render(this.templates, type);
      this.$el.html(html);
      this._setup();
    }
  });
  state.EditorView = size;
}(Application.Views = Application.Views || {}), function(HTMLSectionBuilder) {
  var self = Application.Helpers.TemplateHelper;
  var links = Application.Helpers.AjaxHelper;
  var HTMLSection = Backbone.View.extend({
    cached_templates : [],
    countdownTimer : null,
    unlockCampaignDialog : null,
    initialize : function(description) {
      var that = this;
      if (this.initial_page_load = description.initial_page_load, this.left_nav = description.left_nav, description.initial_page_load) {
        this._setup();
      } else {
        var t = description.templates;
        var after = this._createTemplatesArray(t);
        this._getTemplates(after, function(data) {
          data = that._mapTemplates(t, data);
          that._get_page(function(href) {
            that._render(data, href);
            that._setup();
          });
        });
      }
    },
    events : {
      "click .campaign-item.locked" : "unlock_campaign"
    },
    unlock_campaign : function(event) {
      if (this.check_login(event)) {
        var target = $(event.currentTarget);
        var i = target.data("id");
        if (target.hasClass("contest") === false) {
          this.unlockCampaignDialog = new Application.Views.CampaignUnlockModal({
            id : i
          });
        }
      }
    },
    check_login : function(event) {
      return Application.User.logged_in === false ? (event.stopPropagation(), event.preventDefault(), Application.events.publish("prompt.signup", {
        analytics : "campaign-listing"
      }), false) : true;
    },
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        left_nav : this.left_nav,
        initial_page_load : this.initial_page_load
      });
    },
    close : function() {
      this.$el.unbind();
      if (null !== this.unlockCampaignDialog) {
        this.unlockCampaignDialog.close();
        this.unlockCampaignDialog = null;
      }
    },
    go_back : function() {
      Application.events.publish("router.back");
    },
    _subscribe : function() {
    },
    _get_page : function(saveNotifs) {
      var campaign = links.get("/campaign");
      campaign.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    _createTemplatesArray : function(template) {
      var _ = [];
      return _.push(template.main), _ = _.concat(template.partials);
    },
    _mapTemplates : function(options, args) {
      var data = {};
      return data.main = args[options.main], data.partials = {}, $.each(options.partials, function(s, key) {
        data.partials[key] = args[key];
      }), data;
    },
    _getTemplates : function(section, callback) {
      var freeExports = this;
      self.getTemplates(section, function(templates) {
        freeExports.templates = templates;
        callback(templates);
      });
    },
    _render : function(data, target) {
      var styles = self.render(data.main, data.partials, target);
      this.$el.html(styles);
    }
  });
  HTMLSectionBuilder.CampaignView = HTMLSection;
}(Application.Views = Application.Views || {}), function(HTMLSectionBuilder) {
  var self = Application.Helpers.TemplateHelper;
  var leadModel = Application.Helpers.AjaxHelper;
  var HTMLSection = Backbone.View.extend({
    cached_templates : [],
    countdownTimer : null,
    initialize : function(description) {
      var that = this;
      if (this.initial_page_load = description.initial_page_load, this.left_nav = description.left_nav, this.campaign_slug = description.campaign_slug, description.initial_page_load) {
        this._setup();
      } else {
        var t = description.templates;
        var after = this._createTemplatesArray(t);
        this._getTemplates(after, function(data) {
          data = that._mapTemplates(t, data);
          that._get_page(function(href) {
            that._render(data, href);
            that._setup();
          });
        });
      }
    },
    events : {
      "click .campaign-tile-skip" : "skip_campaign",
      "click .campaign_complete_icons-campaign_locked_icon" : "unlock_campaign"
    },
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        left_nav : this.left_nav,
        initial_page_load : this.initial_page_load
      });
    },
    close : function() {
      this.$el.unbind();
    },
    go_back : function() {
      Application.events.publish("router.back");
    },
    _subscribe : function() {
    },
    skip_campaign : function(event) {
      var $ele = $(event.currentTarget);
      var i = $ele.data("id");
      var cost = $ele.data("cost");
      new Application.Views.CampaignSkipModal({
        id : i,
        cost : cost,
        success : function(retu_data) {
          Application.router.refresh();
        },
        fail : function(res) {
          alert(res.msg);
        },
        cancel : function() {
        }
      });
    },
    unlock_campaign : function(event) {
      var jQScrollable = $(event.currentTarget);
      var _ = jQScrollable.data("id");
      new Application.Views.CampaignUnlockModal({
        id : _,
        success : function(retu_data) {
          Application.router.do_route("/campaign/" + _);
        },
        fail : function(res) {
          alert(res.msg);
        },
        cancel : function() {
        }
      });
    },
    _get_page : function(saveNotifs) {
      var delayedWrite = leadModel.get("/campaign/" + this.campaign_slug);
      delayedWrite.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    _createTemplatesArray : function(template) {
      var _ = [];
      return _.push(template.main), _ = _.concat(template.partials);
    },
    _mapTemplates : function(options, args) {
      var data = {};
      return data.main = args[options.main], data.partials = {}, $.each(options.partials, function(s, key) {
        data.partials[key] = args[key];
      }), data;
    },
    _getTemplates : function(section, callback) {
      var freeExports = this;
      self.getTemplates(section, function(templates) {
        freeExports.templates = templates;
        callback(templates);
      });
    },
    _render : function(data, target) {
      var styles = self.render(data.main, data.partials, target);
      this.$el.html(styles);
    }
  });
  HTMLSectionBuilder.CampaignPageView = HTMLSection;
}(Application.Views = Application.Views || {}), function(HTMLSectionBuilder) {
  var self = Application.Helpers.TemplateHelper;
  var SettingsHelper = Application.Helpers.AjaxHelper;
  var HTMLSection = Backbone.View.extend({
    cached_templates : [],
    countdownTimer : null,
    initialize : function(description) {
      var that = this;
      if (this.initial_page_load = description.initial_page_load, this.left_nav = description.left_nav, description.initial_page_load) {
        this._setup();
      } else {
        var t = description.templates;
        var after = this._createTemplatesArray(t);
        this._getTemplates(after, function(data) {
          data = that._mapTemplates(t, data);
          that._get_page(function(href) {
            that._render(data, href);
            that._setup();
          });
        });
      }
    },
    _setup : function() {
      this._start_timer();
      Application.events.publish("mainview.loaded", {
        left_nav : this.left_nav,
        initial_page_load : this.initial_page_load
      });
    },
    close : function() {
      clearInterval(this.countdownTimer);
      this.$el.unbind();
    },
    go_back : function() {
      Application.events.publish("router.back");
    },
    _subscribe : function() {
    },
    _get_page : function(saveNotifs) {
      var a = SettingsHelper.get("/achievements");
      a.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    _start_timer : function() {
      clearInterval(this.countdownTimer);
      var row = this.$el.find(".achievements-type-time-remaining-val");
      if (row.length > 0) {
        var whiteRating = parseInt(row.data("time"));
        var value = row[0];
        var $dialogWidget = this;
        this.countdownTimer = setInterval(function() {
          whiteRating--;
          if (0 >= whiteRating) {
            this.close();
            Application.events.publish("refresh");
          }
          var seconds_left = whiteRating;
          parseInt(seconds_left / 86400);
          seconds_left = seconds_left % 86400;
          var p = parseInt(seconds_left / 3600);
          seconds_left = seconds_left % 3600;
          var d = parseInt(seconds_left / 60);
          var id = parseInt(seconds_left % 60);
          if (10 > p) {
            p = "0" + p;
          }
          if (10 > d) {
            d = "0" + d;
          }
          if (10 > id) {
            id = "0" + id;
          }
          if ("undefined" != typeof value) {
            value.innerHTML = " " + p + ":" + d + ":" + id;
          } else {
            clearInterval($dialogWidget.countdownTimer);
          }
        }, 1e3);
      }
    },
    _createTemplatesArray : function(template) {
      var _ = [];
      return _.push(template.main), _ = _.concat(template.partials);
    },
    _mapTemplates : function(options, args) {
      var data = {};
      return data.main = args[options.main], data.partials = {}, $.each(options.partials, function(s, key) {
        data.partials[key] = args[key];
      }), data;
    },
    _getTemplates : function(section, callback) {
      var freeExports = this;
      self.getTemplates(section, function(templates) {
        freeExports.templates = templates;
        callback(templates);
      });
    },
    _render : function(data, target) {
      var styles = self.render(data.main, data.partials, target);
      this.$el.html(styles);
    }
  });
  HTMLSectionBuilder.AchievementsView = HTMLSection;
}(Application.Views = Application.Views || {}), function(i) {
  var md = Application.Helpers.TemplateHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  var self = Application.Helpers.FacebookHelper;
  var imgloaded = Backbone.View.extend({
    showTime : 7e3,
    activeNotification : false,
    hideTimeout : null,
    initialize : function(proxy) {
      this.getTemplate();
      this.pendingNotifications = [];
      if (proxy.web) {
        this.web = true;
      }
    },
    removeNotification : function(model) {
      setTimeout(function() {
        model.unbind();
        model.remove();
      }, this.showTime);
    },
    fireEvent : function(event) {
      var target = $(event.currentTarget).data("action");
      if (target) {
        Application.events.publish(target);
      }
    },
    hideNotification : function(notification_id) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
      if (this.activeNotification) {
        this.activeNotification.addClass("bounceOutUp");
        this.removeNotification(this.activeNotification);
        this.activeNotification = false;
        this.checkPendingNotifications();
      }
    },
    checkPendingNotifications : function() {
      if (this.pendingNotifications.length > 0) {
        var cb = this.pendingNotifications.shift();
        this.notify(cb);
      }
    },
    notify : function(data) {
      if (this.activeNotification !== false) {
        this.pendingNotifications.push(data);
      } else {
        var s = $(this._render(this._template, data));
        this.activeNotification = s;
        if (this.web) {
          s.addClass("achievement-notification-web");
        }
        $("#popdown_notifications").prepend(s);
        s.removeClass("animated bounceInDown").addClass("animated bounceInDown");
        s.show();
        s.click(this.hideNotification.bind(this));
        s.click(this.fireEvent.bind(this));
        if (data.campaign_event) {
          metrics.track_event({
            category : "campaign-event",
            action : data.type,
            label : data.type + "_" + data.campaign_id
          });
          s.click(function() {
            metrics.track_event({
              category : "campaign-event",
              action : data.type + "_clicked",
              label : data.type + "_" + data.campaign_id
            });
          });
          if (self.isAppEventsEnabled()) {
            self.logCustomAppEvent(data.type, {
              value : null,
              params : {
                c_id : data.campaign_id
              }
            });
          }
        } else {
          if (data.achievement_event) {
            metrics.track_event({
              category : "achievement",
              action : "achievement-earned",
              label : data.type
            });
            s.click(function() {
              metrics.track_event({
                category : "achievement",
                action : "achievement-earned-clicked",
                label : data.type
              });
            });
            if (self.isAppEventsEnabled()) {
              self.logCustomAppEvent("achievement", {
                value : null,
                params : {
                  type : data.type
                }
              });
            }
          } else {
            if (data.leaderboard_passed_event) {
              metrics.track_event({
                category : "leaderboard",
                action : "leaderboard-" + data.type,
                label : data.value
              });
              s.click(function() {
                metrics.track_event({
                  category : "leaderboard",
                  action : "leaderboard-" + data.type + "-clicked",
                  label : data.value
                });
              });
            } else {
              if (data.inventory_unlocked_event) {
                metrics.track_event({
                  category : "inventory",
                  action : "inventory-unlocked",
                  label : data.type
                });
                s.click(function() {
                  metrics.track_event({
                    category : "inventory",
                    action : "inventory-unlocked-clicked",
                    label : data.type
                  });
                });
              } else {
                if (data.rewarded_video_event) {
                  metrics.track_event({
                    category : "rewarded-video",
                    action : "rewarded-video-prompt-shown",
                    label : "rewarded-video-prompt-shown-" + data.ad_network
                  });
                  if ("ironsource" == data.ad_network) {
                    s.click(function() {
                      try {
                        showRV("popdown_notification");
                        metrics.track_event({
                          category : "rewarded-video",
                          action : "rewarded-video-prompt-clicked",
                          label : "ironsource-clicked"
                        });
                      } catch (t) {
                      }
                    });
                  }
                }
              }
            }
          }
        }
        this.hideTimeout = setTimeout(this.hideNotification.bind(this), this.showTime);
      }
    },
    _render : function(e, target) {
      var result = md.render(e, {}, target);
      return result;
    },
    getTemplate : function() {
      this._template = $("#popdown_notification").html();
    }
  });
  i.AchievementNotificationView = imgloaded;
}(Application.Views = Application.Views || {}), function(s) {
  var self = Application.Helpers.TemplateHelper;
  var mstream = Application.Helpers.AjaxHelper;
  var insight = Application.Helpers.GoogleAnalyticsHelper;
  var Article = Application.Helpers.MentionsHelper;
  var opts = Application.Helpers.ShareHelper;
  var section = ["friends/add_friends"];
  var adblockTester = Backbone.View.extend({
    initialize : function() {
      var binarizer = this;
      this.get_templates(function() {
        binarizer.render();
        binarizer.setup();
      });
    },
    events : {
      "click .friends-invite-input .placeholder" : "focus_input",
      "propertychange .friends-invite-input input" : "hide_placeholder",
      "input .friends-invite-input input" : "hide_placeholder",
      "paste .friends-invite-input input" : "hide_placeholder",
      "focus .friends-invite-input input" : "fade_placeholder",
      "blur .friends-invite-input input" : "reset_placeholder",
      "click #send_friend_request" : "send_friend_request",
      "click #invite_friends_button" : "invite_friends",
      "click .share-icon" : "share_game",
      "click .share-input" : "share_game_input"
    },
    share_game_input : function(event) {
      $(event.currentTarget).select();
    },
    share_game : function(event) {
      var $share_link = $(event.currentTarget);
      var response = $share_link.data("service");
      var content = $share_link.parents(".share").data();
      content.share_item = "invite";
      opts.share(response, content);
    },
    _init_mentions : function() {
      var a = this.$el.find(".friends-invite-input").find("input");
      var options = {
        regex : /^[a-zA-Z0-9_+\-.]*/g,
        css : {
          width : "323px"
        },
        trigger : ""
      };
      this.mentions = new Article(a, options);
    },
    _destory_mentions : function() {
      if ("undefined" != typeof this.mentions) {
        this.mentions.destroy();
      }
    },
    setup : function() {
      this._init_mentions();
    },
    close : function() {
      this._destory_mentions();
      this.$el.unbind();
    },
    update : function() {
    },
    invite_friends : function() {
      Application.Helpers.FacebookHelper.inviteFriends();
    },
    focus_input : function(jEvent) {
      var settingsItem = $(jEvent.target).closest(".placeholder").parents(".friends-invite-input");
      var checkedInput = settingsItem.find("input");
      checkedInput.trigger("focus");
    },
    hide_placeholder : function(e) {
      $(e.target).closest("input").parents(".friends-invite-input").find(".placeholder").hide();
    },
    send_friend_request : function() {
      var matchValue2 = this;
      var knob_elem = this.$el.find(".friends-invite-input").find("input");
      var s = knob_elem.val();
      if ("undefined" != typeof this.mentions) {
        this.mentions.removeMentions();
      }
      var delayedWrite = mstream.post("friends/send_friend_request", {
        u_name : s
      });
      delayedWrite.done(function(data) {
        var msg = '<span class="ico_moon icon-checkmark"></span>';
        if (data.result) {
          knob_elem.val("");
          insight.track_event({
            category : "friends",
            action : "friend-request-sent",
            label : "success",
            value : data.f_cnt
          });
        } else {
          msg = '<span class="ico_moon icon-close"></span>';
          insight.track_event({
            category : "friends",
            action : "friend-request-sent",
            label : "error-" + data.msg
          });
        }
        msg = msg + data.msg;
        matchValue2.$(".sent-request-response").html(msg);
      });
    },
    fade_placeholder : function(jEvent) {
      var filteredView = $(jEvent.target).closest("input").parents(".friends-invite-input");
      filteredView.find(".friends-invite-input").addClass("outlined");
      filteredView.find(".track-comment-actions").show();
      filteredView.find(".placeholder").addClass("faded");
    },
    reset_placeholder : function(e) {
      var settingsItem = $(e.target).parents(".friends-invite-input");
      settingsItem.find(".friends-invite-input").removeClass("outlined");
      var knob_elem = settingsItem.find("input");
      if ("" === knob_elem.val()) {
        settingsItem.find(".track-comment-actions").hide();
        settingsItem.find(".placeholder").show().removeClass("faded");
      }
    },
    render : function() {
      var value = this.templates;
      var stdout = value[section[0]];
      var result = self.render(stdout, {}, {
        u_name : Application.settings.user.u_name
      });
      this.$el.html(result);
    },
    get_templates : function(template) {
      var thisPlot = this;
      self.getTemplates(section, function(data) {
        thisPlot.templates = data;
        template();
      });
    }
  });
  s.AddFriendsView = adblockTester;
}(Application.Views = Application.Views || {}), function(n) {
  var self = Application.Helpers.TemplateHelper;
  var t = Application.Helpers.AjaxHelper;
  var c = Application.Helpers.ShareHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  var next = ["friends/challenge_friends"];
  var inComponent = Backbone.View.extend({
    initialize : function(options) {
      this.options = options;
      this.track_slug = options.track_slug;
      this.challenge_request = null;
      metrics.track_event({
        category : "challenge",
        action : "challenge-friend-open",
        label : this.track_slug
      });
      var t = this;
      this.get_templates(function() {
        t.get_challenge_data();
      });
    },
    update : function() {
      this.refresh_scrollbar();
    },
    events : {
      "click .challenge-friend" : "select_friend",
      "click .facebook-share" : "select_friend",
      "click #send-challenge-btn" : "send_challenge",
      "click .challenge-friends-select-all" : "select_all_friends",
      "click .challenge-no-friends .add-friends" : "goto_add_friends"
    },
    goto_add_friends : function() {
      $("#add_friends_tab").click();
    },
    select_all_friends : function(event) {
      var e = $(event.currentTarget);
      e.toggleClass("selected");
      var notebook_cell_div = $(".challenge-friend");
      if (e.hasClass("selected")) {
        notebook_cell_div.addClass("selected");
      } else {
        notebook_cell_div.removeClass("selected");
      }
    },
    send_challenge : function(event) {
      var s = this;
      var $row = $(event.currentTarget);
      var opts = this.options;
      if (null === this.challenge_request) {
        this.request_challenge(function() {
          var titlesel = $("div.challenge-invite div.facebook-share").hasClass("selected");
          if (titlesel && (Application.settings.is_fb_canvas || Application.settings.is_fb_mobile)) {
            s.send_challenge_fb_og();
          }
          $row.html("Challenge Sent! Closing...");
          $row.addClass("success");
          setTimeout(function() {
            if (opts.full_page) {
              Application.router.do_route("/t/" + opts.track_slug);
            } else {
              $.modal.close();
            }
          }, 1e3);
          $row = null;
        });
      }
    },
    send_challenge_fb_og : function() {
      var title = "facebook_og";
      var content = $(".track-about-challenge").data();
      var type = $(".challenge-msg").find("input").val();
      if (type) {
        content.message = type;
      }
      content.share_item = "challenge";
      c.share(title, content);
    },
    select_friend : function(event) {
      var t = $(event.currentTarget);
      t.toggleClass("selected");
    },
    setup : function() {
      this.init_scrollbar();
    },
    close : function() {
    },
    init_scrollbar : function() {
      if (!this.options.full_page) {
        if ($(".challenge-friends-wrapper").length > 0) {
          this.scrollbar = new IScroll(".challenge-friends-wrapper", {
            mouseWheel : true,
            interactiveScrollbars : true,
            scrollbars : "custom",
            preventDefault : true
          });
          this.refresh_scrollbar();
        }
      }
    },
    get_challenge_data : function() {
      var harFileURL = this.track_slug;
      var url = "challenge/track/" + harFileURL;
      if (this.options.full_page) {
        url = url + "/true";
      }
      var projInfo = t.get(url);
      var binarizer = this;
      projInfo.done(function(img) {
        if ("undefined" != typeof img.friends && "undefined" != typeof img.friends.friend_cnt) {
          var i = img.friends.friend_cnt;
          if (0 >= i) {
            img.has_friends = false;
          } else {
            img.has_friends = true;
          }
        }
        binarizer.render(img);
        binarizer.setup();
        binarizer = null;
      });
    },
    refresh_scrollbar : function() {
      if (!this.options.full_page) {
        var self = this;
        setTimeout(function() {
          if (self.scrollbar) {
            self.scrollbar.refresh();
          }
        }, 0);
      }
    },
    render : function(target) {
      var templates = this.templates;
      var template = templates[next[0]];
      var content = self.render(template, {}, target);
      this.$el.html(content);
    },
    request_challenge : function(obtainGETData) {
      var currentRasterFunctionInfo = this;
      var results = [];
      var errout = $(".challenge-msg").find("input").val();
      var thread_rows = $(".challenge-friend.selected");
      if (thread_rows.each(function(i, galleryitem) {
        results.push($(galleryitem).data("id"));
      }), results.length <= 0) {
        if (Application.settings.is_web) {
          alert("You forgot to select a friend!");
        } else {
          obtainGETData();
        }
      } else {
        var result = {
          users : results,
          msg : errout,
          track_slug : this.track_slug
        };
        var options = {
          category : "challenge",
          action : "challenge-friend-send",
          label : currentRasterFunctionInfo.track_slug,
          value : results.length
        };
        if (errout.length > 0) {
          options.label + "_message";
        }
        metrics.track_event(options);
        var head = t.post("challenge/send", result);
        head.done(function(val) {
          if (1 == val.result) {
            obtainGETData(val);
          } else {
            alert(val.msg);
          }
          head = null;
          result = null;
          val = null;
          results = null;
          errout = null;
          thread_rows = null;
          currentRasterFunctionInfo.challenge_request = null;
          currentRasterFunctionInfo = null;
        });
        this.challenge_request = head;
      }
    },
    get_templates : function(template) {
      var thisPlot = this;
      self.getTemplates(next, function(data) {
        thisPlot.templates = data;
        template();
      });
    }
  });
  n.ChallengeFriendsView = inComponent;
}(Application.Views = Application.Views || {}), function(i) {
  var self = Application.Helpers.TemplateHelper;
  var section = (Application.Helpers.AjaxHelper, Application.Helpers.GoogleAnalyticsHelper, ["friends/invite_friends"]);
  var imgloaded = Backbone.View.extend({
    initialize : function() {
      console.log("InviteFriendsView");
      var mipAd = this;
      this.get_templates(function() {
        mipAd.render();
      });
    },
    events : function() {
    },
    setup : function() {
    },
    update : function() {
    },
    close : function() {
    },
    render : function() {
      var value = this.templates;
      var stdout = value[section[0]];
      var result = self.render(stdout, {}, {});
      this.$el.html(result);
    },
    get_templates : function(template) {
      var thisPlot = this;
      self.getTemplates(section, function(data) {
        thisPlot.templates = data;
        template();
      });
    }
  });
  i.InviteFriendsView = imgloaded;
}(Application.Views = Application.Views || {}), function(i) {
  var self = Application.Helpers.TemplateHelper;
  var metrics = (Application.Helpers.AjaxHelper, Application.Helpers.FacebookHelper, Application.Helpers.PopupHelper, Application.Helpers.GoogleAnalyticsHelper);
  var next = ["friends/add_invite_challenge_friends_dialog", "friends/challenge_friends", "friends/add_friends", "friends/invite_friends"];
  var imgloaded = Backbone.View.extend({
    templates : [],
    dialog_id : "#dialog_content",
    dialogSettings : {
      closeHTML : '<span class="core_icons core_icons-icon_close"></span>',
      closeClass : "add-invite-challenge-close",
      containerId : "add_invite_challenge_friends_container",
      escClose : false,
      overlayClose : true,
      maxWidth : 320
    },
    events : {
      "click .dialog-tab" : "handle_tab_click"
    },
    initialize : function(options) {
      options = options || {};
      this.options = options;
      this.get_templates();
    },
    close : function() {
      metrics.track_event({
        category : "friends",
        action : "dialog-close",
        label : ""
      });
      $.modal.close();
      this.close_panels();
    },
    setup : function() {
      Application.events.publish("route.before");
    },
    init_dialog : function(title) {
      $(this.dialog_id).html(title);
      this.init_panels();
      this.dialogSettings.onClose = this.close.bind(this);
      $("#add_invite_challenge_friends_dialog").modal(this.dialogSettings);
      this.setElement($("#add_invite_challenge_friends_dialog"));
      if (Application.settings.is_fb_canvas || Application.settings.is_fb_mobile) {
        if ($("#add_invite_challenge_friends_container").length) {
          $("#add_invite_challenge_friends_container").css("top", "57.5px");
        }
        Application.events.publish("scrollTo", [0, 0]);
      }
    },
    init_full_page : function(sliderId) {
      var el = $(sliderId);
      $("#content").html(el);
      el.css({
        "margin-top" : "-30px;"
      });
      el.show();
      this.setElement(el);
      this.init_panels();
    },
    close_panels : function() {
      this.add_friends_panel.close();
      this.challenge_friends_panel.close();
    },
    init_panels : function() {
      var options = this.options;
      this.add_friends_panel = new Application.Views.AddFriendsView({
        el : $("#add_friends_panel")
      });
      this.challenge_friends_panel = new Application.Views.ChallengeFriendsView({
        el : $("#challenge_friends_panel"),
        track_slug : options.track_slug,
        full_page : options.full_page
      });
    },
    get_templates : function() {
      var i = this;
      self.getTemplates(next, function(all) {
        var name = next[0];
        var s = false;
        if (Application.User.is_logged_in() && Application.User.get("friend_cnt")) {
          s = true;
        }
        var id = self.render(all[name], {}, {
          has_friends : s
        });
        if (i.options.full_page ? i.init_full_page(id) : i.init_dialog(id), i.setup(), 0 == s) {
          var $selectedCategory = $("#add_friends_panel");
          $selectedCategory.siblings(".dialog-panel").hide();
          $selectedCategory.show();
        }
      });
    },
    handle_tab_click : function(element) {
      var $el = $(element.target).closest(".dialog-tab");
      $el.siblings().removeClass("active");
      $el.addClass("active");
      var index = $el.data("panel");
      var $selectedCategory = $("#" + index);
      $selectedCategory.siblings(".dialog-panel").hide();
      $selectedCategory.show();
      this[index].update();
    }
  });
  i.AddInviteChallengeFriendsDialog = imgloaded;
}(Application.Views = Application.Views || {}), function(Contacts) {
  var controller = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper);
  var View = Application.Views.ViewTemplate;
  var remove = View.extend({
    templates : {
      main : "contact/contact",
      partials : []
    },
    initialize : function(options) {
      var myPad = this;
      this.options = options;
      if (options.initial_page_load) {
        this._setup();
      } else {
        this._request_page(function(e) {
          myPad._prepareTemplates(function() {
            myPad.render(e);
            e = null;
          });
        });
      }
    },
    events : {
      "click #feedback_submit" : "submit_feedback"
    },
    submit_feedback : function() {
      var $sharepreview = $("#feedback-subject");
      var $conditionsRuleMajor = $("#feedback-email");
      var inputel = $("#feedback-message");
      var sickDays = "contact/send";
      var data = {
        feedback : inputel.val(),
        subject : $sharepreview.find(":selected").text(),
        email : $conditionsRuleMajor.val()
      };
      var createReturn = controller.post(sickDays, data);
      createReturn.done(function(event) {
        if (1 == event.result) {
          inputel.val("");
          alert("Message has been sent! We will get back to you shortly");
        } else {
          alert(event.msg);
        }
        subject = null;
        feedback = null;
        email = null;
        sickDays = null;
        data = null;
        createReturn = null;
      });
    },
    _request_page : function(saveNotifs) {
      var level = "contact";
      var promise = controller.get(level);
      promise.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    render : function(type) {
      var html = this._render(this.templates, type);
      this.$el.html(html);
      this._setup();
    },
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load,
        page_class : "feedback"
      });
    }
  });
  Contacts.ContactView = remove;
}(Application.Views = Application.Views || {}), function(state) {
  var Widget = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper, Application.Views.ViewTemplate);
  var map = Application.Helpers.ShareHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  var size = (Application.Views.CoinsView, Application.Views.GearView, Widget.extend({
    templates : {
      main : "track/track_upload_share_modal",
      partials : []
    },
    initialize : function(options) {
      this.options = options;
      this._prepareTemplates();
    },
    events : {
      click : "check_for_close",
      "click .close" : "close",
      "click .share-icon" : "share_track",
      "click input" : "focus_input"
    },
    focus_input : function(event) {
      $(event.currentTarget).select();
    },
    check_for_close : function(jEvent) {
      if ($(jEvent.target).hasClass("modal-overlay")) {
        this.close();
      }
    },
    close : function() {
      this.$el.unbind();
      this.$el.remove();
    },
    share_track : function(event) {
      var $share_link = $(event.currentTarget);
      var url = $share_link.data("service");
      var t = $share_link.parents(".share").data();
      t.share_item = "track";
      map.share(url, t);
      metrics.track_event({
        category : "track-upload-share",
        action : "social-" + url,
        label : "popup"
      });
    },
    _ready : function() {
      var html = this._render(this.templates, this.options.data);
      $("body").prepend(html);
      this.setElement($("#track-upload-tips"));
      this._setup();
    },
    _setup : function() {
      setTimeout(this.show_close.bind(this), 3e3);
    },
    show_close : function() {
      this.$el.find(".close").show();
    }
  }));
  state.TrackUploadShareModalView = size;
}(Application.Views = Application.Views || {}), function(s) {
  var _callService = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper);
  var View = Application.Views.ViewTemplate;
  var console = Application.Helpers.FacebookHelper;
  var Chameleon = Application.Helpers.PopupHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  var adblockTester = View.extend({
    initialize : function() {
      this.load_dealspot();
      this.load_reward_video();
    },
    events : {
      "click #offer_wall_btn" : "tp_earn",
      "click #reward_video_btn" : "invoke_reward_video",
      "click .store-progress" : "prompt_purchase",
      "click .store-redeem-button" : "redeem_coupon_code"
    },
    _tp_complete : function(canCreateDiscussions) {
    },
    _tp_open : function() {
    },
    _tp_close : function() {
    },
    tp_earn : function(event) {
      var item = this;
      var editingEl = $(event.currentTarget);
      if (Application.settings.is_fb_canvas) {
        try {
          TRIALPAY.fb.show_overlay(Application.settings.fb_app_id, "fbdirect", {
            tp_vendor_id : editingEl.data("vendor_id"),
            callback_url : Application.settings.base_request_url + "/externalcallbacks/fb_trial_pay",
            currency_url : Application.settings.base_request_url + "/og/offer/7",
            sid : editingEl.data("third_party_id"),
            onTransact : item._tp_complete,
            onOpen : item._tp_open,
            onClose : item._tp_close
          });
        } catch (n) {
        }
      } else {
        if (Application.settings.is_web) {
          var event = {
            url : Application.settings.base_request_url + "/offerwall/tp_overlay/" + editingEl.data("third_party_id"),
            onCloseHandler : function() {
              metrics.track_event({
                category : "payments",
                action : "open-offers",
                label : "open-offers"
              });
            }
          };
          if (this.isMobile) {
            event.onOpenHandler = $.noop;
          } else {
            event.onOpenHandler = function() {
              metrics.track_event({
                category : "payments",
                action : "close-offers",
                label : "close-offers"
              });
            };
          }
          var details = Chameleon.create(event);
          details.popup(615, 525);
        }
      }
    },
    purchase_callback : function(result) {
      var size_buffer = this.current_offer_coins;
      if (Application.settings.is_fb_canvas && result) {
        var params = {};
        params.purchase_signed_request = result.signed_request;
        params.sr_data = result;
        var isAsync = _callService.post("externalcallbacks/fb_payments_place", params);
        isAsync.done(function(animate_param) {
          console.fbPaymentsCallback(animate_param, size_buffer);
        });
      }
    },
    redeem_coupon_code : function() {
      var delayedWrite = _callService.post("store/redeemCouponCode", {
        coupon_code : $("#coupon_code").val()
      });
      delayedWrite.done(function(jdata) {
        $("#store-coupon-code-response").hide();
        $("#store-coupon-code-response").html("<p>" + jdata.msg + "</p>");
        if (jdata.result) {
          $("#store-coupon-code-response").children("p").addClass("success");
        } else {
          $("#store-coupon-code-response").children("p").addClass("failed");
        }
        $("#store-coupon-code-response").show();
        jdata = null;
      });
    },
    prompt_purchase : function(event) {
      var options = this;
      if (Application.settings.is_fb_canvas) {
        var params = {
          method : "pay",
          action : "purchaseitem",
          product : Application.settings.base_request_url + "/og/offer/" + $(event.currentTarget).data("offer")
        };
        this.current_offer_coins = $(event.currentTarget).data("coins");
        try {
          FB.ui(params, options.purchase_callback);
        } catch (e) {
        }
      } else {
        if (Application.settings.is_web) {
          var data = {
            publishable_key : $(event.currentTarget).data("publishable_key"),
            item_img_url : $(event.currentTarget).data("item_img_url"),
            item_description : $(event.currentTarget).data("item_description"),
            currency : $(event.currentTarget).data("currency"),
            amount : 100 * $(event.currentTarget).data("item_price"),
            offer_id : $(event.currentTarget).data("offer")
          };
          if ("undefined" == typeof StripeCheckout) {
            options._async_load("https://checkout.stripe.com/checkout.js", function() {
              options._stripe_checkout_prompt(data);
            });
          } else {
            options._stripe_checkout_prompt(data);
          }
        }
      }
    },
    _stripe_checkout_prompt : function(data) {
      var result = StripeCheckout.configure({
        key : data.publishable_key,
        image : data.item_img_url,
        token : function(value) {
          var params = {};
          params.stripeToken = value.id;
          params.email = value.email;
          params.offer_id = data.offer_id;
          params.product = "tracks";
          var isAsync = _callService.post("stripe/charge", params);
          isAsync.done(function(event) {
            if (event.msg) {
              alert(event.msg);
            }
          });
        }
      });
      result.open({
        name : "Free Rider HD",
        description : data.item_description,
        currency : data.currency,
        amount : data.amount,
        zipCode : true
      });
      $(window).on("popstate", function() {
        result.close();
      });
      metrics.track_event({
        category : "payments",
        action : "open-directpay",
        label : "open-directpay-" + $(e.currentTarget).data("offer")
      });
    },
    _async_load : function(response, t) {
      var doc = document;
      var tagName = "script";
      var el = doc.createElement(tagName);
      var wafCss = doc.getElementsByTagName(tagName)[0];
      el.src = response;
      if (t) {
        el.addEventListener("load", function(val_error) {
          t(null, val_error);
        }, false);
      }
      wafCss.parentNode.insertBefore(el, wafCss);
    },
    invoke_reward_video : function(canCreateDiscussions) {
      try {
        metrics.track_event({
          category : "rewarded-video",
          action : "rewarded-video-ironsource-clicked",
          label : "ironsource-clicked"
        });
        showRV("coins_view");
      } catch (e) {
        $("#reward_video_container").hide();
      }
    },
    load_reward_video : function() {
      var e = $("#reward_video_btn");
      if (e.length) {
        try {
          if ("undefined" != typeof Application.settings.rewarded_ads.ironsource && Application.settings.rewarded_ads.ironsource.campaigns_ready) {
            $("#reward_video_loading").hide();
            e.show();
            Application.events.publish("resize");
          } else {
            $("#reward_video_container").hide();
          }
        } catch (t) {
        }
      }
    },
    load_dealspot : function() {
      var editingEl = $("#offer_wall_btn");
      if (Application.settings.is_fb_canvas) {
        try {
          TRIALPAY.social.render_dealspot_swf({
            id : "dealspot_container",
            mode : "fbdirect",
            app_id : Application.settings.fb_app_id,
            tp_vendor_id : editingEl.data("vendor_id"),
            callback_url : Application.settings.base_request_url + "/externalcallbacks/fb_trial_pay",
            currency_url : Application.settings.base_request_url + "/og/offer/7",
            sid : editingEl.data("third_party_id")
          });
        } catch (t) {
        }
      } else {
        Application.settings.is_web;
      }
    },
    close : function() {
      this.$el.unbind();
    }
  });
  s.CoinsView = adblockTester;
}(Application.Views = Application.Views || {}), function(s) {
  var exports = Application.Helpers.TemplateHelper;
  var EditRoute = Application.Helpers.AjaxHelper;
  var BaseView = Application.Views.ViewTemplate;
  var insight = Application.Helpers.GoogleAnalyticsHelper;
  var adblockTester = BaseView.extend({
    listItemLoadingHtml : '<div class="panel-list-item-loading"> \t\t\t\t\t\t<span class="spinner spinner-loader-small"></span> \t\t\t\t\t</div>',
    initialize : function(castNode) {
      this.subscribe();
    },
    events : {
      "click .head-purchase-btn" : "buyButtonClicked",
      "click .equip-btn" : "equipButtonClicked",
      "click .close-get-coins-modal" : "hideModalButtonClicked"
    },
    subscribe : function() {
      var events = Application.events;
      events.subscribe("user.change.user_stats", this.handleUserStatsChange);
    },
    handleUserStatsChange : function(scope) {
      if (scope) {
        var new_date = scope.head_cnt;
        $(".head-cnt").html(new_date);
        $("#shop-coins-desktop").text(scope.tot_cns);
      }
    },
    unsubscribe : function() {
      Application.events.unsubscribe("user.change.user_stats", this.handleUserStatsChange);
    },
    buyButtonClicked : function(obj) {
      if (Application.User.is_logged_in()) {
        var that = this;
        var a = $(obj.currentTarget);
        a.addClass("disabled");
        var e = a.parents("li");
        var rate = e.data("cost");
        this.itemLoading(e);
        this.buyItem(function(event) {
          if (1 == event.result) {
            insight.track_event({
              category : "shop",
              action : "shop-buy",
              label : event.data.head_gear.id,
              value : rate
            });
            $("#shop-coins-mobile").text(event.data.user_stats.tot_cns);
            $("#shop-coins-desktop").text(event.data.user_stats.tot_cns);
            exports.getTemplates(["store/headgear_card"], function(GeoKeyTab) {
              var i = GeoKeyTab["store/headgear_card"];
              var s = exports.render(i, {}, event.data.head_gear);
              $(".card-back").children(".head-card").replaceWith(s);
            });
            that.removeItemLoading(e);
            that.cardFlipAnimation(obj, $(".card-back"), event.data.next_head_gear_cost, event.data.head_gear.id);
          } else {
            var geoJSON_str = parseInt($(obj.currentTarget).text()) - event.tot_cns;
            $("#insufficient-funds-modal").find(".coin-amount").text(geoJSON_str);
            $("#insufficient-funds-modal").show();
            $("#purchase-btn").removeClass("disabled");
            that.removeItemLoading(e);
          }
        });
      } else {
        Application.events.publish("prompt.signup");
      }
    },
    cardFlipAnimation : function(mol, n, t, f) {
      var container = $(".card-flip-container");
      var el = $("#headgear-list").children("li.invisible-card");
      el.addClass("width-transition");
      el.before('<li class="invisible-card"><div class="replace-me"></div>');
      container.addClass("flip");
      $(container).bind("oanimationend animationend webkitAnimationEnd", function() {
        el.addClass("headgear-owned");
        el.removeClass("width-transition");
        el.removeClass("invisible-card");
        el.data("item", f);
        el.children(".replace-me").replaceWith(n.html());
        var mElmOrSub = $("#gear-tab").find(".head-cnt");
        var id = parseInt($("#gear-tab").children("div").children(".total-head-cnt").text());
        var roleId = parseInt(mElmOrSub.text());
        if (roleId == id) {
          container.removeClass("flip");
        } else {
          container.find(".cost").text(t);
          container.removeClass("flip");
          $("#purchase-btn").removeClass("disabled");
        }
        $(this).unbind("oanimationend animationend webkitAnimationEnd msAnimationEnd");
      });
    },
    hideModalButtonClicked : function() {
      $("#insufficient-funds-modal").hide();
    },
    equipButtonClicked : function(event) {
      if (Application.User.is_logged_in()) {
        var percent_width = this;
        var $quantity = $(event.currentTarget);
        var p = $quantity.parents("li");
        var item = p.data("item");
        this.itemLoading(p);
        this.equipItem(item, function(event) {
          percent_width.removeItemLoading(p);
          if (1 == event.result) {
            percent_width.equipSuccessful(p);
            insight.track_event({
              category : "shop",
              action : "shop-equip",
              label : item
            });
          } else {
            alert(event.msg);
          }
          $quantity = null;
          p = null;
          event = null;
          item = null;
        });
      }
    },
    equipSuccessful : function(prizes) {
      var oldActiveEntry = this.$(".page-panel-block-list").find(".head-card.active");
      oldActiveEntry.find(".equip-btn").replaceWith($('<div class="new-button button-type-1 equip-btn">Equip</div>'));
      oldActiveEntry.removeClass("active");
      prizes.find(".head-card").addClass("active");
      prizes.find(".equip-btn").replaceWith($('<div class="new-button button-type-1 equip-btn disabled" style="pointer-events:none">Equipped</div>'));
    },
    itemLoading : function(e) {
      e.append(this.listItemLoadingHtml);
      e.addClass("loading");
    },
    removeItemLoading : function(e) {
      e.find(".panel-list-item-loading").remove();
      e.removeClass("loading");
    },
    buyItem : function(saveNotifs) {
      var delayedWrite = EditRoute.post("store/buy");
      delayedWrite.done(function(notifications) {
        saveNotifs(notifications);
      });
    },
    equipItem : function(name, destination) {
      var item = {
        item_id : name
      };
      var delayedWrite = EditRoute.post("store/equip", item);
      delayedWrite.done(function(centerPt) {
        destination(centerPt);
      });
    },
    close : function() {
      this.$el.unbind();
      this.unsubscribe();
    }
  });
  s.GearView = adblockTester;
}(Application.Views = Application.Views || {}), function(state) {
  var View = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper, Application.Views.ViewTemplate);
  var List = Application.Views.CoinsView;
  var Body = Application.Views.GearView;
  var size = View.extend({
    templates : {
      main : "store/store",
      partials : ["store/headgear_card"]
    },
    coinsView : null,
    gearView : null,
    events : {
      "click .item" : "handle_item_click",
      "click .tab_buttons li" : "handle_tab_click",
      "change .tab_buttons_select select" : "handle_select",
      "click .page-panel-title.back" : "navigateBack",
      "click .shop-page-signup" : "promptSignup",
      "click .mobile-incentive-btn-android" : "mobile_incentive_click_android",
      "click .mobile-incentive-btn-ios" : "mobile_incentive_click_ios"
    },
    promptSignup : function() {
      Application.events.publish("prompt.signup");
    },
    navigateBack : function(e) {
      var $el = $(e.currentTarget);
      var tab = $el.data("panel");
      var mediaTabs = this.$("." + tab);
      var filteredView = mediaTabs.parents(".page-tabbed-navigation");
      filteredView.find(".page-panel").hide();
      mediaTabs.show();
      Application.events.publish("resize");
    },
    navigateGear : function(e) {
      if (e.is(":visible") === false) {
        var filteredView = e.parents(".page-tabbed-navigation");
        filteredView.find(".page-panel").hide();
        e.show();
      }
      Application.events.publish("resize");
    },
    handle_item_click : function(event) {
      var $el = $(event.currentTarget);
      var tab = $el.data("panel");
      var $news = this.$("." + tab);
      this.navigateGear($news);
    },
    handle_tab_click : function(element) {
      var $el = $(element.currentTarget);
      var itemPanelName = $el.data("panel");
      var itemPanel = $(itemPanelName);
      $el.siblings().removeClass("active");
      $el.addClass("active");
      itemPanel.siblings(".page-panel").hide();
      itemPanel.show();
      var newfield = this.$(".tab_buttons_select").find("select");
      newfield.find("option:selected").prop("selected", false);
      newfield.find('option[data-panel="' + itemPanelName + '"]').prop("selected", "selected");
      Application.events.publish("resize");
    },
    mobile_incentive_click_android : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "mobile_incentive",
        action : "link_click",
        label : "store_android",
        value : 1
      });
    },
    mobile_incentive_click_ios : function() {
      Application.Helpers.GoogleAnalyticsHelper.track_event({
        category : "mobile_incentive",
        action : "link_click",
        label : "store_ios",
        value : 1
      });
    },
    handle_select : function(event) {
      var $sharepreview = $(event.currentTarget);
      var itemPanelName = $sharepreview.find(":selected").data("panel");
      var itemPanel = $(itemPanelName);
      itemPanel.siblings(".page-panel").hide();
      itemPanel.show();
      var parent_li = this.$(".tab_buttons-container").find('li[data-panel="' + itemPanelName + '"]');
      parent_li.siblings().removeClass("active");
      parent_li.addClass("active");
      Application.events.publish("resize");
    },
    _setup : function() {
      Application.events.publish("mainview.loaded", {
        left_nav : "shop",
        initial_page_load : this.initial_page_load,
        page_class : "shop menu"
      });
      if ($(".panel-coins").data("enabled")) {
        this.coinsView = new List({
          el : $(".panel-coins")
        });
      }
      this.gearView = new Body({
        el : $(".panel-gear-heads"),
        tab : this.options.tab
      });
    },
    close : function() {
      this.$el.unbind();
      if (null != this.gearView) {
        this.gearView.close();
      }
      if (null != this.coinsView) {
        this.coinsView.close();
      }
    }
  });
  state.StoreView = size;
}(Application.Views = Application.Views || {}), function(i) {
  var self = Application.Helpers.TemplateHelper;
  var _ = Application.Helpers.AjaxHelper;
  var next = ["subscriptions/subscriptions", "track_listing/track_listing", "ads/leaderboard_1_ad", "ads/leaderboard_2_ad", "ads/track_list_ad", "ads/300x250_1_ad"];
  var imgloaded = Backbone.View.extend({
    templates : [],
    events : {
      "click .subscribe-button" : "toggle_subscribe_to_author"
    },
    initialize : function(options) {
      this.category = options.category;
      this.initial_page_load = options.initial_page_load;
      if (this.initial_page_load === true) {
        this.setup();
      } else {
        this.getTemplates();
      }
    },
    close : function() {
      this.destroy_track_list();
    },
    subscribe : function() {
    },
    setup : function() {
      this.subscribe();
      this.initSliders();
      Application.events.publish("mainview.loaded", {
        left_nav : "subscriptions",
        initial_page_load : this.initial_page_load,
        page_class : "subscriptions menu"
      });
    },
    initSliders : function() {
      this.$(".trackList").each(function() {
        var $oElemDragged = $(this);
        if (0 == $oElemDragged.hasClass("track-list-with-promote")) {
          var element = $oElemDragged.find(".slider");
          element.css({
            width : "100%"
          });
          element.slick({
            dots : false,
            infinite : false,
            speed : 300,
            slidesToShow : 8,
            slidesToScroll : 3,
            prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></span></div>',
            nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></span></div>',
            touchThreshold : 12,
            responsive : [{
              breakpoint : 1700,
              settings : {
                slidesToShow : 7,
                slidesToScroll : 4
              }
            }, {
              breakpoint : 1500,
              settings : {
                slidesToShow : 6,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1280,
              settings : {
                slidesToShow : 5,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 1024,
              settings : {
                slidesToShow : 4,
                slidesToScroll : 4
              }
            }, {
              breakpoint : 850,
              settings : {
                slidesToShow : 3,
                slidesToScroll : 3
              }
            }, {
              breakpoint : 480,
              settings : {
                slidesToShow : 2,
                slidesToScroll : 2
              }
            }]
          });
        }
      });
      this.$(".track-list-with-promote").each(function() {
        var $sharepreview = $(this);
        var options = $sharepreview.find(".slider");
        options.slick({
          dots : false,
          infinite : false,
          speed : 300,
          slidesToShow : 6,
          slidesToScroll : 3,
          prevArrow : '<div class="slick-nav-btn prev"><span class="core_icons core_icons-btn_scroll_left "></span></div>',
          nextArrow : '<div class="slick-nav-btn next"><span class="core_icons core_icons-btn_scroll_right "></span></div>',
          touchThreshold : 12,
          responsive : [{
            breakpoint : 1700,
            settings : {
              slidesToShow : 5,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1500,
            settings : {
              slidesToShow : 4,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1280,
            settings : {
              slidesToShow : 3,
              slidesToScroll : 3
            }
          }, {
            breakpoint : 1024,
            settings : {
              slidesToShow : 2,
              slidesToScroll : 2
            }
          }, {
            breakpoint : 850,
            settings : {
              slidesToShow : 3,
              slidesToScroll : 2
            }
          }, {
            breakpoint : 520,
            settings : {
              slidesToShow : 2,
              slidesToScroll : 2
            }
          }]
        });
      });
      this.slickEnabled = true;
    },
    destroy_track_list : function() {
      if (this.slickEnabled) {
        this.$(".trackList").each(function() {
          var $sharepreview = $(this);
          var element = $sharepreview.find(".slider");
          element.css({
            width : "2000px"
          });
          element.slick("unslick");
        });
        this.$el.find(".home_header").slick("unslick");
        this.slickEnabled = false;
      }
    },
    toggle_subscribe_to_author : function(event) {
      var e = $(event.currentTarget);
      var vertexSet = e.data("id");
      if (e.find(".subscribe-to-author-button").hasClass("subscribed")) {
        this.unsubscribe_from_author(vertexSet, e);
      } else {
        this.subscribe_to_author(vertexSet, e);
      }
    },
    subscribe_to_author : function(cond, t) {
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = _.post("/track_api/subscribe", {
          sub_uid : cond,
          subscribe : 1
        });
        delayedWrite.done(function(event) {
          t.removeClass("disabled");
          if (event.result) {
            t.find(".subscribe-to-author-count").text(event.data.subscriber_cnt);
            t.find(".subscribe-to-author-button").addClass("subscribed").text("Unsubscribe");
          } else {
            alert(event.msg);
          }
          t = null;
        });
      }
    },
    unsubscribe_from_author : function(cond, t) {
      if (t.hasClass("disabled") === false) {
        t.addClass("disabled");
        var delayedWrite = _.post("/track_api/subscribe", {
          sub_uid : cond,
          subscribe : 0
        });
        delayedWrite.done(function(event) {
          t.removeClass("disabled");
          if (event.result) {
            t.find(".subscribe-to-author-count").text(event.data.subscriber_cnt);
            t.find(".subscribe-to-author-button").removeClass("subscribed").text("Subscribe");
          } else {
            alert(event.msg);
          }
          t = null;
        });
      }
    },
    getTemplates : function() {
      var thisPlot = this;
      self.getTemplates(next, function(data) {
        thisPlot.templates = data;
        thisPlot.getSubscriptionData(function(data) {
          thisPlot.render(data);
          thisPlot.setup();
        });
      });
    },
    getSubscriptionData : function(callback) {
      var delayedWrite = _.get("/" + Backbone.history.fragment);
      delayedWrite.done(function(identifierPositions) {
        callback(identifierPositions);
      });
    },
    render : function(target) {
      var tmpl = this.templates["subscriptions/subscriptions"];
      var status = {
        "track_listing/track_listing" : this.templates["track_listing/track_listing"],
        "ads/leaderboard_1_ad" : this.templates["ads/leaderboard_1_ad"],
        "ads/leaderboard_2_ad" : this.templates["ads/leaderboard_2_ad"],
        "ads/track_list_ad" : this.templates["ads/track_list_ad"],
        "ads/300x250_1_ad" : this.templates["ads/300x250_1_ad"]
      };
      var i = self.render(tmpl, status, target);
      this.$el.html(i);
    }
  });
  i.SubscriptionsView = imgloaded;
}(Application.Views = Application.Views || {}), function(i) {
  var store = (Application.Helpers.TemplateHelper, Application.Helpers.AjaxHelper);
  var vorpal = Application.Helpers.FacebookHelper;
  var imgloaded = Backbone.View.extend({
    events : {
      "click #login_button" : "facebook_login"
    },
    initialize : function(castNode) {
      this.initial_page_load = castNode.initial_page_load;
      Application.events.publish("mainview.loaded", {
        initial_page_load : this.initial_page_load,
        page_class : "fbmobile-view no_menu"
      });
      vorpal.exec("getLoginStatus", [function(response) {
        if ("connected" === response.status) {
          store.post("/fbmobile/fb/auth", {
            signedRequest : response.authResponse.signedRequest,
            accessToken : response.authResponse.accessToken,
            expiresIn : response.authResponse.expiresIn,
            fbmobile_login : 1
          }).done(function(s) {
            if (s.result === true) {
              var message = s.data;
              if ("undefined" != typeof Application.settings.login_redirect_route) {
                Application.router.do_route("/" + Application.settings.login_redirect_route);
              } else {
                Application.router.do_route("/");
              }
              Application.events.publish("auth.login", message.user, message.user_stats);
            }
          });
        }
      }]);
    },
    facebook_login : function() {
      vorpal.exec("login", [function(response) {
        if ("connected" === response.status) {
          store.post("/fbmobile/fb/auth", {
            signedRequest : response.authResponse.signedRequest,
            accessToken : response.authResponse.accessToken,
            expiresIn : response.authResponse.expiresIn,
            fbmobile_login : 1
          }).done(function(s) {
            if (s.result === true) {
              var message = s.data;
              if ("undefined" != typeof Application.settings.login_redirect_route) {
                Application.router.do_route("/" + Application.settings.login_redirect_route);
              } else {
                Application.router.do_route("/");
              }
              Application.events.publish("auth.login", message.user, message.user_stats);
            }
          });
        } else {
          "not_authorized" === response.status;
        }
      }, {
        scope : "public_profile,email,publish_actions,user_friends"
      }]);
    },
    close : function() {
      this.$el.unbind();
    }
  });
  i.FbMobileView = imgloaded;
}(Application.Views = Application.Views || {}), function($scope) {
  var $http = Application.Helpers.AjaxHelper;
  var vorpal = Application.Helpers.FacebookHelper;
  var events = Application.Helpers.GoogleAnalyticsHelper;
  var result = Backbone.Model.extend({
    logged_in : false,
    initialize : function() {
      this.subscribe();
      var t = this.get_visit_t1_t2();
      if (Application.settings.user) {
        this.set_user(Application.settings.user, Application.settings.user_stats);
        this.logged_in = true;
        Application.events.publish("user.initialized", [this]);
        events.set_user_id(this.get("u_id"));
        events.set_custom({
          install_day : this.get("install_day"),
          install_week : this.get("install_week"),
          install_month : this.get("install_month"),
          t1_t2 : this.get("t1_t2"),
          day : this.get("day"),
          sex : this.get("sex"),
          friend_cnt : this.get("friend_cnt"),
          platforms : this.get("platforms"),
          visit_t1_t2 : t,
          mbl_cnctd : this.get("mbl_cnctd").toString()
        });
      } else {
        events.set_custom({
          visit_t1_t2 : t
        });
      }
    },
    get_visit_t1_t2 : function() {
      var lowbar = "-";
      return Application.settings && Application.settings.t_1 && (lowbar = Application.settings.t_1, Application.settings.t_2 && (lowbar = Application.settings.t_1 + "-" + Application.settings.t_2)), lowbar;
    },
    subscribe : function() {
      var data = this;
      Application.events.subscribe("auth.login", function(s, n) {
        data.set(s);
        n = n || {};
        data.set("user_stats", n);
        data.logged_in = true;
        Application.events.publish("user.change");
        Application.events.publish("user.login");
        Application.settings.user_stats = n;
        events.set_user_id(data.get("u_id"));
        events.set_custom({
          install_day : data.get("install_day"),
          install_week : data.get("install_week"),
          install_month : data.get("install_month"),
          t1_t2 : data.get("t1_t2"),
          day : data.get("day"),
          sex : data.get("sex"),
          friend_cnt : data.get("friend_cnt"),
          platforms : data.get("platforms"),
          visit_t1_t2 : data.get_visit_t1_t2(),
          mbl_cntcd : data.get("mbl_cnctd").toString()
        });
      });
      this.bind("change:notification_count", function() {
        var fixedres = data.get("notification_count");
        Application.events.publish("user.notification", [fixedres]);
      });
    },
    set_user : function(user, body) {
      if (user) {
        this.set(user);
      }
      if (body) {
        this.set("user_stats", body);
        Application.events.publish("user.change.user_stats", [body]);
      }
      Application.events.publish("user.change", [this.get_attributes()]);
    },
    logout : function() {
      var user = this;
      var req = $http.post("/auth/logout");
      req.done(function(jptResponseObj) {
        if (jptResponseObj.result) {
          user.logged_in = false;
          if (0 != user.get("fb_id")) {
            vorpal.exec("logout");
          }
          user.clear();
          Application.events.publish("user.change");
          Application.events.publish("user.logout");
          user.unset_game_settings_user();
          location.reload(true);
        } else {
          alert("There was an error logging out");
        }
      });
    },
    unset_game_settings_user : function() {
      if ("undefined" != typeof GameSettings) {
        GameSettings.user = false;
      }
    },
    is_logged_in : function() {
      return this.logged_in;
    },
    get_attributes : function() {
      var o = false;
      return this.logged_in && (o = this.attributes), o;
    }
  });
  $scope.UserModel = result;
}(Application.Models = Application.Models || {}), function(p1) {
  var start = Backbone.Router.extend({
    initial_page_load : true,
    $page : null,
    $center_panel : null,
    version_changed : false,
    prompt_on_route_change : false,
    current_view : null,
    header_view : null,
    left_navigation_view : null,
    auth_dialog_view : null,
    noficiations_poll : null,
    fb_friend_sync_poll : null,
    high_scores_poll : null,
    thrid_party_id_poll : null,
    delete_requests_poll : null,
    initialize : function() {
      this.header_view = new Application.Views.HeaderView({
        el : $("div#header")
      });
      this.left_navigation_view = new Application.Views.LeftNavigationView({
        el : $("div#left-navigation")
      });
      this.auth_dialog_view = new Application.Views.AuthDialogView;
      this.noficiations_poll = new Application.Polls.NotificationPoll;
      if (Application.settings.is_fb_canvas || Application.settings.is_fb_mobile) {
        this.fb_friend_sync_poll = new Application.Polls.FBFriendSyncPoll;
        this.high_scores_poll = new Application.Polls.HighScorePoll;
        this.thrid_party_id_poll = new Application.Polls.ThirdPartyIdPoll;
        this.delete_requests_poll = new Application.Polls.DeleteRequestsPoll;
      }
      Application.User = new Application.Models.UserModel;
      this.bind_anchor_tags();
      this.$center_panel = $("div#content");
      this.$page = $("html");
      this.subscribe();
      this.wait_for_page = this.default_wait_for_page;
      this.record_route_hits();
    },
    record_route_hits : function() {
      this.routesHit = 0;
      Backbone.history.on("route", function() {
        this.routesHit++;
      }, this);
    },
    subscribe : function() {
      var presenter = this;
      Application.events.subscribe("mainview.loaded", function(layer) {
        var i = (layer.left_nav, layer.initial_page_load);
        var link = layer.page_class;
        if (layer.prompt) {
          presenter.wait_for_page = presenter.prompt_wait_for_page;
          window.onbeforeunload = function(b) {
            return "Are you sure you want to quit?";
          };
        } else {
          presenter.wait_for_page = presenter.default_wait_for_page;
          window.onbeforeunload = null;
        }
        Application.events.publish("left-nav.select", [layer]);
        presenter.$page.removeClass();
        if (link) {
          presenter.$page.addClass(link);
        }
        if (i === false) {
          Application.events.publish("scrollTo", {
            x : 0,
            y : 0
          });
        }
        Application.events.publish("resize");
        if (i === true) {
          $(window).load(function() {
            var t = 0;
            var slideshowtimer = window.setInterval(function() {
              if (Application.ads_ready === true) {
                presenter.refresh_google_ads();
                window.clearInterval(slideshowtimer);
                Application.ads_ready = false;
              } else {
                t++;
                if (t > 100) {
                  window.clearInterval(slideshowtimer);
                }
              }
            }, 5);
          });
        } else {
          presenter.refresh_google_ads();
        }
      });
      Application.events.subscribe("refresh", this.refresh.bind(this));
      Application.events.subscribe("user.login", this.refresh.bind(this));
      Application.events.subscribe("user.logout", this.refresh.bind(this));
      Application.events.subscribe("router.back", this.back.bind(this));
      Application.events.subscribe("refresh-ads", this.refresh_google_ads.bind(this));
    },
    refresh_google_ads : function() {
      window.setTimeout(function() {
        googletag.cmd.push(function() {
          var icons = [];
          var i;
          for (i in Application.ad_slots) {
            if ($("#" + i).length > 0 && $("#" + i).is(":visible")) {
              icons.push(Application.ad_slots[i]);
            }
          }
          googletag.pubads().refresh(icons);
        });
      }, 5);
    },
    back : function() {
      if (this.routesHit > 1) {
        window.history.back();
      } else {
        this.navigate("/", {
          trigger : true,
          replace : true
        });
      }
    },
    routes : {
      "(/)" : "home",
      "home(/)" : "home",
      "webapp/launch(/)" : "home",
      "firefox/launch(/)" : "home",
      "mobile(/)" : "mobile",
      "about(/)" : "about",
      "canvas-rider(/)" : "canvas_rider",
      "draw-rider(/)" : "draw_rider",
      "education(/)" : "education",
      "contact(/)" : "contact",
      "help(/)" : "help",
      "login(/)" : "auth_page",
      "campaign(/)" : "campaign",
      "campaign/:campaign(/)" : "campaign_page",
      "achievements(/)" : "achievements",
      "create(/)" : "create",
      "admin(/)" : "admin",
      "account/settings(/)" : "account_settings",
      "leaderboards(/:type)(/:timespan)(/:page)(/)" : "leaderboards",
      "notifications(/)" : "notifications",
      "notifications/settings(/)" : "notification_settings",
      "u/:username(/)" : "user_profile",
      "u/:username/:flag(/)" : "user_profile",
      "random/track(/)" : "random_track",
      "t/:trackname(/)" : "track_page",
      "t/:trackname/m(/)" : "track_page",
      "t/:trackname/c(/)" : "track_campaign_page",
      "t/:trackname/comment(/)" : "track_page",
      "t/:trackname/challenge(/)" : "track_show_challenge",
      "t/:trackname/uploaded(/)" : "track_page_uploaded",
      "t/:trackname/r/*race_unames_path(/)" : "track_race_page",
      "tracks(/)" : "tracks_page",
      "search/t/:track_query(/)" : "search_track",
      "recently-added(/)" : "recently_added",
      "recently-added/:page(/)" : "recently_added",
      "most-popular(/)" : "most_popular",
      "most-popular/:page(/)" : "most_popular",
      "trending(/)" : "trending",
      "trending/:page(/)" : "trending",
      "hot(/)" : "hot",
      "hot/:page(/)" : "hot",
      "highest-rated(/)" : "highest_rated",
      "highest-rated/:page(/)" : "highest_rated",
      "subscriptions(/)" : "subscriptions",
      "subscriptions/:page(/)" : "subscriptions",
      "shuffled(/)" : "shuffled",
      "featured(/)" : "featured",
      "featured/:page(/)" : "featured",
      "biggest(/)" : "biggest",
      "biggest/:page(/)" : "biggest",
      "best-time(/)" : "best_time",
      "best-time/:page(/)" : "best_time",
      "challenge/track/:trackname(/)" : "challenge",
      "fb/login(/)" : "fb_mobile",
      "store(/)" : "store",
      "store/:page(/)" : "store",
      "store/:page/:tab" : "store",
      "page-not-found(/)" : "page_not_found",
      "error(/)" : "error",
      "*path" : "page_not_found"
    },
    before : function() {
      if (this.version_changed) {
        if (Application.settings.is_fb_canvas) {
          top.location.href = Application.settings.base_platform_url + "/" + Backbone.history.fragment;
        } else {
          window.location.reload(true);
        }
      } else {
        if (Application.settings.fb_auth_expired) {
          if (Application.settings.is_fb_canvas) {
            top.location.href = Application.settings.base_platform_url + "/" + Backbone.history.fragment;
          } else {
            if (Application.settings.is_fb_mobile) {
              window.location.reload(true);
            }
          }
        }
      }
      Application.events.publish("route.before");
      var e = true;
      return this._unbind_center_content(), this.initial_page_load !== true && null !== this.current_view && (this.current_view.close(), this.current_view.$el.unbind()), 404 === Application.settings.status && (this.page_not_found(), this.after(), e = false), 500 === Application.settings.status && (this.error(), this.after(), e = false), e;
    },
    after : function() {
      this.initial_page_load = false;
      Application.events.publish("route.after");
    },
    about : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "about/about",
          partials : []
        },
        request : "/about"
      });
    },
    mobile : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "mobile/landing",
          partials : []
        },
        request : "/mobile"
      });
    },
    canvas_rider : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "canvas_rider/canvas_rider",
          partials : []
        },
        request : "/canvas_rider"
      });
    },
    challenge : function(res) {
      this.current_view = new Application.Views.AddInviteChallengeFriendsDialog({
        track_slug : res,
        full_page : true,
        source : "route"
      });
    },
    store : function(expiration, data) {
      var url = "store";
      if (expiration) {
        url = url + ("/" + expiration);
      }
      if (data) {
        url = url + ("/" + data);
      }
      this.current_view = new Application.Views.StoreView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        request : url
      });
    },
    draw_rider : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "draw_rider/draw_rider",
          partials : []
        },
        request : "/draw_rider"
      });
    },
    education : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "education/education",
          partials : []
        },
        request : "/education"
      });
    },
    account_settings : function() {
      this.current_view = new Application.Views.AccountSettingsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load
      });
    },
    admin : function() {
      this.current_view = new Application.Views.AdminView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load
      });
    },
    fb_mobile : function() {
      this.current_view = new Application.Views.FbMobileView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load
      });
    },
    auth_page : function() {
      Application.events.publish("prompt.signup", {
        viewAsPage : true
      });
    },
    achievements : function() {
      this.current_view = new Application.Views.AchievementsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "achievements/achievements",
          partials : []
        },
        left_nav : "achievements"
      });
    },
    home : function() {
      this.current_view = new Application.Views.HomeView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load
      });
    },
    contact : function() {
      this.current_view = new Application.Views.ContactView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "contact/contact",
          partials : []
        },
        request : "/contact"
      });
    },
    campaign : function() {
      this.current_view = new Application.Views.CampaignView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "campaign/campaign",
          partials : ["campaign/progress_bar", "ads/leaderboard_2_ad"]
        },
        left_nav : "campaign"
      });
    },
    campaign_page : function(canCreateDiscussions) {
      this.current_view = new Application.Views.CampaignPageView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        campaign_slug : canCreateDiscussions,
        templates : {
          main : "campaign/campaign_page",
          partials : ["campaign/campaign_track_listing_tile", "campaign/progress_bar", "ads/leaderboard_2_ad", "ads/track_list_ad", "ads/300x250_1_ad"]
        }
      });
    },
    campaign_coming_soon : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "campaign/coming_soon",
          partials : []
        },
        left_nav : "campaign"
      });
    },
    create : function() {
      if ("mobile" === Application.settings.device) {
        this.current_view = new Application.Views.HtmlView({
          el : this.$center_panel,
          initial_page_load : this.initial_page_load,
          templates : {
            main : "create/coming_soon",
            partials : []
          },
          left_nav : "create"
        });
      } else {
        this.current_view = new Application.Views.EditorView({
          el : this.$center_panel,
          initial_page_load : this.initial_page_load
        });
      }
    },
    subscriptions : function() {
      this.current_view = new Application.Views.SubscriptionsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "recently-added"
      });
    },
    help : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "help/help",
          partials : ["help/desktop_controls", "help/mobile_controls", "help/points_help"]
        },
        request : "/help"
      });
    },
    user_profile : function(res, next) {
      this.current_view = new Application.Views.UserProfileView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        username : res,
        flag : next
      });
    },
    tracks_page : function() {
      this.current_view = new Application.Views.TracksView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load
      });
    },
    track_page : function(callback, checked) {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        trackname : callback,
        flag : checked
      });
    },
    track_campaign_page : function(canCreateDiscussions) {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        trackname : canCreateDiscussions,
        flag : "c"
      });
    },
    track_show_challenge : function(canCreateDiscussions) {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        trackname : canCreateDiscussions,
        show_challenge : true
      });
    },
    track_page_uploaded : function(canCreateDiscussions) {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        trackname : canCreateDiscussions,
        flag : "uploaded"
      });
    },
    track_race_page : function(formatters, customFormatters) {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        trackname : formatters,
        race_unames_path : customFormatters
      });
    },
    random_track : function() {
      this.current_view = new Application.Views.TrackView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        random : true
      });
    },
    search_track : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "search"
      });
    },
    recently_added : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "recently-added"
      });
    },
    most_popular : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "most-popular"
      });
    },
    shuffled : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "shuffled"
      });
    },
    biggest : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "biggest"
      });
    },
    trending : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "trending"
      });
    },
    hot : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "hot"
      });
    },
    highest_rated : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "highest-rated"
      });
    },
    featured : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "featured"
      });
    },
    leaderboards : function(name, res, next) {
      this.current_view = new Application.Views.LeaderboardsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "leaderboards/leaderboards",
          partials : ["ads/leaderboard_1_ad", "pagination/pagination"]
        },
        left_nav : "leaderboards",
        type : name,
        timespan : res,
        page : next
      });
    },
    notifications : function() {
      this.current_view = new Application.Views.NotificationsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "notifications/notifications",
          partials : ["notifications/notification_day", "notifications/uname_reminder", "notifications/track_lb_passed", "notifications/t_uname_mention", "notifications/friend_lb_passed", "notifications/friend_req_rcvd", "notifications/friend_req_accptd", "notifications/friend_t_challenge", "notifications/mobile_account_linked_award", "notifications/subscribed_t_publish", "notifications/transferred_coins", "notifications/friend_added", "ads/leaderboard_2_ad"]
        },
        left_nav : "notifications"
      });
    },
    notification_settings : function() {
      this.current_view = new Application.Views.NotificationSettingsView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "notifications/notification_settings",
          partials : []
        }
      });
    },
    best_time : function() {
      this.current_view = new Application.Views.CategoryView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        category : "best-time"
      });
    },
    page_not_found : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "system/404",
          partials : []
        }
      });
    },
    error : function() {
      this.current_view = new Application.Views.HtmlView({
        el : this.$center_panel,
        initial_page_load : this.initial_page_load,
        templates : {
          main : "system/error",
          partials : []
        }
      });
    },
    _unbind_center_content : function() {
      this.$center_panel.unbind();
    },
    bind_anchor_tags : function() {
      $("html").on("click", "a", this.route_and_navigate.bind(this));
    },
    refresh : function() {
      Backbone.history.loadUrl(Backbone.history.fragment);
    },
    route_and_navigate : function(event) {
      var me = $(event.target).closest("a");
      if (1 == me.data("route")) {
        return true;
      }
      var t = me.attr("href");
      return event.preventDefault(), 1 == me.data("silent") || "#" === t || "undefined" == typeof t ? false : (this.do_route(t), false);
    },
    default_wait_for_page : function(val, valueCheck) {
      valueCheck(val);
    },
    prompt_wait_for_page : function(val, valueCheck) {
      if (confirm("Are you sure you want to leave this page?")) {
        valueCheck(val);
      }
    },
    do_route : function(exp) {
      this.wait_for_page(exp, this.complete_route.bind(this));
    },
    complete_route : function(id) {
      if (!this.current_view || !this.current_view.on_leave || confirm(this.current_view.on_leave)) {
        id = id.replace(Application.settings.base_platform_url, "");
        Application.events.publish("router.navigate", [id]);
        var fragment = Backbone.history.fragment;
        this.navigate(id, {
          trigger : true,
          replace : false
        });
        var mobile_menu = Backbone.history.fragment;
        if (fragment == mobile_menu) {
          this.refresh();
        }
      }
    }
  });
  Application.GlobalRouter = start;
}(Application), function(metaWindow) {
  function Timer() {
    this.initialize();
  }
  var $ = Application.Helpers.FacebookHelper;
  Timer.prototype = {
    initialize : function() {
      this.init_window_events();
      this.init_progress_bar();
      if (Application.settings.kg_embedded) {
        this.init_cross_domain_resize();
      } else {
        if ("fb_canvas" === Application.settings.platform) {
          this.init_fb_canvas_resize();
        }
      }
      this.init_scroll_to();
      this.init_routing();
    },
    init_routing : function() {
      Application.router = new Application.GlobalRouter;
      Backbone.history.start({
        hashChange : false,
        pushState : true,
        root : Application.settings.load_root_url
      });
    },
    init_window_events : function() {
      var $WINDOW = $(window);
      $("#left-navigation");
      $WINDOW.scroll(function(trackingLocationObject) {
        Application.events.publish("scroll.view", trackingLocationObject);
      });
      $(window).bind("resize", _.debounce(function(trackingLocationObject) {
        Application.events.publish("resize", trackingLocationObject);
      }, 150));
      $(window).bind("orientationchange", function(trackingLocationObject) {
        Application.events.publish("resize", trackingLocationObject);
        Application.events.publish("orientationChange", trackingLocationObject);
      });
      $("body");
    },
    init_progress_bar : function() {
      $(document).ajaxStart(function() {
        if (0 === $("#progress").length) {
          $("body").append($("<div><dt/><dd/></div>").attr("id", "progress"));
          $("#progress").width(50 + 30 * Math.random() + "%");
        }
      });
      $(document).ajaxComplete(function() {
        $("#progress").width("101%").delay(200).fadeOut(400, function() {
          $(this).remove();
        });
      });
    },
    init_fast_click : function() {
      FastClick.attach(document.body);
    },
    init_cross_domain_resize : function() {
      var win = this;
      Application.events.subscribe("resize", function() {
        var dxdydust = win.getBodyHeight();
        $.postMessage({
          height : dxdydust
        }, "*");
      });
      $.receiveMessage(function(simpleselect) {
        if ("get_height" === simpleselect.data) {
          var dxdydust = win.getBodyHeight();
          $.postMessage({
            height : dxdydust
          }, "*");
          $("html").css({
            "overflow-y" : "hidden"
          });
        }
      }, "http://www.kanogames.com");
    },
    init_fb_canvas_resize : function() {
      var win = this;
      $("html").css({
        "overflow-y" : "hidden"
      });
      Application.events.subscribe("resize", function() {
        $.each([5, 100, 500, 1e3], function(s, timeToFadeIn) {
          setTimeout(function() {
            var dxdydust = win.getBodyHeight() + 80;
            $.exec(["Canvas", "setSize"], [{
              height : dxdydust
            }]);
          }, timeToFadeIn);
        });
      });
    },
    init_scroll_to : function() {
      if ("fb_canvas" === Application.settings.platform) {
        Application.events.subscribe("scrollTo", function(objectToMeasure) {
          $.exec(["Canvas", "scrollTo"], [objectToMeasure.x, objectToMeasure.y]);
        });
      } else {
        Application.events.subscribe("scrollTo", function(scrollTo) {
          window.scrollTo(scrollTo.x, scrollTo.y);
        });
      }
    },
    getBodyHeight : function() {
      var playHeadLastPosition = $("#header").height();
      var delta = $("#content").height();
      var maxPrimaryDepth = 1100;
      return Math.max(playHeadLastPosition + delta, maxPrimaryDepth);
    }
  };
  window.Bootstrap = Timer;
}(window);
