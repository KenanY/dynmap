var KzedProjection = DynmapProjection.extend({fromLocationToLatLng:function(a) {
  var d = a.x, b = a.z, c = 1 << this.options.mapzoomout;
  return new L.LatLng((128 - (d + b)) / c, (d - b - (a.y - 127)) / c, !0)
}, fromLatLngToLocation:function(a, d) {
  var b = 1 << this.options.mapzoomout, c = 128 - a.lat * b, b = (c + a.lng * b + (d - 127)) / 2;
  return{x:b, y:d, z:c - b}
}}), KzedMapType = DynmapTileLayer.extend({options:{minZoom:0, maxZoom:4, errorTileUrl:"images/blank.png", continuousWorld:!0}, initialize:function(a) {
  a.maxZoom = a.mapzoomin + a.mapzoomout;
  L.Util.setOptions(this, a);
  this.projection = new KzedProjection({mapzoomout:this.options.mapzoomout})
}, getTileName:function(a, d) {
  this.getTileInfo(a, d);
  return namedReplace(this.options.bigmap ? "{zprefix}{nightday}/{scaledx}_{scaledy}/{zoomprefix}{x}_{y}.png" : "{zoom}{prefix}{nightday}_{x}_{y}.png", this.getTileInfo(a, d))
}, getTileInfo:function(a, d) {
  var b = Math.max(0, this.options.maxZoom - d - this.options.mapzoomin), c = 1 << b, e = 128 * -c * a.x, c = 128 * c * a.y;
  return{prefix:this.options.prefix, nightday:this.options.nightandday && this.options.dynmap.serverday ? "_day" : "", scaledx:e >> 12, scaledy:c >> 12, zoom:this.zoomprefix(b), zoomprefix:2 > b ? "" : this.zoomprefix(b - 1) + "_", zprefix:0 == b ? this.options.prefix : "z" + this.options.prefix, x:e, y:c}
}});
maptypes.KzedMapType = function(a) {
  return new KzedMapType(a)
};