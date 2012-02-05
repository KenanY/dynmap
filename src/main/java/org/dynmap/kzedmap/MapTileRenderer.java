package org.dynmap.kzedmap;

import java.io.File;

<<<<<<< HEAD
=======
import org.dynmap.ConfigurationNode;
>>>>>>> cbccbad51ec6ccf49132b373ca50c0da24f2e868
import org.dynmap.DynmapWorld;
import org.dynmap.utils.MapChunkCache;

import org.json.simple.JSONObject;

public interface MapTileRenderer {
    String getPrefix();
    String getName();

    boolean render(MapChunkCache cache, KzedMapTile tile, File outputFile);

    void buildClientConfiguration(JSONObject worldObject, DynmapWorld w, KzedMap map);
    
    boolean isBiomeDataNeeded();
    boolean isRawBiomeDataNeeded();
    boolean isNightAndDayEnabled();
<<<<<<< HEAD
=======
    
    ConfigurationNode saveConfiguration();
>>>>>>> cbccbad51ec6ccf49132b373ca50c0da24f2e868
}
