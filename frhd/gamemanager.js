'use strict';
!function e(t, n, r) {
  function s(name, e) {
    if (!n[name]) {
      if (!t[name]) {
        var r = "function" == typeof require && require;
        if (!e && r) {
          return r(name, true);
        }
        if (i) {
          return i(name, true);
        }
        var f = new Error("Cannot find module '" + name + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var u = n[name] = {
        exports : {}
      };
      t[name][0].call(u.exports, function(e) {
        var n = t[name][1][e];
        return s(n ? n : e);
      }, u, u.exports, e, t, n, r);
    }
    return n[name].exports;
  }
  var i = "function" == typeof require && require;
  var o = 0;
  for (; o < r.length; o++) {
    s(r[o]);
  }
  return s;
}({
  1 : [function(canCreateDiscussions, module) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    function isFunction(arg) {
      return "function" == typeof arg;
    }
    function isNumber(val) {
      return "number" == typeof val;
    }
    function isObject(arg) {
      return "object" == typeof arg && null !== arg;
    }
    function isUndefined(val) {
      return void 0 === val;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || 0 > n || isNaN(n)) {
        throw TypeError("n must be a positive number");
      }
      return this._maxListeners = n, this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er;
      var handler;
      var length;
      var args;
      var i;
      var namedListeners;
      if (this._events || (this._events = {}), "error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        if (er = arguments[1], er instanceof Error) {
          throw er;
        }
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      if (handler = this._events[type], isUndefined(handler)) {
        return false;
      }
      if (isFunction(handler)) {
        switch(arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            length = arguments.length;
            args = new Array(length - 1);
            i = 1;
            for (; length > i; i++) {
              args[i - 1] = arguments[i];
            }
            handler.apply(this, args);
        }
      } else {
        if (isObject(handler)) {
          length = arguments.length;
          args = new Array(length - 1);
          i = 1;
          for (; length > i; i++) {
            args[i - 1] = arguments[i];
          }
          namedListeners = handler.slice();
          length = namedListeners.length;
          i = 0;
          for (; length > i; i++) {
            namedListeners[i].apply(this, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) {
        throw TypeError("listener must be a function");
      }
      if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener), this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [this._events[type], listener] : this._events[type] = listener, isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          if ("function" == typeof console.trace) {
            console.trace();
          }
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      function g() {
        this.removeListener(type, g);
        if (!i) {
          i = true;
          listener.apply(this, arguments);
        }
      }
      if (!isFunction(listener)) {
        throw TypeError("listener must be a function");
      }
      var i = false;
      return g.listener = listener, this.on(type, g), this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list;
      var key;
      var length;
      var i;
      if (!isFunction(listener)) {
        throw TypeError("listener must be a function");
      }
      if (!this._events || !this._events[type]) {
        return this;
      }
      if (list = this._events[type], length = list.length, key = -1, list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener) {
          this.emit("removeListener", type, listener);
        }
      } else {
        if (isObject(list)) {
          i = length;
          for (; i-- > 0;) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              key = i;
              break;
            }
          }
          if (0 > key) {
            return this;
          }
          if (1 === list.length) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(key, 1);
          }
          if (this._events.removeListener) {
            this.emit("removeListener", type, listener);
          }
        }
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key;
      var listeners;
      if (!this._events) {
        return this;
      }
      if (!this._events.removeListener) {
        return 0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type], this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" !== key) {
            this.removeAllListeners(key);
          }
        }
        return this.removeAllListeners("removeListener"), this._events = {}, this;
      }
      if (listeners = this._events[type], isFunction(listeners)) {
        this.removeListener(type, listeners);
      } else {
        for (; listeners.length;) {
          this.removeListener(type, listeners[listeners.length - 1]);
        }
      }
      return delete this._events[type], this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var t;
      return t = this._events && this._events[type] ? isFunction(this._events[type]) ? [this._events[type]] : this._events[type].slice() : [];
    };
    EventEmitter.listenerCount = function(emitter, type) {
      var s;
      return s = emitter._events && emitter._events[type] ? isFunction(emitter._events[type]) ? 1 : emitter._events[type].length : 0;
    };
  }, {}],
  2 : [function(require) {
    !function(metaWindow) {
      var loader = false;
      var res = false;
      var EventEmitter = require("events").EventEmitter;
      var that = Application.Helpers.GoogleAnalyticsHelper;
      window.createjs = {};
      require("./libs/preloadjs-0.6.0.min");
      require("./libs/soundjs-0.6.0.min");
      var init = function() {
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
      var self = init.prototype = new EventEmitter;
      self.state = null;
      self.pendingAssetCount = 0;
      self.loadRaceRequest = null;
      self.loadTrackRequest = null;
      self.baseAssetsLoaded = false;
      self.settings = null;
      self.game = null;
      self.scene = null;
      self.trackId = null;
      self.trackEvent = function(name, val, type, value) {
        var types = {
          category : name,
          action : val,
          label : type,
          value : value,
          non_interaction : true
        };
        that.track_event(types);
      };
      self.state = {
        preloading : true,
        loadingPercent : 0,
        loadingText : "Scripts"
      };
      self.clearRequests = function() {
        if (this.loadTrackRequest) {
          this.loadTrackRequest.abort();
        }
        if (this.loadRaceRequest) {
          this.loadRaceRequest.abort();
        }
        this.loadTrackRequest = null;
        this.loadRaceRequest = null;
      };
      self.init = function(value, key) {
        this.pendingCommands = [];
        this.clearRequests();
        this.settings = key;
        this.scene = value;
        this.ready = true;
        this.checkLoadingProgress();
      };
      self.checkLoadingProgress = function() {
        if (this.baseAssetsLoaded) {
          this.loadGame();
        }
      };
      self.handleComplete = function() {
        if (this.ready) {
          this.loadGame();
        }
        this.baseAssetsLoaded = true;
      };
      self.handleProgress = function(event) {
        var namespacePrefixEq = event.loaded / event.total * 100 | 0;
        var state = this.state;
        state.loadingPercent = namespacePrefixEq;
        state.preloading = true;
        this.stateChange(state);
      };
      self.showLoading = function(tag) {
        var t = this.pendingAssetCount;
        if (0 >= t) {
          t = 0.5;
        }
        var r = 0.5 / t * 100 | 0;
        r = Math.min(r, 100);
        var state = this.state;
        state.loadingPercent = r;
        state.preloading = true;
        state.loadingText = tag;
        this.stateChange(state);
      };
      self.handleFileLoad = function(evt) {
        var el = evt.item;
        var state = this.state;
        state.loadingText = el.name ? el.name : "Assets";
        this.stateChange(state);
      };
      self.loadRacesFromSettings = function() {
        var settings = this.settings;
        var t = settings.raceUids;
        if (!t) {
          t = [];
        }
        var background_page_id = settings.track.id;
        if (t.length > 0 && settings.raceData && settings.raceData.length == t.length) {
          this.command("add race", settings.raceData, false);
        } else {
          if (t.length > 0) {
            var id = t.join(",");
            this.loadRace(background_page_id, id, false);
          }
        }
      };
      self.loadTrackFromSettings = function() {
        var options = this.settings;
        var query = options.track;
        var id = query.id;
        var path = query.cdn;
        this.loadTrack(id, path);
      };
      self.loadGame = function() {
        this.game = new Game(this.scene, loader, this.settings);
        this.game.onStateChange = this.stateChange.bind(this);
        this.executePendingCommands();
        this.executePendingRaceCommands();
        if ("Main" === this.scene) {
          this.loadTrackFromSettings();
          this.loadRacesFromSettings();
        }
      };
      self.loadRace = function(formatters, initialValue, context) {
        if ("undefined" != typeof Application) {
          var header = {
            t_id : formatters,
            u_ids : initialValue
          };
          this.pendingAssetCount++;
          this.showLoading("Loading Race...");
          var handler = Application.Helpers.AjaxHelper.post("/track_api/load_races", header, {
            track : false
          });
          handler.done(context ? this.loadRaceCompleteWithDialog.bind(this) : this.loadRaceComplete.bind(this));
          this.loadRaceRequest = handler;
        }
      };
      self.loadRaceCompleteWithDialog = function(e) {
        if (e.result) {
          this.command("add race", e.data, true);
        }
        this.loadRaceRequest = null;
      };
      self.loadRaceComplete = function(e) {
        if (e.result) {
          this.command("add race", e.data, false);
        }
        this.loadRaceRequest = null;
      };
      self.closeGame = function() {
        if (this.game) {
          this.game.close();
          this.game = null;
        }
      };
      self.executePendingCommands = function() {
        var commands = this.pendingCommands;
        var length = commands.length;
        var i = 0;
        for (; length > i; i++) {
          var value = commands[i];
          this.command.apply(this, value);
        }
        this.pendingCommands = [];
      };
      self.executePendingRaceCommands = function() {
        var commands = this.pendingRaceCommands;
        var length = commands.length;
        var i = 0;
        for (; length > i; i++) {
          var value = commands[i];
          this.command.apply(this, value);
        }
        this.pendingRaceCommands = [];
      };
      self.command = function(respectCounter) {
        if (this.game) {
          this.game.command.apply(this.game, arguments);
        } else {
          if ("add race" == respectCounter) {
            this.pendingRaceCommands.push(arguments);
          } else {
            this.pendingCommands.push(arguments);
          }
        }
      };
      self.loadTrack = function(trackId, callback) {
        this.pendingAssetCount++;
        this.showLoading("Loading Track...");
        this.trackId = trackId;
        if (callback) {
          this.cdnTrackRequest(callback);
        } else {
          this.svrTrackRequest(trackId);
        }
      };
      self.cdnTrackRequest = function(object) {
        var t = $.ajax({
          type : "GET",
          url : object,
          async : true,
          cache : true,
          jsonpCallback : "t",
          contentType : "application/json",
          dataType : "jsonp",
          success : this.cdnTrackRequestSuccess.bind(this),
          error : this.cdnTrackRequestError.bind(this)
        });
        this.loadTrackRequest = t;
      };
      self.svrTrackRequest = function(trackId) {
        var data = {
          id : trackId,
          fields : ["id", "code", "vehicle", "vehicles"]
        };
        var s = "/track_api/load_track?" + decodeURIComponent($.param(data));
        var t = Application.Helpers.AjaxHelper.get(s);
        t.done(this.svrTrackRequestSuccess.bind(this));
        t.fail(this.svrTrackRequestError.bind(this));
        this.loadTrackRequest = t;
      };
      self.cdnTrackRequestSuccess = function(value) {
        if (this.settings.track && value.id == this.trackId) {
          if (this.settings.isCampaign) {
            this.trackEvent("campaign-track", "track-loaded-success", this.settings.track.id);
          } else {
            this.trackEvent("track", "track-loaded-success", this.settings.track.id);
          }
          this.command("add track", value);
          this.loadTrackRequest = null;
        }
      };
      self.svrTrackRequestSuccess = function(event) {
        if (this.settings.track && 1 == event.result && event.data.track.id == this.trackId) {
          if (this.settings.isCampaign) {
            this.trackEvent("campaign-track", "track-loaded-success", this.settings.track.id);
          } else {
            this.trackEvent("track", "track-loaded-success", this.settings.track.id);
          }
          if (1 == event.result) {
            this.command("add track", event.data.track);
          }
          this.loadTrackRequest = null;
        }
      };
      self.cdnTrackRequestError = function(lstnrs, eventName) {
        if (this.settings.isCampaign) {
          this.trackEvent("campaign-track", "track-loaded-fail-cdn", this.settings.track.id + "-" + eventName);
        } else {
          this.trackEvent("track", "track-loaded-fail-cdn", this.settings.track.id + "-" + eventName);
        }
        this.svrTrackRequest(this.trackId);
        this.loadTrackRequest = null;
      };
      self.svrTrackRequestError = function(lstnrs, eventName) {
        if (this.settings.isCampaign) {
          this.trackEvent("campaign-track", "track-loaded-fail-svr", this.settings.track.id + "-" + eventName);
        } else {
          this.trackEvent("track", "track-loaded-fail-svr", this.settings.track.id + "-" + eventName);
        }
      };
      self.resize = function() {
        if (this.game) {
          this.game.setSize();
        }
      };
      self.stateChange = function(state) {
        this.emit("stateChange", state);
      };
      self.loadFile = function(e) {
        res.loadFile({
          id : e,
          src : e
        });
      };
      self.close = function() {
        this.clearRequests();
        this.pendingCommands = [];
        this.pendingRaceCommands = [];
        this.ready = false;
        this.closeGame();
      };
      metaWindow.GameManager = new init;
    }(window);
  }, {
    "./libs/preloadjs-0.6.0.min" : 3,
    "./libs/soundjs-0.6.0.min" : 4,
    events : 1
  }],
  3 : [function(canCreateDiscussions, module, exports) {
    (function(val) {
      this.createjs = this.createjs || {};
      (function() {
        var s = createjs.PreloadJS = createjs.PreloadJS || {};
        s.version = "0.6.1";
        s.buildDate = "Thu, 21 May 2015 16:17:37 GMT";
      })();
      this.createjs = this.createjs || {};
      createjs.extend = function(obj, from) {
        function f() {
          this.constructor = obj;
        }
        return f.prototype = from.prototype, obj.prototype = new f;
      };
      this.createjs = this.createjs || {};
      createjs.promote = function(obj, prefix) {
        var subP = obj.prototype;
        var supP = Object.getPrototypeOf && Object.getPrototypeOf(subP) || subP.__proto__;
        if (supP) {
          subP[(prefix = prefix + "_") + "constructor"] = supP.constructor;
          var n;
          for (n in supP) {
            if (subP.hasOwnProperty(n) && "function" == typeof supP[n]) {
              subP[prefix + n] = supP[n];
            }
          }
        }
        return obj;
      };
      this.createjs = this.createjs || {};
      createjs.indexOf = function(array, value) {
        var i = 0;
        var length = array.length;
        for (; length > i; i++) {
          if (value === array[i]) {
            return i;
          }
        }
        return -1;
      };
      this.createjs = this.createjs || {};
      (function() {
        createjs.proxy = function(t, value) {
          var s = Array.prototype.slice.call(arguments, 2);
          return function() {
            return t.apply(value, Array.prototype.slice.call(arguments, 0).concat(s));
          };
        };
      })();
      this.createjs = this.createjs || {};
      (function() {
        function BrowserDetect() {
          throw "BrowserDetect cannot be instantiated";
        }
        var agent = BrowserDetect.agent = window.navigator.userAgent;
        BrowserDetect.isWindowPhone = agent.indexOf("IEMobile") > -1 || agent.indexOf("Windows Phone") > -1;
        BrowserDetect.isFirefox = agent.indexOf("Firefox") > -1;
        BrowserDetect.isOpera = null != window.opera;
        BrowserDetect.isChrome = agent.indexOf("Chrome") > -1;
        BrowserDetect.isIOS = (agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) && !BrowserDetect.isWindowPhone;
        BrowserDetect.isAndroid = agent.indexOf("Android") > -1 && !BrowserDetect.isWindowPhone;
        BrowserDetect.isBlackberry = agent.indexOf("Blackberry") > -1;
        createjs.BrowserDetect = BrowserDetect;
      })();
      this.createjs = this.createjs || {};
      (function() {
        function Event(type, info, colorCellCss) {
          this.type = type;
          this.target = null;
          this.currentTarget = null;
          this.eventPhase = 0;
          this.bubbles = !!info;
          this.cancelable = !!colorCellCss;
          this.timeStamp = (new Date).getTime();
          this.defaultPrevented = false;
          this.propagationStopped = false;
          this.immediatePropagationStopped = false;
          this.removed = false;
        }
        var proto = Event.prototype;
        proto.preventDefault = function() {
          this.defaultPrevented = this.cancelable && true;
        };
        proto.stopPropagation = function() {
          this.propagationStopped = true;
        };
        proto.stopImmediatePropagation = function() {
          this.immediatePropagationStopped = this.propagationStopped = true;
        };
        proto.remove = function() {
          this.removed = true;
        };
        proto.clone = function() {
          return new Event(this.type, this.bubbles, this.cancelable);
        };
        proto.set = function(e) {
          var p;
          for (p in e) {
            this[p] = e[p];
          }
          return this;
        };
        proto.toString = function() {
          return "[Event (type=" + this.type + ")]";
        };
        createjs.Event = Event;
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ErrorEvent(title, message, data) {
          this.Event_constructor("error");
          this.title = title;
          this.message = message;
          this.data = data;
        }
        var p = createjs.extend(ErrorEvent, createjs.Event);
        p.clone = function() {
          return new createjs.ErrorEvent(this.title, this.message, this.data);
        };
        createjs.ErrorEvent = createjs.promote(ErrorEvent, "Event");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function EventDispatcher() {
          this._listeners = null;
          this._captureListeners = null;
        }
        var p = EventDispatcher.prototype;
        EventDispatcher.initialize = function(target) {
          target.addEventListener = p.addEventListener;
          target.on = p.on;
          target.removeEventListener = target.off = p.removeEventListener;
          target.removeAllEventListeners = p.removeAllEventListeners;
          target.hasEventListener = p.hasEventListener;
          target.dispatchEvent = p.dispatchEvent;
          target._dispatchEvent = p._dispatchEvent;
          target.willTrigger = p.willTrigger;
        };
        p.addEventListener = function(type, obj, fn) {
          var data;
          data = fn ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
          var result = data[type];
          return result && this.removeEventListener(type, obj, fn), result = data[type], result ? result.push(obj) : data[type] = [obj], obj;
        };
        p.on = function(event, listener, scope, data, headers, callback) {
          return listener.handleEvent && (scope = scope || listener, listener = listener.handleEvent), scope = scope || this, this.addEventListener(event, function(event) {
            listener.call(scope, event, headers);
            if (data) {
              event.remove();
            }
          }, callback);
        };
        p.removeEventListener = function(type, callback, useCapture) {
          var listeners = useCapture ? this._captureListeners : this._listeners;
          if (listeners) {
            var callbacks = listeners[type];
            if (callbacks) {
              var i = 0;
              var l = callbacks.length;
              for (; l > i; i++) {
                if (callbacks[i] == callback) {
                  if (1 == l) {
                    delete listeners[type];
                  } else {
                    callbacks.splice(i, 1);
                  }
                  break;
                }
              }
            }
          }
        };
        p.off = p.removeEventListener;
        p.removeAllEventListeners = function(type) {
          if (type) {
            if (this._listeners) {
              delete this._listeners[type];
            }
            if (this._captureListeners) {
              delete this._captureListeners[type];
            }
          } else {
            this._listeners = this._captureListeners = null;
          }
        };
        p.dispatchEvent = function(eventObj) {
          if ("string" == typeof eventObj) {
            var listeners = this._listeners;
            if (!listeners || !listeners[eventObj]) {
              return false;
            }
            eventObj = new createjs.Event(eventObj);
          } else {
            if (eventObj.target && eventObj.clone) {
              eventObj = eventObj.clone();
            }
          }
          try {
            eventObj.target = this;
          } catch (s) {
          }
          if (eventObj.bubbles && this.parent) {
            var t = this;
            var results = [t];
            for (; t.parent;) {
              results.push(t = t.parent);
            }
            var i;
            var l = results.length;
            i = l - 1;
            for (; i >= 0 && !eventObj.propagationStopped; i--) {
              results[i]._dispatchEvent(eventObj, 1 + (0 == i));
            }
            i = 1;
            for (; l > i && !eventObj.propagationStopped; i++) {
              results[i]._dispatchEvent(eventObj, 3);
            }
          } else {
            this._dispatchEvent(eventObj, 2);
          }
          return eventObj.defaultPrevented;
        };
        p.hasEventListener = function(type) {
          var listeners = this._listeners;
          var captureListeners = this._captureListeners;
          return !!(listeners && listeners[type] || captureListeners && captureListeners[type]);
        };
        p.willTrigger = function(type) {
          var s = this;
          for (; s;) {
            if (s.hasEventListener(type)) {
              return true;
            }
            s = s.parent;
          }
          return false;
        };
        p.toString = function() {
          return "[EventDispatcher]";
        };
        p._dispatchEvent = function(eventObj, eventPhase) {
          var i;
          var listeners = 1 == eventPhase ? this._captureListeners : this._listeners;
          if (eventObj && listeners) {
            var arr = listeners[eventObj.type];
            if (!arr || !(i = arr.length)) {
              return;
            }
            try {
              eventObj.currentTarget = this;
            } catch (a) {
            }
            try {
              eventObj.eventPhase = eventPhase;
            } catch (a) {
            }
            eventObj.removed = false;
            arr = arr.slice();
            var l = 0;
            for (; i > l && !eventObj.immediatePropagationStopped; l++) {
              var o = arr[l];
              if (o.handleEvent) {
                o.handleEvent(eventObj);
              } else {
                o(eventObj);
              }
              if (eventObj.removed) {
                this.off(eventObj.type, o, 1 == eventPhase);
                eventObj.removed = false;
              }
            }
          }
        };
        createjs.EventDispatcher = EventDispatcher;
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ProgressEvent(loaded, total) {
          this.Event_constructor("progress");
          this.loaded = loaded;
          this.total = null == total ? 1 : total;
          this.progress = 0 == total ? 0 : this.loaded / this.total;
        }
        var p = createjs.extend(ProgressEvent, createjs.Event);
        p.clone = function() {
          return new createjs.ProgressEvent(this.loaded, this.total);
        };
        createjs.ProgressEvent = createjs.promote(ProgressEvent, "Event");
      })(window);
      (function() {
        function runInContext(context, exports) {
          function has(name) {
            if (has[name] !== undef) {
              return has[name];
            }
            var result;
            if ("bug-string-char-index" == name) {
              result = "a" != "a"[0];
            } else {
              if ("json" == name) {
                result = has("json-stringify") && has("json-parse");
              } else {
                var value;
                var serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if ("json-stringify" == name) {
                  var stringify = exports.stringify;
                  var i = "function" == typeof stringify && d;
                  if (i) {
                    (value = function() {
                      return 1;
                    }).toJSON = value;
                    try {
                      i = "0" === stringify(0) && "0" === stringify(new Number) && '""' == stringify(new String) && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && "1" === stringify(value) && "[1]" == stringify([value]) && "[null]" == stringify([undef]) && "null" == stringify(null) && "[null,null,null]" == stringify([undef, getClass, null]) && stringify({
                        a : [value, true, false, null, "\x00\b\n\f\r\t"]
                      }) == serialized && "1" === stringify(null, value) && "[\n 1,\n 2\n]" == stringify([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == stringify(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == stringify(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == stringify(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == stringify(new Date(-1));
                    } catch (h) {
                      i = false;
                    }
                  }
                  result = i;
                }
                if ("json-parse" == name) {
                  var parse = exports.parse;
                  if ("function" == typeof parse) {
                    try {
                      if (0 === parse("0") && !parse(false)) {
                        value = parse(serialized);
                        var BIGGER_EQUAL = 5 == value.a.length && 1 === value.a[0];
                        if (BIGGER_EQUAL) {
                          try {
                            BIGGER_EQUAL = !parse('"\t"');
                          } catch (h) {
                          }
                          if (BIGGER_EQUAL) {
                            try {
                              BIGGER_EQUAL = 1 !== parse("01");
                            } catch (h) {
                            }
                          }
                          if (BIGGER_EQUAL) {
                            try {
                              BIGGER_EQUAL = 1 !== parse("1.");
                            } catch (h) {
                            }
                          }
                        }
                      }
                    } catch (h) {
                      BIGGER_EQUAL = false;
                    }
                  }
                  result = BIGGER_EQUAL;
                }
              }
            }
            return has[name] = !!result;
          }
          if (!context) {
            context = root.Object();
          }
          if (!exports) {
            exports = root.Object();
          }
          var Number = context.Number || root.Number;
          var String = context.String || root.String;
          var Object = context.Object || root.Object;
          var Date = context.Date || root.Date;
          var parse = context.SyntaxError || root.SyntaxError;
          var _escapeReplacer = context.TypeError || root.TypeError;
          var $__3 = context.Math || root.Math;
          var SheetClip = context.JSON || root.JSON;
          if ("object" == typeof SheetClip && SheetClip) {
            exports.stringify = SheetClip.stringify;
            exports.parse = SheetClip.parse;
          }
          var isProperty;
          var forEach;
          var undef;
          var objectProto = Object.prototype;
          var getClass = objectProto.toString;
          var d = new Date(-0xc782b5b800cec);
          try {
            d = -109252 == d.getUTCFullYear() && 0 === d.getUTCMonth() && 1 === d.getUTCDate() && 10 == d.getUTCHours() && 37 == d.getUTCMinutes() && 6 == d.getUTCSeconds() && 708 == d.getUTCMilliseconds();
          } catch (y) {
          }
          if (!has("json")) {
            var functionClass = "[object Function]";
            var title = "[object Date]";
            var data = "[object Number]";
            var undefined = "[object String]";
            var id = "[object Array]";
            var GetWindowProxyPreserveColor = "[object Boolean]";
            var charIndexBuggy = has("bug-string-char-index");
            if (!d) {
              var floor = $__3.floor;
              var DAYS_IN_LEAPYEAR = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
              var getDay = function(year, month) {
                return DAYS_IN_LEAPYEAR[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
              };
            }
            if ((isProperty = objectProto.hasOwnProperty) || (isProperty = function(property) {
              var constructor;
              var members = {};
              return (members.__proto__ = null, members.__proto__ = {
                toString : 1
              }, members).toString != getClass ? isProperty = function(key) {
                var original = this.__proto__;
                var isattr = key in (this.__proto__ = null, this);
                return this.__proto__ = original, isattr;
              } : (constructor = members.constructor, isProperty = function(key) {
                var parent = (this.constructor || constructor).prototype;
                return key in this && !(key in parent && this[key] === parent[key]);
              }), members = null, isProperty.call(this, property);
            }), forEach = function(array, cb) {
              var Properties;
              var members;
              var property;
              var n = 0;
              (Properties = function() {
                this.valueOf = 0;
              }).prototype.valueOf = 0;
              members = new Properties;
              for (property in members) {
                if (isProperty.call(members, property)) {
                  n++;
                }
              }
              return Properties = members = null, n ? forEach = 2 == n ? function(object, cb) {
                var prop;
                var elem = {};
                var dataShow = getClass.call(object) == functionClass;
                for (prop in object) {
                  if (!(dataShow && "prototype" == prop || isProperty.call(elem, prop) || !(elem[prop] = 1) || !isProperty.call(object, prop))) {
                    cb(prop);
                  }
                }
              } : function(object, callback) {
                var property;
                var validate;
                var isFunction = getClass.call(object) == functionClass;
                for (property in object) {
                  if (!(isFunction && "prototype" == property || !isProperty.call(object, property) || (validate = "constructor" === property))) {
                    callback(property);
                  }
                }
                if (validate || isProperty.call(object, property = "constructor")) {
                  callback(property);
                }
              } : (members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], forEach = function(object, callback) {
                var property;
                var length;
                var isFunction = getClass.call(object) == functionClass;
                var hasProperty = !isFunction && "function" != typeof object.constructor && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                for (property in object) {
                  if (!(isFunction && "prototype" == property || !hasProperty.call(object, property))) {
                    callback(property);
                  }
                }
                length = members.length;
                for (; property = members[--length]; hasProperty.call(object, property) && callback(property)) {
                }
              }), forEach(array, cb);
            }, !has("json-stringify")) {
              var ringStrs = {
                92 : "\\\\",
                34 : '\\"',
                8 : "\\b",
                12 : "\\f",
                10 : "\\n",
                13 : "\\r",
                9 : "\\t"
              };
              var prefix = "000000";
              var pad = function(digits, num) {
                return (prefix + (num || 0)).slice(-digits);
              };
              var T = "\\u00";
              var quote = function(value) {
                var result = '"';
                var index = 0;
                var length = value.length;
                var useCharIndex = !charIndexBuggy || length > 10;
                var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
                for (; length > index; index++) {
                  var i = value.charCodeAt(index);
                  switch(i) {
                    case 8:
                    case 9:
                    case 10:
                    case 12:
                    case 13:
                    case 34:
                    case 92:
                      result = result + ringStrs[i];
                      break;
                    default:
                      if (32 > i) {
                        result = result + (T + pad(2, i.toString(16)));
                        break;
                      }
                      result = result + (useCharIndex ? symbols[index] : value.charAt(index));
                  }
                }
                return result + '"';
              };
              var serialize = function(key, scope, callback, properties, whitespace, indentation, stack) {
                var value;
                var field;
                var year;
                var month;
                var date;
                var qMinusT;
                var cols;
                var digit;
                var width;
                var precision;
                var results;
                var element;
                var item;
                var i;
                var prefix;
                var D;
                try {
                  value = scope[key];
                } catch (H) {
                }
                if ("object" == typeof value && value) {
                  if (field = getClass.call(value), field != title || isProperty.call(value, "toJSON")) {
                    if ("function" == typeof value.toJSON && (field != data && field != undefined && field != id || isProperty.call(value, "toJSON"))) {
                      value = value.toJSON(key);
                    }
                  } else {
                    if (value > -1 / 0 && 1 / 0 > value) {
                      if (getDay) {
                        date = floor(value / 864e5);
                        year = floor(date / 365.2425) + 1970 - 1;
                        for (; getDay(year + 1, 0) <= date; year++) {
                        }
                        month = floor((date - getDay(year, 0)) / 30.42);
                        for (; getDay(year, month + 1) <= date; month++) {
                        }
                        date = 1 + date - getDay(year, month);
                        qMinusT = (value % 864e5 + 864e5) % 864e5;
                        cols = floor(qMinusT / 36e5) % 24;
                        digit = floor(qMinusT / 6e4) % 60;
                        width = floor(qMinusT / 1e3) % 60;
                        precision = qMinusT % 1e3;
                      } else {
                        year = value.getUTCFullYear();
                        month = value.getUTCMonth();
                        date = value.getUTCDate();
                        cols = value.getUTCHours();
                        digit = value.getUTCMinutes();
                        width = value.getUTCSeconds();
                        precision = value.getUTCMilliseconds();
                      }
                      value = (0 >= year || year >= 1e4 ? (0 > year ? "-" : "+") + pad(6, 0 > year ? -year : year) : pad(4, year)) + "-" + pad(2, month + 1) + "-" + pad(2, date) + "T" + pad(2, cols) + ":" + pad(2, digit) + ":" + pad(2, width) + "." + pad(3, precision) + "Z";
                    } else {
                      value = null;
                    }
                  }
                }
                if (callback && (value = callback.call(scope, key, value)), null === value) {
                  return "null";
                }
                if (field = getClass.call(value), field == GetWindowProxyPreserveColor) {
                  return "" + value;
                }
                if (field == data) {
                  return value > -1 / 0 && 1 / 0 > value ? "" + value : "null";
                }
                if (field == undefined) {
                  return quote("" + value);
                }
                if ("object" == typeof value) {
                  i = stack.length;
                  for (; i--;) {
                    if (stack[i] === value) {
                      throw _escapeReplacer();
                    }
                  }
                  if (stack.push(value), results = [], prefix = indentation, indentation = indentation + whitespace, field == id) {
                    item = 0;
                    i = value.length;
                    for (; i > item; item++) {
                      element = serialize(item, value, callback, properties, whitespace, indentation, stack);
                      results.push(element === undef ? "null" : element);
                    }
                    D = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                  } else {
                    forEach(properties || value, function(v) {
                      var element = serialize(v, value, callback, properties, whitespace, indentation, stack);
                      if (element !== undef) {
                        results.push(quote(v) + ":" + (whitespace ? " " : "") + element);
                      }
                    });
                    D = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                  }
                  return stack.pop(), D;
                }
              };
              exports.stringify = function(source, filter, width) {
                var whitespace;
                var callback;
                var type;
                var name;
                if (objectTypes[typeof filter] && filter) {
                  if ((name = getClass.call(filter)) == functionClass) {
                    callback = filter;
                  } else {
                    if (name == id) {
                      type = {};
                      var value;
                      var spaceMax = 0;
                      var space = filter.length;
                      for (; space > spaceMax; value = filter[spaceMax++], name = getClass.call(value), (name == undefined || name == data) && (type[value] = 1)) {
                      }
                    }
                  }
                }
                if (width) {
                  if ((name = getClass.call(width)) == data) {
                    if ((width = width - width % 1) > 0) {
                      whitespace = "";
                      if (width > 10) {
                        width = 10;
                      }
                      for (; whitespace.length < width; whitespace = whitespace + " ") {
                      }
                    }
                  } else {
                    if (name == undefined) {
                      whitespace = width.length <= 10 ? width : width.slice(0, 10);
                    }
                  }
                }
                return serialize("", (value = {}, value[""] = source, value), callback, type, whitespace, "", []);
              };
            }
            if (!has("json-parse")) {
              var index;
              var node;
              var fromCharCode = String.fromCharCode;
              var PAIR_RESOLUTIONS_ = {
                92 : "\\",
                34 : '"',
                47 : "/",
                98 : "\b",
                116 : "\t",
                110 : "\n",
                102 : "\f",
                114 : "\r"
              };
              var log = function() {
                throw index = node = null, parse();
              };
              var lex = function() {
                var value;
                var idx;
                var start;
                var e;
                var i;
                var source = node;
                var length = source.length;
                for (; length > index;) {
                  switch(i = source.charCodeAt(index)) {
                    case 9:
                    case 10:
                    case 13:
                    case 32:
                      index++;
                      break;
                    case 123:
                    case 125:
                    case 91:
                    case 93:
                    case 58:
                    case 44:
                      return value = charIndexBuggy ? source.charAt(index) : source[index], index++, value;
                    case 34:
                      value = "@";
                      index++;
                      for (; length > index;) {
                        if (i = source.charCodeAt(index), 32 > i) {
                          log();
                        } else {
                          if (92 == i) {
                            switch(i = source.charCodeAt(++index)) {
                              case 92:
                              case 34:
                              case 47:
                              case 98:
                              case 116:
                              case 110:
                              case 102:
                              case 114:
                                value = value + PAIR_RESOLUTIONS_[i];
                                index++;
                                break;
                              case 117:
                                idx = ++index;
                                start = index + 4;
                                for (; start > index; index++) {
                                  i = source.charCodeAt(index);
                                  if (!(i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i)) {
                                    log();
                                  }
                                }
                                value = value + fromCharCode("0x" + source.slice(idx, index));
                                break;
                              default:
                                log();
                            }
                          } else {
                            if (34 == i) {
                              break;
                            }
                            i = source.charCodeAt(index);
                            idx = index;
                            for (; i >= 32 && 92 != i && 34 != i;) {
                              i = source.charCodeAt(++index);
                            }
                            value = value + source.slice(idx, index);
                          }
                        }
                      }
                      if (34 == source.charCodeAt(index)) {
                        return index++, value;
                      }
                      log();
                    default:
                      if (idx = index, 45 == i && (e = true, i = source.charCodeAt(++index)), i >= 48 && 57 >= i) {
                        if (48 == i && (i = source.charCodeAt(index + 1), i >= 48 && 57 >= i)) {
                          log();
                        }
                        e = false;
                        for (; length > index && (i = source.charCodeAt(index), i >= 48 && 57 >= i); index++) {
                        }
                        if (46 == source.charCodeAt(index)) {
                          start = ++index;
                          for (; length > start && (i = source.charCodeAt(start), i >= 48 && 57 >= i); start++) {
                          }
                          if (start == index) {
                            log();
                          }
                          index = start;
                        }
                        if (i = source.charCodeAt(index), 101 == i || 69 == i) {
                          i = source.charCodeAt(++index);
                          if (43 == i || 45 == i) {
                            index++;
                          }
                          start = index;
                          for (; length > start && (i = source.charCodeAt(start), i >= 48 && 57 >= i); start++) {
                          }
                          if (start == index) {
                            log();
                          }
                          index = start;
                        }
                        return +source.slice(idx, index);
                      }
                      if (e && log(), "true" == source.slice(index, index + 4)) {
                        return index = index + 4, true;
                      }
                      if ("false" == source.slice(index, index + 5)) {
                        return index = index + 5, false;
                      }
                      if ("null" == source.slice(index, index + 4)) {
                        return index = index + 4, null;
                      }
                      log();
                  }
                }
                return "$";
              };
              var get = function(value) {
                var results;
                var s;
                if ("$" == value && log(), "string" == typeof value) {
                  if ("@" == (charIndexBuggy ? value.charAt(0) : value[0])) {
                    return value.slice(1);
                  }
                  if ("[" == value) {
                    results = [];
                    for (; value = lex(), "]" != value; s || (s = true)) {
                      if (s) {
                        if ("," == value) {
                          value = lex();
                          if ("]" == value) {
                            log();
                          }
                        } else {
                          log();
                        }
                      }
                      if ("," == value) {
                        log();
                      }
                      results.push(get(value));
                    }
                    return results;
                  }
                  if ("{" == value) {
                    results = {};
                    for (; value = lex(), "}" != value; s || (s = true)) {
                      if (s) {
                        if ("," == value) {
                          value = lex();
                          if ("}" == value) {
                            log();
                          }
                        } else {
                          log();
                        }
                      }
                      if ("," == value || "string" != typeof value || "@" != (charIndexBuggy ? value.charAt(0) : value[0]) || ":" != lex()) {
                        log();
                      }
                      results[value.slice(1)] = get(lex());
                    }
                    return results;
                  }
                  log();
                }
                return value;
              };
              var update = function(e, x, i) {
                var value = walk(e, x, i);
                if (value === undef) {
                  delete e[x];
                } else {
                  e[x] = value;
                }
              };
              var walk = function(result, dir, data) {
                var length;
                var value = result[dir];
                if ("object" == typeof value && value) {
                  if (getClass.call(value) == id) {
                    length = value.length;
                    for (; length--;) {
                      update(value, length, data);
                    }
                  } else {
                    forEach(value, function(centerY) {
                      update(value, centerY, data);
                    });
                  }
                }
                return data.call(result, dir, value);
              };
              exports.parse = function(name, callback) {
                var result;
                var value;
                return index = 0, node = "" + name, result = get(lex()), "$" != lex() && log(), index = node = null, callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
              };
            }
          }
          return exports.runInContext = runInContext, exports;
        }
        var isLoader = "function" == typeof define && define.amd;
        var objectTypes = {
          function : true,
          object : true
        };
        var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
        var root = objectTypes[typeof window] && window || this;
        var self = freeExports && objectTypes[typeof module] && module && !module.nodeType && "object" == typeof val && val;
        if (!self || self.global !== self && self.window !== self && self.self !== self || (root = self), freeExports && !isLoader) {
          runInContext(root, freeExports);
        } else {
          var nativeJSON = root.JSON;
          var previousJSON = root.JSON3;
          var h = false;
          var JSON3 = runInContext(root, root.JSON3 = {
            noConflict : function() {
              return h || (h = true, root.JSON = nativeJSON, root.JSON3 = previousJSON, nativeJSON = previousJSON = null), JSON3;
            }
          });
          root.JSON = {
            parse : JSON3.parse,
            stringify : JSON3.stringify
          };
        }
        if (isLoader) {
          define(function() {
            return JSON3;
          });
        }
      }).call(this);
      (function() {
        var s = {};
        s.appendToHead = function(newChild) {
          s.getHead().appendChild(newChild);
        };
        s.getHead = function() {
          return document.head || document.getElementsByTagName("head")[0];
        };
        s.getBody = function() {
          return document.body || document.getElementsByTagName("body")[0];
        };
        createjs.DomUtils = s;
      })();
      (function() {
        var s = {};
        s.parseXML = function(text, type) {
          var xml = null;
          try {
            if (window.DOMParser) {
              var parser = new DOMParser;
              xml = parser.parseFromString(text, type);
            }
          } catch (i) {
          }
          if (!xml) {
            try {
              xml = new ActiveXObject("Microsoft.XMLDOM");
              xml.async = false;
              xml.loadXML(text);
            } catch (i) {
              xml = null;
            }
          }
          return xml;
        };
        s.parseJSON = function(label) {
          if (null == label) {
            return null;
          }
          try {
            return JSON.parse(label);
          } catch (t) {
            throw t;
          }
        };
        createjs.DataUtils = s;
      })();
      this.createjs = this.createjs || {};
      (function() {
        function init() {
          this.src = null;
          this.type = null;
          this.id = null;
          this.maintainOrder = false;
          this.callback = null;
          this.data = null;
          this.method = createjs.LoadItem.GET;
          this.values = null;
          this.headers = null;
          this.withCredentials = false;
          this.mimeType = null;
          this.crossOrigin = null;
          this.loadTimeout = Text.LOAD_TIMEOUT_DEFAULT;
        }
        var oldNotPinned = init.prototype = {};
        var Text = init;
        Text.LOAD_TIMEOUT_DEFAULT = 8e3;
        Text.create = function(node) {
          if ("string" == typeof node) {
            var refNode = new init;
            return refNode.src = node, refNode;
          }
          if (node instanceof Text) {
            return node;
          }
          if (node instanceof Object && node.src) {
            return null == node.loadTimeout && (node.loadTimeout = Text.LOAD_TIMEOUT_DEFAULT), node;
          }
          throw new Error("Type not recognized.");
        };
        oldNotPinned.set = function(e) {
          var p;
          for (p in e) {
            this[p] = e[p];
          }
          return this;
        };
        createjs.LoadItem = Text;
      })();
      (function() {
        var s = {};
        s.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i;
        s.RELATIVE_PATT = /^[.\/]*?\//i;
        s.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i;
        s.parseURI = function(path) {
          var info = {
            absolute : false,
            relative : false
          };
          if (null == path) {
            return info;
          }
          var lind = path.indexOf("?");
          if (lind > -1) {
            path = path.substr(0, lind);
          }
          var nameTmpArr;
          return s.ABSOLUTE_PATT.test(path) ? info.absolute = true : s.RELATIVE_PATT.test(path) && (info.relative = true), (nameTmpArr = path.match(s.EXTENSION_PATT)) && (info.extension = nameTmpArr[1].toLowerCase()), info;
        };
        s.formatQueryString = function(data, key) {
          if (null == data) {
            throw new Error("You must specify data.");
          }
          var str = [];
          var k;
          for (k in data) {
            str.push(k + "=" + escape(data[k]));
          }
          return key && (str = str.concat(key)), str.join("&");
        };
        s.buildPath = function(src, data) {
          if (null == data) {
            return src;
          }
          var query = [];
          var i = src.indexOf("?");
          if (-1 != i) {
            var componentsStr = src.slice(i + 1);
            query = query.concat(componentsStr.split("&"));
          }
          return -1 != i ? src.slice(0, i) + "?" + this._formatQueryString(data, query) : src + "?" + this._formatQueryString(data, query);
        };
        s.isCrossDomain = function(item) {
          var target = document.createElement("a");
          target.href = item.src;
          var host = document.createElement("a");
          host.href = location.href;
          var result = "" != target.hostname && (target.port != host.port || target.protocol != host.protocol || target.hostname != host.hostname);
          return result;
        };
        s.isLocal = function(event) {
          var s = document.createElement("a");
          return s.href = event.src, "" == s.hostname && "file:" == s.protocol;
        };
        s.isBinary = function(data) {
          switch(data) {
            case createjs.AbstractLoader.IMAGE:
            case createjs.AbstractLoader.BINARY:
              return true;
            default:
              return false;
          }
        };
        s.isImageTag = function(src) {
          return src instanceof HTMLImageElement;
        };
        s.isAudioTag = function(src) {
          return window.HTMLAudioElement ? src instanceof HTMLAudioElement : false;
        };
        s.isVideoTag = function(elem) {
          return window.HTMLVideoElement ? elem instanceof HTMLVideoElement : false;
        };
        s.isText = function(value) {
          switch(value) {
            case createjs.AbstractLoader.TEXT:
            case createjs.AbstractLoader.JSON:
            case createjs.AbstractLoader.MANIFEST:
            case createjs.AbstractLoader.XML:
            case createjs.AbstractLoader.CSS:
            case createjs.AbstractLoader.SVG:
            case createjs.AbstractLoader.JAVASCRIPT:
            case createjs.AbstractLoader.SPRITESHEET:
              return true;
            default:
              return false;
          }
        };
        s.getTypeByExtension = function(extension) {
          if (null == extension) {
            return createjs.AbstractLoader.TEXT;
          }
          switch(extension.toLowerCase()) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
            case "webp":
            case "bmp":
              return createjs.AbstractLoader.IMAGE;
            case "ogg":
            case "mp3":
            case "webm":
              return createjs.AbstractLoader.SOUND;
            case "mp4":
            case "webm":
            case "ts":
              return createjs.AbstractLoader.VIDEO;
            case "json":
              return createjs.AbstractLoader.JSON;
            case "xml":
              return createjs.AbstractLoader.XML;
            case "css":
              return createjs.AbstractLoader.CSS;
            case "js":
              return createjs.AbstractLoader.JAVASCRIPT;
            case "svg":
              return createjs.AbstractLoader.SVG;
            default:
              return createjs.AbstractLoader.TEXT;
          }
        };
        createjs.RequestUtils = s;
      })();
      this.createjs = this.createjs || {};
      (function() {
        function AbstractLoader(type, sections, tag) {
          this.EventDispatcher_constructor();
          this.loaded = false;
          this.canceled = false;
          this.progress = 0;
          this.type = tag;
          this.resultFormatter = null;
          this._item = type ? createjs.LoadItem.create(type) : null;
          this._preferXHR = sections;
          this._result = null;
          this._rawResult = null;
          this._loadedItems = null;
          this._tagSrcAttribute = null;
          this._tag = null;
        }
        var p = createjs.extend(AbstractLoader, createjs.EventDispatcher);
        var s = AbstractLoader;
        s.POST = "POST";
        s.GET = "GET";
        s.BINARY = "binary";
        s.CSS = "css";
        s.IMAGE = "image";
        s.JAVASCRIPT = "javascript";
        s.JSON = "json";
        s.JSONP = "jsonp";
        s.MANIFEST = "manifest";
        s.SOUND = "sound";
        s.VIDEO = "video";
        s.SPRITESHEET = "spritesheet";
        s.SVG = "svg";
        s.TEXT = "text";
        s.XML = "xml";
        p.getItem = function() {
          return this._item;
        };
        p.getResult = function(raw) {
          return raw ? this._rawResult : this._result;
        };
        p.getTag = function() {
          return this._tag;
        };
        p.setTag = function(tag) {
          this._tag = tag;
        };
        p.load = function() {
          this._createRequest();
          this._request.on("complete", this, this);
          this._request.on("progress", this, this);
          this._request.on("loadStart", this, this);
          this._request.on("abort", this, this);
          this._request.on("timeout", this, this);
          this._request.on("error", this, this);
          var evt = new createjs.Event("initialize");
          evt.loader = this._request;
          this.dispatchEvent(evt);
          this._request.load();
        };
        p.cancel = function() {
          this.canceled = true;
          this.destroy();
        };
        p.destroy = function() {
          if (this._request) {
            this._request.removeAllEventListeners();
            this._request.destroy();
          }
          this._request = null;
          this._item = null;
          this._rawResult = null;
          this._result = null;
          this._loadItems = null;
          this.removeAllEventListeners();
        };
        p.getLoadedItems = function() {
          return this._loadedItems;
        };
        p._createRequest = function() {
          this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
        };
        p._createTag = function() {
          return null;
        };
        p._sendLoadStart = function() {
          if (!this._isCanceled()) {
            this.dispatchEvent("loadstart");
          }
        };
        p._sendProgress = function(value) {
          if (!this._isCanceled()) {
            var event = null;
            if ("number" == typeof value) {
              this.progress = value;
              event = new createjs.ProgressEvent(this.progress);
            } else {
              event = value;
              this.progress = value.loaded / value.total;
              event.progress = this.progress;
              if (isNaN(this.progress) || 1 / 0 == this.progress) {
                this.progress = 0;
              }
            }
            if (this.hasEventListener("progress")) {
              this.dispatchEvent(event);
            }
          }
        };
        p._sendComplete = function() {
          if (!this._isCanceled()) {
            this.loaded = true;
            var event = new createjs.Event("complete");
            event.rawResult = this._rawResult;
            if (null != this._result) {
              event.result = this._result;
            }
            this.dispatchEvent(event);
          }
        };
        p._sendError = function(event) {
          if (!this._isCanceled() && this.hasEventListener("error")) {
            if (null == event) {
              event = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY");
            }
            this.dispatchEvent(event);
          }
        };
        p._isCanceled = function() {
          return null == window.createjs || this.canceled ? true : false;
        };
        p.resultFormatter = null;
        p.handleEvent = function(event) {
          switch(event.type) {
            case "complete":
              this._rawResult = event.target._response;
              var result = this.resultFormatter && this.resultFormatter(this);
              var _this = this;
              if (result instanceof Function) {
                result(function(result) {
                  _this._result = result;
                  _this._sendComplete();
                });
              } else {
                this._result = result || this._rawResult;
                this._sendComplete();
              }
              break;
            case "progress":
              this._sendProgress(event);
              break;
            case "error":
              this._sendError(event);
              break;
            case "loadstart":
              this._sendLoadStart();
              break;
            case "abort":
            case "timeout":
              if (!this._isCanceled()) {
                this.dispatchEvent(event.type);
              }
          }
        };
        p.buildPath = function(route, params) {
          return createjs.RequestUtils.buildPath(route, params);
        };
        p.toString = function() {
          return "[PreloadJS AbstractLoader]";
        };
        createjs.AbstractLoader = createjs.promote(AbstractLoader, "EventDispatcher");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem, preferXHR, type) {
          this.AbstractLoader_constructor(loadItem, preferXHR, type);
          this.resultFormatter = this._formatResult;
          this._tagSrcAttribute = "src";
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        p.load = function() {
          if (!this._tag) {
            this._tag = this._createTag(this._item.src);
          }
          this._tag.preload = "auto";
          this._tag.load();
          this.AbstractLoader_load();
        };
        p._createTag = function() {
        };
        p._createRequest = function() {
          this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
        };
        p._formatResult = function(item) {
          return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (item.getTag().src = item.getResult(true)), item.getTag();
        };
        createjs.AbstractMediaLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        var DisplayObject = function(viewer) {
          this._item = viewer;
        };
        var p = createjs.extend(DisplayObject, createjs.EventDispatcher);
        p.load = function() {
        };
        p.destroy = function() {
        };
        p.cancel = function() {
        };
        createjs.AbstractRequest = createjs.promote(DisplayObject, "EventDispatcher");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function TagRequest(loadItem, tag, srcAttribute) {
          this.AbstractRequest_constructor(loadItem);
          this._tag = tag;
          this._tagSrcAttribute = srcAttribute;
          this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
          this._addedToDOM = false;
          this._startTagVisibility = null;
        }
        var p = createjs.extend(TagRequest, createjs.AbstractRequest);
        p.load = function() {
          this._tag.onload = createjs.proxy(this._handleTagComplete, this);
          this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
          this._tag.onerror = createjs.proxy(this._handleError, this);
          var evt = new createjs.Event("initialize");
          evt.loader = this._tag;
          this.dispatchEvent(evt);
          this._hideTag();
          this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
          this._tag[this._tagSrcAttribute] = this._item.src;
          if (null == this._tag.parentNode) {
            window.document.body.appendChild(this._tag);
            this._addedToDOM = true;
          }
        };
        p.destroy = function() {
          this._clean();
          this._tag = null;
          this.AbstractRequest_destroy();
        };
        p._handleReadyStateChange = function() {
          clearTimeout(this._loadTimeout);
          var tag = this._tag;
          if ("loaded" == tag.readyState || "complete" == tag.readyState) {
            this._handleTagComplete();
          }
        };
        p._handleError = function() {
          this._clean();
          this.dispatchEvent("error");
        };
        p._handleTagComplete = function() {
          this._rawResult = this._tag;
          this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;
          this._clean();
          this._showTag();
          this.dispatchEvent("complete");
        };
        p._handleTimeout = function() {
          this._clean();
          this.dispatchEvent(new createjs.Event("timeout"));
        };
        p._clean = function() {
          this._tag.onload = null;
          this._tag.onreadystatechange = null;
          this._tag.onerror = null;
          if (this._addedToDOM && null != this._tag.parentNode) {
            this._tag.parentNode.removeChild(this._tag);
          }
          clearTimeout(this._loadTimeout);
        };
        p._hideTag = function() {
          this._startTagVisibility = this._tag.style.visibility;
          this._tag.style.visibility = "hidden";
        };
        p._showTag = function() {
          this._tag.style.visibility = this._startTagVisibility;
        };
        p._handleStalled = function() {
        };
        createjs.TagRequest = createjs.promote(TagRequest, "AbstractRequest");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function MediaTagRequest(loadItem, tag, srcAttribute) {
          this.AbstractRequest_constructor(loadItem);
          this._tag = tag;
          this._tagSrcAttribute = srcAttribute;
          this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
        }
        var p = createjs.extend(MediaTagRequest, createjs.TagRequest);
        p.load = function() {
          var sc = createjs.proxy(this._handleStalled, this);
          this._stalledCallback = sc;
          var pc = createjs.proxy(this._handleProgress, this);
          this._handleProgress = pc;
          this._tag.addEventListener("stalled", sc);
          this._tag.addEventListener("progress", pc);
          if (this._tag.addEventListener) {
            this._tag.addEventListener("canplaythrough", this._loadedHandler, false);
          }
          this.TagRequest_load();
        };
        p._handleReadyStateChange = function() {
          clearTimeout(this._loadTimeout);
          var tag = this._tag;
          if ("loaded" == tag.readyState || "complete" == tag.readyState) {
            this._handleTagComplete();
          }
        };
        p._handleStalled = function() {
        };
        p._handleProgress = function(event) {
          if (event && !(event.loaded > 0 && 0 == event.total)) {
            var changeEvent = new createjs.ProgressEvent(event.loaded, event.total);
            this.dispatchEvent(changeEvent);
          }
        };
        p._clean = function() {
          if (this._tag.removeEventListener) {
            this._tag.removeEventListener("canplaythrough", this._loadedHandler);
          }
          this._tag.removeEventListener("stalled", this._stalledCallback);
          this._tag.removeEventListener("progress", this._progressCallback);
          this.TagRequest__clean();
        };
        createjs.MediaTagRequest = createjs.promote(MediaTagRequest, "TagRequest");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function XHRRequest(item) {
          this.AbstractRequest_constructor(item);
          this._request = null;
          this._loadTimeout = null;
          this._xhrLevel = 1;
          this._response = null;
          this._rawResponse = null;
          this._canceled = false;
          this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this);
          this._handleProgressProxy = createjs.proxy(this._handleProgress, this);
          this._handleAbortProxy = createjs.proxy(this._handleAbort, this);
          this._handleErrorProxy = createjs.proxy(this._handleError, this);
          this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this);
          this._handleLoadProxy = createjs.proxy(this._handleLoad, this);
          this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this);
          !this._createXHR(item);
        }
        var p = createjs.extend(XHRRequest, createjs.AbstractRequest);
        XHRRequest.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
        p.getResult = function(raw) {
          return raw && this._rawResponse ? this._rawResponse : this._response;
        };
        p.cancel = function() {
          this.canceled = true;
          this._clean();
          this._request.abort();
        };
        p.load = function() {
          if (null == this._request) {
            return void this._handleError();
          }
          if (null != this._request.addEventListener) {
            this._request.addEventListener("loadstart", this._handleLoadStartProxy, false);
            this._request.addEventListener("progress", this._handleProgressProxy, false);
            this._request.addEventListener("abort", this._handleAbortProxy, false);
            this._request.addEventListener("error", this._handleErrorProxy, false);
            this._request.addEventListener("timeout", this._handleTimeoutProxy, false);
            this._request.addEventListener("load", this._handleLoadProxy, false);
            this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, false);
          } else {
            this._request.onloadstart = this._handleLoadStartProxy;
            this._request.onprogress = this._handleProgressProxy;
            this._request.onabort = this._handleAbortProxy;
            this._request.onerror = this._handleErrorProxy;
            this._request.ontimeout = this._handleTimeoutProxy;
            this._request.onload = this._handleLoadProxy;
            this._request.onreadystatechange = this._handleReadyStateChangeProxy;
          }
          if (1 == this._xhrLevel) {
            this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
          }
          try {
            if (this._item.values && this._item.method != createjs.AbstractLoader.GET) {
              if (this._item.method == createjs.AbstractLoader.POST) {
                this._request.send(createjs.RequestUtils.formatQueryString(this._item.values));
              }
            } else {
              this._request.send();
            }
          } catch (event) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, event));
          }
        };
        p.setResponseType = function(type) {
          if ("blob" === type) {
            type = window.URL ? "blob" : "arraybuffer";
            this._responseType = type;
          }
          this._request.responseType = type;
        };
        p.getAllResponseHeaders = function() {
          return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null;
        };
        p.getResponseHeader = function(name) {
          return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(name) : null;
        };
        p._handleProgress = function(event) {
          if (event && !(event.loaded > 0 && 0 == event.total)) {
            var changeEvent = new createjs.ProgressEvent(event.loaded, event.total);
            this.dispatchEvent(changeEvent);
          }
        };
        p._handleLoadStart = function() {
          clearTimeout(this._loadTimeout);
          this.dispatchEvent("loadstart");
        };
        p._handleAbort = function(event) {
          this._clean();
          this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, event));
        };
        p._handleError = function(event) {
          this._clean();
          this.dispatchEvent(new createjs.ErrorEvent(event.message));
        };
        p._handleReadyStateChange = function() {
          if (4 == this._request.readyState) {
            this._handleLoad();
          }
        };
        p._handleLoad = function() {
          if (!this.loaded) {
            this.loaded = true;
            var error = this._checkError();
            if (error) {
              return void this._handleError(error);
            }
            if (this._response = this._getResponse(), "arraybuffer" === this._responseType) {
              try {
                this._response = new Blob([this._response]);
              } catch (e) {
                if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === e.name && window.BlobBuilder) {
                  var builder = new BlobBuilder;
                  builder.append(this._response);
                  this._response = builder.getBlob();
                }
              }
            }
            this._clean();
            this.dispatchEvent(new createjs.Event("complete"));
          }
        };
        p._handleTimeout = function(event) {
          this._clean();
          this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, event));
        };
        p._checkError = function() {
          var e = parseInt(this._request.status);
          switch(e) {
            case 404:
            case 0:
              return new Error(e);
          }
          return null;
        };
        p._getResponse = function() {
          if (null != this._response) {
            return this._response;
          }
          if (null != this._request.response) {
            return this._request.response;
          }
          try {
            if (null != this._request.responseText) {
              return this._request.responseText;
            }
          } catch (e) {
          }
          try {
            if (null != this._request.responseXML) {
              return this._request.responseXML;
            }
          } catch (e) {
          }
          return null;
        };
        p._createXHR = function(item) {
          var crossdomain = createjs.RequestUtils.isCrossDomain(item);
          var headers = {};
          var req = null;
          if (window.XMLHttpRequest) {
            req = new XMLHttpRequest;
            if (crossdomain && void 0 === req.withCredentials && window.XDomainRequest) {
              req = new XDomainRequest;
            }
          } else {
            var i = 0;
            var countRep = s.ACTIVEX_VERSIONS.length;
            for (; countRep > i; i++) {
              var axVersion = s.ACTIVEX_VERSIONS[i];
              try {
                req = new ActiveXObject(axVersion);
                break;
              } catch (c) {
              }
            }
            if (null == req) {
              return false;
            }
          }
          if (null == item.mimeType && createjs.RequestUtils.isText(item.type)) {
            item.mimeType = "text/plain; charset=utf-8";
          }
          if (item.mimeType && req.overrideMimeType) {
            req.overrideMimeType(item.mimeType);
          }
          this._xhrLevel = "string" == typeof req.responseType ? 2 : 1;
          var GAIA_COMMIT = null;
          if (GAIA_COMMIT = item.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(item.src, item.values) : item.src, req.open(item.method || createjs.AbstractLoader.GET, GAIA_COMMIT, true), crossdomain && req instanceof XMLHttpRequest && 1 == this._xhrLevel && (headers.Origin = location.origin), item.values && item.method == createjs.AbstractLoader.POST && (headers["Content-Type"] = "application/x-www-form-urlencoded"), crossdomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = 
          "XMLHttpRequest"), item.headers) {
            var i;
            for (i in item.headers) {
              headers[i] = item.headers[i];
            }
          }
          for (i in headers) {
            req.setRequestHeader(i, headers[i]);
          }
          return req instanceof XMLHttpRequest && void 0 !== item.withCredentials && (req.withCredentials = item.withCredentials), this._request = req, true;
        };
        p._clean = function() {
          clearTimeout(this._loadTimeout);
          if (null != this._request.removeEventListener) {
            this._request.removeEventListener("loadstart", this._handleLoadStartProxy);
            this._request.removeEventListener("progress", this._handleProgressProxy);
            this._request.removeEventListener("abort", this._handleAbortProxy);
            this._request.removeEventListener("error", this._handleErrorProxy);
            this._request.removeEventListener("timeout", this._handleTimeoutProxy);
            this._request.removeEventListener("load", this._handleLoadProxy);
            this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy);
          } else {
            this._request.onloadstart = null;
            this._request.onprogress = null;
            this._request.onabort = null;
            this._request.onerror = null;
            this._request.ontimeout = null;
            this._request.onload = null;
            this._request.onreadystatechange = null;
          }
        };
        p.toString = function() {
          return "[PreloadJS XHRRequest]";
        };
        createjs.XHRRequest = createjs.promote(XHRRequest, "AbstractRequest");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function LoadQueue(useXHR, basePath, crossOrigin) {
          this.AbstractLoader_constructor();
          this._plugins = [];
          this._typeCallbacks = {};
          this._extensionCallbacks = {};
          this.next = null;
          this.maintainScriptOrder = true;
          this.stopOnError = false;
          this._maxConnections = 1;
          this._availableLoaders = [createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader];
          this._defaultLoaderLength = this._availableLoaders.length;
          this.init(useXHR, basePath, crossOrigin);
        }
        var p = createjs.extend(LoadQueue, createjs.AbstractLoader);
        var s = LoadQueue;
        p.init = function(value, basePath, crossOrigin) {
          this.useXHR = true;
          this.preferXHR = true;
          this._preferXHR = true;
          this.setPreferXHR(value);
          this._paused = false;
          this._basePath = basePath;
          this._crossOrigin = crossOrigin;
          this._loadStartWasDispatched = false;
          this._currentlyLoadingScript = null;
          this._currentLoads = [];
          this._loadQueue = [];
          this._loadQueueBackup = [];
          this._loadItemsById = {};
          this._loadItemsBySrc = {};
          this._loadedResults = {};
          this._loadedRawResults = {};
          this._numItems = 0;
          this._numItemsLoaded = 0;
          this._scriptOrder = [];
          this._loadedScripts = [];
          this._lastProgress = 0 / 0;
        };
        s.loadTimeout = 8e3;
        s.LOAD_TIMEOUT = 0;
        s.BINARY = createjs.AbstractLoader.BINARY;
        s.CSS = createjs.AbstractLoader.CSS;
        s.IMAGE = createjs.AbstractLoader.IMAGE;
        s.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT;
        s.JSON = createjs.AbstractLoader.JSON;
        s.JSONP = createjs.AbstractLoader.JSONP;
        s.MANIFEST = createjs.AbstractLoader.MANIFEST;
        s.SOUND = createjs.AbstractLoader.SOUND;
        s.VIDEO = createjs.AbstractLoader.VIDEO;
        s.SVG = createjs.AbstractLoader.SVG;
        s.TEXT = createjs.AbstractLoader.TEXT;
        s.XML = createjs.AbstractLoader.XML;
        s.POST = createjs.AbstractLoader.POST;
        s.GET = createjs.AbstractLoader.GET;
        p.registerLoader = function(s) {
          if (!s || !s.canLoadItem) {
            throw new Error("loader is of an incorrect type.");
          }
          if (-1 != this._availableLoaders.indexOf(s)) {
            throw new Error("loader already exists.");
          }
          this._availableLoaders.unshift(s);
        };
        p.unregisterLoader = function(loader) {
          var idx = this._availableLoaders.indexOf(loader);
          if (-1 != idx && idx < this._defaultLoaderLength - 1) {
            this._availableLoaders.splice(idx, 1);
          }
        };
        p.setUseXHR = function(value) {
          return this.setPreferXHR(value);
        };
        p.setPreferXHR = function(value) {
          return this.preferXHR = 0 != value && null != window.XMLHttpRequest, this.preferXHR;
        };
        p.removeAll = function() {
          this.remove();
        };
        p.remove = function(data) {
          var results = null;
          if (!data || data instanceof Array) {
            if (data) {
              results = data;
            } else {
              if (arguments.length > 0) {
                return;
              }
            }
          } else {
            results = [data];
          }
          var s = false;
          if (results) {
            for (; results.length;) {
              var key = results.pop();
              var conditional = this.getResult(key);
              i = this._loadQueue.length - 1;
              for (; i >= 0; i--) {
                if (tmpObj = this._loadQueue[i].getItem(), tmpObj.id == key || tmpObj.src == key) {
                  this._loadQueue.splice(i, 1)[0].cancel();
                  break;
                }
              }
              i = this._loadQueueBackup.length - 1;
              for (; i >= 0; i--) {
                if (tmpObj = this._loadQueueBackup[i].getItem(), tmpObj.id == key || tmpObj.src == key) {
                  this._loadQueueBackup.splice(i, 1)[0].cancel();
                  break;
                }
              }
              if (conditional) {
                this._disposeItem(this.getItem(key));
              } else {
                var i = this._currentLoads.length - 1;
                for (; i >= 0; i--) {
                  var tmpObj = this._currentLoads[i].getItem();
                  if (tmpObj.id == key || tmpObj.src == key) {
                    this._currentLoads.splice(i, 1)[0].cancel();
                    s = true;
                    break;
                  }
                }
              }
            }
            if (s) {
              this._loadNext();
            }
          } else {
            this.close();
            var n;
            for (n in this._loadItemsById) {
              this._disposeItem(this._loadItemsById[n]);
            }
            this.init(this.preferXHR, this._basePath);
          }
        };
        p.reset = function() {
          this.close();
          var n;
          for (n in this._loadItemsById) {
            this._disposeItem(this._loadItemsById[n]);
          }
          var a = [];
          var i = 0;
          var l = this._loadQueueBackup.length;
          for (; l > i; i++) {
            a.push(this._loadQueueBackup[i].getItem());
          }
          this.loadManifest(a, false);
        };
        p.installPlugin = function(plugin) {
          if (null != plugin && null != plugin.getPreloadHandlers) {
            this._plugins.push(plugin);
            var map = plugin.getPreloadHandlers();
            if (map.scope = plugin, null != map.types) {
              var i = 0;
              var countRep = map.types.length;
              for (; countRep > i; i++) {
                this._typeCallbacks[map.types[i]] = map;
              }
            }
            if (null != map.extensions) {
              i = 0;
              countRep = map.extensions.length;
              for (; countRep > i; i++) {
                this._extensionCallbacks[map.extensions[i]] = map;
              }
            }
          }
        };
        p.setMaxConnections = function(value) {
          this._maxConnections = value;
          if (!this._paused && this._loadQueue.length > 0) {
            this._loadNext();
          }
        };
        p.loadFile = function(type, filePath, basePath) {
          if (null == type) {
            var event = new createjs.ErrorEvent("PRELOAD_NO_FILE");
            return void this._sendError(event);
          }
          this._addItem(type, null, basePath);
          this.setPaused(filePath !== false ? false : true);
        };
        p.loadManifest = function(manifest, loadNow, basePath) {
          var fileList = null;
          var path = null;
          if (manifest instanceof Array) {
            if (0 == manifest.length) {
              var event = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
              return void this._sendError(event);
            }
            fileList = manifest;
          } else {
            if ("string" == typeof manifest) {
              fileList = [{
                src : manifest,
                type : s.MANIFEST
              }];
            } else {
              if ("object" != typeof manifest) {
                event = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                return void this._sendError(event);
              }
              if (void 0 !== manifest.src) {
                if (null == manifest.type) {
                  manifest.type = s.MANIFEST;
                } else {
                  if (manifest.type != s.MANIFEST) {
                    event = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                    this._sendError(event);
                  }
                }
                fileList = [manifest];
              } else {
                if (void 0 !== manifest.manifest) {
                  fileList = manifest.manifest;
                  path = manifest.path;
                }
              }
            }
          }
          var i = 0;
          var l = fileList.length;
          for (; l > i; i++) {
            this._addItem(fileList[i], path, basePath);
          }
          this.setPaused(loadNow !== false ? false : true);
        };
        p.load = function() {
          this.setPaused(false);
        };
        p.getItem = function(value) {
          return this._loadItemsById[value] || this._loadItemsBySrc[value];
        };
        p.getResult = function(value, rawResult) {
          var worksheetModel = this._loadItemsById[value] || this._loadItemsBySrc[value];
          if (null == worksheetModel) {
            return null;
          }
          var id = worksheetModel.id;
          return rawResult && this._loadedRawResults[id] ? this._loadedRawResults[id] : this._loadedResults[id];
        };
        p.getItems = function(onlyElements) {
          var arr = [];
          var value;
          for (value in this._loadItemsById) {
            var item = this._loadItemsById[value];
            var result = this.getResult(value);
            if (onlyElements !== true || null != result) {
              arr.push({
                item : item,
                result : result,
                rawResult : this.getResult(value, true)
              });
            }
          }
          return arr;
        };
        p.setPaused = function(paused) {
          this._paused = paused;
          if (!this._paused) {
            this._loadNext();
          }
        };
        p.close = function() {
          for (; this._currentLoads.length;) {
            this._currentLoads.pop().cancel();
          }
          this._scriptOrder.length = 0;
          this._loadedScripts.length = 0;
          this.loadStartWasDispatched = false;
          this._itemCount = 0;
          this._lastProgress = 0 / 0;
        };
        p._addItem = function(value, path, basePath) {
          var item = this._createLoadItem(value, path, basePath);
          if (null != item) {
            var loader = this._createLoader(item);
            if (null != loader) {
              if ("plugins" in loader) {
                loader.plugins = this._plugins;
              }
              item._loader = loader;
              this._loadQueue.push(loader);
              this._loadQueueBackup.push(loader);
              this._numItems++;
              this._updateProgress();
              if (this.maintainScriptOrder && item.type == createjs.LoadQueue.JAVASCRIPT || item.maintainOrder === true) {
                this._scriptOrder.push(item);
                this._loadedScripts.push(null);
              }
            }
          }
        };
        p._createLoadItem = function(value, path, basePath) {
          var item = createjs.LoadItem.create(value);
          if (null == item) {
            return null;
          }
          var bp = "";
          var useBasePath = basePath || this._basePath;
          if (item.src instanceof Object) {
            if (!item.type) {
              return null;
            }
            if (path) {
              bp = path;
              var pathMatch = createjs.RequestUtils.parseURI(path);
              if (!(null == useBasePath || pathMatch.absolute || pathMatch.relative)) {
                bp = useBasePath + bp;
              }
            } else {
              if (null != useBasePath) {
                bp = useBasePath;
              }
            }
          } else {
            var match = createjs.RequestUtils.parseURI(item.src);
            if (match.extension) {
              item.ext = match.extension;
            }
            if (null == item.type) {
              item.type = createjs.RequestUtils.getTypeByExtension(item.ext);
            }
            var autoId = item.src;
            if (!match.absolute && !match.relative) {
              if (path) {
                bp = path;
                pathMatch = createjs.RequestUtils.parseURI(path);
                autoId = path + autoId;
                if (!(null == useBasePath || pathMatch.absolute || pathMatch.relative)) {
                  bp = useBasePath + bp;
                }
              } else {
                if (null != useBasePath) {
                  bp = useBasePath;
                }
              }
            }
            item.src = bp + item.src;
          }
          item.path = bp;
          if (void 0 === item.id || null === item.id || "" === item.id) {
            item.id = autoId;
          }
          var workItem = this._typeCallbacks[item.type] || this._extensionCallbacks[item.ext];
          if (workItem) {
            var result = workItem.callback.call(workItem.scope, item, this);
            if (result === false) {
              return null;
            }
            if (!(result === true)) {
              if (null != result) {
                item._loader = result;
              }
            }
            match = createjs.RequestUtils.parseURI(item.src);
            if (null != match.extension) {
              item.ext = match.extension;
            }
          }
          return this._loadItemsById[item.id] = item, this._loadItemsBySrc[item.src] = item, null == item.crossOrigin && (item.crossOrigin = this._crossOrigin), item;
        };
        p._createLoader = function(item) {
          if (null != item._loader) {
            return item._loader;
          }
          var preferXHR = this.preferXHR;
          var i = 0;
          for (; i < this._availableLoaders.length; i++) {
            var loader = this._availableLoaders[i];
            if (loader && loader.canLoadItem(item)) {
              return new loader(item, preferXHR);
            }
          }
          return null;
        };
        p._loadNext = function() {
          if (!this._paused) {
            if (!this._loadStartWasDispatched) {
              this._sendLoadStart();
              this._loadStartWasDispatched = true;
            }
            if (this._numItems == this._numItemsLoaded) {
              this.loaded = true;
              this._sendComplete();
              if (this.next && this.next.load) {
                this.next.load();
              }
            } else {
              this.loaded = false;
            }
            var i = 0;
            for (; i < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); i++) {
              var loader = this._loadQueue[i];
              if (this._canStartLoad(loader)) {
                this._loadQueue.splice(i, 1);
                i--;
                this._loadItem(loader);
              }
            }
          }
        };
        p._loadItem = function(loader) {
          loader.on("fileload", this._handleFileLoad, this);
          loader.on("progress", this._handleProgress, this);
          loader.on("complete", this._handleFileComplete, this);
          loader.on("error", this._handleError, this);
          loader.on("fileerror", this._handleFileError, this);
          this._currentLoads.push(loader);
          this._sendFileStart(loader.getItem());
          loader.load();
        };
        p._handleFileLoad = function(event) {
          event.target = null;
          this.dispatchEvent(event);
        };
        p._handleFileError = function(event) {
          var newEvent = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, event.item);
          this._sendError(newEvent);
        };
        p._handleError = function(event) {
          var loader = event.target;
          this._numItemsLoaded++;
          this._finishOrderedItem(loader, true);
          this._updateProgress();
          var newEvent = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, loader.getItem());
          this._sendError(newEvent);
          if (this.stopOnError) {
            this.setPaused(true);
          } else {
            this._removeLoadItem(loader);
            this._cleanLoadItem(loader);
            this._loadNext();
          }
        };
        p._handleFileComplete = function(event) {
          var loader = event.target;
          var item = loader.getItem();
          var DEFAULT_HOST = loader.getResult();
          this._loadedResults[item.id] = DEFAULT_HOST;
          var host = loader.getResult(true);
          if (null != host && host !== DEFAULT_HOST) {
            this._loadedRawResults[item.id] = host;
          }
          this._saveLoadedItems(loader);
          this._removeLoadItem(loader);
          if (!this._finishOrderedItem(loader)) {
            this._processFinishedLoad(item, loader);
          }
          this._cleanLoadItem(loader);
        };
        p._saveLoadedItems = function(loader) {
          var list = loader.getLoadedItems();
          if (null !== list) {
            var i = 0;
            for (; i < list.length; i++) {
              var item = list[i].item;
              this._loadItemsBySrc[item.src] = item;
              this._loadItemsById[item.id] = item;
              this._loadedResults[item.id] = list[i].result;
              this._loadedRawResults[item.id] = list[i].rawResult;
            }
          }
        };
        p._finishOrderedItem = function(loader, loadFailed) {
          var item = loader.getItem();
          if (this.maintainScriptOrder && item.type == createjs.LoadQueue.JAVASCRIPT || item.maintainOrder) {
            if (loader instanceof createjs.JavaScriptLoader) {
              this._currentlyLoadingScript = false;
            }
            var index = createjs.indexOf(this._scriptOrder, item);
            return -1 == index ? false : (this._loadedScripts[index] = loadFailed === true ? true : item, this._checkScriptLoadOrder(), true);
          }
          return false;
        };
        p._checkScriptLoadOrder = function() {
          var l = this._loadedScripts.length;
          var i = 0;
          for (; l > i; i++) {
            var item = this._loadedScripts[i];
            if (null === item) {
              break;
            }
            if (item !== true) {
              var loadItem = this._loadedResults[item.id];
              if (item.type == createjs.LoadQueue.JAVASCRIPT) {
                createjs.DomUtils.appendToHead(loadItem);
              }
              var loader = item._loader;
              this._processFinishedLoad(item, loader);
              this._loadedScripts[i] = true;
            }
          }
        };
        p._processFinishedLoad = function(item, loader) {
          this._numItemsLoaded++;
          if (!(this.maintainScriptOrder || item.type != createjs.LoadQueue.JAVASCRIPT)) {
            createjs.DomUtils.appendToHead(item.result);
          }
          this._updateProgress();
          this._sendFileComplete(item, loader);
          this._loadNext();
        };
        p._canStartLoad = function(loader) {
          if (!this.maintainScriptOrder || loader.preferXHR) {
            return true;
          }
          var item = loader.getItem();
          if (item.type != createjs.LoadQueue.JAVASCRIPT) {
            return true;
          }
          if (this._currentlyLoadingScript) {
            return false;
          }
          var idx = this._scriptOrder.indexOf(item);
          var index = 0;
          for (; idx > index;) {
            var order = this._loadedScripts[index];
            if (null == order) {
              return false;
            }
            index++;
          }
          return this._currentlyLoadingScript = true, true;
        };
        p._removeLoadItem = function(loader) {
          var l = this._currentLoads.length;
          var i = 0;
          for (; l > i; i++) {
            if (this._currentLoads[i] == loader) {
              this._currentLoads.splice(i, 1);
              break;
            }
          }
        };
        p._cleanLoadItem = function(loader) {
          var handler = loader.getItem();
          if (handler) {
            delete handler._loader;
          }
        };
        p._handleProgress = function(event) {
          var loader = event.target;
          this._sendFileProgress(loader.getItem(), loader.progress);
          this._updateProgress();
        };
        p._updateProgress = function() {
          var loaded = this._numItemsLoaded / this._numItems;
          var remaining = this._numItems - this._numItemsLoaded;
          if (remaining > 0) {
            var chunk = 0;
            var i = 0;
            var l = this._currentLoads.length;
            for (; l > i; i++) {
              chunk = chunk + this._currentLoads[i].progress;
            }
            loaded = loaded + chunk / remaining * (remaining / this._numItems);
          }
          if (this._lastProgress != loaded) {
            this._sendProgress(loaded);
            this._lastProgress = loaded;
          }
        };
        p._disposeItem = function(item) {
          delete this._loadedResults[item.id];
          delete this._loadedRawResults[item.id];
          delete this._loadItemsById[item.id];
          delete this._loadItemsBySrc[item.src];
        };
        p._sendFileProgress = function(item, progress) {
          if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
            var event = new createjs.Event("fileprogress");
            event.progress = progress;
            event.loaded = progress;
            event.total = 1;
            event.item = item;
            this.dispatchEvent(event);
          }
        };
        p._sendFileComplete = function(item, loader) {
          if (!this._isCanceled() && !this._paused) {
            var event = new createjs.Event("fileload");
            event.loader = loader;
            event.item = item;
            event.result = this._loadedResults[item.id];
            event.rawResult = this._loadedRawResults[item.id];
            if (item.completeHandler) {
              item.completeHandler(event);
            }
            if (this.hasEventListener("fileload")) {
              this.dispatchEvent(event);
            }
          }
        };
        p._sendFileStart = function(item) {
          var event = new createjs.Event("filestart");
          event.item = item;
          if (this.hasEventListener("filestart")) {
            this.dispatchEvent(event);
          }
        };
        p.toString = function() {
          return "[PreloadJS LoadQueue]";
        };
        createjs.LoadQueue = createjs.promote(LoadQueue, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function Loader(loadItem) {
          this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.TEXT);
        }
        var s = (createjs.extend(Loader, createjs.AbstractLoader), Loader);
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.TEXT;
        };
        createjs.TextLoader = createjs.promote(Loader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem) {
          this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.BINARY);
          this.on("initialize", this._updateXHR, this);
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        var s = ImageLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.BINARY;
        };
        p._updateXHR = function(event) {
          event.loader.setResponseType("arraybuffer");
        };
        createjs.BinaryLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function CSSLoader(loadItem, isImage) {
          this.AbstractLoader_constructor(loadItem, isImage, createjs.AbstractLoader.CSS);
          this.resultFormatter = this._formatResult;
          this._tagSrcAttribute = "href";
          this._tag = document.createElement(isImage ? "style" : "link");
          this._tag.rel = "stylesheet";
          this._tag.type = "text/css";
        }
        var p = createjs.extend(CSSLoader, createjs.AbstractLoader);
        var s = CSSLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.CSS;
        };
        p._formatResult = function(item) {
          if (this._preferXHR) {
            var tag = item.getTag();
            if (tag.styleSheet) {
              tag.styleSheet.cssText = item.getResult(true);
            } else {
              var s = document.createTextNode(item.getResult(true));
              tag.appendChild(s);
            }
          } else {
            tag = this._tag;
          }
          return createjs.DomUtils.appendToHead(tag), tag;
        };
        createjs.CSSLoader = createjs.promote(CSSLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem, preferXHR) {
          this.AbstractLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.IMAGE);
          this.resultFormatter = this._formatResult;
          this._tagSrcAttribute = "src";
          if (createjs.RequestUtils.isImageTag(loadItem)) {
            this._tag = loadItem;
          } else {
            if (createjs.RequestUtils.isImageTag(loadItem.src)) {
              this._tag = loadItem.src;
            } else {
              if (createjs.RequestUtils.isImageTag(loadItem.tag)) {
                this._tag = loadItem.tag;
              }
            }
          }
          if (null != this._tag) {
            this._preferXHR = false;
          } else {
            this._tag = document.createElement("img");
          }
          this.on("initialize", this._updateXHR, this);
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        var s = ImageLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.IMAGE;
        };
        p.load = function() {
          if ("" != this._tag.src && this._tag.complete) {
            return void this._sendComplete();
          }
          var crossOrigin = this._item.crossOrigin;
          if (1 == crossOrigin) {
            crossOrigin = "Anonymous";
          }
          if (!(null == crossOrigin || createjs.RequestUtils.isLocal(this._item.src))) {
            this._tag.crossOrigin = crossOrigin;
          }
          this.AbstractLoader_load();
        };
        p._updateXHR = function(event) {
          event.loader.mimeType = "text/plain; charset=x-user-defined-binary";
          if (event.loader.setResponseType) {
            event.loader.setResponseType("blob");
          }
        };
        p._formatResult = function(loader) {
          var obj = this;
          return function(warningcallback) {
            var options = obj._tag;
            var URL = window.URL || window.webkitURL;
            if (obj._preferXHR) {
              if (URL) {
                var iv = URL.createObjectURL(loader.getResult(true));
                options.src = iv;
                options.onload = function() {
                  URL.revokeObjectURL(obj.src);
                };
              } else {
                options.src = loader.getItem().src;
              }
            }
            if (options.complete) {
              warningcallback(options);
            } else {
              options.onload = function() {
                warningcallback(this);
              };
            }
          };
        };
        createjs.ImageLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem, preferXHR) {
          this.AbstractLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.JAVASCRIPT);
          this.resultFormatter = this._formatResult;
          this._tagSrcAttribute = "src";
          this.setTag(document.createElement("script"));
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        var s = ImageLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.JAVASCRIPT;
        };
        p._formatResult = function(item) {
          var mElmOrSub = item.getTag();
          return this._preferXHR && (mElmOrSub.text = item.getResult(true)), mElmOrSub;
        };
        createjs.JavaScriptLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem) {
          this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.JSON);
          this.resultFormatter = this._formatResult;
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        var s = ImageLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.JSON && !item._loadAsJSONP;
        };
        p._formatResult = function(item) {
          var extractedObj = null;
          try {
            extractedObj = createjs.DataUtils.parseJSON(item.getResult(true));
          } catch (e) {
            var event = new createjs.ErrorEvent("JSON_FORMAT", null, e);
            return this._sendError(event), e;
          }
          return extractedObj;
        };
        createjs.JSONLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function Loader(loadItem) {
          this.AbstractLoader_constructor(loadItem, false, createjs.AbstractLoader.JSONP);
          this.setTag(document.createElement("script"));
          this.getTag().type = "text/javascript";
        }
        var p = createjs.extend(Loader, createjs.AbstractLoader);
        var s = Loader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.JSONP || item._loadAsJSONP;
        };
        p.cancel = function() {
          this.AbstractLoader_cancel();
          this._dispose();
        };
        p.load = function() {
          if (null == this._item.callback) {
            throw new Error("callback is required for loading JSONP requests.");
          }
          if (null != window[this._item.callback]) {
            throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
          }
          window[this._item.callback] = createjs.proxy(this._handleLoad, this);
          window.document.body.appendChild(this._tag);
          this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
          this._tag.src = this._item.src;
        };
        p._handleLoad = function(data) {
          this._result = this._rawResult = data;
          this._sendComplete();
          this._dispose();
        };
        p._handleTimeout = function() {
          this._dispose();
          this.dispatchEvent(new createjs.ErrorEvent("timeout"));
        };
        p._dispose = function() {
          window.document.body.removeChild(this._tag);
          delete window[this._item.callback];
          clearTimeout(this._loadTimeout);
        };
        createjs.JSONPLoader = createjs.promote(Loader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function Loader(loadItem) {
          this.AbstractLoader_constructor(loadItem, null, createjs.AbstractLoader.MANIFEST);
          this.plugins = null;
          this._manifestQueue = null;
        }
        var p = createjs.extend(Loader, createjs.AbstractLoader);
        var s = Loader;
        s.MANIFEST_PROGRESS = 0.25;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.MANIFEST;
        };
        p.load = function() {
          this.AbstractLoader_load();
        };
        p._createRequest = function() {
          var callback = this._item.callback;
          this._request = null != callback ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item);
        };
        p.handleEvent = function(event) {
          switch(event.type) {
            case "complete":
              return this._rawResult = event.target.getResult(true), this._result = event.target.getResult(), this._sendProgress(s.MANIFEST_PROGRESS), void this._loadManifest(this._result);
            case "progress":
              return event.loaded *= s.MANIFEST_PROGRESS, this.progress = event.loaded / event.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(event);
          }
          this.AbstractLoader_handleEvent(event);
        };
        p.destroy = function() {
          this.AbstractLoader_destroy();
          this._manifestQueue.close();
        };
        p._loadManifest = function(json) {
          if (json && json.manifest) {
            var queue = this._manifestQueue = new createjs.LoadQueue;
            queue.on("fileload", this._handleManifestFileLoad, this);
            queue.on("progress", this._handleManifestProgress, this);
            queue.on("complete", this._handleManifestComplete, this, true);
            queue.on("error", this._handleManifestError, this, true);
            var i = 0;
            var l = this.plugins.length;
            for (; l > i; i++) {
              queue.installPlugin(this.plugins[i]);
            }
            queue.loadManifest(json);
          } else {
            this._sendComplete();
          }
        };
        p._handleManifestFileLoad = function(event) {
          event.target = null;
          this.dispatchEvent(event);
        };
        p._handleManifestComplete = function() {
          this._loadedItems = this._manifestQueue.getItems(true);
          this._sendComplete();
        };
        p._handleManifestProgress = function(event) {
          this.progress = event.progress * (1 - s.MANIFEST_PROGRESS) + s.MANIFEST_PROGRESS;
          this._sendProgress(this.progress);
        };
        p._handleManifestError = function(event) {
          var e = new createjs.Event("fileerror");
          e.item = event.data;
          this.dispatchEvent(e);
        };
        createjs.ManifestLoader = createjs.promote(Loader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function SoundLoader(loadItem, preferXHR) {
          this.AbstractMediaLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.SOUND);
          if (createjs.RequestUtils.isAudioTag(loadItem)) {
            this._tag = loadItem;
          } else {
            if (createjs.RequestUtils.isAudioTag(loadItem.src)) {
              this._tag = loadItem;
            } else {
              if (createjs.RequestUtils.isAudioTag(loadItem.tag)) {
                this._tag = createjs.RequestUtils.isAudioTag(loadItem) ? loadItem : loadItem.src;
              }
            }
          }
          if (null != this._tag) {
            this._preferXHR = false;
          }
        }
        var p = createjs.extend(SoundLoader, createjs.AbstractMediaLoader);
        var s = SoundLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.SOUND;
        };
        p._createTag = function(value) {
          var obj = document.createElement("audio");
          return obj.autoplay = false, obj.preload = "none", obj.src = value, obj;
        };
        createjs.SoundLoader = createjs.promote(SoundLoader, "AbstractMediaLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function SoundLoader(loadItem, preferXHR) {
          this.AbstractMediaLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.VIDEO);
          if (createjs.RequestUtils.isVideoTag(loadItem) || createjs.RequestUtils.isVideoTag(loadItem.src)) {
            this.setTag(createjs.RequestUtils.isVideoTag(loadItem) ? loadItem : loadItem.src);
            this._preferXHR = false;
          } else {
            this.setTag(this._createTag());
          }
        }
        var p = createjs.extend(SoundLoader, createjs.AbstractMediaLoader);
        var s = SoundLoader;
        p._createTag = function() {
          return document.createElement("video");
        };
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.VIDEO;
        };
        createjs.VideoLoader = createjs.promote(SoundLoader, "AbstractMediaLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function Loader(loadItem) {
          this.AbstractLoader_constructor(loadItem, null, createjs.AbstractLoader.SPRITESHEET);
          this._manifestQueue = null;
        }
        var p = createjs.extend(Loader, createjs.AbstractLoader);
        var s = Loader;
        s.SPRITESHEET_PROGRESS = 0.25;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.SPRITESHEET;
        };
        p.destroy = function() {
          this.AbstractLoader_destroy;
          this._manifestQueue.close();
        };
        p._createRequest = function() {
          var callback = this._item.callback;
          this._request = null != callback && callback instanceof Function ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item);
        };
        p.handleEvent = function(event) {
          switch(event.type) {
            case "complete":
              return this._rawResult = event.target.getResult(true), this._result = event.target.getResult(), this._sendProgress(s.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
            case "progress":
              return event.loaded *= s.SPRITESHEET_PROGRESS, this.progress = event.loaded / event.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(event);
          }
          this.AbstractLoader_handleEvent(event);
        };
        p._loadManifest = function(json) {
          if (json && json.images) {
            var queue = this._manifestQueue = new createjs.LoadQueue;
            queue.on("complete", this._handleManifestComplete, this, true);
            queue.on("fileload", this._handleManifestFileLoad, this);
            queue.on("progress", this._handleManifestProgress, this);
            queue.on("error", this._handleManifestError, this, true);
            queue.loadManifest(json.images);
          }
        };
        p._handleManifestFileLoad = function(event) {
          var image = event.result;
          if (null != image) {
            var images = this.getResult().images;
            var i = images.indexOf(event.item.src);
            images[i] = image;
          }
        };
        p._handleManifestComplete = function() {
          this._result = new createjs.SpriteSheet(this._result);
          this._loadedItems = this._manifestQueue.getItems(true);
          this._sendComplete();
        };
        p._handleManifestProgress = function(event) {
          this.progress = event.progress * (1 - s.SPRITESHEET_PROGRESS) + s.SPRITESHEET_PROGRESS;
          this._sendProgress(this.progress);
        };
        p._handleManifestError = function(event) {
          var e = new createjs.Event("fileerror");
          e.item = event.data;
          this.dispatchEvent(e);
        };
        createjs.SpriteSheetLoader = createjs.promote(Loader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function SVGLoader(loadItem, preferXHR) {
          this.AbstractLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.SVG);
          this.resultFormatter = this._formatResult;
          this._tagSrcAttribute = "data";
          if (preferXHR) {
            this.setTag(document.createElement("svg"));
          } else {
            this.setTag(document.createElement("object"));
            this.getTag().type = "image/svg+xml";
          }
        }
        var p = createjs.extend(SVGLoader, createjs.AbstractLoader);
        var s = SVGLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.SVG;
        };
        p._formatResult = function(item) {
          var xml = createjs.DataUtils.parseXML(item.getResult(true), "text/xml");
          var tag = item.getTag();
          return !this._preferXHR && document.body.contains(tag) && document.body.removeChild(tag), null != xml.documentElement ? (tag.appendChild(xml.documentElement), tag.style.visibility = "visible", tag) : xml;
        };
        createjs.SVGLoader = createjs.promote(SVGLoader, "AbstractLoader");
      })();
      this.createjs = this.createjs || {};
      (function() {
        function ImageLoader(loadItem) {
          this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.XML);
          this.resultFormatter = this._formatResult;
        }
        var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
        var s = ImageLoader;
        s.canLoadItem = function(item) {
          return item.type == createjs.AbstractLoader.XML;
        };
        p._formatResult = function(item) {
          return createjs.DataUtils.parseXML(item.getResult(true), "text/xml");
        };
        createjs.XMLLoader = createjs.promote(ImageLoader, "AbstractLoader");
      })();
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}],
  4 : [function() {
    this.createjs = this.createjs || {};
    (function() {
      var s = createjs.SoundJS = createjs.SoundJS || {};
      s.version = "NEXT";
      s.buildDate = "Fri, 29 May 2015 18:14:19 GMT";
    })();
    this.createjs = this.createjs || {};
    createjs.extend = function(obj, from) {
      function f() {
        this.constructor = obj;
      }
      return f.prototype = from.prototype, obj.prototype = new f;
    };
    this.createjs = this.createjs || {};
    createjs.promote = function(obj, prefix) {
      var subP = obj.prototype;
      var supP = Object.getPrototypeOf && Object.getPrototypeOf(subP) || subP.__proto__;
      if (supP) {
        subP[(prefix = prefix + "_") + "constructor"] = supP.constructor;
        var n;
        for (n in supP) {
          if (subP.hasOwnProperty(n) && "function" == typeof supP[n]) {
            subP[prefix + n] = supP[n];
          }
        }
      }
      return obj;
    };
    this.createjs = this.createjs || {};
    createjs.indexOf = function(array, value) {
      var i = 0;
      var length = array.length;
      for (; length > i; i++) {
        if (value === array[i]) {
          return i;
        }
      }
      return -1;
    };
    this.createjs = this.createjs || {};
    (function() {
      createjs.proxy = function(t, value) {
        var s = Array.prototype.slice.call(arguments, 2);
        return function() {
          return t.apply(value, Array.prototype.slice.call(arguments, 0).concat(s));
        };
      };
    })();
    this.createjs = this.createjs || {};
    (function() {
      function BrowserDetect() {
        throw "BrowserDetect cannot be instantiated";
      }
      var agent = BrowserDetect.agent = window.navigator.userAgent;
      BrowserDetect.isWindowPhone = agent.indexOf("IEMobile") > -1 || agent.indexOf("Windows Phone") > -1;
      BrowserDetect.isFirefox = agent.indexOf("Firefox") > -1;
      BrowserDetect.isOpera = null != window.opera;
      BrowserDetect.isChrome = agent.indexOf("Chrome") > -1;
      BrowserDetect.isIOS = (agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) && !BrowserDetect.isWindowPhone;
      BrowserDetect.isAndroid = agent.indexOf("Android") > -1 && !BrowserDetect.isWindowPhone;
      BrowserDetect.isBlackberry = agent.indexOf("Blackberry") > -1;
      createjs.BrowserDetect = BrowserDetect;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function EventDispatcher() {
        this._listeners = null;
        this._captureListeners = null;
      }
      var p = EventDispatcher.prototype;
      EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.on = p.on;
        target.removeEventListener = target.off = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
        target._dispatchEvent = p._dispatchEvent;
        target.willTrigger = p.willTrigger;
      };
      p.addEventListener = function(type, obj, fn) {
        var data;
        data = fn ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var result = data[type];
        return result && this.removeEventListener(type, obj, fn), result = data[type], result ? result.push(obj) : data[type] = [obj], obj;
      };
      p.on = function(event, listener, scope, data, headers, callback) {
        return listener.handleEvent && (scope = scope || listener, listener = listener.handleEvent), scope = scope || this, this.addEventListener(event, function(event) {
          listener.call(scope, event, headers);
          if (data) {
            event.remove();
          }
        }, callback);
      };
      p.removeEventListener = function(type, callback, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (listeners) {
          var callbacks = listeners[type];
          if (callbacks) {
            var i = 0;
            var l = callbacks.length;
            for (; l > i; i++) {
              if (callbacks[i] == callback) {
                if (1 == l) {
                  delete listeners[type];
                } else {
                  callbacks.splice(i, 1);
                }
                break;
              }
            }
          }
        }
      };
      p.off = p.removeEventListener;
      p.removeAllEventListeners = function(type) {
        if (type) {
          if (this._listeners) {
            delete this._listeners[type];
          }
          if (this._captureListeners) {
            delete this._captureListeners[type];
          }
        } else {
          this._listeners = this._captureListeners = null;
        }
      };
      p.dispatchEvent = function(eventObj) {
        if ("string" == typeof eventObj) {
          var listeners = this._listeners;
          if (!listeners || !listeners[eventObj]) {
            return false;
          }
          eventObj = new createjs.Event(eventObj);
        } else {
          if (eventObj.target && eventObj.clone) {
            eventObj = eventObj.clone();
          }
        }
        try {
          eventObj.target = this;
        } catch (s) {
        }
        if (eventObj.bubbles && this.parent) {
          var t = this;
          var results = [t];
          for (; t.parent;) {
            results.push(t = t.parent);
          }
          var i;
          var l = results.length;
          i = l - 1;
          for (; i >= 0 && !eventObj.propagationStopped; i--) {
            results[i]._dispatchEvent(eventObj, 1 + (0 == i));
          }
          i = 1;
          for (; l > i && !eventObj.propagationStopped; i++) {
            results[i]._dispatchEvent(eventObj, 3);
          }
        } else {
          this._dispatchEvent(eventObj, 2);
        }
        return eventObj.defaultPrevented;
      };
      p.hasEventListener = function(type) {
        var listeners = this._listeners;
        var captureListeners = this._captureListeners;
        return !!(listeners && listeners[type] || captureListeners && captureListeners[type]);
      };
      p.willTrigger = function(type) {
        var s = this;
        for (; s;) {
          if (s.hasEventListener(type)) {
            return true;
          }
          s = s.parent;
        }
        return false;
      };
      p.toString = function() {
        return "[EventDispatcher]";
      };
      p._dispatchEvent = function(eventObj, eventPhase) {
        var i;
        var listeners = 1 == eventPhase ? this._captureListeners : this._listeners;
        if (eventObj && listeners) {
          var arr = listeners[eventObj.type];
          if (!arr || !(i = arr.length)) {
            return;
          }
          try {
            eventObj.currentTarget = this;
          } catch (a) {
          }
          try {
            eventObj.eventPhase = eventPhase;
          } catch (a) {
          }
          eventObj.removed = false;
          arr = arr.slice();
          var l = 0;
          for (; i > l && !eventObj.immediatePropagationStopped; l++) {
            var o = arr[l];
            if (o.handleEvent) {
              o.handleEvent(eventObj);
            } else {
              o(eventObj);
            }
            if (eventObj.removed) {
              this.off(eventObj.type, o, 1 == eventPhase);
              eventObj.removed = false;
            }
          }
        }
      };
      createjs.EventDispatcher = EventDispatcher;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function Event(type, info, colorCellCss) {
        this.type = type;
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.bubbles = !!info;
        this.cancelable = !!colorCellCss;
        this.timeStamp = (new Date).getTime();
        this.defaultPrevented = false;
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.removed = false;
      }
      var proto = Event.prototype;
      proto.preventDefault = function() {
        this.defaultPrevented = this.cancelable && true;
      };
      proto.stopPropagation = function() {
        this.propagationStopped = true;
      };
      proto.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = true;
      };
      proto.remove = function() {
        this.removed = true;
      };
      proto.clone = function() {
        return new Event(this.type, this.bubbles, this.cancelable);
      };
      proto.set = function(e) {
        var p;
        for (p in e) {
          this[p] = e[p];
        }
        return this;
      };
      proto.toString = function() {
        return "[Event (type=" + this.type + ")]";
      };
      createjs.Event = Event;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function ErrorEvent(title, message, data) {
        this.Event_constructor("error");
        this.title = title;
        this.message = message;
        this.data = data;
      }
      var p = createjs.extend(ErrorEvent, createjs.Event);
      p.clone = function() {
        return new createjs.ErrorEvent(this.title, this.message, this.data);
      };
      createjs.ErrorEvent = createjs.promote(ErrorEvent, "Event");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function ProgressEvent(loaded, total) {
        this.Event_constructor("progress");
        this.loaded = loaded;
        this.total = null == total ? 1 : total;
        this.progress = 0 == total ? 0 : this.loaded / this.total;
      }
      var p = createjs.extend(ProgressEvent, createjs.Event);
      p.clone = function() {
        return new createjs.ProgressEvent(this.loaded, this.total);
      };
      createjs.ProgressEvent = createjs.promote(ProgressEvent, "Event");
    })(window);
    this.createjs = this.createjs || {};
    (function() {
      function init() {
        this.src = null;
        this.type = null;
        this.id = null;
        this.maintainOrder = false;
        this.callback = null;
        this.data = null;
        this.method = createjs.LoadItem.GET;
        this.values = null;
        this.headers = null;
        this.withCredentials = false;
        this.mimeType = null;
        this.crossOrigin = null;
        this.loadTimeout = Text.LOAD_TIMEOUT_DEFAULT;
      }
      var oldNotPinned = init.prototype = {};
      var Text = init;
      Text.LOAD_TIMEOUT_DEFAULT = 8e3;
      Text.create = function(node) {
        if ("string" == typeof node) {
          var refNode = new init;
          return refNode.src = node, refNode;
        }
        if (node instanceof Text) {
          return node;
        }
        if (node instanceof Object && node.src) {
          return null == node.loadTimeout && (node.loadTimeout = Text.LOAD_TIMEOUT_DEFAULT), node;
        }
        throw new Error("Type not recognized.");
      };
      oldNotPinned.set = function(e) {
        var p;
        for (p in e) {
          this[p] = e[p];
        }
        return this;
      };
      createjs.LoadItem = Text;
    })();
    (function() {
      var s = {};
      s.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i;
      s.RELATIVE_PATT = /^[.\/]*?\//i;
      s.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i;
      s.parseURI = function(path) {
        var info = {
          absolute : false,
          relative : false
        };
        if (null == path) {
          return info;
        }
        var lind = path.indexOf("?");
        if (lind > -1) {
          path = path.substr(0, lind);
        }
        var nameTmpArr;
        return s.ABSOLUTE_PATT.test(path) ? info.absolute = true : s.RELATIVE_PATT.test(path) && (info.relative = true), (nameTmpArr = path.match(s.EXTENSION_PATT)) && (info.extension = nameTmpArr[1].toLowerCase()), info;
      };
      s.formatQueryString = function(data, key) {
        if (null == data) {
          throw new Error("You must specify data.");
        }
        var str = [];
        var k;
        for (k in data) {
          str.push(k + "=" + escape(data[k]));
        }
        return key && (str = str.concat(key)), str.join("&");
      };
      s.buildPath = function(src, data) {
        if (null == data) {
          return src;
        }
        var query = [];
        var i = src.indexOf("?");
        if (-1 != i) {
          var componentsStr = src.slice(i + 1);
          query = query.concat(componentsStr.split("&"));
        }
        return -1 != i ? src.slice(0, i) + "?" + this._formatQueryString(data, query) : src + "?" + this._formatQueryString(data, query);
      };
      s.isCrossDomain = function(item) {
        var target = document.createElement("a");
        target.href = item.src;
        var host = document.createElement("a");
        host.href = location.href;
        var result = "" != target.hostname && (target.port != host.port || target.protocol != host.protocol || target.hostname != host.hostname);
        return result;
      };
      s.isLocal = function(event) {
        var s = document.createElement("a");
        return s.href = event.src, "" == s.hostname && "file:" == s.protocol;
      };
      s.isBinary = function(data) {
        switch(data) {
          case createjs.AbstractLoader.IMAGE:
          case createjs.AbstractLoader.BINARY:
            return true;
          default:
            return false;
        }
      };
      s.isImageTag = function(src) {
        return src instanceof HTMLImageElement;
      };
      s.isAudioTag = function(src) {
        return window.HTMLAudioElement ? src instanceof HTMLAudioElement : false;
      };
      s.isVideoTag = function(elem) {
        return window.HTMLVideoElement ? elem instanceof HTMLVideoElement : false;
      };
      s.isText = function(value) {
        switch(value) {
          case createjs.AbstractLoader.TEXT:
          case createjs.AbstractLoader.JSON:
          case createjs.AbstractLoader.MANIFEST:
          case createjs.AbstractLoader.XML:
          case createjs.AbstractLoader.CSS:
          case createjs.AbstractLoader.SVG:
          case createjs.AbstractLoader.JAVASCRIPT:
          case createjs.AbstractLoader.SPRITESHEET:
            return true;
          default:
            return false;
        }
      };
      s.getTypeByExtension = function(extension) {
        if (null == extension) {
          return createjs.AbstractLoader.TEXT;
        }
        switch(extension.toLowerCase()) {
          case "jpeg":
          case "jpg":
          case "gif":
          case "png":
          case "webp":
          case "bmp":
            return createjs.AbstractLoader.IMAGE;
          case "ogg":
          case "mp3":
          case "webm":
            return createjs.AbstractLoader.SOUND;
          case "mp4":
          case "webm":
          case "ts":
            return createjs.AbstractLoader.VIDEO;
          case "json":
            return createjs.AbstractLoader.JSON;
          case "xml":
            return createjs.AbstractLoader.XML;
          case "css":
            return createjs.AbstractLoader.CSS;
          case "js":
            return createjs.AbstractLoader.JAVASCRIPT;
          case "svg":
            return createjs.AbstractLoader.SVG;
          default:
            return createjs.AbstractLoader.TEXT;
        }
      };
      createjs.RequestUtils = s;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function AbstractLoader(type, sections, tag) {
        this.EventDispatcher_constructor();
        this.loaded = false;
        this.canceled = false;
        this.progress = 0;
        this.type = tag;
        this.resultFormatter = null;
        this._item = type ? createjs.LoadItem.create(type) : null;
        this._preferXHR = sections;
        this._result = null;
        this._rawResult = null;
        this._loadedItems = null;
        this._tagSrcAttribute = null;
        this._tag = null;
      }
      var p = createjs.extend(AbstractLoader, createjs.EventDispatcher);
      var s = AbstractLoader;
      s.POST = "POST";
      s.GET = "GET";
      s.BINARY = "binary";
      s.CSS = "css";
      s.IMAGE = "image";
      s.JAVASCRIPT = "javascript";
      s.JSON = "json";
      s.JSONP = "jsonp";
      s.MANIFEST = "manifest";
      s.SOUND = "sound";
      s.VIDEO = "video";
      s.SPRITESHEET = "spritesheet";
      s.SVG = "svg";
      s.TEXT = "text";
      s.XML = "xml";
      p.getItem = function() {
        return this._item;
      };
      p.getResult = function(raw) {
        return raw ? this._rawResult : this._result;
      };
      p.getTag = function() {
        return this._tag;
      };
      p.setTag = function(tag) {
        this._tag = tag;
      };
      p.load = function() {
        this._createRequest();
        this._request.on("complete", this, this);
        this._request.on("progress", this, this);
        this._request.on("loadStart", this, this);
        this._request.on("abort", this, this);
        this._request.on("timeout", this, this);
        this._request.on("error", this, this);
        var evt = new createjs.Event("initialize");
        evt.loader = this._request;
        this.dispatchEvent(evt);
        this._request.load();
      };
      p.cancel = function() {
        this.canceled = true;
        this.destroy();
      };
      p.destroy = function() {
        if (this._request) {
          this._request.removeAllEventListeners();
          this._request.destroy();
        }
        this._request = null;
        this._item = null;
        this._rawResult = null;
        this._result = null;
        this._loadItems = null;
        this.removeAllEventListeners();
      };
      p.getLoadedItems = function() {
        return this._loadedItems;
      };
      p._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
      };
      p._createTag = function() {
        return null;
      };
      p._sendLoadStart = function() {
        if (!this._isCanceled()) {
          this.dispatchEvent("loadstart");
        }
      };
      p._sendProgress = function(value) {
        if (!this._isCanceled()) {
          var event = null;
          if ("number" == typeof value) {
            this.progress = value;
            event = new createjs.ProgressEvent(this.progress);
          } else {
            event = value;
            this.progress = value.loaded / value.total;
            event.progress = this.progress;
            if (isNaN(this.progress) || 1 / 0 == this.progress) {
              this.progress = 0;
            }
          }
          if (this.hasEventListener("progress")) {
            this.dispatchEvent(event);
          }
        }
      };
      p._sendComplete = function() {
        if (!this._isCanceled()) {
          this.loaded = true;
          var event = new createjs.Event("complete");
          event.rawResult = this._rawResult;
          if (null != this._result) {
            event.result = this._result;
          }
          this.dispatchEvent(event);
        }
      };
      p._sendError = function(event) {
        if (!this._isCanceled() && this.hasEventListener("error")) {
          if (null == event) {
            event = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY");
          }
          this.dispatchEvent(event);
        }
      };
      p._isCanceled = function() {
        return null == window.createjs || this.canceled ? true : false;
      };
      p.resultFormatter = null;
      p.handleEvent = function(event) {
        switch(event.type) {
          case "complete":
            this._rawResult = event.target._response;
            var result = this.resultFormatter && this.resultFormatter(this);
            var _this = this;
            if (result instanceof Function) {
              result(function(result) {
                _this._result = result;
                _this._sendComplete();
              });
            } else {
              this._result = result || this._rawResult;
              this._sendComplete();
            }
            break;
          case "progress":
            this._sendProgress(event);
            break;
          case "error":
            this._sendError(event);
            break;
          case "loadstart":
            this._sendLoadStart();
            break;
          case "abort":
          case "timeout":
            if (!this._isCanceled()) {
              this.dispatchEvent(event.type);
            }
        }
      };
      p.buildPath = function(route, params) {
        return createjs.RequestUtils.buildPath(route, params);
      };
      p.toString = function() {
        return "[PreloadJS AbstractLoader]";
      };
      createjs.AbstractLoader = createjs.promote(AbstractLoader, "EventDispatcher");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function ImageLoader(loadItem, preferXHR, type) {
        this.AbstractLoader_constructor(loadItem, preferXHR, type);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "src";
      }
      var p = createjs.extend(ImageLoader, createjs.AbstractLoader);
      p.load = function() {
        if (!this._tag) {
          this._tag = this._createTag(this._item.src);
        }
        this._tag.preload = "auto";
        this._tag.load();
        this.AbstractLoader_load();
      };
      p._createTag = function() {
      };
      p._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
      };
      p._formatResult = function(item) {
        return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (item.getTag().src = item.getResult(true)), item.getTag();
      };
      createjs.AbstractMediaLoader = createjs.promote(ImageLoader, "AbstractLoader");
    })();
    this.createjs = this.createjs || {};
    (function() {
      var DisplayObject = function(viewer) {
        this._item = viewer;
      };
      var p = createjs.extend(DisplayObject, createjs.EventDispatcher);
      p.load = function() {
      };
      p.destroy = function() {
      };
      p.cancel = function() {
      };
      createjs.AbstractRequest = createjs.promote(DisplayObject, "EventDispatcher");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function TagRequest(loadItem, tag, srcAttribute) {
        this.AbstractRequest_constructor(loadItem);
        this._tag = tag;
        this._tagSrcAttribute = srcAttribute;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
        this._addedToDOM = false;
        this._startTagVisibility = null;
      }
      var p = createjs.extend(TagRequest, createjs.AbstractRequest);
      p.load = function() {
        this._tag.onload = createjs.proxy(this._handleTagComplete, this);
        this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        this._tag.onerror = createjs.proxy(this._handleError, this);
        var evt = new createjs.Event("initialize");
        evt.loader = this._tag;
        this.dispatchEvent(evt);
        this._hideTag();
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
        this._tag[this._tagSrcAttribute] = this._item.src;
        if (null == this._tag.parentNode) {
          window.document.body.appendChild(this._tag);
          this._addedToDOM = true;
        }
      };
      p.destroy = function() {
        this._clean();
        this._tag = null;
        this.AbstractRequest_destroy();
      };
      p._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var tag = this._tag;
        if ("loaded" == tag.readyState || "complete" == tag.readyState) {
          this._handleTagComplete();
        }
      };
      p._handleError = function() {
        this._clean();
        this.dispatchEvent("error");
      };
      p._handleTagComplete = function() {
        this._rawResult = this._tag;
        this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;
        this._clean();
        this._showTag();
        this.dispatchEvent("complete");
      };
      p._handleTimeout = function() {
        this._clean();
        this.dispatchEvent(new createjs.Event("timeout"));
      };
      p._clean = function() {
        this._tag.onload = null;
        this._tag.onreadystatechange = null;
        this._tag.onerror = null;
        if (this._addedToDOM && null != this._tag.parentNode) {
          this._tag.parentNode.removeChild(this._tag);
        }
        clearTimeout(this._loadTimeout);
      };
      p._hideTag = function() {
        this._startTagVisibility = this._tag.style.visibility;
        this._tag.style.visibility = "hidden";
      };
      p._showTag = function() {
        this._tag.style.visibility = this._startTagVisibility;
      };
      p._handleStalled = function() {
      };
      createjs.TagRequest = createjs.promote(TagRequest, "AbstractRequest");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function MediaTagRequest(loadItem, tag, srcAttribute) {
        this.AbstractRequest_constructor(loadItem);
        this._tag = tag;
        this._tagSrcAttribute = srcAttribute;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
      }
      var p = createjs.extend(MediaTagRequest, createjs.TagRequest);
      p.load = function() {
        var sc = createjs.proxy(this._handleStalled, this);
        this._stalledCallback = sc;
        var pc = createjs.proxy(this._handleProgress, this);
        this._handleProgress = pc;
        this._tag.addEventListener("stalled", sc);
        this._tag.addEventListener("progress", pc);
        if (this._tag.addEventListener) {
          this._tag.addEventListener("canplaythrough", this._loadedHandler, false);
        }
        this.TagRequest_load();
      };
      p._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var tag = this._tag;
        if ("loaded" == tag.readyState || "complete" == tag.readyState) {
          this._handleTagComplete();
        }
      };
      p._handleStalled = function() {
      };
      p._handleProgress = function(event) {
        if (event && !(event.loaded > 0 && 0 == event.total)) {
          var changeEvent = new createjs.ProgressEvent(event.loaded, event.total);
          this.dispatchEvent(changeEvent);
        }
      };
      p._clean = function() {
        if (this._tag.removeEventListener) {
          this._tag.removeEventListener("canplaythrough", this._loadedHandler);
        }
        this._tag.removeEventListener("stalled", this._stalledCallback);
        this._tag.removeEventListener("progress", this._progressCallback);
        this.TagRequest__clean();
      };
      createjs.MediaTagRequest = createjs.promote(MediaTagRequest, "TagRequest");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function XHRRequest(item) {
        this.AbstractRequest_constructor(item);
        this._request = null;
        this._loadTimeout = null;
        this._xhrLevel = 1;
        this._response = null;
        this._rawResponse = null;
        this._canceled = false;
        this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this);
        this._handleProgressProxy = createjs.proxy(this._handleProgress, this);
        this._handleAbortProxy = createjs.proxy(this._handleAbort, this);
        this._handleErrorProxy = createjs.proxy(this._handleError, this);
        this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this);
        this._handleLoadProxy = createjs.proxy(this._handleLoad, this);
        this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this);
        !this._createXHR(item);
      }
      var p = createjs.extend(XHRRequest, createjs.AbstractRequest);
      XHRRequest.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
      p.getResult = function(raw) {
        return raw && this._rawResponse ? this._rawResponse : this._response;
      };
      p.cancel = function() {
        this.canceled = true;
        this._clean();
        this._request.abort();
      };
      p.load = function() {
        if (null == this._request) {
          return void this._handleError();
        }
        this._request.addEventListener("loadstart", this._handleLoadStartProxy, false);
        this._request.addEventListener("progress", this._handleProgressProxy, false);
        this._request.addEventListener("abort", this._handleAbortProxy, false);
        this._request.addEventListener("error", this._handleErrorProxy, false);
        this._request.addEventListener("timeout", this._handleTimeoutProxy, false);
        this._request.addEventListener("load", this._handleLoadProxy, false);
        this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, false);
        if (1 == this._xhrLevel) {
          this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
        }
        try {
          if (this._item.values && this._item.method != createjs.AbstractLoader.GET) {
            if (this._item.method == createjs.AbstractLoader.POST) {
              this._request.send(createjs.RequestUtils.formatQueryString(this._item.values));
            }
          } else {
            this._request.send();
          }
        } catch (event) {
          this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, event));
        }
      };
      p.setResponseType = function(type) {
        this._request.responseType = type;
      };
      p.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null;
      };
      p.getResponseHeader = function(name) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(name) : null;
      };
      p._handleProgress = function(event) {
        if (event && !(event.loaded > 0 && 0 == event.total)) {
          var changeEvent = new createjs.ProgressEvent(event.loaded, event.total);
          this.dispatchEvent(changeEvent);
        }
      };
      p._handleLoadStart = function() {
        clearTimeout(this._loadTimeout);
        this.dispatchEvent("loadstart");
      };
      p._handleAbort = function(event) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, event));
      };
      p._handleError = function(event) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent(event.message));
      };
      p._handleReadyStateChange = function() {
        if (4 == this._request.readyState) {
          this._handleLoad();
        }
      };
      p._handleLoad = function() {
        if (!this.loaded) {
          this.loaded = true;
          var error = this._checkError();
          if (error) {
            return void this._handleError(error);
          }
          this._response = this._getResponse();
          this._clean();
          this.dispatchEvent(new createjs.Event("complete"));
        }
      };
      p._handleTimeout = function(event) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, event));
      };
      p._checkError = function() {
        var e = parseInt(this._request.status);
        switch(e) {
          case 404:
          case 0:
            return new Error(e);
        }
        return null;
      };
      p._getResponse = function() {
        if (null != this._response) {
          return this._response;
        }
        if (null != this._request.response) {
          return this._request.response;
        }
        try {
          if (null != this._request.responseText) {
            return this._request.responseText;
          }
        } catch (e) {
        }
        try {
          if (null != this._request.responseXML) {
            return this._request.responseXML;
          }
        } catch (e) {
        }
        return null;
      };
      p._createXHR = function(item) {
        var crossdomain = createjs.RequestUtils.isCrossDomain(item);
        var headers = {};
        var req = null;
        if (window.XMLHttpRequest) {
          req = new XMLHttpRequest;
          if (crossdomain && void 0 === req.withCredentials && window.XDomainRequest) {
            req = new XDomainRequest;
          }
        } else {
          var i = 0;
          var countRep = s.ACTIVEX_VERSIONS.length;
          for (; countRep > i; i++) {
            s.ACTIVEX_VERSIONS[i];
            try {
              req = new ActiveXObject(axVersions);
              break;
            } catch (o) {
            }
          }
          if (null == req) {
            return false;
          }
        }
        if (null == item.mimeType && createjs.RequestUtils.isText(item.type)) {
          item.mimeType = "text/plain; charset=utf-8";
        }
        if (item.mimeType && req.overrideMimeType) {
          req.overrideMimeType(item.mimeType);
        }
        this._xhrLevel = "string" == typeof req.responseType ? 2 : 1;
        var e = null;
        if (e = item.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(item.src, item.values) : item.src, req.open(item.method || createjs.AbstractLoader.GET, e, true), crossdomain && req instanceof XMLHttpRequest && 1 == this._xhrLevel && (headers.Origin = location.origin), item.values && item.method == createjs.AbstractLoader.POST && (headers["Content-Type"] = "application/x-www-form-urlencoded"), crossdomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = 
        "XMLHttpRequest"), item.headers) {
          var i;
          for (i in item.headers) {
            headers[i] = item.headers[i];
          }
        }
        for (i in headers) {
          req.setRequestHeader(i, headers[i]);
        }
        return req instanceof XMLHttpRequest && void 0 !== item.withCredentials && (req.withCredentials = item.withCredentials), this._request = req, true;
      };
      p._clean = function() {
        clearTimeout(this._loadTimeout);
        this._request.removeEventListener("loadstart", this._handleLoadStartProxy);
        this._request.removeEventListener("progress", this._handleProgressProxy);
        this._request.removeEventListener("abort", this._handleAbortProxy);
        this._request.removeEventListener("error", this._handleErrorProxy);
        this._request.removeEventListener("timeout", this._handleTimeoutProxy);
        this._request.removeEventListener("load", this._handleLoadProxy);
        this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy);
      };
      p.toString = function() {
        return "[PreloadJS XHRRequest]";
      };
      createjs.XHRRequest = createjs.promote(XHRRequest, "AbstractRequest");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function SoundLoader(loadItem, preferXHR) {
        this.AbstractMediaLoader_constructor(loadItem, preferXHR, createjs.AbstractLoader.SOUND);
        if (createjs.RequestUtils.isAudioTag(loadItem)) {
          this._tag = loadItem;
        } else {
          if (createjs.RequestUtils.isAudioTag(loadItem.src)) {
            this._tag = loadItem;
          } else {
            if (createjs.RequestUtils.isAudioTag(loadItem.tag)) {
              this._tag = createjs.RequestUtils.isAudioTag(loadItem) ? loadItem : loadItem.src;
            }
          }
        }
        if (null != this._tag) {
          this._preferXHR = false;
        }
      }
      var p = createjs.extend(SoundLoader, createjs.AbstractMediaLoader);
      var s = SoundLoader;
      s.canLoadItem = function(item) {
        return item.type == createjs.AbstractLoader.SOUND;
      };
      p._createTag = function(value) {
        var obj = document.createElement("audio");
        return obj.autoplay = false, obj.preload = "none", obj.src = value, obj;
      };
      createjs.SoundLoader = createjs.promote(SoundLoader, "AbstractMediaLoader");
    })();
    this.createjs = this.createjs || {};
    (function() {
      var PlayPropsConfig = function() {
        this.interrupt = null;
        this.delay = null;
        this.offset = null;
        this.loop = null;
        this.volume = null;
        this.pan = null;
        this.startTime = null;
        this.duration = null;
      };
      var t = PlayPropsConfig.prototype = {};
      var s = PlayPropsConfig;
      s.create = function(value) {
        if (value instanceof s || value instanceof Object) {
          var result = new createjs.PlayPropsConfig;
          return result.set(value), result;
        }
        throw new Error("Type not recognized.");
      };
      t.set = function(e) {
        var p;
        for (p in e) {
          this[p] = e[p];
        }
        return this;
      };
      t.toString = function() {
        return "[PlayPropsConfig]";
      };
      createjs.PlayPropsConfig = s;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function Sound() {
        throw "Sound cannot be instantiated";
      }
      function SoundChannel(src, max) {
        this.init(src, max);
      }
      var s = Sound;
      s.INTERRUPT_ANY = "any";
      s.INTERRUPT_EARLY = "early";
      s.INTERRUPT_LATE = "late";
      s.INTERRUPT_NONE = "none";
      s.PLAY_INITED = "playInited";
      s.PLAY_SUCCEEDED = "playSucceeded";
      s.PLAY_INTERRUPTED = "playInterrupted";
      s.PLAY_FINISHED = "playFinished";
      s.PLAY_FAILED = "playFailed";
      s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];
      s.EXTENSION_MAP = {
        m4a : "mp4"
      };
      s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/;
      s.defaultInterruptBehavior = s.INTERRUPT_NONE;
      s.alternateExtensions = [];
      s.activePlugin = null;
      s._masterVolume = 1;
      Object.defineProperty(s, "volume", {
        get : function() {
          return this._masterVolume;
        },
        set : function(value) {
          if (null == Number(value)) {
            return false;
          }
          if (value = Math.max(0, Math.min(1, value)), s._masterVolume = value, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(value)) {
            var instances = this._instances;
            var i = 0;
            var length = instances.length;
            for (; length > i; i++) {
              instances[i].setMasterVolume(value);
            }
          }
        }
      });
      s._masterMute = false;
      Object.defineProperty(s, "muted", {
        get : function() {
          return this._masterMute;
        },
        set : function(value) {
          if (null == value) {
            return false;
          }
          if (this._masterMute = value, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(value)) {
            var instances = this._instances;
            var i = 0;
            var length = instances.length;
            for (; length > i; i++) {
              instances[i].setMasterMute(value);
            }
          }
          return true;
        }
      });
      Object.defineProperty(s, "capabilities", {
        get : function() {
          return null == s.activePlugin ? null : s.activePlugin._capabilities;
        },
        set : function() {
          return false;
        }
      });
      s._pluginsRegistered = false;
      s._lastID = 0;
      s._instances = [];
      s._idHash = {};
      s._preloadHash = {};
      s._defaultPlayPropsHash = {};
      s.addEventListener = null;
      s.removeEventListener = null;
      s.removeAllEventListeners = null;
      s.dispatchEvent = null;
      s.hasEventListener = null;
      s._listeners = null;
      createjs.EventDispatcher.initialize(s);
      s.getPreloadHandlers = function() {
        return {
          callback : createjs.proxy(s.initLoad, s),
          types : ["sound"],
          extensions : s.SUPPORTED_EXTENSIONS
        };
      };
      s._handleLoadComplete = function(event) {
        var src = event.target.getItem().src;
        if (s._preloadHash[src]) {
          var middle = 0;
          var y = s._preloadHash[src].length;
          for (; y > middle; middle++) {
            var item = s._preloadHash[src][middle];
            if (s._preloadHash[src][middle] = true, s.hasEventListener("fileload")) {
              event = new createjs.Event("fileload");
              event.src = item.src;
              event.id = item.id;
              event.data = item.data;
              event.sprite = item.sprite;
              s.dispatchEvent(event);
            }
          }
        }
      };
      s._handleLoadError = function(event) {
        var src = event.target.getItem().src;
        if (s._preloadHash[src]) {
          var middle = 0;
          var y = s._preloadHash[src].length;
          for (; y > middle; middle++) {
            var item = s._preloadHash[src][middle];
            if (s._preloadHash[src][middle] = false, s.hasEventListener("fileerror")) {
              event = new createjs.Event("fileerror");
              event.src = item.src;
              event.id = item.id;
              event.data = item.data;
              event.sprite = item.sprite;
              s.dispatchEvent(event);
            }
          }
        }
      };
      s._registerPlugin = function(plugin) {
        return plugin.isSupported() ? (s.activePlugin = new plugin, true) : false;
      };
      s.registerPlugins = function(plugins) {
        s._pluginsRegistered = true;
        var i = 0;
        var length = plugins.length;
        for (; length > i; i++) {
          if (s._registerPlugin(plugins[i])) {
            return true;
          }
        }
        return false;
      };
      s.initializeDefaultPlugins = function() {
        return null != s.activePlugin ? true : s._pluginsRegistered ? false : s.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? true : false;
      };
      s.isReady = function() {
        return null != s.activePlugin;
      };
      s.getCapabilities = function() {
        return null == s.activePlugin ? null : s.activePlugin._capabilities;
      };
      s.getCapability = function(key) {
        return null == s.activePlugin ? null : s.activePlugin._capabilities[key];
      };
      s.initLoad = function(loadItem) {
        return s._registerSound(loadItem);
      };
      s._registerSound = function(loadItem) {
        if (!s.initializeDefaultPlugins()) {
          return false;
        }
        var details;
        if (loadItem.src instanceof Object ? (details = s._parseSrc(loadItem.src), details.src = loadItem.path + details.src) : details = s._parsePath(loadItem.src), null == details) {
          return false;
        }
        loadItem.src = details.src;
        loadItem.type = "sound";
        var data = loadItem.data;
        var numChannels = null;
        if (null != data && (isNaN(data.channels) ? isNaN(data) || (numChannels = parseInt(data)) : numChannels = parseInt(data.channels), data.audioSprite)) {
          var sp;
          var i = data.audioSprite.length;
          for (; i--;) {
            sp = data.audioSprite[i];
            s._idHash[sp.id] = {
              src : loadItem.src,
              startTime : parseInt(sp.startTime),
              duration : parseInt(sp.duration)
            };
            if (sp.defaultPlayProps) {
              s._defaultPlayPropsHash[sp.id] = createjs.PlayPropsConfig.create(sp.defaultPlayProps);
            }
          }
        }
        if (null != loadItem.id) {
          s._idHash[loadItem.id] = {
            src : loadItem.src
          };
        }
        var loader = s.activePlugin.register(loadItem);
        return SoundChannel.create(loadItem.src, numChannels), null != data && isNaN(data) ? loadItem.data.channels = numChannels || SoundChannel.maxPerChannel() : loadItem.data = numChannels || SoundChannel.maxPerChannel(), loader.type && (loadItem.type = loader.type), loadItem.defaultPlayProps && (s._defaultPlayPropsHash[loadItem.src] = createjs.PlayPropsConfig.create(loadItem.defaultPlayProps)), loader;
      };
      s.registerSound = function(src, id, data, basePath, defaultPlayProps) {
        var loadItem = {
          src : src,
          id : id,
          data : data,
          defaultPlayProps : defaultPlayProps
        };
        if (src instanceof Object && src.src) {
          basePath = id;
          loadItem = src;
        }
        loadItem = createjs.LoadItem.create(loadItem);
        loadItem.path = basePath;
        if (!(null == basePath || loadItem.src instanceof Object)) {
          loadItem.src = basePath + src;
        }
        var loader = s._registerSound(loadItem);
        if (!loader) {
          return false;
        }
        if (s._preloadHash[loadItem.src] || (s._preloadHash[loadItem.src] = []), s._preloadHash[loadItem.src].push(loadItem), 1 == s._preloadHash[loadItem.src].length) {
          loader.on("complete", createjs.proxy(this._handleLoadComplete, this));
          loader.on("error", createjs.proxy(this._handleLoadError, this));
          s.activePlugin.preload(loader);
        } else {
          if (1 == s._preloadHash[loadItem.src][0]) {
            return true;
          }
        }
        return loadItem;
      };
      s.registerSounds = function(sounds, basePath) {
        var returnValues = [];
        if (sounds.path) {
          if (basePath) {
            basePath = basePath + sounds.path;
          } else {
            basePath = sounds.path;
          }
          sounds = sounds.manifest;
        }
        var i = 0;
        var l = sounds.length;
        for (; l > i; i++) {
          returnValues[i] = createjs.Sound.registerSound(sounds[i].src, sounds[i].id, sounds[i].data, basePath, sounds[i].defaultPlayProps);
        }
        return returnValues;
      };
      s.removeSound = function(src, basePath) {
        if (null == s.activePlugin) {
          return false;
        }
        if (src instanceof Object && src.src) {
          src = src.src;
        }
        var img;
        if (src instanceof Object ? img = s._parseSrc(src) : (src = s._getSrcById(src).src, img = s._parsePath(src)), null == img) {
          return false;
        }
        src = img.src;
        if (null != basePath) {
          src = basePath + src;
        }
        var prop;
        for (prop in s._idHash) {
          if (s._idHash[prop].src == src) {
            delete s._idHash[prop];
          }
        }
        return SoundChannel.removeSrc(src), delete s._preloadHash[src], s.activePlugin.removeSound(src), true;
      };
      s.removeSounds = function(sounds, basePath) {
        var returnValues = [];
        if (sounds.path) {
          if (basePath) {
            basePath = basePath + sounds.path;
          } else {
            basePath = sounds.path;
          }
          sounds = sounds.manifest;
        }
        var i = 0;
        var l = sounds.length;
        for (; l > i; i++) {
          returnValues[i] = createjs.Sound.removeSound(sounds[i].src, basePath);
        }
        return returnValues;
      };
      s.removeAllSounds = function() {
        s._idHash = {};
        s._preloadHash = {};
        SoundChannel.removeAll();
        if (s.activePlugin) {
          s.activePlugin.removeAllSounds();
        }
      };
      s.loadComplete = function(src) {
        if (!s.isReady()) {
          return false;
        }
        var value = s._parsePath(src);
        return src = value ? s._getSrcById(value.src).src : s._getSrcById(src).src, void 0 == s._preloadHash[src] ? false : 1 == s._preloadHash[src][0];
      };
      s._parsePath = function(path) {
        if ("string" != typeof path) {
          path = path.toString();
        }
        var metadata_property_names = path.match(s.FILE_PATTERN);
        if (null == metadata_property_names) {
          return false;
        }
        var metadata_property_name = metadata_property_names[4];
        var extension = metadata_property_names[5];
        var contents = s.capabilities;
        var i = 0;
        for (; !contents[extension];) {
          if (extension = s.alternateExtensions[i++], i > s.alternateExtensions.length) {
            return null;
          }
        }
        path = path.replace("." + metadata_property_names[5], "." + extension);
        var ret = {
          name : metadata_property_name,
          src : path,
          extension : extension
        };
        return ret;
      };
      s._parseSrc = function(source) {
        var options = {
          name : void 0,
          src : void 0,
          extension : void 0
        };
        var c = s.capabilities;
        var prop;
        for (prop in source) {
          if (source.hasOwnProperty(prop) && c[prop]) {
            options.src = source[prop];
            options.extension = prop;
            break;
          }
        }
        if (!options.src) {
          return false;
        }
        var single = options.src.lastIndexOf("/");
        return options.name = -1 != single ? options.src.slice(single + 1) : options.src, options;
      };
      s.play = function(src, interrupt, delay, time, loop, volume, pan, startTime, duration) {
        var playProps;
        playProps = createjs.PlayPropsConfig.create(interrupt instanceof Object || interrupt instanceof createjs.PlayPropsConfig ? interrupt : {
          interrupt : interrupt,
          delay : delay,
          offset : time,
          loop : loop,
          volume : volume,
          pan : pan,
          startTime : startTime,
          duration : duration
        });
        var instance = s.createInstance(src, playProps.startTime, playProps.duration);
        var ok = s._playInstance(instance, playProps);
        return ok || instance._playFailed(), instance;
      };
      s.createInstance = function(src, startTime, duration) {
        if (!s.initializeDefaultPlugins()) {
          return new createjs.DefaultSoundInstance(src, startTime, duration);
        }
        var data = s._defaultPlayPropsHash[src];
        src = s._getSrcById(src);
        var loadItem = s._parsePath(src.src);
        var instance = null;
        return null != loadItem && null != loadItem.src ? (SoundChannel.create(loadItem.src), null == startTime && (startTime = src.startTime), instance = s.activePlugin.create(loadItem.src, startTime, duration || src.duration), data = data || s._defaultPlayPropsHash[loadItem.src], data && instance.applyPlayProps(data)) : instance = new createjs.DefaultSoundInstance(src, startTime, duration), instance.uniqueId = s._lastID++, instance;
      };
      s.stop = function() {
        var instances = this._instances;
        var i = instances.length;
        for (; i--;) {
          instances[i].stop();
        }
      };
      s.setVolume = function(value) {
        if (null == Number(value)) {
          return false;
        }
        if (value = Math.max(0, Math.min(1, value)), s._masterVolume = value, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(value)) {
          var instances = this._instances;
          var i = 0;
          var length = instances.length;
          for (; length > i; i++) {
            instances[i].setMasterVolume(value);
          }
        }
      };
      s.getVolume = function() {
        return this._masterVolume;
      };
      s.setMute = function(value) {
        if (null == value) {
          return false;
        }
        if (this._masterMute = value, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(value)) {
          var instances = this._instances;
          var i = 0;
          var length = instances.length;
          for (; length > i; i++) {
            instances[i].setMasterMute(value);
          }
        }
        return true;
      };
      s.getMute = function() {
        return this._masterMute;
      };
      s.setDefaultPlayProps = function(src, filename) {
        src = s._getSrcById(src);
        s._defaultPlayPropsHash[s._parsePath(src.src).src] = createjs.PlayPropsConfig.create(filename);
      };
      s.getDefaultPlayProps = function(src) {
        return src = s._getSrcById(src), s._defaultPlayPropsHash[s._parsePath(src.src).src];
      };
      s._playInstance = function(instance, playProps) {
        var defaultPlayProps = s._defaultPlayPropsHash[instance.src] || {};
        if (null == playProps.interrupt && (playProps.interrupt = defaultPlayProps.interrupt || s.defaultInterruptBehavior), null == playProps.delay && (playProps.delay = defaultPlayProps.delay || 0), null == playProps.offset && (playProps.offset = instance.getPosition()), null == playProps.loop && (playProps.loop = instance.loop), null == playProps.volume && (playProps.volume = instance.volume), null == playProps.pan && (playProps.pan = instance.pan), 0 == playProps.delay) {
          var ok = s._beginPlaying(instance, playProps);
          if (!ok) {
            return false;
          }
        } else {
          var delayTimeoutId = setTimeout(function() {
            s._beginPlaying(instance, playProps);
          }, playProps.delay);
          instance.delayTimeoutId = delayTimeoutId;
        }
        return this._instances.push(instance), true;
      };
      s._beginPlaying = function(instance, playProps) {
        if (!SoundChannel.add(instance, playProps.interrupt)) {
          return false;
        }
        var result = instance._beginPlaying(playProps);
        if (!result) {
          var index = createjs.indexOf(this._instances, instance);
          return index > -1 && this._instances.splice(index, 1), false;
        }
        return true;
      };
      s._getSrcById = function(value) {
        return s._idHash[value] || {
          src : value
        };
      };
      s._playFinished = function(instance) {
        SoundChannel.remove(instance);
        var index = createjs.indexOf(this._instances, instance);
        if (index > -1) {
          this._instances.splice(index, 1);
        }
      };
      createjs.Sound = Sound;
      SoundChannel.channels = {};
      SoundChannel.create = function(src, max) {
        var srcAngle = SoundChannel.get(src);
        return null == srcAngle ? (SoundChannel.channels[src] = new SoundChannel(src, max), true) : false;
      };
      SoundChannel.removeSrc = function(src) {
        var channel = SoundChannel.get(src);
        return null == channel ? false : (channel._removeAll(), delete SoundChannel.channels[src], true);
      };
      SoundChannel.removeAll = function() {
        var channel;
        for (channel in SoundChannel.channels) {
          SoundChannel.channels[channel]._removeAll();
        }
        SoundChannel.channels = {};
      };
      SoundChannel.add = function(instance, interrupt) {
        var s = SoundChannel.get(instance.src);
        return null == s ? false : s._add(instance, interrupt);
      };
      SoundChannel.remove = function(instance) {
        var widgets = SoundChannel.get(instance.src);
        return null == widgets ? false : (widgets._remove(instance), true);
      };
      SoundChannel.maxPerChannel = function() {
        return p.maxDefault;
      };
      SoundChannel.get = function(src) {
        return SoundChannel.channels[src];
      };
      var p = SoundChannel.prototype;
      p.constructor = SoundChannel;
      p.src = null;
      p.max = null;
      p.maxDefault = 100;
      p.length = 0;
      p.init = function(value, max) {
        this.src = value;
        this.max = max || this.maxDefault;
        if (-1 == this.max) {
          this.max = this.maxDefault;
        }
        this._instances = [];
      };
      p._get = function(name) {
        return this._instances[name];
      };
      p._add = function(instance, interrupt) {
        return this._getSlot(interrupt, instance) ? (this._instances.push(instance), this.length++, true) : false;
      };
      p._remove = function(instance) {
        var index = createjs.indexOf(this._instances, instance);
        return -1 == index ? false : (this._instances.splice(index, 1), this.length--, true);
      };
      p._removeAll = function() {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this._instances[i].stop();
        }
      };
      p._getSlot = function(interrupt) {
        var target;
        var replacement;
        if (interrupt != Sound.INTERRUPT_NONE && (replacement = this._get(0), null == replacement)) {
          return true;
        }
        var value = 0;
        var i = this.max;
        for (; i > value; value++) {
          if (target = this._get(value), null == target) {
            return true;
          }
          if (target.playState == Sound.PLAY_FINISHED || target.playState == Sound.PLAY_INTERRUPTED || target.playState == Sound.PLAY_FAILED) {
            replacement = target;
            break;
          }
          if (interrupt != Sound.INTERRUPT_NONE && (interrupt == Sound.INTERRUPT_EARLY && target.getPosition() < replacement.getPosition() || interrupt == Sound.INTERRUPT_LATE && target.getPosition() > replacement.getPosition())) {
            replacement = target;
          }
        }
        return null != replacement ? (replacement._interrupt(), this._remove(replacement), true) : false;
      };
      p.toString = function() {
        return "[Sound SoundChannel]";
      };
    })();
    this.createjs = this.createjs || {};
    (function() {
      var AbstractSoundInstance = function(src, startTime, duration, value) {
        this.EventDispatcher_constructor();
        this.src = src;
        this.uniqueId = -1;
        this.playState = null;
        this.delayTimeoutId = null;
        this._volume = 1;
        Object.defineProperty(this, "volume", {
          get : this.getVolume,
          set : this.setVolume
        });
        this._pan = 0;
        Object.defineProperty(this, "pan", {
          get : this.getPan,
          set : this.setPan
        });
        this._startTime = Math.max(0, startTime || 0);
        Object.defineProperty(this, "startTime", {
          get : this.getStartTime,
          set : this.setStartTime
        });
        this._duration = Math.max(0, duration || 0);
        Object.defineProperty(this, "duration", {
          get : this.getDuration,
          set : this.setDuration
        });
        this._playbackResource = null;
        Object.defineProperty(this, "playbackResource", {
          get : this.getPlaybackResource,
          set : this.setPlaybackResource
        });
        if (value !== false && value !== true) {
          this.setPlaybackResource(value);
        }
        this._position = 0;
        Object.defineProperty(this, "position", {
          get : this.getPosition,
          set : this.setPosition
        });
        this._loop = 0;
        Object.defineProperty(this, "loop", {
          get : this.getLoop,
          set : this.setLoop
        });
        this._muted = false;
        Object.defineProperty(this, "muted", {
          get : this.getMuted,
          set : this.setMuted
        });
        this._paused = false;
        Object.defineProperty(this, "paused", {
          get : this.getPaused,
          set : this.setPaused
        });
      };
      var p = createjs.extend(AbstractSoundInstance, createjs.EventDispatcher);
      p.play = function(interrupt, delay, time, loop, volume, pan) {
        var playProps;
        return playProps = createjs.PlayPropsConfig.create(interrupt instanceof Object || interrupt instanceof createjs.PlayPropsConfig ? interrupt : {
          interrupt : interrupt,
          delay : delay,
          offset : time,
          loop : loop,
          volume : volume,
          pan : pan
        }), this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(playProps), void(this._paused && this.setPaused(false))) : (this._cleanUp(), createjs.Sound._playInstance(this, playProps), this);
      };
      p.stop = function() {
        return this._position = 0, this._paused = false, this._handleStop(), this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, this;
      };
      p.destroy = function() {
        this._cleanUp();
        this.src = null;
        this.playbackResource = null;
        this.removeAllEventListeners();
      };
      p.applyPlayProps = function(playProps) {
        return null != playProps.offset && this.setPosition(playProps.offset), null != playProps.loop && this.setLoop(playProps.loop), null != playProps.volume && this.setVolume(playProps.volume), null != playProps.pan && this.setPan(playProps.pan), null != playProps.startTime && (this.setStartTime(playProps.startTime), this.setDuration(playProps.duration)), this;
      };
      p.toString = function() {
        return "[AbstractSoundInstance]";
      };
      p.getPaused = function() {
        return this._paused;
      };
      p.setPaused = function(value) {
        return value !== true && value !== false || this._paused == value || 1 == value && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = value, value ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this);
      };
      p.setVolume = function(value) {
        return value == this._volume ? this : (this._volume = Math.max(0, Math.min(1, value)), this._muted || this._updateVolume(), this);
      };
      p.getVolume = function() {
        return this._volume;
      };
      p.setMuted = function(muted) {
        return muted === true || muted === false ? (this._muted = muted, this._updateVolume(), this) : void 0;
      };
      p.getMuted = function() {
        return this._muted;
      };
      p.setPan = function(value) {
        return value == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, value)), this._updatePan(), this);
      };
      p.getPan = function() {
        return this._pan;
      };
      p.getPosition = function() {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()), this._position;
      };
      p.setPosition = function(position) {
        return this._position = Math.max(0, position), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this;
      };
      p.getStartTime = function() {
        return this._startTime;
      };
      p.setStartTime = function(value) {
        return value == this._startTime ? this : (this._startTime = Math.max(0, value || 0), this._updateStartTime(), this);
      };
      p.getDuration = function() {
        return this._duration;
      };
      p.setDuration = function(value) {
        return value == this._duration ? this : (this._duration = Math.max(0, value || 0), this._updateDuration(), this);
      };
      p.setPlaybackResource = function(value) {
        return this._playbackResource = value, 0 == this._duration && this._setDurationFromSource(), this;
      };
      p.getPlaybackResource = function() {
        return this._playbackResource;
      };
      p.getLoop = function() {
        return this._loop;
      };
      p.setLoop = function(value) {
        if (null != this._playbackResource) {
          if (0 != this._loop && 0 == value) {
            this._removeLooping(value);
          } else {
            if (0 == this._loop && 0 != value) {
              this._addLooping(value);
            }
          }
        }
        this._loop = value;
      };
      p._sendEvent = function(type) {
        var obj = new createjs.Event(type);
        this.dispatchEvent(obj);
      };
      p._cleanUp = function() {
        clearTimeout(this.delayTimeoutId);
        this._handleCleanUp();
        this._paused = false;
        createjs.Sound._playFinished(this);
      };
      p._interrupt = function() {
        this._cleanUp();
        this.playState = createjs.Sound.PLAY_INTERRUPTED;
        this._sendEvent("interrupted");
      };
      p._beginPlaying = function(playProps) {
        return this.setPosition(playProps.offset), this.setLoop(playProps.loop), this.setVolume(playProps.volume), this.setPan(playProps.pan), null != playProps.startTime && (this.setStartTime(playProps.startTime), this.setDuration(playProps.duration)), null != this._playbackResource && this._position < this._duration ? (this._paused = false, this._handleSoundReady(), this.playState = createjs.Sound.PLAY_SUCCEEDED, this._sendEvent("succeeded"), true) : (this._playFailed(), false);
      };
      p._playFailed = function() {
        this._cleanUp();
        this.playState = createjs.Sound.PLAY_FAILED;
        this._sendEvent("failed");
      };
      p._handleSoundComplete = function() {
        return this._position = 0, 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, void this._sendEvent("complete"));
      };
      p._handleSoundReady = function() {
      };
      p._updateVolume = function() {
      };
      p._updatePan = function() {
      };
      p._updateStartTime = function() {
      };
      p._updateDuration = function() {
      };
      p._setDurationFromSource = function() {
      };
      p._calculateCurrentPosition = function() {
      };
      p._updatePosition = function() {
      };
      p._removeLooping = function() {
      };
      p._addLooping = function() {
      };
      p._pause = function() {
      };
      p._resume = function() {
      };
      p._handleStop = function() {
      };
      p._handleCleanUp = function() {
      };
      p._handleLoop = function() {
      };
      createjs.AbstractSoundInstance = createjs.promote(AbstractSoundInstance, "EventDispatcher");
      createjs.DefaultSoundInstance = createjs.AbstractSoundInstance;
    })();
    this.createjs = this.createjs || {};
    (function() {
      var AbstractPlugin = function() {
        this._capabilities = null;
        this._loaders = {};
        this._audioSources = {};
        this._soundInstances = {};
        this._volume = 1;
        this._loaderClass;
        this._soundInstanceClass;
      };
      var p = AbstractPlugin.prototype;
      AbstractPlugin._capabilities = null;
      AbstractPlugin.isSupported = function() {
        return true;
      };
      p.register = function(loadItem) {
        var loader = this._loaders[loadItem.src];
        return loader && !loader.canceled ? this._loaders[loadItem.src] : (this._audioSources[loadItem.src] = true, this._soundInstances[loadItem.src] = [], loader = new this._loaderClass(loadItem), loader.on("complete", createjs.proxy(this._handlePreloadComplete, this)), this._loaders[loadItem.src] = loader, loader);
      };
      p.preload = function(loader) {
        loader.on("error", createjs.proxy(this._handlePreloadError, this));
        loader.load();
      };
      p.isPreloadStarted = function(src) {
        return null != this._audioSources[src];
      };
      p.isPreloadComplete = function(src) {
        return !(null == this._audioSources[src] || 1 == this._audioSources[src]);
      };
      p.removeSound = function(src) {
        if (this._soundInstances[src]) {
          var i = this._soundInstances[src].length;
          for (; i--;) {
            var s = this._soundInstances[src][i];
            s.destroy();
          }
          delete this._soundInstances[src];
          delete this._audioSources[src];
          if (this._loaders[src]) {
            this._loaders[src].destroy();
          }
          delete this._loaders[src];
        }
      };
      p.removeAllSounds = function() {
        var key;
        for (key in this._audioSources) {
          this.removeSound(key);
        }
      };
      p.create = function(src, startTime, duration) {
        if (!this.isPreloadStarted(src)) {
          this.preload(this.register(src));
        }
        var si = new this._soundInstanceClass(src, startTime, duration, this._audioSources[src]);
        return this._soundInstances[src].push(si), si;
      };
      p.setVolume = function(level) {
        return this._volume = level, this._updateVolume(), true;
      };
      p.getVolume = function() {
        return this._volume;
      };
      p.setMute = function() {
        return this._updateVolume(), true;
      };
      p.toString = function() {
        return "[AbstractPlugin]";
      };
      p._handlePreloadComplete = function(event) {
        var src = event.target.getItem().src;
        this._audioSources[src] = event.result;
        var i = 0;
        var countRep = this._soundInstances[src].length;
        for (; countRep > i; i++) {
          var item = this._soundInstances[src][i];
          item.setPlaybackResource(this._audioSources[src]);
        }
      };
      p._handlePreloadError = function() {
      };
      p._updateVolume = function() {
      };
      createjs.AbstractPlugin = AbstractPlugin;
    })();
    this.createjs = this.createjs || {};
    (function() {
      function Loader(loadItem) {
        this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.SOUND);
      }
      var p = createjs.extend(Loader, createjs.AbstractLoader);
      Loader.context = null;
      p.toString = function() {
        return "[WebAudioLoader]";
      };
      p._createRequest = function() {
        this._request = new createjs.XHRRequest(this._item, false);
        this._request.setResponseType("arraybuffer");
      };
      p._sendComplete = function() {
        Loader.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this));
      };
      p._handleAudioDecoded = function(decodedAudio) {
        this._result = decodedAudio;
        this.AbstractLoader__sendComplete();
      };
      createjs.WebAudioLoader = createjs.promote(Loader, "AbstractLoader");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function WebAudioSoundInstance(src, startTime, duration, playbackResource) {
        this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);
        this.gainNode = s.context.createGain();
        this.panNode = s.context.createPanner();
        this.panNode.panningModel = s._panningModel;
        this.panNode.connect(this.gainNode);
        this.sourceNode = null;
        this._soundCompleteTimeout = null;
        this._sourceNodeNext = null;
        this._playbackStartTime = 0;
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
      }
      var p = createjs.extend(WebAudioSoundInstance, createjs.AbstractSoundInstance);
      var s = WebAudioSoundInstance;
      s.context = null;
      s.destinationNode = null;
      s._panningModel = "equalpower";
      p.destroy = function() {
        this.AbstractSoundInstance_destroy();
        this.panNode.disconnect(0);
        this.panNode = null;
        this.gainNode.disconnect(0);
        this.gainNode = null;
      };
      p.toString = function() {
        return "[WebAudioSoundInstance]";
      };
      p._updatePan = function() {
        this.panNode.setPosition(this._pan, 0, -0.5);
      };
      p._removeLooping = function() {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
      };
      p._addLooping = function() {
        if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
          this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
        }
      };
      p._setDurationFromSource = function() {
        this._duration = 1e3 * this.playbackResource.duration;
      };
      p._handleCleanUp = function() {
        if (this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
          this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
          this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
        }
        if (0 != this.gainNode.numberOfOutputs) {
          this.gainNode.disconnect(0);
        }
        clearTimeout(this._soundCompleteTimeout);
        this._playbackStartTime = 0;
      };
      p._cleanUpAudioNode = function(audioNode) {
        return audioNode && (audioNode.stop(0), audioNode.disconnect(0), audioNode = null), audioNode;
      };
      p._handleSoundReady = function() {
        this.gainNode.connect(s.destinationNode);
        var offset = 0.001 * this._duration;
        var pos = 0.001 * this._position;
        if (pos > offset) {
          pos = offset;
        }
        this.sourceNode = this._createAndPlayAudioNode(s.context.currentTime - offset, pos);
        this._playbackStartTime = this.sourceNode.startTime - pos;
        this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (offset - pos));
        if (0 != this._loop) {
          this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
        }
      };
      p._createAndPlayAudioNode = function(startTime, offset) {
        var audioNode = s.context.createBufferSource();
        audioNode.buffer = this.playbackResource;
        audioNode.connect(this.panNode);
        var dur = 0.001 * this._duration;
        return audioNode.startTime = startTime + dur, audioNode.start(audioNode.startTime, offset + 0.001 * this._startTime, dur - offset), audioNode;
      };
      p._pause = function() {
        this._position = 1e3 * (s.context.currentTime - this._playbackStartTime);
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
        if (0 != this.gainNode.numberOfOutputs) {
          this.gainNode.disconnect(0);
        }
        clearTimeout(this._soundCompleteTimeout);
      };
      p._resume = function() {
        this._handleSoundReady();
      };
      p._updateVolume = function() {
        var newVolume = this._muted ? 0 : this._volume;
        if (newVolume != this.gainNode.gain.value) {
          this.gainNode.gain.value = newVolume;
        }
      };
      p._calculateCurrentPosition = function() {
        return 1e3 * (s.context.currentTime - this._playbackStartTime);
      };
      p._updatePosition = function() {
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
        clearTimeout(this._soundCompleteTimeout);
        if (!this._paused) {
          this._handleSoundReady();
        }
      };
      p._handleLoop = function() {
        this._cleanUpAudioNode(this.sourceNode);
        this.sourceNode = this._sourceNodeNext;
        this._playbackStartTime = this.sourceNode.startTime;
        this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
        this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration);
      };
      p._updateDuration = function() {
        if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
          this._pause();
          this._resume();
        }
      };
      createjs.WebAudioSoundInstance = createjs.promote(WebAudioSoundInstance, "AbstractSoundInstance");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function WebAudioPlugin() {
        this.AbstractPlugin_constructor();
        this._panningModel = s._panningModel;
        this.context = s.context;
        this.dynamicsCompressorNode = this.context.createDynamicsCompressor();
        this.dynamicsCompressorNode.connect(this.context.destination);
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.dynamicsCompressorNode);
        createjs.WebAudioSoundInstance.destinationNode = this.gainNode;
        this._capabilities = s._capabilities;
        this._loaderClass = createjs.WebAudioLoader;
        this._soundInstanceClass = createjs.WebAudioSoundInstance;
        this._addPropsToClasses();
      }
      var p = createjs.extend(WebAudioPlugin, createjs.AbstractPlugin);
      var s = WebAudioPlugin;
      s._capabilities = null;
      s._panningModel = "equalpower";
      s.context = null;
      s.isSupported = function() {
        var e = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || e || this._isFileXHRSupported() ? (s._generateCapabilities(), null == s.context ? false : true) : false;
      };
      s.playEmptySound = function() {
        if (null != s.context) {
          var _silenceBufferSource = s.context.createBufferSource();
          _silenceBufferSource.buffer = s.context.createBuffer(1, 1, 22050);
          _silenceBufferSource.connect(s.context.destination);
          _silenceBufferSource.start(0, 0, 0);
        }
      };
      s._isFileXHRSupported = function() {
        var supported = true;
        var xhrHandshake = new XMLHttpRequest;
        try {
          xhrHandshake.open("GET", "WebAudioPluginTest.fail", false);
        } catch (s) {
          return supported = false;
        }
        xhrHandshake.onerror = function() {
          supported = false;
        };
        xhrHandshake.onload = function() {
          supported = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response;
        };
        try {
          xhrHandshake.send();
        } catch (s) {
          supported = false;
        }
        return supported;
      };
      s._generateCapabilities = function() {
        if (null == s._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) {
            return null;
          }
          if (null == s.context) {
            if (window.AudioContext) {
              s.context = new AudioContext;
            } else {
              if (!window.webkitAudioContext) {
                return null;
              }
              s.context = new webkitAudioContext;
            }
          }
          s._compatibilitySetUp();
          s.playEmptySound();
          s._capabilities = {
            panning : true,
            volume : true,
            tracks : -1
          };
          var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
          var extensionMap = createjs.Sound.EXTENSION_MAP;
          var i = 0;
          var l = supportedExtensions.length;
          for (; l > i; i++) {
            var ext = supportedExtensions[i];
            var playType = extensionMap[ext] || ext;
            s._capabilities[ext] = "no" != t.canPlayType("audio/" + ext) && "" != t.canPlayType("audio/" + ext) || "no" != t.canPlayType("audio/" + playType) && "" != t.canPlayType("audio/" + playType);
          }
          if (s.context.destination.numberOfChannels < 2) {
            s._capabilities.panning = false;
          }
        }
      };
      s._compatibilitySetUp = function() {
        if (s._panningModel = "equalpower", !s.context.createGain) {
          s.context.createGain = s.context.createGainNode;
          var audioNode = s.context.createBufferSource();
          audioNode.__proto__.start = audioNode.__proto__.noteGrainOn;
          audioNode.__proto__.stop = audioNode.__proto__.noteOff;
          s._panningModel = 0;
        }
      };
      p.toString = function() {
        return "[WebAudioPlugin]";
      };
      p._addPropsToClasses = function() {
        var c = this._soundInstanceClass;
        c.context = this.context;
        c.destinationNode = this.gainNode;
        c._panningModel = this._panningModel;
        this._loaderClass.context = this.context;
      };
      p._updateVolume = function() {
        var newVolume = createjs.Sound._masterMute ? 0 : this._volume;
        if (newVolume != this.gainNode.gain.value) {
          this.gainNode.gain.value = newVolume;
        }
      };
      createjs.WebAudioPlugin = createjs.promote(WebAudioPlugin, "AbstractPlugin");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function HTMLAudioTagPool() {
        throw "HTMLAudioTagPool cannot be instantiated";
      }
      function TagPool() {
        this._tags = [];
      }
      var s = HTMLAudioTagPool;
      s._tags = {};
      s._tagPool = new TagPool;
      s._tagUsed = {};
      s.get = function(src) {
        var g = s._tags[src];
        return null == g ? (g = s._tags[src] = s._tagPool.get(), g.src = src) : s._tagUsed[src] ? (g = s._tagPool.get(), g.src = src) : s._tagUsed[src] = true, g;
      };
      s.set = function(key, value) {
        if (value == s._tags[key]) {
          s._tagUsed[key] = false;
        } else {
          s._tagPool.set(value);
        }
      };
      s.remove = function(name) {
        var value = s._tags[name];
        return null == value ? false : (s._tagPool.set(value), delete s._tags[name], delete s._tagUsed[name], true);
      };
      s.getDuration = function(src) {
        var target = s._tags[src];
        return null != target && target.duration ? 1e3 * target.duration : 0;
      };
      createjs.HTMLAudioTagPool = HTMLAudioTagPool;
      var p = TagPool.prototype;
      p.constructor = TagPool;
      p.get = function() {
        var idlDictionary;
        return idlDictionary = 0 == this._tags.length ? this._createTag() : this._tags.pop(), null == idlDictionary.parentNode && document.body.appendChild(idlDictionary), idlDictionary;
      };
      p.set = function(tag) {
        var index = createjs.indexOf(this._tags, tag);
        if (-1 == index) {
          this._tags.src = null;
          this._tags.push(tag);
        }
      };
      p.toString = function() {
        return "[TagPool]";
      };
      p._createTag = function() {
        var a = document.createElement("audio");
        return a.autoplay = false, a.preload = "none", a;
      };
    })();
    this.createjs = this.createjs || {};
    (function() {
      function HTMLAudioSoundInstance(src, startTime, duration, playbackResource) {
        this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);
        this._audioSpriteStopTime = null;
        this._delayTimeoutId = null;
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
        this._readyHandler = createjs.proxy(this._handleTagReady, this);
        this._stalledHandler = createjs.proxy(this._playFailed, this);
        this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this);
        this._loopHandler = createjs.proxy(this._handleSoundComplete, this);
        if (duration) {
          this._audioSpriteStopTime = 0.001 * (startTime + duration);
        } else {
          this._duration = createjs.HTMLAudioTagPool.getDuration(this.src);
        }
      }
      var p = createjs.extend(HTMLAudioSoundInstance, createjs.AbstractSoundInstance);
      p.setMasterVolume = function() {
        this._updateVolume();
      };
      p.setMasterMute = function() {
        this._updateVolume();
      };
      p.toString = function() {
        return "[HTMLAudioSoundInstance]";
      };
      p._removeLooping = function() {
        if (null != this._playbackResource) {
          this._playbackResource.loop = false;
          this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
        }
      };
      p._addLooping = function() {
        if (!(null == this._playbackResource || this._audioSpriteStopTime)) {
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
          this._playbackResource.loop = true;
        }
      };
      p._handleCleanUp = function() {
        var tag = this._playbackResource;
        if (null != tag) {
          tag.pause();
          tag.loop = false;
          tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
          tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
          tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
          tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
          tag.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
          try {
            tag.currentTime = this._startTime;
          } catch (t) {
          }
          createjs.HTMLAudioTagPool.set(this.src, tag);
          this._playbackResource = null;
        }
      };
      p._beginPlaying = function(instance) {
        return this._playbackResource = createjs.HTMLAudioTagPool.get(this.src), this.AbstractSoundInstance__beginPlaying(instance);
      };
      p._handleSoundReady = function() {
        if (4 !== this._playbackResource.readyState) {
          var tag = this._playbackResource;
          return tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false), tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false), tag.preload = "auto", void tag.load();
        }
        this._updateVolume();
        this._playbackResource.currentTime = 0.001 * (this._startTime + this._position);
        if (this._audioSpriteStopTime) {
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
        } else {
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
          if (0 != this._loop) {
            this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
            this._playbackResource.loop = true;
          }
        }
        this._playbackResource.play();
      };
      p._handleTagReady = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
        this._handleSoundReady();
      };
      p._pause = function() {
        this._playbackResource.pause();
      };
      p._resume = function() {
        this._playbackResource.play();
      };
      p._updateVolume = function() {
        if (null != this._playbackResource) {
          var newVolume = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
          if (newVolume != this._playbackResource.volume) {
            this._playbackResource.volume = newVolume;
          }
        }
      };
      p._calculateCurrentPosition = function() {
        return 1e3 * this._playbackResource.currentTime - this._startTime;
      };
      p._updatePosition = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
        try {
          this._playbackResource.currentTime = 0.001 * (this._position + this._startTime);
        } catch (e) {
          this._handleSetPositionSeek(null);
        }
      };
      p._handleSetPositionSeek = function() {
        if (null != this._playbackResource) {
          this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
        }
      };
      p._handleAudioSpriteLoop = function() {
        if (!(this._playbackResource.currentTime <= this._audioSpriteStopTime)) {
          this._playbackResource.pause();
          if (0 == this._loop) {
            this._handleSoundComplete(null);
          } else {
            this._position = 0;
            this._loop--;
            this._playbackResource.currentTime = 0.001 * this._startTime;
            if (!this._paused) {
              this._playbackResource.play();
            }
            this._sendEvent("loop");
          }
        }
      };
      p._handleLoop = function() {
        if (0 == this._loop) {
          this._playbackResource.loop = false;
          this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
        }
      };
      p._updateStartTime = function() {
        this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration);
        if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
          this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
        }
      };
      p._updateDuration = function() {
        this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration);
        if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
          this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
          this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
        }
      };
      p._setDurationFromSource = function() {
        this._duration = createjs.HTMLAudioTagPool.getDuration(this.src);
        this._playbackResource = null;
      };
      createjs.HTMLAudioSoundInstance = createjs.promote(HTMLAudioSoundInstance, "AbstractSoundInstance");
    })();
    this.createjs = this.createjs || {};
    (function() {
      function HTMLAudioPlugin() {
        this.AbstractPlugin_constructor();
        this.defaultNumChannels = 2;
        this._capabilities = s._capabilities;
        this._loaderClass = createjs.SoundLoader;
        this._soundInstanceClass = createjs.HTMLAudioSoundInstance;
      }
      var p = createjs.extend(HTMLAudioPlugin, createjs.AbstractPlugin);
      var s = HTMLAudioPlugin;
      s.MAX_INSTANCES = 30;
      s._AUDIO_READY = "canplaythrough";
      s._AUDIO_ENDED = "ended";
      s._AUDIO_SEEKED = "seeked";
      s._AUDIO_STALLED = "stalled";
      s._TIME_UPDATE = "timeupdate";
      s._capabilities = null;
      s.isSupported = function() {
        return s._generateCapabilities(), null != s._capabilities;
      };
      s._generateCapabilities = function() {
        if (null == s._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) {
            return null;
          }
          s._capabilities = {
            panning : false,
            volume : true,
            tracks : -1
          };
          var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
          var extensionMap = createjs.Sound.EXTENSION_MAP;
          var i = 0;
          var l = supportedExtensions.length;
          for (; l > i; i++) {
            var ext = supportedExtensions[i];
            var playType = extensionMap[ext] || ext;
            s._capabilities[ext] = "no" != t.canPlayType("audio/" + ext) && "" != t.canPlayType("audio/" + ext) || "no" != t.canPlayType("audio/" + playType) && "" != t.canPlayType("audio/" + playType);
          }
        }
      };
      p.register = function(loadItem) {
        var tag = createjs.HTMLAudioTagPool.get(loadItem.src);
        var loader = this.AbstractPlugin_register(loadItem);
        return loader.setTag(tag), loader;
      };
      p.removeSound = function(src) {
        this.AbstractPlugin_removeSound(src);
        createjs.HTMLAudioTagPool.remove(src);
      };
      p.create = function(src, startTime, duration) {
        var si = this.AbstractPlugin_create(src, startTime, duration);
        return si.setPlaybackResource(null), si;
      };
      p.toString = function() {
        return "[HTMLAudioPlugin]";
      };
      p.setVolume = p.getVolume = p.setMute = null;
      createjs.HTMLAudioPlugin = createjs.promote(HTMLAudioPlugin, "AbstractPlugin");
    })();
  }, {}]
}, {}, [2]);
