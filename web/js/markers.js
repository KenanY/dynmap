var dynmapmarkersets = {};
componentconstructors.markers = function(e, n) {
  function r() {
    $.each(dynmapmarkersets, function(d, a) {
      $.each(a.markers, function(c, d) {
        a.layergroup.removeLayer(d.our_marker)
      });
      a.markers = {};
      $.each(a.areas, function(c, d) {
        a.layergroup.removeLayer(d.our_area)
      });
      a.areas = {}
    })
  }
  function o(d) {
    r();
    $.getJSON(e.options.tileUrl + "_markers_/marker_" + d + ".json", function(a) {
      var c = a.timestamp;
      $.each(a.sets, function(a, b) {
        var d = dynmapmarkersets[a];
        d ? (d.label != b.label && (d.label = b.label, e.addToLayerSelector(d.layergroup, d.label, d.layerprio || 0)), d.markers = {}, d.areas = {}, d.hide = b.hide, d.timestamp = c) : (d = {id:a, label:b.label, hide:b.hide, layerprio:b.layerprio, minzoom:b.minzoom, markers:{}, areas:{}}, p(d, c));
        dynmapmarkersets[a] = d;
        $.each(b.markers, function(a, b) {
          d.markers[a] = {label:b.label, markup:b.markup, x:b.x, y:b.y, z:b.z, icon:b.icon, desc:b.desc, dim:b.dim};
          q(d, d.markers[a], c)
        });
        $.each(b.areas, function(a, b) {
          d.areas[a] = {label:b.label, markup:b.markup, desc:b.desc, x:b.x, z:b.z, ytop:b.ytop, ybottom:b.ybottom, color:b.color, weight:b.weight, opacity:b.opacity, fillcolor:b.fillcolor, fillopacity:b.fillopacity};
          m(d, d.areas[a], c)
        })
      })
    })
  }
  function i(d) {
    return e.getProjection().fromLocationToLatLng({x:d.x, y:d.y, z:d.z})
  }
  function q(d, a, c) {
    var h = i(a);
    a.our_marker = new L.CustomMarker(h, {elementCreator:function() {
      var b = document.createElement("div"), c = i(a);
      a.our_marker.setLatLng(c);
      $(b).addClass("Marker").addClass("mapMarker").append($("<img/>").addClass("markerIcon" + a.dim).attr({src:e.options.tileUrl + "_markers_/" + a.icon + ".png"}));
      a.markup ? $(b).append($("<span/>").addClass(n.showlabel ? "markerName-show" : "markerName").addClass("markerName_" + d.id).addClass("markerName" + a.dim).append(a.label)) : "" != a.label && $(b).append($("<span/>").addClass(n.showlabel ? "markerName-show" : "markerName").addClass("markerName_" + d.id).addClass("markerName" + a.dim).text(a.label));
      return b
    }});
    a.timestamp = c;
    a.desc && (c = document.createElement("div"), $(c).addClass("MarkerPopup").append(a.desc), a.our_marker.bindPopup(c, {}));
    (1 > d.minzoom || e.map.getZoom() >= d.minzoom) && d.layergroup.addLayer(a.our_marker)
  }
  function p(d, a) {
    d.layergroup = new L.LayerGroup;
    d.timestamp = a;
    d.hide || e.map.addLayer(d.layergroup);
    e.addToLayerSelector(d.layergroup, d.label, d.layerprio || 0)
  }
  function m(d, a, c) {
    var h = {color:a.color, opacity:a.opacity, weight:a.weight, fillOpacity:a.fillopacity, fillColor:a.fillcolor, smoothFactor:0};
    a.our_area && e.map.hasLayer(a.our_area) && d.layergroup.removeLayer(a.our_area);
    if(2 == a.x.length) {
      h = a.ytop == a.ybottom ? new L.Polygon([latlng(a.x[1], a.ybottom, a.z[1]), latlng(a.x[0], a.ybottom, a.z[1]), latlng(a.x[0], a.ybottom, a.z[0]), latlng(a.x[1], a.ybottom, a.z[0])], h) : new L.MultiPolygon([[latlng(a.x[1], a.ybottom, a.z[1]), latlng(a.x[0], a.ybottom, a.z[1]), latlng(a.x[0], a.ybottom, a.z[0]), latlng(a.x[1], a.ybottom, a.z[0])], [latlng(a.x[1], a.ytop, a.z[1]), latlng(a.x[0], a.ytop, a.z[1]), latlng(a.x[0], a.ytop, a.z[0]), latlng(a.x[1], a.ytop, a.z[0])], [latlng(a.x[1], 
      a.ybottom, a.z[1]), latlng(a.x[1], a.ytop, a.z[1]), latlng(a.x[0], a.ytop, a.z[1]), latlng(a.x[0], a.ybottom, a.z[1])], [latlng(a.x[0], a.ybottom, a.z[1]), latlng(a.x[0], a.ytop, a.z[1]), latlng(a.x[0], a.ytop, a.z[0]), latlng(a.x[0], a.ybottom, a.z[0])], [latlng(a.x[1], a.ybottom, a.z[0]), latlng(a.x[1], a.ytop, a.z[0]), latlng(a.x[0], a.ytop, a.z[0]), latlng(a.x[0], a.ybottom, a.z[0])], [latlng(a.x[1], a.ybottom, a.z[1]), latlng(a.x[1], a.ytop, a.z[1]), latlng(a.x[1], a.ytop, a.z[0]), latlng(a.x[1], 
      a.ybottom, a.z[0])]], h)
    }else {
      if(a.ytop == a.ybottom) {
        var b = a.x, k = a.ybottom, l = a.z, f = [], g;
        for(g = 0;g < b.length;g++) {
          f[g] = latlng(b[g], k, l[g])
        }
        h = new L.Polygon(f, h)
      }else {
        var b = a.x, j = a.ytop, m = a.ybottom, i = a.z, k = [], l = [];
        g = [];
        for(f = 0;f < b.length;f++) {
          k[f] = latlng(b[f], j, i[f]), l[f] = latlng(b[f], m, i[f])
        }
        for(f = 0;f < b.length;f++) {
          j = [], j[0] = k[f], j[1] = l[f], j[2] = l[(f + 1) % b.length], j[3] = k[(f + 1) % b.length], g[f] = j
        }
        g[b.length] = l;
        g[b.length + 1] = k;
        h = new L.MultiPolygon(g, h)
      }
    }
    a.our_area = h;
    a.timestamp = c;
    "" != a.label && (c = document.createElement("span"), a.desc ? $(c).addClass("AreaPopup").append(a.desc) : a.markup ? $(c).addClass("AreaPopup").append(a.label) : $(c).text(a.label), a.our_area.bindPopup($(c).html(), {}));
    (1 > d.minzoom || e.map.getZoom() >= d.minzoom) && d.layergroup.addLayer(a.our_area)
  }
  latlng = function(d, a, c) {
    return e.getProjection().fromLocationToLatLng(new Location(void 0, d, a, c))
  };
  $(e).bind("component.markers", function(d, a) {
    if("markerupdated" == a.msg) {
      var c = dynmapmarkersets[a.set].markers[a.id];
      c && c.our_marker && (dynmapmarkersets[a.set].layergroup.removeLayer(c.our_marker), delete c.our_marker);
      c = {x:a.x, y:a.y, z:a.z, icon:a.icon, label:a.label, markup:a.markup, desc:a.desc, dim:a.dim || "16x16"};
      dynmapmarkersets[a.set].markers[a.id] = c;
      q(dynmapmarkersets[a.set], c, a.timestamp)
    }else {
      if("markerdeleted" == a.msg) {
        (c = dynmapmarkersets[a.set].markers[a.id]) && c.our_marker && dynmapmarkersets[a.set].layergroup.removeLayer(c.our_marker), delete dynmapmarkersets[a.set].markers[a.id]
      }else {
        if("setupdated" == a.msg) {
          if(dynmapmarkersets[a.id]) {
            if(dynmapmarkersets[a.id].label != a.label || dynmapmarkersets[a.id].layerprio != a.layerprio) {
              dynmapmarkersets[a.id].label = a.label, dynmapmarkersets[a.id].layerprio = a.layerprio, e.addToLayerSelector(dynmapmarkersets[a.id].layergroup, dynmapmarkersets[a.id].label, dynmapmarkersets[a.id].layerprio || 0)
            }
            dynmapmarkersets[a.id].minzoom != a.minzoom && (dynmapmarkersets[a.id].minzoom = a.minzoom)
          }else {
            dynmapmarkersets[a.id] = {id:a.id, label:a.label, layerprio:a.layerprio, minzoom:a.minzoom, markers:{}}, p(dynmapmarkersets[a.id])
          }
        }else {
          if("setdeleted" == a.msg) {
            dynmapmarkersets[a.id] && (e.removeFromLayerSelector(dynmapmarkersets[a.id].layergroup), delete dynmapmarkersets[a.id].layergroup, delete dynmapmarkersets[a.id])
          }else {
            if("areaupdated" == a.msg) {
              if((c = dynmapmarkersets[a.set].areas[a.id]) && c.our_area) {
                dynmapmarkersets[a.set].layergroup.removeLayer(c.our_area), delete c.our_area
              }
              c = {x:a.x, ytop:a.ytop, ybottom:a.ybottom, z:a.z, label:a.label, markup:a.markup, desc:a.desc, color:a.color, weight:a.weight, opacity:a.opacity, fillcolor:a.fillcolor, fillopacity:a.fillopacity};
              dynmapmarkersets[a.set].areas[a.id] = c;
              m(dynmapmarkersets[a.set], c, a.timestamp)
            }else {
              "areadeleted" == a.msg && ((c = dynmapmarkersets[a.set].areas[a.id]) && c.our_area && dynmapmarkersets[a.set].layergroup.removeLayer(c.our_area), delete dynmapmarkersets[a.set].areas[a.id])
            }
          }
        }
      }
    }
  });
  $(e).bind("mapchanging", function() {
    $.each(dynmapmarkersets, function(d, a) {
      $.each(a.markers, function(c, d) {
        a.layergroup.removeLayer(d.our_marker)
      });
      $.each(a.areas, function(c, d) {
        a.layergroup.removeLayer(d.our_area)
      })
    })
  });
  $(e).bind("mapchanged", function() {
    var d = e.map.getZoom();
    $.each(dynmapmarkersets, function(a, c) {
      if(1 > c.minzoom || d >= c.minzoom) {
        $.each(c.markers, function(a, b) {
          var b = c.markers[a], d = i(b);
          b.our_marker.setLatLng(d);
          !1 == e.map.hasLayer(b.our_marker) && c.layergroup.addLayer(b.our_marker)
        }), $.each(c.areas, function(a, b) {
          m(c, b, b.timestamp)
        })
      }
    })
  });
  $(e).bind("zoomchanged", function() {
    var d = e.map.getZoom();
    $.each(dynmapmarkersets, function(a, c) {
      0 < c.minzoom && (d >= c.minzoom ? ($.each(c.markers, function(a, b) {
        var b = c.markers[a], d = i(b);
        b.our_marker.setLatLng(d);
        !1 == e.map.hasLayer(b.our_marker) && c.layergroup.addLayer(b.our_marker)
      }), $.each(c.areas, function(a, b) {
        e.map.hasLayer(b.our_area) && c.layergroup.removeLayer(b.our_area);
        m(c, b, b.timestamp)
      })) : ($.each(c.markers, function(a, b) {
        c.layergroup.removeLayer(b.our_marker)
      }), $.each(c.areas, function(a, b) {
        c.layergroup.removeLayer(b.our_area)
      })))
    })
  });
  $(e).bind("worldchanged", function() {
    o(this.world.name)
  });
  o(e.world.name)
};