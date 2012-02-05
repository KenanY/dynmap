componentconstructors.link = function(c) {
  var d = new (L.Class.extend({options:{position:L.Control.Position.BOTTOM_LEFT}, onAdd:function(b) {
    this._map = b;
    this._container = L.DomUtil.create("div", "dynmap-link");
    this._linkButton = this._createButton("Link", "dynmap-link-button", this._follow, this);
    this._container.appendChild(this._linkButton)
  }, getContainer:function() {
    return this._container
  }, getPosition:function() {
    return this.options.position
  }, _createButton:function(b, d, e, f) {
    var a = document.createElement("a");
    a.href = "#";
    a.title = b;
    a.className = d;
    a.onmouseover = function() {
      a.href = c.getLink()
    };
    L.DomEvent.disableClickPropagation(a);
    L.DomEvent.addListener(a, "click", L.DomEvent.preventDefault);
    L.DomEvent.addListener(a, "click", e, f);
    return a
  }, _follow:function() {
    var b = c.getLink();
    window.location = b
  }}));
  c.map.addControl(d)
};