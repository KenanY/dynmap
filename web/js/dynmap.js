// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name dynmap.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/leaflet.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/custommarker.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/dynmaputils.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/version.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/jquery.json.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/jquery.mousewheel.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/minecraft.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/map.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/hdmap.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/kzedmaps.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/js/flatmap.js
// @code_url https://raw.github.com/KenanY/dynmap/master/web/config.js
// @formatting pretty_print
// ==/ClosureCompiler==
(function(a) {
  var b = {VERSION:"0.3", ROOT_URL:function() {
    for(var a = document.getElementsByTagName("script"), b = /^(.*\/)leaflet-?([\w-]*)\.js.*$/, e = 0, f = a.length;e < f;e++) {
      var g = a[e].src;
      if(g = g && g.match(b)) {
        if("include" == g[2]) {
          break
        }
        return g[1]
      }
    }
    return"../../dist/"
  }(), noConflict:function() {
    a.L = this._originalL;
    return this
  }, _originalL:a.L};
  window.L = b
})(this);
L.Util = {extend:function(a) {
  for(var b = Array.prototype.slice.call(arguments, 1), c = 0, d = b.length, e;c < d;c++) {
    e = b[c] || {};
    for(var f in e) {
      e.hasOwnProperty(f) && (a[f] = e[f])
    }
  }
  return a
}, bind:function(a, b) {
  return function() {
    return a.apply(b, arguments)
  }
}, stamp:function() {
  var a = 0;
  return function(b) {
    b._leaflet_id = b._leaflet_id || ++a;
    return b._leaflet_id
  }
}(), requestAnimFrame:function() {
  function a(a) {
    window.setTimeout(a, 1E3 / 60)
  }
  var b = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || a;
  return function(c, d, e) {
    c = d ? L.Util.bind(c, d) : d;
    e && b === a ? c() : b(c)
  }
}(), limitExecByInterval:function(a, b, c) {
  function d() {
    e = !1;
    f && (g.callee.apply(c, g), f = !1)
  }
  var e, f, g;
  return function() {
    g = arguments;
    e ? f = !0 : (e = !0, setTimeout(d, b), a.apply(c, g))
  }
}, falseFn:function() {
  return!1
}, formatNum:function(a, b) {
  var c = Math.pow(10, b || 5);
  return Math.round(a * c) / c
}, setOptions:function(a, b) {
  a.options = L.Util.extend({}, a.options, b)
}, getParamString:function(a) {
  var b = [], c;
  for(c in a) {
    a.hasOwnProperty(c) && b.push(c + "=" + a[c])
  }
  return"?" + b.join("&")
}};
L.Class = function() {
};
L.Class.extend = function(a) {
  var b = function() {
    this.initialize && this.initialize.apply(this, arguments)
  }, c = function() {
  };
  c.prototype = this.prototype;
  c = new c;
  c.constructor = b;
  b.prototype = c;
  b.superclass = this.prototype;
  for(var d in this) {
    this.hasOwnProperty(d) && "prototype" != d && "superclass" != d && (b[d] = this[d])
  }
  a.statics && (L.Util.extend(b, a.statics), delete a.statics);
  a.includes && (L.Util.extend.apply(null, [c].concat(a.includes)), delete a.includes);
  a.options && c.options && (a.options = L.Util.extend({}, c.options, a.options));
  L.Util.extend(c, a);
  b.extend = arguments.callee;
  b.include = function(a) {
    L.Util.extend(this.prototype, a)
  };
  return b
};
L.Mixin = {};
L.Mixin.Events = {addEventListener:function(a, b, c) {
  var d = this._leaflet_events = this._leaflet_events || {};
  d[a] = d[a] || [];
  d[a].push({action:b, context:c});
  return this
}, hasEventListeners:function(a) {
  return"_leaflet_events" in this && a in this._leaflet_events && 0 < this._leaflet_events[a].length
}, removeEventListener:function(a, b, c) {
  if(!this.hasEventListeners(a)) {
    return this
  }
  for(var d = 0, e = this._leaflet_events, f = e[a].length;d < f;d++) {
    if(e[a][d].action === b && (!c || e[a][d].context === c)) {
      e[a].splice(d, 1);
      break
    }
  }
  return this
}, fireEvent:function(a, b) {
  if(this.hasEventListeners(a)) {
    for(var c = L.Util.extend({type:a, target:this}, b), d = this._leaflet_events[a].slice(), e = 0, f = d.length;e < f;e++) {
      d[e].action.call(d[e].context || this, c)
    }
    return this
  }
}};
L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;
(function() {
  var a = navigator.userAgent.toLowerCase(), b = !!window.ActiveXObject, c = -1 != a.indexOf("webkit"), d = "undefined" != typeof orientation ? !0 : !1, e = -1 != a.indexOf("android"), f = window.opera;
  L.Browser = {ie:b, ie6:b && !window.XMLHttpRequest, webkit:c, webkit3d:c && "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix, gecko:-1 != a.indexOf("gecko"), opera:f, android:e, mobileWebkit:d && c, mobileOpera:d && f, mobile:d, touch:"ontouchstart" in document.documentElement}
})();
L.Point = function(a, b, c) {
  this.x = c ? Math.round(a) : a;
  this.y = c ? Math.round(b) : b
};
L.Point.prototype = {add:function(a) {
  return this.clone()._add(a)
}, _add:function(a) {
  this.x += a.x;
  this.y += a.y;
  return this
}, subtract:function(a) {
  return this.clone()._subtract(a)
}, _subtract:function(a) {
  this.x -= a.x;
  this.y -= a.y;
  return this
}, divideBy:function(a, b) {
  return new L.Point(this.x / a, this.y / a, b)
}, multiplyBy:function(a) {
  return new L.Point(this.x * a, this.y * a)
}, distanceTo:function(a) {
  var b = a.x - this.x, a = a.y - this.y;
  return Math.sqrt(b * b + a * a)
}, round:function() {
  return this.clone()._round()
}, _round:function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
}, clone:function() {
  return new L.Point(this.x, this.y)
}, toString:function() {
  return"Point(" + L.Util.formatNum(this.x) + ", " + L.Util.formatNum(this.y) + ")"
}};
L.Bounds = L.Class.extend({initialize:function(a, b) {
  if(a) {
    for(var c = a instanceof Array ? a : [a, b], d = 0, e = c.length;d < e;d++) {
      this.extend(c[d])
    }
  }
}, extend:function(a) {
  !this.min && !this.max ? (this.min = new L.Point(a.x, a.y), this.max = new L.Point(a.x, a.y)) : (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(a.y, this.max.y))
}, getCenter:function(a) {
  return new L.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, a)
}, contains:function(a) {
  var b;
  a instanceof L.Bounds ? (b = a.min, a = a.max) : b = a;
  return b.x >= this.min.x && a.x <= this.max.x && b.y >= this.min.y && a.y <= this.max.y
}});
L.Transformation = L.Class.extend({initialize:function(a, b, c, d) {
  this._a = a;
  this._b = b;
  this._c = c;
  this._d = d
}, transform:function(a, b) {
  return this._transform(a.clone(), b)
}, _transform:function(a, b) {
  b = b || 1;
  a.x = b * (this._a * a.x + this._b);
  a.y = b * (this._c * a.y + this._d);
  return a
}, untransform:function(a, b) {
  b = b || 1;
  return new L.Point((a.x / b - this._b) / this._a, (a.y / b - this._d) / this._c)
}});
L.LineUtil = {simplify:function(a, b) {
  if(!b || !a.length) {
    return a.slice()
  }
  a = this.reducePoints(a, b);
  return this.simplifyDP(a, b)
}, pointToSegmentDistance:function(a, b, c) {
  return Math.sqrt(this._sqPointToSegmentDist(a, b, c))
}, closestPointOnSegment:function(a, b, c) {
  a = this._sqClosestPointOnSegment(a, b, c);
  a.distance = Math.sqrt(a._sqDist);
  return a
}, simplifyDP:function(a, b) {
  for(var c = 0, d = 0, e = b * b, f = 1, g = a.length, h;f < g - 1;f++) {
    h = this._sqPointToSegmentDist(a[f], a[0], a[g - 1]), h > c && (d = f, c = h)
  }
  return c >= e ? (c = a.slice(0, d), d = a.slice(d), g = this.simplifyDP(c, b).slice(0, g - 2), d = this.simplifyDP(d, b), g.concat(d)) : [a[0], a[g - 1]]
}, reducePoints:function(a, b) {
  for(var c = [a[0]], d = b * b, e = 1, f = 0, g = a.length;e < g;e++) {
    this._sqDist(a[e], a[f]) < d || (c.push(a[e]), f = e)
  }
  f < g - 1 && c.push(a[g - 1]);
  return c
}, clipSegment:function(a, b, c, d) {
  var d = d ? this._lastCode : this._getBitCode(a, c), e = this._getBitCode(b, c);
  for(this._lastCode = e;;) {
    if(d | e) {
      if(d & e) {
        return!1
      }
      var f = d || e, g = this._getEdgeIntersection(a, b, f, c), h = this._getBitCode(g, c);
      f == d ? (a = g, d = h) : (b = g, e = h)
    }else {
      return[a, b]
    }
  }
}, _getEdgeIntersection:function(a, b, c, d) {
  var e = b.x - a.x, b = b.y - a.y, f = d.min, d = d.max;
  if(c & 8) {
    return new L.Point(a.x + e * (d.y - a.y) / b, d.y)
  }
  if(c & 4) {
    return new L.Point(a.x + e * (f.y - a.y) / b, f.y)
  }
  if(c & 2) {
    return new L.Point(d.x, a.y + b * (d.x - a.x) / e)
  }
  if(c & 1) {
    return new L.Point(f.x, a.y + b * (f.x - a.x) / e)
  }
}, _getBitCode:function(a, b) {
  var c = 0;
  a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2);
  a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8);
  return c
}, _sqDist:function(a, b) {
  var c = b.x - a.x, d = b.y - a.y;
  return c * c + d * d
}, _sqClosestPointOnSegment:function(a, b, c) {
  var d = c.x - b.x, e = c.y - b.y, f = b;
  if(d || e) {
    var g = ((a.x - b.x) * d + (a.y - b.y) * e) / this._sqDist(b, c);
    1 < g ? f = c : 0 < g && (f = new L.Point(b.x + d * g, b.y + e * g))
  }
  f._sqDist = this._sqDist(a, f);
  return f
}, _sqPointToSegmentDist:function(a, b, c) {
  return this._sqClosestPointOnSegment(a, b, c)._sqDist
}};
L.PolyUtil = {};
L.PolyUtil.clipPolygon = function(a, b) {
  var c, d = [1, 4, 2, 8], e, f, g, h, j, m, l = L.LineUtil;
  e = 0;
  for(j = a.length;e < j;e++) {
    a[e]._code = l._getBitCode(a[e], b)
  }
  for(g = 0;4 > g;g++) {
    m = d[g];
    c = [];
    e = 0;
    j = a.length;
    for(f = j - 1;e < j;f = e++) {
      (h = a[e], f = a[f], h._code & m) ? f._code & m || (f = l._getEdgeIntersection(f, h, m, b), f._code = l._getBitCode(f, b), c.push(f)) : (f._code & m && (f = l._getEdgeIntersection(f, h, m, b), f._code = l._getBitCode(f, b), c.push(f)), c.push(h))
    }
    a = c
  }
  return a
};
L.DomEvent = {addListener:function(a, b, c, d) {
  function e(b) {
    return c.call(d || a, b || L.DomEvent._getEvent())
  }
  var f = L.Util.stamp(c);
  if(L.Browser.touch && "dblclick" == b && this.addDoubleTapListener) {
    this.addDoubleTapListener(a, e, f)
  }else {
    if("addEventListener" in a) {
      if("mousewheel" == b) {
        a.addEventListener("DOMMouseScroll", e, !1), a.addEventListener(b, e, !1)
      }else {
        if("mouseenter" == b || "mouseleave" == b) {
          var g = e, e = function(b) {
            if(L.DomEvent._checkMouse(a, b)) {
              return g(b)
            }
          };
          a.addEventListener("mouseenter" == b ? "mouseover" : "mouseout", e, !1)
        }else {
          a.addEventListener(b, e, !1)
        }
      }
    }else {
      "attachEvent" in a && a.attachEvent("on" + b, e)
    }
  }
  a["_leaflet_" + b + f] = e
}, removeListener:function(a, b, c) {
  var c = L.Util.stamp(c), d = "_leaflet_" + b + c;
  handler = a[d];
  L.Browser.touch && "dblclick" == b && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, c) : "removeEventListener" in a ? "mousewheel" == b ? (a.removeEventListener("DOMMouseScroll", handler, !1), a.removeEventListener(b, handler, !1)) : "mouseenter" == b || "mouseleave" == b ? a.removeEventListener("mouseenter" == b ? "mouseover" : "mouseout", handler, !1) : a.removeEventListener(b, handler, !1) : "detachEvent" in a && a.detachEvent("on" + b, handler);
  a[d] = null
}, _checkMouse:function(a, b) {
  var c = b.relatedTarget;
  if(!c) {
    return!0
  }
  try {
    for(;c && c != a;) {
      c = c.parentNode
    }
  }catch(d) {
    return!1
  }
  return c != a
}, _getEvent:function() {
  var a = window.event;
  if(!a) {
    for(var b = arguments.callee.caller;b && !((a = b.arguments[0]) && Event == a.constructor);) {
      b = b.caller
    }
  }
  return a
}, stopPropagation:function(a) {
  a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
}, disableClickPropagation:function(a) {
  L.DomEvent.addListener(a, "mousedown", L.DomEvent.stopPropagation);
  L.DomEvent.addListener(a, "click", L.DomEvent.stopPropagation);
  L.DomEvent.addListener(a, "dblclick", L.DomEvent.stopPropagation)
}, preventDefault:function(a) {
  a.preventDefault ? a.preventDefault() : a.returnValue = !1
}, stop:function(a) {
  L.DomEvent.preventDefault(a);
  L.DomEvent.stopPropagation(a)
}, getMousePosition:function(a, b) {
  var c = new L.Point(a.pageX ? a.pageX : a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, a.pageY ? a.pageY : a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
  return b ? c.subtract(L.DomUtil.getViewportOffset(b)) : c
}, getWheelDelta:function(a) {
  var b = 0;
  a.wheelDelta && (b = a.wheelDelta / 120);
  a.detail && (b = -a.detail / 3);
  return b
}};
L.Util.extend(L.DomEvent, {addDoubleTapListener:function(a, b, c) {
  function d(a) {
    if(1 == a.touches.length) {
      var b = Date.now(), c = b - (f || b);
      j = a.touches[0];
      g = 0 < c && c <= h;
      f = b
    }
  }
  function e() {
    g && (j.type = "dblclick", b(j), f = null)
  }
  var f, g = !1, h = 250, j;
  a["_leaflet_touchstart" + c] = d;
  a["_leaflet_touchend" + c] = e;
  a.addEventListener("touchstart", d, !1);
  a.addEventListener("touchend", e, !1)
}, removeDoubleTapListener:function(a, b) {
  a.removeEventListener(a, a["_leaflet_touchstart" + b], !1);
  a.removeEventListener(a, a["_leaflet_touchend" + b], !1)
}});
L.DomUtil = {get:function(a) {
  return"string" == typeof a ? document.getElementById(a) : a
}, getStyle:function(a, b) {
  var c = a.style[b];
  !c && a.currentStyle && (c = a.currentStyle[b]);
  if(!c || "auto" == c) {
    c = (c = document.defaultView.getComputedStyle(a, null)) ? c[b] : null
  }
  return"auto" == c ? null : c
}, getViewportOffset:function(a) {
  var b = 0, c = 0, d = a, e = document.body;
  do {
    if(b += d.offsetTop || 0, c += d.offsetLeft || 0, d.offsetParent == e && "absolute" == L.DomUtil.getStyle(d, "position")) {
      break
    }
  }while(d = d.offsetParent);
  d = a;
  do {
    if(d === e) {
      break
    }
    b -= d.scrollTop || 0;
    c -= d.scrollLeft || 0
  }while(d = d.parentNode);
  return new L.Point(c, b)
}, create:function(a, b, c) {
  a = document.createElement(a);
  a.className = b;
  c && c.appendChild(a);
  return a
}, disableTextSelection:function() {
  document.selection && document.selection.empty && document.selection.empty();
  this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = L.Util.falseFn)
}, enableTextSelection:function() {
  document.onselectstart = this._onselectstart;
  this._onselectstart = null
}, hasClass:function(a, b) {
  return 0 < a.className.length && RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
}, addClass:function(a, b) {
  L.DomUtil.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
}, removeClass:function(a, b) {
  a.className = a.className.replace(/(\S+)\s*/g, function(a, d) {
    return d == b ? "" : a
  }).replace(/^\s+/, "")
}, setOpacity:function(a, b) {
  L.Browser.ie ? a.style.filter = "alpha(opacity=" + Math.round(100 * b) + ")" : a.style.opacity = b
}, testProp:function(a) {
  for(var b = document.documentElement.style, c = 0;c < a.length;c++) {
    if(a[c] in b) {
      return a[c]
    }
  }
  return!1
}, getTranslateString:function(a) {
  return L.DomUtil.TRANSLATE_OPEN + a.x + "px," + a.y + "px" + L.DomUtil.TRANSLATE_CLOSE
}, getScaleString:function(a, b) {
  return L.DomUtil.getTranslateString(b) + " scale(" + a + ") " + L.DomUtil.getTranslateString(b.multiplyBy(-1))
}, setPosition:function(a, b) {
  a._leaflet_pos = b;
  L.Browser.webkit ? a.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(b) : (a.style.left = b.x + "px", a.style.top = b.y + "px")
}, getPosition:function(a) {
  return a._leaflet_pos
}};
L.Util.extend(L.DomUtil, {TRANSITION:L.DomUtil.testProp(["transition", "webkitTransition", "OTransition", "MozTransition", "msTransition"]), TRANSFORM:L.DomUtil.testProp(["transformProperty", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), TRANSLATE_OPEN:"translate" + (L.Browser.webkit3d ? "3d(" : "("), TRANSLATE_CLOSE:L.Browser.webkit3d ? ",0)" : ")"});
L.Draggable = L.Class.extend({includes:L.Mixin.Events, statics:{START:L.Browser.touch ? "touchstart" : "mousedown", END:L.Browser.touch ? "touchend" : "mouseup", MOVE:L.Browser.touch ? "touchmove" : "mousemove", TAP_TOLERANCE:15}, initialize:function(a, b) {
  this._element = a;
  this._dragStartTarget = b || a
}, enable:function() {
  this._enabled || (L.DomEvent.addListener(this._dragStartTarget, L.Draggable.START, this._onDown, this), this._enabled = !0)
}, disable:function() {
  this._enabled && (L.DomEvent.removeListener(this._dragStartTarget, L.Draggable.START, this._onDown), this._enabled = !1)
}, _onDown:function(a) {
  if(!(a.shiftKey || 1 != a.which && 1 != a.button && !a.touches) && !(a.touches && 1 < a.touches.length)) {
    var b = a.touches && 1 == a.touches.length ? a.touches[0] : a;
    L.DomEvent.preventDefault(a);
    L.Browser.touch && (b.target.className += " leaflet-active");
    this._moved = !1;
    L.DomUtil.disableTextSelection();
    this._setMovingCursor();
    this._startPos = this._newPos = L.DomUtil.getPosition(this._element);
    this._startPoint = new L.Point(b.clientX, b.clientY);
    L.DomEvent.addListener(document, L.Draggable.MOVE, this._onMove, this);
    L.DomEvent.addListener(document, L.Draggable.END, this._onUp, this)
  }
}, _onMove:function(a) {
  a.touches && 1 < a.touches.length || (L.DomEvent.preventDefault(a), a = a.touches && 1 == a.touches.length ? a.touches[0] : a, this._moved || (this.fire("dragstart"), this._moved = !0), this._newPos = this._startPos.add(new L.Point(a.clientX, a.clientY)).subtract(this._startPoint), L.Util.requestAnimFrame(this._updatePosition, this, !0))
}, _updatePosition:function() {
  L.DomUtil.setPosition(this._element, this._newPos);
  this.fire("drag")
}, _onUp:function(a) {
  if(a.changedTouches) {
    var a = a.changedTouches[0], b = a.target, c = this._newPos && this._newPos.distanceTo(this._startPos) || 0;
    b.className = b.className.replace(" leaflet-active", "");
    c < L.Draggable.TAP_TOLERANCE && this._simulateEvent("click", a)
  }
  L.DomUtil.enableTextSelection();
  this._restoreCursor();
  L.DomEvent.removeListener(document, L.Draggable.MOVE, this._onMove);
  L.DomEvent.removeListener(document, L.Draggable.END, this._onUp);
  this._moved && this.fire("dragend")
}, _removeActiveClass:function() {
}, _setMovingCursor:function() {
  this._bodyCursor = document.body.style.cursor;
  document.body.style.cursor = "move"
}, _restoreCursor:function() {
  document.body.style.cursor = this._bodyCursor
}, _simulateEvent:function(a, b) {
  var c = document.createEvent("MouseEvent");
  c.initMouseEvent(a, !0, !0, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null);
  b.target.dispatchEvent(c)
}});
L.Transition = L.Class.extend({includes:L.Mixin.Events, statics:{CUSTOM_PROPS_SETTERS:{position:L.DomUtil.setPosition}, implemented:function() {
  return L.Transition.NATIVE || L.Transition.TIMER
}}, options:{easing:"ease", duration:0.5}, _setProperty:function(a, b) {
  var c = L.Transition.CUSTOM_PROPS_SETTERS;
  if(a in c) {
    c[a](this._el, b)
  }else {
    this._el.style[a] = b
  }
}});
L.Transition = L.Transition.extend({statics:function() {
  var a = L.DomUtil.TRANSITION;
  return{NATIVE:!!a, TRANSITION:a, PROPERTY:a + "Property", DURATION:a + "Duration", EASING:a + "TimingFunction", END:"webkitTransition" == a || "OTransition" == a ? a + "End" : "transitionend", CUSTOM_PROPS_PROPERTIES:{position:L.Browser.webkit ? L.DomUtil.TRANSFORM : "top, left"}}
}(), options:{fakeStepInterval:100}, initialize:function(a, b) {
  this._el = a;
  L.Util.setOptions(this, b);
  L.DomEvent.addListener(a, L.Transition.END, this._onTransitionEnd, this);
  this._onFakeStep = L.Util.bind(this._onFakeStep, this)
}, run:function(a) {
  var b, c = [], d = L.Transition.CUSTOM_PROPS_PROPERTIES;
  for(b in a) {
    a.hasOwnProperty(b) && (b = d[b] ? d[b] : b, b = b.replace(/([A-Z])/g, function(a) {
      return"-" + a.toLowerCase()
    }), c.push(b))
  }
  this._onTransitionEnd();
  this._el.style[L.Transition.DURATION] = this.options.duration + "s";
  this._el.style[L.Transition.EASING] = this.options.easing;
  this._el.style[L.Transition.PROPERTY] = c.join(", ");
  for(b in a) {
    a.hasOwnProperty(b) && this._setProperty(b, a[b])
  }
  this._inProgress = !0;
  this.fire("start");
  L.Transition.NATIVE ? this._timer = setInterval(this._onFakeStep, this.options.fakeStepInterval) : this._onTransitionEnd()
}, _onFakeStep:function() {
  this.fire("step")
}, _onTransitionEnd:function() {
  this._inProgress && (this._inProgress = !1, clearInterval(this._timer), this._el.style[L.Transition.PROPERTY] = "none", this.fire("step"), this.fire("end"))
}});
L.Transition = L.Transition.NATIVE ? L.Transition : L.Transition.extend({statics:{getTime:Date.now || function() {
  return+new Date
}, TIMER:!0, EASINGS:{ease:[0.25, 0.1, 0.25, 1], linear:[0, 0, 1, 1], "ease-in":[0.42, 0, 1, 1], "ease-out":[0, 0, 0.58, 1], "ease-in-out":[0.42, 0, 0.58, 1]}, CUSTOM_PROPS_GETTERS:{position:L.DomUtil.getPosition}, UNIT_RE:/^[\d\.]+(\D*)$/}, options:{fps:50}, initialize:function(a, b) {
  this._el = a;
  L.Util.extend(this.options, b);
  var c = L.Transition.EASINGS[this.options.easing] || L.Transition.EASINGS.ease;
  this._p1 = new L.Point(0, 0);
  this._p2 = new L.Point(c[0], c[1]);
  this._p3 = new L.Point(c[2], c[3]);
  this._p4 = new L.Point(1, 1);
  this._step = L.Util.bind(this._step, this);
  this._interval = Math.round(1E3 / this.options.fps)
}, run:function(a) {
  this._props = {};
  var b = L.Transition.CUSTOM_PROPS_GETTERS, c = L.Transition.UNIT_RE;
  this.fire("start");
  for(var d in a) {
    if(a.hasOwnProperty(d)) {
      var e = {};
      if(d in b) {
        e.from = b[d](this._el)
      }else {
        var f = this._el.style[d].match(c);
        e.from = parseFloat(f[0]);
        e.unit = f[1]
      }
      e.to = a[d];
      this._props[d] = e
    }
  }
  clearInterval(this._timer);
  this._timer = setInterval(this._step, this._interval);
  this._startTime = L.Transition.getTime()
}, _step:function() {
  var a = L.Transition.getTime() - this._startTime, b = 1E3 * this.options.duration;
  a < b ? this._runFrame(this._cubicBezier(a / b)) : (this._runFrame(1), this._complete())
}, _runFrame:function(a) {
  var b = L.Transition.CUSTOM_PROPS_SETTERS, c, d;
  for(c in this._props) {
    this._props.hasOwnProperty(c) && (d = this._props[c], c in b ? (d = d.to.subtract(d.from).multiplyBy(a).add(d.from), b[c](this._el, d)) : this._el.style[c] = (d.to - d.from) * a + d.from + d.unit)
  }
  this.fire("step")
}, _complete:function() {
  clearInterval(this._timer);
  this.fire("end")
}, _cubicBezier:function(a) {
  var b = 3 * Math.pow(1 - a, 2) * a, c = 3 * (1 - a) * Math.pow(a, 2), d = Math.pow(a, 3), a = this._p1.multiplyBy(Math.pow(1 - a, 3)), b = this._p2.multiplyBy(b), c = this._p3.multiplyBy(c), d = this._p4.multiplyBy(d);
  return a.add(b).add(c).add(d).y
}});
L.LatLng = function(a, b, c) {
  var d = parseFloat(a), e = parseFloat(b);
  if(isNaN(d) || isNaN(e)) {
    throw Error("Invalid LatLng object: (" + a + ", " + b + ")");
  }
  !0 !== c && (d = Math.max(Math.min(d, 90), -90), e = (e + 180) % 360 + (-180 > e ? 180 : -180));
  this.lat = d;
  this.lng = e
};
L.Util.extend(L.LatLng, {DEG_TO_RAD:Math.PI / 180, RAD_TO_DEG:180 / Math.PI, MAX_MARGIN:1.0E-9});
L.LatLng.prototype = {equals:function(a) {
  return!(a instanceof L.LatLng) ? !1 : Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng)) <= L.LatLng.MAX_MARGIN
}, toString:function() {
  return"LatLng(" + L.Util.formatNum(this.lat) + ", " + L.Util.formatNum(this.lng) + ")"
}};
L.LatLngBounds = L.Class.extend({initialize:function(a, b) {
  if(a) {
    for(var c = a instanceof Array ? a : [a, b], d = 0, e = c.length;d < e;d++) {
      this.extend(c[d])
    }
  }
}, extend:function(a) {
  !this._southWest && !this._northEast ? (this._southWest = new L.LatLng(a.lat, a.lng), this._northEast = new L.LatLng(a.lat, a.lng)) : (this._southWest.lat = Math.min(a.lat, this._southWest.lat), this._southWest.lng = Math.min(a.lng, this._southWest.lng), this._northEast.lat = Math.max(a.lat, this._northEast.lat), this._northEast.lng = Math.max(a.lng, this._northEast.lng))
}, getCenter:function() {
  return new L.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
}, getSouthWest:function() {
  return this._southWest
}, getNorthEast:function() {
  return this._northEast
}, getNorthWest:function() {
  return new L.LatLng(this._northEast.lat, this._southWest.lng)
}, getSouthEast:function() {
  return new L.LatLng(this._southWest.lat, this._northEast.lng)
}, contains:function(a) {
  var b = this._southWest, c = this._northEast, d;
  a instanceof L.LatLngBounds ? (d = a.getSouthWest(), a = a.getNorthEast()) : d = a;
  return d.lat >= b.lat && a.lat <= c.lat && d.lng >= b.lng && a.lng <= c.lng
}});
L.Projection = {};
L.Projection.SphericalMercator = {MAX_LATITUDE:85.0511287798, project:function(a) {
  var b = L.LatLng.DEG_TO_RAD, c = this.MAX_LATITUDE, d = a.lng * b, a = Math.max(Math.min(c, a.lat), -c) * b, a = Math.log(Math.tan(Math.PI / 4 + a / 2));
  return new L.Point(d, a)
}, unproject:function(a, b) {
  var c = L.LatLng.RAD_TO_DEG;
  return new L.LatLng((2 * Math.atan(Math.exp(a.y)) - Math.PI / 2) * c, a.x * c, b)
}};
L.Projection.LonLat = {project:function(a) {
  return new L.Point(a.lng, a.lat)
}, unproject:function(a, b) {
  return new L.LatLng(a.y, a.x, b)
}};
L.Projection.Mercator = {MAX_LATITUDE:85.0840591556, R_MINOR:6356752.3142, R_MAJOR:6378137, project:function(a) {
  var b = L.LatLng.DEG_TO_RAD, c = this.MAX_LATITUDE, d = this.R_MAJOR, e = a.lng * b * d, a = Math.max(Math.min(c, a.lat), -c) * b, b = this.R_MINOR / d, b = Math.sqrt(1 - b * b), c = b * Math.sin(a), c = Math.pow((1 - c) / (1 + c), 0.5 * b), a = -d * Math.log(Math.tan(0.5 * (0.5 * Math.PI - a)) / c);
  return new L.Point(e, a)
}, unproject:function(a, b) {
  for(var c = L.LatLng.RAD_TO_DEG, d = this.R_MAJOR, e = a.x * c / d, f = this.R_MINOR / d, f = Math.sqrt(1 - f * f), d = Math.exp(-a.y / d), g = Math.PI / 2 - 2 * Math.atan(d), h = 15, j = 0.1;1.0E-7 < Math.abs(j) && 0 < --h;) {
    j = f * Math.sin(g), j = Math.PI / 2 - 2 * Math.atan(d * Math.pow((1 - j) / (1 + j), 0.5 * f)) - g, g += j
  }
  return new L.LatLng(g * c, e, b)
}};
L.CRS = {latLngToPoint:function(a, b) {
  return this.transformation._transform(this.projection.project(a), b)
}, pointToLatLng:function(a, b, c) {
  return this.projection.unproject(this.transformation.untransform(a, b), c)
}, project:function(a) {
  return this.projection.project(a)
}};
L.CRS.EPSG3857 = L.Util.extend({}, L.CRS, {code:"EPSG:3857", projection:L.Projection.SphericalMercator, transformation:new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5), project:function(a) {
  return this.projection.project(a).multiplyBy(6378137)
}});
L.CRS.EPSG900913 = L.Util.extend({}, L.CRS.EPSG3857, {code:"EPSG:900913"});
L.CRS.EPSG4326 = L.Util.extend({}, L.CRS, {code:"EPSG:4326", projection:L.Projection.LonLat, transformation:new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)});
L.CRS.EPSG3395 = L.Util.extend({}, L.CRS, {code:"EPSG:3395", projection:L.Projection.Mercator, transformation:function() {
  var a = L.Projection.Mercator;
  return new L.Transformation(0.5 / (Math.PI * a.R_MAJOR), 0.5, -0.5 / (Math.PI * a.R_MINOR), 0.5)
}()});
L.LayerGroup = L.Class.extend({initialize:function(a) {
  this._layers = {};
  if(a) {
    for(var b = 0, c = a.length;b < c;b++) {
      this.addLayer(a[b])
    }
  }
}, addLayer:function(a) {
  this._layers[L.Util.stamp(a)] = a;
  this._map && this._map.addLayer(a);
  return this
}, removeLayer:function(a) {
  delete this._layers[L.Util.stamp(a)];
  this._map && this._map.removeLayer(a);
  return this
}, clearLayers:function() {
  this._iterateLayers(this.removeLayer, this);
  return this
}, onAdd:function(a) {
  this._map = a;
  this._iterateLayers(a.addLayer, a)
}, onRemove:function(a) {
  this._iterateLayers(a.removeLayer, a);
  delete this._map
}, _iterateLayers:function(a, b) {
  for(var c in this._layers) {
    this._layers.hasOwnProperty(c) && a.call(b, this._layers[c])
  }
}});
L.FeatureGroup = L.LayerGroup.extend({includes:L.Mixin.Events, addLayer:function(a) {
  this._initEvents(a);
  L.LayerGroup.prototype.addLayer.call(this, a);
  this._popupContent && a.bindPopup && a.bindPopup(this._popupContent)
}, bindPopup:function(a) {
  this._popupContent = a;
  for(var b in this._layers) {
    this._layers.hasOwnProperty(b) && this._layers[b].bindPopup && this._layers[b].bindPopup(a)
  }
}, _events:["click", "dblclick", "mouseover", "mouseout"], _initEvents:function(a) {
  for(var b = 0, c = this._events.length;b < c;b++) {
    a.on(this._events[b], this._propagateEvent, this)
  }
}, _propagateEvent:function(a) {
  a.layer = a.target;
  a.target = this;
  this.fire(a.type, a)
}});
L.TileLayer = L.Class.extend({includes:L.Mixin.Events, options:{minZoom:0, maxZoom:18, tileSize:256, subdomains:"abc", errorTileUrl:"", attribution:"", opacity:1, scheme:"xyz", continuousWorld:!1, noWrap:!1, unloadInvisibleTiles:L.Browser.mobile, updateWhenIdle:L.Browser.mobile}, initialize:function(a, b) {
  L.Util.setOptions(this, b);
  this._url = a;
  "string" == typeof this.options.subdomains && (this.options.subdomains = this.options.subdomains.split(""))
}, onAdd:function(a, b) {
  this._map = a;
  this._insertAtTheBottom = b;
  this._initContainer();
  this._createTileProto();
  a.on("viewreset", function(a) {
    this._reset(a.hard)
  }, this);
  if(this.options.updateWhenIdle) {
    a.on("moveend", this._update, this)
  }else {
    this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this), a.on("move", this._limitedUpdate, this)
  }
  this._reset();
  this._update()
}, onRemove:function() {
  this._map.getPanes().tilePane.removeChild(this._container);
  this._container = null;
  this._map.off("viewreset", this._reset, this);
  this.options.updateWhenIdle ? this._map.off("moveend", this._update, this) : this._map.off("move", this._limitedUpdate, this)
}, getAttribution:function() {
  return this.options.attribution
}, setOpacity:function(a) {
  this.options.opacity = a;
  this._setOpacity(a);
  if(L.Browser.webkit) {
    for(i in this._tiles) {
      this._tiles[i].style.webkitTransform += " translate(0,0)"
    }
  }
}, _setOpacity:function(a) {
  1 > a && L.DomUtil.setOpacity(this._container, a)
}, _initContainer:function() {
  var a = this._map.getPanes().tilePane, b = a.firstChild;
  if(!this._container || a.empty) {
    this._container = L.DomUtil.create("div", "leaflet-layer"), this._insertAtTheBottom && b ? a.insertBefore(this._container, b) : a.appendChild(this._container), this._setOpacity(this.options.opacity)
  }
}, _reset:function(a) {
  this._tiles = {};
  a && this._container && (this._container.innerHTML = "");
  this._initContainer();
  this._container.innerHTML = ""
}, _update:function() {
  var a = this._map.getPixelBounds(), b = this.options.tileSize, c = new L.Point(Math.floor(a.min.x / b), Math.floor(a.min.y / b)), a = new L.Point(Math.floor(a.max.x / b), Math.floor(a.max.y / b)), c = new L.Bounds(c, a);
  this._addTilesFromCenterOut(c);
  this.options.unloadInvisibleTiles && this._removeOtherTiles(c)
}, _addTilesFromCenterOut:function(a) {
  for(var b = [], c = a.getCenter(), d = a.min.y;d <= a.max.y;d++) {
    for(var e = a.min.x;e <= a.max.x;e++) {
      e + ":" + d in this._tiles || b.push(new L.Point(e, d))
    }
  }
  b.sort(function(a, b) {
    return a.distanceTo(c) - b.distanceTo(c)
  });
  a = document.createDocumentFragment();
  this._tilesToLoad = b.length;
  d = 0;
  for(e = this._tilesToLoad;d < e;d++) {
    this._addTile(b[d], a)
  }
  this._container.appendChild(a)
}, _removeOtherTiles:function(a) {
  var b, c, d;
  for(d in this._tiles) {
    if(this._tiles.hasOwnProperty(d) && (b = d.split(":"), c = parseInt(b[0], 10), b = parseInt(b[1], 10), c < a.min.x || c > a.max.x || b < a.min.y || b > a.max.y)) {
      this._tiles[d].parentNode == this._container && this._container.removeChild(this._tiles[d]), delete this._tiles[d]
    }
  }
}, _addTile:function(a, b) {
  var c = this._getTilePos(a), d = this._map.getZoom(), e = a.x + ":" + a.y, f = 1 << d;
  if(!this.options.continuousWorld) {
    if(this.options.noWrap) {
      if(0 > a.x || a.x >= f) {
        this._tilesToLoad--;
        return
      }
    }else {
      a.x = (a.x % f + f) % f
    }
    if(0 > a.y || a.y >= f) {
      this._tilesToLoad--;
      return
    }
  }
  var g = this._createTile();
  L.DomUtil.setPosition(g, c);
  this._tiles[e] = g;
  "tms" == this.options.scheme && (a.y = f - a.y - 1);
  this._loadTile(g, a, d);
  b.appendChild(g)
}, _getTilePos:function(a) {
  var b = this._map.getPixelOrigin();
  return a.multiplyBy(this.options.tileSize).subtract(b)
}, getTileUrl:function(a, b) {
  return this._url.replace("{s}", this.options.subdomains[(a.x + a.y) % this.options.subdomains.length]).replace("{z}", b).replace("{x}", a.x).replace("{y}", a.y)
}, _createTileProto:function() {
  this._tileImg = L.DomUtil.create("img", "leaflet-tile");
  this._tileImg.galleryimg = "no";
  var a = this.options.tileSize;
  this._tileImg.style.width = a + "px";
  this._tileImg.style.height = a + "px"
}, _createTile:function() {
  var a = this._tileImg.cloneNode(!1);
  a.onselectstart = a.onmousemove = L.Util.falseFn;
  return a
}, _loadTile:function(a, b, c) {
  a._layer = this;
  a.onload = this._tileOnLoad;
  a.onerror = this._tileOnError;
  a.src = this.getTileUrl(b, c)
}, _tileOnLoad:function() {
  var a = this._layer;
  this.className += " leaflet-tile-loaded";
  a.fire("tileload", {tile:this, url:this.src});
  a._tilesToLoad--;
  a._tilesToLoad || a.fire("load")
}, _tileOnError:function() {
  var a = this._layer;
  a.fire("tileerror", {tile:this, url:this.src});
  if(a = a.options.errorTileUrl) {
    this.src = a
  }
}});
L.TileLayer.WMS = L.TileLayer.extend({defaultWmsParams:{service:"WMS", request:"GetMap", version:"1.1.1", layers:"", styles:"", format:"image/jpeg", transparent:!1}, initialize:function(a, b) {
  this._url = a;
  this.wmsParams = L.Util.extend({}, this.defaultWmsParams);
  this.wmsParams.width = this.wmsParams.height = this.options.tileSize;
  for(var c in b) {
    this.options.hasOwnProperty(c) || (this.wmsParams[c] = b[c])
  }
  L.Util.setOptions(this, b)
}, onAdd:function(a) {
  this.wmsParams[1.3 <= parseFloat(this.wmsParams.version) ? "crs" : "srs"] = a.options.crs.code;
  L.TileLayer.prototype.onAdd.call(this, a)
}, getTileUrl:function(a) {
  var b = this.options.tileSize, a = a.multiplyBy(b), b = a.add(new L.Point(b, b)), a = this._map.unproject(a, this._zoom, !0), b = this._map.unproject(b, this._zoom, !0), a = this._map.options.crs.project(a), b = this._map.options.crs.project(b), b = [a.x, b.y, b.x, a.y].join();
  return this._url + L.Util.getParamString(this.wmsParams) + "&bbox=" + b
}});
L.TileLayer.Canvas = L.TileLayer.extend({options:{async:!1}, initialize:function(a) {
  L.Util.setOptions(this, a)
}, _createTileProto:function() {
  this._canvasProto = L.DomUtil.create("canvas", "leaflet-tile");
  var a = this.options.tileSize;
  this._canvasProto.width = a;
  this._canvasProto.height = a
}, _createTile:function() {
  var a = this._canvasProto.cloneNode(!1);
  a.onselectstart = a.onmousemove = L.Util.falseFn;
  return a
}, _loadTile:function(a, b, c) {
  a._layer = this;
  this.drawTile(a, b, c);
  this.options.async || this.tileDrawn(a)
}, drawTile:function() {
}, tileDrawn:function(a) {
  this._tileOnLoad.call(a)
}});
L.ImageOverlay = L.Class.extend({includes:L.Mixin.Events, initialize:function(a, b) {
  this._url = a;
  this._bounds = b
}, onAdd:function(a) {
  this._map = a;
  this._image || this._initImage();
  a.getPanes().overlayPane.appendChild(this._image);
  a.on("viewreset", this._reset, this);
  this._reset()
}, onRemove:function(a) {
  a.getPanes().overlayPane.removeChild(this._image);
  a.off("viewreset", this._reset, this)
}, _initImage:function() {
  this._image = L.DomUtil.create("img", "leaflet-image-layer");
  this._image.style.visibility = "hidden";
  L.Util.extend(this._image, {galleryimg:"no", onselectstart:L.Util.falseFn, onmousemove:L.Util.falseFn, onload:this._onImageLoad, src:this._url})
}, _reset:function() {
  var a = this._map.latLngToLayerPoint(this._bounds.getNorthWest()), b = this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(a);
  L.DomUtil.setPosition(this._image, a);
  this._image.style.width = b.x + "px";
  this._image.style.height = b.y + "px"
}, _onImageLoad:function() {
  this.style.visibility = ""
}});
L.Popup = L.Class.extend({includes:L.Mixin.Events, options:{minWidth:50, maxWidth:300, autoPan:!0, closeButton:!0, offset:new L.Point(0, 2), autoPanPadding:new L.Point(5, 5)}, initialize:function(a) {
  L.Util.setOptions(this, a)
}, onAdd:function(a) {
  this._map = a;
  this._container || this._initLayout();
  this._updateContent();
  this._container.style.opacity = "0";
  this._map._panes.popupPane.appendChild(this._container);
  this._map.on("viewreset", this._updatePosition, this);
  if(this._map.options.closePopupOnClick) {
    this._map.on("preclick", this._close, this)
  }
  this._update();
  this._container.style.opacity = "1";
  this._opened = !0
}, onRemove:function(a) {
  a._panes.popupPane.removeChild(this._container);
  a.off("viewreset", this._updatePosition, this);
  a.off("click", this._close, this);
  this._container.style.opacity = "0";
  this._opened = !1
}, setLatLng:function(a) {
  this._latlng = a;
  this._opened && this._update();
  return this
}, setContent:function(a) {
  this._content = a;
  this._opened && this._update();
  return this
}, _close:function() {
  this._opened && this._map.removeLayer(this)
}, _initLayout:function() {
  this._container = L.DomUtil.create("div", "leaflet-popup");
  this.options.closeButton && (this._closeButton = L.DomUtil.create("a", "leaflet-popup-close-button", this._container), this._closeButton.href = "#close", L.DomEvent.addListener(this._closeButton, "click", this._onCloseButtonClick, this));
  this._wrapper = L.DomUtil.create("div", "leaflet-popup-content-wrapper", this._container);
  L.DomEvent.disableClickPropagation(this._wrapper);
  this._contentNode = L.DomUtil.create("div", "leaflet-popup-content", this._wrapper);
  this._tipContainer = L.DomUtil.create("div", "leaflet-popup-tip-container", this._container);
  this._tip = L.DomUtil.create("div", "leaflet-popup-tip", this._tipContainer)
}, _update:function() {
  this._container.style.visibility = "hidden";
  this._updateContent();
  this._updateLayout();
  this._updatePosition();
  this._container.style.visibility = "";
  this._adjustPan()
}, _updateContent:function() {
  this._content && ("string" == typeof this._content ? this._contentNode.innerHTML = this._content : (this._contentNode.innerHTML = "", this._contentNode.appendChild(this._content)))
}, _updateLayout:function() {
  this._container.style.width = "";
  this._container.style.whiteSpace = "nowrap";
  var a = this._container.offsetWidth;
  this._container.style.width = (a > this.options.maxWidth ? this.options.maxWidth : a < this.options.minWidth ? this.options.minWidth : a) + "px";
  this._container.style.whiteSpace = "";
  this._containerWidth = this._container.offsetWidth
}, _updatePosition:function() {
  var a = this._map.latLngToLayerPoint(this._latlng);
  this._containerBottom = -a.y - this.options.offset.y;
  this._containerLeft = a.x - Math.round(this._containerWidth / 2) + this.options.offset.x;
  this._container.style.bottom = this._containerBottom + "px";
  this._container.style.left = this._containerLeft + "px"
}, _adjustPan:function() {
  if(this.options.autoPan) {
    var a = this._container.offsetHeight, b = this._map.layerPointToContainerPoint(new L.Point(this._containerLeft, -a - this._containerBottom)), c = new L.Point(0, 0), d = this.options.autoPanPadding, e = this._map.getSize();
    0 > b.x && (c.x = b.x - d.x);
    b.x + this._containerWidth > e.x && (c.x = b.x + this._containerWidth - e.x + d.x);
    0 > b.y && (c.y = b.y - d.y);
    b.y + a > e.y && (c.y = b.y + a - e.y + d.y);
    (c.x || c.y) && this._map.panBy(c)
  }
}, _onCloseButtonClick:function(a) {
  this._close();
  L.DomEvent.stop(a)
}});
L.Icon = L.Class.extend({iconUrl:L.ROOT_URL + "images/marker.png", shadowUrl:L.ROOT_URL + "images/marker-shadow.png", iconSize:new L.Point(25, 41), shadowSize:new L.Point(41, 41), iconAnchor:new L.Point(13, 41), popupAnchor:new L.Point(0, -33), initialize:function(a) {
  a && (this.iconUrl = a)
}, createIcon:function() {
  return this._createIcon("icon")
}, createShadow:function() {
  return this._createIcon("shadow")
}, _createIcon:function(a) {
  var b = this[a + "Size"], c = this[a + "Url"], d = this._createImg(c);
  if(!c) {
    return null
  }
  d.className = "leaflet-marker-" + a;
  d.style.marginLeft = -this.iconAnchor.x + "px";
  d.style.marginTop = -this.iconAnchor.y + "px";
  b && (d.style.width = b.x + "px", d.style.height = b.y + "px");
  return d
}, _createImg:function(a) {
  var b;
  L.Browser.ie6 ? (b = document.createElement("div"), b.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '")') : (b = document.createElement("img"), b.src = a);
  return b
}});
L.Marker = L.Class.extend({includes:L.Mixin.Events, options:{icon:new L.Icon, title:"", clickable:!0, draggable:!1}, initialize:function(a, b) {
  L.Util.setOptions(this, b);
  this._latlng = a
}, onAdd:function(a) {
  this._map = a;
  this._initIcon();
  a.on("viewreset", this._reset, this);
  this._reset()
}, onRemove:function(a) {
  this._removeIcon();
  this.closePopup && this.closePopup();
  a.off("viewreset", this._reset, this)
}, getLatLng:function() {
  return this._latlng
}, setLatLng:function(a) {
  this._latlng = a;
  this._icon && this._reset()
}, setIcon:function(a) {
  this._removeIcon();
  this._icon = this._shadow = null;
  this.options.icon = a;
  this._initIcon();
  this._reset()
}, _initIcon:function() {
  this._icon || (this._icon = this.options.icon.createIcon(), this.options.title && (this._icon.title = this.options.title), this._initInteraction());
  this._shadow || (this._shadow = this.options.icon.createShadow());
  this._map._panes.markerPane.appendChild(this._icon);
  this._shadow && this._map._panes.shadowPane.appendChild(this._shadow)
}, _removeIcon:function() {
  this._map._panes.markerPane.removeChild(this._icon);
  this._shadow && this._map._panes.shadowPane.removeChild(this._shadow)
}, _reset:function() {
  var a = this._map.latLngToLayerPoint(this._latlng).round();
  L.DomUtil.setPosition(this._icon, a);
  this._shadow && L.DomUtil.setPosition(this._shadow, a);
  this._icon.style.zIndex = a.y
}, _initInteraction:function() {
  if(this.options.clickable) {
    this._icon.className += " leaflet-clickable";
    L.DomEvent.addListener(this._icon, "click", this._onMouseClick, this);
    for(var a = ["dblclick", "mousedown", "mouseover", "mouseout"], b = 0;b < a.length;b++) {
      L.DomEvent.addListener(this._icon, a[b], this._fireMouseEvent, this)
    }
  }
  L.Handler.MarkerDrag && (this.dragging = new L.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
}, _onMouseClick:function(a) {
  L.DomEvent.stopPropagation(a);
  (!this.dragging || !this.dragging.moved()) && this.fire(a.type)
}, _fireMouseEvent:function(a) {
  this.fire(a.type);
  L.DomEvent.stopPropagation(a)
}});
L.Marker.include({openPopup:function() {
  this._popup.setLatLng(this._latlng);
  this._map.openPopup(this._popup);
  return this
}, closePopup:function() {
  this._popup && this._popup._close()
}, bindPopup:function(a, b) {
  b = L.Util.extend({offset:this.options.icon.popupAnchor}, b);
  this._popup = new L.Popup(b);
  this._popup.setContent(a);
  this.on("click", this.openPopup, this);
  return this
}});
L.Path = L.Class.extend({includes:[L.Mixin.Events], statics:{CLIP_PADDING:0.5}, options:{stroke:!0, color:"#0033ff", weight:5, opacity:0.5, fill:!1, fillColor:null, fillOpacity:0.2, clickable:!0, updateOnMoveEnd:!0}, initialize:function(a) {
  L.Util.setOptions(this, a)
}, onAdd:function(a) {
  this._map = a;
  this._initElements();
  this._initEvents();
  this.projectLatlngs();
  this._updatePath();
  a.on("viewreset", this.projectLatlngs, this);
  this._updateTrigger = this.options.updateOnMoveEnd ? "moveend" : "viewreset";
  a.on(this._updateTrigger, this._updatePath, this)
}, onRemove:function(a) {
  a._pathRoot.removeChild(this._container);
  a.off("viewreset", this._projectLatlngs, this);
  a.off(this._updateTrigger, this._updatePath, this)
}, projectLatlngs:function() {
}, setStyle:function(a) {
  L.Util.setOptions(this, a);
  this._container && this._updateStyle();
  return this
}, _initElements:function() {
  this._initRoot();
  this._initPath();
  this._initStyle()
}, _updateViewport:function() {
  var a = L.Path.CLIP_PADDING, b = this._map.getSize(), c = L.DomUtil.getPosition(this._map._mapPane).multiplyBy(-1).subtract(b.multiplyBy(a)), a = c.add(b.multiplyBy(1 + 2 * a));
  this._map._pathViewport = new L.Bounds(c, a)
}, _redraw:function() {
  this.projectLatlngs();
  this._updatePath()
}});
L.Path.include({bindPopup:function(a, b) {
  if(!this._popup || this._popup.options !== b) {
    this._popup = new L.Popup(b)
  }
  this._popup.setContent(a);
  this._openPopupAdded || (this.on("click", this._openPopup, this), this._openPopupAdded = !0);
  return this
}, _openPopup:function(a) {
  this._popup.setLatLng(a.latlng);
  this._map.openPopup(this._popup)
}});
L.Path.SVG_NS = "http://www.w3.org/2000/svg";
L.Browser.svg = !(!document.createElementNS || !document.createElementNS(L.Path.SVG_NS, "svg").createSVGRect);
L.Path = L.Path.extend({statics:{SVG:L.Browser.svg}, getPathString:function() {
}, _initElements:function() {
  this._initRoot();
  this._initPath();
  this._initStyle()
}, _initRoot:function() {
  this._map._pathRoot || (this._map._pathRoot = this._createElement("svg"), this._map._panes.overlayPane.appendChild(this._map._pathRoot), this._map.on("moveend", this._updateSvgViewport, this), this._updateSvgViewport())
}, _updateSvgViewport:function() {
  this._updateViewport();
  var a = this._map._pathViewport, b = a.min, c = a.max, a = c.x - b.x, c = c.y - b.y, d = this._map._pathRoot, e = this._map._panes.overlayPane;
  L.Browser.mobileWebkit && e.removeChild(d);
  L.DomUtil.setPosition(d, b);
  d.setAttribute("width", a);
  d.setAttribute("height", c);
  d.setAttribute("viewBox", [b.x, b.y, a, c].join(" "));
  L.Browser.mobileWebkit && e.appendChild(d)
}, _initPath:function() {
  this._container = this._createElement("g");
  this._path = this._createElement("path");
  this._container.appendChild(this._path);
  this._map._pathRoot.appendChild(this._container)
}, _initStyle:function() {
  this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round"));
  this.options.fill ? this._path.setAttribute("fill-rule", "evenodd") : this._path.setAttribute("fill", "none");
  this._updateStyle()
}, _updateStyle:function() {
  this.options.stroke && (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight));
  this.options.fill && (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity))
}, _updatePath:function() {
  var a = this.getPathString();
  a || (a = "M0 0");
  this._path.setAttribute("d", a)
}, _createElement:function(a) {
  return document.createElementNS(L.Path.SVG_NS, a)
}, _initEvents:function() {
  if(this.options.clickable) {
    L.Browser.vml || this._path.setAttribute("class", "leaflet-clickable");
    L.DomEvent.addListener(this._container, "click", this._onMouseClick, this);
    for(var a = ["dblclick", "mousedown", "mouseover", "mouseout"], b = 0;b < a.length;b++) {
      L.DomEvent.addListener(this._container, a[b], this._fireMouseEvent, this)
    }
  }
}, _onMouseClick:function(a) {
  (!this._map.dragging || !this._map.dragging.moved()) && this._fireMouseEvent(a)
}, _fireMouseEvent:function(a) {
  this.hasEventListeners(a.type) && (this.fire(a.type, {latlng:this._map.mouseEventToLatLng(a), layerPoint:this._map.mouseEventToLayerPoint(a)}), L.DomEvent.stopPropagation(a))
}});
L.Browser.vml = function() {
  var a = document.createElement("div");
  a.innerHTML = '<v:shape adj="1"/>';
  a = a.firstChild;
  a.style.behavior = "url(#default#VML)";
  return a && "object" == typeof a.adj
}();
L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({statics:{VML:!0, CLIP_PADDING:0.02}, _createElement:function() {
  try {
    return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(a) {
      return document.createElement("<lvml:" + a + ' class="lvml">')
    }
  }catch(a) {
    return function(a) {
      return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
    }
  }
}(), _initRoot:function() {
  this._map._pathRoot || (this._map._pathRoot = document.createElement("div"), this._map._pathRoot.className = "leaflet-vml-container", this._map._panes.overlayPane.appendChild(this._map._pathRoot), this._map.on("moveend", this._updateViewport, this), this._updateViewport())
}, _initPath:function() {
  this._container = this._createElement("shape");
  this._container.className += " leaflet-vml-shape" + (this.options.clickable ? " leaflet-clickable" : "");
  this._container.coordsize = "1 1";
  this._path = this._createElement("path");
  this._container.appendChild(this._path);
  this._map._pathRoot.appendChild(this._container)
}, _initStyle:function() {
  this.options.stroke ? (this._stroke = this._createElement("stroke"), this._stroke.endcap = "round", this._container.appendChild(this._stroke)) : this._container.stroked = !1;
  this.options.fill ? (this._container.filled = !0, this._fill = this._createElement("fill"), this._container.appendChild(this._fill)) : this._container.filled = !1;
  this._updateStyle()
}, _updateStyle:function() {
  this.options.stroke && (this._stroke.weight = this.options.weight + "px", this._stroke.color = this.options.color, this._stroke.opacity = this.options.opacity);
  this.options.fill && (this._fill.color = this.options.fillColor || this.options.color, this._fill.opacity = this.options.fillOpacity)
}, _updatePath:function() {
  this._container.style.display = "none";
  this._path.v = this.getPathString() + " ";
  this._container.style.display = ""
}});
L.Browser.canvas = function() {
  return!!document.createElement("canvas").getContext
}();
L.Path = L.Path.SVG && !window.L_PREFER_CANVAS || !L.Browser.canvas ? L.Path : L.Path.extend({statics:{CANVAS:!0, SVG:!1}, options:{updateOnMoveEnd:!0}, _initElements:function() {
  this._initRoot()
}, _initRoot:function() {
  var a = this._map._pathRoot, b = this._map._canvasCtx;
  a || (a = this._map._pathRoot = document.createElement("canvas"), a.style.position = "absolute", b = this._map._canvasCtx = a.getContext("2d"), b.lineCap = "round", b.lineJoin = "round", this._map._panes.overlayPane.appendChild(a), this._map.on("moveend", this._updateCanvasViewport, this), this._updateCanvasViewport());
  this._ctx = b
}, _updateStyle:function() {
  this.options.stroke && (this._ctx.lineWidth = this.options.weight, this._ctx.strokeStyle = this.options.color);
  this.options.fill && (this._ctx.fillStyle = this.options.fillColor || this.options.color)
}, _drawPath:function() {
  var a, b, c, d, e, f;
  this._ctx.beginPath();
  a = 0;
  for(c = this._parts.length;a < c;a++) {
    b = 0;
    for(d = this._parts[a].length;b < d;b++) {
      e = this._parts[a][b], f = (0 === b ? "move" : "line") + "To", this._ctx[f](e.x, e.y)
    }
    this instanceof L.Polygon && this._ctx.closePath()
  }
}, _checkIfEmpty:function() {
  return!this._parts.length
}, _updatePath:function() {
  if(!this._checkIfEmpty()) {
    this._drawPath();
    this._ctx.save();
    this._updateStyle();
    var a = this.options.opacity, b = this.options.fillOpacity;
    this.options.fill && (1 > b && (this._ctx.globalAlpha = b), this._ctx.fill());
    this.options.stroke && (1 > a && (this._ctx.globalAlpha = a), this._ctx.stroke());
    this._ctx.restore()
  }
}, _updateCanvasViewport:function() {
  this._updateViewport();
  var a = this._map._pathViewport, b = a.min, a = a.max.subtract(b), c = this._map._pathRoot;
  L.DomUtil.setPosition(c, b);
  c.width = a.x;
  c.height = a.y;
  c.getContext("2d").translate(-b.x, -b.y)
}, _initEvents:function() {
  if(this.options.clickable) {
    this._map.on("click", this._onClick, this)
  }
}, _onClick:function(a) {
  this._containsPoint(a.layerPoint) && this.fire("click", a)
}, onRemove:function(a) {
  a.off("viewreset", this._projectLatlngs, this);
  a.off(this._updateTrigger, this._updatePath, this);
  a.fire(this._updateTrigger)
}});
L.Polyline = L.Path.extend({initialize:function(a, b) {
  L.Path.prototype.initialize.call(this, b);
  this._latlngs = a
}, options:{smoothFactor:1, noClip:!1, updateOnMoveEnd:!0}, projectLatlngs:function() {
  this._originalPoints = [];
  for(var a = 0, b = this._latlngs.length;a < b;a++) {
    this._originalPoints[a] = this._map.latLngToLayerPoint(this._latlngs[a])
  }
}, getPathString:function() {
  for(var a = 0, b = this._parts.length, c = "";a < b;a++) {
    c += this._getPathPartStr(this._parts[a])
  }
  return c
}, getLatLngs:function() {
  return this._latlngs
}, setLatLngs:function(a) {
  this._latlngs = a;
  this._redraw();
  return this
}, addLatLng:function(a) {
  this._latlngs.push(a);
  this._redraw();
  return this
}, spliceLatLngs:function() {
  var a = [].splice.apply(this._latlngs, arguments);
  this._redraw();
  return a
}, closestLayerPoint:function(a) {
  for(var b = Infinity, c = this._parts, d, e, f = null, g = 0, h = c.length;g < h;g++) {
    for(var j = c[g], m = 1, l = j.length;m < l;m++) {
      if(d = j[m - 1], e = j[m], d = L.LineUtil._sqClosestPointOnSegment(a, d, e), d._sqDist < b) {
        b = d._sqDist, f = d
      }
    }
  }
  f && (f.distance = Math.sqrt(b));
  return f
}, _getPathPartStr:function(a) {
  for(var b = L.Path.VML, c = 0, d = a.length, e = "", f;c < d;c++) {
    f = a[c], b && f._round(), e += (c ? "L" : "M") + f.x + " " + f.y
  }
  return e
}, _clipPoints:function() {
  var a = this._originalPoints, b = a.length, c, d, e;
  if(this.options.noClip) {
    this._parts = [a]
  }else {
    var f = this._parts = [], g = this._map._pathViewport, h = L.LineUtil;
    for(d = c = 0;c < b - 1;c++) {
      if(e = h.clipSegment(a[c], a[c + 1], g, c)) {
        if(f[d] = f[d] || [], f[d].push(e[0]), e[1] != a[c + 1] || c == b - 2) {
          f[d].push(e[1]), d++
        }
      }
    }
  }
}, _simplifyPoints:function() {
  for(var a = this._parts, b = L.LineUtil, c = 0, d = a.length;c < d;c++) {
    a[c] = b.simplify(a[c], this.options.smoothFactor)
  }
}, _updatePath:function() {
  this._clipPoints();
  this._simplifyPoints();
  L.Path.prototype._updatePath.call(this)
}});
L.Polyline.include(!L.Path.CANVAS ? {} : {_containsPoint:function(a, b) {
  var c, d, e, f, g, h, j = this.options.weight / 2;
  L.Browser.touch && (j += 10);
  c = 0;
  for(f = this._parts.length;c < f;c++) {
    h = this._parts[c];
    d = 0;
    g = h.length;
    for(e = g - 1;d < g;e = d++) {
      if(b || 0 !== d) {
        if(e = L.LineUtil.pointToSegmentDistance(a, h[e], h[d]), e <= j) {
          return!0
        }
      }
    }
  }
  return!1
}});
L.Polygon = L.Polyline.extend({options:{fill:!0}, initialize:function(a, b) {
  L.Polyline.prototype.initialize.call(this, a, b);
  a[0] instanceof Array && (this._latlngs = a[0], this._holes = a.slice(1))
}, projectLatlngs:function() {
  L.Polyline.prototype.projectLatlngs.call(this);
  this._holePoints = [];
  if(this._holes) {
    for(var a = 0, b = this._holes.length;a < b;a++) {
      this._holePoints[a] = [];
      for(var c = 0, d = this._holes[a].length;c < d;c++) {
        this._holePoints[a][c] = this._map.latLngToLayerPoint(this._holes[a][c])
      }
    }
  }
}, _clipPoints:function() {
  var a = [];
  this._parts = [this._originalPoints].concat(this._holePoints);
  if(!this.options.noClip) {
    for(var b = 0, c = this._parts.length;b < c;b++) {
      var d = L.PolyUtil.clipPolygon(this._parts[b], this._map._pathViewport);
      d.length && a.push(d)
    }
    this._parts = a
  }
}, _getPathPartStr:function(a) {
  return L.Polyline.prototype._getPathPartStr.call(this, a) + (L.Browser.svg ? "z" : "x")
}});
L.Polygon.include(!L.Path.CANVAS ? {} : {_containsPoint:function(a) {
  var b = !1, c, d, e, f, g, h, j;
  if(L.Polyline.prototype._containsPoint.call(this, a, !0)) {
    return!0
  }
  f = 0;
  for(h = this._parts.length;f < h;f++) {
    c = this._parts[f];
    g = 0;
    j = c.length;
    for(e = j - 1;g < j;e = g++) {
      d = c[g], e = c[e], d.y > a.y != e.y > a.y && a.x < (e.x - d.x) * (a.y - d.y) / (e.y - d.y) + d.x && (b = !b)
    }
  }
  return b
}});
(function() {
  function a(a) {
    return L.FeatureGroup.extend({initialize:function(a, b) {
      this._layers = {};
      this._options = b;
      this.setLatLngs(a)
    }, setStyle:function(a) {
      for(var b in this._layers) {
        this._layers.hasOwnProperty(b) && this._layers[b].setStyle && this._layers[b].setStyle(a)
      }
    }, setLatLngs:function(c) {
      var d = 0, e = c.length;
      for(this._iterateLayers(function(a) {
        d < e ? a.setLatLngs(c[d++]) : this.removeLayer(a)
      }, this);d < e;) {
        this.addLayer(new a(c[d++], this._options))
      }
    }})
  }
  L.MultiPolyline = a(L.Polyline);
  L.MultiPolygon = a(L.Polygon)
})();
L.Circle = L.Path.extend({initialize:function(a, b, c) {
  L.Path.prototype.initialize.call(this, c);
  this._latlng = a;
  this._mRadius = b
}, options:{fill:!0}, setLatLng:function(a) {
  this._latlng = a;
  this._redraw();
  return this
}, setRadius:function(a) {
  this._mRadius = a;
  this._redraw();
  return this
}, projectLatlngs:function() {
  var a = this._map.options.scale(this._map._zoom);
  this._point = this._map.latLngToLayerPoint(this._latlng);
  this._radius = this._mRadius / 40075017 * a
}, getPathString:function() {
  var a = this._point, b = this._radius;
  return this._checkIfEmpty() ? "" : L.Browser.svg ? "M" + a.x + "," + (a.y - b) + "A" + b + "," + b + ",0,1,1," + (a.x - 0.1) + "," + (a.y - b) + " z" : (a._round(), b = Math.round(b), "AL " + a.x + "," + a.y + " " + b + "," + b + " 0,23592600")
}, _checkIfEmpty:function() {
  var a = this._map._pathViewport, b = this._radius, c = this._point;
  return c.x - b > a.max.x || c.y - b > a.max.y || c.x + b < a.min.x || c.y + b < a.min.y
}});
L.Circle.include(!L.Path.CANVAS ? {} : {_drawPath:function() {
  var a = this._point;
  this._ctx.beginPath();
  this._ctx.arc(a.x, a.y, this._radius, 0, 2 * Math.PI)
}, _containsPoint:function(a) {
  var b = this.options.stroke ? this.options.weight / 2 : 0;
  return a.distanceTo(this._point) <= this._radius + b
}});
L.CircleMarker = L.Circle.extend({options:{radius:10, weight:2}, initialize:function(a, b) {
  L.Circle.prototype.initialize.call(this, a, null, b);
  this._radius = this.options.radius
}, projectLatlngs:function() {
  this._point = this._map.latLngToLayerPoint(this._latlng)
}, setRadius:function(a) {
  this._radius = a;
  this._redraw();
  return this
}});
L.GeoJSON = L.LayerGroup.extend({includes:L.Mixin.Events, initialize:function(a, b) {
  L.Util.setOptions(this, b);
  this._geojson = a;
  this._layers = {};
  a && this.addGeoJSON(a)
}, addGeoJSON:function(a) {
  if(a.features) {
    for(var b = 0, c = a.features.length;b < c;b++) {
      this.addGeoJSON(a.features[b])
    }
  }else {
    b = "Feature" == a.type ? a.geometry : a, c = L.GeoJSON.geometryToLayer(b, this.options.pointToLayer), this.fire("featureparse", {layer:c, properties:a.properties, geometryType:b.type, bbox:a.bbox, id:a.id}), this.addLayer(c)
  }
}});
L.Util.extend(L.GeoJSON, {geometryToLayer:function(a, b) {
  var c = a.coordinates, d, e, f, g = [];
  switch(a.type) {
    case "Point":
      return d = this.coordsToLatLng(c), b ? b(d) : new L.Marker(d);
    case "MultiPoint":
      e = 0;
      for(f = c.length;e < f;e++) {
        d = this.coordsToLatLng(c[e]), d = b ? b(d) : new L.Marker(d), g.push(d)
      }
      return new L.FeatureGroup(g);
    case "LineString":
      return c = this.coordsToLatLngs(c), new L.Polyline(c);
    case "Polygon":
      return c = this.coordsToLatLngs(c, 1), new L.Polygon(c);
    case "MultiLineString":
      return c = this.coordsToLatLngs(c, 1), new L.MultiPolyline(c);
    case "MultiPolygon":
      return c = this.coordsToLatLngs(c, 2), new L.MultiPolygon(c);
    case "GeometryCollection":
      e = 0;
      for(f = a.geometries.length;e < f;e++) {
        d = this.geometryToLayer(a.geometries[e]), g.push(d)
      }
      return new L.FeatureGroup(g);
    default:
      throw Error("Invalid GeoJSON object.");
  }
}, coordsToLatLng:function(a, b) {
  var c = parseFloat(a[b ? 0 : 1]), d = parseFloat(a[b ? 1 : 0]);
  return new L.LatLng(c, d)
}, coordsToLatLngs:function(a, b, c) {
  var d, e = [], f, g = a.length;
  for(f = 0;f < g;f++) {
    d = b ? this.coordsToLatLngs(a[f], b - 1, c) : this.coordsToLatLng(a[f], c), e.push(d)
  }
  return e
}});
L.Handler = L.Class.extend({initialize:function(a) {
  this._map = a
}, enabled:function() {
  return!!this._enabled
}});
L.Handler.MapDrag = L.Handler.extend({enable:function() {
  this._enabled || (this._draggable || (this._draggable = new L.Draggable(this._map._mapPane, this._map._container), this._draggable.on("dragstart", this._onDragStart, this), this._draggable.on("drag", this._onDrag, this), this._draggable.on("dragend", this._onDragEnd, this)), this._draggable.enable(), this._enabled = !0)
}, disable:function() {
  this._enabled && (this._draggable.disable(), this._enabled = !1)
}, moved:function() {
  return this._draggable && this._draggable._moved
}, _onDragStart:function() {
  this._map.fire("movestart");
  this._map.fire("dragstart")
}, _onDrag:function() {
  this._map.fire("move");
  this._map.fire("drag")
}, _onDragEnd:function() {
  this._map.fire("moveend");
  this._map.fire("dragend")
}});
L.Handler.TouchZoom = L.Handler.extend({enable:function() {
  L.Browser.touch && !this._enabled && (L.DomEvent.addListener(this._map._container, "touchstart", this._onTouchStart, this), this._enabled = !0)
}, disable:function() {
  this._enabled && (L.DomEvent.removeListener(this._map._container, "touchstart", this._onTouchStart, this), this._enabled = !1)
}, _onTouchStart:function(a) {
  if(a.touches && !(2 != a.touches.length || this._map._animatingZoom)) {
    var b = this._map.mouseEventToLayerPoint(a.touches[0]), c = this._map.mouseEventToLayerPoint(a.touches[1]), d = this._map.containerPointToLayerPoint(this._map.getSize().divideBy(2));
    this._startCenter = b.add(c).divideBy(2, !0);
    this._startDist = b.distanceTo(c);
    this._moved = !1;
    this._zooming = !0;
    this._centerOffset = d.subtract(this._startCenter);
    L.DomEvent.addListener(document, "touchmove", this._onTouchMove, this);
    L.DomEvent.addListener(document, "touchend", this._onTouchEnd, this);
    L.DomEvent.preventDefault(a)
  }
}, _onTouchMove:function(a) {
  if(a.touches && 2 == a.touches.length) {
    this._moved || (this._map._mapPane.className += " leaflet-zoom-anim", this._map._prepareTileBg(), this._moved = !0);
    var b = this._map.mouseEventToLayerPoint(a.touches[0]), c = this._map.mouseEventToLayerPoint(a.touches[1]);
    this._scale = b.distanceTo(c) / this._startDist;
    this._delta = b.add(c).divideBy(2, !0).subtract(this._startCenter);
    this._map._tileBg.style.webkitTransform = [L.DomUtil.getTranslateString(this._delta), L.DomUtil.getScaleString(this._scale, this._startCenter)].join(" ");
    L.DomEvent.preventDefault(a)
  }
}, _onTouchEnd:function() {
  if(this._moved && this._zooming) {
    this._zooming = !1;
    var a = this._map.getZoom(), b = Math.log(this._scale) / Math.LN2, b = this._map._limitZoom(a + (0 < b ? Math.ceil(b) : Math.floor(b))), a = b - a, c = this._centerOffset.subtract(this._delta).divideBy(this._scale), d = this._map.unproject(this._map.getPixelOrigin().add(this._startCenter).add(c));
    L.DomEvent.removeListener(document, "touchmove", this._onTouchMove);
    L.DomEvent.removeListener(document, "touchend", this._onTouchEnd);
    this._map._runAnimation(d, b, Math.pow(2, a) / this._scale, this._startCenter.add(c))
  }
}});
L.Handler.ScrollWheelZoom = L.Handler.extend({enable:function() {
  this._enabled || (L.DomEvent.addListener(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0, this._enabled = !0)
}, disable:function() {
  this._enabled && (L.DomEvent.removeListener(this._map._container, "mousewheel", this._onWheelScroll), this._enabled = !1)
}, _onWheelScroll:function(a) {
  this._delta += L.DomEvent.getWheelDelta(a);
  this._lastMousePos = this._map.mouseEventToContainerPoint(a);
  clearTimeout(this._timer);
  this._timer = setTimeout(L.Util.bind(this._performZoom, this), 50);
  L.DomEvent.preventDefault(a)
}, _performZoom:function() {
  var a = Math.round(this._delta), a = Math.max(Math.min(a, 4), -4);
  this._delta = 0;
  if(a) {
    var b = this._getCenterForScrollWheelZoom(this._lastMousePos, a), a = this._map.getZoom() + a;
    this._map._limitZoom(a) != this._map._zoom && this._map.setView(b, a)
  }
}, _getCenterForScrollWheelZoom:function(a, b) {
  var c = this._map.getPixelBounds().getCenter(), d = this._map.getSize().divideBy(2), d = a.subtract(d).multiplyBy(1 - Math.pow(2, -b));
  return this._map.unproject(c.add(d), this._map._zoom, !0)
}});
L.Handler.DoubleClickZoom = L.Handler.extend({enable:function() {
  this._enabled || (this._map.on("dblclick", this._onDoubleClick, this._map), this._enabled = !0)
}, disable:function() {
  this._enabled && (this._map.off("dblclick", this._onDoubleClick, this._map), this._enabled = !1)
}, _onDoubleClick:function(a) {
  this.setView(a.latlng, this._zoom + 1)
}});
L.Handler.ShiftDragZoom = L.Handler.extend({initialize:function(a) {
  this._map = a;
  this._container = a._container;
  this._pane = a._panes.overlayPane
}, enable:function() {
  this._enabled || (L.DomEvent.addListener(this._container, "mousedown", this._onMouseDown, this), this._enabled = !0)
}, disable:function() {
  this._enabled && (L.DomEvent.removeListener(this._container, "mousedown", this._onMouseDown), this._enabled = !1)
}, _onMouseDown:function(a) {
  if(!a.shiftKey || 1 != a.which && 1 != a.button) {
    return!1
  }
  L.DomUtil.disableTextSelection();
  this._startLayerPoint = this._map.mouseEventToLayerPoint(a);
  this._box = L.DomUtil.create("div", "leaflet-zoom-box", this._pane);
  L.DomUtil.setPosition(this._box, this._startLayerPoint);
  this._container.style.cursor = "crosshair";
  L.DomEvent.addListener(document, "mousemove", this._onMouseMove, this);
  L.DomEvent.addListener(document, "mouseup", this._onMouseUp, this);
  L.DomEvent.preventDefault(a)
}, _onMouseMove:function(a) {
  var b = this._map.mouseEventToLayerPoint(a), a = b.x - this._startLayerPoint.x, c = b.y - this._startLayerPoint.y, b = new L.Point(Math.min(b.x, this._startLayerPoint.x), Math.min(b.y, this._startLayerPoint.y));
  L.DomUtil.setPosition(this._box, b);
  this._box.style.width = Math.abs(a) - 4 + "px";
  this._box.style.height = Math.abs(c) - 4 + "px"
}, _onMouseUp:function(a) {
  this._pane.removeChild(this._box);
  this._container.style.cursor = "";
  L.DomUtil.enableTextSelection();
  L.DomEvent.removeListener(document, "mousemove", this._onMouseMove);
  L.DomEvent.removeListener(document, "mouseup", this._onMouseUp);
  a = this._map.mouseEventToLayerPoint(a);
  this._map.fitBounds(new L.LatLngBounds(this._map.layerPointToLatLng(this._startLayerPoint), this._map.layerPointToLatLng(a)))
}});
L.Handler.MarkerDrag = L.Handler.extend({initialize:function(a) {
  this._marker = a
}, enable:function() {
  this._enabled || (this._draggable || (this._draggable = new L.Draggable(this._marker._icon, this._marker._icon), this._draggable.on("dragstart", this._onDragStart, this), this._draggable.on("drag", this._onDrag, this), this._draggable.on("dragend", this._onDragEnd, this)), this._draggable.enable(), this._enabled = !0)
}, disable:function() {
  this._enabled && (this._draggable.disable(), this._enabled = !1)
}, moved:function() {
  return this._draggable && this._draggable._moved
}, _onDragStart:function() {
  this._marker.closePopup();
  this._marker.fire("movestart");
  this._marker.fire("dragstart")
}, _onDrag:function() {
  var a = L.DomUtil.getPosition(this._marker._icon);
  this._marker._shadow && L.DomUtil.setPosition(this._marker._shadow, a);
  this._marker._latlng = this._marker._map.layerPointToLatLng(a);
  this._marker.fire("move");
  this._marker.fire("drag")
}, _onDragEnd:function() {
  this._marker.fire("moveend");
  this._marker.fire("dragend")
}});
L.Control = {};
L.Control.Position = {TOP_LEFT:"topLeft", TOP_RIGHT:"topRight", BOTTOM_LEFT:"bottomLeft", BOTTOM_RIGHT:"bottomRight"};
L.Control.Zoom = L.Class.extend({onAdd:function(a) {
  this._map = a;
  this._container = L.DomUtil.create("div", "leaflet-control-zoom");
  this._zoomInButton = this._createButton("Zoom in", "leaflet-control-zoom-in", this._map.zoomIn, this._map);
  this._zoomOutButton = this._createButton("Zoom out", "leaflet-control-zoom-out", this._map.zoomOut, this._map);
  this._container.appendChild(this._zoomInButton);
  this._container.appendChild(this._zoomOutButton)
}, getContainer:function() {
  return this._container
}, getPosition:function() {
  return L.Control.Position.TOP_LEFT
}, _createButton:function(a, b, c, d) {
  var e = document.createElement("a");
  e.href = "#";
  e.title = a;
  e.className = b;
  L.DomEvent.disableClickPropagation(e);
  L.DomEvent.addListener(e, "click", L.DomEvent.preventDefault);
  L.DomEvent.addListener(e, "click", c, d);
  return e
}});
L.Control.Attribution = L.Class.extend({onAdd:function(a) {
  this._container = L.DomUtil.create("div", "leaflet-control-attribution");
  this._map = a;
  this._prefix = 'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>';
  this._attributions = {};
  this._update()
}, getPosition:function() {
  return L.Control.Position.BOTTOM_RIGHT
}, getContainer:function() {
  return this._container
}, setPrefix:function(a) {
  this._prefix = a;
  this._update()
}, addAttribution:function(a) {
  a && (this._attributions[a] = !0, this._update())
}, removeAttribution:function(a) {
  a && (delete this._attributions[a], this._update())
}, _update:function() {
  if(this._map) {
    var a = [], b;
    for(b in this._attributions) {
      this._attributions.hasOwnProperty(b) && a.push(b)
    }
    b = [];
    this._prefix && b.push(this._prefix);
    a.length && b.push(a.join(", "));
    this._container.innerHTML = b.join(" &mdash; ")
  }
}});
L.Control.Layers = L.Class.extend({options:{collapsed:!0}, initialize:function(a, b, c) {
  L.Util.setOptions(this, c);
  this._layers = {};
  for(var d in a) {
    a.hasOwnProperty(d) && this._addLayer(a[d], d)
  }
  for(d in b) {
    b.hasOwnProperty(d) && this._addLayer(b[d], d, !0)
  }
}, onAdd:function(a) {
  this._map = a;
  this._initLayout();
  this._update()
}, getContainer:function() {
  return this._container
}, getPosition:function() {
  return L.Control.Position.TOP_RIGHT
}, addBaseLayer:function(a, b) {
  this._addLayer(a, b);
  this._update();
  return this
}, addOverlay:function(a, b) {
  this._addLayer(a, b, !0);
  this._update();
  return this
}, removeLayer:function(a) {
  delete this._layers[L.Util.stamp(a)];
  this._update();
  return this
}, _initLayout:function() {
  this._container = L.DomUtil.create("div", "leaflet-control-layers");
  L.DomEvent.disableClickPropagation(this._container);
  this._form = L.DomUtil.create("form", "leaflet-control-layers-list");
  if(this.options.collapsed) {
    L.DomEvent.addListener(this._container, "mouseover", this._expand, this);
    L.DomEvent.addListener(this._container, "mouseout", this._collapse, this);
    var a = this._layersLink = L.DomUtil.create("a", "leaflet-control-layers-toggle");
    a.href = "#";
    a.title = "Layers";
    L.DomEvent.addListener(a, "focus", this._expand, this);
    L.DomEvent.addListener(this._map, L.Draggable.START, this._collapse, this);
    this._container.appendChild(a)
  }else {
    this._expand()
  }
  this._baseLayersList = L.DomUtil.create("div", "leaflet-control-layers-base", this._form);
  this._separator = L.DomUtil.create("div", "leaflet-control-layers-separator", this._form);
  this._overlaysList = L.DomUtil.create("div", "leaflet-control-layers-overlays", this._form);
  this._container.appendChild(this._form)
}, _addLayer:function(a, b, c) {
  this._layers[L.Util.stamp(a)] = {layer:a, name:b, overlay:c}
}, _update:function() {
  if(this._container) {
    this._baseLayersList.innerHTML = "";
    this._overlaysList.innerHTML = "";
    var a = !1, b = !1, c;
    for(c in this._layers) {
      if(this._layers.hasOwnProperty(c)) {
        var d = this._layers[c];
        this._addItem(d);
        b = b || d.overlay;
        a = a || !d.overlay
      }
    }
    this._separator.style.display = b && a ? "" : "none"
  }
}, _addItem:function(a) {
  var b = document.createElement("label"), c = document.createElement("input");
  a.overlay || (c.name = "leaflet-base-layers");
  c.type = a.overlay ? "checkbox" : "radio";
  c.checked = this._map.hasLayer(a.layer);
  c.layerId = L.Util.stamp(a.layer);
  L.DomEvent.addListener(c, "click", this._onInputClick, this);
  var d = document.createTextNode(" " + a.name);
  b.appendChild(c);
  b.appendChild(d);
  (a.overlay ? this._overlaysList : this._baseLayersList).appendChild(b)
}, _onInputClick:function() {
  var a, b, c, d = this._form.getElementsByTagName("input"), e = d.length;
  for(a = 0;a < e;a++) {
    b = d[a], c = this._layers[b.layerId], b.checked ? this._map.addLayer(c.layer, !c.overlay) : this._map.removeLayer(c.layer)
  }
}, _expand:function() {
  L.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
}, _collapse:function() {
  this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
}});
L.Map = L.Class.extend({includes:L.Mixin.Events, options:{crs:L.CRS.EPSG3857 || L.CRS.EPSG4326, scale:function(a) {
  return 256 * (1 << a)
}, center:null, zoom:null, layers:[], dragging:!0, touchZoom:L.Browser.touch && !L.Browser.android, scrollWheelZoom:!L.Browser.touch, doubleClickZoom:!0, shiftDragZoom:!0, zoomControl:!0, attributionControl:!0, fadeAnimation:L.DomUtil.TRANSITION && !L.Browser.android, zoomAnimation:L.DomUtil.TRANSITION && !L.Browser.android && !L.Browser.mobileOpera, trackResize:!0, closePopupOnClick:!0}, initialize:function(a, b) {
  L.Util.setOptions(this, b);
  this._container = L.DomUtil.get(a);
  this._initLayout();
  L.DomEvent && (this._initEvents(), L.Handler && this._initInteraction(), L.Control && this._initControls());
  var c = this.options.center, d = this.options.zoom;
  null !== c && null !== d && this.setView(c, d, !0);
  c = this.options.layers;
  c = c instanceof Array ? c : [c];
  this._tileLayersNum = 0;
  this._initLayers(c)
}, setView:function(a, b) {
  this._resetView(a, this._limitZoom(b));
  return this
}, setZoom:function(a) {
  return this.setView(this.getCenter(), a)
}, zoomIn:function() {
  return this.setZoom(this._zoom + 1)
}, zoomOut:function() {
  return this.setZoom(this._zoom - 1)
}, fitBounds:function(a) {
  var b = this.getBoundsZoom(a);
  return this.setView(a.getCenter(), b)
}, fitWorld:function() {
  var a = new L.LatLng(-60, -170), b = new L.LatLng(85, 179);
  return this.fitBounds(new L.LatLngBounds(a, b))
}, panTo:function(a) {
  return this.setView(a, this._zoom)
}, panBy:function(a) {
  this.fire("movestart");
  this._rawPanBy(a);
  this.fire("move");
  this.fire("moveend");
  return this
}, addLayer:function(a, b) {
  var c = L.Util.stamp(a);
  if(this._layers[c]) {
    return this
  }
  this._layers[c] = a;
  a.options && !isNaN(a.options.maxZoom) && (this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, a.options.maxZoom));
  a.options && !isNaN(a.options.minZoom) && (this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, a.options.minZoom));
  this.options.zoomAnimation && L.TileLayer && a instanceof L.TileLayer && (this._tileLayersNum++, a.on("load", this._onTileLayerLoad, this));
  this.attributionControl && a.getAttribution && this.attributionControl.addAttribution(a.getAttribution());
  c = function() {
    a.onAdd(this, b);
    this.fire("layeradd", {layer:a})
  };
  if(this._loaded) {
    c.call(this)
  }else {
    this.on("load", c, this)
  }
  return this
}, removeLayer:function(a) {
  var b = L.Util.stamp(a);
  this._layers[b] && (a.onRemove(this), delete this._layers[b], this.options.zoomAnimation && L.TileLayer && a instanceof L.TileLayer && (this._tileLayersNum--, a.off("load", this._onTileLayerLoad, this)), this.attributionControl && a.getAttribution && this.attributionControl.removeAttribution(a.getAttribution()), this.fire("layerremove", {layer:a}));
  return this
}, hasLayer:function(a) {
  return L.Util.stamp(a) in this._layers
}, invalidateSize:function() {
  var a = map.getSize();
  this._sizeChanged = !0;
  this._rawPanBy(a.subtract(map.getSize()).divideBy(2));
  this.fire("move");
  clearTimeout(this._sizeTimer);
  this._sizeTimer = setTimeout(L.Util.bind(function() {
    this.fire("moveend")
  }, this), 200);
  return this
}, getCenter:function(a) {
  var b = this.getSize().divideBy(2);
  return this.unproject(this._getTopLeftPoint().add(b), this._zoom, a)
}, getZoom:function() {
  return this._zoom
}, getBounds:function() {
  var a = this.getPixelBounds(), b = this.unproject(new L.Point(a.min.x, a.max.y)), a = this.unproject(new L.Point(a.max.x, a.min.y));
  return new L.LatLngBounds(b, a)
}, getMinZoom:function() {
  return isNaN(this.options.minZoom) ? this._layersMinZoom || 0 : this.options.minZoom
}, getMaxZoom:function() {
  return isNaN(this.options.maxZoom) ? this._layersMaxZoom || Infinity : this.options.maxZoom
}, getBoundsZoom:function(a) {
  var b = this.getSize(), c = this.getMinZoom(), d = this.getMaxZoom(), e = a.getNorthEast(), a = a.getSouthWest(), f, g;
  do {
    c++, f = this.project(e, c), g = this.project(a, c), f = new L.Point(f.x - g.x, g.y - f.y)
  }while(f.x <= b.x && f.y <= b.y && c <= d);
  return c - 1
}, getSize:function() {
  if(!this._size || this._sizeChanged) {
    this._size = new L.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1
  }
  return this._size
}, getPixelBounds:function() {
  var a = this._getTopLeftPoint(), b = this.getSize();
  return new L.Bounds(a, a.add(b))
}, getPixelOrigin:function() {
  return this._initialTopLeftPoint
}, getPanes:function() {
  return this._panes
}, mouseEventToContainerPoint:function(a) {
  return L.DomEvent.getMousePosition(a, this._container)
}, mouseEventToLayerPoint:function(a) {
  return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
}, mouseEventToLatLng:function(a) {
  return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
}, containerPointToLayerPoint:function(a) {
  return a.subtract(L.DomUtil.getPosition(this._mapPane))
}, layerPointToContainerPoint:function(a) {
  return a.add(L.DomUtil.getPosition(this._mapPane))
}, layerPointToLatLng:function(a) {
  return this.unproject(a.add(this._initialTopLeftPoint))
}, latLngToLayerPoint:function(a) {
  return this.project(a)._round()._subtract(this._initialTopLeftPoint)
}, project:function(a, b) {
  b = "undefined" == typeof b ? this._zoom : b;
  return this.options.crs.latLngToPoint(a, this.options.scale(b))
}, unproject:function(a, b, c) {
  b = "undefined" == typeof b ? this._zoom : b;
  return this.options.crs.pointToLatLng(a, this.options.scale(b), c)
}, _initLayout:function() {
  var a = this._container;
  a.className += " leaflet-container";
  this.options.fadeAnimation && (a.className += " leaflet-fade-anim");
  var b = L.DomUtil.getStyle(a, "position");
  "absolute" != b && "relative" != b && (a.style.position = "relative");
  this._initPanes();
  this._initControlPos && this._initControlPos()
}, _initPanes:function() {
  var a = this._panes = {};
  this._mapPane = a.mapPane = this._createPane("leaflet-map-pane", this._container);
  this._tilePane = a.tilePane = this._createPane("leaflet-tile-pane", this._mapPane);
  this._objectsPane = a.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane);
  a.shadowPane = this._createPane("leaflet-shadow-pane");
  a.overlayPane = this._createPane("leaflet-overlay-pane");
  a.markerPane = this._createPane("leaflet-marker-pane");
  a.popupPane = this._createPane("leaflet-popup-pane")
}, _createPane:function(a, b) {
  return L.DomUtil.create("div", a, b || this._objectsPane)
}, _resetView:function(a, b, c) {
  var d = this._zoom != b;
  this.fire("movestart");
  this._zoom = b;
  this._initialTopLeftPoint = this._getNewTopLeftPoint(a);
  c ? this._initialTopLeftPoint._add(L.DomUtil.getPosition(this._mapPane)) : L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
  this._tileLayersToLoad = this._tileLayersNum;
  this.fire("viewreset", {hard:!c});
  this.fire("move");
  d && this.fire("zoomend");
  this.fire("moveend");
  this._loaded || (this._loaded = !0, this.fire("load"))
}, _initLayers:function(a) {
  this._layers = {};
  for(var b = 0, c = a.length;b < c;b++) {
    this.addLayer(a[b])
  }
}, _initControls:function() {
  this.options.zoomControl && this.addControl(new L.Control.Zoom);
  this.options.attributionControl && (this.attributionControl = new L.Control.Attribution, this.addControl(this.attributionControl))
}, _rawPanBy:function(a) {
  var b = L.DomUtil.getPosition(this._mapPane);
  L.DomUtil.setPosition(this._mapPane, b.subtract(a))
}, _initEvents:function() {
  L.DomEvent.addListener(this._container, "click", this._onMouseClick, this);
  for(var a = ["dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove"], b = 0;b < a.length;b++) {
    L.DomEvent.addListener(this._container, a[b], this._fireMouseEvent, this)
  }
  this.options.trackResize && L.DomEvent.addListener(window, "resize", this._onResize, this)
}, _onResize:function() {
  L.Util.requestAnimFrame(this.invalidateSize, this)
}, _onMouseClick:function(a) {
  if(!this.dragging || !this.dragging.moved()) {
    this.fire("pre" + a.type), this._fireMouseEvent(a)
  }
}, _fireMouseEvent:function(a) {
  var b = a.type, b = "mouseenter" == b ? "mouseover" : "mouseleave" == b ? "mouseout" : b;
  this.hasEventListeners(b) && this.fire(b, {latlng:this.mouseEventToLatLng(a), layerPoint:this.mouseEventToLayerPoint(a)})
}, _initInteraction:function() {
  var a = {dragging:L.Handler.MapDrag, touchZoom:L.Handler.TouchZoom, doubleClickZoom:L.Handler.DoubleClickZoom, scrollWheelZoom:L.Handler.ScrollWheelZoom, shiftDragZoom:L.Handler.ShiftDragZoom}, b;
  for(b in a) {
    a.hasOwnProperty(b) && a[b] && (this[b] = new a[b](this), this.options[b] && this[b].enable())
  }
}, _onTileLayerLoad:function() {
  this._tileLayersToLoad--;
  this._tileLayersNum && !this._tileLayersToLoad && this._tileBg && (clearTimeout(this._clearTileBgTimer), this._clearTileBgTimer = setTimeout(L.Util.bind(this._clearTileBg, this), 500))
}, _getTopLeftPoint:function() {
  if(!this._loaded) {
    throw Error("Set map center and zoom first.");
  }
  return this._initialTopLeftPoint.subtract(L.DomUtil.getPosition(this._mapPane))
}, _getNewTopLeftPoint:function(a) {
  var b = this.getSize().divideBy(2);
  return this.project(a).subtract(b).round()
}, _limitZoom:function(a) {
  var b = this.getMinZoom(), c = this.getMaxZoom();
  return Math.max(b, Math.min(c, a))
}});
L.Map.include({locate:function(a) {
  var b = {timeout:1E4};
  L.Util.extend(b, a);
  navigator.geolocation ? navigator.geolocation.getCurrentPosition(L.Util.bind(this._handleGeolocationResponse, this), L.Util.bind(this._handleGeolocationError, this), b) : this.fire("locationerror", {code:0, message:"Geolocation not supported."});
  return this
}, locateAndSetView:function(a, b) {
  this._setViewOnLocate = !0;
  this._maxLocateZoom = a || Infinity;
  return this.locate(b)
}, _handleGeolocationError:function(a) {
  var a = a.code, b = 1 == a ? "permission denied" : 2 == a ? "position unavailable" : "timeout";
  this._setViewOnLocate && (this.fitWorld(), this._setViewOnLocate = !1);
  this.fire("locationerror", {code:a, message:"Geolocation error: " + b + "."})
}, _handleGeolocationResponse:function(a) {
  var b = 180 * a.coords.accuracy / 4E7, c = 2 * b, d = a.coords.latitude, e = a.coords.longitude, f = new L.LatLng(d - b, e - c), b = new L.LatLng(d + b, e + c), f = new L.LatLngBounds(f, b);
  this._setViewOnLocate && (b = Math.min(this.getBoundsZoom(f), this._maxLocateZoom), this.setView(f.getCenter(), b), this._setViewOnLocate = !1);
  this.fire("locationfound", {latlng:new L.LatLng(d, e), bounds:f, accuracy:a.coords.accuracy})
}});
L.Map.include({openPopup:function(a) {
  this.closePopup();
  this._popup = a;
  return this.addLayer(a)
}, closePopup:function() {
  this._popup && this.removeLayer(this._popup);
  return this
}});
L.Map.include(!L.Transition || !L.Transition.implemented() ? {} : {setView:function(a, b, c) {
  var b = this._limitZoom(b), d = this._zoom != b;
  if(this._loaded && !c && this._layers && (c = this._getNewTopLeftPoint(a).subtract(this._getTopLeftPoint()), d ? this._zoomToIfCenterInView && this._zoomToIfCenterInView(a, b, c) : this._panByIfClose(c))) {
    return this
  }
  this._resetView(a, b);
  return this
}, panBy:function(a) {
  this._panTransition || (this._panTransition = new L.Transition(this._mapPane, {duration:0.3}), this._panTransition.on("step", this._onPanTransitionStep, this), this._panTransition.on("end", this._onPanTransitionEnd, this));
  this.fire(this, "movestart");
  this._panTransition.run({position:L.DomUtil.getPosition(this._mapPane).subtract(a)});
  return this
}, _onPanTransitionStep:function() {
  this.fire("move")
}, _onPanTransitionEnd:function() {
  this.fire("moveend")
}, _panByIfClose:function(a) {
  return this._offsetIsWithinView(a) ? (this.panBy(a), !0) : !1
}, _offsetIsWithinView:function(a, b) {
  var c = b || 1, d = this.getSize();
  return Math.abs(a.x) <= d.x * c && Math.abs(a.y) <= d.y * c
}});
L.Map.include(!L.DomUtil.TRANSITION ? {} : {_zoomToIfCenterInView:function(a, b, c) {
  if(this._animatingZoom) {
    return!0
  }
  if(!this.options.zoomAnimation) {
    return!1
  }
  var d = Math.pow(2, b - this._zoom), c = c.divideBy(1 - 1 / d);
  if(!this._offsetIsWithinView(c, 1)) {
    return!1
  }
  this._mapPane.className += " leaflet-zoom-anim";
  c = this.containerPointToLayerPoint(this.getSize().divideBy(2)).add(c);
  this._prepareTileBg();
  this._runAnimation(a, b, d, c);
  return!0
}, _runAnimation:function(a, b, c, d) {
  this._animatingZoom = !0;
  this._animateToCenter = a;
  this._animateToZoom = b;
  a = L.DomUtil.TRANSFORM;
  if(L.Browser.gecko || window.opera) {
    this._tileBg.style[a] += " translate(0,0)"
  }
  L.Browser.android ? (this._tileBg.style[a + "Origin"] = d.x + "px " + d.y + "px", c = "scale(" + c + ")") : c = L.DomUtil.getScaleString(c, d);
  L.Util.falseFn(this._tileBg.offsetWidth);
  d = {};
  d[a] = this._tileBg.style[a] + " " + c;
  this._tileBg.transition.run(d)
}, _prepareTileBg:function() {
  this._tileBg || (this._tileBg = this._createPane("leaflet-tile-pane", this._mapPane), this._tileBg.style.zIndex = 1);
  var a = this._tilePane, b = this._tileBg;
  b.style[L.DomUtil.TRANSFORM] = "";
  b.style.visibility = "hidden";
  b.empty = !0;
  a.empty = !1;
  this._tilePane = this._panes.tilePane = b;
  this._tileBg = a;
  this._tileBg.transition || (this._tileBg.transition = new L.Transition(this._tileBg, {duration:0.3, easing:"cubic-bezier(0.25,0.1,0.25,0.75)"}), this._tileBg.transition.on("end", this._onZoomTransitionEnd, this));
  this._stopLoadingBgTiles()
}, _stopLoadingBgTiles:function() {
  for(var a = [].slice.call(this._tileBg.getElementsByTagName("img")), b = 0, c = a.length;b < c;b++) {
    a[b].complete || (a[b].parentNode.removeChild(a[b]), a[b] = null)
  }
}, _onZoomTransitionEnd:function() {
  this._restoreTileFront();
  L.Util.falseFn(this._tileBg.offsetWidth);
  this._resetView(this._animateToCenter, this._animateToZoom, !0);
  this._mapPane.className = this._mapPane.className.replace(" leaflet-zoom-anim", "");
  this._animatingZoom = !1
}, _restoreTileFront:function() {
  this._tilePane.innerHTML = "";
  this._tilePane.style.visibility = "";
  this._tilePane.style.zIndex = 2;
  this._tileBg.style.zIndex = 1
}, _clearTileBg:function() {
  !this._animatingZoom && !this.touchZoom._zooming && (this._tileBg.innerHTML = "")
}});
L.Map.include({addControl:function(a) {
  a.onAdd(this);
  var b = a.getPosition(), c = this._controlCorners[b], a = a.getContainer();
  L.DomUtil.addClass(a, "leaflet-control");
  -1 != b.indexOf("bottom") ? c.insertBefore(a, c.firstChild) : c.appendChild(a);
  return this
}, removeControl:function(a) {
  var b = this._controlCorners[a.getPosition()], c = a.getContainer();
  b.removeChild(c);
  if(a.onRemove) {
    a.onRemove(this)
  }
  return this
}, _initControlPos:function() {
  var a = this._controlCorners = {}, b = L.DomUtil.create("div", "leaflet-control-container", this._container);
  L.Browser.touch && (b.className += " leaflet-big-buttons");
  a.topLeft = L.DomUtil.create("div", "leaflet-top leaflet-left", b);
  a.topRight = L.DomUtil.create("div", "leaflet-top leaflet-right", b);
  a.bottomLeft = L.DomUtil.create("div", "leaflet-bottom leaflet-left", b);
  a.bottomRight = L.DomUtil.create("div", "leaflet-bottom leaflet-right", b)
}});
L.CustomMarker = L.Class.extend({includes:L.Mixin.Events, options:{contentCreator:void 0, shadowCreator:void 0, clickable:!0, draggable:!1}, initialize:function(a, b) {
  L.Util.setOptions(this, b);
  this._latlng = a
}, onAdd:function(a) {
  this._map = a;
  !this._element && this.options.elementCreator && (this._element = this.options.elementCreator(), this._element.className += " leaflet-marker-icon", this._initInteraction());
  !this._shadow && this.options.shadowCreator && (this._shadow = this.options.shadowCreator());
  this._element && a._panes.markerPane.appendChild(this._element);
  this._shadow && a._panes.shadowPane.appendChild(this._shadow);
  a.on("viewreset", this._reset, this);
  this._reset()
}, onRemove:function(a) {
  this._element && a._panes.markerPane.removeChild(this._element);
  this._shadow && a._panes.shadowPane.removeChild(this._elementShadow);
  a.off("viewreset", this._reset, this)
}, getLatLng:function() {
  return this._latlng
}, setLatLng:function(a) {
  this._latlng = a;
  this._reset()
}, _reset:function() {
  if(null != this._map) {
    var a = this._map.latLngToLayerPoint(this._latlng);
    this._element && L.DomUtil.setPosition(this._element, a);
    this._shadow && L.DomUtil.setPosition(this._shadow, a);
    this._element && (this._element.style.zIndex = a.y)
  }
}, _initInteraction:function() {
  if(this._element && this.options.clickable) {
    this._element.className += " leaflet-clickable";
    L.DomEvent.addListener(this._element, "click", this._onMouseClick, this);
    for(var a = ["dblclick", "mousedown", "mouseover", "mouseout"], b = 0;b < a.length;b++) {
      L.DomEvent.addListener(this._element, a[b], this._fireMouseEvent, this)
    }
  }
  this._element && L.Handler.MarkerDrag && (this.dragging = new L.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
}, _onMouseClick:function(a) {
  L.DomEvent.stopPropagation(a);
  (!this.dragging || !this.dragging.moved()) && this.fire(a.type)
}, _fireMouseEvent:function(a) {
  this.fire(a.type);
  L.DomEvent.stopPropagation(a)
}, openPopup:function() {
  this._popup.setLatLng(this._latlng);
  this._map.openPopup(this._popup);
  return this
}, closePopup:function() {
  this._popup && this._popup._close()
}, bindPopup:function(a, b) {
  this._popup = new L.Popup(b);
  this._popup.setContent(a);
  this.on("click", this.openPopup, this);
  return this
}});
var DynmapProjection = L.Class.extend({initialize:function(a) {
  L.Util.setOptions(this, a)
}, fromLocationToLatLng:function() {
  throw"fromLocationToLatLng not implemented";
}, fromLatLngToLocation:function() {
  return null
}});
Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
  if(void 0 === this || null === this) {
    throw new TypeError;
  }
  var b = Object(this), c = b.length >>> 0;
  if(0 === c) {
    return-1
  }
  var d = 0;
  0 < arguments.length && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -(1 / 0) && (d = (0 < d || -1) * Math.floor(Math.abs(d))));
  if(d >= c) {
    return-1
  }
  for(d = 0 <= d ? d : Math.max(c - Math.abs(d), 0);d < c;d++) {
    if(d in b && b[d] === a) {
      return d
    }
  }
  return-1
});
var DynmapLayerControl = L.Control.Layers.extend({getPosition:function() {
  return L.Control.Position.TOP_LEFT
}}), DynmapTileLayer = L.TileLayer.extend({_currentzoom:void 0, getProjection:function() {
  return this.projection
}, onTileUpdated:function(a, b) {
  var c = this.dynmap.getTileUrl(b);
  a.attr("src", c);
  a.show()
}, getTileName:function() {
  throw"getTileName not implemented";
}, getTileUrl:function(a, b) {
  var c = this.getTileName(a, b), d = this._cachedTileUrls[c];
  d || (this._cachedTileUrls[c] = d = this.options.dynmap.getTileUrl(c));
  return d
}, updateNamedTile:function(a) {
  var b = this._namedTiles[a];
  delete this._cachedTileUrls[a];
  b && this.updateTile(b)
}, updateTile:function(a) {
  this._loadTile(a, a.tilePoint, this._map.getZoom())
}, _addTilesFromCenterOut:function(a) {
  if(null != this._container) {
    for(var b = [], c = a.getCenter(), d = a.min.y;d <= a.max.y;d++) {
      for(var e = a.min.x;e <= a.max.x;e++) {
        e + ":" + d in this._tiles || b.push(new L.Point(e, d))
      }
    }
    b.sort(function(a, b) {
      return a.distanceTo(c) - b.distanceTo(c)
    });
    a = document.createDocumentFragment();
    this._tilesToLoad = b.length;
    d = 0;
    for(e = this._tilesToLoad;d < e;d++) {
      this._addTile(b[d], a)
    }
    this._container.appendChild(a)
  }
}, _addTile:function(a, b) {
  var c = this._getTilePos(a), d = this._map.getZoom(), e = a.x + ":" + a.y, f = this.getTileName(a, d), g = 1 << d;
  if(!this.options.continuousWorld) {
    if(this.options.noWrap) {
      if(0 > a.x || a.x >= g) {
        this._tilesToLoad--;
        return
      }
    }else {
      a.x = (a.x % g + g) % g
    }
    if(0 > a.y || a.y >= g) {
      this._tilesToLoad--;
      return
    }
  }
  var h = this._createTile();
  h.tileName = f;
  h.tilePoint = a;
  L.DomUtil.setPosition(h, c);
  this._tiles[e] = h;
  this._namedTiles[f] = h;
  "tms" == this.options.scheme && (a.y = g - a.y - 1);
  this._loadTile(h, a, d);
  b.appendChild(h)
}, _loadTile:function(a, b, c) {
  function d() {
    e._loadingTiles.splice(e._loadingTiles.indexOf(a), 1);
    e._nextLoadTile()
  }
  var e = this;
  a._layer = this;
  a.onload = function(a) {
    e._tileOnLoad.apply(this, [a]);
    d()
  };
  a.onerror = function() {
    e._tileOnError.apply(this);
    d()
  };
  a.loadSrc = function() {
    e._loadingTiles.push(a);
    a.src = e.getTileUrl(b, c)
  };
  this._loadQueue.push(a);
  this._nextLoadTile()
}, _nextLoadTile:function() {
  if(!(4 < this._loadingTiles.length)) {
    var a = this._loadQueue.shift();
    a && a.loadSrc()
  }
}, _removeOtherTiles:function(a) {
  var b, c, d;
  for(d in this._tiles) {
    if(this._tiles.hasOwnProperty(d) && (b = d.split(":"), c = parseInt(b[0], 10), b = parseInt(b[1], 10), c < a.min.x || c > a.max.x || b < a.min.y || b > a.max.y)) {
      c = this._tiles[d], c.parentNode === this._container && this._container.removeChild(this._tiles[d]), delete this._namedTiles[c.tileName], delete this._tiles[d]
    }
  }
}, _updateTileSize:function() {
  var a = this._map.getZoom();
  if(this._currentzoom !== a) {
    var b = this.calculateTileSize(a);
    this._currentzoom = a;
    b !== this.options.tileSize && this.setTileSize(b)
  }
}, _reset:function() {
  this._updateTileSize();
  this._tiles = {};
  this._namedTiles = {};
  this._loadQueue = [];
  this._loadingTiles = [];
  this._cachedTileUrls = {};
  this._initContainer();
  this._container.innerHTML = ""
}, _update:function() {
  this._updateTileSize();
  var a = this._map.getPixelBounds(), b = this.options.tileSize, c = new L.Point(Math.floor(a.min.x / b), Math.floor(a.min.y / b)), a = new L.Point(Math.floor(a.max.x / b), Math.floor(a.max.y / b)), c = new L.Bounds(c, a);
  this._addTilesFromCenterOut(c);
  this.options.unloadInvisibleTiles && this._removeOtherTiles(c)
}, calculateTileSize:function(a) {
  return 128 << Math.max(0, this.options.mapzoomin - (this.options.maxZoom - a))
}, setTileSize:function(a) {
  this.options.tileSize = a;
  this._tiles = {};
  this._createTileProto()
}, updateTileSize:function() {
}, zoomprefix:function(a) {
  return"zzzzzzzzzzzzzzzzzzzzzz".substr(0, a)
}, getTileInfo:function(a, b) {
  var c = Math.max(0, this.options.maxZoom - b - this.options.mapzoomin), d = 1 << c, e = d * a.x, d = d * a.y;
  return{prefix:this.options.prefix, nightday:this.options.nightandday && this.options.dynmap.serverday ? "_day" : "", scaledx:e >> 5, scaledy:d >> 5, zoom:this.zoomprefix(c), zoomprefix:0 == c ? "" : this.zoomprefix(c) + "_", x:e, y:d, fmt:this.options["image-format"] || "png"}
}});
function loadjs(a, b) {
  var c = document.createElement("script");
  c.setAttribute("src", a);
  c.setAttribute("type", "text/javascript");
  var d = !1;
  c.onload = function() {
    d || (d = !0, b())
  };
  c.onreadystatechange = function() {
    if("loaded" == c.readyState || "complete" == c.readyState) {
      c.onload()
    }
  };
  (document.head || document.getElementsByTagName("head")[0]).appendChild(c)
}
function loadcss(a, b) {
  var c = document.createElement("link");
  c.setAttribute("href", a);
  c.setAttribute("rel", "stylesheet");
  var d = !1;
  b && (c.onload = function() {
    d || (d = !0, b())
  }, c.onreadystatechange = function() {
    c.onload()
  });
  (document.head || document.getElementsByTagName("head")[0]).appendChild(c)
}
function splitArgs(a) {
  var b = a.split(" ");
  delete arguments[0];
  var c = {};
  $.each(arguments, function(a, e) {
    a && (c[e] = b[a - 1])
  });
  return c
}
function swtch(a, b, c) {
  return(b[a] || c || function() {
  })(a)
}
(function(a) {
  a.fn.scrollHeight = function() {
    return this[0].scrollHeight
  }
})($);
function Location(a, b, c, d) {
  this.world = a;
  this.x = b;
  this.y = c;
  this.z = d
}
function namedReplace(a, b) {
  for(var c = 0, d = "";;) {
    var e = a.indexOf("{", c), f = a.indexOf("}", e + 1);
    if(0 > e || 0 > f) {
      d += a.substr(c);
      break
    }
    if(e < f) {
      var g = a.substring(e + 1, f), d = d + a.substring(c, e), d = d + b[g]
    }else {
      d += a.substring(c, e - 1), d += ""
    }
    c = f + 1
  }
  return d
}
;var dynmapversion = "${project.version}-${BUILD_NUMBER}";
this.JSON || (this.JSON = {});
(function() {
  function a(a) {
    return 10 > a ? "0" + a : a
  }
  function b(a) {
    e.lastIndex = 0;
    return e.test(a) ? '"' + a.replace(e, function(a) {
      var b = h[a];
      return"string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + a + '"'
  }
  function c(a, d) {
    var e, h, n, p, s = f, o, k = d[a];
    k && "object" === typeof k && "function" === typeof k.toJSON && (k = k.toJSON(a));
    "function" === typeof j && (k = j.call(d, a, k));
    switch(typeof k) {
      case "string":
        return b(k);
      case "number":
        return isFinite(k) ? "" + k : "null";
      case "boolean":
      ;
      case "null":
        return"" + k;
      case "object":
        if(!k) {
          return"null"
        }
        f += g;
        o = [];
        if("[object Array]" === Object.prototype.toString.apply(k)) {
          p = k.length;
          for(e = 0;e < p;e += 1) {
            o[e] = c(e, k) || "null"
          }
          n = 0 === o.length ? "[]" : f ? "[\n" + f + o.join(",\n" + f) + "\n" + s + "]" : "[" + o.join(",") + "]";
          f = s;
          return n
        }
        if(j && "object" === typeof j) {
          p = j.length;
          for(e = 0;e < p;e += 1) {
            h = j[e], "string" === typeof h && (n = c(h, k)) && o.push(b(h) + (f ? ": " : ":") + n)
          }
        }else {
          for(h in k) {
            Object.hasOwnProperty.call(k, h) && (n = c(h, k)) && o.push(b(h) + (f ? ": " : ":") + n)
          }
        }
        n = 0 === o.length ? "{}" : f ? "{\n" + f + o.join(",\n" + f) + "\n" + s + "}" : "{" + o.join(",") + "}";
        f = s;
        return n
    }
  }
  "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
    return this.valueOf()
  });
  var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f, g, h = {"\u0008":"\\b", "\t":"\\t", "\n":"\\n", "\u000c":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, j;
  "function" !== typeof JSON.stringify && (JSON.stringify = function(a, b, d) {
    var e;
    g = f = "";
    if("number" === typeof d) {
      for(e = 0;e < d;e += 1) {
        g += " "
      }
    }else {
      "string" === typeof d && (g = d)
    }
    if((j = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) {
      throw Error("JSON.stringify");
    }
    return c("", {"":a})
  });
  "function" !== typeof JSON.parse && (JSON.parse = function(a, b) {
    function c(a, d) {
      var e, f, g = a[d];
      if(g && "object" === typeof g) {
        for(e in g) {
          Object.hasOwnProperty.call(g, e) && (f = c(g, e), void 0 !== f ? g[e] = f : delete g[e])
        }
      }
      return b.call(a, d, g)
    }
    var e, a = "" + a;
    d.lastIndex = 0;
    d.test(a) && (a = a.replace(d, function(a) {
      return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }));
    if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      return e = eval("(" + a + ")"), "function" === typeof b ? c({"":e}, "") : e
    }
    throw new SyntaxError("JSON.parse");
  })
})();
jQuery.parseJSON = function(a) {
  return JSON.parse(a)
};
jQuery.stringifyJSON = function(a) {
  return JSON.stringify(a)
};
function fixedAjax(a) {
  var b = a.success;
  a.success = function(c, d, e) {
    200 == e.status ? b && b(c, d, e) : a.error(e, e.status, null)
  };
  $.ajax(a)
}
jQuery.deleteJSON = function(a, b, c) {
  fixedAjax({type:"DELETE", dataType:"text", url:a, success:function(a, c, f) {
    b && b(f)
  }, error:function(a) {
    c && c(a.status, a.statusText, a)
  }})
};
jQuery.postJSON = function(a, b, c, d) {
  fixedAjax({type:"POST", contentType:"application/json", dataType:"text", url:b, data:$.stringifyJSON(a), success:function(a, b, d) {
    c && c(a ? $.parseJSON(a) : null, d)
  }, error:function(a) {
    d && d(a.status, a.statusText, a)
  }})
};
jQuery.putJSON = function(a, b, c, d) {
  fixedAjax({type:"PUT", contentType:"application/json", dataType:"text", url:b, data:$.stringifyJSON(a), success:function(a, b, d) {
    c && c(d)
  }, error:function(a) {
    d && d(a.status, a.statusText, a)
  }})
};
jQuery.getJSON = function(a, b, c) {
  fixedAjax({type:"GET", dataType:"text", url:a, beforeSend:function(a) {
    a.setRequestHeader("Accept", "application/json")
  }, success:function(a, c, f) {
    b && b(a ? $.parseJSON(a) : null, f)
  }, error:function(a) {
    c && c(a.status, a.statusText, a)
  }})
};
(function(a) {
  function b(b) {
    var c = b || window.event, f = [].slice.call(arguments, 1), g = 0, h = 0, j = 0, b = a.event.fix(c);
    b.type = "mousewheel";
    b.wheelDelta && (g = b.wheelDelta / 120);
    b.detail && (g = -b.detail / 3);
    j = g;
    void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (j = 0, h = -1 * g);
    void 0 !== c.wheelDeltaY && (j = c.wheelDeltaY / 120);
    void 0 !== c.wheelDeltaX && (h = -1 * c.wheelDeltaX / 120);
    f.unshift(b, g, h, j);
    return a.event.handle.apply(this, f)
  }
  var c = ["DOMMouseScroll", "mousewheel"];
  a.event.special.mousewheel = {setup:function() {
    if(this.addEventListener) {
      for(var a = c.length;a;) {
        this.addEventListener(c[--a], b, !1)
      }
    }else {
      this.onmousewheel = b
    }
  }, teardown:function() {
    if(this.removeEventListener) {
      for(var a = c.length;a;) {
        this.removeEventListener(c[--a], b, !1)
      }
    }else {
      this.onmousewheel = null
    }
  }};
  a.fn.extend({mousewheel:function(a) {
    return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
  }, unmousewheel:function(a) {
    return this.unbind("mousewheel", a)
  }})
})(jQuery);
function createMinecraftHead(a, b, c, d) {
  var e = new Image;
  e.onload = function() {
    c(e)
  };
  e.onerror = function() {
    d()
  };
  e.src = "body" == b ? dynmap.options.tileUrl + "faces/body/" + a + ".png" : dynmap.options.tileUrl + "faces/" + b + "x" + b + "/" + a + ".png"
}
function getMinecraftHead(a, b, c) {
  createMinecraftHead(a, b, c, function() {
    console.error('Failed to retrieve face of "', a, '" with size "', b, '"!')
  })
}
function getMinecraftTime(a) {
  var a = parseInt(a), b = 0 <= a && 13700 > a;
  return{servertime:a, days:parseInt((a + 8E3) / 24E3), hours:(parseInt(a / 1E3) + 8) % 24, minutes:parseInt(60 * (a / 1E3 % 1)), seconds:parseInt(60 * (60 * (a / 1E3 % 1) % 1)), day:b, night:!b}
}
function chat_encoder(a) {
  if(dynmap.options.cyrillic && "player" === a.source) {
    for(var b = "", c = 0;c < a.text.length;c++) {
      var d = a.text.charCodeAt(c);
      192 <= d ? (d = a.text.charCodeAt(c), b += String.fromCharCode(d + 848)) : b = 184 == d ? b + String.fromCharCode(1105) : b + String.fromCharCode(d)
    }
    return b
  }
  return a.text
}
;var componentconstructors = {}, maptypes = {}, map = null;
componentconstructors.testcomponent = function(a) {
  console.log("initialize");
  $(a).bind("worldchanged", function() {
    console.log("worldchanged")
  });
  $(a).bind("mapchanging", function() {
    console.log("mapchanging")
  });
  $(a).bind("mapchanged", function() {
    console.log("mapchanged")
  });
  $(a).bind("zoomchanged", function() {
    console.log("zoomchanged")
  });
  $(a).bind("worldupdating", function() {
    console.log("worldupdating")
  });
  $(a).bind("worldupdate", function() {
    console.log("worldupdate")
  });
  $(a).bind("worldupdated", function() {
    console.log("worldupdated")
  });
  $(a).bind("worldupdatefailed", function() {
    console.log("worldupdatefailed")
  });
  $(a).bind("playeradded", function() {
    console.log("playeradded")
  });
  $(a).bind("playerremoved", function() {
    console.log("playerremoved")
  });
  $(a).bind("playerupdated", function() {
    console.log("playerupdated")
  })
};
function DynMap(a) {
  var b = this;
  b.options = a;
  $.getJSON(b.options.url.configuration, function(a) {
    b.configure(a);
    b.initialize()
  }, function(a, b) {
    alert("Could not retrieve configuration: " + b)
  })
}
DynMap.prototype = {components:[], worlds:{}, registeredTiles:[], players:{}, lasttimestamp:(new Date).getUTCMilliseconds(), servertime:0, serverday:!1, inittime:(new Date).getTime(), followingPlayer:"", initfollow:null, missedupdates:0, layercontrol:void 0, formatUrl:function(a, b) {
  var c = this.options.url[a];
  $.each(b, function(a, b) {
    c = c.replace("{" + a + "}", b)
  });
  return c
}, configure:function(a) {
  var b = this;
  $.extend(b.options, a);
  $.each(b.options.worlds, function(a, d) {
    var e = b.worlds[d.name] = $.extend({}, d, {maps:{}});
    $.each(d.maps, function(a, c) {
      var d = $.extend({}, c, {world:e, dynmap:b}), d = e.maps[c.name] = maptypes[c.type](d);
      b.options.defaultmap && b.options.defaultmap == c.name && (e.defaultmap = d);
      e.defaultmap = e.defaultmap || d
    });
    b.defaultworld = b.defaultworld || e
  });
  a = b.getParameterByName("worldname");
  "" == a && (a = b.options.defaultworld || "");
  "" != a && (b.defaultworld = b.worlds[a] || b.defaultworld);
  a = b.getParameterByName("mapname");
  "" != a && (b.defaultworld.defaultmap = b.defaultworld.maps[a] || b.defaultworld.defaultmap);
  a = b.getIntParameterByName("x");
  null != a && (b.defaultworld.center.x = a);
  a = b.getIntParameterByName("y");
  null != a && (b.defaultworld.center.y = a);
  a = b.getIntParameterByName("z");
  null != a && (b.defaultworld.center.z = a)
}, initialize:function() {
  var a = this, b = $(a.options.container);
  b.addClass("dynmap");
  var c;
  (c = $("<div/>")).addClass("map").appendTo(b);
  a.options.title && (document.title = a.options.title);
  var d = a.getIntParameterByName("zoom");
  null != d && (a.options.defaultzoom = d);
  d = a.getParameterByName("showlayercontrol");
  "" != d && (a.options.showlayercontrol = d);
  "undefined" == typeof a.options.defaultzoom && (a.options.defaultzoom = 1);
  d = a.getParameterByName("playername");
  "" != d && (a.initfollow = d);
  c = this.map = new L.Map(c.get(0), {zoom:a.options.defaultzoom, center:new L.LatLng(0, 0), zoomAnimation:!0, attributionControl:!1, crs:L.Util.extend({}, L.CRS, {code:"simple", projection:{project:function(a) {
    return new L.Point(a.lat, a.lng)
  }, unproject:function(a) {
    return new L.LatLng(a.x, a.y, !0)
  }}, transformation:new L.Transformation(1, 0, 1, 0)}), scale:function(a) {
    return 1 << a
  }, continuousWorld:!0, worldCopyJump:!1});
  window.map = c;
  c.on("zoomend", function() {
    a.maptype.updateTileSize(a.map.getZoom());
    $(a).trigger("zoomchanged")
  });
  var e, d = "true" == a.getParameterByName("nopanel");
  "true" != a.options.sidebaropened ? (c = "pinned", "false" == a.options.sidebaropened && (c = ""), e = a.sidebar = $("<div/>").addClass("sidebar " + c), c = $("<div/>").addClass("panel").appendTo(e), $("<div/>").addClass("pin").click(function() {
    e.toggleClass("pinned")
  }).appendTo(c)) : (e = a.sidebar = $("<div/>").addClass("sidebar pinned"), c = $("<div/>").addClass("panel").appendTo(e));
  d || e.appendTo(b);
  var f = $("<div/>").addClass("scrollup").bind("mousedown mouseup", function(a) {
    "mousedown" == a.type ? h.animate({scrollTop:"-=300px"}, 3E3, "linear") : h.stop()
  }), g = $("<div/>").addClass("scrolldown").bind("mousedown mouseup", function(a) {
    "mousedown" == a.type ? h.animate({scrollTop:"+=300px"}, 3E3, "linear") : h.stop()
  }), h;
  $("<fieldset/>").append($("<legend/>").text(a.options["msg-maptypes"])).append(f).append(a.worldlist = h = $("<ul/>").addClass("worldlist").bind("mousewheel", function(a, b) {
    this.scrollTop -= 10 * b;
    a.preventDefault()
  })).append(g).appendTo(c);
  $.each(a.worlds, function(b, c) {
    var d;
    c.element = $("<li/>").addClass("world").text(c.title).append(d = $("<ul/>").addClass("maplist")).data("world", c).appendTo(h);
    $.each(c.maps, function(b, c) {
      c.element = $("<li/>").addClass("map").append($("<a/>").attr({title:c.options.title, href:"#"}).addClass("maptype").css({backgroundImage:"url(" + (c.options.icon || "images/block_" + b + ".png") + ")"}).text(c.options.title)).click(function() {
        a.selectMap(c)
      }).data("map", c).appendTo(d)
    })
  });
  var j = $("<div/>").addClass("scrollup").bind("mousedown mouseup", function(a) {
    "mousedown" == a.type ? l.animate({scrollTop:"-=300px"}, 3E3, "linear") : l.stop()
  }), m = $("<div/>").addClass("scrolldown").bind("mousedown mouseup", function(a) {
    "mousedown" == a.type ? l.animate({scrollTop:"+=300px"}, 3E3, "linear") : l.stop()
  }), l;
  $("<fieldset/>").append($("<legend/>").text(a.options["msg-players"])).append(j).append(a.playerlist = l = $("<ul/>").addClass("playerlist").bind("mousewheel", function(a, b) {
    this.scrollTop -= 10 * b;
    a.preventDefault()
  })).append(m).appendTo(c);
  var q = function() {
    e.innerHeight() > 2 * h.scrollHeight() ? (h.height(h.scrollHeight()), f.toggle(!1), g.toggle(!1)) : (h.height(e.innerHeight() / 2), f.toggle(!0), g.toggle(!0));
    l.height(e.innerHeight() - (l.offset().top - h.offset().top) - 64);
    var a = l.scrollHeight() > l.height();
    j.toggle(a);
    m.toggle(a)
  };
  q();
  $(window).resize(q);
  $(dynmap).bind("playeradded", function() {
    q()
  });
  $(dynmap).bind("playerremoved", function() {
    q()
  });
  d = $("<div/>").addClass("compass");
  L.Browser.mobile && d.addClass("mobilecompass");
  d.appendTo(b);
  "true" != a.options.sidebaropened && $("<div/>").addClass("hitbar").click(function() {
    e.toggleClass("pinned")
  }).appendTo(c);
  a.alertbox = $("<div/>").addClass("alertbox").hide().appendTo(b);
  if(dynmapversion != a.options.dynmapversion) {
    a.alertbox.text("Web files are not matched with plugin version: All files need to be same version (" + a.options.dynmapversion + ")").show()
  }else {
    a.selectMap(a.defaultworld.defaultmap);
    var r = 0, n = {};
    $.each(a.options.components, function(a, b) {
      n[b.type] || (n[b.type] = [], r++);
      n[b.type].push(b)
    });
    var p = {};
    $.each(n, function(b, c) {
      p[b] = !0;
      loadjs("js/" + b + ".js", function() {
        var d = componentconstructors[b];
        d && $.each(c, function(b, c) {
          a.components.push(new d(a, c))
        });
        delete p[b];
        r--;
        0 == r && setTimeout(function() {
          a.update()
        }, a.options.updaterate)
      })
    });
    setTimeout(function() {
      $.each(n, function(b) {
        p[b] && a.alertbox.text("Error loading js/" + b + ".js").show()
      });
      0 < r && setTimeout(function() {
        a.update()
      }, a.options.updaterate)
    }, 15E3)
  }
}, getProjection:function() {
  return this.maptype.getProjection()
}, selectMapAndPan:function(a, b, c) {
  if(!a) {
    throw"Cannot select map " + a;
  }
  if(this.maptype !== a) {
    $(this).trigger("mapchanging");
    var d = a.options.world;
    this.maptype && ($(".compass").removeClass("compass_" + this.maptype.options.compassview), $(".compass").removeClass("compass_" + this.maptype.options.name));
    $(".compass").addClass("compass_" + a.options.compassview);
    $(".compass").addClass("compass_" + a.options.name);
    var e = this.world !== a.options.world, f = (this.maptype && this.maptype.getProjection()) !== (a && a.projection), g = this.map.getZoom();
    e && (this.registeredTiles = [], this.inittime = (new Date).getTime());
    e && this.world && (this.world.lastcenter = this.maptype.getProjection().fromLatLngToLocation(this.map.getCenter(), 64));
    this.maptype && this.map.removeLayer(this.maptype);
    var h = this.maptype;
    this.world = d;
    this.maptype = a;
    this.maptype.options.maxZoom < g && (g = this.maptype.options.maxZoom);
    this.map.options.maxZoom = this.maptype.options.maxZoom;
    this.map.options.minZoom = this.maptype.options.minZoom;
    f || e || b ? (b ? h = this.getProjection().fromLocationToLatLng(b) : e ? (h = d.lastcenter ? d.lastcenter : $.extend({x:0, y:64, z:0}, d.center), h = this.getProjection().fromLocationToLatLng(h)) : (b = null, null != h && (b = h.getProjection().fromLatLngToLocation(this.map.getCenter(), 64)), h = null != b ? this.getProjection().fromLocationToLatLng(b) : this.map.getCenter()), this.map.setView(h, g, !0)) : this.map.setZoom(g);
    this.map.addLayer(this.maptype);
    e && $(this).trigger("worldchanged");
    $(this).trigger("mapchanged");
    $(".map", this.worldlist).removeClass("selected");
    $(a.element).addClass("selected");
    this.updateBackground();
    c && c()
  }
}, selectMap:function(a, b) {
  this.selectMapAndPan(a, null, b)
}, selectWorldAndPan:function(a, b, c) {
  "String" === typeof a && (a = this.worlds[a]);
  this.world === a ? b ? this.panToLatLng(this.maptype.getProjection().fromLocationToLatLng(b), c) : c && c() : this.selectMapAndPan(a.defaultmap, b, c)
}, selectWorld:function(a, b) {
  this.selectWorldAndPan(a, null, b)
}, panToLocation:function(a, b) {
  a.world ? this.selectWorldAndPan(a.world, a, function() {
    b && b()
  }) : this.panToLatLng(this.maptype.getProjection().fromLocationToLatLng(a), b)
}, panToLayerPoint:function(a, b) {
  this.map.panToLatLng(this.map.layerPointToLatLng(a));
  b && b()
}, panToLatLng:function(a, b) {
  this.map.panTo(a);
  b && b()
}, update:function() {
  var a = this;
  $(a).trigger("worldupdating");
  $.getJSON(a.formatUrl("update", {world:a.world.name, timestamp:a.lasttimestamp}), function(b) {
    if(b) {
      if(a.alertbox.hide(), a.options.jsonfile || (a.lasttimestamp = b.timestamp), a.options.confighash != b.confighash) {
        window.location.reload(!0)
      }else {
        a.servertime = b.servertime;
        var c = 23100 < a.servertime || 12900 > a.servertime;
        a.serverday != c && (a.serverday = c, a.updateBackground(), a.maptype.options.nightandday && (a.map.removeLayer(a.maptype), a.map.addLayer(a.maptype)));
        var d = {};
        $.each(b.players, function(b, c) {
          var e = c.name, j = a.players[e];
          j ? a.updatePlayer(j, c) : (a.addPlayer(c), a.initfollow && a.initfollow == e && (a.followPlayer(a.players[e]), a.initfollow = null));
          d[e] = j
        });
        for(var e in a.players) {
          c = a.players[e], e in d || a.removePlayer(c)
        }
        $.each(b.updates, function(b, c) {
          if(!a.options.jsonfile || a.lasttimestamp <= c.timestamp) {
            $(a).trigger("worldupdate", [c]), swtch(c.type, {tile:function() {
              a.onTileUpdated(c.name, c.timestamp)
            }, playerjoin:function() {
              $(a).trigger("playerjoin", [c.playerName])
            }, playerquit:function() {
              $(a).trigger("playerquit", [c.playerName])
            }, component:function() {
              $(a).trigger("component." + c.ctype, [c])
            }})
          }
        });
        $(a).trigger("worldupdated", [b]);
        a.lasttimestamp = b.timestamp;
        a.missedupdates = 0;
        setTimeout(function() {
          a.update()
        }, a.options.updaterate)
      }
    }else {
      setTimeout(function() {
        a.update()
      }, a.options.updaterate)
    }
  }, function(b, c) {
    a.missedupdates++;
    2 < a.missedupdates && (a.alertbox.text("Could not update map: " + (c || "Could not connect to server")).show(), $(a).trigger("worldupdatefailed"));
    setTimeout(function() {
      a.update()
    }, a.options.updaterate)
  })
}, getTileUrl:function(a) {
  var b = this.registeredTiles[a];
  null == b && (b = this.registeredTiles[a] = this.options.tileUrl + this.world.name + "/" + a + "?" + this.inittime);
  return b
}, onTileUpdated:function(a, b) {
  this.registeredTiles[a] = this.options.tileUrl + this.world.name + "/" + a + "?" + b;
  this.maptype.updateNamedTile(a)
}, addPlayer:function(a) {
  var b = this, c = b.players[a.name] = {name:a.name, location:new Location(b.worlds[a.world], parseFloat(a.x), parseFloat(a.y), parseFloat(a.z)), health:a.health, armor:a.armor, account:a.account};
  $(b).trigger("playeradded", [c]);
  var d;
  c.menuitem = $("<li/>").addClass("player").append(d = $("<span/>").addClass("playerIcon").append($("<img/>").attr({src:"images/player_face.png"})).attr({title:"Follow " + c.name}).click(function() {
    b.followPlayer(c !== b.followingPlayer ? c : null)
  })).append($("<a/>").attr({href:"#", title:"Center on " + c.name}).text(c.name)).click(function() {
    b.followingPlayer !== c && b.followPlayer(null);
    b.panToLocation(c.location)
  }).appendTo(b.playerlist);
  b.options.showplayerfacesinmenu && getMinecraftHead(c.account, 16, function(a) {
    $("img", d).remove();
    $(a).appendTo(d)
  })
}, updatePlayer:function(a, b) {
  var c = a.location = new Location(this.worlds[b.world], parseFloat(b.x), parseFloat(b.y), parseFloat(b.z));
  a.health = b.health;
  a.armor = b.armor;
  $(this).trigger("playerupdated", [a]);
  this.options.grayplayerswhenhidden && a.menuitem.toggleClass("otherworld", this.world !== c.world);
  a === this.followingPlayer && this.panToLocation(a.location)
}, removePlayer:function(a) {
  delete this.players[a.name];
  $(this).trigger("playerremoved", [a]);
  a.menuitem.remove()
}, followPlayer:function(a) {
  var b = this;
  $(".following", b.playerlist).removeClass("following");
  a && ($(a.menuitem).addClass("following"), b.panToLocation(a.location, function() {
    if(b.options.followmap && b.world) {
      var a = b.world.maps[b.options.followmap];
      a && b.selectMapAndPan(a)
    }
    b.options.followzoom && b.map.setZoom(b.options.followzoom)
  }));
  this.followingPlayer = a
}, updateBackground:function() {
  var a = "#000000";
  this.serverday ? this.maptype.options.backgroundday ? a = this.maptype.options.backgroundday : this.maptype.options.background && (a = this.maptype.options.background) : this.maptype.options.backgroundnight ? a = this.maptype.options.backgroundnight : this.maptype.options.background && (a = this.maptype.options.background);
  $(".map").css("background", a);
  $(".leaflet-tile").css("background", a)
}, getParameterByName:function(a) {
  a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  a = RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
  return null == a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
}, getIntParameterByName:function(a) {
  a = this.getParameterByName(a);
  return"" != a && (a = parseInt(a, 10), NaN != a) ? a : null
}, getBoolParameterByName:function(a) {
  a = this.getParameterByName(a);
  if("" != a) {
    if("true" == a) {
      return!0
    }
    if("false" == a) {
      return!1
    }
  }
  return null
}, layersetlist:[], addToLayerSelector:function(a, b, c) {
  "false" != this.options.showlayercontrol && !this.layercontrol && (this.layercontrol = new DynmapLayerControl, "pinned" == this.options.showlayercontrol && (this.layercontrol.options.collapsed = !1), map.addControl(this.layercontrol));
  var d;
  for(d = 0;d < this.layersetlist.length;d++) {
    if(this.layersetlist[d].layer === a) {
      this.layersetlist[d].priority = c;
      this.layersetlist[d].name = b;
      break
    }
  }
  d >= this.layersetlist.length && (this.layersetlist[d] = {layer:a, priority:c, name:b});
  this.layersetlist.sort(function(a, b) {
    return a.priority != b.priority ? a.priority - b.priority : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  });
  if("false" != this.options.showlayercontrol) {
    for(d = 0;d < this.layersetlist.length;d++) {
      this.layercontrol.removeLayer(this.layersetlist[d].layer)
    }
    for(d = 0;d < this.layersetlist.length;d++) {
      this.layercontrol.addOverlay(this.layersetlist[d].layer, this.layersetlist[d].name)
    }
  }
}, removeFromLayerSelector:function(a) {
  var b;
  for(b = 0;b < this.layersetlist.length;b++) {
    if(this.layersetlist[b].layer === a) {
      this.layersetlist.splice(b, 1);
      "false" != this.options.showlayercontrol && this.layercontrol.removeLayer(a);
      break
    }
  }
}, getLink:function() {
  var a = window.location.pathname, b = this.maptype.getProjection().fromLatLngToLocation(this.map.getCenter(), 64);
  return a = a + "?worldname=" + this.world.name + "&mapname=" + this.maptype.options.name + "&zoom=" + this.map.getZoom() + "&x=" + b.x + "&y=" + b.y + "&z=" + b.z
}};
var HDProjection = DynmapProjection.extend({fromLocationToLatLng:function(a) {
  var b = this.options.worldtomap;
  return new L.LatLng((b[0] * a.x + b[1] * a.y + b[2] * a.z) / (1 << this.options.mapzoomout), (128 - (b[3] * a.x + b[4] * a.y + b[5] * a.z)) / (1 << this.options.mapzoomout), !0)
}, fromLatLngToLocation:function(a, b) {
  var c = this.options.maptoworld, d = a.lat * (1 << this.options.mapzoomout), e = 128 - a.lng * (1 << this.options.mapzoomout);
  return{x:c[0] * d + c[1] * e + c[2] * b, y:b, z:c[6] * d + c[7] * e + c[8] * b}
}}), HDMapType = DynmapTileLayer.extend({projection:void 0, options:{minZoom:0, maxZoom:0, errorTileUrl:"images/blank.png", continuousWorld:!0}, initialize:function(a) {
  a.maxZoom = a.mapzoomin + a.mapzoomout;
  L.Util.setOptions(this, a);
  this.projection = new HDProjection($.extend({map:this}, a))
}, getTileName:function(a, b) {
  var c = this.getTileInfo(a, b);
  c.y = -c.y;
  c.scaledy = c.y >> 5;
  return namedReplace("{prefix}{nightday}/{scaledx}_{scaledy}/{zoom}{x}_{y}.{fmt}", c)
}, zoomprefix:function(a) {
  return"zzzzzzzzzzzzzzzzzzzzzz".substr(0, a) + (0 === a ? "" : "_")
}});
maptypes.HDMapType = function(a) {
  return new HDMapType(a)
};
var KzedProjection = DynmapProjection.extend({fromLocationToLatLng:function(a) {
  var b = a.x, c = a.z, d = 1 << this.options.mapzoomout;
  return new L.LatLng((128 - (b + c)) / d, (b - c - (a.y - 127)) / d, !0)
}, fromLatLngToLocation:function(a, b) {
  var c = 1 << this.options.mapzoomout, d = 128 - a.lat * c, c = (d + a.lng * c + (b - 127)) / 2;
  return{x:c, y:b, z:d - c}
}}), KzedMapType = DynmapTileLayer.extend({options:{minZoom:0, maxZoom:4, errorTileUrl:"images/blank.png", continuousWorld:!0}, initialize:function(a) {
  a.maxZoom = a.mapzoomin + a.mapzoomout;
  L.Util.setOptions(this, a);
  this.projection = new KzedProjection({mapzoomout:this.options.mapzoomout})
}, getTileName:function(a, b) {
  this.getTileInfo(a, b);
  return namedReplace(this.options.bigmap ? "{zprefix}{nightday}/{scaledx}_{scaledy}/{zoomprefix}{x}_{y}.png" : "{zoom}{prefix}{nightday}_{x}_{y}.png", this.getTileInfo(a, b))
}, getTileInfo:function(a, b) {
  var c = Math.max(0, this.options.maxZoom - b - this.options.mapzoomin), d = 1 << c, e = 128 * -d * a.x, d = 128 * d * a.y;
  return{prefix:this.options.prefix, nightday:this.options.nightandday && this.options.dynmap.serverday ? "_day" : "", scaledx:e >> 12, scaledy:d >> 12, zoom:this.zoomprefix(c), zoomprefix:2 > c ? "" : this.zoomprefix(c - 1) + "_", zprefix:0 == c ? this.options.prefix : "z" + this.options.prefix, x:e, y:d}
}});
maptypes.KzedMapType = function(a) {
  return new KzedMapType(a)
};
var FlatProjection = DynmapProjection.extend({fromLocationToLatLng:function(a) {
  return new L.LatLng(-a.z / (1 << this.options.mapzoomout), a.x / (1 << this.options.mapzoomout), !0)
}, fromLatLngToLocation:function(a, b) {
  return{x:a.lng * (1 << this.options.mapzoomout), y:b, z:-a.lat * (1 << this.options.mapzoomout)}
}}), FlatMapType = DynmapTileLayer.extend({options:{minZoom:0, maxZoom:4, errorTileUrl:"images/blank.png", continuousWorld:!0}, initialize:function(a) {
  a.maxZoom = a.mapzoomin + a.mapzoomout;
  L.Util.setOptions(this, a);
  this.projection = new FlatProjection({mapzoomout:a.mapzoomout})
}, getTileName:function(a, b) {
  return namedReplace(this.options.bigmap ? "{prefix}{nightday}_128/{scaledx}_{scaledy}/{zoomprefix}{x}_{y}.png" : "{zoom}{prefix}{nightday}_128_{x}_{y}.png", this.getTileInfo(a, b))
}});
maptypes.FlatMapType = function(a) {
  return new FlatMapType(a)
};
var config = {url:{configuration:"up/configuration", update:"up/world/{world}/{timestamp}", sendmessage:"up/sendmessage"}, tileUrl:"tiles/", tileWidth:128, tileHeight:128};
$(document).ready(function() {
  window.dynmap = new DynMap($.extend({container:$("#mcmap")}, config))
});