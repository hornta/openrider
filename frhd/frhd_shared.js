'use strict';
!function(global, factory) {
  if ("object" == typeof module && "object" == typeof module.exports) {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}("undefined" != typeof window ? window : this, function(window, forceWipe) {
  /**
   * @param {?} obj
   * @return {?}
   */
  function isArraylike(obj) {
    var length = "length" in obj && obj.length;
    var type = jQuery.type(obj);
    return "function" === type || jQuery.isWindow(obj) ? false : 1 === obj.nodeType && length ? true : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
  }
  /**
   * @param {undefined} args
   * @param {?} value
   * @param {?} not
   * @return {?}
   */
  function winnow(args, value, not) {
    if (jQuery.isFunction(value)) {
      return jQuery.grep(args, function(context, i) {
        return !!value.call(context, i, context) !== not;
      });
    }
    if (value.nodeType) {
      return jQuery.grep(args, function(elem) {
        return elem === value !== not;
      });
    }
    if ("string" == typeof value) {
      if (contribRegex.test(value)) {
        return jQuery.filter(value, args, not);
      }
      value = jQuery.filter(value, args);
    }
    return jQuery.grep(args, function(i) {
      return filter.call(value, i) >= 0 !== not;
    });
  }
  /**
   * @param {(Array|Element)} cur
   * @param {number} dir
   * @return {?}
   */
  function sibling(cur, dir) {
    for (; (cur = cur[dir]) && 1 !== cur.nodeType;) {
    }
    return cur;
  }
  /**
   * @param {!Object} options
   * @return {?}
   */
  function createOptions(options) {
    var subwikiListsCache = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], function(canCreateDiscussions, wikiId) {
      /** @type {boolean} */
      subwikiListsCache[wikiId] = true;
    }), subwikiListsCache;
  }
  /**
   * @return {undefined}
   */
  function $__jsx_onload() {
    document.removeEventListener("DOMContentLoaded", $__jsx_onload, false);
    window.removeEventListener("load", $__jsx_onload, false);
    jQuery.ready();
  }
  /**
   * @return {undefined}
   */
  function Data() {
    Object.defineProperty(this.cache = {}, 0, {
      get : function() {
        return {};
      }
    });
    this.expando = jQuery.expando + Data.uid++;
  }
  /**
   * @param {!Object} item
   * @param {!Object} name
   * @param {?} value
   * @return {?}
   */
  function set(item, name, value) {
    var attributeName;
    if (void 0 === value && 1 === item.nodeType) {
      if (attributeName = "data-" + name.replace(dashExpr, "-$1").toLowerCase(), value = item.getAttribute(attributeName), "string" == typeof value) {
        try {
          value = "true" === value ? true : "false" === value ? false : "null" === value ? null : +value + "" === value ? +value : trueRE.test(value) ? jQuery.parseJSON(value) : value;
        } catch (a) {
        }
        $.set(item, name, value);
      } else {
        value = void 0;
      }
    }
    return value;
  }
  /**
   * @return {?}
   */
  function returnTrue() {
    return true;
  }
  /**
   * @return {?}
   */
  function returnFalse() {
    return false;
  }
  /**
   * @return {?}
   */
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (e) {
    }
  }
  /**
   * @param {!Object} elem
   * @param {!Element} content
   * @return {?}
   */
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  /**
   * @param {!Element} elem
   * @return {?}
   */
  function text(elem) {
    return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
  }
  /**
   * @param {!Object} e
   * @return {?}
   */
  function createGeneNameGenomicState(e) {
    /** @type {(Array<string>|null)} */
    var params = receivedOpenEvents.exec(e.type);
    return params ? e.type = params[1] : e.removeAttribute("type"), e;
  }
  /**
   * @param {number} elems
   * @param {!NodeList} refElements
   * @return {undefined}
   */
  function setGlobalEval(elems, refElements) {
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    for (; length > i; i++) {
      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
  }
  /**
   * @param {(Object|string)} src
   * @param {?} dest
   * @return {undefined}
   */
  function cloneCopyEvent(src, dest) {
    var i;
    var countRep;
    var p;
    var pdataOld;
    var pdataCur;
    var value;
    var item;
    var events;
    if (1 === dest.nodeType) {
      if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), events = pdataOld.events)) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (p in events) {
          /** @type {number} */
          i = 0;
          countRep = events[p].length;
          for (; countRep > i; i++) {
            jQuery.event.add(dest, p, events[p][i]);
          }
        }
      }
      if ($.hasData(src)) {
        value = $.access(src);
        item = jQuery.extend({}, value);
        $.set(dest, item);
      }
    }
  }
  /**
   * @param {!Object} context
   * @param {number} tag
   * @return {?}
   */
  function getAll(context, tag) {
    var r = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
    return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], r) : r;
  }
  /**
   * @param {!Object} src
   * @param {!Object} dest
   * @return {undefined}
   */
  function fixInput(src, dest) {
    var tagName = dest.nodeName.toLowerCase();
    if ("input" === tagName && reg.test(src.type)) {
      dest.checked = src.checked;
    } else {
      if ("input" === tagName || "textarea" === tagName) {
        dest.defaultValue = src.defaultValue;
      }
    }
  }
  /**
   * @param {?} name
   * @param {!Object} doc
   * @return {?}
   */
  function actualDisplay(name, doc) {
    var style;
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body);
    var a = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
    return elem.detach(), a;
  }
  /**
   * @param {?} nodeName
   * @return {?}
   */
  function defaultDisplay(nodeName) {
    var doc = document;
    var display = defaultDisplayMap[nodeName];
    return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), defaultDisplayMap[nodeName] = display), display;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {!Object} computed
   * @return {?}
   */
  function curCSS(elem, name, computed) {
    var minWidth;
    var width;
    var maxWidth;
    var ret;
    var style = elem.style;
    return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && namespaces.test(name) && (minWidth = style.width, width = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = minWidth, style.minWidth = width, style.maxWidth = maxWidth)), 
    void 0 !== ret ? ret + "" : ret;
  }
  /**
   * @param {?} conditionFn
   * @param {!Function} hookFn
   * @return {?}
   */
  function addGetHookIf(conditionFn, hookFn) {
    return {
      get : function() {
        return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  /**
   * @param {!Object} style
   * @param {string} name
   * @return {?}
   */
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var UserSelect = name[0].toUpperCase() + name.slice(1);
    /** @type {string} */
    var origName = name;
    /** @type {number} */
    var i = prefixes.length;
    for (; i--;) {
      if (name = prefixes[i] + UserSelect, name in style) {
        return name;
      }
    }
    return origName;
  }
  /**
   * @param {!Object} arr
   * @param {!Object} value
   * @param {string} elem
   * @return {?}
   */
  function setPositiveNumber(arr, value, elem) {
    /** @type {(Array<string>|null)} */
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (elem || 0)) + (matches[2] || "px") : value;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {string} extra
   * @param {boolean} isBorderBox
   * @param {!Object} styles
   * @return {?}
   */
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    /** @type {number} */
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0;
    /** @type {number} */
    var val = 0;
    for (; 4 > i; i = i + 2) {
      if ("margin" === extra) {
        val = val + jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if ("content" === extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if ("margin" !== extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val = val + jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if ("padding" !== extra) {
          val = val + jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {!Object} extra
   * @return {?}
   */
  function getWidthOrHeight(elem, name, extra) {
    /** @type {boolean} */
    var valueIsBorderBox = true;
    var val = "width" === name ? elem.offsetWidth : elem.offsetHeight;
    var styles = getStyles(elem);
    /** @type {boolean} */
    var isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", false, styles);
    if (0 >= val || null == val) {
      if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      /** @type {number} */
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  /**
   * @param {!NodeList} elements
   * @param {number} show
   * @return {?}
   */
  function showHide(elements, show) {
    var display;
    var elem;
    var hidden;
    /** @type {!Array} */
    var values = [];
    /** @type {number} */
    var index = 0;
    var length = elements.length;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        values[index] = data_priv.get(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
          if (!(values[index] || "none" !== display)) {
            /** @type {string} */
            elem.style.display = "";
          }
          if ("" === elem.style.display && isHidden(elem)) {
            values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
          }
        } else {
          hidden = isHidden(elem);
          if (!("none" === display && hidden)) {
            data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
          }
        }
      }
    }
    /** @type {number} */
    index = 0;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        if (!(show && "none" !== elem.style.display && "" !== elem.style.display)) {
          elem.style.display = show ? values[index] || "" : "none";
        }
      }
    }
    return elements;
  }
  /**
   * @param {?} obj
   * @param {?} options
   * @param {string} object
   * @param {boolean} callback
   * @param {boolean} that
   * @return {?}
   */
  function Tween(obj, options, object, callback, that) {
    return new Tween.prototype.init(obj, options, object, callback, that);
  }
  /**
   * @return {?}
   */
  function createFxNow() {
    return setTimeout(function() {
      fxNow = void 0;
    }), fxNow = jQuery.now();
  }
  /**
   * @param {string} type
   * @param {number} includeWidth
   * @return {?}
   */
  function genFx(type, includeWidth) {
    var which;
    /** @type {number} */
    var i = 0;
    var attrs = {
      height : type
    };
    /** @type {number} */
    includeWidth = includeWidth ? 1 : 0;
    for (; 4 > i; i = i + (2 - includeWidth)) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  /**
   * @param {?} value
   * @param {!Object} prop
   * @param {?} animation
   * @return {?}
   */
  function createTween(value, prop, animation) {
    var tween;
    var r = (tweeners[prop] || []).concat(tweeners["*"]);
    /** @type {number} */
    var f = 0;
    var c = r.length;
    for (; c > f; f++) {
      if (tween = r[f].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  /**
   * @param {?} elem
   * @param {!Object} props
   * @param {!Object} opts
   * @return {undefined}
   */
  function defaultPrefilter(elem, props, opts) {
    var prop;
    var value;
    var matched;
    var tween;
    var hooks;
    var oldfire;
    var display;
    var type;
    var anim = this;
    var orig = {};
    var style = elem.style;
    var hidden = elem.nodeType && isHidden(elem);
    var dataShow = data_priv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (null == hooks.unqueued) {
        /** @type {number} */
        hooks.unqueued = 0;
        /** @type {function(): undefined} */
        oldfire = hooks.empty.fire;
        /**
         * @return {undefined}
         */
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (1 === elem.nodeType && ("height" in props || "width" in props)) {
      /** @type {!Array} */
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      type = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if ("inline" === type && "none" === jQuery.css(elem, "float")) {
        /** @type {string} */
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      /** @type {string} */
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      if (value = props[prop], moveRegex.exec(value)) {
        if (delete props[prop], matched = matched || "toggle" === value, value === (hidden ? "hide" : "show")) {
          if ("show" !== value || !dataShow || void 0 === dataShow[prop]) {
            continue;
          }
          /** @type {boolean} */
          hidden = true;
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = void 0;
      }
    }
    if (jQuery.isEmptyObject(orig)) {
      if ("inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display)) {
        style.display = display;
      }
    } else {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, "fxshow", {});
      }
      if (matched) {
        /** @type {boolean} */
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        data_priv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            /** @type {number} */
            tween.start = "width" === prop || "height" === prop ? 1 : 0;
          }
        }
      }
    }
  }
  /**
   * @param {!Array} obj
   * @param {!Array} props
   * @return {undefined}
   */
  function propFilter(obj, props) {
    var key;
    var name;
    var value;
    var data;
    var hooks;
    for (key in obj) {
      if (name = jQuery.camelCase(key), value = props[name], data = obj[key], jQuery.isArray(data) && (value = data[1], data = obj[key] = data[0]), key !== name && (obj[name] = data, delete obj[key]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
        data = hooks.expand(data);
        delete obj[name];
        for (key in data) {
          if (!(key in obj)) {
            obj[key] = data[key];
            props[key] = value;
          }
        }
      } else {
        props[name] = value;
      }
    }
  }
  /**
   * @param {(Object|string)} elem
   * @param {!Object} properties
   * @param {!Object} options
   * @return {?}
   */
  function Animation(elem, properties, options) {
    var result;
    var o;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var length = animationPrefilters.length;
    var deferred = jQuery.Deferred().always(function() {
      delete tick.elem;
    });
    /**
     * @return {?}
     */
    var tick = function() {
      if (o) {
        return false;
      }
      var currentTime = fxNow || createFxNow();
      /** @type {number} */
      var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
      /** @type {number} */
      var temp = remaining / animation.duration || 0;
      /** @type {number} */
      var percent = 1 - temp;
      /** @type {number} */
      var i = 0;
      var countRep = animation.tweens.length;
      for (; countRep > i; i++) {
        animation.tweens[i].run(percent);
      }
      return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && countRep ? remaining : (deferred.resolveWith(elem, [animation]), false);
    };
    var animation = deferred.promise({
      elem : elem,
      props : jQuery.extend({}, properties),
      opts : jQuery.extend(true, {
        specialEasing : {}
      }, options),
      originalProperties : properties,
      originalOptions : options,
      startTime : fxNow || createFxNow(),
      duration : options.duration,
      tweens : [],
      createTween : function(prop, end) {
        var result = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        return animation.tweens.push(result), result;
      },
      stop : function(value) {
        /** @type {number} */
        var i = 0;
        var val = value ? animation.tweens.length : 0;
        if (o) {
          return this;
        }
        /** @type {boolean} */
        o = true;
        for (; val > i; i++) {
          animation.tweens[i].run(1);
        }
        return value ? deferred.resolveWith(elem, [animation, value]) : deferred.rejectWith(elem, [animation, value]), this;
      }
    });
    var props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; length > index; index++) {
      if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) {
        return result;
      }
    }
    return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      elem : elem,
      anim : animation,
      queue : animation.opts.queue
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  /**
   * @param {!Object} structure
   * @return {?}
   */
  function addToPrefiltersOrTransports(structure) {
    return function(url, type) {
      if ("string" != typeof url) {
        /** @type {string} */
        type = url;
        /** @type {string} */
        url = "*";
      }
      var tagName;
      /** @type {number} */
      var callbackCount = 0;
      var callbackVals = url.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(type)) {
        for (; tagName = callbackVals[callbackCount++];) {
          if ("+" === tagName[0]) {
            tagName = tagName.slice(1) || "*";
            (structure[tagName] = structure[tagName] || []).unshift(type);
          } else {
            (structure[tagName] = structure[tagName] || []).push(type);
          }
        }
      }
    };
  }
  /**
   * @param {!Object} structure
   * @param {?} options
   * @param {!Object} originalOptions
   * @param {?} jqXHR
   * @return {?}
   */
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    /**
     * @param {string} index
     * @return {?}
     */
    function inspect(index) {
      var expectedProperty;
      return items[index] = true, jQuery.each(structure[index] || [], function(canCreateDiscussions, prefilterOrFactory) {
        var name = prefilterOrFactory(options, originalOptions, jqXHR);
        return "string" != typeof name || seekingTransport || items[name] ? seekingTransport ? !(expectedProperty = name) : void 0 : (options.dataTypes.unshift(name), inspect(name), false);
      }), expectedProperty;
    }
    var items = {};
    /** @type {boolean} */
    var seekingTransport = structure === transports;
    return inspect(options.dataTypes[0]) || !items["*"] && inspect("*");
  }
  /**
   * @param {?} target
   * @param {?} opts
   * @return {?}
   */
  function ajaxExtend(target, opts) {
    var key;
    var deep;
    var flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in opts) {
      if (void 0 !== opts[key]) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = opts[key];
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }
  /**
   * @param {!Object} s
   * @param {!XMLHttpRequest} jqXHR
   * @param {!Array} responses
   * @return {?}
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct;
    var type;
    var finalDataType;
    var firstDataType;
    var contents = s.contents;
    var dataTypes = s.dataTypes;
    for (; "*" === dataTypes[0];) {
      dataTypes.shift();
      if (void 0 === ct) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          /** @type {string} */
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          /** @type {string} */
          firstDataType = type;
        }
      }
      /** @type {(string|undefined)} */
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0;
  }
  /**
   * @param {!Object} s
   * @param {string} response
   * @param {?} jqXHR
   * @param {number} isSuccess
   * @return {?}
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2;
    var current;
    var conv;
    var data;
    var prev;
    var converters = {};
    var u = s.dataTypes.slice();
    if (u[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = u.shift();
    for (; current;) {
      if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = u.shift()) {
        if ("*" === current) {
          current = prev;
        } else {
          if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) {
              for (conv2 in converters) {
                if (data = conv2.split(" "), data[1] === current && (conv = converters[prev + " " + data[0]] || converters["* " + data[0]])) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else {
                    if (converters[conv2] !== true) {
                      /** @type {string} */
                      current = data[0];
                      u.unshift(data[1]);
                    }
                  }
                  break;
                }
              }
            }
            if (conv !== true) {
              if (conv && s["throws"]) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state : "parsererror",
                    error : conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
    }
    return {
      state : "success",
      data : response
    };
  }
  /**
   * @param {string} key
   * @param {?} o
   * @param {string} name
   * @param {!Function} object
   * @return {undefined}
   */
  function callback(key, o, name, object) {
    var k;
    if (jQuery.isArray(o)) {
      jQuery.each(o, function(yes, value) {
        if (name || VALID_IDENTIFIER_EXPR.test(key)) {
          object(key, value);
        } else {
          callback(key + "[" + ("object" == typeof value ? yes : "") + "]", value, name, object);
        }
      });
    } else {
      if (name || "object" !== jQuery.type(o)) {
        object(key, o);
      } else {
        for (k in o) {
          callback(key + "[" + k + "]", o[k], name, object);
        }
      }
    }
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function getWindow(obj) {
    return jQuery.isWindow(obj) ? obj : 9 === obj.nodeType && obj.defaultView;
  }
  /** @type {!Array} */
  var emptyArray = [];
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = emptyArray.slice;
  /** @type {function(this:*, ...*): !Array<?>} */
  var concat = emptyArray.concat;
  /** @type {function(this:IArrayLike<T>, ...T): number} */
  var item = emptyArray.push;
  /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
  var filter = emptyArray.indexOf;
  var class2type = {};
  /** @type {function(this:*): string} */
  var toString = class2type.toString;
  /** @type {function(this:Object, *): boolean} */
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var document = window.document;
  /** @type {string} */
  var core_version = "2.1.4";
  /**
   * @param {?} a
   * @param {?} options
   * @return {?}
   */
  var jQuery = function(a, options) {
    return new jQuery.fn.init(a, options);
  };
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  /** @type {!RegExp} */
  var nonAscii = /^-ms-/;
  /** @type {!RegExp} */
  var regPlaceholder = /-([\da-z])/gi;
  /**
   * @param {?} context
   * @param {string} match
   * @return {?}
   */
  var dashToCapital = function(context, match) {
    return match.toUpperCase();
  };
  jQuery.fn = jQuery.prototype = {
    jquery : core_version,
    constructor : jQuery,
    selector : "",
    length : 0,
    toArray : function() {
      return slice.call(this);
    },
    get : function(value) {
      return null != value ? 0 > value ? this[value + this.length] : this[value] : slice.call(this);
    },
    pushStack : function(a) {
      var ret = jQuery.merge(this.constructor(), a);
      return ret.prevObject = this, ret.context = this.context, ret;
    },
    each : function(data, callback) {
      return jQuery.each(this, data, callback);
    },
    map : function(b) {
      return this.pushStack(jQuery.map(this, function(parent, deferBuild) {
        return b.call(parent, deferBuild, parent);
      }));
    },
    slice : function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first : function() {
      return this.eq(0);
    },
    last : function() {
      return this.eq(-1);
    },
    eq : function(i) {
      var index = this.length;
      var thisIndex = +i + (0 > i ? index : 0);
      return this.pushStack(thisIndex >= 0 && index > thisIndex ? [this[thisIndex]] : []);
    },
    end : function() {
      return this.prevObject || this.constructor(null);
    },
    push : item,
    sort : emptyArray.sort,
    splice : emptyArray.splice
  };
  /** @type {function(): ?} */
  jQuery.extend = jQuery.fn.extend = function() {
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
    var clone;
    var target = arguments[0] || {};
    /** @type {number} */
    var d = 1;
    /** @type {number} */
    var c = arguments.length;
    /** @type {boolean} */
    var deep = false;
    if ("boolean" == typeof target) {
      /** @type {boolean} */
      deep = target;
      target = arguments[d] || {};
      d++;
    }
    if (!("object" == typeof target || jQuery.isFunction(target))) {
      target = {};
    }
    if (d === c) {
      target = this;
      d--;
    }
    for (; c > d; d++) {
      if (null != (options = arguments[d])) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target !== copy) {
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                /** @type {boolean} */
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              target[name] = jQuery.extend(deep, clone, copy);
            } else {
              if (void 0 !== copy) {
                target[name] = copy;
              }
            }
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    isReady : true,
    error : function(name) {
      throw new Error(name);
    },
    noop : function() {
    },
    isFunction : function(value) {
      return "function" === jQuery.type(value);
    },
    isArray : Array.isArray,
    isWindow : function(obj) {
      return null != obj && obj === obj.window;
    },
    isNumeric : function(value) {
      return !jQuery.isArray(value) && value - parseFloat(value) + 1 >= 0;
    },
    isPlainObject : function(object) {
      return "object" !== jQuery.type(object) || object.nodeType || jQuery.isWindow(object) ? false : object.constructor && !hasOwn.call(object.constructor.prototype, "isPrototypeOf") ? false : true;
    },
    isEmptyObject : function(obj) {
      var key;
      for (key in obj) {
        return false;
      }
      return true;
    },
    type : function(obj) {
      return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval : function(code) {
      var script;
      /** @type {function(string): *} */
      var indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (1 === code.indexOf("use strict")) {
          script = document.createElement("script");
          /** @type {string} */
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase : function(string) {
      return string.replace(nonAscii, "ms-").replace(regPlaceholder, dashToCapital);
    },
    nodeName : function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each : function(obj, callback, options) {
      var _lastFooter;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      if (options) {
        if (isArray) {
          for (; length > i && (_lastFooter = callback.apply(obj[i], options), _lastFooter !== false); i++) {
          }
        } else {
          for (i in obj) {
            if (_lastFooter = callback.apply(obj[i], options), _lastFooter === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; length > i && (_lastFooter = callback.call(obj[i], i, obj[i]), _lastFooter !== false); i++) {
          }
        } else {
          for (i in obj) {
            if (_lastFooter = callback.call(obj[i], i, obj[i]), _lastFooter === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim : function(text) {
      return null == text ? "" : (text + "").replace(REGEX_ESCAPE_EXPR, "");
    },
    makeArray : function(arr, data) {
      var obj = data || [];
      return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(obj, "string" == typeof arr ? [arr] : arr) : item.call(obj, arr)), obj;
    },
    inArray : function(elem, arr, i) {
      return null == arr ? -1 : filter.call(arr, elem, i);
    },
    merge : function(a, b) {
      /** @type {number} */
      var pivotPosition = +b.length;
      /** @type {number} */
      var k = 0;
      var l = a.length;
      for (; pivotPosition > k; k++) {
        a[l++] = b[k];
      }
      return a.length = l, a;
    },
    grep : function(elems, callback, a) {
      var editItemKey;
      /** @type {!Array} */
      var ret = [];
      /** @type {number} */
      var i = 0;
      var length = elems.length;
      /** @type {boolean} */
      var booA = !a;
      for (; length > i; i++) {
        /** @type {boolean} */
        editItemKey = !callback(elems[i], i);
        if (editItemKey !== booA) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map : function(obj, fn, array) {
      var value;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      /** @type {!Array} */
      var values = [];
      if (isArray) {
        for (; length > i; i++) {
          value = fn(obj[i], i, array);
          if (null != value) {
            values.push(value);
          }
        }
      } else {
        for (i in obj) {
          value = fn(obj[i], i, array);
          if (null != value) {
            values.push(value);
          }
        }
      }
      return concat.apply([], values);
    },
    guid : 1,
    proxy : function(p, c) {
      var b;
      var headArgs;
      var proxy;
      return "string" == typeof c && (b = p[c], c = p, p = b), jQuery.isFunction(p) ? (headArgs = slice.call(arguments, 2), proxy = function() {
        return p.apply(c || this, headArgs.concat(slice.call(arguments)));
      }, proxy.guid = p.guid = p.guid || jQuery.guid++, proxy) : void 0;
    },
    now : Date.now,
    support : support
  });
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(canCreateDiscussions, p_Interval) {
    class2type["[object " + p_Interval + "]"] = p_Interval.toLowerCase();
  });
  var Sizzle = function(window) {
    /**
     * @param {string} selector
     * @param {!Object} context
     * @param {!Array} results
     * @param {!Array} seed
     * @return {?}
     */
    function Sizzle(selector, context, results, seed) {
      var match;
      var elem;
      var m;
      var nodeType;
      var i;
      var groups;
      var old;
      var nid;
      var newContext;
      var newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], nodeType = context.nodeType, "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) {
        return results;
      }
      if (!seed && documentIsHTML) {
        if (11 !== nodeType && (match = customSelectorReg.exec(selector))) {
          if (m = match[1]) {
            if (9 === nodeType) {
              if (elem = context.getElementById(m), !elem || !elem.parentNode) {
                return results;
              }
              if (elem.id === m) {
                return results.push(elem), results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                return results.push(elem), results;
              }
            }
          } else {
            if (match[2]) {
              return push.apply(results, context.getElementsByTagName(selector)), results;
            }
            if ((m = match[3]) && support.getElementsByClassName) {
              return push.apply(results, context.getElementsByClassName(m)), results;
            }
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
            groups = tokenize(selector);
            if (old = context.getAttribute("id")) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            /** @type {string} */
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            for (; i--;) {
              /** @type {string} */
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = IS_HTML_FRAGMENT.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              return push.apply(results, newContext.querySelectorAll(newSelector)), results;
            } catch (w) {
            } finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * @return {?}
     */
    function createCache() {
      /**
       * @param {string} key
       * @param {?} service
       * @return {?}
       */
      function cache(key, service) {
        return buf.push(key + " ") > Expr.cacheLength && delete cache[buf.shift()], cache[key + " "] = service;
      }
      /** @type {!Array} */
      var buf = [];
      return cache;
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function markFunction(fn) {
      return fn[expando] = true, fn;
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function assert(fn) {
      var e = document.createElement("div");
      try {
        return !!fn(e);
      } catch (n) {
        return false;
      } finally {
        if (e.parentNode) {
          e.parentNode.removeChild(e);
        }
        /** @type {null} */
        e = null;
      }
    }
    /**
     * @param {string} attrs
     * @param {!Function} handler
     * @return {undefined}
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|");
      var i = attrs.length;
      for (; i--;) {
        /** @type {!Function} */
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * @param {!Element} a
     * @param {!Element} b
     * @return {?}
     */
    function siblingCheck(a, b) {
      var cur = b && a;
      var .num_const = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || re) - (~a.sourceIndex || re);
      if (.num_const) {
        return .num_const;
      }
      if (cur) {
        for (; cur = cur.nextSibling;) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * @param {!Object} sessionId
     * @return {?}
     */
    function jQuerify(sessionId) {
      return function(elem) {
        var fiatComplete = elem.nodeName.toLowerCase();
        return "input" === fiatComplete && elem.type === sessionId;
      };
    }
    /**
     * @param {!Object} type
     * @return {?}
     */
    function createButtonPseudo(type) {
      return function(section) {
        var undefined = section.nodeName.toLowerCase();
        return ("input" === undefined || "button" === undefined) && section.type === type;
      };
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function createPositionalPseudo(fn) {
      return markFunction(function(value) {
        return value = +value, markFunction(function(a, b) {
          var prop;
          var nonEnumerableProps = fn([], a.length, value);
          var nonEnumIdx = nonEnumerableProps.length;
          for (; nonEnumIdx--;) {
            if (a[prop = nonEnumerableProps[nonEnumIdx]]) {
              /** @type {boolean} */
              a[prop] = !(b[prop] = a[prop]);
            }
          }
        });
      });
    }
    /**
     * @param {!Node} context
     * @return {?}
     */
    function testContext(context) {
      return context && "undefined" != typeof context.getElementsByTagName && context;
    }
    /**
     * @return {undefined}
     */
    function setFilters() {
    }
    /**
     * @param {!Array} text
     * @return {?}
     */
    function toSelector(text) {
      /** @type {number} */
      var i = 0;
      var l = text.length;
      /** @type {string} */
      var selector = "";
      for (; l > i; i++) {
        /** @type {string} */
        selector = selector + text[i].value;
      }
      return selector;
    }
    /**
     * @param {!Function} matcher
     * @param {!Object} combinator
     * @param {string} base
     * @return {?}
     */
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir;
      var checkNonElements = base && "parentNode" === dir;
      /** @type {number} */
      var doneName = done++;
      return combinator.first ? function(elem, stat, context) {
        for (; elem = elem[dir];) {
          if (1 === elem.nodeType || checkNonElements) {
            return matcher(elem, stat, context);
          }
        }
      } : function(elem, context, xml) {
        var oldCache;
        var outerCache;
        /** @type {!Array} */
        var newCache = [dirruns, doneName];
        if (xml) {
          for (; elem = elem[dir];) {
            if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) {
              return true;
            }
          }
        } else {
          for (; elem = elem[dir];) {
            if (1 === elem.nodeType || checkNonElements) {
              if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return newCache[2] = oldCache[2];
              }
              if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        }
      };
    }
    /**
     * @param {!Object} matchers
     * @return {?}
     */
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        for (; i--;) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    /**
     * @param {string} selector
     * @param {!NodeList} contexts
     * @param {!Array} results
     * @return {?}
     */
    function multipleContexts(selector, contexts, results) {
      /** @type {number} */
      var i = 0;
      var len = contexts.length;
      for (; len > i; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    /**
     * @param {!Array} item
     * @param {!Object} token
     * @param {!Function} f
     * @param {string} index
     * @param {boolean} a
     * @return {?}
     */
    function callback(item, token, f, index, a) {
      var v;
      /** @type {!Array} */
      var r = [];
      /** @type {number} */
      var i = 0;
      var l = item.length;
      /** @type {boolean} */
      var changedToken = null != token;
      for (; l > i; i++) {
        if ((v = item[i]) && (!f || f(v, index, a))) {
          r.push(v);
          if (changedToken) {
            token.push(i);
          }
        }
      }
      return r;
    }
    /**
     * @param {!Function} event
     * @param {!Object} prop
     * @param {!Function} cb
     * @param {!Object} fn
     * @param {!Object} e
     * @param {!Object} path
     * @return {?}
     */
    function render(event, prop, cb, fn, e, path) {
      return fn && !fn[expando] && (fn = render(fn)), e && !e[expando] && (e = render(e, path)), markFunction(function(obj, object, context, res) {
        var b;
        var j;
        var i;
        /** @type {!Array} */
        var rootToken = [];
        /** @type {!Array} */
        var a = [];
        var key = object.length;
        var value = obj || multipleContexts(prop || "*", context.nodeType ? [context] : context, []);
        var v = !event || !obj && prop ? value : callback(value, rootToken, event, context, res);
        var data = cb ? e || (obj ? event : key || fn) ? [] : object : v;
        if (cb && cb(v, data, context, res), fn) {
          b = callback(data, a);
          fn(b, [], context, res);
          j = b.length;
          for (; j--;) {
            if (i = b[j]) {
              /** @type {boolean} */
              data[a[j]] = !(v[a[j]] = i);
            }
          }
        }
        if (obj) {
          if (e || event) {
            if (e) {
              /** @type {!Array} */
              b = [];
              j = data.length;
              for (; j--;) {
                if (i = data[j]) {
                  b.push(v[j] = i);
                }
              }
              e(null, data = [], b, res);
            }
            j = data.length;
            for (; j--;) {
              if ((i = data[j]) && (b = e ? indexOf(obj, i) : rootToken[j]) > -1) {
                /** @type {boolean} */
                obj[b] = !(object[b] = i);
              }
            }
          }
        } else {
          data = callback(data === object ? data.splice(key, data.length) : data);
          if (e) {
            e(null, object, data, res);
          } else {
            push.apply(object, data);
          }
        }
      });
    }
    /**
     * @param {!Array} tokens
     * @return {?}
     */
    function matcherFromTokens(tokens) {
      var checkContext;
      var matcher;
      var j;
      var length = tokens.length;
      var leadingRelative = Expr.relative[tokens[0].type];
      var implicitRelative = leadingRelative || Expr.relative[" "];
      /** @type {number} */
      var i = leadingRelative ? 1 : 0;
      var matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true);
      var matchAnyContext = addCombinator(function(value) {
        return indexOf(checkContext, value) > -1;
      }, implicitRelative, true);
      /** @type {!Array} */
      var matchers = [function(elem, context, xml) {
        var r = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        return checkContext = null, r;
      }];
      for (; length > i; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          /** @type {!Array} */
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            /** @type {number} */
            j = ++i;
            for (; length > j && !Expr.relative[tokens[j].type]; j++) {
            }
            return render(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value : " " === tokens[i - 2].type ? "*" : ""
            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), length > j && matcherFromTokens(tokens = tokens.slice(j)), length > j && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    /**
     * @param {!Array} elementMatchers
     * @param {!Array} setMatchers
     * @return {?}
     */
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      /** @type {boolean} */
      var bySet = setMatchers.length > 0;
      /** @type {boolean} */
      var error = elementMatchers.length > 0;
      /**
       * @param {!Function} message
       * @param {string} node
       * @param {?} xml
       * @param {!Array} results
       * @param {!Object} context
       * @return {?}
       */
      var superMatcher = function(message, node, xml, results, context) {
        var elem;
        var j;
        var matcher;
        /** @type {number} */
        var matchedCount = 0;
        /** @type {string} */
        var i = "0";
        var unmatched = message && [];
        /** @type {!Array} */
        var data = [];
        var contextBackup = outermostContext;
        var content = message || error && Expr.find.TAG("*", context);
        var dirrunsUnique = dirruns = dirruns + (null == contextBackup ? 1 : Math.random() || 0.1);
        var content_length = content.length;
        if (context) {
          outermostContext = node !== document && node;
        }
        for (; i !== content_length && null != (elem = content[i]); i++) {
          if (error && elem) {
            /** @type {number} */
            j = 0;
            for (; matcher = elementMatchers[j++];) {
              if (matcher(elem, node, xml)) {
                results.push(elem);
                break;
              }
            }
            if (context) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (message) {
              unmatched.push(elem);
            }
          }
        }
        if (matchedCount = matchedCount + i, bySet && i !== matchedCount) {
          /** @type {number} */
          j = 0;
          for (; matcher = setMatchers[j++];) {
            matcher(unmatched, data, node, xml);
          }
          if (message) {
            if (matchedCount > 0) {
              for (; i--;) {
                if (!(unmatched[i] || data[i])) {
                  data[i] = pop.call(results);
                }
              }
            }
            data = callback(data);
          }
          push.apply(results, data);
          if (context && !message && data.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        }
        return context && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    var i;
    var support;
    var Expr;
    var print;
    var isNative;
    var tokenize;
    var compile;
    var select;
    var outermostContext;
    var sortInput;
    var n;
    var setDocument;
    var document;
    var docElem;
    var documentIsHTML;
    var rbuggyQSA;
    var rbuggyMatches;
    var matches;
    var contains;
    /** @type {string} */
    var expando = "sizzle" + 1 * new Date;
    var preferredDoc = window.document;
    /** @type {number} */
    var dirruns = 0;
    /** @type {number} */
    var done = 0;
    var classCache = createCache();
    var tokenCache = createCache();
    var compilerCache = createCache();
    /**
     * @param {?} r
     * @param {?} z
     * @return {?}
     */
    var x = function(r, z) {
      return r === z && (n = true), 0;
    };
    /** @type {number} */
    var re = 1 << 31;
    /** @type {function(this:Object, *): boolean} */
    var hasOwn = {}.hasOwnProperty;
    /** @type {!Array} */
    var arr = [];
    /** @type {function(this:IArrayLike<T>): T} */
    var pop = arr.pop;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var j = arr.push;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var push = arr.push;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = arr.slice;
    /**
     * @param {string} list
     * @param {!Object} value
     * @return {?}
     */
    var indexOf = function(list, value) {
      /** @type {number} */
      var i = 0;
      var l = list.length;
      for (; l > i; i++) {
        if (list[i] === value) {
          return i;
        }
      }
      return -1;
    };
    /** @type {string} */
    var value = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
    /** @type {string} */
    var _test = "[\\x20\\t\\r\\n\\f]";
    /** @type {string} */
    var characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+";
    /** @type {string} */
    var identifier = characterEncoding.replace("w", "w#");
    /** @type {string} */
    var _end2 = "\\[" + _test + "*(" + characterEncoding + ")(?:" + _test + "*([*^$|!~]?=)" + _test + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + _test + "*\\]";
    /** @type {string} */
    var pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + _end2 + ")*)|.*)\\)|)";
    /** @type {!RegExp} */
    var entityEscapeRegExp = new RegExp(_test + "+", "g");
    /** @type {!RegExp} */
    var rtrim = new RegExp("^" + _test + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _test + "+$", "g");
    /** @type {!RegExp} */
    var chunker = new RegExp("^" + _test + "*," + _test + "*");
    /** @type {!RegExp} */
    var rcomma = new RegExp("^" + _test + "*([>+~]|" + _test + ")" + _test + "*");
    /** @type {!RegExp} */
    var rattributeQuotes = new RegExp("=" + _test + "*([^\\]'\"]*?)" + _test + "*\\]", "g");
    /** @type {!RegExp} */
    var rpseudo = new RegExp(pseudos);
    /** @type {!RegExp} */
    var ridentifier = new RegExp("^" + identifier + "$");
    var matchExpr = {
      ID : new RegExp("^#(" + characterEncoding + ")"),
      CLASS : new RegExp("^\\.(" + characterEncoding + ")"),
      TAG : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
      ATTR : new RegExp("^" + _end2),
      PSEUDO : new RegExp("^" + pseudos),
      CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _test + "*(even|odd|(([+-]|)(\\d*)n|)" + _test + "*(?:([+-]|)" + _test + "*(\\d+)|))" + _test + "*\\)|)", "i"),
      bool : new RegExp("^(?:" + value + ")$", "i"),
      needsContext : new RegExp("^" + _test + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _test + "*((?:-\\d)?\\d*)" + _test + "*\\)|)(?=[^-]|$)", "i")
    };
    /** @type {!RegExp} */
    var inputNodeNames = /^(?:input|select|textarea|button)$/i;
    /** @type {!RegExp} */
    var rnoType = /^h\d$/i;
    /** @type {!RegExp} */
    var rnative = /^[^{]+\{\s*\[native \w/;
    /** @type {!RegExp} */
    var customSelectorReg = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    /** @type {!RegExp} */
    var IS_HTML_FRAGMENT = /[+~]/;
    /** @type {!RegExp} */
    var rescape = /'|\\/g;
    /** @type {!RegExp} */
    var index = new RegExp("\\\\([\\da-f]{1,6}" + _test + "?|(" + _test + ")|.)", "ig");
    /**
     * @param {?} v
     * @param {string} n
     * @param {boolean} escapedWhitespace
     * @return {?}
     */
    var name = function(v, n, escapedWhitespace) {
      /** @type {number} */
      var high = "0x" + n - 65536;
      return high !== high || escapedWhitespace ? n : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
    };
    /**
     * @return {undefined}
     */
    var fn = function() {
      setDocument();
    };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (Ae) {
      push = {
        apply : arr.length ? function(obj, name) {
          j.apply(obj, slice.call(name));
        } : function(obj, options) {
          var i = obj.length;
          /** @type {number} */
          var x = 0;
          for (; obj[i++] = options[x++];) {
          }
          /** @type {number} */
          obj.length = i - 1;
        }
      };
    }
    support = Sizzle.support = {};
    /** @type {function(!Object): ?} */
    isNative = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? "HTML" !== documentElement.nodeName : false;
    };
    /** @type {function(!Object): ?} */
    setDocument = Sizzle.setDocument = function(node) {
      var valueIsArray;
      var win;
      var doc = node ? node.ownerDocument || node : preferredDoc;
      return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, win = doc.defaultView, win && win !== win.top && (win.addEventListener ? win.addEventListener("unload", fn, false) : win.attachEvent && win.attachEvent("onunload", fn)), documentIsHTML = !isNative(doc), support.attributes = assert(function(elm) {
        return elm.className = "i", !elm.getAttribute("className");
      }), support.getElementsByTagName = assert(function(testee) {
        return testee.appendChild(doc.createComment("")), !testee.getElementsByTagName("*").length;
      }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(body) {
        return docElem.appendChild(body).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
      }), support.getById ? (Expr.find.ID = function(elem, context) {
        if ("undefined" != typeof context.getElementById && documentIsHTML) {
          var item = context.getElementById(elem);
          return item && item.parentNode ? [item] : [];
        }
      }, Expr.filter.ID = function(elem) {
        var i = elem.replace(index, name);
        return function(e) {
          return e.getAttribute("id") === i;
        };
      }) : (delete Expr.find.ID, Expr.filter.ID = function(elem) {
        var content = elem.replace(index, name);
        return function(elem) {
          var token = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
          return token && token.value === content;
        };
      }), Expr.find.TAG = support.getElementsByTagName ? function(v, view) {
        return "undefined" != typeof view.getElementsByTagName ? view.getElementsByTagName(v) : support.qsa ? view.querySelectorAll(v) : void 0;
      } : function(token, elem) {
        var first;
        /** @type {!Array} */
        var tmp = [];
        /** @type {number} */
        var i = 0;
        var results = elem.getElementsByTagName(token);
        if ("*" === token) {
          for (; first = results[i++];) {
            if (1 === first.nodeType) {
              tmp.push(first);
            }
          }
          return tmp;
        }
        return results;
      }, Expr.find.CLASS = support.getElementsByClassName && function(l, docDom) {
        return documentIsHTML ? docDom.getElementsByClassName(l) : void 0;
      }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(container) {
        /** @type {string} */
        docElem.appendChild(container).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>";
        if (container.querySelectorAll("[msallowcapture^='']").length) {
          rbuggyQSA.push("[*^$]=" + _test + "*(?:''|\"\")");
        }
        if (!container.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + _test + "*(?:value|" + value + ")");
        }
        if (!container.querySelectorAll("[id~=" + expando + "-]").length) {
          rbuggyQSA.push("~=");
        }
        if (!container.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }
        if (!container.querySelectorAll("a#" + expando + "+*").length) {
          rbuggyQSA.push(".#.+[+~]");
        }
      }), assert(function(e) {
        var element = doc.createElement("input");
        element.setAttribute("type", "hidden");
        e.appendChild(element).setAttribute("name", "D");
        if (e.querySelectorAll("[name=d]").length) {
          rbuggyQSA.push("name" + _test + "*[*^$|!~]?=");
        }
        if (!e.querySelectorAll(":enabled").length) {
          rbuggyQSA.push(":enabled", ":disabled");
        }
        e.querySelectorAll("*,:x");
        rbuggyQSA.push(",.*:");
      })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
        support.disconnectedMatch = matches.call(el, "div");
        matches.call(el, "[s!='']:x");
        rbuggyMatches.push("!=", pseudos);
      }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), valueIsArray = rnative.test(docElem.compareDocumentPosition), contains = valueIsArray || rnative.test(docElem.contains) ? function(a, n) {
        var name = 9 === a.nodeType ? a.documentElement : a;
        var b = n && n.parentNode;
        return a === b || !(!b || 1 !== b.nodeType || !(name.contains ? name.contains(b) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(b)));
      } : function(a, b) {
        if (b) {
          for (; b = b.parentNode;) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      }, x = valueIsArray ? function(a, b) {
        if (a === b) {
          return n = true, 0;
        }
        /** @type {number} */
        var idx = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return idx ? idx : (idx = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & idx || !support.sortDetached && b.compareDocumentPosition(a) === idx ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & idx ? -1 : 1);
      } : function(a, b) {
        if (a === b) {
          return n = true, 0;
        }
        var cur;
        /** @type {number} */
        var i = 0;
        var aup = a.parentNode;
        var bup = b.parentNode;
        /** @type {!Array} */
        var ap = [a];
        /** @type {!Array} */
        var bp = [b];
        if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        if (aup === bup) {
          return siblingCheck(a, b);
        }
        /** @type {!HTMLElement} */
        cur = a;
        for (; cur = cur.parentNode;) {
          ap.unshift(cur);
        }
        /** @type {!HTMLElement} */
        cur = b;
        for (; cur = cur.parentNode;) {
          bp.unshift(cur);
        }
        for (; ap[i] === bp[i];) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      }, doc) : document;
    };
    /**
     * @param {!Function} expr
     * @param {!Array} set
     * @return {?}
     */
    Sizzle.matches = function(expr, set) {
      return Sizzle(expr, null, null, set);
    };
    /**
     * @param {!Object} elem
     * @param {string} expr
     * @return {?}
     */
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) {
            return ret;
          }
        } catch (s) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    /**
     * @param {!Object} context
     * @param {!Object} item
     * @return {?}
     */
    Sizzle.contains = function(context, item) {
      return (context.ownerDocument || context) !== document && setDocument(context), contains(context, item);
    };
    /**
     * @param {!Object} elem
     * @param {string} name
     * @return {?}
     */
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()];
      var val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Sizzle.error = function(obj) {
      throw new Error("Syntax error, unrecognized expression: " + obj);
    };
    /**
     * @param {!Array} arr
     * @return {?}
     */
    Sizzle.uniqueSort = function(arr) {
      var v;
      /** @type {!Array} */
      var indices = [];
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var j = 0;
      if (n = !support.detectDuplicates, sortInput = !support.sortStable && arr.slice(0), arr.sort(x), n) {
        for (; v = arr[j++];) {
          if (v === arr[j]) {
            /** @type {number} */
            i = indices.push(j);
          }
        }
        for (; i--;) {
          arr.splice(indices[i], 1);
        }
      }
      return sortInput = null, arr;
    };
    /** @type {function(!Object): ?} */
    print = Sizzle.getText = function(elem) {
      var key;
      /** @type {string} */
      var output = "";
      /** @type {number} */
      var i = 0;
      var type = elem.nodeType;
      if (type) {
        if (1 === type || 9 === type || 11 === type) {
          if ("string" == typeof elem.textContent) {
            return elem.textContent;
          }
          elem = elem.firstChild;
          for (; elem; elem = elem.nextSibling) {
            output = output + print(elem);
          }
        } else {
          if (3 === type || 4 === type) {
            return elem.nodeValue;
          }
        }
      } else {
        for (; key = elem[i++];) {
          output = output + print(key);
        }
      }
      return output;
    };
    Expr = Sizzle.selectors = {
      cacheLength : 50,
      createPseudo : markFunction,
      match : matchExpr,
      attrHandle : {},
      find : {},
      relative : {
        ">" : {
          dir : "parentNode",
          first : true
        },
        " " : {
          dir : "parentNode"
        },
        "+" : {
          dir : "previousSibling",
          first : true
        },
        "~" : {
          dir : "previousSibling"
        }
      },
      preFilter : {
        ATTR : function(result) {
          return result[1] = result[1].replace(index, name), result[3] = (result[3] || result[4] || result[5] || "").replace(index, name), "~=" === result[2] && (result[3] = " " + result[3] + " "), result.slice(0, 4);
        },
        CHILD : function(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match;
        },
        PSEUDO : function(match) {
          var excess;
          var unquoted = !match[6] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
        }
      },
      filter : {
        TAG : function(elem) {
          var nodeName = elem.replace(index, name).toLowerCase();
          return "*" === elem ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        CLASS : function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + _test + ")" + className + "(" + _test + "|$)")) && classCache(className, function(e) {
            return pattern.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR : function(name, string, value) {
          return function(elem) {
            var key = Sizzle.attr(elem, name);
            return null == key ? "!=" === string : string ? (key = key + "", "=" === string ? key === value : "!=" === string ? key !== value : "^=" === string ? value && 0 === key.indexOf(value) : "*=" === string ? value && key.indexOf(value) > -1 : "$=" === string ? value && key.slice(-value.length) === value : "~=" === string ? (" " + key.replace(entityEscapeRegExp, " ") + " ").indexOf(value) > -1 : "|=" === string ? key === value || key.slice(0, value.length + 1) === value + "-" : false) : true;
          };
        },
        CHILD : function(type, what, argument, first, last) {
          /** @type {boolean} */
          var simple = "nth" !== type.slice(0, 3);
          /** @type {boolean} */
          var forward = "last" !== type.slice(-4);
          /** @type {boolean} */
          var isStrict = "of-type" === what;
          return 1 === first && 0 === last ? function(tplDiv) {
            return !!tplDiv.parentNode;
          } : function(elem, b, canCreateDiscussions) {
            var cache;
            var outerCache;
            var node;
            var diff;
            var nodeIndex;
            var start;
            /** @type {string} */
            var dir = simple !== forward ? "nextSibling" : "previousSibling";
            var parent = elem.parentNode;
            var iteratedVal = isStrict && elem.nodeName.toLowerCase();
            /** @type {boolean} */
            var useCache = !canCreateDiscussions && !isStrict;
            if (parent) {
              if (simple) {
                for (; dir;) {
                  /** @type {!Object} */
                  node = elem;
                  for (; node = node[dir];) {
                    if (isStrict ? node.nodeName.toLowerCase() === iteratedVal : 1 === node.nodeType) {
                      return false;
                    }
                  }
                  /** @type {(boolean|string)} */
                  start = dir = "only" === type && !start && "nextSibling";
                }
                return true;
              }
              if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                  if (1 === node.nodeType && ++diff && node === elem) {
                    /** @type {!Array} */
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                  diff = cache[1];
                } else {
                  for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((isStrict ? node.nodeName.toLowerCase() !== iteratedVal : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem));) {
                  }
                }
              }
              return diff = diff - last, diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO : function(pseudo, argument) {
          var args;
          var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
            var idx;
            var matched = fn(seed, argument);
            var i = matched.length;
            for (; i--;) {
              idx = indexOf(seed, matched[i]);
              /** @type {boolean} */
              seed[idx] = !(matches[idx] = matched[i]);
            }
          }) : function(responce) {
            return fn(responce, 0, args);
          }) : fn;
        }
      },
      pseudos : {
        not : markFunction(function(selector) {
          /** @type {!Array} */
          var a = [];
          /** @type {!Array} */
          var results = [];
          var matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(a, outArray, s, context) {
            var r;
            var result = matcher(a, null, context, []);
            var i = a.length;
            for (; i--;) {
              if (r = result[i]) {
                /** @type {boolean} */
                a[i] = !(outArray[i] = r);
              }
            }
          }) : function(sNewObjName, canCreateDiscussions, context) {
            return a[0] = sNewObjName, matcher(a, null, context, results), a[0] = null, !results.pop();
          };
        }),
        has : markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains : markFunction(function(row) {
          return row = row.replace(index, name), function(elem) {
            return (elem.textContent || elem.innerText || print(elem)).indexOf(row) > -1;
          };
        }),
        lang : markFunction(function(lang) {
          return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(index, name).toLowerCase(), function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
              }
            } while ((elem = elem.parentNode) && 1 === elem.nodeType);
            return false;
          };
        }),
        target : function(obj) {
          var charListNotLatin = window.location && window.location.hash;
          return charListNotLatin && charListNotLatin.slice(1) === obj.id;
        },
        root : function(elem) {
          return elem === docElem;
        },
        focus : function(obj) {
          return obj === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(obj.type || obj.href || ~obj.tabIndex);
        },
        enabled : function(elem) {
          return elem.disabled === false;
        },
        disabled : function(elem) {
          return elem.disabled === true;
        },
        checked : function(elem) {
          var custom = elem.nodeName.toLowerCase();
          return "input" === custom && !!elem.checked || "option" === custom && !!elem.selected;
        },
        selected : function(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === true;
        },
        empty : function(child) {
          child = child.firstChild;
          for (; child; child = child.nextSibling) {
            if (child.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent : function(obj) {
          return !Expr.pseudos.empty(obj);
        },
        header : function(elem) {
          return rnoType.test(elem.nodeName);
        },
        input : function(target) {
          return inputNodeNames.test(target.nodeName);
        },
        button : function(elem) {
          var left = elem.nodeName.toLowerCase();
          return "input" === left && "button" === elem.type || "button" === left;
        },
        text : function(elem) {
          var EXT;
          return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (EXT = elem.getAttribute("type")) || "text" === EXT.toLowerCase());
        },
        first : createPositionalPseudo(function() {
          return [0];
        }),
        last : createPositionalPseudo(function(canCreateDiscussions, isSlidingUp) {
          return [isSlidingUp - 1];
        }),
        eq : createPositionalPseudo(function(canCreateDiscussions, dt, max) {
          return [0 > max ? max + dt : max];
        }),
        even : createPositionalPseudo(function(allSwitches, sNext) {
          /** @type {number} */
          var s = 0;
          for (; sNext > s; s = s + 2) {
            allSwitches.push(s);
          }
          return allSwitches;
        }),
        odd : createPositionalPseudo(function(allSwitches, sNext) {
          /** @type {number} */
          var s = 1;
          for (; sNext > s; s = s + 2) {
            allSwitches.push(s);
          }
          return allSwitches;
        }),
        lt : createPositionalPseudo(function(matchingTags, dt, max) {
          var tag = 0 > max ? max + dt : max;
          for (; --tag >= 0;) {
            matchingTags.push(tag);
          }
          return matchingTags;
        }),
        gt : createPositionalPseudo(function(matchingTags, dt, max) {
          var tag = 0 > max ? max + dt : max;
          for (; ++tag < dt;) {
            matchingTags.push(tag);
          }
          return matchingTags;
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    for (i in{
      radio : true,
      checkbox : true,
      file : true,
      password : true,
      image : true
    }) {
      Expr.pseudos[i] = jQuerify(i);
    }
    for (i in{
      submit : true,
      reset : true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched;
      var match;
      var tokens;
      var type;
      var soFar;
      var groups;
      var preFilters;
      var cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      /** @type {(Object|string)} */
      soFar = selector;
      /** @type {!Array} */
      groups = [];
      preFilters = Expr.preFilter;
      for (; soFar;) {
        if (!matched || (match = chunker.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        /** @type {boolean} */
        matched = false;
        if (match = rcomma.exec(soFar)) {
          /** @type {string} */
          matched = match.shift();
          tokens.push({
            value : matched,
            type : match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if (!(!(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value : matched,
              type : type,
              matches : match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }, compile = Sizzle.compile = function(selector, group) {
      var i;
      /** @type {!Array} */
      var setMatchers = [];
      /** @type {!Array} */
      var elementMatchers = [];
      var cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        for (; i--;) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        /** @type {string} */
        cached.selector = selector;
      }
      return cached;
    }, select = Sizzle.select = function(selector, context, result, seed) {
      var i;
      var tokens;
      var token;
      var type;
      var find;
      /** @type {(!Function|boolean)} */
      var compiled = "function" == typeof selector && selector;
      var match = !seed && tokenize(selector = compiled.selector || selector);
      if (result = result || [], 1 === match.length) {
        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
          if (context = (Expr.find.ID(token.matches[0].replace(index, name), context) || [])[0], !context) {
            return result;
          }
          if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        for (; i-- && (token = tokens[i], !Expr.relative[type = token.type]);) {
          if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(index, name), IS_HTML_FRAGMENT.test(tokens[0].type) && testContext(context.parentNode) || context))) {
            if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) {
              return push.apply(result, seed), result;
            }
            break;
          }
        }
      }
      return (compiled || compile(selector, match))(seed, context, !documentIsHTML, result, IS_HTML_FRAGMENT.test(selector) && testContext(context.parentNode) || context), result;
    }, support.sortStable = expando.split("").sort(x).join("") === expando, support.detectDuplicates = !!n, setDocument(), support.sortDetached = assert(function(div1) {
      return 1 & div1.compareDocumentPosition(document.createElement("div"));
    }), assert(function(aItem) {
      return aItem.innerHTML = "<a href='#'></a>", "#" === aItem.firstChild.getAttribute("href");
    }) || addHandle("type|href|height|width", function(t, x, res) {
      return res ? void 0 : t.getAttribute(x, "type" === x.toLowerCase() ? 1 : 2);
    }), support.attributes && assert(function(aItem) {
      return aItem.innerHTML = "<input/>", aItem.firstChild.setAttribute("value", ""), "" === aItem.firstChild.getAttribute("value");
    }) || addHandle("value", function(object, n, directory) {
      return directory || "input" !== object.nodeName.toLowerCase() ? void 0 : object.defaultValue;
    }), assert(function(e) {
      return null == e.getAttribute("disabled");
    }) || addHandle(value, function(elem, name, canCreateDiscussions) {
      var val;
      return canCreateDiscussions ? void 0 : elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    }), Sizzle;
  }(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  /** @type {!RegExp} */
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  /** @type {!RegExp} */
  var contribRegex = /^.[^:#\[\.,]*$/;
  /**
   * @param {!Function} expr
   * @param {!Object} elems
   * @param {!Object} not
   * @return {?}
   */
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(nodeToInspect) {
      return 1 === nodeToInspect.nodeType;
    }));
  };
  jQuery.fn.extend({
    find : function(selector) {
      var i;
      var len = this.length;
      /** @type {!Array} */
      var ret = [];
      var self = this;
      if ("string" != typeof selector) {
        return this.pushStack(jQuery(selector).filter(function() {
          /** @type {number} */
          i = 0;
          for (; len > i; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      /** @type {number} */
      i = 0;
      for (; len > i; i++) {
        jQuery.find(selector, self[i], ret);
      }
      return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret;
    },
    filter : function(val) {
      return this.pushStack(winnow(this, val || [], false));
    },
    not : function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is : function(arg) {
      return !!winnow(this, "string" == typeof arg && rneedsContext.test(arg) ? jQuery(arg) : arg || [], false).length;
    }
  });
  var rootjQuery;
  /** @type {!RegExp} */
  var customSelectorReg = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  /** @type {function(string, ?): ?} */
  var init = jQuery.fn.init = function(selector, context) {
    var match;
    var emement;
    if (!selector) {
      return this;
    }
    if ("string" == typeof selector) {
      if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : customSelectorReg.exec(selector), !match || !match[1] && context) {
        return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
      }
      if (match[1]) {
        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
          for (match in context) {
            if (jQuery.isFunction(this[match])) {
              this[match](context[match]);
            } else {
              this.attr(match, context[match]);
            }
          }
        }
        return this;
      }
      return emement = document.getElementById(match[2]), emement && emement.parentNode && (this.length = 1, this[0] = emement), this.context = document, this.selector = selector, this;
    }
    return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
  };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  /** @type {!RegExp} */
  var testRxp = /^(?:parents|prev(?:Until|All))/;
  var guaranteedUnique = {
    children : true,
    contents : true,
    next : true,
    prev : true
  };
  jQuery.extend({
    dir : function(elem, dir, name) {
      /** @type {!Array} */
      var matched = [];
      /** @type {boolean} */
      var o = void 0 !== name;
      for (; (elem = elem[dir]) && 9 !== elem.nodeType;) {
        if (1 === elem.nodeType) {
          if (o && jQuery(elem).is(name)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling : function(next, cur) {
      /** @type {!Array} */
      var result = [];
      for (; next; next = next.nextSibling) {
        if (1 === next.nodeType && next !== cur) {
          result.push(next);
        }
      }
      return result;
    }
  });
  jQuery.fn.extend({
    has : function(val) {
      var obj = jQuery(val, this);
      var length = obj.length;
      return this.filter(function() {
        /** @type {number} */
        var i = 0;
        for (; length > i; i++) {
          if (jQuery.contains(this, obj[i])) {
            return true;
          }
        }
      });
    },
    closest : function(selector, context) {
      var node;
      /** @type {number} */
      var offset = 0;
      var count = this.length;
      /** @type {!Array} */
      var ret = [];
      var a = rneedsContext.test(selector) || "string" != typeof selector ? jQuery(selector, context || this.context) : 0;
      for (; count > offset; offset++) {
        node = this[offset];
        for (; node && node !== context; node = node.parentNode) {
          if (node.nodeType < 11 && (a ? a.index(node) > -1 : 1 === node.nodeType && jQuery.find.matchesSelector(node, selector))) {
            ret.push(node);
            break;
          }
        }
      }
      return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
    },
    index : function(node) {
      return node ? "string" == typeof node ? filter.call(jQuery(node), this[0]) : filter.call(this, node.jquery ? node[0] : node) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add : function(name, options) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(name, options))));
    },
    addBack : function(selector) {
      return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  jQuery.each({
    parent : function(obj) {
      var e = obj.parentNode;
      return e && 11 !== e.nodeType ? e : null;
    },
    parents : function(elem) {
      return jQuery.dir(elem, "parentNode");
    },
    parentsUntil : function(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until);
    },
    next : function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev : function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll : function(elem) {
      return jQuery.dir(elem, "nextSibling");
    },
    prevAll : function(elem) {
      return jQuery.dir(elem, "previousSibling");
    },
    nextUntil : function(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until);
    },
    prevUntil : function(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until);
    },
    siblings : function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children : function(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents : function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, n) {
    /**
     * @param {string} s
     * @param {!Object} target
     * @return {?}
     */
    jQuery.fn[name] = function(s, target) {
      var data = jQuery.map(this, n, s);
      return "Until" !== name.slice(-5) && (target = s), target && "string" == typeof target && (data = jQuery.filter(target, data)), this.length > 1 && (guaranteedUnique[name] || jQuery.unique(data), testRxp.test(name) && data.reverse()), this.pushStack(data);
    };
  });
  /** @type {!RegExp} */
  var rnotwhite = /\S+/g;
  var optionsCache = {};
  /**
   * @param {!Object} options
   * @return {?}
   */
  jQuery.Callbacks = function(options) {
    options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory;
    var process;
    var serializer;
    var min;
    var n;
    var max;
    /** @type {!Array} */
    var val = [];
    /** @type {(Array|boolean)} */
    var list = !options.once && [];
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    var fire = function(data) {
      memory = options.memory && data;
      /** @type {boolean} */
      process = true;
      max = min || 0;
      /** @type {number} */
      min = 0;
      n = val.length;
      /** @type {boolean} */
      serializer = true;
      for (; val && n > max; max++) {
        if (val[max].apply(data[0], data[1]) === false && options.stopOnFalse) {
          /** @type {boolean} */
          memory = false;
          break;
        }
      }
      /** @type {boolean} */
      serializer = false;
      if (val) {
        if (list) {
          if (list.length) {
            fire(list.shift());
          }
        } else {
          if (memory) {
            /** @type {!Array} */
            val = [];
          } else {
            self.disable();
          }
        }
      }
    };
    var self = {
      add : function() {
        if (val) {
          var y = val.length;
          !function add(args) {
            jQuery.each(args, function(a, value) {
              var type = jQuery.type(value);
              if ("function" === type) {
                if (!(options.unique && self.has(value))) {
                  val.push(value);
                }
              } else {
                if (value && value.length && "string" !== type) {
                  add(value);
                }
              }
            });
          }(arguments);
          if (serializer) {
            n = val.length;
          } else {
            if (memory) {
              min = y;
              fire(memory);
            }
          }
        }
        return this;
      },
      remove : function() {
        return val && jQuery.each(arguments, function(i, r) {
          var index;
          for (; (index = jQuery.inArray(r, val, index)) > -1;) {
            val.splice(index, 1);
            if (serializer) {
              if (n >= index) {
                n--;
              }
              if (max >= index) {
                max--;
              }
            }
          }
        }), this;
      },
      has : function(elem) {
        return elem ? jQuery.inArray(elem, val) > -1 : !(!val || !val.length);
      },
      empty : function() {
        return val = [], n = 0, this;
      },
      disable : function() {
        return val = list = memory = void 0, this;
      },
      disabled : function() {
        return !val;
      },
      lock : function() {
        return list = void 0, memory || self.disable(), this;
      },
      locked : function() {
        return !list;
      },
      fireWith : function(context, args) {
        return !val || process && !list || (args = args || [], args = [context, args.slice ? args.slice() : args], serializer ? list.push(args) : fire(args)), this;
      },
      fire : function() {
        return self.fireWith(this, arguments), this;
      },
      fired : function() {
        return !!process;
      }
    };
    return self;
  };
  jQuery.extend({
    Deferred : function(func) {
      /** @type {!Array} */
      var d = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]];
      /** @type {string} */
      var state = "pending";
      var promise = {
        state : function() {
          return state;
        },
        always : function() {
          return deferred.done(arguments).fail(arguments), this;
        },
        then : function() {
          /** @type {!Arguments} */
          var fns = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(d, function(i, tuple) {
              var fn = jQuery.isFunction(fns[i]) && fns[i];
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                } else {
                  newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                }
              });
            });
            /** @type {null} */
            fns = null;
          }).promise();
        },
        promise : function(context) {
          return null != context ? jQuery.extend(context, promise) : promise;
        }
      };
      var deferred = {};
      return promise.pipe = promise.then, jQuery.each(d, function(x2, tuple) {
        var list = tuple[2];
        var stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, d[1 ^ x2][2].disable, d[2][2].lock);
        }
        /**
         * @return {?}
         */
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    when : function(subordinate) {
      var progressValues;
      var progressContexts;
      var resolveContexts;
      /** @type {number} */
      var i = 0;
      /** @type {!Array<?>} */
      var resolveValues = slice.call(arguments);
      /** @type {number} */
      var length = resolveValues.length;
      /** @type {number} */
      var index = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0;
      var deferred = 1 === index ? subordinate : jQuery.Deferred();
      /**
       * @param {number} i
       * @param {number} ctx
       * @param {number} val
       * @return {?}
       */
      var updateFn = function(i, ctx, val) {
        return function(value) {
          ctx[i] = this;
          val[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (val === progressValues) {
            deferred.notifyWith(ctx, val);
          } else {
            if (!--index) {
              deferred.resolveWith(ctx, val);
            }
          }
        };
      };
      if (length > 1) {
        /** @type {!Array} */
        progressValues = new Array(length);
        /** @type {!Array} */
        progressContexts = new Array(length);
        /** @type {!Array} */
        resolveContexts = new Array(length);
        for (; length > i; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues));
          } else {
            --index;
          }
        }
      }
      return index || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
    }
  });
  var readyList;
  /**
   * @param {?} key
   * @return {?}
   */
  jQuery.fn.ready = function(key) {
    return jQuery.ready.promise().done(key), this;
  };
  jQuery.extend({
    isReady : false,
    readyWait : 1,
    holdReady : function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready : function(wait) {
      if (!(wait === true ? --jQuery.readyWait : jQuery.isReady)) {
        /** @type {boolean} */
        jQuery.isReady = true;
        if (!(wait !== true && --jQuery.readyWait > 0)) {
          readyList.resolveWith(document, [jQuery]);
          if (jQuery.fn.triggerHandler) {
            jQuery(document).triggerHandler("ready");
            jQuery(document).off("ready");
          }
        }
      }
    }
  });
  /**
   * @param {string} obj
   * @return {?}
   */
  jQuery.ready.promise = function(obj) {
    return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", $__jsx_onload, false), window.addEventListener("load", $__jsx_onload, false))), readyList.promise(obj);
  };
  jQuery.ready.promise();
  /** @type {function(?, !Function, ?, ?, number, string, boolean): ?} */
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    /** @type {number} */
    var i = 0;
    var len = elems.length;
    /** @type {boolean} */
    var bulk = null == key;
    if ("object" === jQuery.type(key)) {
      /** @type {boolean} */
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else {
      if (void 0 !== value && (chainable = true, jQuery.isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, done, value) {
        return bulk.call(jQuery(elem), value);
      })), fn)) {
        for (; len > i; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  /**
   * @param {!Object} elem
   * @return {?}
   */
  jQuery.acceptData = function(elem) {
    return 1 === elem.nodeType || 9 === elem.nodeType || !+elem.nodeType;
  };
  /** @type {number} */
  Data.uid = 1;
  /** @type {function(!Object): ?} */
  Data.accepts = jQuery.acceptData;
  Data.prototype = {
    key : function(owner) {
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {};
      var unlock = owner[this.expando];
      if (!unlock) {
        /** @type {number} */
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = {
            value : unlock
          };
          Object.defineProperties(owner, descriptor);
        } catch (i) {
          /** @type {number} */
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
    },
    set : function(id, value, element) {
      var i;
      var k = this.key(id);
      var el = this.cache[k];
      if ("string" == typeof value) {
        el[value] = element;
      } else {
        if (jQuery.isEmptyObject(el)) {
          jQuery.extend(this.cache[k], value);
        } else {
          for (i in value) {
            el[i] = value[i];
          }
        }
      }
      return el;
    },
    get : function(name, value) {
      var val = this.cache[this.key(name)];
      return void 0 === value ? val : val[value];
    },
    access : function(obj, key, c) {
      var data;
      return void 0 === key || key && "string" == typeof key && void 0 === c ? (data = this.get(obj, key), void 0 !== data ? data : this.get(obj, jQuery.camelCase(key))) : (this.set(obj, key, c), void 0 !== c ? c : key);
    },
    remove : function(id, key) {
      var i;
      var name;
      var camel;
      var unlock = this.key(id);
      var cache = this.cache[unlock];
      if (void 0 === key) {
        this.cache[unlock] = {};
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            /** @type {!Array} */
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : name.match(rnotwhite) || [];
          }
        }
        i = name.length;
        for (; i--;) {
          delete cache[name[i]];
        }
      }
    },
    hasData : function(node) {
      return !jQuery.isEmptyObject(this.cache[node[this.expando]] || {});
    },
    discard : function(owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  var data_priv = new Data;
  var $ = new Data;
  /** @type {!RegExp} */
  var trueRE = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  /** @type {!RegExp} */
  var dashExpr = /([A-Z])/g;
  jQuery.extend({
    hasData : function(elem) {
      return $.hasData(elem) || data_priv.hasData(elem);
    },
    data : function(obj, key, value) {
      return $.access(obj, key, value);
    },
    removeData : function(name, key) {
      $.remove(name, key);
    },
    _data : function(elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData : function(name, target) {
      data_priv.remove(name, target);
    }
  });
  jQuery.fn.extend({
    data : function(data, val) {
      var i;
      var name;
      var values;
      var value = this[0];
      var wrapped = value && value.attributes;
      if (void 0 === data) {
        if (this.length && (values = $.get(value), 1 === value.nodeType && !data_priv.get(value, "hasDataAttrs"))) {
          i = wrapped.length;
          for (; i--;) {
            if (wrapped[i]) {
              name = wrapped[i].name;
              if (0 === name.indexOf("data-")) {
                name = jQuery.camelCase(name.slice(5));
                set(value, name, values[name]);
              }
            }
          }
          data_priv.set(value, "hasDataAttrs", true);
        }
        return values;
      }
      return "object" == typeof data ? this.each(function() {
        $.set(this, data);
      }) : access(this, function(fn) {
        var state;
        var name = jQuery.camelCase(data);
        if (value && void 0 === fn) {
          if (state = $.get(value, data), void 0 !== state) {
            return state;
          }
          if (state = $.get(value, name), void 0 !== state) {
            return state;
          }
          if (state = set(value, name, void 0), void 0 !== state) {
            return state;
          }
        } else {
          this.each(function() {
            var aggFuncNames = $.get(this, name);
            $.set(this, name, fn);
            if (-1 !== data.indexOf("-") && void 0 !== aggFuncNames) {
              $.set(this, data, fn);
            }
          });
        }
      }, null, val, arguments.length > 1, null, true);
    },
    removeData : function(data) {
      return this.each(function() {
        $.remove(this, data);
      });
    }
  });
  jQuery.extend({
    queue : function(elem, type, data) {
      var q;
      return elem ? (type = (type || "fx") + "queue", q = data_priv.get(elem, type), data && (!q || jQuery.isArray(data) ? q = data_priv.access(elem, type, jQuery.makeArray(data)) : q.push(data)), q || []) : void 0;
    },
    dequeue : function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type);
      var i = queue.length;
      var listener = queue.shift();
      var handle = jQuery._queueHooks(elem, type);
      /**
       * @return {undefined}
       */
      var next = function() {
        jQuery.dequeue(elem, type);
      };
      if ("inprogress" === listener) {
        listener = queue.shift();
        i--;
      }
      if (listener) {
        if ("fx" === type) {
          queue.unshift("inprogress");
        }
        delete handle.stop;
        listener.call(elem, next, handle);
      }
      if (!i && handle) {
        handle.empty.fire();
      }
    },
    _queueHooks : function(elem, type) {
      /** @type {string} */
      var key = type + "queueHooks";
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty : jQuery.Callbacks("once memory").add(function() {
          data_priv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue : function(type, data) {
      /** @type {number} */
      var setter = 2;
      return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if ("fx" === type && "inprogress" !== queue[0]) {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue : function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue : function(type) {
      return this.queue(type || "fx", []);
    },
    promise : function(type, result) {
      var tmp;
      /** @type {number} */
      var a = 1;
      var defer = jQuery.Deferred();
      var elements = this;
      var i = this.length;
      /**
       * @return {undefined}
       */
      var resolve = function() {
        if (!--a) {
          defer.resolveWith(elements, [elements]);
        }
      };
      if ("string" != typeof type) {
        /** @type {string} */
        result = type;
        type = void 0;
      }
      type = type || "fx";
      for (; i--;) {
        tmp = data_priv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          a++;
          tmp.empty.add(resolve);
        }
      }
      return resolve(), defer.promise(result);
    }
  });
  /** @type {string} */
  var FSSource = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  /** @type {!Array} */
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  /**
   * @param {!Object} element
   * @param {!Object} root
   * @return {?}
   */
  var isHidden = function(element, root) {
    return element = root || element, "none" === jQuery.css(element, "display") || !jQuery.contains(element.ownerDocument, element);
  };
  /** @type {!RegExp} */
  var reg = /^(?:checkbox|radio)$/i;
  !function() {
    var text_screen = document.createDocumentFragment();
    var e = text_screen.appendChild(document.createElement("div"));
    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    e.appendChild(input);
    support.checkClone = e.cloneNode(true).cloneNode(true).lastChild.checked;
    /** @type {string} */
    e.innerHTML = "<textarea>x</textarea>";
    /** @type {boolean} */
    support.noCloneChecked = !!e.cloneNode(true).lastChild.defaultValue;
  }();
  /** @type {string} */
  var undefined = "undefined";
  /** @type {boolean} */
  support.focusinBubbles = "onfocusin" in window;
  /** @type {!RegExp} */
  var SIG_PATTERN = /^key/;
  /** @type {!RegExp} */
  var toggleMaximizeElement = /^(?:mouse|pointer|contextmenu)|click/;
  /** @type {!RegExp} */
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  /** @type {!RegExp} */
  var matches = /^([^.]*)(?:\.(.+)|)$/;
  jQuery.event = {
    global : {},
    add : function(name, options, fn, value, selector) {
      var opts;
      var i;
      var tmp;
      var events;
      var j;
      var data;
      var special;
      var handlers;
      var type;
      var m;
      var origType;
      var info = data_priv.get(name);
      if (info) {
        if (fn.handler) {
          /** @type {!Object} */
          opts = fn;
          fn = opts.handler;
          selector = opts.selector;
        }
        if (!fn.guid) {
          /** @type {number} */
          fn.guid = jQuery.guid++;
        }
        if (!(events = info.events)) {
          events = info.events = {};
        }
        if (!(i = info.handle)) {
          /** @type {function(!Object): ?} */
          i = info.handle = function(e) {
            return typeof jQuery !== undefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(name, arguments) : void 0;
          };
        }
        options = (options || "").match(rnotwhite) || [""];
        j = options.length;
        for (; j--;) {
          /** @type {!Array} */
          tmp = matches.exec(options[j]) || [];
          type = origType = tmp[1];
          m = (tmp[2] || "").split(".").sort();
          if (type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            data = jQuery.extend({
              type : type,
              origType : origType,
              data : value,
              handler : fn,
              guid : fn.guid,
              selector : selector,
              needsContext : selector && jQuery.expr.match.needsContext.test(selector),
              namespace : m.join(".")
            }, opts);
            if (!(handlers = events[type])) {
              /** @type {!Array} */
              handlers = events[type] = [];
              /** @type {number} */
              handlers.delegateCount = 0;
              if (!(special.setup && special.setup.call(name, value, m, i) !== false)) {
                if (name.addEventListener) {
                  name.addEventListener(type, i, false);
                }
              }
            }
            if (special.add) {
              special.add.call(name, data);
              if (!data.handler.guid) {
                data.handler.guid = fn.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, data);
            } else {
              handlers.push(data);
            }
            /** @type {boolean} */
            jQuery.event.global[type] = true;
          }
        }
      }
    },
    remove : function(obj, options, fn, selector, data) {
      var j;
      var origCount;
      var tmp;
      var events;
      var i;
      var handleObj;
      var special;
      var handlers;
      var type;
      var v;
      var origType;
      var elemData = data_priv.hasData(obj) && data_priv.get(obj);
      if (elemData && (events = elemData.events)) {
        options = (options || "").match(rnotwhite) || [""];
        i = options.length;
        for (; i--;) {
          if (tmp = matches.exec(options[i]) || [], type = origType = tmp[1], v = (tmp[2] || "").split(".").sort(), type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            for (; j--;) {
              handleObj = handlers[j];
              if (!(!data && origType !== handleObj.origType || fn && fn.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector))) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(obj, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!(special.teardown && special.teardown.call(obj, v, elemData.handle) !== false)) {
                jQuery.removeEvent(obj, type, elemData.handle);
              }
              delete events[type];
            }
          } else {
            for (type in events) {
              jQuery.event.remove(obj, type + options[i], fn, selector, true);
            }
          }
        }
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          data_priv.remove(obj, "events");
        }
      }
    },
    trigger : function(event, value, elem, args) {
      var i;
      var cur;
      var tmp;
      var bubbleType;
      var ontype;
      var handle;
      var special;
      /** @type {!Array} */
      var eventPath = [elem || document];
      var type = hasOwn.call(event, "type") ? event.type : event;
      var h = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (h = type.split("."), type = h.shift(), h.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = args ? 2 : 3, event.namespace = h.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + 
      "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), value = null == value ? [event] : jQuery.makeArray(value, [event]), special = jQuery.event.special[type] || {}, args || !special.trigger || special.trigger.apply(elem, value) !== false)) {
        if (!args && !special.noBubble && !jQuery.isWindow(elem)) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }
        /** @type {number} */
        i = 0;
        for (; (cur = eventPath[i++]) && !event.isPropagationStopped();) {
          event.type = i > 1 ? bubbleType : special.bindType || type;
          handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, value);
          }
          handle = ontype && cur[ontype];
          if (handle && handle.apply && jQuery.acceptData(cur)) {
            event.result = handle.apply(cur, value);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        return event.type = type, args || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), value) !== false || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result;
      }
    },
    dispatch : function(event) {
      event = jQuery.event.fix(event);
      var i;
      var j;
      var code;
      var matched;
      var handleObj;
      /** @type {!Array} */
      var handlerQueue = [];
      /** @type {!Array<?>} */
      var data = slice.call(arguments);
      var handlers = (data_priv.get(this, "events") || {})[event.type] || [];
      var special = jQuery.event.special[event.type] || {};
      if (data[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== false) {
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        /** @type {number} */
        i = 0;
        for (; (matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
          event.currentTarget = matched.elem;
          /** @type {number} */
          j = 0;
          for (; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              code = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, data);
              if (void 0 !== code && (event.result = code) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
        return special.postDispatch && special.postDispatch.call(this, event), event.result;
      }
    },
    handlers : function(event, handlers) {
      var _i;
      var matches;
      var a;
      var e;
      /** @type {!Array} */
      var handlerQueue = [];
      var delegateCount = handlers.delegateCount;
      var cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || "click" !== event.type) {
            /** @type {!Array} */
            matches = [];
            /** @type {number} */
            _i = 0;
            for (; delegateCount > _i; _i++) {
              e = handlers[_i];
              /** @type {string} */
              a = e.selector + " ";
              if (void 0 === matches[a]) {
                matches[a] = e.needsContext ? jQuery(a, this).index(cur) >= 0 : jQuery.find(a, this, null, [cur]).length;
              }
              if (matches[a]) {
                matches.push(e);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem : cur,
                handlers : matches
              });
            }
          }
        }
      }
      return delegateCount < handlers.length && handlerQueue.push({
        elem : this,
        handlers : handlers.slice(delegateCount)
      }), handlerQueue;
    },
    props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks : {},
    keyHooks : {
      props : "char charCode key keyCode".split(" "),
      filter : function(event, key) {
        return null == event.which && (event.which = null != key.charCode ? key.charCode : key.keyCode), event;
      }
    },
    mouseHooks : {
      props : "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter : function(event, params) {
        var eventDoc;
        var doc;
        var body;
        var rotation = params.button;
        return null == event.pageX && null != params.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = params.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = params.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === rotation || (event.which = 
        1 & rotation ? 1 : 2 & rotation ? 3 : 4 & rotation ? 2 : 0), event;
      }
    },
    fix : function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i;
      var prop;
      var copy;
      var type = event.type;
      /** @type {!Object} */
      var originalEvent = event;
      var fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = toggleMaximizeElement.test(type) ? this.mouseHooks : SIG_PATTERN.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      for (; i--;) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special : {
      load : {
        noBubble : true
      },
      focus : {
        trigger : function() {
          return this !== safeActiveElement() && this.focus ? (this.focus(), false) : void 0;
        },
        delegateType : "focusin"
      },
      blur : {
        trigger : function() {
          return this === safeActiveElement() && this.blur ? (this.blur(), false) : void 0;
        },
        delegateType : "focusout"
      },
      click : {
        trigger : function() {
          return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), false) : void 0;
        },
        _default : function(obj) {
          return jQuery.nodeName(obj.target, "a");
        }
      },
      beforeunload : {
        postDispatch : function(event) {
          if (void 0 !== event.result && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate : function(type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type : type,
        isSimulated : true,
        originalEvent : {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  /**
   * @param {!Object} elem
   * @param {string} type
   * @param {!Function} fn
   * @return {undefined}
   */
  jQuery.removeEvent = function(elem, type, fn) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, fn, false);
    }
  };
  /**
   * @param {!Object} src
   * @param {!Object} event
   * @return {?}
   */
  jQuery.Event = function(src, event) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === false ? returnTrue : returnFalse) : this.type = src, event && jQuery.extend(this, event), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = true)) : new jQuery.Event(src, event);
  };
  jQuery.Event.prototype = {
    isDefaultPrevented : returnFalse,
    isPropagationStopped : returnFalse,
    isImmediatePropagationStopped : returnFalse,
    preventDefault : function() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation : function() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation : function() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isImmediatePropagationStopped = returnTrue;
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter : "mouseover",
    mouseleave : "mouseout",
    pointerenter : "pointerover",
    pointerleave : "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType : fix,
      bindType : fix,
      handle : function(event) {
        var _ref12;
        var document = this;
        var target = event.relatedTarget;
        var handleObj = event.handleObj;
        return (!target || target !== document && !jQuery.contains(document, target)) && (event.type = handleObj.origType, _ref12 = handleObj.handler.apply(this, arguments), event.type = fix), _ref12;
      }
    };
  });
  if (!support.focusinBubbles) {
    jQuery.each({
      focus : "focusin",
      blur : "focusout"
    }, function(orig, name) {
      /**
       * @param {!Object} event
       * @return {undefined}
       */
      var handler = function(event) {
        jQuery.event.simulate(name, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[name] = {
        setup : function() {
          var doc = this.ownerDocument || this;
          var o = data_priv.access(doc, name);
          if (!o) {
            doc.addEventListener(orig, handler, true);
          }
          data_priv.access(doc, name, (o || 0) + 1);
        },
        teardown : function() {
          var doc = this.ownerDocument || this;
          /** @type {number} */
          var data = data_priv.access(doc, name) - 1;
          if (data) {
            data_priv.access(doc, name, data);
          } else {
            doc.removeEventListener(orig, handler, true);
            data_priv.remove(doc, name);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on : function(data, name, value, callback, one) {
      var handler;
      var type;
      if ("object" == typeof data) {
        if ("string" != typeof name) {
          value = value || name;
          name = void 0;
        }
        for (type in data) {
          this.on(type, name, value, data[type], one);
        }
        return this;
      }
      if (null == value && null == callback ? (callback = name, value = name = void 0) : null == callback && ("string" == typeof name ? (callback = value, value = void 0) : (callback = value, value = name, name = void 0)), callback === false) {
        /** @type {function(): ?} */
        callback = returnFalse;
      } else {
        if (!callback) {
          return this;
        }
      }
      return 1 === one && (handler = callback, callback = function(t) {
        return jQuery().off(t), handler.apply(this, arguments);
      }, callback.guid = handler.guid || (handler.guid = jQuery.guid++)), this.each(function() {
        jQuery.event.add(this, data, callback, value, name);
      });
    },
    one : function(n, type, fn, delay) {
      return this.on(n, type, fn, delay, 1);
    },
    off : function(event, callback, handler) {
      var handleObj;
      var type;
      if (event && event.preventDefault && event.handleObj) {
        return handleObj = event.handleObj, jQuery(event.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      }
      if ("object" == typeof event) {
        for (type in event) {
          this.off(type, callback, event[type]);
        }
        return this;
      }
      return (callback === false || "function" == typeof callback) && (handler = callback, callback = void 0), handler === false && (handler = returnFalse), this.each(function() {
        jQuery.event.remove(this, event, handler, callback);
      });
    },
    trigger : function(type, obj) {
      return this.each(function() {
        jQuery.event.trigger(type, obj, this);
      });
    },
    triggerHandler : function(type, callback) {
      var value = this[0];
      return value ? jQuery.event.trigger(type, callback, value, true) : void 0;
    }
  });
  /** @type {!RegExp} */
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
  /** @type {!RegExp} */
  var ue = /<([\w:]+)/;
  /** @type {!RegExp} */
  var re_commas = /<|&#?\w+;/;
  /** @type {!RegExp} */
  var reKeyword = /<(?:script|style|link)/i;
  /** @type {!RegExp} */
  var GENERATED_FILES = /checked\s*(?:[^=]|=\s*.checked.)/i;
  /** @type {!RegExp} */
  var opacityRe = /^$|\/(?:java|ecma)script/i;
  /** @type {!RegExp} */
  var receivedOpenEvents = /^true\/(.*)/;
  /** @type {!RegExp} */
  var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  var wrapMap = {
    option : [1, "<select multiple='multiple'>", "</select>"],
    thead : [1, "<table>", "</table>"],
    col : [2, "<table><colgroup>", "</colgroup></table>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default : [0, "", ""]
  };
  /** @type {!Array} */
  wrapMap.optgroup = wrapMap.option;
  /** @type {!Array} */
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  /** @type {!Array} */
  wrapMap.th = wrapMap.td;
  jQuery.extend({
    clone : function(elem, selector, keepData) {
      var i;
      var l;
      var srcElements;
      var destElements;
      var clone = elem.cloneNode(true);
      var inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        /** @type {number} */
        i = 0;
        l = srcElements.length;
        for (; l > i; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (selector) {
        if (keepData) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          /** @type {number} */
          i = 0;
          l = srcElements.length;
          for (; l > i; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone;
    },
    buildFragment : function(result, context, scripts, selection) {
      var elem;
      var tmp;
      var tag;
      var zeroSizeMaxes;
      var idx;
      var zeroSizeMax;
      var fragment = context.createDocumentFragment();
      /** @type {!Array} */
      var results = [];
      /** @type {number} */
      var i = 0;
      var diff = result.length;
      for (; diff > i; i++) {
        if (elem = result[i], elem || 0 === elem) {
          if ("object" === jQuery.type(elem)) {
            jQuery.merge(results, elem.nodeType ? [elem] : elem);
          } else {
            if (re_commas.test(elem)) {
              tmp = tmp || fragment.appendChild(context.createElement("div"));
              tag = (ue.exec(elem) || ["", ""])[1].toLowerCase();
              zeroSizeMaxes = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = zeroSizeMaxes[1] + elem.replace(rxhtmlTag, "<$1></$2>") + zeroSizeMaxes[2];
              zeroSizeMax = zeroSizeMaxes[0];
              for (; zeroSizeMax--;) {
                tmp = tmp.lastChild;
              }
              jQuery.merge(results, tmp.childNodes);
              tmp = fragment.firstChild;
              /** @type {string} */
              tmp.textContent = "";
            } else {
              results.push(context.createTextNode(elem));
            }
          }
        }
      }
      /** @type {string} */
      fragment.textContent = "";
      /** @type {number} */
      i = 0;
      for (; elem = results[i++];) {
        if ((!selection || -1 === jQuery.inArray(elem, selection)) && (idx = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), idx && setGlobalEval(tmp), scripts)) {
          /** @type {number} */
          zeroSizeMax = 0;
          for (; elem = tmp[zeroSizeMax++];) {
            if (opacityRe.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData : function(elems) {
      var data;
      var elem;
      var type;
      var key;
      var special = jQuery.event.special;
      /** @type {number} */
      var i = 0;
      for (; void 0 !== (elem = elems[i]); i++) {
        if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
          if (data.events) {
            for (type in data.events) {
              if (special[type]) {
                jQuery.event.remove(elem, type);
              } else {
                jQuery.removeEvent(elem, type, data.handle);
              }
            }
          }
          if (data_priv.cache[key]) {
            delete data_priv.cache[key];
          }
        }
        delete $.cache[elem[$.expando]];
      }
    }
  });
  jQuery.fn.extend({
    text : function(value) {
      return access(this, function(value) {
        return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove : function(name, options) {
      var elem;
      var elements = name ? jQuery.filter(name, this) : this;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = elements[i]); i++) {
        if (!(options || 1 !== elem.nodeType)) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (options && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty : function() {
      var elem;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = this[i]); i++) {
        if (1 === elem.nodeType) {
          jQuery.cleanData(getAll(elem, false));
          /** @type {string} */
          elem.textContent = "";
        }
      }
      return this;
    },
    clone : function(object, name) {
      return object = null == object ? false : object, name = null == name ? object : name, this.map(function() {
        return jQuery.clone(this, object, name);
      });
    },
    html : function(value) {
      return access(this, function(value) {
        var elem = this[0] || {};
        /** @type {number} */
        var endIdx = 0;
        var i = this.length;
        if (void 0 === value && 1 === elem.nodeType) {
          return elem.innerHTML;
        }
        if ("string" == typeof value && !reKeyword.test(value) && !wrapMap[(ue.exec(value) || ["", ""])[1].toLowerCase()]) {
          /** @type {string} */
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (; i > endIdx; endIdx++) {
              elem = this[endIdx] || {};
              if (1 === elem.nodeType) {
                jQuery.cleanData(getAll(elem, false));
                /** @type {string} */
                elem.innerHTML = value;
              }
            }
            /** @type {number} */
            elem = 0;
          } catch (o) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith : function() {
      var arg = arguments[0];
      return this.domManip(arguments, function(o) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(o, this);
        }
      }), arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    detach : function(index) {
      return this.remove(index, true);
    },
    domManip : function(args, callback) {
      /** @type {!Array<?>} */
      args = concat.apply([], args);
      var fragment;
      var first;
      var e;
      var n;
      var node;
      var document;
      /** @type {number} */
      var i = 0;
      var length = this.length;
      var $contentCols = this;
      /** @type {number} */
      var endIndex = length - 1;
      var f = args[0];
      var tx_ver = jQuery.isFunction(f);
      if (tx_ver || length > 1 && "string" == typeof f && !support.checkClone && GENERATED_FILES.test(f)) {
        return this.each(function(index) {
          var self = $contentCols.eq(index);
          if (tx_ver) {
            args[0] = f.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (length && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
        e = jQuery.map(getAll(fragment, "script"), text);
        n = e.length;
        for (; length > i; i++) {
          node = fragment;
          if (i !== endIndex) {
            node = jQuery.clone(node, true, true);
            if (n) {
              jQuery.merge(e, getAll(node, "script"));
            }
          }
          callback.call(this[i], node, i);
        }
        if (n) {
          document = e[e.length - 1].ownerDocument;
          jQuery.map(e, createGeneNameGenomicState);
          /** @type {number} */
          i = 0;
          for (; n > i; i++) {
            node = e[i];
            if (opacityRe.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(document, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo : "append",
    prependTo : "prepend",
    insertBefore : "before",
    insertAfter : "after",
    replaceAll : "replaceWith"
  }, function(original, n) {
    /**
     * @param {?} view
     * @return {?}
     */
    jQuery.fn[original] = function(view) {
      var what;
      /** @type {!Array} */
      var name = [];
      var insert = jQuery(view);
      /** @type {number} */
      var last = insert.length - 1;
      /** @type {number} */
      var i = 0;
      for (; last >= i; i++) {
        what = i === last ? this : this.clone(true);
        jQuery(insert[i])[n](what);
        item.apply(name, what.get());
      }
      return this.pushStack(name);
    };
  });
  var iframe;
  var defaultDisplayMap = {};
  /** @type {!RegExp} */
  var namespaces = /^margin/;
  /** @type {!RegExp} */
  var rnumnonpx = new RegExp("^(" + FSSource + ")(?!px)[a-z%]+$", "i");
  /**
   * @param {!Object} node
   * @return {?}
   */
  var getStyles = function(node) {
    return node.ownerDocument.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null);
  };
  !function() {
    /**
     * @return {undefined}
     */
    function computeStyleTests() {
      /** @type {string} */
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
      /** @type {string} */
      div.innerHTML = "";
      root.appendChild(o);
      var e = window.getComputedStyle(div, null);
      /** @type {boolean} */
      l = "1%" !== e.top;
      /** @type {boolean} */
      s = "4px" === e.width;
      root.removeChild(o);
    }
    var l;
    var s;
    var root = document.documentElement;
    var o = document.createElement("div");
    var div = document.createElement("div");
    if (div.style) {
      /** @type {string} */
      div.style.backgroundClip = "content-box";
      /** @type {string} */
      div.cloneNode(true).style.backgroundClip = "";
      /** @type {boolean} */
      support.clearCloneStyle = "content-box" === div.style.backgroundClip;
      /** @type {string} */
      o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute";
      o.appendChild(div);
      if (window.getComputedStyle) {
        jQuery.extend(support, {
          pixelPosition : function() {
            return computeStyleTests(), l;
          },
          boxSizingReliable : function() {
            return null == s && computeStyleTests(), s;
          },
          reliableMarginRight : function() {
            var i;
            var marginDiv = div.appendChild(document.createElement("div"));
            return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", root.appendChild(o), i = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), root.removeChild(o), div.removeChild(marginDiv), i;
          }
        });
      }
    }
  }();
  /**
   * @param {?} value
   * @param {!Array} options
   * @param {!Function} callback
   * @param {!Array} args
   * @return {?}
   */
  jQuery.swap = function(value, options, callback, args) {
    var ret;
    var k;
    var rpcAPI = {};
    for (k in options) {
      rpcAPI[k] = value.style[k];
      value.style[k] = options[k];
    }
    ret = callback.apply(value, args || []);
    for (k in options) {
      value.style[k] = rpcAPI[k];
    }
    return ret;
  };
  /** @type {!RegExp} */
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  /** @type {!RegExp} */
  var rnumsplit = new RegExp("^(" + FSSource + ")(.*)$", "i");
  /** @type {!RegExp} */
  var startsWithSo = new RegExp("^([+-])=(" + FSSource + ")", "i");
  var props = {
    position : "absolute",
    visibility : "hidden",
    display : "block"
  };
  var cssNormalTransform = {
    letterSpacing : "0",
    fontWeight : "400"
  };
  /** @type {!Array} */
  var prefixes = ["Webkit", "O", "Moz", "ms"];
  jQuery.extend({
    cssHooks : {
      opacity : {
        get : function(obj, value) {
          if (value) {
            var val = curCSS(obj, "opacity");
            return "" === val ? "1" : val;
          }
        }
      }
    },
    cssNumber : {
      columnCount : true,
      fillOpacity : true,
      flexGrow : true,
      flexShrink : true,
      fontWeight : true,
      lineHeight : true,
      opacity : true,
      order : true,
      orphans : true,
      widows : true,
      zIndex : true,
      zoom : true
    },
    cssProps : {
      float : "cssFloat"
    },
    style : function(value, name, v, fn) {
      if (value && 3 !== value.nodeType && 8 !== value.nodeType && value.style) {
        var ret;
        var t;
        var hooks;
        var origName = jQuery.camelCase(name);
        var style = value.style;
        return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === v ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(value, false, fn)) ? ret : style[name] : (t = typeof v, "string" === t && (ret = startsWithSo.exec(v)) && (v = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(value, name)), t = "number"), null != v && v === v && ("number" !== t || jQuery.cssNumber[origName] || 
        (v = v + "px"), support.clearCloneStyle || "" !== v || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (v = hooks.set(value, v, fn)) || (style[name] = v)), void 0);
      }
    },
    css : function(elem, name, key, styles) {
      var val;
      var value;
      var prop;
      var origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), prop = jQuery.cssHooks[name] || jQuery.cssHooks[origName], prop && "get" in prop && (val = prop.get(elem, true, key)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === key || key ? (value = parseFloat(val), key === true || jQuery.isNumeric(value) ? value || 0 : val) : val;
    }
  });
  jQuery.each(["height", "width"], function(n, name) {
    jQuery.cssHooks[name] = {
      get : function(elem, value, fn) {
        return value ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, props, function() {
          return getWidthOrHeight(elem, name, fn);
        }) : getWidthOrHeight(elem, name, fn) : void 0;
      },
      set : function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", false, styles), styles) : 0);
      }
    };
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, extra) {
    return extra ? jQuery.swap(elem, {
      display : "inline-block"
    }, curCSS, [elem, "marginRight"]) : void 0;
  });
  jQuery.each({
    margin : "",
    padding : "",
    border : "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand : function(data) {
        /** @type {number} */
        var i = 0;
        var expanded = {};
        /** @type {!Array} */
        var stops = "string" == typeof data ? data.split(" ") : [data];
        for (; 4 > i; i++) {
          expanded[prefix + cssExpand[i] + suffix] = stops[i] || stops[i - 2] || stops[0];
        }
        return expanded;
      }
    };
    if (!namespaces.test(prefix)) {
      /** @type {function(!Object, !Object, string): ?} */
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css : function(name, value) {
      return access(this, function(elem, name, undefined) {
        var styles;
        var l;
        var map = {};
        /** @type {number} */
        var i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          l = name.length;
          for (; l > i; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return void 0 !== undefined ? jQuery.style(elem, name, undefined) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show : function() {
      return showHide(this, true);
    },
    hide : function() {
      return showHide(this);
    },
    toggle : function(state) {
      return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  /** @type {function(?, ?, string, boolean, boolean): ?} */
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor : Tween,
    init : function(elem, options, prop, end, easing, unit) {
      /** @type {string} */
      this.elem = elem;
      /** @type {!Object} */
      this.prop = prop;
      this.easing = easing || "swing";
      /** @type {!Object} */
      this.options = options;
      this.start = this.now = this.cur();
      /** @type {number} */
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur : function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run : function(percent) {
      var eased;
      var hooks = Tween.propHooks[this.prop];
      return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default : {
      get : function(data) {
        var s;
        return null == data.elem[data.prop] || data.elem.style && null != data.elem.style[data.prop] ? (s = jQuery.css(data.elem, data.prop, ""), s && "auto" !== s ? s : 0) : data.elem[data.prop];
      },
      set : function(options) {
        if (jQuery.fx.step[options.prop]) {
          jQuery.fx.step[options.prop](options);
        } else {
          if (options.elem.style && (null != options.elem.style[jQuery.cssProps[options.prop]] || jQuery.cssHooks[options.prop])) {
            jQuery.style(options.elem, options.prop, options.now + options.unit);
          } else {
            options.elem[options.prop] = options.now;
          }
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set : function(target) {
      if (target.elem.nodeType && target.elem.parentNode) {
        target.elem[target.prop] = target.now;
      }
    }
  };
  jQuery.easing = {
    linear : function(p) {
      return p;
    },
    swing : function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  /** @type {function(string, !Object, !Object, number, !Object, !Object): undefined} */
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow;
  var initializeCheckTimer;
  /** @type {!RegExp} */
  var moveRegex = /^(?:toggle|show|hide)$/;
  /** @type {!RegExp} */
  var rfxnum = new RegExp("^(?:([+-])=|)(" + FSSource + ")([a-z%]*)$", "i");
  /** @type {!RegExp} */
  var rrun = /queueHooks$/;
  /** @type {!Array} */
  var animationPrefilters = [defaultPrefilter];
  var tweeners = {
    "*" : [function(prop, value) {
      var tween = this.createTween(prop, value);
      var target = tween.cur();
      /** @type {(Array<string>|null)} */
      var parts = rfxnum.exec(value);
      /** @type {string} */
      var unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
      var start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop));
      /** @type {number} */
      var scale = 1;
      /** @type {number} */
      var l = 20;
      if (start && start[3] !== unit) {
        unit = unit || start[3];
        /** @type {!Array} */
        parts = parts || [];
        /** @type {number} */
        start = +target || 1;
        do {
          /** @type {(number|string)} */
          scale = scale || ".5";
          /** @type {number} */
          start = start / scale;
          jQuery.style(tween.elem, prop, start + unit);
        } while (scale !== (scale = tween.cur() / target) && 1 !== scale && --l);
      }
      return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
    }]
  };
  jQuery.Animation = jQuery.extend(Animation, {
    tweener : function(props, callback) {
      if (jQuery.isFunction(props)) {
        /** @type {!Object} */
        callback = props;
        /** @type {!Array} */
        props = ["*"];
      } else {
        props = props.split(" ");
      }
      var prop;
      /** @type {number} */
      var length = 0;
      var x = props.length;
      for (; x > length; length++) {
        prop = props[length];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter : function(callback, options) {
      if (options) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  /**
   * @param {!Object} speed
   * @param {!Object} fn
   * @param {!Object} name
   * @return {?}
   */
  jQuery.speed = function(speed, fn, name) {
    var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
      complete : name || !name && fn || jQuery.isFunction(speed) && speed,
      duration : speed,
      easing : name && fn || fn && !jQuery.isFunction(fn) && fn
    };
    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === true) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    }, opt;
  };
  jQuery.fn.extend({
    fadeTo : function(speed, to, callback, context) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({
        opacity : to
      }, speed, callback, context);
    },
    animate : function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop);
      var optall = jQuery.speed(speed, easing, callback);
      /**
       * @return {undefined}
       */
      var doAnimation = function() {
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        if (empty || data_priv.get(this, "finish")) {
          anim.stop(true);
        }
      };
      return doAnimation.finish = doAnimation, empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop : function(type, value, event) {
      /**
       * @param {!Object} hooks
       * @return {undefined}
       */
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(event);
      };
      return "string" != typeof type && (event = value, value = type, type = void 0), value && type !== false && this.queue(type || "fx", []), this.each(function() {
        /** @type {boolean} */
        var remoteStreamEventFired = true;
        /** @type {(boolean|string)} */
        var index = null != type && type + "queueHooks";
        /** @type {!Array} */
        var timers = jQuery.timers;
        var data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (!(timers[index].elem !== this || null != type && timers[index].queue !== type)) {
            timers[index].anim.stop(event);
            /** @type {boolean} */
            remoteStreamEventFired = false;
            timers.splice(index, 1);
          }
        }
        if (remoteStreamEventFired || !event) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish : function(type) {
      return type !== false && (type = type || "fx"), this.each(function() {
        var index;
        var data = data_priv.get(this);
        var queue = data[type + "queue"];
        var hooks = data[type + "queueHooks"];
        /** @type {!Array} */
        var timers = jQuery.timers;
        var length = queue ? queue.length : 0;
        /** @type {boolean} */
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        /** @type {number} */
        index = 0;
        for (; length > index; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(canCreateDiscussions, name) {
    var cssFn = jQuery.fn[name];
    /**
     * @param {!Object} x
     * @param {!Object} callback
     * @param {!Object} options
     * @return {?}
     */
    jQuery.fn[name] = function(x, callback, options) {
      return null == x || "boolean" == typeof x ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), x, callback, options);
    };
  });
  jQuery.each({
    slideDown : genFx("show"),
    slideUp : genFx("hide"),
    slideToggle : genFx("toggle"),
    fadeIn : {
      opacity : "show"
    },
    fadeOut : {
      opacity : "hide"
    },
    fadeToggle : {
      opacity : "toggle"
    }
  }, function(original, props) {
    /**
     * @param {!Object} speed
     * @param {!Object} callback
     * @param {!Object} options
     * @return {?}
     */
    jQuery.fn[original] = function(speed, callback, options) {
      return this.animate(props, speed, callback, options);
    };
  });
  /** @type {!Array} */
  jQuery.timers = [];
  /**
   * @return {undefined}
   */
  jQuery.fx.tick = function() {
    var timer;
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!(timer() || timers[i] !== timer)) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = void 0;
  };
  /**
   * @param {?} func
   * @return {undefined}
   */
  jQuery.fx.timer = function(func) {
    jQuery.timers.push(func);
    if (func()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  /** @type {number} */
  jQuery.fx.interval = 13;
  /**
   * @return {undefined}
   */
  jQuery.fx.start = function() {
    if (!initializeCheckTimer) {
      /** @type {number} */
      initializeCheckTimer = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  /**
   * @return {undefined}
   */
  jQuery.fx.stop = function() {
    clearInterval(initializeCheckTimer);
    /** @type {null} */
    initializeCheckTimer = null;
  };
  jQuery.fx.speeds = {
    slow : 600,
    fast : 200,
    _default : 400
  };
  /**
   * @param {string} time
   * @param {string} type
   * @return {?}
   */
  jQuery.fn.delay = function(time, type) {
    return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(fn, incoming_item) {
      /** @type {number} */
      var timer = setTimeout(fn, time);
      /**
       * @return {undefined}
       */
      incoming_item.stop = function() {
        clearTimeout(timer);
      };
    });
  };
  (function() {
    var input = document.createElement("input");
    var select = document.createElement("select");
    var opt = select.appendChild(document.createElement("option"));
    /** @type {string} */
    input.type = "checkbox";
    /** @type {boolean} */
    support.checkOn = "" !== input.value;
    support.optSelected = opt.selected;
    /** @type {boolean} */
    select.disabled = true;
    /** @type {boolean} */
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    /** @type {string} */
    input.value = "t";
    /** @type {string} */
    input.type = "radio";
    /** @type {boolean} */
    support.radioValue = "t" === input.value;
  })();
  var nodeHook;
  var boolHook;
  var attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr : function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr : function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr : function(elem, name, value) {
      var hooks;
      var message;
      var type = elem.nodeType;
      if (elem && 3 !== type && 8 !== type && 2 !== type) {
        return typeof elem.getAttribute === undefined ? jQuery.prop(elem, name, value) : (1 === type && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (message = hooks.get(elem, name)) ? message : (message = jQuery.find.attr(elem, name), null == message ? void 0 : message) : null !== value ? hooks && "set" in hooks && void 0 !== (message = hooks.set(elem, 
        value, name)) ? message : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name));
      }
    },
    removeAttr : function(elem, value) {
      var name;
      var type;
      /** @type {number} */
      var i = 0;
      var attrNames = value && value.match(rnotwhite);
      if (attrNames && 1 === elem.nodeType) {
        for (; name = attrNames[i++];) {
          type = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            /** @type {boolean} */
            elem[type] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks : {
      type : {
        set : function(a, value) {
          if (!support.radioValue && "radio" === value && jQuery.nodeName(a, "input")) {
            var ad = a.value;
            return a.setAttribute("type", value), ad && (a.value = ad), value;
          }
        }
      }
    }
  });
  boolHook = {
    set : function(elem, value, type) {
      return value === false ? jQuery.removeAttr(elem, type) : elem.setAttribute(type, type), type;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(canCreateDiscussions, name) {
    var sprintf = attrHandle[name] || jQuery.find.attr;
    /**
     * @param {!Object} value
     * @param {string} name
     * @param {number} s
     * @return {?}
     */
    attrHandle[name] = function(value, name, s) {
      var ret;
      var handle;
      return s || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != sprintf(value, name, s) ? name.toLowerCase() : null, attrHandle[name] = handle), ret;
    };
  });
  /** @type {!RegExp} */
  var inputNodeNames = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    prop : function(type, value) {
      return access(this, jQuery.prop, type, value, arguments.length > 1);
    },
    removeProp : function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    propFix : {
      for : "htmlFor",
      class : "className"
    },
    prop : function(data, name, value) {
      var ret;
      var hooks;
      var s;
      var mprescripts = data.nodeType;
      if (data && 3 !== mprescripts && 8 !== mprescripts && 2 !== mprescripts) {
        return s = 1 !== mprescripts || !jQuery.isXMLDoc(data), s && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(data, value, name)) ? ret : data[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(data, name)) ? ret : data[name];
      }
    },
    propHooks : {
      tabIndex : {
        get : function(target) {
          return target.hasAttribute("tabindex") || inputNodeNames.test(target.nodeName) || target.href ? target.tabIndex : -1;
        }
      }
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get : function(value) {
        var e = value.parentNode;
        return e && e.parentNode && e.parentNode.selectedIndex, null;
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  /** @type {!RegExp} */
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass : function(value) {
      var values;
      var elem;
      var ret;
      var h;
      var index;
      var finalValue;
      /** @type {(boolean|string)} */
      var proceed = "string" == typeof value && value;
      /** @type {number} */
      var l = 0;
      var i = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).addClass(value.call(this, i, this.className));
        });
      }
      if (proceed) {
        values = (value || "").match(rnotwhite) || [];
        for (; i > l; l++) {
          if (elem = this[l], ret = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
            /** @type {number} */
            index = 0;
            for (; h = values[index++];) {
              if (ret.indexOf(" " + h + " ") < 0) {
                /** @type {string} */
                ret = ret + (h + " ");
              }
            }
            finalValue = jQuery.trim(ret);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    removeClass : function(value) {
      var zeroSizeMaxes;
      var elem;
      var html;
      var zeroSizeMax;
      var callbackCount;
      var finalValue;
      /** @type {(boolean|string)} */
      var c = 0 === arguments.length || "string" == typeof value && value;
      /** @type {number} */
      var l = 0;
      var i = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).removeClass(value.call(this, i, this.className));
        });
      }
      if (c) {
        zeroSizeMaxes = (value || "").match(rnotwhite) || [];
        for (; i > l; l++) {
          if (elem = this[l], html = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
            /** @type {number} */
            callbackCount = 0;
            for (; zeroSizeMax = zeroSizeMaxes[callbackCount++];) {
              for (; html.indexOf(" " + zeroSizeMax + " ") >= 0;) {
                /** @type {string} */
                html = html.replace(" " + zeroSizeMax + " ", " ");
              }
            }
            finalValue = value ? jQuery.trim(html) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    toggleClass : function(value, stateVal) {
      /** @type {string} */
      var type = typeof value;
      return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      }) : this.each(function() {
        if ("string" === type) {
          var type;
          /** @type {number} */
          var callbackCount = 0;
          var $elem = jQuery(this);
          var callbackVals = value.match(rnotwhite) || [];
          for (; type = callbackVals[callbackCount++];) {
            if ($elem.hasClass(type)) {
              $elem.removeClass(type);
            } else {
              $elem.addClass(type);
            }
          }
        } else {
          if (type === undefined || "boolean" === type) {
            if (this.className) {
              data_priv.set(this, "__className__", this.className);
            }
            this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
          }
        }
      });
    },
    hasClass : function(name) {
      /** @type {string} */
      var n = " " + name + " ";
      /** @type {number} */
      var i = 0;
      var l = this.length;
      for (; l > i; i++) {
        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(n) >= 0) {
          return true;
        }
      }
      return false;
    }
  });
  /** @type {!RegExp} */
  var n = /\r/g;
  jQuery.fn.extend({
    val : function(value) {
      var hooks;
      var value;
      var isFunction;
      var elem = this[0];
      {
        if (arguments.length) {
          return isFunction = jQuery.isFunction(value), this.each(function(i) {
            var val;
            if (1 === this.nodeType) {
              val = isFunction ? value.call(this, i, jQuery(this).val()) : value;
              if (null == val) {
                /** @type {string} */
                val = "";
              } else {
                if ("number" == typeof val) {
                  /** @type {string} */
                  val = val + "";
                } else {
                  if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                      return null == value ? "" : value + "";
                    });
                  }
                }
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!(hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value"))) {
                this.value = val;
              }
            }
          });
        }
        if (elem) {
          return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (value = hooks.get(elem, "value")) ? value : (value = elem.value, "string" == typeof value ? value.replace(n, "") : null == value ? "" : value);
        }
      }
    }
  });
  jQuery.extend({
    valHooks : {
      option : {
        get : function(obj) {
          var tween = jQuery.find.attr(obj, "value");
          return null != tween ? tween : jQuery.trim(jQuery.text(obj));
        }
      },
      select : {
        get : function(obj) {
          var value;
          var option;
          var options = obj.options;
          var index = obj.selectedIndex;
          /** @type {boolean} */
          var one = "select-one" === obj.type || 0 > index;
          /** @type {(Array|null)} */
          var values = one ? null : [];
          var max = one ? index + 1 : options.length;
          var i = 0 > index ? max : one ? index : 0;
          for (; max > i; i++) {
            if (option = options[i], (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              if (value = jQuery(option).val(), one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set : function(obj, value) {
          var outputFn;
          var item;
          var attributes = obj.options;
          var result = jQuery.makeArray(value);
          var i = attributes.length;
          for (; i--;) {
            item = attributes[i];
            if (item.selected = jQuery.inArray(item.value, result) >= 0) {
              /** @type {boolean} */
              outputFn = true;
            }
          }
          return outputFn || (obj.selectedIndex = -1), result;
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set : function(obj, value) {
        return jQuery.isArray(value) ? obj.checked = jQuery.inArray(jQuery(obj).val(), value) >= 0 : void 0;
      }
    };
    if (!support.checkOn) {
      /**
       * @param {!Object} value
       * @return {?}
       */
      jQuery.valHooks[this].get = function(value) {
        return null === value.getAttribute("value") ? "on" : value.value;
      };
    }
  });
  jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, type) {
    /**
     * @param {string} callback
     * @param {!Object} fn
     * @return {?}
     */
    jQuery.fn[type] = function(callback, fn) {
      return arguments.length > 0 ? this.on(type, null, callback, fn) : this.trigger(type);
    };
  });
  jQuery.fn.extend({
    hover : function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind : function(name, data, fn) {
      return this.on(name, null, data, fn);
    },
    unbind : function(type, fn) {
      return this.off(type, null, fn);
    },
    delegate : function(event, filter, context, callback) {
      return this.on(filter, event, context, callback);
    },
    undelegate : function(selector, event, fn) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(event, selector || "**", fn);
    }
  });
  var widgetUniqueIDIndex = jQuery.now();
  /** @type {!RegExp} */
  var rquery = /\?/;
  /**
   * @param {string} data
   * @return {?}
   */
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  /**
   * @param {string} data
   * @return {?}
   */
  jQuery.parseXML = function(data) {
    var xml;
    var parser;
    if (!data || "string" != typeof data) {
      return null;
    }
    try {
      /** @type {!DOMParser} */
      parser = new DOMParser;
      /** @type {(Document|null)} */
      xml = parser.parseFromString(data, "text/xml");
    } catch (i) {
      xml = void 0;
    }
    return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), xml;
  };
  /** @type {!RegExp} */
  var savedRegExp = /#.*$/;
  /** @type {!RegExp} */
  var rts = /([?&])_=[^&]*/;
  /** @type {!RegExp} */
  var multipartRegExp = /^(.*?):[ \t]*([^\r\n]*)$/gm;
  /** @type {!RegExp} */
  var timeFormat = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  /** @type {!RegExp} */
  var re = /^(?:GET|HEAD)$/;
  /** @type {!RegExp} */
  var jsre = /^\/\//;
  /** @type {!RegExp} */
  var patternTimecode = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;
  var prefilters = {};
  var transports = {};
  /** @type {string} */
  var De = "*/".concat("*");
  var ajaxLocation = window.location.href;
  /** @type {!Array} */
  var d = patternTimecode.exec(ajaxLocation.toLowerCase()) || [];
  jQuery.extend({
    active : 0,
    lastModified : {},
    etag : {},
    ajaxSettings : {
      url : ajaxLocation,
      type : "GET",
      isLocal : timeFormat.test(d[1]),
      global : true,
      processData : true,
      async : true,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      accepts : {
        "*" : De,
        text : "text/plain",
        html : "text/html",
        xml : "application/xml, text/xml",
        json : "application/json, text/javascript"
      },
      contents : {
        xml : /xml/,
        html : /html/,
        json : /json/
      },
      responseFields : {
        xml : "responseXML",
        text : "responseText",
        json : "responseJSON"
      },
      converters : {
        "* text" : String,
        "text html" : true,
        "text json" : jQuery.parseJSON,
        "text xml" : jQuery.parseXML
      },
      flatOptions : {
        url : true,
        context : true
      }
    },
    ajaxSetup : function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
    ajaxTransport : addToPrefiltersOrTransports(transports),
    ajax : function(url, options) {
      /**
       * @param {number} status
       * @param {!Object} nativeStatusText
       * @param {!Array} responses
       * @param {!Object} headers
       * @return {undefined}
       */
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess;
        var success;
        var error;
        var response;
        var modified;
        /** @type {!Object} */
        var statusText = nativeStatusText;
        if (2 !== dfltTitle) {
          /** @type {number} */
          dfltTitle = 2;
          if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
          }
          transport = void 0;
          title = headers || "";
          /** @type {number} */
          jqXHR.readyState = status > 0 ? 4 : 0;
          /** @type {boolean} */
          isSuccess = status >= 200 && 300 > status || 304 === status;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (204 === status || "HEAD" === s.type) {
              /** @type {string} */
              statusText = "nocontent";
            } else {
              if (304 === status) {
                /** @type {string} */
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                /** @type {boolean} */
                isSuccess = !error;
              }
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              /** @type {string} */
              statusText = "error";
              if (0 > status) {
                /** @type {number} */
                status = 0;
              }
            }
          }
          /** @type {number} */
          jqXHR.status = status;
          /** @type {string} */
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(obj, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(obj, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (f) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(obj, [jqXHR, statusText]);
          if (f) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
      }
      if ("object" == typeof url) {
        /** @type {!Object} */
        options = url;
        url = void 0;
      }
      options = options || {};
      var transport;
      var cacheURL;
      var title;
      var p;
      var _takingTooLongTimeout;
      var m;
      var f;
      var i;
      var s = jQuery.ajaxSetup({}, options);
      var obj = s.context || s;
      var globalEventContext = s.context && (obj.nodeType || obj.jquery) ? jQuery(obj) : jQuery.event;
      var deferred = jQuery.Deferred();
      var completeDeferred = jQuery.Callbacks("once memory");
      var statusCode = s.statusCode || {};
      var data = {};
      var requestHeadersNames = {};
      /** @type {number} */
      var dfltTitle = 0;
      /** @type {string} */
      var status = "canceled";
      var jqXHR = {
        readyState : 0,
        getResponseHeader : function(header) {
          var d;
          if (2 === dfltTitle) {
            if (!p) {
              p = {};
              for (; d = multipartRegExp.exec(title);) {
                /** @type {string} */
                p[d[1].toLowerCase()] = d[2];
              }
            }
            d = p[header.toLowerCase()];
          }
          return null == d ? null : d;
        },
        getAllResponseHeaders : function() {
          return 2 === dfltTitle ? title : null;
        },
        setRequestHeader : function(name, value) {
          var lname = name.toLowerCase();
          return dfltTitle || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, data[name] = value), this;
        },
        overrideMimeType : function(type) {
          return dfltTitle || (s.mimeType = type), this;
        },
        statusCode : function(map) {
          var tmp;
          if (map) {
            if (2 > dfltTitle) {
              for (tmp in map) {
                /** @type {!Array} */
                statusCode[tmp] = [statusCode[tmp], map[tmp]];
              }
            } else {
              jqXHR.always(map[jqXHR.status]);
            }
          }
          return this;
        },
        abort : function(type) {
          var statusText = type || status;
          return transport && transport.abort(statusText), done(0, statusText), this;
        }
      };
      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(savedRegExp, "").replace(jsre, d[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (m = patternTimecode.exec(s.url.toLowerCase()), s.crossDomain = !(!m || m[1] === d[1] && m[2] === d[2] && (m[3] || 
      ("http:" === m[1] ? "80" : "443")) === (d[3] || ("http:" === d[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === dfltTitle) {
        return jqXHR;
      }
      f = jQuery.event && s.global;
      if (f && 0 === jQuery.active++) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      /** @type {boolean} */
      s.hasContent = !re.test(s.type);
      /** @type {string} */
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          /** @type {string} */
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          /** @type {string} */
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + widgetUniqueIDIndex++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + widgetUniqueIDIndex++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + De + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(obj, jqXHR, s) === false || 2 === dfltTitle)) {
        return jqXHR.abort();
      }
      /** @type {string} */
      status = "abort";
      for (i in{
        success : 1,
        error : 1,
        complete : 1
      }) {
        jqXHR[i](s[i]);
      }
      if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        /** @type {number} */
        jqXHR.readyState = 1;
        if (f) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async && s.timeout > 0) {
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          /** @type {number} */
          dfltTitle = 1;
          transport.send(data, done);
        } catch (success) {
          if (!(2 > dfltTitle)) {
            throw success;
          }
          done(-1, success);
        }
      } else {
        done(-1, "No Transport");
      }
      return jqXHR;
    },
    getJSON : function(option, data, options) {
      return jQuery.get(option, data, options, "json");
    },
    getScript : function(options, type) {
      return jQuery.get(options, void 0, type, "script");
    }
  });
  jQuery.each(["get", "post"], function(n, method) {
    /**
     * @param {string} logErrorUrl
     * @param {!Object} a
     * @param {!Object} g
     * @param {!Object} type
     * @return {?}
     */
    jQuery[method] = function(logErrorUrl, a, g, type) {
      return jQuery.isFunction(a) && (type = type || g, g = a, a = void 0), jQuery.ajax({
        url : logErrorUrl,
        type : method,
        dataType : type,
        data : a,
        success : g
      });
    };
  });
  /**
   * @param {string} url
   * @return {?}
   */
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url : url,
      type : "GET",
      dataType : "script",
      async : false,
      global : false,
      throws : true
    });
  };
  jQuery.fn.extend({
    wrapAll : function(html) {
      var n;
      return jQuery.isFunction(html) ? this.each(function(i) {
        jQuery(this).wrapAll(html.call(this, i));
      }) : (this[0] && (n = jQuery(html, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && n.insertBefore(this[0]), n.map(function() {
        var elem = this;
        for (; elem.firstElementChild;) {
          elem = elem.firstElementChild;
        }
        return elem;
      }).append(this)), this);
    },
    wrapInner : function(html) {
      return jQuery.isFunction(html) ? this.each(function(i) {
        jQuery(this).wrapInner(html.call(this, i));
      }) : this.each(function() {
        var $trendingContainer = jQuery(this);
        var contents = $trendingContainer.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          $trendingContainer.append(html);
        }
      });
    },
    wrap : function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap : function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  /**
   * @param {!Object} a
   * @return {?}
   */
  jQuery.expr.filters.hidden = function(a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0;
  };
  /**
   * @param {?} el
   * @return {?}
   */
  jQuery.expr.filters.visible = function(el) {
    return !jQuery.expr.filters.hidden(el);
  };
  /** @type {!RegExp} */
  var regNewline = /%20/g;
  /** @type {!RegExp} */
  var VALID_IDENTIFIER_EXPR = /\[\]$/;
  /** @type {!RegExp} */
  var reVowels = /\r?\n/g;
  /** @type {!RegExp} */
  var reHasHexPrefix = /^(?:submit|button|image|reset|file)$/i;
  /** @type {!RegExp} */
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  /**
   * @param {?} data
   * @param {string} name
   * @return {?}
   */
  jQuery.param = function(data, name) {
    var type;
    /** @type {!Array} */
    var displayUsedBy = [];
    /**
     * @param {?} n
     * @param {string} value
     * @return {undefined}
     */
    var add = function(n, value) {
      value = jQuery.isFunction(value) ? value() : null == value ? "" : value;
      /** @type {string} */
      displayUsedBy[displayUsedBy.length] = encodeURIComponent(n) + "=" + encodeURIComponent(value);
    };
    if (void 0 === name && (name = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(data) || data.jquery && !jQuery.isPlainObject(data)) {
      jQuery.each(data, function() {
        add(this.name, this.value);
      });
    } else {
      for (type in data) {
        callback(type, data[type], name, add);
      }
    }
    return displayUsedBy.join("&").replace(regNewline, "+");
  };
  jQuery.fn.extend({
    serialize : function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray : function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var string = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !reHasHexPrefix.test(string) && (this.checked || !reg.test(string));
      }).map(function(canCreateDiscussions, ctlParams) {
        var val = jQuery(this).val();
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name : ctlParams.name,
            value : val.replace(reVowels, "\r\n")
          };
        }) : {
          name : ctlParams.name,
          value : val.replace(reVowels, "\r\n")
        };
      }).get();
    }
  });
  /**
   * @return {?}
   */
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest;
    } catch (e) {
    }
  };
  /** @type {number} */
  var nextCallbackId = 0;
  var xhrCallbacks = {};
  var xhrSuccessStatus = {
    0 : 200,
    1223 : 204
  };
  var xhrSupported = jQuery.ajaxSettings.xhr();
  if (window.attachEvent) {
    window.attachEvent("onunload", function() {
      var key;
      for (key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
    });
  }
  /** @type {boolean} */
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  /** @type {boolean} */
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback;
    return support.cors || xhrSupported && !options.crossDomain ? {
      send : function(headers, callback) {
        var name;
        var xhr = options.xhr();
        /** @type {number} */
        var id = ++nextCallbackId;
        if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields) {
          for (name in options.xhrFields) {
            xhr[name] = options.xhrFields[name];
          }
        }
        if (options.mimeType && xhr.overrideMimeType) {
          xhr.overrideMimeType(options.mimeType);
        }
        if (!(options.crossDomain || headers["X-Requested-With"])) {
          /** @type {string} */
          headers["X-Requested-With"] = "XMLHttpRequest";
        }
        for (name in headers) {
          xhr.setRequestHeader(name, headers[name]);
        }
        /**
         * @param {string} event
         * @return {?}
         */
        callback = function(event) {
          return function() {
            if (callback) {
              delete xhrCallbacks[id];
              /** @type {null} */
              callback = xhr.onload = xhr.onerror = null;
              if ("abort" === event) {
                xhr.abort();
              } else {
                if ("error" === event) {
                  callback(xhr.status, xhr.statusText);
                } else {
                  callback(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                    text : xhr.responseText
                  } : void 0, xhr.getAllResponseHeaders());
                }
              }
            }
          };
        };
        xhr.onload = callback();
        xhr.onerror = callback("error");
        callback = xhrCallbacks[id] = callback("abort");
        try {
          xhr.send(options.hasContent && options.data || null);
        } catch (s) {
          if (callback) {
            throw s;
          }
        }
      },
      abort : function() {
        if (callback) {
          callback();
        }
      }
    } : void 0;
  });
  jQuery.ajaxSetup({
    accepts : {
      script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents : {
      script : /(?:java|ecma)script/
    },
    converters : {
      "text script" : function(value) {
        return jQuery.globalEval(value), value;
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(settings) {
    if (void 0 === settings.cache) {
      /** @type {boolean} */
      settings.cache = false;
    }
    if (settings.crossDomain) {
      /** @type {string} */
      settings.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var fileElem;
      var callback;
      return {
        send : function(packets, callback) {
          fileElem = jQuery("<script>").prop({
            async : true,
            charset : s.scriptCharset,
            src : s.url
          }).on("load error", callback = function(result) {
            fileElem.remove();
            /** @type {null} */
            callback = null;
            if (result) {
              callback("error" === result.type ? 404 : 200, result.type);
            }
          });
          document.head.appendChild(fileElem[0]);
        },
        abort : function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  /** @type {!Array} */
  var insideInvocation = [];
  /** @type {!RegExp} */
  var rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp : "callback",
    jsonpCallback : function() {
      var indexLookupKey = insideInvocation.pop() || jQuery.expando + "_" + widgetUniqueIDIndex++;
      return this[indexLookupKey] = true, indexLookupKey;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, scanners) {
    var key;
    var func;
    var args;
    /** @type {(boolean|string)} */
    var jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    return jsonProp || "jsonp" === s.dataTypes[0] ? (key = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + key) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + key), s.converters["script json"] = function() {
      return args || jQuery.error(key + " was not called"), args[0];
    }, s.dataTypes[0] = "json", func = window[key], window[key] = function() {
      /** @type {!Arguments} */
      args = arguments;
    }, scanners.always(function() {
      window[key] = func;
      if (s[key]) {
        s.jsonpCallback = originalSettings.jsonpCallback;
        insideInvocation.push(key);
      }
      if (args && jQuery.isFunction(func)) {
        func(args[0]);
      }
      args = func = void 0;
    }), "script") : void 0;
  });
  /**
   * @param {!Object} data
   * @param {!Object} context
   * @param {!Function} keepScripts
   * @return {?}
   */
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || "string" != typeof data) {
      return null;
    }
    if ("boolean" == typeof context) {
      /** @type {!Object} */
      keepScripts = context;
      /** @type {boolean} */
      context = false;
    }
    context = context || document;
    /** @type {(Array<string>|null)} */
    var parsed = rsingleTag.exec(data);
    /** @type {(Array|boolean)} */
    var scripts = !keepScripts && [];
    return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
  };
  /** @type {function(string, !Object, !Array): ?} */
  var proxyStoreLoad = jQuery.fn.load;
  /**
   * @param {string} url
   * @param {!Object} value
   * @param {!Array} label
   * @return {?}
   */
  jQuery.fn.load = function(url, value, label) {
    if ("string" != typeof url && proxyStoreLoad) {
      return proxyStoreLoad.apply(this, arguments);
    }
    var selector;
    var type;
    var response;
    var self = this;
    var val = url.indexOf(" ");
    return val >= 0 && (selector = jQuery.trim(url.slice(val)), url = url.slice(0, val)), jQuery.isFunction(value) ? (label = value, value = void 0) : value && "object" == typeof value && (type = "POST"), self.length > 0 && jQuery.ajax({
      url : url,
      type : type,
      dataType : "html",
      data : value
    }).done(function(responseText) {
      /** @type {!Arguments} */
      response = arguments;
      self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
    }).complete(label && function(obj, options) {
      self.each(label, response || [obj.responseText, options, obj]);
    }), this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, type) {
    /**
     * @param {undefined} e
     * @return {?}
     */
    jQuery.fn[type] = function(e) {
      return this.on(type, e);
    };
  });
  /**
   * @param {?} elem
   * @return {?}
   */
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = window.document.documentElement;
  jQuery.offset = {
    setOffset : function(element, options, x) {
      var crop;
      var x;
      var a;
      var height;
      var curOffset;
      var value;
      var p;
      var propertyName = jQuery.css(element, "position");
      var o = jQuery(element);
      var c = {};
      if ("static" === propertyName) {
        /** @type {string} */
        element.style.position = "relative";
      }
      curOffset = o.offset();
      a = jQuery.css(element, "top");
      value = jQuery.css(element, "left");
      /** @type {boolean} */
      p = ("absolute" === propertyName || "fixed" === propertyName) && (a + value).indexOf("auto") > -1;
      if (p) {
        crop = o.position();
        height = crop.top;
        x = crop.left;
      } else {
        /** @type {number} */
        height = parseFloat(a) || 0;
        /** @type {number} */
        x = parseFloat(value) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(element, x, curOffset);
      }
      if (null != options.top) {
        /** @type {number} */
        c.top = options.top - curOffset.top + height;
      }
      if (null != options.left) {
        /** @type {number} */
        c.left = options.left - curOffset.left + x;
      }
      if ("using" in options) {
        options.using.call(element, c);
      } else {
        o.css(c);
      }
    }
  };
  jQuery.fn.extend({
    offset : function(y) {
      if (arguments.length) {
        return void 0 === y ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, y, i);
        });
      }
      var root;
      var win;
      var elem = this[0];
      var box = {
        top : 0,
        left : 0
      };
      var doc = elem && elem.ownerDocument;
      if (doc) {
        return root = doc.documentElement, jQuery.contains(root, elem) ? (typeof elem.getBoundingClientRect !== undefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
          top : box.top + win.pageYOffset - root.clientTop,
          left : box.left + win.pageXOffset - root.clientLeft
        }) : box;
      }
    },
    position : function() {
      if (this[0]) {
        var offsetParent;
        var offset;
        var i = this[0];
        var parentOffset = {
          top : 0,
          left : 0
        };
        return "fixed" === jQuery.css(i, "position") ? offset = i.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)), {
          top : offset.top - parentOffset.top - jQuery.css(i, "marginTop", true),
          left : offset.left - parentOffset.left - jQuery.css(i, "marginLeft", true)
        };
      }
    },
    offsetParent : function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        for (; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft : "pageXOffset",
    scrollTop : "pageYOffset"
  }, function(type, prop) {
    /** @type {boolean} */
    var top = "pageYOffset" === prop;
    /**
     * @param {?} value
     * @return {?}
     */
    jQuery.fn[type] = function(value) {
      return access(this, function(el, method, val) {
        var win = getWindow(el);
        return void 0 === val ? win ? win[prop] : el[method] : void(win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : el[method] = val);
      }, type, value, arguments.length, null);
    };
  });
  jQuery.each(["top", "left"], function(n, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(parent, val) {
      return val ? (val = curCSS(parent, prop), rnumnonpx.test(val) ? jQuery(parent).position()[prop] + "px" : val) : void 0;
    });
  });
  jQuery.each({
    Height : "height",
    Width : "width"
  }, function(name, type) {
    jQuery.each({
      padding : "inner" + name,
      content : type,
      "" : "outer" + name
    }, function(defaultExtra, original) {
      /**
       * @param {!Object} margin
       * @param {boolean} value
       * @return {?}
       */
      jQuery.fn[original] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
        var extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, undefined) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, undefined, extra);
        }, type, chainable ? margin : void 0, chainable, null);
      };
    });
  });
  /**
   * @return {?}
   */
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if ("function" == typeof define && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  }
  var _jQuery = window.jQuery;
  var old$ = window.$;
  return jQuery.noConflict = function(deep) {
    return window.$ === jQuery && (window.$ = old$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery;
  }, typeof forceWipe === undefined && (window.jQuery = window.$ = jQuery), jQuery;
});
/**
 * @param {undefined} input
 * @param {undefined} val
 * @param {string} name
 * @return {undefined}
 */
var e = function(input, val, name) {
  /** @type {string} */
  var a = "_sub";
  /** @type {boolean} */
  var seconds = false;
  var result = this;
  if ("string" == typeof name) {
    /** @type {string} */
    a = name;
  } else {
    if ("string" == typeof val) {
      a = val;
    } else {
      if ("string" == typeof input) {
        a = input;
      }
    }
  }
  if ("boolean" == typeof val) {
    seconds = val;
  } else {
    if ("boolean" == typeof input) {
      seconds = input;
    }
  }
  if ("object" == typeof input || "function" == typeof input) {
    result = input;
  }
  var obj = {};
  /** @type {!Array} */
  obj[a] = [];
  /**
   * @param {!Window} item
   * @param {?} event
   * @return {undefined}
   */
  var s = function(item, event) {
    /** @type {number} */
    var i = 0;
    for (; i < item[a].length; i++) {
      if (void 0 === event || null === event || item[a][i] === event) {
        item[a].splice(i, 1);
        i--;
      }
    }
  };
  /**
   * @param {!Window} data
   * @param {string} e
   * @return {undefined}
   */
  var callback = function(data, e) {
    for (sub in data) {
      if ("object" == typeof data[sub] && sub !== a && data.hasOwnProperty(sub)) {
        callback(data[sub], e);
      }
    }
    s(data, e);
  };
  /**
   * @param {!Object} name
   * @param {string} value
   * @return {?}
   */
  result.publish = function(name, value) {
    var b;
    b = arguments.length > 2 ? Array.prototype.slice.apply(arguments, [1]) : value ? value : [];
    if (void 0 === b.length) {
      /** @type {!Array} */
      b = [b];
    }
    var a = obj;
    /** @type {!Array} */
    var l = [];
    name = name || "";
    var split = name.split(".");
    if (seconds) {
      b.push(split);
    }
    l.push(a);
    /** @type {number} */
    var i = 0;
    for (; i < split.length && "" !== split[i] && void 0 !== a[split[i]]; i++) {
      a = a[split[i]];
      l.push(a);
    }
    var gVerts;
    /** @type {boolean} */
    var h = false;
    for (; gVerts = l.pop();) {
      /** @type {number} */
      var j = 0;
      for (; j < gVerts[a].length; j++) {
        if (gVerts[a][j].apply(this, b) === false) {
          /** @type {boolean} */
          h = true;
        }
      }
      if (h) {
        break;
      }
    }
    return result;
  };
  /**
   * @param {!Object} to
   * @param {?} value
   * @return {?}
   */
  result.subscribe = function(to, value) {
    var data = obj;
    to = to || "";
    var values = to.split(".");
    /** @type {number} */
    var i = 0;
    for (; i < values.length && "" !== values[i]; i++) {
      if (!data[values[i]]) {
        data[values[i]] = {};
        /** @type {!Array} */
        data[values[i]][a] = [];
      }
      data = data[values[i]];
    }
    return data[a].push(value), result;
  };
  /**
   * @param {string} name
   * @param {string} e
   * @param {string} n
   * @return {?}
   */
  result.unsubscribe = function(name, e, n) {
    var expected = obj;
    if (name = name || "", "" != name) {
      var expectedKeys = name.split(".");
      /** @type {number} */
      var i = 0;
      for (; i < expectedKeys.length && "" !== expectedKeys[i]; i++) {
        if (void 0 === expected[expectedKeys[i]]) {
          return;
        }
        expected = expected[expectedKeys[i]];
      }
    }
    return "boolean" == typeof e && (n = e, e = null), n ? callback(expected, e) : s(expected, e), result;
  };
};
!function(global, factory) {
  if ("object" == typeof exports && exports && "string" != typeof exports.nodeName) {
    factory(exports);
  } else {
    if ("function" == typeof define && define.amd) {
      define(["exports"], factory);
    } else {
      global.Mustache = {};
      factory(Mustache);
    }
  }
}(this, function(exports) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function isFunction(obj) {
    return "function" == typeof obj;
  }
  /**
   * @param {!Object} value
   * @return {?}
   */
  function h(value) {
    return isArray(value) ? "array" : typeof value;
  }
  /**
   * @param {string} rexp
   * @return {?}
   */
  function escapeRegExp(rexp) {
    return rexp.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  /**
   * @param {!Object} obj
   * @param {string} propName
   * @return {?}
   */
  function hasProperty(obj, propName) {
    return null != obj && "object" == typeof obj && propName in obj;
  }
  /**
   * @param {!RegExp} e
   * @param {!Object} k
   * @return {?}
   */
  function g(e, k) {
    return test.call(e, k);
  }
  /**
   * @param {!Object} c
   * @return {?}
   */
  function isWhitespace(c) {
    return !g(e, c);
  }
  /**
   * @param {?} string
   * @return {?}
   */
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
      return entityMap[s];
    });
  }
  /**
   * @param {!Object} str
   * @param {!Object} tags
   * @return {?}
   */
  function parseTemplate(str, tags) {
    /**
     * @return {undefined}
     */
    function stripSpace() {
      if (visibilityChanged && !show) {
        for (; spaces.length;) {
          delete tokens[spaces.pop()];
        }
      } else {
        /** @type {!Array} */
        spaces = [];
      }
      /** @type {boolean} */
      visibilityChanged = false;
      /** @type {boolean} */
      show = false;
    }
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    function compileTags(e) {
      if ("string" == typeof e && (e = e.split(b, 2)), !isArray(e) || 2 !== e.length) {
        throw new Error("Invalid tags: " + e);
      }
      /** @type {!RegExp} */
      openingTagRe = new RegExp(escapeRegExp(e[0]) + "\\s*");
      /** @type {!RegExp} */
      closingTagRe = new RegExp("\\s*" + escapeRegExp(e[1]));
      /** @type {!RegExp} */
      closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + e[1]));
    }
    if (!str) {
      return [];
    }
    var openingTagRe;
    var closingTagRe;
    var closingCurlyRe;
    /** @type {!Array} */
    var opStack = [];
    /** @type {!Array} */
    var tokens = [];
    /** @type {!Array} */
    var spaces = [];
    /** @type {boolean} */
    var visibilityChanged = false;
    /** @type {boolean} */
    var show = false;
    compileTags(tags || exports.tags);
    var start;
    var type;
    var value;
    var chr;
    var token;
    var mb_settings;
    var scanner = new Scanner(str);
    for (; !scanner.eos();) {
      if (start = scanner.pos, value = scanner.scanUntil(openingTagRe)) {
        /** @type {number} */
        var i = 0;
        var l = value.length;
        for (; l > i; ++i) {
          chr = value.charAt(i);
          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            /** @type {boolean} */
            show = true;
          }
          tokens.push(["text", chr, start, start + 1]);
          start = start + 1;
          if ("\n" === chr) {
            stripSpace();
          }
        }
      }
      if (!scanner.scan(openingTagRe)) {
        break;
      }
      if (visibilityChanged = true, type = scanner.scan(tagRe) || "name", scanner.scan(whiteRe), "=" === type ? (value = scanner.scanUntil(equalsRe), scanner.scan(equalsRe), scanner.scanUntil(closingTagRe)) : "{" === type ? (value = scanner.scanUntil(closingCurlyRe), scanner.scan(curlyRe), scanner.scanUntil(closingTagRe), type = "&") : value = scanner.scanUntil(closingTagRe), !scanner.scan(closingTagRe)) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }
      if (token = [type, value, start, scanner.pos], tokens.push(token), "#" === type || "^" === type) {
        opStack.push(token);
      } else {
        if ("/" === type) {
          if (mb_settings = opStack.pop(), !mb_settings) {
            throw new Error('Unopened section "' + value + '" at ' + start);
          }
          if (mb_settings[1] !== value) {
            throw new Error('Unclosed section "' + mb_settings[1] + '" at ' + start);
          }
        } else {
          if ("name" === type || "{" === type || "&" === type) {
            /** @type {boolean} */
            show = true;
          } else {
            if ("=" === type) {
              compileTags(value);
            }
          }
        }
      }
    }
    if (mb_settings = opStack.pop()) {
      throw new Error('Unclosed section "' + mb_settings[1] + '" at ' + scanner.pos);
    }
    return nestTokens(squashTokens(tokens));
  }
  /**
   * @param {!Array} tokens
   * @return {?}
   */
  function squashTokens(tokens) {
    var value;
    var node;
    /** @type {!Array} */
    var squashedTokens = [];
    /** @type {number} */
    var l = 0;
    var i = tokens.length;
    for (; i > l; ++l) {
      value = tokens[l];
      if (value) {
        if ("text" === value[0] && node && "text" === node[0]) {
          node[1] += value[1];
          node[3] = value[3];
        } else {
          squashedTokens.push(value);
          node = value;
        }
      }
    }
    return squashedTokens;
  }
  /**
   * @param {!NodeList} reqs
   * @return {?}
   */
  function nestTokens(reqs) {
    var options;
    var esriParams;
    /** @type {!Array} */
    var inName = [];
    /** @type {!Array} */
    var n = inName;
    /** @type {!Array} */
    var t = [];
    /** @type {number} */
    var i = 0;
    var l = reqs.length;
    for (; l > i; ++i) {
      switch(options = reqs[i], options[0]) {
        case "#":
        case "^":
          n.push(options);
          t.push(options);
          /** @type {!Array} */
          n = options[4] = [];
          break;
        case "/":
          esriParams = t.pop();
          esriParams[5] = options[2];
          n = t.length > 0 ? t[t.length - 1][4] : inName;
          break;
        default:
          n.push(options);
      }
    }
    return inName;
  }
  /**
   * @param {string} string
   * @return {undefined}
   */
  function Scanner(string) {
    /** @type {string} */
    this.string = string;
    /** @type {string} */
    this.tail = string;
    /** @type {number} */
    this.pos = 0;
  }
  /**
   * @param {string} view
   * @param {?} parentContext
   * @return {undefined}
   */
  function Context(view, parentContext) {
    /** @type {string} */
    this.view = view;
    this.cache = {
      "." : this.view
    };
    this.parent = parentContext;
  }
  /**
   * @return {undefined}
   */
  function Writer() {
    this.cache = {};
  }
  /** @type {function(this:*): string} */
  var objectToString$2 = Object.prototype.toString;
  /** @type {function(*): boolean} */
  var isArray = Array.isArray || function(value) {
    return "[object Array]" === objectToString$2.call(value);
  };
  /** @type {function(this:RegExp, *): boolean} */
  var test = RegExp.prototype.test;
  /** @type {!RegExp} */
  var e = /\S/;
  var entityMap = {
    "&" : "&amp;",
    "<" : "&lt;",
    ">" : "&gt;",
    '"' : "&quot;",
    "'" : "&#39;",
    "/" : "&#x2F;"
  };
  /** @type {!RegExp} */
  var whiteRe = /\s*/;
  /** @type {!RegExp} */
  var b = /\s+/;
  /** @type {!RegExp} */
  var equalsRe = /\s*=/;
  /** @type {!RegExp} */
  var curlyRe = /\s*\}/;
  /** @type {!RegExp} */
  var tagRe = /#|\^|\/|>|\{|&|=|!/;
  /**
   * @return {?}
   */
  Scanner.prototype.eos = function() {
    return "" === this.tail;
  };
  /**
   * @param {!RegExp} re
   * @return {?}
   */
  Scanner.prototype.scan = function(re) {
    var match = this.tail.match(re);
    if (!match || 0 !== match.index) {
      return "";
    }
    var string = match[0];
    return this.tail = this.tail.substring(string.length), this.pos += string.length, string;
  };
  /**
   * @param {!RegExp} re
   * @return {?}
   */
  Scanner.prototype.scanUntil = function(re) {
    var match;
    var index = this.tail.search(re);
    switch(index) {
      case -1:
        match = this.tail;
        /** @type {string} */
        this.tail = "";
        break;
      case 0:
        /** @type {string} */
        match = "";
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }
    return this.pos += match.length, match;
  };
  /**
   * @param {!Object} name
   * @return {?}
   */
  Context.prototype.push = function(name) {
    return new Context(name, this);
  };
  /**
   * @param {string} name
   * @return {?}
   */
  Context.prototype.lookup = function(name) {
    var value;
    var cache = this.cache;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var names;
      var index;
      var context = this;
      /** @type {boolean} */
      var lookupHit = false;
      for (; context;) {
        if (name.indexOf(".") > 0) {
          value = context.view;
          names = name.split(".");
          /** @type {number} */
          index = 0;
          for (; null != value && index < names.length;) {
            if (index === names.length - 1) {
              lookupHit = hasProperty(value, names[index]);
            }
            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }
        if (lookupHit) {
          break;
        }
        context = context.parent;
      }
      cache[name] = value;
    }
    return isFunction(value) && (value = value.call(this.view)), value;
  };
  
  Writer.prototype.clearCache = function() {
    this.cache = {};
  };
  
  Writer.prototype.parse = function(key, options) {
    var cache = this.cache;
    var cachedEntry = cache[key];
    return null == cachedEntry && (cachedEntry = cache[key] = parseTemplate(key, options)), cachedEntry;
  };
  /**
   * @param {!Object} value
   * @param {!Function} view
   * @param {!Object} key
   * @return {?}
   */
  Writer.prototype.render = function(value, view, key) {
    var tokens = this.parse(value);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, key, value);
  };
  /**
   * @param {!NodeList} tokens
   * @param {!Object} context
   * @param {!Object} partials
   * @param {!Object} originalTemplate
   * @return {?}
   */
  Writer.prototype.renderTokens = function(tokens, context, partials, originalTemplate) {
    var token;
    var key;
    var value;
    /** @type {string} */
    var buffer = "";
    /** @type {number} */
    var i = 0;
    var l = tokens.length;
    for (; l > i; ++i) {
      value = void 0;
      token = tokens[i];
      key = token[0];
      if ("#" === key) {
        value = this.renderSection(token, context, partials, originalTemplate);
      } else {
        if ("^" === key) {
          value = this.renderInverted(token, context, partials, originalTemplate);
        } else {
          if (">" === key) {
            value = this.renderPartial(token, context, partials, originalTemplate);
          } else {
            if ("&" === key) {
              value = this.unescapedValue(token, context);
            } else {
              if ("name" === key) {
                value = this.escapedValue(token, context);
              } else {
                if ("text" === key) {
                  value = this.rawValue(token);
                }
              }
            }
          }
        }
      }
      if (void 0 !== value) {
        /** @type {string} */
        buffer = buffer + value;
      }
    }
    return buffer;
  };
  /**
   * @param {!Array} token
   * @param {!Object} context
   * @param {!Object} partials
   * @param {!Object} originalTemplate
   * @return {?}
   */
  Writer.prototype.renderSection = function(token, context, partials, originalTemplate) {
    /**
     * @param {!Object} template
     * @return {?}
     */
    function subRender(template) {
      return self.render(template, context, partials);
    }
    var self = this;
    /** @type {string} */
    var buffer = "";
    var value = context.lookup(token[1]);
    if (value) {
      if (isArray(value)) {
        /** @type {number} */
        var l = 0;
        var i = value.length;
        for (; i > l; ++l) {
          buffer = buffer + this.renderTokens(token[4], context.push(value[l]), partials, originalTemplate);
        }
      } else {
        if ("object" == typeof value || "string" == typeof value || "number" == typeof value) {
          buffer = buffer + this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else {
          if (isFunction(value)) {
            if ("string" != typeof originalTemplate) {
              throw new Error("Cannot use higher-order sections without the original template");
            }
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (null != value) {
              /** @type {string} */
              buffer = buffer + value;
            }
          } else {
            buffer = buffer + this.renderTokens(token[4], context, partials, originalTemplate);
          }
        }
      }
      return buffer;
    }
  };
  /**
   * @param {!Array} token
   * @param {!Object} context
   * @param {!Object} partials
   * @param {!Object} originalTemplate
   * @return {?}
   */
  Writer.prototype.renderInverted = function(token, context, partials, originalTemplate) {
    var parsedKey = context.lookup(token[1]);
    return !parsedKey || isArray(parsedKey) && 0 === parsedKey.length ? this.renderTokens(token[4], context, partials, originalTemplate) : void 0;
  };
  /**
   * @param {!Object} token
   * @param {!Object} context
   * @param {!Object} partials
   * @return {?}
   */
  Writer.prototype.renderPartial = function(token, context, partials) {
    if (partials) {
      var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
      return null != value ? this.renderTokens(this.parse(value), context, partials, value) : void 0;
    }
  };
  /**
   * @param {!Object} token
   * @param {!Object} context
   * @return {?}
   */
  Writer.prototype.unescapedValue = function(token, context) {
    var e = context.lookup(token[1]);
    return null != e ? e : void 0;
  };
  /**
   * @param {!Object} token
   * @param {!Object} context
   * @return {?}
   */
  Writer.prototype.escapedValue = function(token, context) {
    var string = context.lookup(token[1]);
    return null != string ? exports.escape(string) : void 0;
  };
  /**
   * @param {!Object} token
   * @return {?}
   */
  Writer.prototype.rawValue = function(token) {
    return token[1];
  };
  /** @type {string} */
  exports.name = "mustache.js";
  /** @type {string} */
  exports.version = "2.1.3";
  /** @type {!Array} */
  exports.tags = ["{{", "}}"];
  var util = new Writer;
  /**
   * @return {?}
   */
  exports.clearCache = function() {
    return util.clearCache();
  };
  /**
   * @param {!Object} s
   * @param {!Object} b
   * @return {?}
   */
  exports.parse = function(s, b) {
    return util.parse(s, b);
  };
  /**
   * @param {!Object} data
   * @param {!Function} selector
   * @param {!Object} name
   * @return {?}
   */
  exports.render = function(data, selector, name) {
    if ("string" != typeof data) {
      throw new TypeError('Invalid template! Template should be a "string" but "' + h(data) + '" was given as the first argument for mustache#render(template, view, partials)');
    }
    return util.render(data, selector, name);
  };
  /**
   * @param {!Object} template
   * @param {undefined} data
   * @param {!Object} index
   * @param {!Object} send
   * @return {?}
   */
  exports.to_html = function(template, data, index, send) {
    var result = exports.render(template, data, index);
    return isFunction(send) ? void send(result) : result;
  };
  /** @type {function(?): ?} */
  exports.escape = escapeHtml;
  /** @type {function(string): undefined} */
  exports.Scanner = Scanner;
  /** @type {function(string, ?): undefined} */
  exports.Context = Context;
  /** @type {function(): undefined} */
  exports.Writer = Writer;
}), function() {
  /**
   * @param {!Object} other
   * @param {!Object} value
   * @return {?}
   */
  function compareAscending(other, value) {
    if (other !== value) {
      /** @type {boolean} */
      var othIsNull = null === other;
      /** @type {boolean} */
      var othIsUndef = other === undefined;
      /** @type {boolean} */
      var othIsReflexive = other === other;
      /** @type {boolean} */
      var valIsNull = null === value;
      /** @type {boolean} */
      var valIsUndef = value === undefined;
      /** @type {boolean} */
      var valIsReflexive = value === value;
      if (other > value && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) {
        return 1;
      }
      if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }
  /**
   * @param {!Object} data
   * @param {!Object} fn
   * @param {string} reverse
   * @return {?}
   */
  function f(data, fn, reverse) {
    var index = data.length;
    var i = reverse ? index : -1;
    for (; reverse ? i-- : ++i < index;) {
      if (fn(data[i], i, data)) {
        return i;
      }
    }
    return -1;
  }
  /**
   * @param {string} value
   * @param {number} type
   * @param {number} id
   * @return {?}
   */
  function find(value, type, id) {
    if (type !== type) {
      return apply(value, id);
    }
    /** @type {number} */
    var i = id - 1;
    var l = value.length;
    for (; ++i < l;) {
      if (value[i] === type) {
        return i;
      }
    }
    return -1;
  }
  /**
   * @param {?} callback
   * @return {?}
   */
  function fn(callback) {
    return "function" == typeof callback || false;
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function String(value) {
    return null == value ? "" : value + "";
  }
  /**
   * @param {string} val
   * @param {string} node
   * @return {?}
   */
  function stringify(val, node) {
    /** @type {number} */
    var i = -1;
    var l = val.length;
    for (; ++i < l && node.indexOf(val.charAt(i)) > -1;) {
    }
    return i;
  }
  /**
   * @param {string} text
   * @param {string} word
   * @return {?}
   */
  function replace(text, word) {
    var end = text.length;
    for (; end-- && word.indexOf(text.charAt(end)) > -1;) {
    }
    return end;
  }
  /**
   * @param {!Object} object
   * @param {!Object} other
   * @return {?}
   */
  function all(object, other) {
    return compareAscending(object.criteria, other.criteria) || object.index - other.index;
  }
  /**
   * @param {!Object} object
   * @param {!Object} other
   * @param {!Object} params
   * @return {?}
   */
  function update(object, other, params) {
    /** @type {number} */
    var index = -1;
    var objCriteria = object.criteria;
    var othCriteria = other.criteria;
    var length = objCriteria.length;
    var l = params.length;
    for (; ++index < length;) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= l) {
          return result;
        }
        var type = params[index];
        return result * ("asc" === type || type === true ? 1 : -1);
      }
    }
    return object.index - other.index;
  }
  /**
   * @param {?} s
   * @return {?}
   */
  function escapeChar(s) {
    return augmentedMethods[s];
  }
  /**
   * @param {?} trait
   * @return {?}
   */
  function from(trait) {
    return traitsChosen[trait];
  }
  /**
   * @param {string} t
   * @param {!Function} err
   * @param {string} response
   * @return {?}
   */
  function escapeHtmlChar(t, err, response) {
    return err ? t = CHAR_MAP[t] : response && (t = c[t]), "\\" + t;
  }
  /**
   * @param {?} s
   * @return {?}
   */
  function rxFn(s) {
    return "\\" + c[s];
  }
  /**
   * @param {!Object} obj
   * @param {number} index
   * @param {boolean} reverse
   * @return {?}
   */
  function apply(obj, index, reverse) {
    var l = obj.length;
    var i = index + (reverse ? 0 : -1);
    for (; reverse ? i-- : ++i < l;) {
      var n = obj[i];
      if (n !== n) {
        return i;
      }
    }
    return -1;
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function isString(obj) {
    return !!obj && "object" == typeof obj;
  }
  /**
   * @param {number} theResponseTXT
   * @return {?}
   */
  function callback(theResponseTXT) {
    return 160 >= theResponseTXT && theResponseTXT >= 9 && 13 >= theResponseTXT || 32 == theResponseTXT || 160 == theResponseTXT || 5760 == theResponseTXT || 6158 == theResponseTXT || theResponseTXT >= 8192 && (8202 >= theResponseTXT || 8232 == theResponseTXT || 8233 == theResponseTXT || 8239 == theResponseTXT || 8287 == theResponseTXT || 12288 == theResponseTXT || 65279 == theResponseTXT);
  }
  /**
   * @param {number} array
   * @param {string} value
   * @return {?}
   */
  function get(array, value) {
    /** @type {number} */
    var index = -1;
    var length = array.length;
    /** @type {number} */
    var j = -1;
    /** @type {!Array} */
    var group = [];
    for (; ++index < length;) {
      if (array[index] === value) {
        /** @type {string} */
        array[index] = PLACEHOLDER;
        /** @type {number} */
        group[++j] = index;
      }
    }
    return group;
  }
  /**
   * @param {number} args
   * @param {!Object} func
   * @return {?}
   */
  function sort(args, func) {
    var renderType;
    /** @type {number} */
    var index = -1;
    var length = args.length;
    /** @type {number} */
    var callbackCount = -1;
    /** @type {!Array} */
    var retVal = [];
    for (; ++index < length;) {
      var state = args[index];
      var dom = func ? func(state, index, args) : state;
      if (!(index && renderType === dom)) {
        renderType = dom;
        retVal[++callbackCount] = state;
      }
    }
    return retVal;
  }
  /**
   * @param {string} body
   * @return {?}
   */
  function next(body) {
    /** @type {number} */
    var index = -1;
    var length = body.length;
    for (; ++index < length && callback(body.charCodeAt(index));) {
    }
    return index;
  }
  /**
   * @param {string} val
   * @return {?}
   */
  function map(val) {
    var index = val.length;
    for (; index-- && callback(val.charCodeAt(index));) {
    }
    return index;
  }
  /**
   * @param {?} wikiId
   * @return {?}
   */
  function fncWrap(wikiId) {
    return subwikiListsCache[wikiId];
  }
  /**
   * @param {!Object} global
   * @return {?}
   */
  function runInContext(global) {
    /**
     * @param {!Object} value
     * @return {?}
     */
    function exports(value) {
      if (isString(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, "__chain__") && hasOwnProperty.call(value, "__wrapped__")) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }
    /**
     * @return {undefined}
     */
    function lodash() {
    }
    /**
     * @param {?} obj
     * @param {?} options
     * @param {string} value
     * @return {undefined}
     */
    function LodashWrapper(obj, options, value) {
      this.__wrapped__ = obj;
      this.__actions__ = value || [];
      /** @type {boolean} */
      this.__chain__ = !!options;
    }
    /**
     * @param {?} value
     * @return {undefined}
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      /** @type {!Array} */
      this.__actions__ = [];
      /** @type {number} */
      this.__dir__ = 1;
      /** @type {boolean} */
      this.__filtered__ = false;
      /** @type {!Array} */
      this.__iteratees__ = [];
      this.__takeCount__ = y;
      /** @type {!Array} */
      this.__views__ = [];
    }
    /**
     * @return {?}
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), result;
    }
    /**
     * @return {?}
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        /** @type {number} */
        result.__dir__ = -1;
        /** @type {boolean} */
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }
    /**
     * @return {?}
     */
    function lazyValue() {
      var array = this.__wrapped__.value();
      var shift = this.__dir__;
      var isArr = isArray(array);
      /** @type {boolean} */
      var shiftsUp = 0 > shift;
      var arrLength = isArr ? array.length : 0;
      var view = getView(0, arrLength, this.__views__);
      var position = view.start;
      var i = view.end;
      /** @type {number} */
      var length = i - position;
      var k = shiftsUp ? i : position - 1;
      var iteratees = this.__iteratees__;
      var iterLength = iteratees.length;
      /** @type {number} */
      var j = 0;
      var takeCount = nativeMin(length, this.__takeCount__);
      if (!isArr || LARGE_ARRAY_SIZE > arrLength || arrLength == length && takeCount == length) {
        return func(array, this.__actions__);
      }
      /** @type {!Array} */
      var result = [];
      e: for (; length-- && takeCount > j;) {
        k = k + shift;
        /** @type {number} */
        var iterIndex = -1;
        var value = array[k];
        for (; ++iterIndex < iterLength;) {
          var data = iteratees[iterIndex];
          var iteratee = data.iteratee;
          var t = data.type;
          var key = iteratee(value);
          if (t == text) {
            value = key;
          } else {
            if (!key) {
              if (t == endEvent) {
                continue e;
              }
              break e;
            }
          }
        }
        result[j++] = value;
      }
      return result;
    }
    /**
     * @return {undefined}
     */
    function MapCache() {
      this.__data__ = {};
    }
    /**
     * @param {undefined} key
     * @return {?}
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    /**
     * @param {string} name
     * @return {?}
     */
    function bindKey(name) {
      return "__proto__" == name ? undefined : this.__data__[name];
    }
    /**
     * @param {string} index
     * @return {?}
     */
    function Program(index) {
      return "__proto__" != index && hasOwnProperty.call(this.__data__, index);
    }
    /**
     * @param {string} key
     * @param {?} value
     * @return {?}
     */
    function listCacheSet(key, value) {
      return "__proto__" != key && (this.__data__[key] = value), this;
    }
    /**
     * @param {!Object} values
     * @return {undefined}
     */
    function SetCache(values) {
      var value = values ? values.length : 0;
      this.data = {
        hash : nativeCreate(null),
        set : new Set
      };
      for (; value--;) {
        this.push(values[value]);
      }
    }
    /**
     * @param {!Object} fn
     * @param {undefined} value
     * @return {?}
     */
    function select(fn, value) {
      var obj = fn.data;
      var r = "string" == typeof value || isObject(value) ? obj.set.has(value) : obj.hash[value];
      return r ? 0 : -1;
    }
    /**
     * @param {?} value
     * @return {undefined}
     */
    function cachePush(value) {
      var user = this.data;
      if ("string" == typeof value || isObject(value)) {
        user.set.add(value);
      } else {
        /** @type {boolean} */
        user.hash[value] = true;
      }
    }
    /**
     * @param {!NodeList} options
     * @param {number} value
     * @return {?}
     */
    function zip(options, value) {
      /** @type {number} */
      var i = -1;
      var len = options.length;
      /** @type {number} */
      var token = -1;
      var offset = value.length;
      var ret = Array(len + offset);
      for (; ++i < len;) {
        ret[i] = options[i];
      }
      for (; ++token < offset;) {
        ret[i++] = value[token];
      }
      return ret;
    }
    /**
     * @param {!Array} result
     * @param {number} array
     * @return {?}
     */
    function copyArray(result, array) {
      /** @type {number} */
      var i = -1;
      var length = result.length;
      if (!array) {
        array = Array(length);
      }
      for (; ++i < length;) {
        array[i] = result[i];
      }
      return array;
    }
    /**
     * @param {!Array} object
     * @param {!Function} f
     * @return {?}
     */
    function forEach(object, f) {
      /** @type {number} */
      var i = -1;
      var length = object.length;
      for (; ++i < length && f(object[i], i, object) !== false;) {
      }
      return object;
    }
    /**
     * @param {!Object} arr
     * @param {?} fn
     * @return {?}
     */
    function invoke(arr, fn) {
      var i = arr.length;
      for (; i-- && fn(arr[i], i, arr) !== false;) {
      }
      return arr;
    }
    /**
     * @param {number} array
     * @param {!Function} fn
     * @return {?}
     */
    function array(array, fn) {
      /** @type {number} */
      var i = -1;
      var length = array.length;
      for (; ++i < length;) {
        if (!fn(array[i], i, array)) {
          return false;
        }
      }
      return true;
    }
    /**
     * @param {!Array} params
     * @param {string} message
     * @param {!Function} f
     * @param {!Object} data
     * @return {?}
     */
    function process(params, message, f, data) {
      /** @type {number} */
      var i = -1;
      var length = params.length;
      /** @type {!Object} */
      var val = data;
      var res = val;
      for (; ++i < length;) {
        var rx = params[i];
        /** @type {number} */
        var n1 = +message(rx);
        if (f(n1, val)) {
          /** @type {number} */
          val = n1;
          res = rx;
        }
      }
      return res;
    }
    /**
     * @param {!Object} object
     * @param {!Function} f
     * @return {?}
     */
    function init(object, f) {
      /** @type {number} */
      var i = -1;
      var length = object.length;
      /** @type {number} */
      var j = -1;
      /** @type {!Array} */
      var result = [];
      for (; ++i < length;) {
        var prop = object[i];
        if (f(prop, i, object)) {
          result[++j] = prop;
        }
      }
      return result;
    }
    /**
     * @param {string} arr
     * @param {!Function} func
     * @return {?}
     */
    function f(arr, func) {
      /** @type {number} */
      var index = -1;
      var length = arr.length;
      var result = Array(length);
      for (; ++index < length;) {
        result[index] = func(arr[index], index, arr);
      }
      return result;
    }
    /**
     * @param {!Object} array
     * @param {?} values
     * @return {?}
     */
    function arrayPush(array, values) {
      /** @type {number} */
      var i = -1;
      var l = values.length;
      var offset = array.length;
      for (; ++i < l;) {
        array[offset + i] = values[i];
      }
      return array;
    }
    /**
     * @param {!Array} d
     * @param {!Object} callback
     * @param {?} b
     * @param {boolean} k
     * @return {?}
     */
    function b(d, callback, b, k) {
      /** @type {number} */
      var i = -1;
      var L = d.length;
      if (k && L) {
        b = d[++i];
      }
      for (; ++i < L;) {
        b = callback(b, d[i], i, d);
      }
      return b;
    }
    /**
     * @param {!Object} obj
     * @param {?} callback
     * @param {?} result
     * @param {(HTMLDocument|boolean)} r
     * @return {?}
     */
    function type(obj, callback, result, r) {
      var p = obj.length;
      if (r && p) {
        result = obj[--p];
      }
      for (; p--;) {
        result = callback(result, obj[p], p, obj);
      }
      return result;
    }
    /**
     * @param {!Array} array
     * @param {string} predicate
     * @return {?}
     */
    function remove(array, predicate) {
      /** @type {number} */
      var i = -1;
      var length = array.length;
      for (; ++i < length;) {
        if (predicate(array[i], i, array)) {
          return true;
        }
      }
      return false;
    }
    /**
     * @param {!Object} array
     * @param {string} fn
     * @return {?}
     */
    function aggregate(array, fn) {
      var i = array.length;
      /** @type {number} */
      var accumulate = 0;
      for (; i--;) {
        /** @type {number} */
        accumulate = accumulate + (+fn(array[i]) || 0);
      }
      return accumulate;
    }
    /**
     * @param {?} value
     * @param {string} type
     * @return {?}
     */
    function name(value, type) {
      return value === undefined ? type : value;
    }
    /**
     * @param {boolean} o
     * @param {boolean} section
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function time(o, section, key, value) {
      return o !== undefined && hasOwnProperty.call(value, key) ? o : section;
    }
    /**
     * @param {string} object
     * @param {!Object} source
     * @param {!Function} callback
     * @return {?}
     */
    function defaults(object, source, callback) {
      /** @type {number} */
      var i = -1;
      var props = keys(source);
      var length = props.length;
      for (; ++i < length;) {
        var key = props[i];
        var other = object[key];
        var value = callback(other, source[key], key, object, source);
        if (!((value === value ? value === other : other !== other) && (other !== undefined || key in object))) {
          object[key] = value;
        }
      }
      return object;
    }
    /**
     * @param {string} object
     * @param {!Object} value
     * @return {?}
     */
    function debug(object, value) {
      return null == value ? object : baseCopy(value, keys(value), object);
    }
    /**
     * @param {!Object} args
     * @param {!Array} node
     * @return {?}
     */
    function compare(args, node) {
      /** @type {number} */
      var index = -1;
      /** @type {boolean} */
      var isNil = null == args;
      var curried = !isNil && isNaN(args);
      var length = curried ? args.length : 0;
      var n = node.length;
      var result = Array(n);
      for (; ++index < n;) {
        var key = node[index];
        if (curried) {
          result[index] = isString(key, length) ? args[key] : undefined;
        } else {
          result[index] = isNil ? undefined : args[key];
        }
      }
      return result;
    }
    /**
     * @param {?} source
     * @param {!NodeList} props
     * @param {!Object} object
     * @return {?}
     */
    function baseCopy(source, props, object) {
      if (!object) {
        object = {};
      }
      /** @type {number} */
      var i = -1;
      var length = props.length;
      for (; ++i < length;) {
        var name = props[i];
        object[name] = source[name];
      }
      return object;
    }
    /**
     * @param {!Function} name
     * @param {?} value
     * @param {!Array} index
     * @return {?}
     */
    function match(name, value, index) {
      /** @type {string} */
      var type = typeof name;
      return "function" == type ? value === undefined ? name : next(name, value, index) : null == name ? c : "object" == type ? error(name) : value === undefined ? find(name) : validate(name, value);
    }
    /**
     * @param {?} value
     * @param {?} isDeep
     * @param {?} customizer
     * @param {?} key
     * @param {boolean} object
     * @param {!Array} stackA
     * @param {!Array} stackB
     * @return {?}
     */
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer && (result = object ? customizer(value, key, object) : customizer(value)), result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        if (result = initCloneArray(value), !isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = objectToString.call(value);
        /** @type {boolean} */
        var isFunc = tag == funcTag;
        if (tag != a && tag != hr && (!isFunc || object)) {
          return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
        }
        if (result = initCloneObject(isFunc ? {} : value), !isDeep) {
          return debug(result, value);
        }
      }
      if (!stackA) {
        /** @type {!Array} */
        stackA = [];
      }
      if (!stackB) {
        /** @type {!Array} */
        stackB = [];
      }
      var length = stackA.length;
      for (; length--;) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      return stackA.push(value), stackB.push(result), (isArr ? forEach : baseForOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, isDeep, customizer, key, value, stackA, stackB);
      }), result;
    }
    /**
     * @param {!Function} fn
     * @param {number} n
     * @param {?} data
     * @return {?}
     */
    function walk(fn, n, data) {
      if ("function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      return setTimeout(function() {
        fn.apply(undefined, data);
      }, n);
    }
    /**
     * @param {number} array
     * @param {!Object} values
     * @return {?}
     */
    function baseDifference(array, values) {
      var length = array ? array.length : 0;
      /** @type {!Array} */
      var result = [];
      if (!length) {
        return result;
      }
      /** @type {number} */
      var i = -1;
      var type = call();
      /** @type {boolean} */
      var isCommon = type === find;
      var inputValues = isCommon && values.length >= LARGE_ARRAY_SIZE ? createCache(values) : null;
      var l = values.length;
      if (inputValues) {
        /** @type {function(!Object, undefined): ?} */
        type = select;
        /** @type {boolean} */
        isCommon = false;
        values = inputValues;
      }
      e: for (; ++i < length;) {
        var value = array[i];
        if (isCommon && value === value) {
          var i = l;
          for (; i--;) {
            if (values[i] === value) {
              continue e;
            }
          }
          result.push(value);
        } else {
          if (type(values, value, 0) < 0) {
            result.push(value);
          }
        }
      }
      return result;
    }
    /**
     * @param {number} d
     * @param {!Function} cb
     * @return {?}
     */
    function text(d, cb) {
      /** @type {boolean} */
      var path1 = true;
      return cb(d, function(fallbackReleases, formattedSections, subnext) {
        return path1 = !!cb(fallbackReleases, formattedSections, subnext);
      }), path1;
    }
    /**
     * @param {?} url
     * @param {string} fn
     * @param {!Function} callback
     * @param {number} n
     * @return {?}
     */
    function post(url, fn, callback, n) {
      /** @type {number} */
      var i = n;
      var m = i;
      return cb(url, function(a, lastErrorObject, orig) {
        /** @type {number} */
        var b = +fn(a, lastErrorObject, orig);
        if (callback(b, i) || b === n && b === m) {
          i = b;
          /** @type {number} */
          m = a;
        }
      }), m;
    }
    /**
     * @param {number} array
     * @param {?} html
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function append(array, html, start, end) {
      var length = array.length;
      /** @type {number} */
      start = null == start ? 0 : +start || 0;
      if (0 > start) {
        start = -start > length ? 0 : length + start;
      }
      end = end === undefined || end > length ? length : +end || 0;
      if (0 > end) {
        end = end + length;
      }
      /** @type {number} */
      length = start > end ? 0 : end >>> 0;
      /** @type {number} */
      start = start >>> 0;
      for (; length > start;) {
        array[start++] = html;
      }
      return array;
    }
    /**
     * @param {!Object} value
     * @param {!Function} n
     * @return {?}
     */
    function value(value, n) {
      /** @type {!Array} */
      var result = [];
      return cb(value, function(a, status, s) {
        if (n(a, status, s)) {
          result.push(a);
        }
      }), result;
    }
    /**
     * @param {!Object} url
     * @param {!Object} c
     * @param {!Function} x
     * @param {boolean} i
     * @return {?}
     */
    function attach(url, c, x, i) {
      var which;
      return x(url, function(shell, missile, runjs) {
        return c(shell, missile, runjs) ? (which = i ? missile : shell, false) : void 0;
      }), which;
    }
    /**
     * @param {number} obj
     * @param {boolean} params
     * @param {string} isStrict
     * @param {!Object} result
     * @return {?}
     */
    function get(obj, params, isStrict, result) {
      if (!result) {
        /** @type {!Array} */
        result = [];
      }
      /** @type {number} */
      var i = -1;
      var length = obj.length;
      for (; ++i < length;) {
        var value = obj[i];
        if (isString(value) && isNaN(value) && (isStrict || isArray(value) || isArguments(value))) {
          if (params) {
            get(value, params, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else {
          if (!isStrict) {
            result[result.length] = value;
          }
        }
      }
      return result;
    }
    /**
     * @param {!Object} i
     * @param {!Function} err
     * @return {?}
     */
    function apply(i, err) {
      return fail(i, err, keysIn);
    }
    /**
     * @param {!Array} object
     * @param {!Function} data
     * @return {?}
     */
    function baseForOwn(object, data) {
      return fail(object, data, keys);
    }
    /**
     * @param {?} type
     * @param {?} value
     * @return {?}
     */
    function a(type, value) {
      return iterator(type, value, keys);
    }
    /**
     * @param {string} target
     * @param {!NodeList} obj
     * @return {?}
     */
    function copyObject(target, obj) {
      /** @type {number} */
      var t = -1;
      var tt = obj.length;
      /** @type {number} */
      var j = -1;
      /** @type {!Array} */
      var out = [];
      for (; ++t < tt;) {
        var type = obj[t];
        if (isFunction(target[type])) {
          out[++j] = type;
        }
      }
      return out;
    }
    /**
     * @param {!Object} object
     * @param {string} path
     * @param {string} key
     * @return {?}
     */
    function log(object, path, key) {
      if (null != object) {
        if (key !== undefined && key in parseInt(object)) {
          /** @type {!Array} */
          path = [key];
        }
        /** @type {number} */
        var index = 0;
        var length = path.length;
        for (; null != object && length > index;) {
          object = object[path[index++]];
        }
        return index && index == length ? object : undefined;
      }
    }
    /**
     * @param {!Object} value
     * @param {?} other
     * @param {string} customizer
     * @param {boolean} isLoose
     * @param {!Array} stackA
     * @param {!Array} stackB
     * @return {?}
     */
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      return value === other ? true : null == value || null == other || !isObject(value) && !isString(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }
    /**
     * @param {?} object
     * @param {?} other
     * @param {!Function} equalFunc
     * @param {!Object} customizer
     * @param {boolean} isLoose
     * @param {!Array} stackA
     * @param {!Array} stackB
     * @return {?}
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object);
      var othIsArr = isArray(other);
      /** @type {string} */
      var nodeName = argsTag;
      /** @type {string} */
      var tag = argsTag;
      if (!objIsArr) {
        nodeName = objectToString.call(object);
        if (nodeName == hr) {
          /** @type {string} */
          nodeName = a;
        } else {
          if (nodeName != a) {
            objIsArr = isTypedArray(object);
          }
        }
      }
      if (!othIsArr) {
        tag = objectToString.call(other);
        if (tag == hr) {
          /** @type {string} */
          tag = a;
        } else {
          if (tag != a) {
            othIsArr = isTypedArray(other);
          }
        }
      }
      /** @type {boolean} */
      var objIsObj = nodeName == a;
      /** @type {boolean} */
      var othIsObj = tag == a;
      /** @type {boolean} */
      var isTemplateElement = nodeName == tag;
      if (isTemplateElement && !objIsArr && !objIsObj) {
        return equalByTag(object, other, nodeName);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__");
        var othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isTemplateElement) {
        return false;
      }
      if (!stackA) {
        /** @type {!Array} */
        stackA = [];
      }
      if (!stackB) {
        /** @type {!Array} */
        stackB = [];
      }
      var length = stackA.length;
      for (; length--;) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      stackA.push(object);
      stackB.push(other);
      var result = (objIsArr ? compile : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
      return stackA.pop(), stackB.pop(), result;
    }
    /**
     * @param {?} options
     * @param {!Object} args
     * @param {!Function} callback
     * @return {?}
     */
    function replace(options, args, callback) {
      var i = args.length;
      var olen = i;
      /** @type {boolean} */
      var isStreamMode = !callback;
      if (null == options) {
        return !olen;
      }
      options = parseInt(options);
      for (; i--;) {
        var command = args[i];
        if (isStreamMode && command[2] ? command[1] !== options[command[0]] : !(command[0] in options)) {
          return false;
        }
      }
      for (; ++i < olen;) {
        command = args[i];
        var state = command[0];
        var value = options[state];
        var index = command[1];
        if (isStreamMode && command[2]) {
          if (value === undefined && !(state in options)) {
            return false;
          }
        } else {
          var result = callback ? callback(value, index, state) : undefined;
          if (!(result === undefined ? baseIsEqual(index, value, callback, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    /**
     * @param {string} obj
     * @param {!Function} v
     * @return {?}
     */
    function fn(obj, v) {
      /** @type {number} */
      var j = -1;
      var value = isNaN(obj) ? Array(obj.length) : [];
      return cb(obj, function(version, n, data) {
        value[++j] = v(version, n, data);
      }), value;
    }
    /**
     * @param {!Function} data
     * @return {?}
     */
    function error(data) {
      var b = split(data);
      if (1 == b.length && b[0][2]) {
        var i = b[0][0];
        var element = b[0][1];
        return function(result) {
          return null == result ? false : result[i] === element && (element !== undefined || i in parseInt(result));
        };
      }
      return function(array) {
        return replace(array, b);
      };
    }
    /**
     * @param {string} name
     * @param {!Object} value
     * @return {?}
     */
    function validate(name, value) {
      var isNameArray = isArray(name);
      var rewrite = push(name) && every(value);
      /** @type {string} */
      var properURL = name + "";
      return name = toString(name), function(object) {
        if (null == object) {
          return false;
        }
        /** @type {string} */
        var key = properURL;
        if (object = parseInt(object), (isNameArray || !rewrite) && !(key in object)) {
          if (object = 1 == name.length ? object : log(object, slice(name, 0, -1)), null == object) {
            return false;
          }
          key = concat(name);
          object = parseInt(object);
        }
        return object[key] === value ? value !== undefined || key in object : baseIsEqual(value, object[key], undefined, true);
      };
    }
    /**
     * @param {!Object} options
     * @param {undefined} source
     * @param {!Function} fn
     * @param {!Array} callback
     * @param {!Object} path
     * @return {?}
     */
    function copy(options, source, fn, callback, path) {
      if (!isObject(options)) {
        return options;
      }
      var isSrcArr = isNaN(source) && (isArray(source) || isTypedArray(source));
      var props = isSrcArr ? undefined : keys(source);
      return forEach(props || source, function(y, i) {
        if (props && (i = y, y = source[i]), isString(y)) {
          if (!callback) {
            /** @type {!Array} */
            callback = [];
          }
          if (!path) {
            /** @type {!Array} */
            path = [];
          }
          merge(options, source, i, copy, fn, callback, path);
        } else {
          var other = options[i];
          var value = fn ? fn(other, y, i, options, source) : undefined;
          /** @type {boolean} */
          var valIsUndefined = value === undefined;
          if (valIsUndefined) {
            value = y;
          }
          if (!(value === undefined && (!isSrcArr || i in options) || !valIsUndefined && (value === value ? value === other : other !== other))) {
            options[i] = value;
          }
        }
      }), options;
    }
    /**
     * @param {!Object} res
     * @param {!Object} x
     * @param {string} key
     * @param {!Function} transform
     * @param {!Function} callback
     * @param {!Array} a
     * @param {!Object} obj
     * @return {?}
     */
    function merge(res, x, key, transform, callback, a, obj) {
      var i = a.length;
      var v = x[key];
      for (; i--;) {
        if (a[i] == v) {
          return void(res[key] = obj[i]);
        }
      }
      var value = res[key];
      var result = callback ? callback(value, v, key, res, x) : undefined;
      /** @type {boolean} */
      var isCommon = result === undefined;
      if (isCommon) {
        result = v;
        if (isNaN(v) && (isArray(v) || isTypedArray(v))) {
          result = isArray(value) ? value : isNaN(value) ? copyArray(value) : [];
        } else {
          if (isPlainObject(v) || isArguments(v)) {
            result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
          } else {
            /** @type {boolean} */
            isCommon = false;
          }
        }
      }
      a.push(v);
      obj.push(result);
      if (isCommon) {
        res[key] = transform(result, v, callback, a, obj);
      } else {
        if (result === result ? result !== value : value === value) {
          res[key] = result;
        }
      }
    }
    /**
     * @param {string} n
     * @return {?}
     */
    function g(n) {
      return function(q) {
        return null == q ? undefined : q[n];
      };
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function reject(value) {
      /** @type {string} */
      var port = value + "";
      return value = toString(value), function(n) {
        return log(n, value, port);
      };
    }
    /**
     * @param {number} c
     * @param {!Object} a
     * @return {?}
     */
    function j(c, a) {
      var r = c ? a.length : 0;
      for (; r--;) {
        var name = a[r];
        if (name != cname && isString(name)) {
          var cname = name;
          array_splice.call(c, name, 1);
        }
      }
      return c;
    }
    /**
     * @param {number} min
     * @param {number} max
     * @return {?}
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }
    /**
     * @param {!Object} name
     * @param {?} callback
     * @param {?} res
     * @param {boolean} err
     * @param {?} fn
     * @return {?}
     */
    function close(name, callback, res, err, fn) {
      return fn(name, function(result, status, data) {
        res = err ? (err = false, result) : callback(res, result, status, data);
      }), res;
    }
    /**
     * @param {!Object} arr
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function slice(arr, start, end) {
      /** @type {number} */
      var i = -1;
      var length = arr.length;
      /** @type {number} */
      start = null == start ? 0 : +start || 0;
      if (0 > start) {
        start = -start > length ? 0 : length + start;
      }
      end = end === undefined || end > length ? length : +end || 0;
      if (0 > end) {
        end = end + length;
      }
      /** @type {number} */
      length = start > end ? 0 : end - start >>> 0;
      /** @type {number} */
      start = start >>> 0;
      var result = Array(length);
      for (; ++i < length;) {
        result[i] = arr[i + start];
      }
      return result;
    }
    /**
     * @param {!Array} str
     * @param {string} callback
     * @return {?}
     */
    function restore(str, callback) {
      var a;
      return cb(str, function(i, one, username) {
        return a = callback(i, one, username), !a;
      }), !!a;
    }
    /**
     * @param {!Object} array
     * @param {string} key
     * @return {?}
     */
    function map(array, key) {
      var i = array.length;
      array.sort(key);
      for (; i--;) {
        array[i] = array[i].value;
      }
      return array;
    }
    /**
     * @param {string} key
     * @param {boolean} value
     * @param {!Object} url
     * @return {?}
     */
    function loop(key, value, url) {
      var put = $();
      /** @type {number} */
      var index = -1;
      value = f(value, function(body) {
        return put(body);
      });
      var plugin = fn(key, function(val) {
        var newValue = f(value, function(obtainGETData) {
          return obtainGETData(val);
        });
        return {
          criteria : newValue,
          index : ++index,
          value : val
        };
      });
      return map(plugin, function(obj, args) {
        return update(obj, args, url);
      });
    }
    /**
     * @param {?} level
     * @param {string} obj
     * @return {?}
     */
    function recurse(level, obj) {
      /** @type {number} */
      var queue = 0;
      return cb(level, function(s, base, count) {
        queue = queue + (+obj(s, base, count) || 0);
      }), queue;
    }
    /**
     * @param {number} array
     * @param {boolean} iteratee
     * @return {?}
     */
    function baseUniq(array, iteratee) {
      /** @type {number} */
      var i = -1;
      var callback = call();
      var length = array.length;
      /** @type {boolean} */
      var isCommon = callback === find;
      /** @type {boolean} */
      var isLarge = isCommon && length >= LARGE_ARRAY_SIZE;
      var e = isLarge ? createCache() : null;
      /** @type {!Array} */
      var result = [];
      if (e) {
        /** @type {function(!Object, undefined): ?} */
        callback = select;
        /** @type {boolean} */
        isCommon = false;
      } else {
        /** @type {boolean} */
        isLarge = false;
        /** @type {!Array} */
        e = iteratee ? [] : result;
      }
      e: for (; ++i < length;) {
        var value = array[i];
        var r = iteratee ? iteratee(value, i, array) : value;
        if (isCommon && value === value) {
          var n = e.length;
          for (; n--;) {
            if (e[n] === r) {
              continue e;
            }
          }
          if (iteratee) {
            e.push(r);
          }
          result.push(value);
        } else {
          if (callback(e, r, 0) < 0) {
            if (iteratee || isLarge) {
              e.push(r);
            }
            result.push(value);
          }
        }
      }
      return result;
    }
    /**
     * @param {!Object} values
     * @param {!NodeList} names
     * @return {?}
     */
    function pick(values, names) {
      /** @type {number} */
      var i = -1;
      var length = names.length;
      var result = Array(length);
      for (; ++i < length;) {
        result[i] = values[names[i]];
      }
      return result;
    }
    /**
     * @param {!Array} array
     * @param {?} predicate
     * @param {boolean} isDrop
     * @param {string} fromRight
     * @return {?}
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length;
      var index = fromRight ? length : -1;
      for (; (fromRight ? index-- : ++index < length) && predicate(array[index], index, array);) {
      }
      return isDrop ? slice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : slice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
    }
    /**
     * @param {string} name
     * @param {!NodeList} a
     * @return {?}
     */
    function func(name, a) {
      /** @type {string} */
      var result = name;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      /** @type {number} */
      var i = -1;
      var l = a.length;
      for (; ++i < l;) {
        var action = a[i];
        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
      }
      return result;
    }
    /**
     * @param {!Array} name
     * @param {?} data
     * @param {boolean} value
     * @return {?}
     */
    function toObject(name, data, value) {
      /** @type {number} */
      var key = 0;
      var id = name ? name.length : key;
      if ("number" == typeof data && data === data && halfLen >= id) {
        for (; id > key;) {
          /** @type {number} */
          var i = key + id >>> 1;
          var condition = name[i];
          if ((value ? data >= condition : data > condition) && null !== condition) {
            /** @type {number} */
            key = i + 1;
          } else {
            /** @type {number} */
            id = i;
          }
        }
        return id;
      }
      return run(name, data, c, value);
    }
    /**
     * @param {!Object} c
     * @param {!Object} value
     * @param {!Function} f
     * @param {boolean} a
     * @return {?}
     */
    function run(c, value, f, a) {
      value = f(value);
      /** @type {number} */
      var len = 0;
      var n = c ? c.length : 0;
      /** @type {boolean} */
      var valIsNaN = value !== value;
      /** @type {boolean} */
      var isFront = null === value;
      /** @type {boolean} */
      var valIsUndefined = value === undefined;
      for (; n > len;) {
        var i = floor((len + n) / 2);
        var b = f(c[i]);
        /** @type {boolean} */
        var isEndThisDay = b !== undefined;
        /** @type {boolean} */
        var isStartThisDay = b === b;
        if (valIsNaN) {
          var isBgroundImg = isStartThisDay || a;
        } else {
          isBgroundImg = isFront ? isStartThisDay && isEndThisDay && (a || null != b) : valIsUndefined ? isStartThisDay && (a || isEndThisDay) : null == b ? false : a ? value >= b : value > b;
        }
        if (isBgroundImg) {
          len = i + 1;
        } else {
          n = i;
        }
      }
      return nativeMin(n, end);
    }
    /**
     * @param {!Function} b
     * @param {?} o
     * @param {number} min
     * @return {?}
     */
    function next(b, o, min) {
      if ("function" != typeof b) {
        return c;
      }
      if (o === undefined) {
        return b;
      }
      switch(min) {
        case 1:
          return function(deferBuild) {
            return b.call(o, deferBuild);
          };
        case 3:
          return function(deferBuild, val, noAssert) {
            return b.call(o, deferBuild, val, noAssert);
          };
        case 4:
          return function(deferBuild, val, noAssert, loc) {
            return b.call(o, deferBuild, val, noAssert, loc);
          };
        case 5:
          return function(deferBuild, val, noAssert, loc, t) {
            return b.call(o, deferBuild, val, noAssert, loc, t);
          };
      }
      return function() {
        return b.apply(o, arguments);
      };
    }
    /**
     * @param {!Object} buffer
     * @return {?}
     */
    function bufferClone(buffer) {
      var buf = new ArrayBuffer(buffer.byteLength);
      var tmp = new Uint8Array(buf);
      return tmp.set(new Uint8Array(buffer)), buf;
    }
    /**
     * @param {!Array} parent
     * @param {!NodeList} object
     * @param {!NodeList} properties
     * @return {?}
     */
    function extend(parent, object, properties) {
      var length = properties.length;
      /** @type {number} */
      var i = -1;
      var offset = nativeMax(parent.length - length, 0);
      /** @type {number} */
      var index = -1;
      var n = object.length;
      var result = Array(n + offset);
      for (; ++index < n;) {
        result[index] = object[index];
      }
      for (; ++i < length;) {
        result[properties[i]] = parent[i];
      }
      for (; offset--;) {
        result[index++] = parent[i++];
      }
      return result;
    }
    /**
     * @param {!Array} value
     * @param {!NodeList} args
     * @param {!NodeList} path
     * @return {?}
     */
    function composeArgs(value, args, path) {
      /** @type {number} */
      var i = -1;
      var length = path.length;
      /** @type {number} */
      var key = -1;
      var leftLength = nativeMax(value.length - length, 0);
      /** @type {number} */
      var index = -1;
      var argsLength = args.length;
      var result = Array(leftLength + argsLength);
      for (; ++key < leftLength;) {
        result[key] = value[key];
      }
      /** @type {number} */
      var prefix = key;
      for (; ++index < argsLength;) {
        result[prefix + index] = args[index];
      }
      for (; ++i < length;) {
        result[prefix + path[i]] = value[key++];
      }
      return result;
    }
    /**
     * @param {!Function} callback
     * @param {!Function} query
     * @return {?}
     */
    function exec(callback, query) {
      return function(value, index, list) {
        var result = query ? query() : {};
        if (index = $(index, list, 3), isArray(value)) {
          /** @type {number} */
          var name = -1;
          var valueLength = value.length;
          for (; ++name < valueLength;) {
            var data = value[name];
            callback(result, data, index(data, name, value), value);
          }
        } else {
          cb(value, function(text, name, value) {
            callback(result, text, index(text, name, value), value);
          });
        }
        return result;
      };
    }
    /**
     * @param {!Function} callback
     * @return {?}
     */
    function expect(callback) {
      return require(function(right, result) {
        /** @type {number} */
        var i = -1;
        var index = null == right ? 0 : result.length;
        var value = index > 2 ? result[index - 2] : undefined;
        var data = index > 2 ? result[2] : undefined;
        var path = index > 1 ? result[index - 1] : undefined;
        if ("function" == typeof value) {
          value = next(value, path, 5);
          /** @type {number} */
          index = index - 2;
        } else {
          value = "function" == typeof path ? path : undefined;
          /** @type {number} */
          index = index - (value ? 1 : 0);
        }
        if (data && callback(result[0], result[1], data)) {
          value = 3 > index ? undefined : value;
          /** @type {number} */
          index = 1;
        }
        for (; ++i < index;) {
          var l = result[i];
          if (l) {
            callback(right, l, value);
          }
        }
        return right;
      });
    }
    /**
     * @param {!Function} callback
     * @param {boolean} reverse
     * @return {?}
     */
    function update(callback, reverse) {
      return function(name, add) {
        var index = name ? is(name) : 0;
        if (!defined(index)) {
          return callback(name, add);
        }
        var i = reverse ? index : -1;
        var m = parseInt(name);
        for (; (reverse ? i-- : ++i < index) && add(m[i], i, m) !== false;) {
        }
        return name;
      };
    }
    /**
     * @param {string} fromRight
     * @return {?}
     */
    function req(fromRight) {
      return function(json, cb, require) {
        var result = parseInt(json);
        var array = require(json);
        var length = array.length;
        var index = fromRight ? length : -1;
        for (; fromRight ? index-- : ++index < length;) {
          var url = array[index];
          if (cb(result[url], url, result) === false) {
            break;
          }
        }
        return json;
      };
    }
    /**
     * @param {!Function} data
     * @param {?} source
     * @return {?}
     */
    function copyFile(data, source) {
      /**
       * @return {?}
       */
      function req() {
        var d = this && this !== root && this instanceof req ? value : data;
        return d.apply(source, arguments);
      }
      var value = createCtorWrapper(data);
      return req;
    }
    /**
     * @param {!Object} values
     * @return {?}
     */
    function createCache(values) {
      return nativeCreate && Set ? new SetCache(values) : null;
    }
    /**
     * @param {!Function} callback
     * @return {?}
     */
    function createCompounder(callback) {
      return function(string) {
        /** @type {number} */
        var i = -1;
        var array = build(lex(string));
        var length = array.length;
        /** @type {string} */
        var result = "";
        for (; ++i < length;) {
          result = callback(result, array[i], i);
        }
        return result;
      };
    }
    /**
     * @param {!Function} f
     * @return {?}
     */
    function createCtorWrapper(f) {
      return function() {
        /** @type {!Arguments} */
        var a = arguments;
        switch(a.length) {
          case 0:
            return new f;
          case 1:
            return new f(a[0]);
          case 2:
            return new f(a[0], a[1]);
          case 3:
            return new f(a[0], a[1], a[2]);
          case 4:
            return new f(a[0], a[1], a[2], a[3]);
          case 5:
            return new f(a[0], a[1], a[2], a[3], a[4]);
          case 6:
            return new f(a[0], a[1], a[2], a[3], a[4], a[5]);
          case 7:
            return new f(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        }
        var undefined = baseCreate(f.prototype);
        var value = f.apply(undefined, a);
        return isObject(value) ? value : undefined;
      };
    }
    /**
     * @param {number} c
     * @return {?}
     */
    function isHostType(c) {
      /**
       * @param {undefined} type
       * @param {undefined} index
       * @param {!Object} data
       * @return {?}
       */
      function input(type, index, data) {
        if (data && callback(type, index, data)) {
          index = undefined;
        }
        var result = format(type, c, undefined, undefined, undefined, undefined, undefined, index);
        return result.placeholder = input.placeholder, result;
      }
      return input;
    }
    /**
     * @param {!Function} action
     * @param {!Array} name
     * @return {?}
     */
    function method(action, name) {
      return require(function(data) {
        var passid = data[0];
        return null == passid ? passid : (data.push(name), action.apply(undefined, data));
      });
    }
    /**
     * @param {!Function} path
     * @param {undefined} fn
     * @return {?}
     */
    function test(path, fn) {
      return function(a, value, result) {
        if (result && callback(a, value, result) && (value = undefined), value = $(value, result, 3), 1 == value.length) {
          a = isArray(a) ? a : clone(a);
          var result = process(a, value, path, fn);
          if (!a.length || result !== fn) {
            return result;
          }
        }
        return post(a, value, path, fn);
      };
    }
    /**
     * @param {!Function} opts
     * @param {string} text
     * @return {?}
     */
    function load(opts, text) {
      return function(result, name, a) {
        if (name = $(name, a, 3), isArray(result)) {
          var index = f(result, name, text);
          return index > -1 ? result[index] : undefined;
        }
        return attach(result, name, opts);
      };
    }
    /**
     * @param {string} i
     * @return {?}
     */
    function diff(i) {
      return function(res, e, n) {
        return res && res.length ? (e = $(e, n, 3), f(res, e, i)) : -1;
      };
    }
    /**
     * @param {!Function} string
     * @return {?}
     */
    function createElement(string) {
      return function(a, c, d) {
        return c = $(c, d, 3), attach(a, c, string, true);
      };
    }
    /**
     * @param {string} fromRight
     * @return {?}
     */
    function createFlow(fromRight) {
      return function() {
        var wrapper;
        /** @type {number} */
        var length = arguments.length;
        /** @type {number} */
        var index = fromRight ? length : -1;
        /** @type {number} */
        var leftIndex = 0;
        var funcs = Array(length);
        for (; fromRight ? index-- : ++index < length;) {
          var func = funcs[leftIndex++] = arguments[index];
          if ("function" != typeof func) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }
          if (!wrapper && LodashWrapper.prototype.thru && "wrapper" == getFuncName(func)) {
            wrapper = new LodashWrapper([], true);
          }
        }
        /** @type {number} */
        index = wrapper ? -1 : length;
        for (; ++index < length;) {
          func = funcs[index];
          var funcName = getFuncName(func);
          var data = "wrapper" == funcName ? getData(func) : undefined;
          wrapper = data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | button | REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
        }
        return function() {
          /** @type {!Arguments} */
          var args = arguments;
          var value = args[0];
          if (wrapper && 1 == args.length && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
            return wrapper.plant(value).value();
          }
          /** @type {number} */
          var i = 0;
          var width = length ? funcs[i].apply(this, args) : value;
          for (; ++i < length;) {
            width = funcs[i].call(this, width);
          }
          return width;
        };
      };
    }
    /**
     * @param {!Function} callback
     * @param {?} fn
     * @return {?}
     */
    function bind(callback, fn) {
      return function(fileTypes, b, post) {
        return "function" == typeof b && post === undefined && isArray(fileTypes) ? callback(fileTypes, b) : fn(fileTypes, next(b, post, 3));
      };
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    function attempt(cb) {
      return function(fallbackReleases, e, b) {
        return ("function" != typeof e || b !== undefined) && (e = next(e, b, 3)), cb(fallbackReleases, e, keysIn);
      };
    }
    /**
     * @param {!Function} callback
     * @return {?}
     */
    function factory(callback) {
      return function(identifierPositions, e, b) {
        return ("function" != typeof e || b !== undefined) && (e = next(e, b, 3)), callback(identifierPositions, e);
      };
    }
    /**
     * @param {boolean} isArray
     * @return {?}
     */
    function partial(isArray) {
      return function(o, t, start) {
        var oldSortOrder = {};
        return t = $(t, start, 3), baseForOwn(o, function(i, b, results) {
          var value = t(i, b, results);
          b = isArray ? value : b;
          i = isArray ? i : value;
          /** @type {string} */
          oldSortOrder[b] = i;
        }), oldSortOrder;
      };
    }
    /**
     * @param {number} fromRight
     * @return {?}
     */
    function each(fromRight) {
      return function(string, length, chars) {
        return string = String(string), (fromRight ? string : "") + stringify(string, length, chars) + (fromRight ? "" : string);
      };
    }
    /**
     * @param {number} num
     * @return {?}
     */
    function query(num) {
      var controller = require(function(ya, i) {
        var title = get(i, controller.placeholder);
        return format(ya, num, undefined, i, title);
      });
      return controller;
    }
    /**
     * @param {!Function} error
     * @param {?} callback
     * @return {?}
     */
    function search(error, callback) {
      return function(type, obj, cb, a) {
        /** @type {boolean} */
        var err = arguments.length < 3;
        return "function" == typeof obj && a === undefined && isArray(type) ? error(type, obj, cb, err) : close(type, $(obj, a, 4), cb, err, callback);
      };
    }
    /**
     * @param {!Object} func
     * @param {number} bitmask
     * @param {?} b
     * @param {(Node|NodeList|string)} next
     * @param {(Node|NodeList|string)} type
     * @param {(Node|NodeList|string)} value
     * @param {(Node|NodeList|string)} path
     * @param {(!Function|string)} obj
     * @param {number} c
     * @param {undefined} n
     * @return {?}
     */
    function wrapper(func, bitmask, b, next, type, value, path, obj, c, n) {
      /**
       * @return {?}
       */
      function wrapper() {
        /** @type {number} */
        var length = arguments.length;
        /** @type {number} */
        var i = length;
        var result = Array(length);
        for (; i--;) {
          result[i] = arguments[i];
        }
        if (next && (result = extend(result, next, type)), value && (result = composeArgs(result, value, path)), isString || isBuffer) {
          var placeholder = wrapper.placeholder;
          var value = get(result, placeholder);
          if (length = length - value.length, n > length) {
            var val = obj ? copyArray(obj) : undefined;
            var sep = nativeMax(n - length, 0);
            var path = isString ? value : undefined;
            var url = isString ? undefined : value;
            var type = isString ? result : undefined;
            var visibility = isString ? undefined : result;
            /** @type {number} */
            bitmask = bitmask | (isString ? button : evt);
            /** @type {number} */
            bitmask = bitmask & ~(isString ? evt : button);
            if (!isCurryBound) {
              /** @type {number} */
              bitmask = bitmask & ~(index | BIND_KEY_FLAG);
            }
            /** @type {!Array} */
            var data = [func, bitmask, b, type, path, visibility, url, val, c, sep];
            var options = wrapper.apply(undefined, data);
            return isLaziable(func) && handler(options, data), options.placeholder = placeholder, options;
          }
        }
        var target = dir ? b : this;
        var fn = isBindKey ? target[func] : func;
        return obj && (result = join(result, obj)), isAry && c < result.length && (result.length = c), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtorWrapper(func)), fn.apply(target, result);
      }
      /** @type {number} */
      var isAry = bitmask & ARY_FLAG;
      /** @type {number} */
      var dir = bitmask & index;
      /** @type {number} */
      var isBindKey = bitmask & BIND_KEY_FLAG;
      /** @type {number} */
      var isString = bitmask & CURRY_FLAG;
      /** @type {number} */
      var isCurryBound = bitmask & CURRY_BOUND_FLAG;
      /** @type {number} */
      var isBuffer = bitmask & d;
      var Ctor = isBindKey ? undefined : createCtorWrapper(func);
      return wrapper;
    }
    /**
     * @param {string} node
     * @param {number} value
     * @param {string} options
     * @return {?}
     */
    function stringify(node, value, options) {
      var a = node.length;
      if (value = +value, a >= value || !nativeIsFinite(value)) {
        return "";
      }
      /** @type {number} */
      var length = value - a;
      return options = null == options ? " " : options + "", repeat(options, nativeCeil(length / options.length)).slice(0, length);
    }
    /**
     * @param {!Function} fn
     * @param {number} fileName
     * @param {?} context
     * @param {!NodeList} args
     * @return {?}
     */
    function runScript(fn, fileName, context, args) {
      /**
       * @return {?}
       */
      function run() {
        /** @type {number} */
        var index = -1;
        /** @type {number} */
        var argsLength = arguments.length;
        /** @type {number} */
        var i = -1;
        var length = args.length;
        var a = Array(length + argsLength);
        for (; ++i < length;) {
          a[i] = args[i];
        }
        for (; argsLength--;) {
          a[i++] = arguments[++index];
        }
        var callback = this && this !== root && this instanceof run ? cb : fn;
        return callback.apply(scope ? context : this, a);
      }
      /** @type {number} */
      var scope = fileName & index;
      var cb = createCtorWrapper(fn);
      return run;
    }
    /**
     * @param {string} fn
     * @return {?}
     */
    function result(fn) {
      var func = Math[fn];
      return function(number, precision) {
        return precision = precision === undefined ? 0 : +precision || 0, precision ? (precision = pow(10, precision), func(number * precision) / precision) : func(number);
      };
    }
    /**
     * @param {boolean} value
     * @return {?}
     */
    function login(value) {
      return function(style, type, t, result) {
        var c = $(t);
        return null == t && c === match ? toObject(style, type, value) : run(style, type, c(t, result, 1), value);
      };
    }
    /**
     * @param {string} a
     * @param {number} n
     * @param {!Object} scale
     * @param {number} result
     * @param {string} text
     * @param {?} line
     * @param {!Object} file
     * @param {number} val
     * @return {?}
     */
    function format(a, n, scale, result, text, line, file, val) {
      /** @type {number} */
      var isBindKey = n & BIND_KEY_FLAG;
      if (!isBindKey && "function" != typeof a) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      var start = result ? result.length : 0;
      if (start || (n = n & ~(button | evt), result = text = undefined), start = start - (text ? text.length : 0), n & evt) {
        /** @type {number} */
        var folders = result;
        /** @type {string} */
        var __line_break = text;
        result = text = undefined;
      }
      var data = isBindKey ? undefined : getData(a);
      /** @type {!Array} */
      var t = [a, n, scale, result, text, folders, __line_break, line, file, val];
      if (data && (mergeData(t, data), n = t[1], val = t[9]), t[9] = null == val ? isBindKey ? 0 : a.length : nativeMax(val - start, 0) || 0, n == index) {
        var bytes = copyFile(t[0], t[2]);
      } else {
        bytes = n != button && n != (index | button) || t[4].length ? wrapper.apply(undefined, t) : runScript.apply(undefined, t);
      }
      var format = data ? PATCH : handler;
      return format(bytes, t);
    }
    /**
     * @param {!Array} group
     * @param {!Array} input
     * @param {!Function} filter
     * @param {!Function} value
     * @param {boolean} callback
     * @param {!Array} cache
     * @param {!Array} func
     * @return {?}
     */
    function compile(group, input, filter, value, callback, cache, func) {
      /** @type {number} */
      var idx = -1;
      var i = group.length;
      var n = input.length;
      if (i != n && !(callback && n > i)) {
        return false;
      }
      for (; ++idx < i;) {
        var key = group[idx];
        var val = input[idx];
        var height = value ? value(callback ? val : key, callback ? key : val, idx) : undefined;
        if (height !== undefined) {
          if (height) {
            continue;
          }
          return false;
        }
        if (callback) {
          if (!remove(input, function(undefined) {
            return key === undefined || filter(key, undefined, value, callback, cache, func);
          })) {
            return false;
          }
        } else {
          if (key !== val && !filter(key, val, value, callback, cache, func)) {
            return false;
          }
        }
      }
      return true;
    }
    /**
     * @param {?} object
     * @param {string} other
     * @param {string} tag
     * @return {?}
     */
    function equalByTag(object, other, tag) {
      switch(tag) {
        case arrayBufferTag:
        case boolTag:
          return +object == +other;
        case dateTag:
          return object.name == other.name && object.message == other.message;
        case numberTag:
          return object != +object ? other != +other : object == +other;
        case regexpTag:
        case stringTag:
          return object == other + "";
      }
      return false;
    }
    /**
     * @param {!Object} object
     * @param {!Object} other
     * @param {!Function} equalFunc
     * @param {!Function} customizer
     * @param {boolean} isLoose
     * @param {!Array} stackA
     * @param {!Array} stackB
     * @return {?}
     */
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object);
      var objLength = objProps.length;
      var othProps = keys(other);
      var othLength = othProps.length;
      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      for (; index--;) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      /** @type {boolean} */
      var skipCtor = isLoose;
      for (; ++index < objLength;) {
        key = objProps[index];
        var objValue = object[key];
        var othValue = other[key];
        var result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        if (!skipCtor) {
          /** @type {boolean} */
          skipCtor = "constructor" == key;
        }
      }
      if (!skipCtor) {
        var objCtor = object.constructor;
        var othCtor = other.constructor;
        if (objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }
    /**
     * @param {!Object} str
     * @param {!Object} x
     * @param {!Function} val
     * @return {?}
     */
    function $(str, x, val) {
      /** @type {function(?, (Object|string), string): ?} */
      var text = exports.callback || string;
      return text = text === string ? match : text, val ? text(str, x, val) : text;
    }
    /**
     * @param {!Object} func
     * @return {?}
     */
    function getFuncName(func) {
      /** @type {string} */
      var name = func.name + "";
      var data = jsonData[name];
      var option = data ? data.length : 0;
      for (; option--;) {
        var info = data[option];
        var type = info.func;
        if (null == type || type == func) {
          return info.name;
        }
      }
      return name;
    }
    /**
     * @param {string} value
     * @param {number} name
     * @param {number} i
     * @return {?}
     */
    function call(value, name, i) {
      /** @type {function(!Object, number, number): ?} */
      var match = exports.indexOf || indexOf;
      return match = match === indexOf ? find : match, value ? match(value, name, i) : match;
    }
    /**
     * @param {(!Function|string)} object
     * @return {?}
     */
    function split(object) {
      var result = pairs(object);
      var length = result.length;
      for (; length--;) {
        result[length][2] = every(result[length][1]);
      }
      return result;
    }
    /**
     * @param {!Object} object
     * @param {string} key
     * @return {?}
     */
    function getNative(object, key) {
      var value = null == object ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }
    /**
     * @param {number} start
     * @param {number} end
     * @param {!NodeList} opts
     * @return {?}
     */
    function getView(start, end, opts) {
      /** @type {number} */
      var i = -1;
      var olen = opts.length;
      for (; ++i < olen;) {
        var data = opts[i];
        var size = data.size;
        switch(data.type) {
          case "drop":
            start = start + size;
            break;
          case "dropRight":
            /** @type {number} */
            end = end - size;
            break;
          case "take":
            end = nativeMin(end, start + size);
            break;
          case "takeRight":
            start = nativeMax(start, end - size);
        }
      }
      return {
        start : start,
        end : end
      };
    }
    /**
     * @param {!Object} array
     * @return {?}
     */
    function initCloneArray(array) {
      var length = array.length;
      var result = new array.constructor(length);
      return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, result.input = array.input), result;
    }
    /**
     * @param {!Node} object
     * @return {?}
     */
    function initCloneObject(object) {
      var Ctor = object.constructor;
      return "function" == typeof Ctor && Ctor instanceof Ctor || (Ctor = Object), new Ctor;
    }
    /**
     * @param {!Object} object
     * @param {?} tag
     * @param {?} isDeep
     * @return {?}
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch(tag) {
        case dataViewTag:
          return bufferClone(object);
        case arrayBufferTag:
        case boolTag:
          return new Ctor(+object);
        case float32Tag:
        case funcTag$2:
        case float64Tag:
        case int8Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }
    /**
     * @param {?} obj
     * @param {string} result
     * @param {?} id
     * @return {?}
     */
    function set(obj, result, id) {
      if (!(null == obj || push(result, obj))) {
        result = toString(result);
        obj = 1 == result.length ? obj : log(obj, slice(result, 0, -1));
        result = concat(result);
      }
      var self = null == obj ? obj : obj[result];
      return null == self ? undefined : self.apply(obj, id);
    }
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function isNaN(obj) {
      return null != obj && defined(is(obj));
    }
    /**
     * @param {?} val
     * @param {?} v
     * @return {?}
     */
    function isString(val, v) {
      return val = "number" == typeof val || rNum.test(val) ? +val : -1, v = null == v ? k : v, val > -1 && val % 1 == 0 && v > val;
    }
    /**
     * @param {?} type
     * @param {?} value
     * @param {!Object} key
     * @return {?}
     */
    function callback(type, value, key) {
      if (!isObject(key)) {
        return false;
      }
      /** @type {string} */
      var type = typeof value;
      if ("number" == type ? isNaN(key) && isString(value, key.length) : "string" == type && value in key) {
        var id = key[value];
        return type === type ? type === id : id !== id;
      }
      return false;
    }
    /**
     * @param {string} arg
     * @param {!Object} instance
     * @return {?}
     */
    function push(arg, instance) {
      /** @type {string} */
      var type = typeof arg;
      if ("string" == type && POSSIBLE_HTML.test(arg) || "number" == type) {
        return true;
      }
      if (isArray(arg)) {
        return false;
      }
      /** @type {boolean} */
      var r = !ARG_RE.test(arg);
      return r || null != instance && arg in parseInt(instance);
    }
    /**
     * @param {!Object} func
     * @return {?}
     */
    function isLaziable(func) {
      var funcName = getFuncName(func);
      var other = exports[funcName];
      if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }
    /**
     * @param {number} a
     * @return {?}
     */
    function defined(a) {
      return "number" == typeof a && a > -1 && a % 1 == 0 && k >= a;
    }
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function every(obj) {
      return obj === obj && !isObject(obj);
    }
    /**
     * @param {!Array} data
     * @param {!Array} source
     * @return {?}
     */
    function mergeData(data, source) {
      var bitmask = data[1];
      var srcBitmask = source[1];
      /** @type {number} */
      var newBitmask = bitmask | srcBitmask;
      /** @type {boolean} */
      var hasSongChanged = ARY_FLAG > newBitmask;
      /** @type {boolean} */
      var isReplayingSong = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG;
      if (!hasSongChanged && !isReplayingSong) {
        return data;
      }
      if (srcBitmask & index) {
        data[2] = source[2];
        /** @type {number} */
        newBitmask = newBitmask | (bitmask & index ? 0 : CURRY_BOUND_FLAG);
      }
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? extend(partials, value, source[4]) : copyArray(value);
        data[4] = partials ? get(data[3], PLACEHOLDER) : copyArray(source[4]);
      }
      return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgs(partials, value, source[6]) : copyArray(value), data[6] = partials ? get(data[5], PLACEHOLDER) : copyArray(source[6])), value = source[7], value && (data[7] = copyArray(value)), srcBitmask & ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, data;
    }
    /**
     * @param {?} result
     * @param {(Array|string)} value
     * @return {?}
     */
    function response(result, value) {
      return result === undefined ? value : done(result, value, response);
    }
    /**
     * @param {string} obj
     * @param {!NodeList} state
     * @return {?}
     */
    function start(obj, state) {
      obj = parseInt(obj);
      /** @type {number} */
      var index = -1;
      var length = state.length;
      var res = {};
      for (; ++index < length;) {
        var key = state[index];
        if (key in obj) {
          res[key] = obj[key];
        }
      }
      return res;
    }
    /**
     * @param {string} value
     * @param {!Function} hook
     * @return {?}
     */
    function wrap(value, hook) {
      var group = {};
      return apply(value, function(key, name, itemNameOnly) {
        if (hook(key, name, itemNameOnly)) {
          group[name] = key;
        }
      }), group;
    }
    /**
     * @param {!Array} nodes
     * @param {?} args
     * @return {?}
     */
    function join(nodes, args) {
      var length = nodes.length;
      var index = nativeMin(args.length, length);
      var collection = copyArray(nodes);
      for (; index--;) {
        var key = args[index];
        nodes[index] = isString(key, length) ? collection[key] : undefined;
      }
      return nodes;
    }
    /**
     * @param {!Object} object
     * @return {?}
     */
    function shimKeys(object) {
      var props = keysIn(object);
      var propsLength = props.length;
      var length = propsLength && object.length;
      var allowIndexes = !!length && defined(length) && (isArray(object) || isArguments(object));
      /** @type {number} */
      var index = -1;
      /** @type {!Array} */
      var result = [];
      for (; ++index < propsLength;) {
        var key = props[index];
        if (allowIndexes && isString(key, length) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function clone(value) {
      return null == value ? [] : isNaN(value) ? isObject(value) ? value : Object(value) : values(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function parseInt(value) {
      return isObject(value) ? value : Object(value);
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function toString(value) {
      if (isArray(value)) {
        return value;
      }
      /** @type {!Array} */
      var pathArray = [];
      return String(value).replace(reNewLines, function(match, number, quote, string) {
        pathArray.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
      }), pathArray;
    }
    /**
     * @param {?} wrapper
     * @return {?}
     */
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, copyArray(wrapper.__actions__));
    }
    /**
     * @param {number} array
     * @param {number} size
     * @param {!Object} value
     * @return {?}
     */
    function range(array, size, value) {
      size = (value ? callback(array, size, value) : null == size) ? 1 : nativeMax(floor(size) || 1, 1);
      /** @type {number} */
      var index = 0;
      var length = array ? array.length : 0;
      /** @type {number} */
      var j = -1;
      var result = Array(nativeCeil(length / size));
      for (; length > index;) {
        result[++j] = slice(array, index, index = index + size);
      }
      return result;
    }
    /**
     * @param {number} refs
     * @return {?}
     */
    function compact(refs) {
      /** @type {number} */
      var i = -1;
      var length = refs ? refs.length : 0;
      /** @type {number} */
      var ri = -1;
      /** @type {!Array} */
      var res = [];
      for (; ++i < length;) {
        var name = refs[i];
        if (name) {
          res[++ri] = name;
        }
      }
      return res;
    }
    /**
     * @param {number} target
     * @param {number} index
     * @param {!Object} value
     * @return {?}
     */
    function drop(target, index, value) {
      var t = target ? target.length : 0;
      return t ? ((value ? callback(target, index, value) : null == index) && (index = 1), slice(target, 0 > index ? 0 : index)) : [];
    }
    /**
     * @param {number} start
     * @param {number} length
     * @param {!Object} value
     * @return {?}
     */
    function animate(start, length, value) {
      var code = start ? start.length : 0;
      return code ? ((value ? callback(start, length, value) : null == length) && (length = 1), length = code - (+length || 0), slice(start, 0, 0 > length ? 0 : length)) : [];
    }
    /**
     * @param {!Array} data
     * @param {!Object} location
     * @param {!Object} id
     * @return {?}
     */
    function getItem(data, location, id) {
      return data && data.length ? baseWhile(data, $(location, id, 3), true, true) : [];
    }
    /**
     * @param {!Array} array
     * @param {!Object} f
     * @param {!Object} ctx
     * @return {?}
     */
    function dropWhile(array, f, ctx) {
      return array && array.length ? baseWhile(array, $(f, ctx, 3), true) : [];
    }
    /**
     * @param {number} array
     * @param {?} value
     * @param {number} start
     * @param {undefined} end
     * @return {?}
     */
    function fill(array, value, start, end) {
      var index = array ? array.length : 0;
      return index ? (start && "number" != typeof start && callback(array, value, start) && (start = 0, end = index), append(array, value, start, end)) : [];
    }
    /**
     * @param {number} headers
     * @return {?}
     */
    function head(headers) {
      return headers ? headers[0] : undefined;
    }
    /**
     * @param {number} obj
     * @param {boolean} value
     * @param {!Object} result
     * @return {?}
     */
    function compute(obj, value, result) {
      var key = obj ? obj.length : 0;
      return result && callback(obj, value, result) && (value = false), key ? get(obj, value) : [];
    }
    /**
     * @param {number} target
     * @return {?}
     */
    function listen(target) {
      var value = target ? target.length : 0;
      return value ? get(target, true) : [];
    }
    /**
     * @param {!Object} value
     * @param {number} key
     * @param {number} fromIndex
     * @return {?}
     */
    function indexOf(value, key, fromIndex) {
      var length = value ? value.length : 0;
      if (!length) {
        return -1;
      }
      if ("number" == typeof fromIndex) {
        fromIndex = 0 > fromIndex ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else {
        if (fromIndex) {
          var i = toObject(value, key);
          return length > i && (key === key ? key === value[i] : value[i] !== value[i]) ? i : -1;
        }
      }
      return find(value, key, fromIndex || 0);
    }
    /**
     * @param {undefined} el
     * @return {?}
     */
    function manual(el) {
      return animate(el, 1);
    }
    /**
     * @param {string} list
     * @return {?}
     */
    function concat(list) {
      var length = list ? list.length : 0;
      return length ? list[length - 1] : undefined;
    }
    /**
     * @param {!Object} array
     * @param {number} value
     * @param {number} fromIndex
     * @return {?}
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var i = length;
      if ("number" == typeof fromIndex) {
        i = (0 > fromIndex ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else {
        if (fromIndex) {
          /** @type {number} */
          i = toObject(array, value, true) - 1;
          var other = array[i];
          return (value === value ? value === other : other !== other) ? i : -1;
        }
      }
      if (value !== value) {
        return apply(array, i, true);
      }
      for (; i--;) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    /**
     * @return {?}
     */
    function Event() {
      /** @type {!Arguments} */
      var args = arguments;
      var event = args[0];
      if (!event || !event.length) {
        return event;
      }
      /** @type {number} */
      var i = 0;
      var check = call();
      /** @type {number} */
      var l = args.length;
      for (; ++i < l;) {
        /** @type {number} */
        var start = 0;
        var x = args[i];
        for (; (start = check(event, x, start)) > -1;) {
          array_splice.call(event, start, 1);
        }
      }
      return event;
    }
    /**
     * @param {?} obj
     * @param {?} options
     * @param {string} value
     * @return {?}
     */
    function add(obj, options, value) {
      /** @type {!Array} */
      var n = [];
      if (!obj || !obj.length) {
        return n;
      }
      /** @type {number} */
      var key = -1;
      /** @type {!Array} */
      var t = [];
      var len = obj.length;
      options = $(options, value, 3);
      for (; ++key < len;) {
        var type = obj[key];
        if (options(type, key, obj)) {
          n.push(type);
          t.push(key);
        }
      }
      return j(obj, t), n;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function tail(name) {
      return drop(name, 1);
    }
    /**
     * @param {number} c
     * @param {number} n
     * @param {!Array} i
     * @return {?}
     */
    function formatNumber(c, n, i) {
      var l = c ? c.length : 0;
      return l ? (i && "number" != typeof i && callback(c, n, i) && (n = 0, i = l), slice(c, n, i)) : [];
    }
    /**
     * @param {number} options
     * @param {number} length
     * @param {!Object} value
     * @return {?}
     */
    function first(options, length, value) {
      var keepIdx = options ? options.length : 0;
      return keepIdx ? ((value ? callback(options, length, value) : null == length) && (length = 1), slice(options, 0, 0 > length ? 0 : length)) : [];
    }
    /**
     * @param {number} start
     * @param {number} length
     * @param {!Object} value
     * @return {?}
     */
    function without(start, length, value) {
      var code = start ? start.length : 0;
      return code ? ((value ? callback(start, length, value) : null == length) && (length = 1), length = code - (+length || 0), slice(start, 0 > length ? 0 : length)) : [];
    }
    /**
     * @param {!Array} array
     * @param {!Object} t
     * @param {!Object} n
     * @return {?}
     */
    function initial(array, t, n) {
      return array && array.length ? baseWhile(array, $(t, n, 3), false, true) : [];
    }
    /**
     * @param {!Array} array
     * @param {!Object} condition
     * @param {!Object} f
     * @return {?}
     */
    function takeWhile(array, condition, f) {
      return array && array.length ? baseWhile(array, $(condition, f, 3)) : [];
    }
    /**
     * @param {number} array
     * @param {!Object} isSorted
     * @param {!Object} iteratee
     * @param {!Array} thisArg
     * @return {?}
     */
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (null != isSorted && "boolean" != typeof isSorted) {
        /** @type {!Object} */
        thisArg = iteratee;
        iteratee = callback(array, isSorted, thisArg) ? undefined : isSorted;
        /** @type {boolean} */
        isSorted = false;
      }
      var baseCallback = $();
      return (null != iteratee || baseCallback !== match) && (iteratee = baseCallback(iteratee, thisArg, 3)), isSorted && call() === find ? sort(array, iteratee) : baseUniq(array, iteratee);
    }
    /**
     * @param {string} obj
     * @return {?}
     */
    function render(obj) {
      if (!obj || !obj.length) {
        return [];
      }
      /** @type {number} */
      var i = -1;
      /** @type {number} */
      var length = 0;
      obj = init(obj, function(group) {
        return isNaN(group) ? (length = nativeMax(group.length, length), true) : void 0;
      });
      var ret = Array(length);
      for (; ++i < length;) {
        ret[i] = f(obj, g(i));
      }
      return ret;
    }
    /**
     * @param {number} options
     * @param {!Object} key
     * @param {?} obj
     * @return {?}
     */
    function all(options, key, obj) {
      var replacementContext = options ? options.length : 0;
      if (!replacementContext) {
        return [];
      }
      var node = render(options);
      return null == key ? node : (key = next(key, obj, 4), f(node, function(x1) {
        return b(x1, key, undefined, true);
      }));
    }
    /**
     * @return {?}
     */
    function baseXor() {
      /** @type {number} */
      var i = -1;
      /** @type {number} */
      var length = arguments.length;
      for (; ++i < length;) {
        var array = arguments[i];
        if (isNaN(array)) {
          var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
        }
      }
      return result ? baseUniq(result) : [];
    }
    /**
     * @param {number} keys
     * @param {number} vals
     * @return {?}
     */
    function zipObject(keys, vals) {
      /** @type {number} */
      var i = -1;
      var len = keys ? keys.length : 0;
      var result = {};
      if (!(!len || vals || isArray(keys[0]))) {
        /** @type {!Array} */
        vals = [];
      }
      for (; ++i < len;) {
        var key = keys[i];
        if (vals) {
          result[key] = vals[i];
        } else {
          if (key) {
            result[key[0]] = key[1];
          }
        }
      }
      return result;
    }
    /**
     * @param {!Window} obj
     * @return {?}
     */
    function chain(obj) {
      var result = exports(obj);
      return result.__chain__ = true, result;
    }
    /**
     * @param {?} value
     * @param {!Function} map
     * @param {?} obj
     * @return {?}
     */
    function tap(value, map, obj) {
      return map.call(obj, value), value;
    }
    /**
     * @param {?} obj
     * @param {?} options
     * @param {string} value
     * @return {?}
     */
    function index(obj, options, value) {
      return options.call(value, obj);
    }
    /**
     * @return {?}
     */
    function wrapperChain() {
      return chain(this);
    }
    /**
     * @return {?}
     */
    function lodashWrapper() {
      return new LodashWrapper(this.value(), this.__chain__);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function wrapperPlant(value) {
      var result;
      var parent = this;
      for (; parent instanceof lodash;) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      return previous.__wrapped__ = value, result;
    }
    /**
     * @return {?}
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      /**
       * @param {!Array} array
       * @return {?}
       */
      var r = function(array) {
        return array.reverse();
      };
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), wrapped.__actions__.push({
          func : index,
          args : [r],
          thisArg : undefined
        }), new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(r);
    }
    /**
     * @return {?}
     */
    function toStringBench() {
      return this.value() + "";
    }
    /**
     * @return {?}
     */
    function wrapperValue() {
      return func(this.__wrapped__, this.__actions__);
    }
    /**
     * @param {undefined} val
     * @param {undefined} key
     * @param {!Object} data
     * @return {?}
     */
    function list(val, key, data) {
      /** @type {function(number, !Function): ?} */
      var type = isArray(val) ? array : text;
      return data && callback(val, key, data) && (key = undefined), ("function" != typeof key || data !== undefined) && (key = $(key, data, 3)), type(val, key);
    }
    /**
     * @param {!Array} name
     * @param {!Object} e
     * @param {!Array} s
     * @return {?}
     */
    function filter(name, e, s) {
      /** @type {function(!Object, !Function): ?} */
      var text = isArray(name) ? init : value;
      return e = $(e, s, 3), text(name, e);
    }
    /**
     * @param {!Object} data
     * @param {undefined} output
     * @return {?}
     */
    function noop(data, output) {
      return detect(data, error(output));
    }
    /**
     * @param {string} obj
     * @param {!Array} id
     * @param {number} index
     * @param {?} data
     * @return {?}
     */
    function contains(obj, id, index, data) {
      var n = obj ? is(obj) : 0;
      return defined(n) || (obj = values(obj), n = obj.length), index = "number" != typeof index || data && callback(id, index, data) ? 0 : 0 > index ? nativeMax(n + index, 0) : index || 0, "string" == typeof obj || !isArray(obj) && has(obj) ? n >= index && obj.indexOf(id, index) > -1 : !!n && call(obj, id, index) > -1;
    }
    /**
     * @param {string} val
     * @param {!Function} node
     * @param {!Object} a
     * @return {?}
     */
    function play(val, node, a) {
      /** @type {function(string, !Function): ?} */
      var callback = isArray(val) ? f : fn;
      return node = $(node, a, 3), callback(val, node);
    }
    /**
     * @param {undefined} version
     * @param {undefined} next
     * @return {?}
     */
    function runSuite(version, next) {
      return play(version, find(next));
    }
    /**
     * @param {!Object} name
     * @param {?} e
     * @param {!Object} n
     * @return {?}
     */
    function r(name, e, n) {
      /** @type {function(!Object, !Function): ?} */
      var t = isArray(name) ? init : value;
      return e = $(e, n, 3), t(name, function(context, n, sectE) {
        return !e(context, n, sectE);
      });
    }
    /**
     * @param {!Array} target
     * @param {number} value
     * @param {!Object} fn
     * @return {?}
     */
    function resolve(target, value, fn) {
      if (fn ? callback(target, value, fn) : null == value) {
        target = clone(target);
        var length = target.length;
        return length > 0 ? target[baseRandom(0, length - 1)] : undefined;
      }
      /** @type {number} */
      var i = -1;
      var x = toArray(target);
      length = x.length;
      /** @type {number} */
      var index = length - 1;
      value = nativeMin(0 > value ? 0 : +value || 0, length);
      for (; ++i < value;) {
        var j = baseRandom(i, index);
        var len = x[j];
        x[j] = x[i];
        x[i] = len;
      }
      return x.length = value, x;
    }
    /**
     * @param {undefined} obj
     * @return {?}
     */
    function shuffle(obj) {
      return resolve(obj, y);
    }
    /**
     * @param {string} data
     * @return {?}
     */
    function save(data) {
      var value = data ? is(data) : 0;
      return defined(value) ? value : keys(data).length;
    }
    /**
     * @param {!Array} item
     * @param {string} value
     * @param {!Object} data
     * @return {?}
     */
    function some(item, value, data) {
      /** @type {function(!Array, string): ?} */
      var action = isArray(item) ? remove : restore;
      return data && callback(item, value, data) && (value = undefined), ("function" != typeof value || data !== undefined) && (value = $(value, data, 3)), action(item, value);
    }
    /**
     * @param {string} name
     * @param {!Array} condition
     * @param {!Object} value
     * @return {?}
     */
    function sortBy(name, condition, value) {
      if (null == name) {
        return [];
      }
      if (value && callback(name, condition, value)) {
        condition = undefined;
      }
      /** @type {number} */
      var index = -1;
      condition = $(condition, value, 3);
      var plugin = fn(name, function(value, key, member) {
        return {
          criteria : condition(value, key, member),
          index : ++index,
          value : value
        };
      });
      return map(plugin, all);
    }
    /**
     * @param {string} height
     * @param {?} type
     * @param {!Object} index
     * @param {!Object} data
     * @return {?}
     */
    function size(height, type, index, data) {
      return null == height ? [] : (data && callback(type, index, data) && (index = undefined), isArray(type) || (type = null == type ? [] : [type]), isArray(index) || (index = null == index ? [] : [index]), loop(height, type, index));
    }
    /**
     * @param {!Object} data
     * @param {boolean} value
     * @return {?}
     */
    function where(data, value) {
      return filter(data, error(value));
    }
    /**
     * @param {string} n
     * @param {string} callback
     * @return {?}
     */
    function after(n, callback) {
      if ("function" != typeof callback) {
        if ("function" != typeof n) {
          throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
        }
        var namespace = n;
        /** @type {string} */
        n = callback;
        callback = namespace;
      }
      return n = nativeIsFinite(n = +n) ? n : 0, function() {
        return --n < 1 ? callback.apply(this, arguments) : void 0;
      };
    }
    /**
     * @param {string} arr
     * @param {!Object} a
     * @param {!Object} item
     * @return {?}
     */
    function findIndex(arr, a, item) {
      return item && callback(arr, a, item) && (a = undefined), a = arr && null == a ? arr.length : nativeMax(+a || 0, 0), format(arr, ARY_FLAG, undefined, undefined, undefined, undefined, a);
    }
    /**
     * @param {!Object} callback
     * @param {string} fn
     * @return {?}
     */
    function before(callback, fn) {
      var _ref12;
      if ("function" != typeof fn) {
        if ("function" != typeof callback) {
          throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
        }
        var prop = callback;
        callback = fn;
        fn = prop;
      }
      return function() {
        return --callback > 0 && (_ref12 = fn.apply(this, arguments)), 1 >= callback && (fn = undefined), _ref12;
      };
    }
    /**
     * @param {!Function} fn
     * @param {number} wait
     * @param {!Object} options
     * @return {?}
     */
    function debounce(fn, wait, options) {
      /**
       * @return {undefined}
       */
      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        /** @type {number} */
        lastCalled = 0;
        maxTimeoutId = timeoutId = trailingCall = undefined;
      }
      /**
       * @param {boolean} isCalled
       * @param {?} id
       * @return {undefined}
       */
      function complete(isCalled, id) {
        if (id) {
          clearTimeout(id);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = now();
          previous = fn.apply(d, a);
          if (!(timeoutId || maxTimeoutId)) {
            a = d = undefined;
          }
        }
      }
      /**
       * @return {undefined}
       */
      function delayed() {
        /** @type {number} */
        var remaining = wait - (now() - stamp);
        if (0 >= remaining || remaining > wait) {
          complete(trailingCall, maxTimeoutId);
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }
      /**
       * @return {undefined}
       */
      function maxDelayed() {
        complete(trailing, timeoutId);
      }
      /**
       * @return {?}
       */
      function debounced() {
        if (a = arguments, stamp = now(), d = this, trailingCall = trailing && (timeoutId || !leading), maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!(maxTimeoutId || leading)) {
            lastCalled = stamp;
          }
          /** @type {number} */
          var remaining = maxWait - (stamp - lastCalled);
          /** @type {boolean} */
          var isCalled = 0 >= remaining || remaining > maxWait;
          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            previous = fn.apply(d, a);
          } else {
            if (!maxTimeoutId) {
              maxTimeoutId = setTimeout(maxDelayed, remaining);
            }
          }
        }
        return isCalled && timeoutId ? timeoutId = clearTimeout(timeoutId) : timeoutId || wait === maxWait || (timeoutId = setTimeout(delayed, wait)), leadingCall && (isCalled = true, previous = fn.apply(d, a)), !isCalled || timeoutId || maxTimeoutId || (a = d = undefined), previous;
      }
      var a;
      var maxTimeoutId;
      var previous;
      var stamp;
      var d;
      var timeoutId;
      var trailingCall;
      /** @type {number} */
      var lastCalled = 0;
      /** @type {boolean} */
      var maxWait = false;
      /** @type {boolean} */
      var trailing = true;
      if ("function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      if (wait = 0 > wait ? 0 : +wait || 0, options === true) {
        /** @type {boolean} */
        var leading = true;
        /** @type {boolean} */
        trailing = false;
      } else {
        if (isObject(options)) {
          /** @type {boolean} */
          leading = !!options.leading;
          maxWait = "maxWait" in options && nativeMax(+options.maxWait || 0, wait);
          /** @type {boolean} */
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
      }
      return debounced.cancel = cancel, debounced;
    }
    /**
     * @param {!Function} callback
     * @param {!Function} fn
     * @return {?}
     */
    function memoize(callback, fn) {
      if ("function" != typeof callback || fn && "function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      /**
       * @return {?}
       */
      var memoized = function() {
        /** @type {!Arguments} */
        var response = arguments;
        var key = fn ? fn.apply(this, response) : response[0];
        var cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = callback.apply(this, response);
        return memoized.cache = cache.set(key, result), result;
      };
      return memoized.cache = new memoize.Cache, memoized;
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function negate(fn) {
      if ("function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      return function() {
        return !fn.apply(this, arguments);
      };
    }
    /**
     * @param {!Function} next
     * @return {?}
     */
    function once(next) {
      return before(2, next);
    }
    /**
     * @param {!Function} fn
     * @param {string} start
     * @return {?}
     */
    function require(fn, start) {
      if ("function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      return start = nativeMax(start === undefined ? fn.length - 1 : +start || 0, 0), function() {
        /** @type {!Arguments} */
        var a = arguments;
        /** @type {number} */
        var i = -1;
        var length = nativeMax(a.length - start, 0);
        var data = Array(length);
        for (; ++i < length;) {
          data[i] = a[start + i];
        }
        switch(start) {
          case 0:
            return fn.call(this, data);
          case 1:
            return fn.call(this, a[0], data);
          case 2:
            return fn.call(this, a[0], a[1], data);
        }
        var c = Array(start + 1);
        /** @type {number} */
        i = -1;
        for (; ++i < start;) {
          c[i] = a[i];
        }
        return c[start] = data, fn.apply(this, c);
      };
    }
    /**
     * @param {!Function} callback
     * @return {?}
     */
    function spread(callback) {
      if ("function" != typeof callback) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      return function(json) {
        return callback.apply(this, json);
      };
    }
    /**
     * @param {!Function} fn
     * @param {undefined} wait
     * @param {!Object} options
     * @return {?}
     */
    function throttle(fn, wait, options) {
      /** @type {boolean} */
      var leading = true;
      /** @type {boolean} */
      var trailing = true;
      if ("function" != typeof fn) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      return options === false ? leading = false : isObject(options) && (leading = "leading" in options ? !!options.leading : leading, trailing = "trailing" in options ? !!options.trailing : trailing), debounce(fn, wait, {
        leading : leading,
        maxWait : +wait,
        trailing : trailing
      });
    }
    /**
     * @param {?} elem
     * @param {!Function} i
     * @return {?}
     */
    function last(elem, i) {
      return i = null == i ? c : i, format(i, button, undefined, [elem], []);
    }
    /**
     * @param {boolean} e
     * @param {number} options
     * @param {number} n
     * @param {number} t
     * @return {?}
     */
    function cycle(e, options, n, t) {
      return options && "boolean" != typeof options && callback(e, options, n) ? options = false : "function" == typeof options && (t = n, n = options, options = false), "function" == typeof n ? baseClone(e, options, next(n, t, 3)) : baseClone(e, options);
    }
    /**
     * @param {?} data
     * @param {!Function} fn
     * @param {?} callback
     * @return {?}
     */
    function cloneDeep(data, fn, callback) {
      return "function" == typeof fn ? baseClone(data, true, next(fn, callback, 3)) : baseClone(data, true);
    }
    /**
     * @param {(Date|number)} a
     * @param {!Date} b
     * @return {?}
     */
    function url(a, b) {
      return a > b;
    }
    /**
     * @param {(boolean|number|string)} d
     * @param {(boolean|number|string)} a
     * @return {?}
     */
    function min(d, a) {
      return d >= a;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isArguments(value) {
      return isString(value) && isNaN(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isBoolean(value) {
      return value === true || value === false || isString(value) && objectToString.call(value) == arrayBufferTag;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isDate(value) {
      return isString(value) && objectToString.call(value) == boolTag;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isElement(value) {
      return !!value && 1 === value.nodeType && isString(value) && !isPlainObject(value);
    }
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function isEmpty(obj) {
      return null == obj ? true : isNaN(obj) && (isArray(obj) || has(obj) || isArguments(obj) || isString(obj) && isFunction(obj.splice)) ? !obj.length : !keys(obj).length;
    }
    /**
     * @param {?} value
     * @param {?} options
     * @param {undefined} callback
     * @param {?} e
     * @return {?}
     */
    function isEqual(value, options, callback, e) {
      callback = "function" == typeof callback ? next(callback, e, 3) : undefined;
      var result = callback ? callback(value, options) : undefined;
      return result === undefined ? baseIsEqual(value, options, callback) : !!result;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isError(value) {
      return isString(value) && "string" == typeof value.message && objectToString.call(value) == dateTag;
    }
    /**
     * @param {number} val
     * @return {?}
     */
    function isFinite(val) {
      return "number" == typeof val && nativeIsFinite(val);
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isFunction(value) {
      return isObject(value) && objectToString.call(value) == funcTag;
    }
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function isObject(obj) {
      /** @type {string} */
      var type = typeof obj;
      return !!obj && ("object" == type || "function" == type);
    }
    /**
     * @param {?} type
     * @param {!Arguments} value
     * @param {undefined} i
     * @param {?} e
     * @return {?}
     */
    function isMatch(type, value, i, e) {
      return i = "function" == typeof i ? next(i, e, 3) : undefined, replace(type, split(value), i);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function eq(value) {
      return isNumber(value) && value != +value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isNative(value) {
      return null == value ? false : isFunction(value) ? reIsNative.test(fnToString.call(value)) : isString(value) && trueRE.test(value);
    }
    /**
     * @param {!Object} val
     * @return {?}
     */
    function isNull(val) {
      return null === val;
    }
    /**
     * @param {!Array} value
     * @return {?}
     */
    function isNumber(value) {
      return "number" == typeof value || isString(value) && objectToString.call(value) == numberTag;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isPlainObject(value) {
      var ctor;
      if (!isString(value) || objectToString.call(value) != a || isArguments(value) || !hasOwnProperty.call(value, "constructor") && (ctor = value.constructor, "function" == typeof ctor && !(ctor instanceof ctor))) {
        return false;
      }
      var result;
      return apply(value, function(canCreateDiscussions, textCode) {
        result = textCode;
      }), result === undefined || hasOwnProperty.call(value, result);
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function isRegExp(value) {
      return isObject(value) && objectToString.call(value) == regexpTag;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function has(value) {
      return "string" == typeof value || isString(value) && objectToString.call(value) == stringTag;
    }
    /**
     * @param {!Array} value
     * @return {?}
     */
    function isTypedArray(value) {
      return isString(value) && defined(value.length) && !!typedArrayTags[objectToString.call(value)];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isUndefined(value) {
      return value === undefined;
    }
    /**
     * @param {!Date} value
     * @param {(Date|number)} max
     * @return {?}
     */
    function max(value, max) {
      return max > value;
    }
    /**
     * @param {(boolean|number|string)} a
     * @param {(boolean|number|string)} b
     * @return {?}
     */
    function lte(a, b) {
      return b >= a;
    }
    /**
     * @param {!Array} value
     * @return {?}
     */
    function toArray(value) {
      var result = value ? is(value) : 0;
      return defined(result) ? result ? copyArray(value) : [] : values(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }
    /**
     * @param {?} obj
     * @param {?} options
     * @param {string} data
     * @return {?}
     */
    function create(obj, options, data) {
      var opts = baseCreate(obj);
      return data && callback(obj, options, data) && (options = undefined), options ? debug(opts, options) : opts;
    }
    /**
     * @param {boolean} object
     * @return {?}
     */
    function functions(object) {
      return copyObject(object, keysIn(object));
    }
    /**
     * @param {!Object} value
     * @param {string} data
     * @param {!Object} obj
     * @return {?}
     */
    function getId(value, data, obj) {
      var limit = null == value ? undefined : log(value, toString(data), data + "");
      return limit === undefined ? obj : limit;
    }
    /**
     * @param {!Object} value
     * @param {string} result
     * @return {?}
     */
    function flatten(value, result) {
      if (null == value) {
        return false;
      }
      var normalized = hasOwnProperty.call(value, result);
      if (!normalized && !push(result)) {
        if (result = toString(result), value = 1 == result.length ? value : log(value, slice(result, 0, -1)), null == value) {
          return false;
        }
        result = concat(result);
        normalized = hasOwnProperty.call(value, result);
      }
      return normalized || defined(value.length) && isString(result, value.length) && (isArray(value) || isArguments(value));
    }
    /**
     * @param {(Object|string)} item
     * @param {!Array} key
     * @param {!Object} data
     * @return {?}
     */
    function content(item, key, data) {
      if (data && callback(item, key, data)) {
        key = undefined;
      }
      /** @type {number} */
      var i = -1;
      var attrs = keys(item);
      var l = attrs.length;
      var m = {};
      for (; ++i < l;) {
        var v = attrs[i];
        var k = item[v];
        if (key) {
          if (hasOwnProperty.call(m, k)) {
            m[k].push(v);
          } else {
            /** @type {!Array} */
            m[k] = [v];
          }
        } else {
          m[k] = v;
        }
      }
      return m;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function keysIn(obj) {
      if (null == obj) {
        return [];
      }
      if (!isObject(obj)) {
        obj = Object(obj);
      }
      var length = obj.length;
      length = length && defined(length) && (isArray(obj) || isArguments(obj)) && length || 0;
      var c = obj.constructor;
      /** @type {number} */
      var i = -1;
      /** @type {boolean} */
      var a = "function" == typeof c && c.prototype === obj;
      var result = Array(length);
      /** @type {boolean} */
      var node = length > 0;
      for (; ++i < length;) {
        /** @type {string} */
        result[i] = i + "";
      }
      var name;
      for (name in obj) {
        if (!(node && isString(name, length) || "constructor" == name && (a || !hasOwnProperty.call(obj, name)))) {
          result.push(name);
        }
      }
      return result;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function pairs(obj) {
      obj = parseInt(obj);
      /** @type {number} */
      var i = -1;
      var props = keys(obj);
      var length = props.length;
      var result = Array(length);
      for (; ++i < length;) {
        var key = props[i];
        /** @type {!Array} */
        result[i] = [key, obj[key]];
      }
      return result;
    }
    /**
     * @param {!Object} obj
     * @param {string} name
     * @param {(Object|string)} value
     * @return {?}
     */
    function serialize(obj, name, value) {
      var result = null == obj ? undefined : obj[name];
      return result === undefined && (null == obj || push(name, obj) || (name = toString(name), obj = 1 == name.length ? obj : log(obj, slice(name, 0, -1)), result = null == obj ? undefined : obj[concat(name)]), result = result === undefined ? value : result), isFunction(result) ? result.call(obj) : result;
    }
    /**
     * @param {!Object} obj
     * @param {string} value
     * @param {?} element
     * @return {?}
     */
    function setOptions(obj, value, element) {
      if (null == obj) {
        return obj;
      }
      /** @type {string} */
      var name = value + "";
      value = null != obj[name] || push(value, obj) ? [name] : toString(value);
      /** @type {number} */
      var j = -1;
      var i = value.length;
      /** @type {number} */
      var position = i - 1;
      /** @type {!Object} */
      var data = obj;
      for (; null != data && ++j < i;) {
        var type = value[j];
        if (isObject(data)) {
          if (j == position) {
            data[type] = element;
          } else {
            if (null == data[type]) {
              /** @type {(Array|{})} */
              data[type] = isString(value[j + 1]) ? [] : {};
            }
          }
        }
        data = data[type];
      }
      return obj;
    }
    /**
     * @param {?} object
     * @param {?} r
     * @param {!Object} result
     * @param {!Object} target
     * @return {?}
     */
    function transform(object, r, result, target) {
      var isArr = isArray(object) || isTypedArray(object);
      if (r = $(r, target, 4), null == result) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          result = isArr ? isArray(object) ? new Ctor : [] : baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
        } else {
          result = {};
        }
      }
      return (isArr ? forEach : baseForOwn)(object, function(trOpts, e, num) {
        return r(result, trOpts, e, num);
      }), result;
    }
    /**
     * @param {!Object} value
     * @return {?}
     */
    function values(value) {
      return pick(value, keys(value));
    }
    /**
     * @param {(Object|string)} value
     * @return {?}
     */
    function filterObject(value) {
      return pick(value, keysIn(value));
    }
    /**
     * @param {?} value
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function inRange(value, start, end) {
      return start = +start || 0, end === undefined ? (end = start, start = 0) : end = +end || 0, value >= nativeMin(start, end) && value < nativeMax(start, end);
    }
    /**
     * @param {number} min
     * @param {number} max
     * @param {!Object} floating
     * @return {?}
     */
    function random(min, max, floating) {
      if (floating && callback(min, max, floating)) {
        max = floating = undefined;
      }
      /** @type {boolean} */
      var b = null == min;
      /** @type {boolean} */
      var i = null == max;
      if (null == floating && (i && "boolean" == typeof min ? (floating = min, min = 1) : "boolean" == typeof max && (floating = max, i = true)), b && i && (max = 1, i = false), min = +min || 0, i ? (max = min, min = 0) : max = +max || 0, floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + rand * (max - min + parseFloat("1e-" + ((rand + "").length - 1))), max);
      }
      return baseRandom(min, max);
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function getKindOf(value) {
      return value = String(value), value && value.charAt(0).toUpperCase() + value.slice(1);
    }
    /**
     * @param {string} string
     * @return {?}
     */
    function lex(string) {
      return string = String(string), string && string.replace(nonAscii, escapeChar).replace(reLatin1, "");
    }
    /**
     * @param {string} target
     * @param {string} base
     * @param {number} position
     * @return {?}
     */
    function endsWith(target, base, position) {
      target = String(target);
      /** @type {string} */
      base = base + "";
      var length = target.length;
      return position = position === undefined ? length : nativeMin(0 > position ? 0 : +position || 0, length), position = position - base.length, position >= 0 && target.indexOf(base, position) == position;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function escape(str) {
      return str = String(str), str && r.test(str) ? str.replace(reUnescapedHtml, from) : str;
    }
    /**
     * @param {string} string
     * @return {?}
     */
    function escapeRegExp(string) {
      return string = String(string), string && reHasEscapedHtml.test(string) ? string.replace(reRegExpChars, escapeHtmlChar) : string || "(?:)";
    }
    /**
     * @param {string} v
     * @param {number} val
     * @param {string} message
     * @return {?}
     */
    function pad(v, val, message) {
      v = String(v);
      /** @type {number} */
      val = +val;
      var max = v.length;
      if (max >= val || !nativeIsFinite(val)) {
        return v;
      }
      /** @type {number} */
      var x = (val - max) / 2;
      var i = floor(x);
      var value = nativeCeil(x);
      return message = stringify("", value, message), message.slice(0, i) + v + message;
    }
    /**
     * @param {boolean} type
     * @param {number} name
     * @param {!Object} value
     * @return {?}
     */
    function off(type, name, value) {
      return (value ? callback(type, name, value) : null == name) ? name = 0 : name && (name = +name), type = trim(type), isValidEventType(type, name || (SIG_PATTERN.test(type) ? 16 : 10));
    }
    /**
     * @param {string} y
     * @param {number} value
     * @return {?}
     */
    function repeat(y, value) {
      /** @type {string} */
      var result = "";
      if (y = String(y), value = +value, 1 > value || !y || !nativeIsFinite(value)) {
        return result;
      }
      do {
        if (value % 2) {
          /** @type {string} */
          result = result + y;
        }
        value = floor(value / 2);
        y = y + y;
      } while (value);
      return result;
    }
    /**
     * @param {string} string
     * @param {!Object} key
     * @param {number} value
     * @return {?}
     */
    function startsWith(string, key, value) {
      return string = String(string), value = null == value ? 0 : nativeMin(0 > value ? 0 : +value || 0, string.length), string.lastIndexOf(key, value) == value;
    }
    /**
     * @param {string} key
     * @param {!Object} options
     * @param {undefined} data
     * @return {?}
     */
    function template(key, options, data) {
      var settings = exports.templateSettings;
      if (data && callback(key, options, data)) {
        options = data = undefined;
      }
      key = String(key);
      options = defaults(debug({}, data || options), settings, time);
      var enable_keys;
      var isEvaluating;
      var values = defaults(debug({}, options.imports), settings.imports, time);
      var names = keys(values);
      var a = pick(values, names);
      /** @type {number} */
      var i = 0;
      var interpolate = options.interpolate || reNoMatch;
      /** @type {string} */
      var source = "__p += '";
      var regex = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
      /** @type {string} */
      var branch = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++Re + "]") + "\n";
      key.replace(regex, function(value, canCreateDiscussions, interpolateValue, esTemplateValue, isSlidingUp, index) {
        return interpolateValue || (interpolateValue = esTemplateValue), source = source + key.slice(i, index).replace(escapeRegExp, rxFn), canCreateDiscussions && (enable_keys = true, source = source + ("' +\n__e(" + canCreateDiscussions + ") +\n'")), isSlidingUp && (isEvaluating = true, source = source + ("';\n" + isSlidingUp + ";\n__p += '")), interpolateValue && (source = source + ("' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'")), i = index + value.length, value;
      });
      source = source + "';\n";
      var variable = options.variable;
      if (!variable) {
        /** @type {string} */
        source = "with (obj) {\n" + source + "\n}\n";
      }
      source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(rbreakright, "$1").replace(rtrimcomma, "$1;");
      /** @type {string} */
      source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (enable_keys ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
      var result = generate(function() {
        return Function(names, branch + "return " + source).apply(undefined, a);
      });
      if (result.source = source, isError(result)) {
        throw result;
      }
      return result;
    }
    /**
     * @param {string} str
     * @param {string} key
     * @param {!Object} value
     * @return {?}
     */
    function trim(str, key, value) {
      /** @type {string} */
      var name = str;
      return (str = String(str)) ? (value ? callback(name, key, value) : null == key) ? str.slice(next(str), map(str) + 1) : (key = key + "", str.slice(stringify(str, key), replace(str, key) + 1)) : str;
    }
    /**
     * @param {string} str
     * @param {string} name
     * @param {!Object} value
     * @return {?}
     */
    function capitalize(str, name, value) {
      /** @type {string} */
      var key = str;
      return str = String(str), str ? (value ? callback(key, name, value) : null == name) ? str.slice(next(str)) : str.slice(stringify(str, name + "")) : str;
    }
    /**
     * @param {string} html
     * @param {string} content
     * @param {!Object} value
     * @return {?}
     */
    function tokenize(html, content, value) {
      /** @type {string} */
      var type = html;
      return html = String(html), html ? (value ? callback(type, content, value) : null == content) ? html.slice(0, map(html) + 1) : html.slice(0, replace(html, content + "") + 1) : html;
    }
    /**
     * @param {string} string
     * @param {!Object} options
     * @param {!Object} data
     * @return {?}
     */
    function truncate(string, options, data) {
      if (data && callback(string, options, data)) {
        options = undefined;
      }
      /** @type {number} */
      var length = groupSize;
      /** @type {string} */
      var omission = DEFAULT_TRUNC_OMISSION;
      if (null != options) {
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          /** @type {number} */
          length = "length" in options ? +options.length || 0 : length;
          omission = "omission" in options ? String(options.omission) : omission;
        } else {
          /** @type {number} */
          length = +options || 0;
        }
      }
      if (string = String(string), length >= string.length) {
        return string;
      }
      /** @type {number} */
      var end = length - omission.length;
      if (1 > end) {
        return omission;
      }
      var result = string.slice(0, end);
      if (null == separator) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var markup;
          var start;
          var value = string.slice(0, end);
          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || "") + "g");
          }
          /** @type {number} */
          separator.lastIndex = 0;
          for (; markup = separator.exec(value);) {
            start = markup.index;
          }
          result = result.slice(0, null == start ? end : start);
        }
      } else {
        if (string.indexOf(separator, end) != end) {
          var c = result.lastIndexOf(separator);
          if (c > -1) {
            result = result.slice(0, c);
          }
        }
      }
      return result + omission;
    }
    /**
     * @param {string} text
     * @return {?}
     */
    function unescape(text) {
      return text = String(text), text && namespace.test(text) ? text.replace(reg, fncWrap) : text;
    }
    /**
     * @param {string} string
     * @param {(Object|string)} pattern
     * @param {!Object} data
     * @return {?}
     */
    function build(string, pattern, data) {
      return data && callback(string, pattern, data) && (pattern = undefined), string = String(string), string.match(pattern || reWords) || [];
    }
    /**
     * @param {?} target
     * @param {(Object|string)} key
     * @param {string} data
     * @return {?}
     */
    function string(target, key, data) {
      return data && callback(target, key, data) && (key = undefined), isString(target) ? parse(target) : match(target, key);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function constant(value) {
      return function() {
        return value;
      };
    }
    /**
     * @param {!Object} b
     * @return {?}
     */
    function c(b) {
      return b;
    }
    /**
     * @param {(!Function|string)} value
     * @return {?}
     */
    function parse(value) {
      return error(baseClone(value, true));
    }
    /**
     * @param {string} name
     * @param {?} value
     * @return {?}
     */
    function check(name, value) {
      return validate(name, baseClone(value, true));
    }
    /**
     * @param {?} object
     * @param {string} value
     * @param {!Object} options
     * @return {?}
     */
    function mixin(object, value, options) {
      if (null == options) {
        var format = isObject(value);
        var options = format ? keys(value) : undefined;
        var data = options && options.length ? copyObject(value, options) : undefined;
        if (!(data ? data.length : format)) {
          /** @type {boolean} */
          data = false;
          /** @type {string} */
          options = value;
          value = object;
          object = this;
        }
      }
      if (!data) {
        data = copyObject(value, keys(value));
      }
      /** @type {boolean} */
      var chain = true;
      /** @type {number} */
      var a = -1;
      var isFunc = isFunction(object);
      var len = data.length;
      if (options === false) {
        /** @type {boolean} */
        chain = false;
      } else {
        if (isObject(options) && "chain" in options) {
          chain = options.chain;
        }
      }
      for (; ++a < len;) {
        var i = data[a];
        var result = value[i];
        object[i] = result;
        if (isFunc) {
          object.prototype[i] = function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__);
                var actions = result.__actions__ = copyArray(this.__actions__);
                return actions.push({
                  func : func,
                  args : arguments,
                  thisArg : object
                }), result.__chain__ = chainAll, result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }(result);
        }
      }
      return object;
    }
    /**
     * @return {?}
     */
    function noConflict() {
      return root._ = previousUnderscore, this;
    }
    /**
     * @return {undefined}
     */
    function L() {
    }
    /**
     * @param {string} e
     * @return {?}
     */
    function find(e) {
      return push(e) ? g(e) : reject(e);
    }
    /**
     * @param {!Object} query
     * @return {?}
     */
    function compose(query) {
      return function(username) {
        return log(query, toString(username), username + "");
      };
    }
    /**
     * @param {!Object} start
     * @param {!Object} end
     * @param {!Object} step
     * @return {?}
     */
    function baseRange(start, end, step) {
      if (step && callback(start, end, step)) {
        end = step = undefined;
      }
      /** @type {number} */
      start = +start || 0;
      /** @type {number} */
      step = null == step ? 1 : +step || 0;
      if (null == end) {
        /** @type {!Object} */
        end = start;
        /** @type {number} */
        start = 0;
      } else {
        /** @type {number} */
        end = +end || 0;
      }
      /** @type {number} */
      var index = -1;
      var length = nativeMax(nativeCeil((end - start) / (step || 1)), 0);
      var result = Array(length);
      for (; ++index < length;) {
        /** @type {!Object} */
        result[index] = start;
        /** @type {number} */
        start = start + step;
      }
      return result;
    }
    /**
     * @param {number} n
     * @param {!Function} value
     * @param {?} fn
     * @return {?}
     */
    function times(n, value, fn) {
      if (n = floor(n), 1 > n || !nativeIsFinite(n)) {
        return [];
      }
      /** @type {number} */
      var i = -1;
      var ret = Array(nativeMin(n, len));
      value = next(value, fn, 1);
      for (; ++i < n;) {
        if (len > i) {
          ret[i] = value(i);
        } else {
          value(i);
        }
      }
      return ret;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function uniqueId(str) {
      /** @type {number} */
      var fileContents = ++callId;
      return String(str) + fileContents;
    }
    /**
     * @param {?} obj
     * @param {?} options
     * @return {?}
     */
    function forIn(obj, options) {
      return (+obj || 0) + (+options || 0);
    }
    /**
     * @param {?} value
     * @param {string} key
     * @param {!Object} data
     * @return {?}
     */
    function sum(value, key, data) {
      return data && callback(value, key, data) && (key = undefined), key = $(key, data, 3), 1 == key.length ? aggregate(isArray(value) ? value : clone(value), key) : recurse(value, key);
    }
    global = global ? _.defaults(root.Object(), global, _.pick(root, contextProps)) : root;
    var Array = global.Array;
    var Date = global.Date;
    var Error = global.Error;
    var Function = global.Function;
    var Math = global.Math;
    var config = global.Number;
    var Object = global.Object;
    var RegExp = global.RegExp;
    var String = global.String;
    var TypeError = global.TypeError;
    var arrayProto = Array.prototype;
    var objectProto = Object.prototype;
    var StringProto = String.prototype;
    var fnToString = Function.prototype.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    /** @type {number} */
    var callId = 0;
    var objectToString = objectProto.toString;
    var previousUnderscore = root._;
    var reIsNative = RegExp("^" + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var ArrayBuffer = global.ArrayBuffer;
    var clearTimeout = global.clearTimeout;
    var parseFloat = global.parseFloat;
    var pow = Math.pow;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var Set = getNative(global, "Set");
    var setTimeout = global.setTimeout;
    var array_splice = arrayProto.splice;
    var Uint8Array = global.Uint8Array;
    var WeakMap = getNative(global, "WeakMap");
    var nativeCeil = Math.ceil;
    var nativeCreate = getNative(Object, "create");
    var floor = Math.floor;
    var nativeIsArray = getNative(Array, "isArray");
    var nativeIsFinite = global.isFinite;
    var nativeKeys = getNative(Object, "keys");
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var nativeNow = getNative(Date, "now");
    var isValidEventType = global.parseInt;
    var nativeRandom = Math.random;
    var x = config.NEGATIVE_INFINITY;
    var y = config.POSITIVE_INFINITY;
    /** @type {number} */
    var len = 4294967295;
    /** @type {number} */
    var end = len - 1;
    /** @type {number} */
    var halfLen = len >>> 1;
    /** @type {number} */
    var k = 9007199254740991;
    var m = WeakMap && new WeakMap;
    var jsonData = {};
    exports.support = {};
    exports.templateSettings = {
      escape : _digitExpr,
      evaluate : evaluate,
      interpolate : reInterpolate,
      variable : "",
      imports : {
        _ : exports
      }
    };
    var baseCreate = function() {
      /**
       * @return {undefined}
       */
      function exports() {
      }
      return function(it) {
        if (isObject(it)) {
          /** @type {!Object} */
          exports.prototype = it;
          var baseuri = new exports;
          exports.prototype = undefined;
        }
        return baseuri || {};
      };
    }();
    var cb = update(baseForOwn);
    var args = update(a, true);
    var fail = req();
    var iterator = req(true);
    /** @type {!Function} */
    var PATCH = m ? function(n, a) {
      return m.set(n, a), n;
    } : c;
    /** @type {!Function} */
    var getData = m ? function(input) {
      return m.get(input);
    } : L;
    var is = g("length");
    var handler = function() {
      /** @type {number} */
      var num_summed = 0;
      /** @type {number} */
      var prevT = 0;
      return function(settings, cX1) {
        var currT = now();
        /** @type {number} */
        var barMax = w - (currT - prevT);
        if (prevT = currT, barMax > 0) {
          if (++num_summed >= summands) {
            return settings;
          }
        } else {
          /** @type {number} */
          num_summed = 0;
        }
        return PATCH(settings, cX1);
      };
    }();
    var difference = require(function(value, values) {
      return isString(value) && isNaN(value) ? baseDifference(value, get(values, false, true)) : [];
    });
    var $$Immutable$iter$$findIndex = diff();
    var found = diff(true);
    var intersection = require(function(obj) {
      var cube_grid_axis_min = obj.length;
      var i = cube_grid_axis_min;
      var e = Array(l);
      var bind = call();
      /** @type {boolean} */
      var isCommon = bind === find;
      /** @type {!Array} */
      var el = [];
      for (; i--;) {
        var value = obj[i] = isNaN(value = obj[i]) ? value : [];
        e[i] = isCommon && value.length >= 120 ? createCache(i && value) : null;
      }
      var a = obj[0];
      /** @type {number} */
      var j = -1;
      var l = a ? a.length : 0;
      var selector = e[0];
      e: for (; ++j < l;) {
        if (value = a[j], (selector ? select(selector, value) : bind(el, value, 0)) < 0) {
          i = cube_grid_axis_min;
          for (; --i;) {
            var selector = e[i];
            if ((selector ? select(selector, value) : bind(obj[i], value, 0)) < 0) {
              continue e;
            }
          }
          if (selector) {
            selector.push(value);
          }
          el.push(value);
        }
      }
      return el;
    });
    var CheckDailyStat = require(function(t, result) {
      result = get(result);
      var n = compare(t, result);
      return j(t, result.sort(compareAscending)), n;
    });
    var logger = login();
    var CreateSBTreeClass = login(true);
    var union = require(function(result) {
      return baseUniq(get(result, false, true));
    });
    var EffectChain = require(function(value, property) {
      return isNaN(value) ? baseDifference(value, property) : [];
    });
    var bar = require(render);
    var GenerateGif = require(function(nodes) {
      var i = nodes.length;
      var options = i > 2 ? nodes[i - 2] : undefined;
      var value = i > 1 ? nodes[i - 1] : undefined;
      return i > 2 && "function" == typeof options ? i = i - 2 : (options = i > 1 && "function" == typeof value ? (--i, value) : undefined, value = undefined), nodes.length = i, all(nodes, options, value);
    });
    var TagHourlyStat = require(function(b) {
      return b = get(b), this.thru(function(value) {
        return zip(isArray(value) ? value : [parseInt(value)], b);
      });
    });
    var at = require(function(serialized, b) {
      return compare(serialized, get(b));
    });
    var chmod = exec(function(modules, n, moduleId) {
      if (hasOwnProperty.call(modules, moduleId)) {
        ++modules[moduleId];
      } else {
        /** @type {number} */
        modules[moduleId] = 1;
      }
    });
    var detect = load(cb);
    var Complex = load(args, true);
    var out = bind(forEach, cb);
    var instance = bind(invoke, args);
    var install = exec(function(obj, value, key) {
      if (hasOwnProperty.call(obj, key)) {
        obj[key].push(value);
      } else {
        /** @type {!Array} */
        obj[key] = [value];
      }
    });
    var matches = exec(function(args, withoutSuffix, callbackArgumentIndex) {
      args[callbackArgumentIndex] = withoutSuffix;
    });
    var action = require(function(obj, name, id) {
      /** @type {number} */
      var L = -1;
      /** @type {boolean} */
      var parent = "function" == typeof name;
      var data = push(name);
      var arr = isNaN(obj) ? Array(obj.length) : [];
      return cb(obj, function(value) {
        var item = parent ? name : data && null != value ? value[name] : undefined;
        arr[++L] = item ? item.apply(value, id) : set(value, name, id);
      }), arr;
    });
    var $$Immutable$iter$$partition = exec(function(e, t, horiz) {
      e[horiz ? 0 : 1].push(t);
    }, function() {
      return [[], []];
    });
    var reduce = search(b, cb);
    var t = search(type, args);
    var color = require(function(height, result) {
      if (null == height) {
        return [];
      }
      var data = result[2];
      return data && callback(result[0], result[1], data) && (result.length = 1), loop(height, get(result), []);
    });
    var now = nativeNow || function() {
      return (new Date).getTime();
    };
    var el = require(function(ya, a, namespace) {
      /** @type {number} */
      var k = index;
      if (namespace.length) {
        var title = get(namespace, el.placeholder);
        /** @type {number} */
        k = k | button;
      }
      return format(ya, k, a, namespace, title);
    });
    var bindAll = require(function(value, options) {
      options = options.length ? get(options) : functions(value);
      /** @type {number} */
      var n = -1;
      var max = options.length;
      for (; ++n < max;) {
        var i = options[n];
        value[i] = format(value[i], index, value);
      }
      return value;
    });
    var field = require(function(a, ya, namespace) {
      /** @type {number} */
      var _buttons = index | BIND_KEY_FLAG;
      if (namespace.length) {
        var title = get(namespace, field.placeholder);
        /** @type {number} */
        _buttons = _buttons | button;
      }
      return format(ya, _buttons, a, namespace, title);
    });
    var curry = isHostType(CURRY_FLAG);
    var monday = isHostType(d);
    var defer = require(function(e, result) {
      return walk(e, 1, result);
    });
    var delay = require(function(e, c, result) {
      return walk(e, c, result);
    });
    var flow = createFlow();
    var NodeConstructor = createFlow(true);
    var createNil = require(function(callback, data) {
      if (data = get(data), "function" != typeof callback || !array(data, fn)) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      var max = data.length;
      return require(function(args) {
        var i = nativeMin(args.length, max);
        for (; i--;) {
          args[i] = data[i](args[i]);
        }
        return callback.apply(this, args);
      });
    });
    var tags = query(button);
    var partialRight = query(evt);
    var edgequad = require(function(ya, channel) {
      return format(ya, REARG_FLAG, undefined, undefined, undefined, get(channel));
    });
    var isArray = nativeIsArray || function(value) {
      return isString(value) && defined(value.length) && objectToString.call(value) == argsTag;
    };
    var done = expect(copy);
    var assign = expect(function(b, key, a) {
      return a ? defaults(b, key, a) : debug(b, key);
    });
    var defaultOptions = method(assign, name);
    var promise = method(done, response);
    var findKey = createElement(baseForOwn);
    var swit = createElement(a);
    var functionName = attempt(fail);
    var symbol = attempt(iterator);
    var forOwn = factory(baseForOwn);
    var vnode = factory(a);
    /** @type {function(!Object): ?} */
    var keys = nativeKeys ? function(object) {
      var data = null == object ? undefined : object.constructor;
      return "function" == typeof data && data.prototype === object || "function" != typeof object && isNaN(object) ? shimKeys(object) : isObject(object) ? nativeKeys(object) : [];
    } : shimKeys;
    var toggle = partial(true);
    var node = partial();
    var omit = require(function(object, result) {
      if (null == object) {
        return {};
      }
      if ("function" != typeof result[0]) {
        result = f(get(result), String);
        return start(object, baseDifference(keysIn(object), result));
      }
      var cb = next(result[0], result[1], 3);
      return wrap(object, function(fallbackReleases, uninstalledPackages, subnext) {
        return !cb(fallbackReleases, uninstalledPackages, subnext);
      });
    });
    var view = require(function(e, params) {
      return null == e ? {} : "function" == typeof params[0] ? wrap(e, next(params[0], params[1], 3)) : start(e, get(params));
    });
    var camelCase = createCompounder(function(result, word, index) {
      return word = word.toLowerCase(), result + (index ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    });
    var kebabCase = createCompounder(function(yuiModule, p_Interval, leadingHyphen) {
      return yuiModule + (leadingHyphen ? "-" : "") + p_Interval.toLowerCase();
    });
    var padLeft = each();
    var padRight = each(true);
    var snakeCase = createCompounder(function(yuiModule, p_Interval, leadingHyphen) {
      return yuiModule + (leadingHyphen ? "_" : "") + p_Interval.toLowerCase();
    });
    var startCase = createCompounder(function(res, e, after) {
      return res + (after ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1));
    });
    var generate = require(function(callback, r) {
      try {
        return callback.apply(undefined, r);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });
    var foo = require(function(memberCK, sceneId) {
      return function(n) {
        return set(n, memberCK, sceneId);
      };
    });
    var BetterInterface = require(function(parSets, sceneId) {
      return function(memberCK) {
        return set(parSets, memberCK, sceneId);
      };
    });
    var ceil = result("ceil");
    var failure = result("floor");
    var data = test(url, x);
    var n = test(max, y);
    var round = result("round");
    return exports.prototype = lodash.prototype, LodashWrapper.prototype = baseCreate(lodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(lodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, MapCache.prototype["delete"] = hashDelete, MapCache.prototype.get = bindKey, MapCache.prototype.has = Program, MapCache.prototype.set = listCacheSet, SetCache.prototype.push = cachePush, memoize.Cache = MapCache, exports.after = after, exports.ary = 
    findIndex, exports.assign = assign, exports.at = at, exports.before = before, exports.bind = el, exports.bindAll = bindAll, exports.bindKey = field, exports.callback = string, exports.chain = chain, exports.chunk = range, exports.compact = compact, exports.constant = constant, exports.countBy = chmod, exports.create = create, exports.curry = curry, exports.curryRight = monday, exports.debounce = debounce, exports.defaults = defaultOptions, exports.defaultsDeep = promise, exports.defer = defer, 
    exports.delay = delay, exports.difference = difference, exports.drop = drop, exports.dropRight = animate, exports.dropRightWhile = getItem, exports.dropWhile = dropWhile, exports.fill = fill, exports.filter = filter, exports.flatten = compute, exports.flattenDeep = listen, exports.flow = flow, exports.flowRight = NodeConstructor, exports.forEach = out, exports.forEachRight = instance, exports.forIn = functionName, exports.forInRight = symbol, exports.forOwn = forOwn, exports.forOwnRight = vnode, 
    exports.functions = functions, exports.groupBy = install, exports.indexBy = matches, exports.initial = manual, exports.intersection = intersection, exports.invert = content, exports.invoke = action, exports.keys = keys, exports.keysIn = keysIn, exports.map = play, exports.mapKeys = toggle, exports.mapValues = node, exports.matches = parse, exports.matchesProperty = check, exports.memoize = memoize, exports.merge = done, exports.method = foo, exports.methodOf = BetterInterface, exports.mixin = 
    mixin, exports.modArgs = createNil, exports.negate = negate, exports.omit = omit, exports.once = once, exports.pairs = pairs, exports.partial = tags, exports.partialRight = partialRight, exports.partition = $$Immutable$iter$$partition, exports.pick = view, exports.pluck = runSuite, exports.property = find, exports.propertyOf = compose, exports.pull = Event, exports.pullAt = CheckDailyStat, exports.range = baseRange, exports.rearg = edgequad, exports.reject = r, exports.remove = add, exports.rest = 
    tail, exports.restParam = require, exports.set = setOptions, exports.shuffle = shuffle, exports.slice = formatNumber, exports.sortBy = sortBy, exports.sortByAll = color, exports.sortByOrder = size, exports.spread = spread, exports.take = first, exports.takeRight = without, exports.takeRightWhile = initial, exports.takeWhile = takeWhile, exports.tap = tap, exports.throttle = throttle, exports.thru = index, exports.times = times, exports.toArray = toArray, exports.toPlainObject = toPlainObject, 
    exports.transform = transform, exports.union = union, exports.uniq = uniq, exports.unzip = render, exports.unzipWith = all, exports.values = values, exports.valuesIn = filterObject, exports.where = where, exports.without = EffectChain, exports.wrap = last, exports.xor = baseXor, exports.zip = bar, exports.zipObject = zipObject, exports.zipWith = GenerateGif, exports.backflow = NodeConstructor, exports.collect = play, exports.compose = NodeConstructor, exports.each = out, exports.eachRight = instance, 
    exports.extend = assign, exports.iteratee = string, exports.methods = functions, exports.object = zipObject, exports.select = filter, exports.tail = tail, exports.unique = uniq, mixin(exports, exports), exports.add = forIn, exports.attempt = generate, exports.camelCase = camelCase, exports.capitalize = getKindOf, exports.ceil = ceil, exports.clone = cycle, exports.cloneDeep = cloneDeep, exports.deburr = lex, exports.endsWith = endsWith, exports.escape = escape, exports.escapeRegExp = escapeRegExp, 
    exports.every = list, exports.find = detect, exports.findIndex = $$Immutable$iter$$findIndex, exports.findKey = findKey, exports.findLast = Complex, exports.findLastIndex = found, exports.findLastKey = swit, exports.findWhere = noop, exports.first = head, exports.floor = failure, exports.get = getId, exports.gt = url, exports.gte = min, exports.has = flatten, exports.identity = c, exports.includes = contains, exports.indexOf = indexOf, exports.inRange = inRange, exports.isArguments = isArguments, 
    exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isDate = isDate, exports.isElement = isElement, exports.isEmpty = isEmpty, exports.isEqual = isEqual, exports.isError = isError, exports.isFinite = isFinite, exports.isFunction = isFunction, exports.isMatch = isMatch, exports.isNaN = eq, exports.isNative = isNative, exports.isNull = isNull, exports.isNumber = isNumber, exports.isObject = isObject, exports.isPlainObject = isPlainObject, exports.isRegExp = isRegExp, exports.isString = 
    has, exports.isTypedArray = isTypedArray, exports.isUndefined = isUndefined, exports.kebabCase = kebabCase, exports.last = concat, exports.lastIndexOf = lastIndexOf, exports.lt = max, exports.lte = lte, exports.max = data, exports.min = n, exports.noConflict = noConflict, exports.noop = L, exports.now = now, exports.pad = pad, exports.padLeft = padLeft, exports.padRight = padRight, exports.parseInt = off, exports.random = random, exports.reduce = reduce, exports.reduceRight = t, exports.repeat = 
    repeat, exports.result = serialize, exports.round = round, exports.runInContext = runInContext, exports.size = save, exports.snakeCase = snakeCase, exports.some = some, exports.sortedIndex = logger, exports.sortedLastIndex = CreateSBTreeClass, exports.startCase = startCase, exports.startsWith = startsWith, exports.sum = sum, exports.template = template, exports.trim = trim, exports.trimLeft = capitalize, exports.trimRight = tokenize, exports.trunc = truncate, exports.unescape = unescape, exports.uniqueId = 
    uniqueId, exports.words = build, exports.all = list, exports.any = some, exports.contains = contains, exports.eq = isEqual, exports.detect = detect, exports.foldl = reduce, exports.foldr = t, exports.head = head, exports.include = contains, exports.inject = reduce, mixin(exports, function() {
      var listClase = {};
      return baseForOwn(exports, function(classe, t) {
        if (!exports.prototype[t]) {
          listClase[t] = classe;
        }
      }), listClase;
    }(), false), exports.sample = resolve, exports.prototype.sample = function(source) {
      return this.__chain__ || null != source ? this.thru(function(t) {
        return resolve(t, source);
      }) : resolve(this.value());
    }, exports.VERSION = VERSION, forEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(name) {
      /** @type {function(!Object): ?} */
      exports[name].placeholder = exports;
    }), forEach(["drop", "take"], function(methodName, no_secondary) {
      /**
       * @param {string} n
       * @return {?}
       */
      LazyWrapper.prototype[methodName] = function(n) {
        var inputData = this.__filtered__;
        if (inputData && !no_secondary) {
          return new LazyWrapper(this);
        }
        n = null == n ? 1 : nativeMax(floor(n) || 0, 0);
        var result = this.clone();
        return inputData ? result.__takeCount__ = nativeMin(result.__takeCount__, n) : result.__views__.push({
          size : n,
          type : methodName + (result.__dir__ < 0 ? "Right" : "")
        }), result;
      };
      /**
       * @param {?} args
       * @return {?}
       */
      LazyWrapper.prototype[methodName + "Right"] = function(args) {
        return this.reverse()[methodName](args).reverse();
      };
    }), forEach(["filter", "map", "takeWhile"], function(methodName, p) {
      var r = p + 1;
      /** @type {boolean} */
      var isFilter = r != text;
      /**
       * @param {!Object} n
       * @param {!Object} i
       * @return {?}
       */
      LazyWrapper.prototype[methodName] = function(n, i) {
        var result = this.clone();
        return result.__iteratees__.push({
          iteratee : $(n, i, 1),
          type : r
        }), result.__filtered__ = result.__filtered__ || isFilter, result;
      };
    }), forEach(["first", "last"], function(methodName, index) {
      /** @type {string} */
      var takeName = "take" + (index ? "Right" : "");
      /**
       * @return {?}
       */
      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    }), forEach(["initial", "rest"], function(methodName, index) {
      /** @type {string} */
      var dropName = "drop" + (index ? "" : "Right");
      /**
       * @return {?}
       */
      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    }), forEach(["pluck", "where"], function(methodName, filterArray) {
      /** @type {string} */
      var ukey = filterArray ? "filter" : "map";
      /** @type {function(!Function): ?} */
      var getProp = filterArray ? error : find;
      /**
       * @param {undefined} data
       * @return {?}
       */
      LazyWrapper.prototype[methodName] = function(data) {
        return this[ukey](getProp(data));
      };
    }), LazyWrapper.prototype.compact = function() {
      return this.filter(c);
    }, LazyWrapper.prototype.reject = function(f, a) {
      return f = $(f, a, 1), this.filter(function(widthCtrl) {
        return !f(widthCtrl);
      });
    }, LazyWrapper.prototype.slice = function(start, end) {
      /** @type {number} */
      start = null == start ? 0 : +start || 0;
      var result = this;
      return result.__filtered__ && (start > 0 || 0 > end) ? new LazyWrapper(result) : (0 > start ? result = result.takeRight(-start) : start && (result = result.drop(start)), end !== undefined && (end = +end || 0, result = 0 > end ? result.dropRight(-end) : result.take(end - start)), result);
    }, LazyWrapper.prototype.takeRightWhile = function(array, predicate) {
      return this.reverse().takeWhile(array, predicate).reverse();
    }, LazyWrapper.prototype.toArray = function() {
      return this.take(y);
    }, baseForOwn(LazyWrapper.prototype, function(filterFunction, name) {
      /** @type {boolean} */
      var tmpl = /^(?:filter|map|reject)|While$/.test(name);
      /** @type {boolean} */
      var isTaker = /^(?:first|last)$/.test(name);
      var func = exports[isTaker ? "take" + ("last" == name ? "Right" : "") : name];
      if (func) {
        /**
         * @return {?}
         */
        exports.prototype[name] = function() {
          /** @type {(Arguments|Array)} */
          var args = isTaker ? [1] : arguments;
          var chainAll = this.__chain__;
          var value = this.__wrapped__;
          /** @type {boolean} */
          var isJSRequested = !!this.__actions__.length;
          /** @type {boolean} */
          var isLazy = value instanceof LazyWrapper;
          var rooms = args[0];
          var useLazy = isLazy || isArray(value);
          if (useLazy && tmpl && "function" == typeof rooms && 1 != rooms.length) {
            /** @type {boolean} */
            isLazy = useLazy = false;
          }
          /**
           * @param {?} value
           * @return {?}
           */
          var url = function(value) {
            return isTaker && chainAll ? func(value, 1)[0] : func.apply(undefined, arrayPush([value], args));
          };
          var event = {
            func : index,
            args : [url],
            thisArg : undefined
          };
          /** @type {boolean} */
          var onlyLazy = isLazy && !isJSRequested;
          if (isTaker && !chainAll) {
            return onlyLazy ? (value = value.clone(), value.__actions__.push(event), filterFunction.call(value)) : func.call(undefined, this.value())[0];
          }
          if (!isTaker && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result = filterFunction.apply(value, args);
            return result.__actions__.push(event), new LodashWrapper(result, chainAll);
          }
          return this.thru(url);
        };
      }
    }), forEach(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? StringProto : arrayProto)[methodName];
      /** @type {string} */
      var chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru";
      /** @type {boolean} */
      var retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
      /**
       * @return {?}
       */
      exports.prototype[methodName] = function() {
        /** @type {!Arguments} */
        var arg = arguments;
        return retUnwrapped && !this.__chain__ ? func.apply(this.value(), arg) : this[chainName](function(console) {
          return func.apply(console, arg);
        });
      };
    }), baseForOwn(LazyWrapper.prototype, function(i, key) {
      var value = exports[key];
      if (value) {
        /** @type {string} */
        var id = value.name + "";
        var watch = jsonData[id] || (jsonData[id] = []);
        watch.push({
          name : key,
          func : value
        });
      }
    }), jsonData[wrapper(undefined, BIND_KEY_FLAG).name] = [{
      name : "wrapper",
      func : undefined
    }], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, LazyWrapper.prototype.value = lazyValue, exports.prototype.chain = wrapperChain, exports.prototype.commit = lodashWrapper, exports.prototype.concat = TagHourlyStat, exports.prototype.plant = wrapperPlant, exports.prototype.reverse = wrapperReverse, exports.prototype.toString = toStringBench, exports.prototype.run = exports.prototype.toJSON = exports.prototype.valueOf = exports.prototype.value = wrapperValue, 
    exports.prototype.collect = exports.prototype.map, exports.prototype.head = exports.prototype.first, exports.prototype.select = exports.prototype.filter, exports.prototype.tail = exports.prototype.rest, exports;
  }
  var undefined;
  /** @type {string} */
  var VERSION = "3.10.1";
  /** @type {number} */
  var index = 1;
  /** @type {number} */
  var BIND_KEY_FLAG = 2;
  /** @type {number} */
  var CURRY_BOUND_FLAG = 4;
  /** @type {number} */
  var CURRY_FLAG = 8;
  /** @type {number} */
  var d = 16;
  /** @type {number} */
  var button = 32;
  /** @type {number} */
  var evt = 64;
  /** @type {number} */
  var ARY_FLAG = 128;
  /** @type {number} */
  var REARG_FLAG = 256;
  /** @type {number} */
  var groupSize = 30;
  /** @type {string} */
  var DEFAULT_TRUNC_OMISSION = "...";
  /** @type {number} */
  var summands = 150;
  /** @type {number} */
  var w = 16;
  /** @type {number} */
  var LARGE_ARRAY_SIZE = 200;
  /** @type {number} */
  var endEvent = 1;
  /** @type {number} */
  var text = 2;
  /** @type {string} */
  var ERR_ACCESSORS_NOT_SUPPORTED = "Expected a function";
  /** @type {string} */
  var PLACEHOLDER = "__lodash_placeholder__";
  /** @type {string} */
  var hr = "[object Arguments]";
  /** @type {string} */
  var argsTag = "[object Array]";
  /** @type {string} */
  var arrayBufferTag = "[object Boolean]";
  /** @type {string} */
  var boolTag = "[object Date]";
  /** @type {string} */
  var dateTag = "[object Error]";
  /** @type {string} */
  var funcTag = "[object Function]";
  /** @type {string} */
  var float64Tag$1 = "[object Map]";
  /** @type {string} */
  var numberTag = "[object Number]";
  /** @type {string} */
  var a = "[object Object]";
  /** @type {string} */
  var regexpTag = "[object RegExp]";
  /** @type {string} */
  var float32Tag$1 = "[object Set]";
  /** @type {string} */
  var stringTag = "[object String]";
  /** @type {string} */
  var int16Tag = "[object WeakMap]";
  /** @type {string} */
  var dataViewTag = "[object ArrayBuffer]";
  /** @type {string} */
  var float32Tag = "[object Float32Array]";
  /** @type {string} */
  var funcTag$2 = "[object Float64Array]";
  /** @type {string} */
  var float64Tag = "[object Int8Array]";
  /** @type {string} */
  var int8Tag = "[object Int16Array]";
  /** @type {string} */
  var int32Tag = "[object Int32Array]";
  /** @type {string} */
  var uint8Tag = "[object Uint8Array]";
  /** @type {string} */
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  /** @type {string} */
  var uint16Tag = "[object Uint16Array]";
  /** @type {string} */
  var uint32Tag = "[object Uint32Array]";
  /** @type {!RegExp} */
  var reEmptyStringLeading = /\b__p \+= '';/g;
  /** @type {!RegExp} */
  var rbreakright = /\b(__p \+=) '' \+/g;
  /** @type {!RegExp} */
  var rtrimcomma = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
  /** @type {!RegExp} */
  var reg = /&(?:amp|lt|gt|quot|#39|#96);/g;
  /** @type {!RegExp} */
  var reUnescapedHtml = /[&<>"'`]/g;
  /** @type {!RegExp} */
  var namespace = RegExp(reg.source);
  /** @type {!RegExp} */
  var r = RegExp(reUnescapedHtml.source);
  /** @type {!RegExp} */
  var _digitExpr = /<%-([\s\S]+?)%>/g;
  /** @type {!RegExp} */
  var evaluate = /<%([\s\S]+?)%>/g;
  /** @type {!RegExp} */
  var reInterpolate = /<%=([\s\S]+?)%>/g;
  /** @type {!RegExp} */
  var ARG_RE = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/;
  /** @type {!RegExp} */
  var POSSIBLE_HTML = /^\w*$/;
  /** @type {!RegExp} */
  var reNewLines = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
  /** @type {!RegExp} */
  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
  /** @type {!RegExp} */
  var reHasEscapedHtml = RegExp(reRegExpChars.source);
  /** @type {!RegExp} */
  var reLatin1 = /[\u0300-\u036f\ufe20-\ufe23]/g;
  /** @type {!RegExp} */
  var reEscapeChar = /\\(\\)?/g;
  /** @type {!RegExp} */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
  /** @type {!RegExp} */
  var reFlags = /\w*$/;
  /** @type {!RegExp} */
  var SIG_PATTERN = /^0[xX]/;
  /** @type {!RegExp} */
  var trueRE = /^\[object .+?Constructor\]$/;
  /** @type {!RegExp} */
  var rNum = /^\d+$/;
  /** @type {!RegExp} */
  var nonAscii = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
  /** @type {!RegExp} */
  var reNoMatch = /($^)/;
  /** @type {!RegExp} */
  var escapeRegExp = /['\n\r\u2028\u2029\\]/g;
  var reWords = function() {
    /** @type {string} */
    var fn = "[A-Z\\xc0-\\xd6\\xd8-\\xde]";
    /** @type {string} */
    var cache_id = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
    return RegExp(fn + "+(?=" + fn + cache_id + ")|" + fn + "?" + cache_id + "|" + fn + "+|[0-9]+", "g");
  }();
  /** @type {!Array} */
  var contextProps = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"];
  /** @type {number} */
  var Re = -1;
  var typedArrayTags = {};
  /** @type {boolean} */
  typedArrayTags[float32Tag] = typedArrayTags[funcTag$2] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  /** @type {boolean} */
  typedArrayTags[hr] = typedArrayTags[argsTag] = typedArrayTags[dataViewTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[funcTag] = typedArrayTags[float64Tag$1] = typedArrayTags[numberTag] = typedArrayTags[a] = typedArrayTags[regexpTag] = typedArrayTags[float32Tag$1] = typedArrayTags[stringTag] = typedArrayTags[int16Tag] = false;
  var cloneableTags = {};
  /** @type {boolean} */
  cloneableTags[hr] = cloneableTags[argsTag] = cloneableTags[dataViewTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[float32Tag] = cloneableTags[funcTag$2] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[a] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  /** @type {boolean} */
  cloneableTags[dateTag] = cloneableTags[funcTag] = cloneableTags[float64Tag$1] = cloneableTags[float32Tag$1] = cloneableTags[int16Tag] = false;
  var augmentedMethods = {
    "\u00c0" : "A",
    "\u00c1" : "A",
    "\u00c2" : "A",
    "\u00c3" : "A",
    "\u00c4" : "A",
    "\u00c5" : "A",
    "\u00e0" : "a",
    "\u00e1" : "a",
    "\u00e2" : "a",
    "\u00e3" : "a",
    "\u00e4" : "a",
    "\u00e5" : "a",
    "\u00c7" : "C",
    "\u00e7" : "c",
    "\u00d0" : "D",
    "\u00f0" : "d",
    "\u00c8" : "E",
    "\u00c9" : "E",
    "\u00ca" : "E",
    "\u00cb" : "E",
    "\u00e8" : "e",
    "\u00e9" : "e",
    "\u00ea" : "e",
    "\u00eb" : "e",
    "\u00cc" : "I",
    "\u00cd" : "I",
    "\u00ce" : "I",
    "\u00cf" : "I",
    "\u00ec" : "i",
    "\u00ed" : "i",
    "\u00ee" : "i",
    "\u00ef" : "i",
    "\u00d1" : "N",
    "\u00f1" : "n",
    "\u00d2" : "O",
    "\u00d3" : "O",
    "\u00d4" : "O",
    "\u00d5" : "O",
    "\u00d6" : "O",
    "\u00d8" : "O",
    "\u00f2" : "o",
    "\u00f3" : "o",
    "\u00f4" : "o",
    "\u00f5" : "o",
    "\u00f6" : "o",
    "\u00f8" : "o",
    "\u00d9" : "U",
    "\u00da" : "U",
    "\u00db" : "U",
    "\u00dc" : "U",
    "\u00f9" : "u",
    "\u00fa" : "u",
    "\u00fb" : "u",
    "\u00fc" : "u",
    "\u00dd" : "Y",
    "\u00fd" : "y",
    "\u00ff" : "y",
    "\u00c6" : "Ae",
    "\u00e6" : "ae",
    "\u00de" : "Th",
    "\u00fe" : "th",
    "\u00df" : "ss"
  };
  var traitsChosen = {
    "&" : "&amp;",
    "<" : "&lt;",
    ">" : "&gt;",
    '"' : "&quot;",
    "'" : "&#39;",
    "`" : "&#96;"
  };
  var subwikiListsCache = {
    "&amp;" : "&",
    "&lt;" : "<",
    "&gt;" : ">",
    "&quot;" : '"',
    "&#39;" : "'",
    "&#96;" : "`"
  };
  var objectTypes = {
    function : true,
    object : true
  };
  var CHAR_MAP = {
    0 : "x30",
    1 : "x31",
    2 : "x32",
    3 : "x33",
    4 : "x34",
    5 : "x35",
    6 : "x36",
    7 : "x37",
    8 : "x38",
    9 : "x39",
    A : "x41",
    B : "x42",
    C : "x43",
    D : "x44",
    E : "x45",
    F : "x46",
    a : "x61",
    b : "x62",
    c : "x63",
    d : "x64",
    e : "x65",
    f : "x66",
    n : "x6e",
    r : "x72",
    t : "x74",
    u : "x75",
    v : "x76",
    x : "x78"
  };
  var c = {
    "\\" : "\\",
    "'" : "'",
    "\n" : "n",
    "\r" : "r",
    "\u2028" : "u2028",
    "\u2029" : "u2029"
  };
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  var freeGlobal = freeExports && freeModule && "object" == typeof global && global && global.Object && global;
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
  var root = freeGlobal || freeWindow !== (this && this.window) && freeWindow || freeSelf || this;
  var _ = runInContext();
  if ("function" == typeof define && "object" == typeof define.amd && define.amd) {
    root._ = _;
    define(function() {
      return _;
    });
  } else {
    if (freeExports && freeModule) {
      if (moduleExports) {
        (freeModule.exports = _)._ = _;
      } else {
        freeExports._ = _;
      }
    } else {
      root._ = _;
    }
  }
}.call(this), function(factory) {
  var root = "object" == typeof self && self.self == self && self || "object" == typeof global && global.global == global && global;
  if ("function" == typeof define && define.amd) {
    define(["underscore", "jquery", "exports"], function(_, $, exports) {
      root.Backbone = factory(root, exports, _, $);
    });
  } else {
    if ("undefined" != typeof exports) {
      var jQuery;
      var underscore = require("underscore");
      try {
        jQuery = require("jquery");
      } catch (i) {
      }
      factory(root, exports, underscore, jQuery);
    } else {
      root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
    }
  }
}(function(root, Backbone, _, $) {
  var previousBackbone = root.Backbone;
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = Array.prototype.slice;
  /** @type {string} */
  Backbone.VERSION = "1.2.3";
  /** @type {!Object} */
  Backbone.$ = $;
  /**
   * @return {?}
   */
  Backbone.noConflict = function() {
    return root.Backbone = previousBackbone, this;
  };
  /** @type {boolean} */
  Backbone.emulateHTTP = false;
  /** @type {boolean} */
  Backbone.emulateJSON = false;
  /**
   * @param {?} length
   * @param {string} method
   * @param {string} attribute
   * @return {?}
   */
  var addMethod = function(length, method, attribute) {
    switch(length) {
      case 1:
        return function() {
          return _[method](this[attribute]);
        };
      case 2:
        return function(value) {
          return _[method](this[attribute], value);
        };
      case 3:
        return function(iteratee, context) {
          return _[method](this[attribute], cb(iteratee, this), context);
        };
      case 4:
        return function(iteratee, defaultVal, context) {
          return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
        };
      default:
        return function() {
          /** @type {!Array<?>} */
          var args = slice.call(arguments);
          return args.unshift(this[attribute]), _[method].apply(_, args);
        };
    }
  };
  /**
   * @param {!Function} Class
   * @param {undefined} methods
   * @param {string} attribute
   * @return {undefined}
   */
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) {
        Class.prototype[method] = addMethod(length, method, attribute);
      }
    });
  };
  /**
   * @param {!Object} value
   * @param {?} instance
   * @return {?}
   */
  var cb = function(value, instance) {
    return _.isFunction(value) ? value : _.isObject(value) && !instance._isModel(value) ? has(value) : _.isString(value) ? function(e) {
      return e.get(value);
    } : value;
  };
  /**
   * @param {!Function} value
   * @return {?}
   */
  var has = function(value) {
    var cb = _.matches(value);
    return function(version) {
      return cb(version.attributes);
    };
  };
  var Events = Backbone.Events = {};
  /** @type {!RegExp} */
  var eventSplitter = /\s+/;
  /**
   * @param {!Function} iteratee
   * @param {?} events
   * @param {string} name
   * @param {?} callback
   * @param {!Object} opts
   * @return {?}
   */
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var names;
    /** @type {number} */
    var i = 0;
    if (name && "object" == typeof name) {
      if (void 0 !== callback && "context" in opts && void 0 === opts.context) {
        opts.context = callback;
      }
      names = _.keys(name);
      for (; i < names.length; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else {
      if (name && eventSplitter.test(name)) {
        names = name.split(eventSplitter);
        for (; i < names.length; i++) {
          events = iteratee(events, names[i], callback, opts);
        }
      } else {
        events = iteratee(events, name, callback, opts);
      }
    }
    return events;
  };
  /**
   * @param {string} name
   * @param {!Function} callback
   * @param {string} context
   * @return {?}
   */
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };
  /**
   * @param {!Object} obj
   * @param {string} name
   * @param {(!Function|string)} callback
   * @param {string} context
   * @param {string} listening
   * @return {?}
   */
  var internalOn = function(obj, name, callback, context, listening) {
    if (obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context : context,
      ctx : obj,
      listening : listening
    }), listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      /** @type {string} */
      listeners[listening.id] = listening;
    }
    return obj;
  };
  /**
   * @param {!Object} obj
   * @param {string} name
   * @param {!Arguments} callback
   * @return {?}
   */
  Events.listenTo = function(obj, name, callback) {
    if (!obj) {
      return this;
    }
    var id = obj._listenId || (obj._listenId = _.uniqueId("l"));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId("l"));
      listening = listeningTo[id] = {
        obj : obj,
        objId : id,
        id : thisId,
        listeningTo : listeningTo,
        count : 0
      };
    }
    return internalOn(obj, name, callback, this, listening), this;
  };
  /**
   * @param {!NodeList} events
   * @param {number} name
   * @param {!Function} callback
   * @param {!Object} options
   * @return {?}
   */
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context;
      var ctx = options.ctx;
      var listening = options.listening;
      if (listening) {
        listening.count++;
      }
      handlers.push({
        callback : callback,
        context : context,
        ctx : context || ctx,
        listening : listening
      });
    }
    return events;
  };
  /**
   * @param {string} name
   * @param {string} callback
   * @param {string} context
   * @return {?}
   */
  Events.off = function(name, callback, context) {
    return this._events ? (this._events = eventsApi(offApi, this._events, name, callback, {
      context : context,
      listeners : this._listeners
    }), this) : this;
  };
  /**
   * @param {string} obj
   * @param {undefined} event
   * @param {string} callback
   * @return {?}
   */
  Events.stopListening = function(obj, event, callback) {
    var index = this._listeningTo;
    if (!index) {
      return this;
    }
    var m = obj ? [obj._listenId] : _.keys(index);
    /** @type {number} */
    var k = 0;
    for (; k < m.length; k++) {
      var p = index[m[k]];
      if (!p) {
        break;
      }
      p.obj.off(event, callback, this);
    }
    return _.isEmpty(index) && (this._listeningTo = void 0), this;
  };
  /**
   * @param {!Object} events
   * @param {!Object} name
   * @param {!Object} callback
   * @param {!Object} options
   * @return {?}
   */
  var offApi = function(events, name, callback, options) {
    if (events) {
      var listening;
      /** @type {number} */
      var i = 0;
      var context = options.context;
      var listeners = options.listeners;
      if (name || callback || context) {
        var parts = name ? [name] : _.keys(events);
        for (; i < parts.length; i++) {
          name = parts[i];
          var handlers = events[name];
          if (!handlers) {
            break;
          }
          /** @type {!Array} */
          var remaining = [];
          /** @type {number} */
          var j = 0;
          for (; j < handlers.length; j++) {
            var handler = handlers[j];
            if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
              remaining.push(handler);
            } else {
              listening = handler.listening;
              if (listening && 0 === --listening.count) {
                delete listeners[listening.id];
                delete listening.listeningTo[listening.objId];
              }
            }
          }
          if (remaining.length) {
            /** @type {!Array} */
            events[name] = remaining;
          } else {
            delete events[name];
          }
        }
        return _.size(events) ? events : void 0;
      }
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
    }
  };
  /**
   * @param {string} name
   * @param {?} callback
   * @param {string} fn
   * @return {?}
   */
  Events.once = function(name, callback, fn) {
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    return this.on(events, void 0, fn);
  };
  /**
   * @param {undefined} obj
   * @param {string} name
   * @param {?} callback
   * @return {?}
   */
  Events.listenToOnce = function(obj, name, callback) {
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };
  /**
   * @param {!NodeList} map
   * @param {number} name
   * @param {!Function} callback
   * @param {?} offer
   * @return {?}
   */
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      /** @type {!Function} */
      once._callback = callback;
    }
    return map;
  };
  /**
   * @param {string} type
   * @return {?}
   */
  Events.trigger = function(type) {
    if (!this._events) {
      return this;
    }
    /** @type {number} */
    var _len = Math.max(0, arguments.length - 1);
    /** @type {!Array} */
    var args = Array(_len);
    /** @type {number} */
    var _i = 0;
    for (; _len > _i; _i++) {
      args[_i] = arguments[_i + 1];
    }
    return eventsApi(start, this._events, type, void 0, args), this;
  };
  /**
   * @param {!Object} d
   * @param {string} t
   * @param {?} index
   * @param {!Array} y
   * @return {?}
   */
  var start = function(d, t, index, y) {
    if (d) {
      var s = d[t];
      var p = d.all;
      if (s && p) {
        p = p.slice();
      }
      if (s) {
        f(s, y);
      }
      if (p) {
        f(p, [t].concat(y));
      }
    }
    return d;
  };
  /**
   * @param {!NodeList} f
   * @param {!Array} r
   * @return {undefined}
   */
  var f = function(f, r) {
    var self;
    /** @type {number} */
    var j = -1;
    var m = f.length;
    var radii = r[0];
    var where = r[1];
    var right = r[2];
    switch(r.length) {
      case 0:
        for (; ++j < m;) {
          (self = f[j]).callback.call(self.ctx);
        }
        return;
      case 1:
        for (; ++j < m;) {
          (self = f[j]).callback.call(self.ctx, radii);
        }
        return;
      case 2:
        for (; ++j < m;) {
          (self = f[j]).callback.call(self.ctx, radii, where);
        }
        return;
      case 3:
        for (; ++j < m;) {
          (self = f[j]).callback.call(self.ctx, radii, where, right);
        }
        return;
      default:
        for (; ++j < m;) {
          (self = f[j]).callback.apply(self.ctx, r);
        }
        return;
    }
  };
  /** @type {function(string, !Function, string): ?} */
  Events.bind = Events.on;
  /** @type {function(string, string, string): ?} */
  Events.unbind = Events.off;
  _.extend(Backbone, Events);
  /** @type {function(number, !Object): undefined} */
  var Model = Backbone.Model = function(nodes, options) {
    var data = nodes || {};
    if (!options) {
      options = {};
    }
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) {
      this.collection = options.collection;
    }
    if (options.parse) {
      data = this.parse(data, options) || {};
    }
    data = _.defaults({}, data, _.result(this, "defaults"));
    this.set(data, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };
  _.extend(Model.prototype, Events, {
    changed : null,
    validationError : null,
    idAttribute : "id",
    cidPrefix : "c",
    initialize : function() {
    },
    toJSON : function(options) {
      return _.clone(this.attributes);
    },
    sync : function() {
      return Backbone.sync.apply(this, arguments);
    },
    get : function(name) {
      return this.attributes[name];
    },
    escape : function(type) {
      return _.escape(this.get(type));
    },
    has : function(id) {
      return null != this.get(id);
    },
    matches : function(value) {
      return !!_.iteratee(value, this)(this.attributes);
    },
    set : function(key, value, options) {
      if (null == key) {
        return this;
      }
      var attrs;
      if ("object" == typeof key ? (attrs = key, options = value) : (attrs = {})[key] = value, options || (options = {}), !this._validate(attrs, options)) {
        return false;
      }
      var unset = options.unset;
      var silent = options.silent;
      /** @type {!Array} */
      var changes = [];
      var changing = this._changing;
      /** @type {boolean} */
      this._changing = true;
      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      var current = this.attributes;
      var changed = this.changed;
      var old = this._previousAttributes;
      var name;
      for (name in attrs) {
        value = attrs[name];
        if (!_.isEqual(current[name], value)) {
          changes.push(name);
        }
        if (_.isEqual(old[name], value)) {
          delete changed[name];
        } else {
          /** @type {!Object} */
          changed[name] = value;
        }
        if (unset) {
          delete current[name];
        } else {
          /** @type {!Object} */
          current[name] = value;
        }
      }
      if (this.id = this.get(this.idAttribute), !silent) {
        if (changes.length) {
          /** @type {!Object} */
          this._pending = options;
        }
        /** @type {number} */
        var i = 0;
        for (; i < changes.length; i++) {
          this.trigger("change:" + changes[i], this, current[changes[i]], options);
        }
      }
      if (changing) {
        return this;
      }
      if (!silent) {
        for (; this._pending;) {
          options = this._pending;
          /** @type {boolean} */
          this._pending = false;
          this.trigger("change", this, options);
        }
      }
      return this._pending = false, this._changing = false, this;
    },
    unset : function(y, options) {
      return this.set(y, void 0, _.extend({}, options, {
        unset : true
      }));
    },
    clear : function(fn) {
      var child = {};
      var attr;
      for (attr in this.attributes) {
        child[attr] = void 0;
      }
      return this.set(child, _.extend({}, fn, {
        unset : true
      }));
    },
    hasChanged : function(key) {
      return null == key ? !_.isEmpty(this.changed) : _.has(this.changed, key);
    },
    changedAttributes : function(diff) {
      if (!diff) {
        return this.hasChanged() ? _.clone(this.changed) : false;
      }
      var old = this._changing ? this._previousAttributes : this.attributes;
      var map = {};
      var attr;
      for (attr in diff) {
        var val = diff[attr];
        if (!_.isEqual(old[attr], val)) {
          map[attr] = val;
        }
      }
      return _.size(map) ? map : false;
    },
    previous : function(attr) {
      return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null;
    },
    previousAttributes : function() {
      return _.clone(this._previousAttributes);
    },
    fetch : function(options) {
      options = _.extend({
        parse : true
      }, options);
      var self = this;
      /** @type {function(?): ?} */
      var callback = options.success;
      return options.success = function(data) {
        var a = options.parse ? self.parse(data, options) : data;
        return self.set(a, options) ? (callback && callback.call(options.context, self, data, options), void self.trigger("sync", self, data, options)) : false;
      }, debug(this, options), this.sync("read", this, options);
    },
    save : function(key, collectionName, options) {
      var attrs;
      if (null == key || "object" == typeof key) {
        /** @type {string} */
        attrs = key;
        /** @type {!Object} */
        options = collectionName;
      } else {
        /** @type {!Object} */
        (attrs = {})[key] = collectionName;
      }
      options = _.extend({
        validate : true,
        parse : true
      }, options);
      var wait = options.wait;
      if (attrs && !wait) {
        if (!this.set(attrs, options)) {
          return false;
        }
      } else {
        if (!this._validate(attrs, options)) {
          return false;
        }
      }
      var self = this;
      /** @type {function(string): ?} */
      var callback = options.success;
      var attributes = this.attributes;
      /**
       * @param {string} value
       * @return {?}
       */
      options.success = function(value) {
        self.attributes = attributes;
        var data = options.parse ? self.parse(value, options) : value;
        return wait && (data = _.extend({}, attrs, data)), data && !self.set(data, options) ? false : (callback && callback.call(options.context, self, value, options), void self.trigger("sync", self, value, options));
      };
      debug(this, options);
      if (attrs && wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }
      /** @type {string} */
      var undefined = this.isNew() ? "create" : options.patch ? "patch" : "update";
      if (!("patch" !== undefined || options.attrs)) {
        options.attrs = attrs;
      }
      var res = this.sync(undefined, this, options);
      return this.attributes = attributes, res;
    },
    destroy : function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      /** @type {function(?): undefined} */
      var callback = options.success;
      var wait = options.wait;
      /**
       * @return {undefined}
       */
      var destroy = function() {
        model.stopListening();
        model.trigger("destroy", model, model.collection, options);
      };
      /**
       * @param {?} data
       * @return {undefined}
       */
      options.success = function(data) {
        if (wait) {
          destroy();
        }
        if (callback) {
          callback.call(options.context, model, data, options);
        }
        if (!model.isNew()) {
          model.trigger("sync", model, data, options);
        }
      };
      /** @type {boolean} */
      var xhr = false;
      return this.isNew() ? _.defer(options.success) : (debug(this, options), xhr = this.sync("delete", this, options)), wait || destroy(), xhr;
    },
    url : function() {
      var relativeUrl = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
      if (this.isNew()) {
        return relativeUrl;
      }
      var id = this.get(this.idAttribute);
      return relativeUrl.replace(/[^\/]$/, "$&/") + encodeURIComponent(id);
    },
    parse : function(string, symbol) {
      return string;
    },
    clone : function() {
      return new this.constructor(this.attributes);
    },
    isNew : function() {
      return !this.has(this.idAttribute);
    },
    isValid : function(options) {
      return this._validate({}, _.defaults({
        validate : true
      }, options));
    },
    _validate : function(attrs, options) {
      if (!options.validate || !this.validate) {
        return true;
      }
      attrs = _.extend({}, this.attributes, attrs);
      var errors = this.validationError = this.validate(attrs, options) || null;
      return errors ? (this.trigger("invalid", this, errors, _.extend(options, {
        validationError : errors
      })), false) : true;
    }
  });
  var modelMethods = {
    keys : 1,
    values : 1,
    pairs : 1,
    invert : 1,
    pick : 0,
    omit : 0,
    chain : 1,
    isEmpty : 1
  };
  addUnderscoreMethods(Model, modelMethods, "attributes");
  /** @type {function(?, !Object): undefined} */
  var Collection = Backbone.Collection = function(name, options) {
    if (!options) {
      options = {};
    }
    if (options.model) {
      this.model = options.model;
    }
    if (void 0 !== options.comparator) {
      this.comparator = options.comparator;
    }
    this._reset();
    this.initialize.apply(this, arguments);
    if (name) {
      this.reset(name, _.extend({
        silent : true
      }, options));
    }
  };
  var setOptions = {
    add : true,
    remove : true,
    merge : true
  };
  var addOptions = {
    add : true,
    remove : false
  };
  /**
   * @param {!Object} array
   * @param {!Array} insert
   * @param {number} at
   * @return {undefined}
   */
  var splice = function(array, insert, at) {
    /** @type {number} */
    at = Math.min(Math.max(at, 0), array.length);
    /** @type {!Array} */
    var tail = Array(array.length - at);
    var length = insert.length;
    /** @type {number} */
    var i = 0;
    for (; i < tail.length; i++) {
      tail[i] = array[i + at];
    }
    /** @type {number} */
    i = 0;
    for (; length > i; i++) {
      array[i + at] = insert[i];
    }
    /** @type {number} */
    i = 0;
    for (; i < tail.length; i++) {
      array[i + length + at] = tail[i];
    }
  };
  _.extend(Collection.prototype, Events, {
    model : Model,
    initialize : function() {
    },
    toJSON : function(callback) {
      return this.map(function(t) {
        return t.toJSON(callback);
      });
    },
    sync : function() {
      return Backbone.sync.apply(this, arguments);
    },
    add : function(obj, options) {
      return this.set(obj, _.extend({
        merge : false
      }, options, addOptions));
    },
    remove : function(obj, options) {
      options = _.extend({}, options);
      /** @type {boolean} */
      var key = !_.isArray(obj);
      obj = key ? [obj] : _.clone(obj);
      var data = this._removeModels(obj, options);
      return !options.silent && data && this.trigger("update", this, options), key ? data[0] : data;
    },
    set : function(value, options) {
      if (null != value) {
        options = _.defaults({}, options, setOptions);
        if (options.parse && !this._isModel(value)) {
          value = this.parse(value, options);
        }
        /** @type {boolean} */
        var isArrayValue = !_.isArray(value);
        value = isArrayValue ? [value] : value.slice();
        var at = options.at;
        if (null != at) {
          /** @type {number} */
          at = +at;
        }
        if (0 > at) {
          at = at + (this.length + 1);
        }
        var model;
        /** @type {!Array} */
        var set = [];
        /** @type {!Array} */
        var toAdd = [];
        /** @type {!Array} */
        var toRemove = [];
        var modelMap = {};
        var add = options.add;
        var merge = options.merge;
        var remove = options.remove;
        /** @type {boolean} */
        var part = false;
        var p = this.comparator && null == at && options.sort !== false;
        var name = _.isString(this.comparator) ? this.comparator : null;
        /** @type {number} */
        var i = 0;
        for (; i < value.length; i++) {
          model = value[i];
          var existing = this.get(model);
          if (existing) {
            if (merge && model !== existing) {
              var data = this._isModel(model) ? model.attributes : model;
              if (options.parse) {
                data = existing.parse(data, options);
              }
              existing.set(data, options);
              if (p && !part) {
                part = existing.hasChanged(name);
              }
            }
            if (!modelMap[existing.cid]) {
              /** @type {boolean} */
              modelMap[existing.cid] = true;
              set.push(existing);
            }
            value[i] = existing;
          } else {
            if (add) {
              model = value[i] = this._prepareModel(model, options);
              if (model) {
                toAdd.push(model);
                this._addReference(model, options);
                /** @type {boolean} */
                modelMap[model.cid] = true;
                set.push(model);
              }
            }
          }
        }
        if (remove) {
          /** @type {number} */
          i = 0;
          for (; i < this.length; i++) {
            model = this.models[i];
            if (!modelMap[model.cid]) {
              toRemove.push(model);
            }
          }
          if (toRemove.length) {
            this._removeModels(toRemove, options);
          }
        }
        /** @type {boolean} */
        var base = false;
        var replace = !p && add && remove;
        if (set.length && replace ? (base = this.length != set.length || _.some(this.models, function(f, i) {
          return f !== set[i];
        }), this.models.length = 0, splice(this.models, set, 0), this.length = this.models.length) : toAdd.length && (p && (part = true), splice(this.models, toAdd, null == at ? this.length : at), this.length = this.models.length), part && this.sort({
          silent : true
        }), !options.silent) {
          /** @type {number} */
          i = 0;
          for (; i < toAdd.length; i++) {
            if (null != at) {
              options.index = at + i;
            }
            model = toAdd[i];
            model.trigger("add", model, this, options);
          }
          if (part || base) {
            this.trigger("sort", this, options);
          }
          if (toAdd.length || toRemove.length) {
            this.trigger("update", this, options);
          }
        }
        return isArrayValue ? value[0] : value;
      }
    },
    reset : function(value, options) {
      options = options ? _.clone(options) : {};
      /** @type {number} */
      var i = 0;
      for (; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      return options.previousModels = this.models, this._reset(), value = this.add(value, _.extend({
        silent : true
      }, options)), options.silent || this.trigger("reset", this, options), value;
    },
    push : function(value, options) {
      return this.add(value, _.extend({
        at : this.length
      }, options));
    },
    pop : function(options) {
      var m = this.at(this.length - 1);
      return this.remove(m, options);
    },
    unshift : function(value, options) {
      return this.add(value, _.extend({
        at : 0
      }, options));
    },
    shift : function(y) {
      var m = this.at(0);
      return this.remove(m, y);
    },
    slice : function() {
      return slice.apply(this.models, arguments);
    },
    get : function(obj) {
      if (null == obj) {
        return void 0;
      }
      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
    },
    at : function(name) {
      return 0 > name && (name = name + this.length), this.models[name];
    },
    where : function(obj, first) {
      return this[first ? "find" : "filter"](obj);
    },
    findWhere : function(fn) {
      return this.where(fn, true);
    },
    sort : function(opts) {
      var comparator = this.comparator;
      if (!comparator) {
        throw new Error("Cannot sort a set without a comparator");
      }
      if (!opts) {
        opts = {};
      }
      var length = comparator.length;
      return _.isFunction(comparator) && (comparator = _.bind(comparator, this)), 1 === length || _.isString(comparator) ? this.models = this.sortBy(comparator) : this.models.sort(comparator), opts.silent || this.trigger("sort", this, opts), this;
    },
    pluck : function(obj) {
      return _.invoke(this.models, "get", obj);
    },
    fetch : function(options) {
      options = _.extend({
        parse : true
      }, options);
      /** @type {function(?): undefined} */
      var callback = options.success;
      var that = this;
      return options.success = function(data) {
        /** @type {string} */
        var method = options.reset ? "reset" : "set";
        that[method](data, options);
        if (callback) {
          callback.call(options.context, that, data, options);
        }
        that.trigger("sync", that, data, options);
      }, debug(this, options), this.sync("read", this, options);
    },
    create : function(obj, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      if (obj = this._prepareModel(obj, options), !obj) {
        return false;
      }
      if (!wait) {
        this.add(obj, options);
      }
      var o = this;
      /** @type {function(?, ?, !Object): undefined} */
      var callback = options.success;
      return options.success = function(obj, options, data) {
        if (wait) {
          o.add(obj, data);
        }
        if (callback) {
          callback.call(data.context, obj, options, data);
        }
      }, obj.save(null, options), obj;
    },
    parse : function(string, symbol) {
      return string;
    },
    clone : function() {
      return new this.constructor(this.models, {
        model : this.model,
        comparator : this.comparator
      });
    },
    modelId : function(attrs) {
      return attrs[this.model.prototype.idAttribute || "id"];
    },
    _reset : function() {
      /** @type {number} */
      this.length = 0;
      /** @type {!Array} */
      this.models = [];
      this._byId = {};
    },
    _prepareModel : function(attrs, options) {
      if (this._isModel(attrs)) {
        return attrs.collection || (attrs.collection = this), attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      return model.validationError ? (this.trigger("invalid", this, model.validationError, options), false) : model;
    },
    _removeModels : function(models, options) {
      /** @type {!Array} */
      var params = [];
      /** @type {number} */
      var i = 0;
      for (; i < models.length; i++) {
        var model = this.get(models[i]);
        if (model) {
          var i = this.indexOf(model);
          this.models.splice(i, 1);
          this.length--;
          if (!options.silent) {
            options.index = i;
            model.trigger("remove", model, this, options);
          }
          params.push(model);
          this._removeReference(model, options);
        }
      }
      return params.length ? params : false;
    },
    _isModel : function(object) {
      return object instanceof Model;
    },
    _addReference : function(model, options) {
      /** @type {!Object} */
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (null != id) {
        /** @type {!Object} */
        this._byId[id] = model;
      }
      model.on("all", this._onModelEvent, this);
    },
    _removeReference : function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (null != id) {
        delete this._byId[id];
      }
      if (this === model.collection) {
        delete model.collection;
      }
      model.off("all", this._onModelEvent, this);
    },
    _onModelEvent : function(undefined, model, event, options) {
      if ("add" !== undefined && "remove" !== undefined || event === this) {
        if ("destroy" === undefined && this.remove(model, options), "change" === undefined) {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (null != prevId) {
              delete this._byId[prevId];
            }
            if (null != id) {
              this._byId[id] = model;
            }
          }
        }
        this.trigger.apply(this, arguments);
      }
    }
  });
  var collectionMethods = {
    forEach : 3,
    each : 3,
    map : 3,
    collect : 3,
    reduce : 4,
    foldl : 4,
    inject : 4,
    reduceRight : 4,
    foldr : 4,
    find : 3,
    detect : 3,
    filter : 3,
    select : 3,
    reject : 3,
    every : 3,
    all : 3,
    some : 3,
    any : 3,
    include : 3,
    includes : 3,
    contains : 3,
    invoke : 0,
    max : 3,
    min : 3,
    toArray : 1,
    size : 1,
    first : 3,
    head : 3,
    take : 3,
    initial : 3,
    rest : 3,
    tail : 3,
    drop : 3,
    last : 3,
    without : 0,
    difference : 0,
    indexOf : 3,
    shuffle : 1,
    lastIndexOf : 3,
    isEmpty : 1,
    chain : 1,
    sample : 3,
    partition : 3,
    groupBy : 3,
    countBy : 3,
    sortBy : 3,
    indexBy : 3
  };
  addUnderscoreMethods(Collection, collectionMethods, "models");
  /** @type {function(?): undefined} */
  var Router = Backbone.View = function(cfg) {
    this.cid = _.uniqueId("view");
    _.extend(this, _.pick(cfg, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };
  /** @type {!RegExp} */
  var re_pba_css = /^(\S+)\s*(.*)$/;
  /** @type {!Array} */
  var viewOptions = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  _.extend(Router.prototype, Events, {
    tagName : "div",
    $ : function(name) {
      return this.$el.find(name);
    },
    initialize : function() {
    },
    render : function() {
      return this;
    },
    remove : function() {
      return this._removeElement(), this.stopListening(), this;
    },
    _removeElement : function() {
      this.$el.remove();
    },
    setElement : function(element) {
      return this.undelegateEvents(), this._setElement(element), this.delegateEvents(), this;
    },
    _setElement : function(element) {
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
    },
    delegateEvents : function(events) {
      if (events || (events = _.result(this, "events")), !events) {
        return this;
      }
      this.undelegateEvents();
      var p;
      for (p in events) {
        var type = events[p];
        if (_.isFunction(type) || (type = this[type]), type) {
          /** @type {(Array<string>|null)} */
          var match = p.match(re_pba_css);
          this.delegate(match[1], match[2], _.bind(type, this));
        }
      }
      return this;
    },
    delegate : function(eventName, callback, method) {
      return this.$el.on(eventName + ".delegateEvents" + this.cid, callback, method), this;
    },
    undelegateEvents : function() {
      return this.$el && this.$el.off(".delegateEvents" + this.cid), this;
    },
    undelegate : function(eventName, selector, callback) {
      return this.$el.off(eventName + ".delegateEvents" + this.cid, selector, callback), this;
    },
    _createElement : function(ns) {
      return document.createElement(ns);
    },
    _ensureElement : function() {
      if (this.el) {
        this.setElement(_.result(this, "el"));
      } else {
        var attrs = _.extend({}, _.result(this, "attributes"));
        if (this.id) {
          attrs.id = _.result(this, "id");
        }
        if (this.className) {
          attrs["class"] = _.result(this, "className");
        }
        this.setElement(this._createElement(_.result(this, "tagName")));
        this._setAttributes(attrs);
      }
    },
    _setAttributes : function(value) {
      this.$el.attr(value);
    }
  });
  /**
   * @param {string} name
   * @param {?} model
   * @param {!Object} options
   * @return {?}
   */
  Backbone.sync = function(name, model, options) {
    var method = methodMap[name];
    _.defaults(options || (options = {}), {
      emulateHTTP : Backbone.emulateHTTP,
      emulateJSON : Backbone.emulateJSON
    });
    var params = {
      type : method,
      dataType : "json"
    };
    if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== name && "update" !== name && "patch" !== name || (params.contentType = "application/json", params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", params.data = params.data ? {
      model : params.data
    } : {}), options.emulateHTTP && ("PUT" === method || "DELETE" === method || "PATCH" === method)) {
      /** @type {string} */
      params.type = "POST";
      if (options.emulateJSON) {
        params.data._method = method;
      }
      var beforeSend = options.beforeSend;
      /**
       * @param {!Object} xhr
       * @return {?}
       */
      options.beforeSend = function(xhr) {
        return xhr.setRequestHeader("X-HTTP-Method-Override", method), beforeSend ? beforeSend.apply(this, arguments) : void 0;
      };
    }
    if (!("GET" === params.type || options.emulateJSON)) {
      /** @type {boolean} */
      params.processData = false;
    }
    /** @type {function(?, ?, string): undefined} */
    var f = options.error;
    /**
     * @param {?} obj
     * @param {?} type
     * @param {string} value
     * @return {undefined}
     */
    options.error = function(obj, type, value) {
      options.textStatus = type;
      /** @type {string} */
      options.errorThrown = value;
      if (f) {
        f.call(options.context, obj, type, value);
      }
    };
    var n = options.xhr = Backbone.ajax(_.extend(params, options));
    return model.trigger("request", model, n, options), n;
  };
  var methodMap = {
    create : "POST",
    update : "PUT",
    patch : "PATCH",
    delete : "DELETE",
    read : "GET"
  };
  /**
   * @return {?}
   */
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };
  /** @type {function(number): undefined} */
  var d = Backbone.Router = function(options) {
    if (!options) {
      options = {};
    }
    if (options.routes) {
      this.routes = options.routes;
    }
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };
  /** @type {!RegExp} */
  var rbreakright = /\((.*?)\)/g;
  /** @type {!RegExp} */
  var formattingRemoveEscapes = /(\(\?)?:\w+/g;
  /** @type {!RegExp} */
  var splatParam = /\*\w+/g;
  /** @type {!RegExp} */
  var s_ESCAPE_REGEX = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  _.extend(d.prototype, Events, {
    initialize : function() {
    },
    route : function(route, name, handler) {
      if (!_.isRegExp(route)) {
        route = this._routeToRegExp(route);
      }
      if (_.isFunction(name)) {
        /** @type {string} */
        handler = name;
        /** @type {string} */
        name = "";
      }
      if (!handler) {
        handler = this[name];
      }
      var self = this;
      return Backbone.history.route(route, function(w) {
        var value = self._extractParameters(route, w);
        if (self.execute(handler, value, name) !== false) {
          self.trigger.apply(self, ["route:" + name].concat(value));
          self.trigger("route", name, value);
          Backbone.history.trigger("route", self, name, value);
        }
      }), this;
    },
    execute : function(logger, id, n) {
      if (logger) {
        logger.apply(this, id);
      }
    },
    navigate : function(fragment, params) {
      return Backbone.history.navigate(fragment, params), this;
    },
    _bindRoutes : function() {
      if (this.routes) {
        this.routes = _.result(this, "routes");
        var route;
        var routes = _.keys(this.routes);
        for (; null != (route = routes.pop());) {
          this.route(route, this.routes[route]);
        }
      }
    },
    _routeToRegExp : function(route) {
      return route = route.replace(s_ESCAPE_REGEX, "\\$&").replace(rbreakright, "(?:$1)?").replace(formattingRemoveEscapes, function(labelOn, val) {
        return val ? labelOn : "([^/?]+)";
      }).replace(splatParam, "([^?]*?)"), new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$");
    },
    _extractParameters : function(route, hash) {
      var t = route.exec(hash).slice(1);
      return _.map(t, function(value, name) {
        return name === t.length - 1 ? value || null : value ? decodeURIComponent(value) : null;
      });
    }
  });
  /** @type {function(): undefined} */
  var History = Backbone.History = function() {
    /** @type {!Array} */
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);
    if ("undefined" != typeof window) {
      /** @type {!Location} */
      this.location = window.location;
      /** @type {!History} */
      this.history = window.history;
    }
  };
  /** @type {!RegExp} */
  var routeStripper = /^[#\/]|\s+$/g;
  /** @type {!RegExp} */
  var rootStripper = /^\/+|\/+$/g;
  /** @type {!RegExp} */
  var pathStripper = /#.*$/;
  /** @type {boolean} */
  History.started = false;
  _.extend(History.prototype, Events, {
    interval : 50,
    atRoot : function() {
      var path = this.location.pathname.replace(/[^\/]$/, "$&/");
      return path === this.root && !this.getSearch();
    },
    matchRoot : function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + "/";
      return rootPath === this.root;
    },
    decodeFragment : function(fragment) {
      return decodeURI(fragment.replace(/%25/g, "%2525"));
    },
    getSearch : function() {
      var e = this.location.href.replace(/#.*/, "").match(/\?.+/);
      return e ? e[0] : "";
    },
    getHash : function(window) {
      var e = (window || this).location.href.match(/#(.*)$/);
      return e ? e[1] : "";
    },
    getPath : function() {
      var val = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
      return "/" === val.charAt(0) ? val.slice(1) : val;
    },
    getFragment : function(fragment) {
      return null == fragment && (fragment = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()), fragment.replace(routeStripper, "");
    },
    start : function(options) {
      if (History.started) {
        throw new Error("Backbone.history has already been started");
      }
      if (History.started = true, this.options = _.extend({
        root : "/"
      }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== false, this._hasHashChange = "onhashchange" in window && (void 0 === document.documentMode || document.documentMode > 7), this._useHashChange = this._wantsHashChange && this._hasHashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = 
      this.getFragment(), this.root = ("/" + this.root + "/").replace(rootStripper, "/"), this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          /** @type {string} */
          var rootPath = this.root.slice(0, -1) || "/";
          return this.location.replace(rootPath + "#" + this.getPath()), true;
        }
        if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {
            replace : true
          });
        }
      }
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        /** @type {!Element} */
        this.iframe = document.createElement("iframe");
        /** @type {string} */
        this.iframe.src = "javascript:0";
        /** @type {string} */
        this.iframe.style.display = "none";
        /** @type {number} */
        this.iframe.tabIndex = -1;
        /** @type {!HTMLBodyElement} */
        var body = document.body;
        var win = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        win.document.open();
        win.document.close();
        /** @type {string} */
        win.location.hash = "#" + this.fragment;
      }
      /** @type {function(this:Window, string, (EventListener|function(!Event): (boolean|undefined)|null), (AddEventListenerOptions|boolean)=): undefined} */
      var addEventListener = window.addEventListener || function(type, listener) {
        return attachEvent("on" + type, listener);
      };
      return this._usePushState ? addEventListener("popstate", this.checkUrl, false) : this._useHashChange && !this.iframe ? addEventListener("hashchange", this.checkUrl, false) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.options.silent ? void 0 : this.loadUrl();
    },
    stop : function() {
      /** @type {function(this:Window, string, (EventListener|function(!Event): (boolean|undefined)|null), (EventListenerOptions|boolean)=): undefined} */
      var removeEventListener = window.removeEventListener || function(type, listener) {
        return detachEvent("on" + type, listener);
      };
      if (this._usePushState) {
        removeEventListener("popstate", this.checkUrl, false);
      } else {
        if (this._useHashChange && !this.iframe) {
          removeEventListener("hashchange", this.checkUrl, false);
        }
      }
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        /** @type {null} */
        this.iframe = null;
      }
      if (this._checkUrlInterval) {
        clearInterval(this._checkUrlInterval);
      }
      /** @type {boolean} */
      History.started = false;
    },
    route : function(_route, name) {
      this.handlers.unshift({
        route : _route,
        callback : name
      });
    },
    checkUrl : function(value) {
      var current = this.getFragment();
      return current === this.fragment && this.iframe && (current = this.getHash(this.iframe.contentWindow)), current === this.fragment ? false : (this.iframe && this.navigate(current), void this.loadUrl());
    },
    loadUrl : function(fragment) {
      return this.matchRoot() ? (fragment = this.fragment = this.getFragment(fragment), _.some(this.handlers, function(handler) {
        return handler.route.test(fragment) ? (handler.callback(fragment), true) : void 0;
      })) : false;
    },
    navigate : function(fragment, options) {
      if (!History.started) {
        return false;
      }
      if (!(options && options !== true)) {
        options = {
          trigger : !!options
        };
      }
      fragment = this.getFragment(fragment || "");
      var root = this.root;
      if ("" === fragment || "?" === fragment.charAt(0)) {
        root = root.slice(0, -1) || "/";
      }
      var url = root + fragment;
      if (fragment = this.decodeFragment(fragment.replace(pathStripper, "")), this.fragment !== fragment) {
        if (this.fragment = fragment, this._usePushState) {
          this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
        } else {
          if (!this._wantsHashChange) {
            return this.location.assign(url);
          }
          if (this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
            var iWindow = this.iframe.contentWindow;
            if (!options.replace) {
              iWindow.document.open();
              iWindow.document.close();
            }
            this._updateHash(iWindow.location, fragment, options.replace);
          }
        }
        return options.trigger ? this.loadUrl(fragment) : void 0;
      }
    },
    _updateHash : function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, "");
        location.replace(href + "#" + fragment);
      } else {
        /** @type {string} */
        location.hash = "#" + fragment;
      }
    }
  });
  Backbone.history = new History;
  /**
   * @param {string} name
   * @param {!Object} obj
   * @return {?}
   */
  var extend = function(name, obj) {
    var child;
    var parent = this;
    child = name && _.has(name, "constructor") ? name.constructor : function() {
      return parent.apply(this, arguments);
    };
    _.extend(child, parent, obj);
    /**
     * @return {undefined}
     */
    var ctor = function() {
      this.constructor = child;
    };
    return ctor.prototype = parent.prototype, child.prototype = new ctor, name && _.extend(child.prototype, name), child.__super__ = parent.prototype, child;
  };
  /** @type {function(string, !Object): ?} */
  Model.extend = Collection.extend = d.extend = Router.extend = History.extend = extend;
  /**
   * @return {?}
   */
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
  /**
   * @param {?} options
   * @param {!Object} event
   * @return {undefined}
   */
  var debug = function(options, event) {
    /** @type {function(?): undefined} */
    var fn = event.error;
    /**
     * @param {?} obj
     * @return {undefined}
     */
    event.error = function(obj) {
      if (fn) {
        fn.call(event.context, options, obj, event);
      }
      options.trigger("error", options, obj, event);
    };
  };
  return Backbone;
}), Function.prototype.bind && /^object$|^function$/.test(typeof console) && "object" == typeof console.log && "function" == typeof window.addEventListener && (["assert", "clear", "dir", "error", "info", "log", "profile", "profileEnd", "warn"].forEach(function(method) {
  /** @type {!Function} */
  console[method] = this.call(console[method], console);
}, Function.prototype.bind), ["_exception", "count", "debug", "dirxml", "group", "groupCollapsed", "groupEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace"].forEach(function(method) {
  /** @type {function(this:Console, ...*): undefined} */
  console[method] = console.log;
})), function(name, definition) {
  if ("undefined" != typeof module) {
    module.exports = definition();
  } else {
    if ("function" == typeof define && define.amd) {
      define(definition);
    } else {
      window[name] = definition();
    }
  }
}("log", function() {
  var log;
  /** @type {string} */
  var ua = navigator.userAgent;
  var hasSongChanged = function() {
    /** @type {!RegExp} */
    var rmobile = /Windows\sNT\s(\d+\.\d+)/;
    return "undefined" != typeof console && console.log && /MSIE\s(\d+)/.test(ua) && rmobile.test(ua) && parseFloat(rmobile.exec(ua)[1]) >= 6.1 ? true : false;
  }();
  var isReplayingSong = function() {
    /** @type {function(this:!Function, (Object|null|undefined), ...*): !Function} */
    var temp = Function.prototype.bind;
    return (!temp || temp && "undefined" == typeof window.addEventListener) && "object" == typeof console && "object" == typeof console.log;
  }();
  /** @type {boolean} */
  var source = !hasSongChanged && !isReplayingSong && /Trident\//.test(ua);
  var debugMode = hasSongChanged || window.console && "function" == typeof console.log;
  /** @type {number} */
  var a = 0;
  var defaultGroupOptions = {
    label : "Log:",
    collapsed : true
  };
  /**
   * @return {undefined}
   */
  var _includeFirebug = function() {
    !function(F, i, r, e, b, u, g, L, I, T, E) {
      if (!F.getElementById(b)) {
        E = F[i + "NS"] && F.documentElement.namespaceURI;
        E = E ? F[i + "NS"](E, "script") : F[i]("script");
        E[r]("id", b);
        E[r]("src", I + g + T);
        E[r](b, u);
        (F[e]("head")[0] || F[e]("body")[0]).appendChild(E);
        /** @type {!Image} */
        E = new Image;
        E[r]("src", I + L);
      }
    }(document, "createElement", "setAttribute", "getElementsByTagName", "FirebugLite", "4", "firebug-lite.js", "releases/lite/latest/skin/xp/sprite.png", "https://getfirebug.com/", "#startOpened");
  };
  /**
   * @param {string} theID
   * @return {?}
   */
  var callback = function(theID) {
    var q = theID.split("\n")[2];
    return q = q.indexOf(" (") >= 0 ? q.split(" (")[1].substring(0, q.length - 1) : q.split("at ")[1], q = "@" + q.substr(q.lastIndexOf("/") + 1);
  };
  /**
   * @param {!Object} a
   * @return {?}
   */
  var kind = function(a) {
    var r;
    var c;
    var l;
    if (null === a) {
      return "null";
    }
    if (/function|undefined|string|boolean|number/.test(typeof a)) {
      return typeof a;
    }
    if ("object" == typeof a) {
      /** @type {string} */
      r = Object.prototype.toString.call(a);
      /** @type {!Array} */
      c = ["Math", "ErrorEvent", "Error", "Date", "RegExp", "Event", "Array"];
      /** @type {number} */
      l = c.length;
      for (; l--;) {
        return r === "[object " + c[l] + "]" ? c[l].toLowerCase() : "object" == typeof HTMLElement && a instanceof HTMLElement ? "element" : "string" == typeof a.nodeName && 1 === a.nodeType ? "element" : "object" == typeof Node && a instanceof Node ? "node" : "number" == typeof a.nodeType && "string" == typeof a.nodeName ? "node" : /^\[object (HTMLCollection|NodeList|Object)\]$/.test(r) && "number" == typeof a.length && "undefined" != typeof a.item && (0 === a.length || "object" == typeof a[0] && 
        a[0].nodeType > 0) ? "nodelist" : "object";
      }
    }
    return "unknown";
  };
  return log = function() {
    var err;
    var i;
    /** @type {!Arguments} */
    var args = arguments;
    /** @type {!Array<?>} */
    var result = Array.prototype.slice.call(args);
    var self = hasSongChanged || window.console && "function" == typeof console.log;
    if (log.history.push(arguments), self) {
      if (log.options.group && (log.options.group.collapsed ? console.groupCollapsed(log.options.group.label) : console.group(log.options.group.label)), log.options.lineNumber && (err = new Error, err.fileName && err.lineNumber ? result.push("@" + err.fileName.substr(err.fileName.lastIndexOf("/") + 1) + ":" + err.lineNumber + ":1") : err.stack && result.push(callback(err.stack))), log.detailPrint && log.needsDetailPrint) {
        console.log("-----------------");
        args = log.detailPrint(args);
        /** @type {number} */
        i = 0;
        for (; i < args.length;) {
          console.log(args[i]);
          i++;
        }
      } else {
        if (1 === result.length && "string" == typeof result[0]) {
          console.log(result.toString());
        } else {
          if (source) {
            /** @type {number} */
            i = 0;
            for (; i < args.length;) {
              if (source && "object" === kind(args[i])) {
                console.dir(args[i]);
              } else {
                console.log(args[i]);
              }
              i++;
            }
          } else {
            console.log(result);
          }
        }
      }
      if (log.options.group) {
        console.groupEnd();
      }
    } else {
      if (isReplayingSong) {
        if (log.detailPrint) {
          args = log.detailPrint(args);
          args.unshift("-----------------");
          /** @type {number} */
          i = 0;
          for (; i < args.length;) {
            Function.prototype.call.call(console.log, console, Array.prototype.slice.call([args[i]]));
            i++;
          }
        } else {
          Function.prototype.call.call(console.log, console, Array.prototype.slice.call(args));
        }
      } else {
        if (document.getElementById("FirebugLite")) {
          if (20 > a) {
            setTimeout(function() {
              window.log.apply(window, args);
            }, 500);
            a++;
          } else {
            /** @type {number} */
            a = 0;
          }
        } else {
          _includeFirebug();
          setTimeout(function() {
            window.log.apply(window, args);
          }, 3e3);
          /** @type {boolean} */
          log.needsDetailPrint = false;
        }
      }
    }
  }, log.history = [], log.options = {
    lineNumber : true,
    group : false
  }, source && !log.options.group && (log.options.group = defaultGroupOptions), log.settings = function(opt) {
    if (opt && "object" === kind(opt)) {
      if (debugMode && console.group) {
        if ("boolean" == typeof opt.group) {
          if (opt.group) {
            log.options.group = defaultGroupOptions;
          } else {
            /** @type {boolean} */
            log.options.group = false;
          }
        } else {
          if ("object" === kind(opt.group)) {
            log.options.group = defaultGroupOptions;
            if ("undefined" != typeof opt.group.collapsed) {
              /** @type {boolean} */
              log.options.group.collapsed = !!opt.group.collapsed;
            }
            if ("string" == typeof opt.group.label) {
              /** @type {string} */
              log.options.group.label = opt.group.label;
            }
          }
        }
      }
      if ("undefined" != typeof opt.lineNumber) {
        /** @type {boolean} */
        log.options.lineNumber = !!opt.lineNumber;
      }
    }
  }, log;
}), function(options) {
  var data = {
    developerMode : true,
    events : new e,
    init : function() {
    },
    proxy : function(t, fn) {
      return function() {
        if (data.developerMode !== false) {
          return t.apply(fn, arguments);
        }
        try {
          return t.apply(fn, arguments);
        } catch (r) {
        }
      };
    },
    createCookie : function(name, value, days) {
      if (days) {
        /** @type {!Date} */
        var dateExpires = new Date;
        dateExpires.setTime(dateExpires.getTime() + 24 * days * 60 * 60 * 1e3);
        /** @type {string} */
        var expires = "; expires=" + dateExpires.toGMTString();
      } else {
        /** @type {string} */
        expires = "";
      }
      /** @type {string} */
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie : function(name) {
      if (document.cookie.length > 0) {
        /** @type {number} */
        var offset = document.cookie.indexOf(name + "=");
        if (-1 != offset) {
          offset = offset + name.length + 1;
          /** @type {number} */
          var endstr = document.cookie.indexOf(";", offset);
          return -1 == endstr && (endstr = document.cookie.length), unescape(document.cookie.substring(offset, endstr));
        }
      }
      return "";
    },
    getParentUrl : function() {
      /** @type {boolean} */
      var isInIFrame = parent !== window;
      /** @type {null} */
      var referrer = null;
      return isInIFrame && (referrer = document.referrer), referrer;
    }
  };
  options.Application = $.extend(data, options.Application);
  options.t = $.noop;
}(window), function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  /** @type {!Array} */
  var boxVals = [];
  var a = $(document);
  /** @type {string} */
  var userAgent = navigator.userAgent.toLowerCase();
  var o = $(window);
  /** @type {!Array} */
  var data = [];
  var browser = {
    ieQuirks : null,
    msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
    opera : /opera/.test(userAgent)
  };
  /** @type {boolean} */
  browser.ie6 = browser.msie && /msie 6./.test(userAgent) && "object" != typeof window.XMLHttpRequest;
  /** @type {boolean} */
  browser.ie7 = browser.msie && /msie 7.0/.test(userAgent);
  /**
   * @param {undefined} body
   * @param {?} title
   * @return {?}
   */
  $.modal = function(body, title) {
    return $.modal.impl.init(body, title);
  };
  /**
   * @return {undefined}
   */
  $.modal.close = function() {
    $.modal.impl.close();
  };
  /**
   * @param {?} obj
   * @return {undefined}
   */
  $.modal.focus = function(obj) {
    $.modal.impl.focus(obj);
  };
  /**
   * @return {undefined}
   */
  $.modal.setContainerDimensions = function() {
    $.modal.impl.setContainerDimensions();
  };
  /**
   * @return {undefined}
   */
  $.modal.setPosition = function() {
    $.modal.impl.setPosition();
  };
  /**
   * @param {boolean} b
   * @param {boolean} x
   * @return {undefined}
   */
  $.modal.update = function(b, x) {
    $.modal.impl.update(b, x);
  };
  /**
   * @param {?} settings
   * @return {?}
   */
  $.fn.modal = function(settings) {
    return $.modal.impl.init(this, settings);
  };
  $.modal.defaults = {
    appendTo : "body",
    focus : true,
    opacity : 50,
    overlayId : "simplemodal-overlay",
    overlayCss : {},
    containerId : "simplemodal-container",
    containerCss : {},
    dataId : "simplemodal-data",
    dataCss : {},
    minHeight : null,
    minWidth : null,
    maxHeight : null,
    maxWidth : null,
    autoResize : false,
    autoPosition : true,
    zIndex : 1e3,
    close : true,
    closeHTML : '<a class="modalCloseImg" title="Close"></a>',
    closeClass : "simplemodal-close",
    escClose : true,
    overlayClose : false,
    fixed : true,
    position : null,
    persist : false,
    modal : true,
    onOpen : null,
    onShow : null,
    onClose : null
  };
  $.modal.impl = {
    d : {},
    init : function(selector, options) {
      var self = this;
      if (self.d.data) {
        return false;
      }
      if (browser.ieQuirks = browser.msie && !$.support.boxModel, self.o = $.extend({}, $.modal.defaults, options), self.zIndex = self.o.zIndex, self.occb = false, "object" == typeof selector) {
        selector = selector instanceof $ ? selector : $(selector);
        /** @type {boolean} */
        self.d.placeholder = false;
        if (selector.parent().parent().size() > 0) {
          selector.before($("<span></span>").attr("id", "simplemodal-placeholder").css({
            display : "none"
          }));
          /** @type {boolean} */
          self.d.placeholder = true;
          self.display = selector.css("display");
          if (!self.o.persist) {
            self.d.orig = selector.clone(true);
          }
        }
      } else {
        if ("string" != typeof selector && "number" != typeof selector) {
          return alert("SimpleModal Error: Unsupported data type: " + typeof selector), self;
        }
        selector = $("<div></div>").html(selector);
      }
      return self.create(selector), selector = null, self.open(), $.isFunction(self.o.onShow) && self.o.onShow.apply(self, [self.d]), self;
    },
    create : function(obj) {
      var self = this;
      self.getDimensions();
      if (self.o.modal && browser.ie6) {
        self.d.iframe = $('<iframe src="javascript:false;"></iframe>').css($.extend(self.o.iframeCss, {
          display : "none",
          opacity : 0,
          position : "fixed",
          height : data[0],
          width : data[1],
          zIndex : self.o.zIndex,
          top : 0,
          left : 0
        })).appendTo(self.o.appendTo);
      }
      self.d.overlay = $("<div></div>").attr("id", self.o.overlayId).addClass("simplemodal-overlay").css($.extend(self.o.overlayCss, {
        display : "none",
        opacity : self.o.opacity / 100,
        height : self.o.modal ? boxVals[0] : 0,
        width : self.o.modal ? boxVals[1] : 0,
        position : "fixed",
        left : 0,
        top : 0,
        zIndex : self.o.zIndex + 1
      })).appendTo(self.o.appendTo);
      self.d.container = $("<div></div>").attr("id", self.o.containerId).addClass("simplemodal-container").css($.extend({
        position : self.o.fixed ? "fixed" : "absolute"
      }, self.o.containerCss, {
        display : "none",
        zIndex : self.o.zIndex + 2
      })).append(self.o.close && self.o.closeHTML ? $(self.o.closeHTML).addClass(self.o.closeClass) : "").appendTo(self.o.appendTo);
      self.d.wrap = $("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
        height : "100%",
        outline : 0,
        width : "100%"
      }).appendTo(self.d.container);
      self.d.data = obj.attr("id", obj.attr("id") || self.o.dataId).addClass("simplemodal-data").css($.extend(self.o.dataCss, {
        display : "none"
      })).appendTo("body");
      /** @type {null} */
      obj = null;
      self.setContainerDimensions();
      self.d.data.appendTo(self.d.wrap);
      if (browser.ie6 || browser.ieQuirks) {
        self.fixIE();
      }
    },
    bindEvents : function() {
      var self = this;
      $("." + self.o.closeClass).bind("click.simplemodal", function(event) {
        event.preventDefault();
        self.close();
      });
      if (self.o.modal && self.o.close && self.o.overlayClose) {
        self.d.overlay.bind("click.simplemodal", function(event) {
          event.preventDefault();
          self.close();
        });
      }
      a.bind("keydown.simplemodal", function(event) {
        if (self.o.modal && 9 === event.keyCode) {
          self.watchTab(event);
        } else {
          if (self.o.close && self.o.escClose && 27 === event.keyCode) {
            event.preventDefault();
            self.close();
          }
        }
      });
      o.bind("resize.simplemodal orientationchange.simplemodal", function() {
        self.getDimensions();
        if (self.o.autoResize) {
          self.setContainerDimensions();
        } else {
          if (self.o.autoPosition) {
            self.setPosition();
          }
        }
        if (browser.ie6 || browser.ieQuirks) {
          self.fixIE();
        } else {
          if (self.o.modal) {
            if (self.d.iframe) {
              self.d.iframe.css({
                height : data[0],
                width : data[1]
              });
            }
            self.d.overlay.css({
              height : boxVals[0],
              width : boxVals[1]
            });
          }
        }
      });
    },
    unbindEvents : function() {
      $("." + this.o.closeClass).unbind("click.simplemodal");
      a.unbind("keydown.simplemodal");
      o.unbind(".simplemodal");
      this.d.overlay.unbind("click.simplemodal");
    },
    fixIE : function() {
    },
    focus : function(obj) {
      var Log = this;
      var key = obj && -1 !== $.inArray(obj, ["first", "last"]) ? obj : "first";
      var r = $(":input:enabled:visible:" + key, Log.d.wrap);
      setTimeout(function() {
        if (r.length > 0) {
          r.focus();
        } else {
          Log.d.wrap.focus();
        }
      }, 10);
    },
    getDimensions : function() {
      var braceline = "undefined" == typeof window.innerHeight ? o.height() : window.innerHeight;
      /** @type {!Array} */
      boxVals = [a.height(), a.width()];
      /** @type {!Array} */
      data = [braceline, o.width()];
    },
    getVal : function(val, object) {
      return val ? "number" == typeof val ? val : "auto" === val ? 0 : val.indexOf("%") > 0 ? parseInt(val.replace(/%/, "")) / 100 * ("h" === object ? data[0] : data[1]) : parseInt(val.replace(/px/, "")) : null;
    },
    update : function(key, index) {
      var self = this;
      return self.d.data ? (conosle.log(key, index), self.d.origHeight = self.getVal(key, "h"), self.d.origWidth = self.getVal(index, "w"), self.d.data.hide(), key && self.d.container.css("height", key), index && self.d.container.css("width", index), self.setContainerDimensions(), self.d.data.show(), self.o.focus && self.focus(), self.unbindEvents(), void self.bindEvents()) : false;
    },
    setContainerDimensions : function() {
      var self = this;
      /** @type {boolean} */
      var h = browser.ie6 || browser.ie7;
      var r = self.d.origHeight ? self.d.origHeight : browser.opera ? self.d.container.height() : self.getVal(h ? self.d.container[0].currentStyle.height : self.d.container.css("height"), "h");
      var minFluidColWidth = self.d.origWidth ? self.d.origWidth : browser.opera ? self.d.container.width() : self.getVal(h ? self.d.container[0].currentStyle.width : self.d.container.css("width"), "w");
      var i = self.d.data.outerHeight(true);
      var iOffset = self.d.data.outerWidth(true);
      self.d.origHeight = self.d.origHeight || r;
      self.d.origWidth = self.d.origWidth || minFluidColWidth;
      var max = self.o.maxHeight ? self.getVal(self.o.maxHeight, "h") : null;
      var index = self.o.maxWidth ? self.getVal(self.o.maxWidth, "w") : null;
      var limit = max && max < data[0] ? max : data[0];
      var iMaxTopPos = index && index < data[1] ? index : data[1];
      var n = self.o.minHeight ? self.getVal(self.o.minHeight, "h") : "auto";
      r = r ? self.o.autoResize && r > limit ? limit : n > r ? n : r : i ? i > limit ? limit : self.o.minHeight && "auto" !== n && n > i ? n : i : n;
      var fluidColWidth = self.o.minWidth ? self.getVal(self.o.minWidth, "w") : "auto";
      minFluidColWidth = minFluidColWidth ? self.o.autoResize && minFluidColWidth > iMaxTopPos ? iMaxTopPos : fluidColWidth > minFluidColWidth ? fluidColWidth : minFluidColWidth : iOffset ? iOffset > iMaxTopPos ? iMaxTopPos : self.o.minWidth && "auto" !== fluidColWidth && fluidColWidth > iOffset ? fluidColWidth : iOffset : fluidColWidth;
      self.d.container.css({
        height : r,
        width : minFluidColWidth
      });
      self.d.wrap.css({
        overflow : i > r || iOffset > minFluidColWidth ? "auto" : "visible"
      });
      if (self.o.autoPosition) {
        self.setPosition();
      }
    },
    setPosition : function() {
      var rewrittenUrl;
      var currentCountryCode;
      var self = this;
      /** @type {number} */
      var appUrl = data[0] / 2 - self.d.container.outerHeight(true) / 2;
      /** @type {number} */
      var DEFAULT_COUNTRY_CODE = data[1] / 2 - self.d.container.outerWidth(true) / 2;
      var appBaseNoFile = "fixed" !== self.d.container.css("position") ? o.scrollTop() : 0;
      if (self.o.position && "[object Array]" === Object.prototype.toString.call(self.o.position)) {
        rewrittenUrl = appBaseNoFile + (self.o.position[0] || appUrl);
        currentCountryCode = self.o.position[1] || DEFAULT_COUNTRY_CODE;
      } else {
        rewrittenUrl = appBaseNoFile + appUrl;
        /** @type {number} */
        currentCountryCode = DEFAULT_COUNTRY_CODE;
      }
      self.d.container.css({
        left : currentCountryCode,
        top : rewrittenUrl
      });
    },
    watchTab : function(event) {
      var that = this;
      if ($(event.target).parents(".simplemodal-container").length > 0) {
        if (that.inputs = $(":input:enabled:visible:first, :input:enabled:visible:last", that.d.data[0]), !event.shiftKey && event.target === that.inputs[that.inputs.length - 1] || event.shiftKey && event.target === that.inputs[0] || 0 === that.inputs.length) {
          event.preventDefault();
          /** @type {string} */
          var method = event.shiftKey ? "last" : "first";
          that.focus(method);
        }
      } else {
        event.preventDefault();
        that.focus();
      }
    },
    open : function() {
      var self = this;
      if (self.d.iframe) {
        self.d.iframe.show();
      }
      if ($.isFunction(self.o.onOpen)) {
        self.o.onOpen.apply(self, [self.d]);
      } else {
        self.d.overlay.show();
        self.d.container.show();
        self.d.data.show();
      }
      if (self.o.focus) {
        self.focus();
      }
      self.bindEvents();
    },
    close : function() {
      var self = this;
      if (!self.d.data) {
        return false;
      }
      if (self.unbindEvents(), $.isFunction(self.o.onClose) && !self.occb) {
        /** @type {boolean} */
        self.occb = true;
        self.o.onClose.apply(self, [self.d]);
      } else {
        if (self.d.placeholder) {
          var $el = $("#simplemodal-placeholder");
          if (self.o.persist) {
            $el.replaceWith(self.d.data.removeClass("simplemodal-data").css("display", self.display));
          } else {
            self.d.data.hide().remove();
            $el.replaceWith(self.d.orig);
          }
        } else {
          self.d.data.hide().remove();
        }
        self.d.container.hide().remove();
        self.d.overlay.hide();
        if (self.d.iframe) {
          self.d.iframe.hide().remove();
        }
        self.d.overlay.remove();
        self.d = {};
      }
    }
  };
}), function($) {
  /**
   * @param {?} o
   * @param {?} X
   * @return {?}
   */
  function maybeCall(o, X) {
    return "function" == typeof o ? o.call(X) : o;
  }
  /**
   * @param {!Object} ele
   * @return {?}
   */
  function isElementInDOM(ele) {
    for (; ele = ele.parentNode;) {
      if (ele == document) {
        return true;
      }
    }
    return false;
  }
  /**
   * @param {?} element
   * @param {!Object} options
   * @return {undefined}
   */
  function Tipsy(element, options) {
    this.$element = $(element);
    /** @type {!Object} */
    this.options = options;
    /** @type {boolean} */
    this.enabled = true;
    this.fixTitle();
  }
  Tipsy.prototype = {
    show : function() {
      var title = this.getTitle();
      if (title && this.enabled) {
        var $tip = this.tip();
        $tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](title);
        /** @type {string} */
        $tip[0].className = "tipsy";
        $tip.remove().css({
          top : 0,
          left : 0,
          visibility : "hidden",
          display : "block"
        }).prependTo(document.body);
        var tp;
        var pos = $.extend({}, this.$element.offset(), {
          width : this.$element[0].offsetWidth,
          height : this.$element[0].offsetHeight
        });
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        var gravity = maybeCall(this.options.gravity, this.$element[0]);
        switch(gravity.charAt(0)) {
          case "n":
            tp = {
              top : pos.top + pos.height + this.options.offset,
              left : pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case "s":
            tp = {
              top : pos.top - actualHeight - this.options.offset,
              left : pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case "e":
            tp = {
              top : pos.top + pos.height / 2 - actualHeight / 2,
              left : pos.left - actualWidth - this.options.offset
            };
            break;
          case "w":
            tp = {
              top : pos.top + pos.height / 2 - actualHeight / 2,
              left : pos.left + pos.width + this.options.offset
            };
        }
        if (2 == gravity.length) {
          if ("w" == gravity.charAt(1)) {
            /** @type {number} */
            tp.left = pos.left + pos.width / 2 - 15;
          } else {
            /** @type {number} */
            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
          }
        }
        $tip.css(tp).addClass("tipsy-" + gravity);
        $tip.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + gravity.charAt(0);
        if (this.options.className) {
          $tip.addClass(maybeCall(this.options.className, this.$element[0]));
        }
        if (this.options.fade) {
          $tip.stop().css({
            opacity : 0,
            display : "block",
            visibility : "visible"
          }).animate({
            opacity : this.options.opacity
          });
        } else {
          $tip.css({
            visibility : "visible",
            opacity : this.options.opacity
          });
        }
      }
    },
    hide : function() {
      if (this.options.fade) {
        this.tip().stop().fadeOut(function() {
          $(this).remove();
        });
      } else {
        this.tip().remove();
      }
    },
    fixTitle : function() {
      var $e = this.$element;
      if ($e.attr("title") || "string" != typeof $e.attr("original-title")) {
        $e.attr("original-title", $e.attr("title") || "").removeAttr("title");
      }
    },
    getTitle : function() {
      var name;
      var $e = this.$element;
      var o = this.options;
      this.fixTitle();
      o = this.options;
      return "string" == typeof o.title ? name = $e.attr("title" == o.title ? "original-title" : o.title) : "function" == typeof o.title && (name = o.title.call($e[0])), name = ("" + name).replace(/(^\s*|\s*$)/, ""), name || o.fallback;
    },
    tip : function() {
      return this.$tip || (this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), this.$tip.data("tipsy-pointee", this.$element[0])), this.$tip;
    },
    validate : function() {
      if (!this.$element[0].parentNode) {
        this.hide();
        /** @type {null} */
        this.$element = null;
        /** @type {null} */
        this.options = null;
      }
    },
    enable : function() {
      /** @type {boolean} */
      this.enabled = true;
    },
    disable : function() {
      /** @type {boolean} */
      this.enabled = false;
    },
    toggleEnabled : function() {
      /** @type {boolean} */
      this.enabled = !this.enabled;
    }
  };
  /**
   * @param {!Object} options
   * @return {?}
   */
  $.fn.tipsy = function(options) {
    /**
     * @param {?} a
     * @return {?}
     */
    function get(a) {
      var c = $.data(a, "tipsy");
      return c || (c = new Tipsy(a, $.fn.tipsy.elementOptions(a, options)), $.data(a, "tipsy", c)), c;
    }
    /**
     * @return {undefined}
     */
    function enter() {
      var tipsy = get(this);
      /** @type {string} */
      tipsy.hoverState = "in";
      if (0 == options.delayIn) {
        tipsy.show();
      } else {
        tipsy.fixTitle();
        setTimeout(function() {
          if ("in" == tipsy.hoverState) {
            tipsy.show();
          }
        }, options.delayIn);
      }
    }
    /**
     * @return {undefined}
     */
    function leave() {
      var tipsy = get(this);
      /** @type {string} */
      tipsy.hoverState = "out";
      if (0 == options.delayOut) {
        tipsy.hide();
      } else {
        setTimeout(function() {
          if ("out" == tipsy.hoverState) {
            tipsy.hide();
          }
        }, options.delayOut);
      }
    }
    if (options === true) {
      return this.data("tipsy");
    }
    if ("string" == typeof options) {
      var tipsy = this.data("tipsy");
      return tipsy && tipsy[options](), this;
    }
    if (options = $.extend({}, $.fn.tipsy.defaults, options), options.live || this.each(function() {
      get(this);
    }), "manual" != options.trigger) {
      /** @type {string} */
      var binder = options.live ? "live" : "bind";
      /** @type {string} */
      var eventIn = "hover" == options.trigger ? "mouseenter" : "focus";
      /** @type {string} */
      var eventOut = "hover" == options.trigger ? "mouseleave" : "blur";
      this[binder](eventIn, enter)[binder](eventOut, leave);
    }
    return this;
  };
  $.fn.tipsy.defaults = {
    className : null,
    delayIn : 0,
    delayOut : 0,
    fade : false,
    fallback : "",
    gravity : "n",
    html : false,
    live : false,
    offset : 0,
    opacity : 0.8,
    title : "title",
    trigger : "hover"
  };
  /**
   * @return {undefined}
   */
  $.fn.tipsy.revalidate = function() {
    $(".tipsy").each(function() {
      var pointee = $.data(this, "tipsy-pointee");
      if (!(pointee && isElementInDOM(pointee))) {
        $(this).remove();
      }
    });
  };
  /**
   * @param {?} ele
   * @param {!Object} options
   * @return {?}
   */
  $.fn.tipsy.elementOptions = function(ele, options) {
    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
  };
  /**
   * @return {?}
   */
  $.fn.tipsy.autoNS = function() {
    return $(this).offset().top > $(document).scrollTop() + $(window).height() / 2 ? "s" : "n";
  };
  /**
   * @return {?}
   */
  $.fn.tipsy.autoWE = function() {
    return $(this).offset().left > $(document).scrollLeft() + $(window).width() / 2 ? "e" : "w";
  };
  /**
   * @param {number} margin
   * @param {!Object} prefer
   * @return {?}
   */
  $.fn.tipsy.autoBounds = function(margin, prefer) {
    return function() {
      var dir = {
        ns : prefer[0],
        ew : prefer.length > 1 ? prefer[1] : false
      };
      var boundTop = $(document).scrollTop() + margin;
      var boundLeft = $(document).scrollLeft() + margin;
      var mainViewList = $(this);
      return mainViewList.offset().top < boundTop && (dir.ns = "n"), mainViewList.offset().left < boundLeft && (dir.ew = "w"), $(window).width() + $(document).scrollLeft() - mainViewList.offset().left < margin && (dir.ew = "e"), $(window).height() + $(document).scrollTop() - mainViewList.offset().top < margin && (dir.ns = "s"), dir.ns + (dir.ew ? dir.ew : "");
    };
  };
}(jQuery), function(CropAreaRectangle) {
  /**
   * @return {undefined}
   */
  function res() {
  }
  res.prototype = {
    post : function(method, url, params) {
      return params = params || {}, url = url || {}, params.type = "POST", this._request(method, url, params);
    },
    get : function(obj, value, data) {
      return data = data || {}, value = value || {}, data.type = "GET", this._request(obj, value, data);
    },
    _request : function(label, data, config) {
      /** @type {boolean} */
      data.ajax = true;
      if (Application.settings.app_signed_request) {
        data.app_signed_request = Application.settings.app_signed_request;
      }
      if (Application.settings.fb_signed_request) {
        data.signed_request = Application.settings.fb_signed_request;
      }
      if (Application.settings.fb_auth_expired) {
        data.fb_auth_expired = Application.settings.fb_auth_expired;
      }
      if (Application.settings.t_1) {
        data.t_1 = Application.settings.t_1;
        if (Application.settings.t_2) {
          data.t_2 = Application.settings.t_2;
        }
      }
      if (0 !== label.indexOf("/")) {
        /** @type {string} */
        label = "/" + label;
      }
      var options = {
        dataType : "json",
        url : Application.settings.base_request_url + label,
        data : data,
        track : true,
        check_status : true,
        track_timings : false
      };
      /** @type {number} */
      var startTime = (new Date).getTime();
      var self = $.extend(options, config);
      var job = $.ajax(self);
      var javaScriptButton = this;
      return job.done(this._set_app_signed_request), job.done(this._update_user), job.done(this._check_app_version), job.done(this._set_page_title), job.done(this._check_event_notification), job.done(this._fire_application_event), job.done(this._check_fb_auth_expired), job.done(this._update_game_settings), 1 == self.check_status && job.fail(this._check_status), 1 == self.track_timings && job.done(function() {
        if ("undefined" != typeof Application.Helpers.GoogleAnalyticsHelper) {
          var event = {
            timingLabel : label,
            start_time : startTime
          };
          if ("undefined" != typeof data.templates) {
            /** @type {string} */
            event.timingCategory = "templates";
            if ($.isArray(data.templates)) {
              event.timingLabel = event.timingLabel + data.templates.join(",");
            }
          }
          Application.Helpers.GoogleAnalyticsHelper.track_user_timing(event);
        }
      }), job.done(this._track_pixel), 1 == self.track && job.done(function(canCreateDiscussions) {
        javaScriptButton._track_pageview(label);
      }), job;
    },
    _fire_application_event : function(annotationID) {
      Application.events.publish("ajax.request", annotationID);
    },
    _check_event_notification : function(simpleselect) {
      if ("undefined" != typeof Application.Views.AchievementNotificationView) {
        if (!Application.AchievementNotification) {
          var descriptions = {
            web : true
          };
          if ("undefined" != typeof FreeRider) {
            /** @type {boolean} */
            descriptions.web = false;
          }
          Application.AchievementNotification = new Application.Views.AchievementNotificationView(descriptions);
        }
        if ("undefined" != typeof simpleselect.data && ("undefined" != typeof simpleselect.data.achievements_earned && $.each(simpleselect.data.achievements_earned, function(canCreateDiscussions, e) {
          Application.AchievementNotification.notify(e);
        }), "undefined" != typeof simpleselect.data.campaign_events && $.each(simpleselect.data.campaign_events, function(canCreateDiscussions, e) {
          /** @type {boolean} */
          e.campaign_event = true;
          Application.AchievementNotification.notify(e);
        }), "undefined" != typeof simpleselect.data.leaderboard_passed_events && $.each(simpleselect.data.leaderboard_passed_events, function(canCreateDiscussions, e) {
          Application.AchievementNotification.notify(e);
        }), "undefined" != typeof simpleselect.data.inventory_events && $.each(simpleselect.data.inventory_events, function(canCreateDiscussions, e) {
          Application.AchievementNotification.notify(e);
        }), "undefined" != typeof simpleselect.data.rewarded_video_event && "ironsource" === simpleselect.data.rewarded_video_event.ad_network)) {
          try {
            if ("undefined" != typeof Application.settings.rewarded_ads.ironsource && Application.settings.rewarded_ads.ironsource.campaigns_ready) {
              Application.AchievementNotification.notify(simpleselect.data.rewarded_video_event);
            }
          } catch (n) {
          }
        }
      }
    },
    _check_status : function(merged) {
      var s = merged.status;
      if (404 === s) {
        Application.router.do_route(Application.settings.base_platform_url + "/page-not-found");
      }
      if (500 === s) {
        Application.router.do_route(Application.settings.base_platform_url + "/error");
      }
      if (0 === s) {
        window.location.reload();
      }
    },
    _set_app_signed_request : function(canCreateDiscussions) {
      if ("undefined" != typeof canCreateDiscussions.app_signed_request) {
        Application.settings.app_signed_request = canCreateDiscussions.app_signed_request;
      }
    },
    _set_fb_signed_request : function(params) {
      if ("undefined" != typeof params.fb_signed_request) {
        Application.settings.fb_signed_request = params.fb_signed_request;
      }
    },
    _update_game_settings : function(modelEtc) {
      if (modelEtc.game_settings) {
        GameSettings = _.extend(GameSettings, modelEtc.game_settings);
      }
    },
    _update_user : function(options) {
      if ("undefined" != typeof options.data && "undefined" != typeof options.data.update_user && options.data.update_user) {
        /** @type {boolean} */
        var hoverUser = false;
        /** @type {boolean} */
        var n = false;
        if ("undefined" != typeof options.data.user) {
          hoverUser = options.data.user;
        }
        if ("undefined" != typeof options.data.user_stats) {
          n = options.data.user_stats;
        }
        /** @type {boolean} */
        var r = false;
        try {
          if (window.parent !== window) {
            window.parent.Application;
          }
        } catch (i) {
          /** @type {boolean} */
          r = true;
        }
        if (0 == r && window.parent !== window && window.parent.Application && window.parent.Application.User) {
          window.parent.Application.User.set_user(hoverUser, n);
        } else {
          if (Application.User) {
            Application.User.set_user(hoverUser, n);
          }
        }
      }
    },
    _check_app_version : function(deploymentsVersions) {
      if ("undefined" != typeof deploymentsVersions.app_version && "undefined" != typeof Application.settings.app_version && Application.settings.app_version != deploymentsVersions.app_version) {
        /** @type {boolean} */
        Application.router.version_changed = true;
      }
    },
    _check_fb_auth_expired : function(canCreateDiscussions) {
      if ("undefined" != typeof canCreateDiscussions.fb_auth_expired) {
        Application.settings.fb_auth_expired = canCreateDiscussions.fb_auth_expired;
      }
    },
    _set_page_title : function(data) {
      if ("undefined" != typeof data.app_title) {
        document.title = data.app_title;
      }
    },
    _track_pixel : function(cardMask) {
      if ("undefined" != typeof cardMask.kl_px) {
        if ($("#kl_px").length) {
          $("#kl_px").attr("src", cardMask.kl_px);
        } else {
          var linkCont = $('<img name="kl_px" id="kl_px" width="1" height="1" src="' + cardMask.kl_px + '" style="display:none;" />');
          $("body").append(linkCont);
        }
      }
    },
    _track_pageview : function(place) {
      if ("undefined" != typeof Application.Helpers.GoogleAnalyticsHelper) {
        Application.Helpers.GoogleAnalyticsHelper.track_pageview({
          page : place
        });
      }
    }
  };
  CropAreaRectangle.AjaxHelper = new res;
}(Application.Helpers = Application.Helpers || {}), function(CropAreaRectangle) {
  /**
   * @return {undefined}
   */
  function EditorTablets() {
  }
  var $ = Application.Helpers.AjaxHelper;
  EditorTablets.prototype = {
    cached_templates : {},
    getTemplates : function(data, callback) {
      var t = {};
      var bundle = this;
      data = data.slice(0);
      if ($.each(data, function(unbracketed, eid) {
        if ("undefined" != typeof bundle.cached_templates[eid]) {
          t[eid] = bundle.cached_templates[eid];
          delete data[unbracketed];
        }
      }), "undefined" != typeof data[0]) {
        var renderer = $.post("templates/", {
          templates : data
        }, {
          track : false
        });
        renderer.done(function(action) {
          if (1 == action.code) {
            var a = action.templates;
            var key;
            for (key in a) {
              Mustache.parse(key);
              bundle.cached_templates[key] = a[key];
              t[key] = a[key];
            }
          }
          callback(t);
          /** @type {null} */
          action = null;
        });
      } else {
        callback(t);
      }
    },
    render : function(input, name, self) {
      return self.base_platform_url = Application.settings.base_platform_url, self.base_platform_external_url = Application.settings.base_platform_url, self.base_platform_short_url = Application.settings.base_platform_short_url, self.base_request_url = Application.settings.base_request_url, self.base_cdn_url = Application.settings.base_cdn_url, self.platform = Application.settings.platform, self.app_signed_request = Application.settings.app_signed_request, self.device = Application.settings.device, 
      self.is_mobile = Application.settings.is_mobile, self.is_xbox = Application.settings.is_xbox, self.dfp_ads_enabled = Application.settings.dfp_ads_enabled, self.is_fb_canvas = Application.settings.is_fb_canvas, self.is_fb_mobile = Application.settings.is_fb_mobile, self.is_web = Application.settings.is_web, self.share_metadata = Application.settings.share_metadata, self.rewarded_ads = Application.settings.rewarded_ads, self.ios_app_url = Application.settings.ios_app_url, self.android_app_url = 
      Application.settings.android_app_url, self.is_admin = Application.settings.is_admin, self.is_moderator = Application.settings.is_moderator, "undefined" != typeof Application.User && (self.user_logged_in = Application.User.is_logged_in(), self.user_logged_in && (self.user_beginner_pts = Application.settings.user_stats.beginner_pts), self.dfp_ads_enabled && Application.User.get("plus") && (self.dfp_ads_enabled = false)), self.features = {
        friends_enabled : Application.settings.features.friends_enabled,
        liked_tracks_enabled : Application.settings.features.liked_tracks_enabled
      }, Mustache.render(input, self, name);
    }
  };
  CropAreaRectangle.TemplateHelper = new EditorTablets;
}(Application.Helpers = Application.Helpers || {}), function(parent) {
  /**
   * @return {undefined}
   */
  function Dialog() {
    this.initialize();
  }
  Dialog.prototype = {
    loaded : Application.settings.gg_analytics_loaded || false,
    is_enabled : Application.settings.gg_analytics_enabled || false,
    initialize : function() {
      if (0 == this.loaded && this.is_enabled) {
        this.loadAnalytics();
      }
    },
    loadAnalytics : function() {
      !function(i, s, type, a, r, node, editorElem) {
        /** @type {string} */
        i.GoogleAnalyticsObject = r;
        i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments);
        };
        /** @type {number} */
        i[r].l = 1 * new Date;
        /** @type {!Element} */
        node = s.createElement(type);
        /** @type {!Element} */
        editorElem = s.getElementsByTagName(type)[0];
        /** @type {number} */
        node.async = 1;
        /** @type {string} */
        node.src = a;
        editorElem.parentNode.insertBefore(node, editorElem);
      }(window, document, "script", "//www.google-analytics.com/analytics.js", "_ga");
      _ga("create", Application.settings.gg_analytics_code, Application.settings.app_domain);
      _ga("send", "pageview");
      /** @type {boolean} */
      this.loaded = true;
    },
    track_pageview : function(ignoreList) {
      if (this.is_enabled) {
        _ga("send", "pageview", ignoreList);
      }
    },
    set_user_id : function(value) {
      if (this.is_enabled) {
        _ga("set", "&uid", value);
      }
    },
    set_custom : function(params) {
      if (this.is_enabled) {
        if (params.install_day) {
          _ga("set", "dimension1", params.install_day);
        }
        if (params.install_week) {
          _ga("set", "dimension2", params.install_week);
        }
        if (params.install_month) {
          _ga("set", "dimension3", params.install_month);
        }
        if (params.t1_t2) {
          _ga("set", "dimension4", params.t1_t2);
        }
        if ("undefined" != typeof params.day) {
          _ga("set", "dimension5", params.day.toString());
        }
        if (params.sex) {
          _ga("set", "dimension6", params.sex);
        }
        if ("undefined" != typeof params.friend_cnt) {
          _ga("set", "dimension7", params.friend_cnt.toString());
        }
        if (params.platforms) {
          _ga("set", "dimension8", params.platforms);
        }
        if (params.visit_t1_t2) {
          _ga("set", "dimension9", params.visit_t1_t2);
        }
        if (params.mbl_cnctd) {
          _ga("set", "dimension10", params.mbl_cnctd);
        }
      }
    },
    track_user_timing : function(event) {
      event = $.extend({
        timingCategory : "ajax",
        timingVar : "page",
        timingLabel : ""
      }, event);
      if (this.is_enabled) {
        /** @type {number} */
        var now = (new Date).getTime();
        /** @type {number} */
        var lastBeatDuration = now - event.start_time;
        _ga("send", "timing", event.timingCategory, event.timingVar, lastBeatDuration, event.timingLabel);
      }
    },
    track_event : function(properties) {
      properties = $.extend({
        label : "",
        value : 0,
        non_interaction : false
      }, properties);
      if (this.is_enabled) {
        _ga("send", {
          hitType : "event",
          eventCategory : properties.category,
          eventAction : properties.action,
          eventLabel : String(properties.label),
          eventValue : properties.value,
          nonInteraction : properties.non_interaction
        });
      }
    }
  };
  parent.GoogleAnalyticsHelper = new Dialog;
}(Application.Helpers = Application.Helpers || {}), function(parent) {
  /**
   * @return {undefined}
   */
  function Dialog() {
    this.initialize();
  }
  Dialog.prototype = {
    queue : [],
    loaded : false,
    initialize : function() {
      this.bindAsyncLoading();
      this.loadSDK();
      this.initAppEvents();
    },
    bindAsyncLoading : function() {
      var self = this;
      /**
       * @return {undefined}
       */
      window.fbAsyncInit = function() {
        FB.init({
          appId : Application.settings.fb_app_id,
          status : true,
          cookie : true,
          version : Application.settings.fb_graph_v,
          xfbml : false
        });
        /** @type {boolean} */
        self.loaded = true;
        self.checkQueue();
      };
    },
    loadSDK : function() {
      !function(context, t, id) {
        var e;
        /** @type {!Element} */
        var wafCss = context.getElementsByTagName(t)[0];
        if (!context.getElementById(id)) {
          /** @type {!Element} */
          e = context.createElement(t);
          /** @type {string} */
          e.id = id;
          /** @type {string} */
          e.src = "//connect.facebook.net/en_US/sdk.js";
          wafCss.parentNode.insertBefore(e, wafCss);
        }
      }(document, "script", "facebook-jssdk");
    },
    initAppEvents : function() {
      if (this.isAppEventsEnabled()) {
        this.exec(["AppEvents", "activateApp"], []);
      }
    },
    logCustomAppEvent : function(notificationName, data) {
      data = $.extend({
        value : null,
        params : {}
      }, data);
      if (this.isAppEventsEnabled()) {
        this.exec(["AppEvents", "logEvent"], [notificationName, data.value, data.params]);
      }
    },
    isAppEventsEnabled : function() {
      return Application.settings.is_fb_canvas || Application.settings.is_fb_mobile;
    },
    exec : function(name, command) {
      if (this.loaded) {
        try {
          if (name instanceof Array) {
            var map = FB;
            /** @type {number} */
            var i = 0;
            for (; i < name.length; i++) {
              map = map[name[i]];
            }
            map.apply(null, command);
          } else {
            FB[name].apply(null, command);
          }
        } catch (i) {
        }
      } else {
        this.queue.push({
          method : name,
          args : command
        });
      }
    },
    checkQueue : function() {
      var queue = this.queue;
      for (; queue.length > 0;) {
        var query = queue.shift();
        try {
          this.exec(query.method, query.args);
        } catch (userCodeResponse) {
          console.log(userCodeResponse.message);
        }
      }
    },
    inviteFriends : function() {
      var options = {
        method : "apprequests",
        message : "Play Free Rider HD with me!",
        filters : ["app_non_users"],
        frictionlessRequests : true
      };
      this.exec("ui", [options]);
    },
    getPageInfo : function(state) {
      this.exec(["Canvas", "getPageInfo"], [state]);
    },
    fbPaymentsCallback : function(e, islongclick) {
      if (e.msg) {
        alert(e.msg);
      }
    }
  };
  parent.FacebookHelper = new Dialog;
}(Application.Helpers = Application.Helpers || {}), function(HTMLSectionBuilder) {
  var target = Application.Helpers.TemplateHelper;
  var leadModel = Application.Helpers.AjaxHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  /** @type {!Array} */
  var newpost = ["campaign/campaign_skip_modal"];
  var HTMLSection = Backbone.View.extend({
    initialize : function(options) {
      var that = this;
      /** @type {!Object} */
      this.options = options;
      Application.events.publish("scrollTo", {
        x : 0,
        y : 0
      });
      this._getTemplates(newpost, function(cssPropValueList) {
        var value = cssPropValueList["campaign/campaign_skip_modal"];
        var e = target.render(value, {}, that.options);
        if (options.mobile) {
          $("#game-container").prepend(e);
        } else {
          $("body").prepend(e);
        }
        that.setElement($("#campaign-skip-modal"));
      });
    },
    events : {
      "click #campaign-skip-modal-close" : "close_modal",
      "click #campaign-skip-modal-cancel" : "close_modal",
      "click #campaign-skip-modal-skip" : "skip_track"
    },
    skip_track : function() {
      var $scope = this;
      var piped = (this.$el.addClass("loading"), leadModel.get("track_api/skip_campaign_track/" + this.options.id));
      piped.done(function(error) {
        if (1 == error.result) {
          $scope.track_success_event();
          $scope.options.success(error);
          $scope.close_modal();
        } else {
          $("#campaign-skip-modal").removeClass("loading");
          $("#campaign-skip-modal-title").hide();
          $("#campaign-skip-modal-title-failed").show();
          $("#campaign-skip-modal-confirm").hide();
          $("#campaign-skip-modal-failed").show();
          $("#campaign-skip-modal-skip").hide();
          $scope.options.fail(error);
        }
      });
      piped.fail(function() {
        $scope.close_modal();
      });
    },
    track_success_event : function() {
      metrics.track_event({
        category : "campaign-track",
        action : "track-skip",
        label : this.options.id
      });
    },
    close_modal : function() {
      this.$el.unbind();
      this.$el.remove();
      this.options.cancel();
    },
    _getTemplates : function(section, callback) {
      var self = this;
      target.getTemplates(section, function(templates) {
        /** @type {string} */
        self.templates = templates;
        callback(templates);
      });
    }
  });
  HTMLSectionBuilder.CampaignSkipModal = HTMLSection;
}(Application.Views = Application.Views || {}), function(n) {
  var self = Application.Helpers.TemplateHelper;
  var leadModel = Application.Helpers.AjaxHelper;
  var metrics = Application.Helpers.GoogleAnalyticsHelper;
  /** @type {!Array} */
  var newpost = ["campaign/campaign_unlock_modal"];
  var inComponent = Backbone.View.extend({
    initialize : function(options) {
      var t = this;
      /** @type {!Object} */
      this.options = options;
      this.render(options, function() {
        t.get_requirements();
      });
    },
    events : {
      "click #campaign-unlock-modal-close" : "close",
      "click #campaign-unlock-modal-cancel" : "cancel",
      "click .add-friends" : "add_friends"
    },
    add_friends : function() {
      var NON_CAP_IDENTITY_REGEX = Application.User.get("u_name");
      Application.router.do_route(Application.settings.base_platform_url + "/u/" + NON_CAP_IDENTITY_REGEX + "/friends");
      this.close();
    },
    render : function(name, fn) {
      var tiledAttachmentListView = this;
      this._getTemplates(newpost, function(rgbArrays) {
        var a = rgbArrays["campaign/campaign_unlock_modal"];
        var i = self.render(a, {}, name);
        if ($("#campaign-unlock-modal").length > 0) {
          $("#campaign-unlock-modal").replaceWith(i);
        } else {
          $("body").prepend(i);
        }
        tiledAttachmentListView.setElement($("#campaign-unlock-modal"));
        if (fn) {
          fn();
        }
      });
    },
    get_requirements : function() {
      var e = this;
      var delayedWrite = leadModel.get("track_api/get_campaign_requirements/" + this.options.id);
      delayedWrite.done(function(action) {
        if (1 == action.result) {
          var value = _.extend({}, this.options, action.data);
          e.render(value);
        } else {
          e.close();
        }
      });
    },
    track_success_event : function() {
      metrics.track_event({
        category : "campaign-track",
        action : "campaign-unlock",
        label : this.options.id
      });
    },
    cancel : function() {
      metrics.track_event({
        category : "campaign-track",
        action : "campaign-unlock-cancel",
        label : this.options.id
      });
      this.close();
    },
    close : function() {
      this.$el.unbind();
      this.$el.remove();
    },
    _getTemplates : function(section, callback) {
      var freeExports = this;
      self.getTemplates(section, function(templates) {
        /** @type {string} */
        freeExports.templates = templates;
        callback(templates);
      });
    }
  });
  n.CampaignUnlockModal = inComponent;
}(Application.Views = Application.Views || {});
