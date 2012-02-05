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
  var d = Object(this), c = d.length >>> 0;
  if(0 === c) {
    return-1
  }
  var b = 0;
  0 < arguments.length && (b = Number(arguments[1]), b !== b ? b = 0 : 0 !== b && b !== 1 / 0 && b !== -(1 / 0) && (b = (0 < b || -1) * Math.floor(Math.abs(b))));
  if(b >= c) {
    return-1
  }
  for(b = 0 <= b ? b : Math.max(c - Math.abs(b), 0);b < c;b++) {
    if(b in d && d[b] === a) {
      return b
    }
  }
  return-1
});
var DynmapLayerControl = L.Control.Layers.extend({getPosition:function() {
  return L.Control.Position.TOP_LEFT
}}), DynmapTileLayer = L.TileLayer.extend({_currentzoom:void 0, getProjection:function() {
  return this.projection
}, onTileUpdated:function(a, d) {
  var c = this.dynmap.getTileUrl(d);
  a.attr("src", c);
  a.show()
}, getTileName:function() {
  throw"getTileName not implemented";
}, getTileUrl:function(a, d) {
  var c = this.getTileName(a, d), b = this._cachedTileUrls[c];
  b || (this._cachedTileUrls[c] = b = this.options.dynmap.getTileUrl(c));
  return b
}, updateNamedTile:function(a) {
  var d = this._namedTiles[a];
  delete this._cachedTileUrls[a];
  d && this.updateTile(d)
}, updateTile:function(a) {
  this._loadTile(a, a.tilePoint, this._map.getZoom())
}, _addTilesFromCenterOut:function(a) {
  if(null != this._container) {
    for(var d = [], c = a.getCenter(), b = a.min.y;b <= a.max.y;b++) {
      for(var e = a.min.x;e <= a.max.x;e++) {
        e + ":" + b in this._tiles || d.push(new L.Point(e, b))
      }
    }
    d.sort(function(a, b) {
      return a.distanceTo(c) - b.distanceTo(c)
    });
    a = document.createDocumentFragment();
    this._tilesToLoad = d.length;
    b = 0;
    for(e = this._tilesToLoad;b < e;b++) {
      this._addTile(d[b], a)
    }
    this._container.appendChild(a)
  }
}, _addTile:function(a, d) {
  var c = this._getTilePos(a), b = this._map.getZoom(), e = a.x + ":" + a.y, g = this.getTileName(a, b), f = 1 << b;
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
  var h = this._createTile();
  h.tileName = g;
  h.tilePoint = a;
  L.DomUtil.setPosition(h, c);
  this._tiles[e] = h;
  this._namedTiles[g] = h;
  "tms" == this.options.scheme && (a.y = f - a.y - 1);
  this._loadTile(h, a, b);
  d.appendChild(h)
}, _loadTile:function(a, d, c) {
  function b() {
    e._loadingTiles.splice(e._loadingTiles.indexOf(a), 1);
    e._nextLoadTile()
  }
  var e = this;
  a._layer = this;
  a.onload = function(a) {
    e._tileOnLoad.apply(this, [a]);
    b()
  };
  a.onerror = function() {
    e._tileOnError.apply(this);
    b()
  };
  a.loadSrc = function() {
    e._loadingTiles.push(a);
    a.src = e.getTileUrl(d, c)
  };
  this._loadQueue.push(a);
  this._nextLoadTile()
}, _nextLoadTile:function() {
  if(!(4 < this._loadingTiles.length)) {
    var a = this._loadQueue.shift();
    a && a.loadSrc()
  }
}, _removeOtherTiles:function(a) {
  var d, c, b;
  for(b in this._tiles) {
    if(this._tiles.hasOwnProperty(b) && (d = b.split(":"), c = parseInt(d[0], 10), d = parseInt(d[1], 10), c < a.min.x || c > a.max.x || d < a.min.y || d > a.max.y)) {
      c = this._tiles[b], c.parentNode === this._container && this._container.removeChild(this._tiles[b]), delete this._namedTiles[c.tileName], delete this._tiles[b]
    }
  }
}, _updateTileSize:function() {
  var a = this._map.getZoom();
  if(this._currentzoom !== a) {
    var d = this.calculateTileSize(a);
    this._currentzoom = a;
    d !== this.options.tileSize && this.setTileSize(d)
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
  var a = this._map.getPixelBounds(), d = this.options.tileSize, c = new L.Point(Math.floor(a.min.x / d), Math.floor(a.min.y / d)), a = new L.Point(Math.floor(a.max.x / d), Math.floor(a.max.y / d)), c = new L.Bounds(c, a);
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
}, getTileInfo:function(a, d) {
  var c = Math.max(0, this.options.maxZoom - d - this.options.mapzoomin), b = 1 << c, e = b * a.x, b = b * a.y;
  return{prefix:this.options.prefix, nightday:this.options.nightandday && this.options.dynmap.serverday ? "_day" : "", scaledx:e >> 5, scaledy:b >> 5, zoom:this.zoomprefix(c), zoomprefix:0 == c ? "" : this.zoomprefix(c) + "_", x:e, y:b, fmt:this.options["image-format"] || "png"}
}});
function loadjs(a, d) {
  var c = document.createElement("script");
  c.setAttribute("src", a);
  c.setAttribute("type", "text/javascript");
  var b = !1;
  c.onload = function() {
    b || (b = !0, d())
  };
  c.onreadystatechange = function() {
    if("loaded" == c.readyState || "complete" == c.readyState) {
      c.onload()
    }
  };
  (document.head || document.getElementsByTagName("head")[0]).appendChild(c)
}
function loadcss(a, d) {
  var c = document.createElement("link");
  c.setAttribute("href", a);
  c.setAttribute("rel", "stylesheet");
  var b = !1;
  d && (c.onload = function() {
    b || (b = !0, d())
  }, c.onreadystatechange = function() {
    c.onload()
  });
  (document.head || document.getElementsByTagName("head")[0]).appendChild(c)
}
function splitArgs(a) {
  var d = a.split(" ");
  delete arguments[0];
  var c = {};
  $.each(arguments, function(a, e) {
    a && (c[e] = d[a - 1])
  });
  return c
}
function swtch(a, d, c) {
  return(d[a] || c || function() {
  })(a)
}
(function(a) {
  a.fn.scrollHeight = function() {
    return this[0].scrollHeight
  }
})($);
function Location(a, d, c, b) {
  this.world = a;
  this.x = d;
  this.y = c;
  this.z = b
}
function namedReplace(a, d) {
  for(var c = 0, b = "";;) {
    var e = a.indexOf("{", c), g = a.indexOf("}", e + 1);
    if(0 > e || 0 > g) {
      b += a.substr(c);
      break
    }
    if(e < g) {
      var f = a.substring(e + 1, g), b = b + a.substring(c, e), b = b + d[f]
    }else {
      b += a.substring(c, e - 1), b += ""
    }
    c = g + 1
  }
  return b
}
;