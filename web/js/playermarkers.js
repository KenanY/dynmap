componentconstructors.playermarkers = function(b, c) {
  $(b).bind("playeradded", function(d, a) {
    var e = b.getProjection().fromLocationToLatLng(a.location);
    a.marker = new L.CustomMarker(e, {elementCreator:function() {
      var d = document.createElement("div"), e, f = b.getProjection().fromLocationToLatLng(a.location);
      a.marker.setLatLng(f);
      !1 == b.canvassupport && (c.showplayerfaces = !1);
      $(d).addClass("Marker").addClass("playerMarker").append(e = $("<img/>").addClass(c.smallplayerfaces ? "playerIconSm" : "playerIcon").attr({src:"images/player.png"})).append(f = $("<span/>").addClass(c.smallplayerfaces ? "playerNameSm" : "playerName").text(a.name));
      c.showplayerfaces && (c.smallplayerfaces ? getMinecraftHead(a.account, 16, function(a) {
        $(a).addClass("playerIconSm").prependTo(d);
        e.remove()
      }) : c.showplayerbody ? getMinecraftHead(a.account, "body", function(a) {
        $(a).addClass("playerIcon").prependTo(d);
        e.remove()
      }) : getMinecraftHead(a.account, 32, function(a) {
        $(a).addClass("playerIcon").prependTo(d);
        e.remove()
      }));
      c.showplayerhealth ? (a.healthContainer = $("<div/>").addClass(c.smallplayerfaces ? "healthContainerSm" : "healthContainer").appendTo(d), void 0 !== a.health && void 0 !== a.armor ? (a.healthBar = $("<div/>").addClass("playerHealth").css("width", 5 * (a.health / 2) + "px"), a.armorBar = $("<div/>").addClass("playerArmor").css("width", 5 * (a.armor / 2) + "px"), $("<div/>").addClass("playerHealthBackground").append(a.healthBar).appendTo(a.healthContainer), $("<div/>").addClass("playerArmorBackground").append(a.armorBar).appendTo(a.healthContainer)) : 
      a.healthContainer.css("display", "none")) : f.addClass("playerNameNoHealth");
      return d
    }});
    b.world === a.location.world && b.playermarkergroup.addLayer(a.marker)
  });
  $(b).bind("playerremoved", function(d, a) {
    b.map.hasLayer(a.marker) && b.playermarkergroup.removeLayer(a.marker)
  });
  $(b).bind("playerupdated", function(d, a) {
    if(b.world === a.location.world) {
      if(!1 == b.map.hasLayer(a.marker)) {
        b.playermarkergroup.addLayer(a.marker)
      }else {
        var e = b.getProjection().fromLocationToLatLng(a.location);
        a.marker.setLatLng(e);
        c.showplayerhealth && (void 0 !== a.health && void 0 !== a.armor ? (a.healthContainer.css("display", "block"), a.healthBar.css("width", 5 * (a.health / 2) + "px"), a.armorBar.css("width", 5 * (a.armor / 2) + "px")) : a.healthContainer.css("display", "none"))
      }
    }else {
      b.map.hasLayer(a.marker) && b.playermarkergroup.removeLayer(a.marker)
    }
  });
  $(b).bind("mapchanging", function() {
    for(var d in b.players) {
      b.playermarkergroup.removeLayer(b.players[d].marker)
    }
  });
  $(b).bind("mapchanged", function() {
    for(var d in b.players) {
      var a = b.players[d];
      if(b.world === a.location.world) {
        !1 == b.map.hasLayer(a.marker) && b.playermarkergroup.addLayer(a.marker);
        var c = b.getProjection().fromLocationToLatLng(a.location);
        a.marker.setLatLng(c)
      }else {
        b.map.hasLayer(a.marker) && b.playermarkergroup.removeLayer(a.marker)
      }
    }
  });
  b.playermarkergroup = new L.LayerGroup;
  c.hidebydefault || b.map.addLayer(b.playermarkergroup);
  b.addToLayerSelector(b.playermarkergroup, c.label || "Players", c.layerprio || 0)
};