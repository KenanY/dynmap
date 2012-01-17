package org.dynmap.kzedmap;

import org.dynmap.Color;
import org.dynmap.ConfigurationNode;
import org.dynmap.DynmapCore;
import org.dynmap.DynmapWorld;
import org.dynmap.utils.MapIterator;
import org.dynmap.utils.MapIterator.BlockStep;

public class CaveTileRenderer extends DefaultTileRenderer {
	private boolean iflit;
    public CaveTileRenderer(DynmapCore core, ConfigurationNode configuration) {
        super(core, configuration);
        iflit = configuration.getBoolean("onlyiflit", false);
    }

    public boolean isNightAndDayEnabled() { return false; }

    @Override
    protected void scan(DynmapWorld world, int seq, boolean isnether, final Color result, final Color result_day,
        MapIterator mapiter) {
        boolean air = true;
        int emitted = 0;
        result.setTransparent();
        for (;;) {
            if (mapiter.getY() < 0)
                return;

            int id = mapiter.getBlockTypeID();
            if(isnether) {    /* Make ceiling into air in nether */
                if(id != 0)
                    id = 0;
                else
                    isnether = false;
            }
            if(iflit && (!air))
                emitted = mapiter.getBlockEmittedLight();

            switch (seq) {
            case 0:
                mapiter.stepPosition(BlockStep.X_MINUS);
                break;
            case 1:
            case 3:
                mapiter.stepPosition(BlockStep.Y_MINUS);
                break;
            case 2:
                mapiter.stepPosition(BlockStep.Z_PLUS);
                break;
            }

            seq = (seq + 1) & 3;

            switch (id) {
            case 17:
            case 18:
            case 20:
            case 64:
            case 71:
            case 78:
            case 79:
                id = 0;
                break;
            default:
            }

            if (id != 0) {
                air = false;
                continue;
            }

            if (id == 0 && !air) {
            	if(iflit && (emitted == 0)) {
            		continue;
            	}
                int cr, cg, cb;
                int mult = 256;

                if (mapiter.getY() < 64) {
                    cr = 0;
                    cg = 64 + mapiter.getY() * 3;
                    cb = 255 - mapiter.getY() * 4;
                } else {
                    cr = (mapiter.getY() - 64) * 4;
                    cg = 255;
                    cb = 0;
                }

                switch (seq) {
                case 0:
                    mult = 224;
                    break;
                case 1:
                    mult = 256;
                    break;
                case 2:
                    mult = 192;
                    break;
                case 3:
                    mult = 160;
                    break;
                }

                cr = cr * mult / 256;
                cg = cg * mult / 256;
                cb = cb * mult / 256;

                result.setRGBA(cr, cg, cb, 255);
                return;
            }
        }
    }
}
