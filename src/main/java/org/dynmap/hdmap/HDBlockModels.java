package org.dynmap.hdmap;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dynmap.ConfigurationNode;
import org.dynmap.Log;

/**
 * Custom block models - used for non-cube blocks to represent the physical volume associated with the block
 * Used by perspectives to determine if rays have intersected a block that doesn't occupy its whole block
 */
public class HDBlockModels {
    private int blockid;
    private int databits;
    private long blockflags[];
    private int nativeres;
    private HashMap<Integer, short[]> scaledblocks;
    private static int linkalg[] = new int[256];
    private static int linkmap[][] = new int[256][];
    
    private static HashMap<Integer, HDBlockModels> models_by_id_data = new HashMap<Integer, HDBlockModels>();
    
    public static class HDScaledBlockModels {
        private short[][][] modelvectors;
        
        public final short[] getScaledModel(int blocktype, int blockdata, int blockrenderdata) {
            if(modelvectors[blocktype] == null) {
                return null;
            }
            return modelvectors[blocktype][(blockrenderdata>=0)?blockrenderdata:blockdata];
        }
    }
    
    private static HashMap<Integer, HDScaledBlockModels> scaled_models_by_scale = new HashMap<Integer, HDScaledBlockModels>();
    
    /**
     * Block definition - positions correspond to Bukkit coordinates (+X is south, +Y is up, +Z is west)
     * @param blockid - block ID
     * @param databits - bitmap of block data bits matching this model (bit N is set if data=N would match)
     * @param nativeres - native subblocks per edge of cube (up to 64)
     * @param blockflags - array of native^2 long integers representing volume of block (bit X of element (nativeres*Y+Z) is set if that subblock is filled)
     *    if array is short, other elements area are assumed to be zero (fills from bottom of block up)
     */
    public HDBlockModels(int blockid, int databits, int nativeres, long[] blockflags) {
        this.blockid = blockid;
        this.databits = databits;
        this.nativeres = nativeres;
        this.blockflags = new long[nativeres * nativeres];
        System.arraycopy(blockflags, 0, this.blockflags, 0, blockflags.length);
        for(int i = 0; i < 16; i++) {
            if((databits & (1<<i)) != 0) {
                models_by_id_data.put((blockid<<4)+i, this);
            }
        }
    }
    /**
     * Test if given native block is filled
     */
    public final boolean isSubblockSet(int x, int y, int z) {
        return ((blockflags[nativeres*y+z] & (1 << x)) != 0);
    }
    /**
     * Set subblock value
     */
    public final void setSubblock(int x, int y, int z, boolean isset) {
        if(isset)
            blockflags[nativeres*y+z] |= (1 << x);
        else
            blockflags[nativeres*y+z] &= ~(1 << x);            
    }
    /**
     * Get link algorithm
     * @param blkid - block ID
     * @return 0=no link alg
     */
    public static final int getLinkAlgID(int blkid) {
        return linkalg[blkid];
    }
    /**
     * Get link block IDs
     * @param blkid - block ID
     * @return array of block IDs to link with
     */
    public static final int[] getLinkIDs(int blkid) {
        return linkmap[blkid];
    }
    /**
     * Get scaled map of block: will return array of alpha levels, corresponding to how much of the
     * scaled subblocks are occupied by the original blocks (indexed by Y*res*res + Z*res + X)
     * @param res - requested scale (res subblocks per edge of block)
     * @return array of alpha values (0-255), corresponding to resXresXres subcubes of block
     */
    public short[] getScaledMap(int res) {
        if(scaledblocks == null) { scaledblocks = new HashMap<Integer, short[]>(); }
        short[] map = scaledblocks.get(Integer.valueOf(res));
        if(map == null) {
            map = new short[res*res*res];
            if(res == nativeres) {
                for(int i = 0; i < blockflags.length; i++) {
                    for(int j = 0; j < nativeres; j++) {
                        if((blockflags[i] & (1 << j)) != 0)
                            map[res*i+j] = 255;
                    }
                }
            }
            /* If scaling from smaller sub-blocks to larger, each subblock contributes to 1-2 blocks
             * on each axis:  need to calculate crossovers for each, and iterate through smaller
             * blocks to accumulate contributions
             */
            else if(res > nativeres) {
                int weights[] = new int[res];
                int offsets[] = new int[res];
                /* LCM of resolutions is used as length of line (res * nativeres)
                 * Each native block is (res) long, each scaled block is (nativeres) long
                 * Each scaled block overlaps 1 or 2 native blocks: starting with native block 'offsets[]' with
                 * 'weights[]' of its (res) width in the first, and the rest in the second
                 */
                for(int v = 0, idx = 0; v < res*nativeres; v += nativeres, idx++) {
                    offsets[idx] = (v/res); /* Get index of the first native block we draw from */
                    if((v+nativeres-1)/res == offsets[idx]) {   /* If scaled block ends in same native block */
                        weights[idx] = nativeres;
                    }
                    else {  /* Else, see how much is in first one */
                        weights[idx] = (offsets[idx] + res) - v;
                        weights[idx] = (offsets[idx]*res + res) - v;
                    }
                }
                /* Now, use weights and indices to fill in scaled map */
                for(int y = 0, off = 0; y < res; y++) {
                    int ind_y = offsets[y];
                    int wgt_y = weights[y];
                    for(int z = 0; z < res; z++) {
                        int ind_z = offsets[z];
                        int wgt_z = weights[z];
                        for(int x = 0; x < res; x++, off++) {
                            int ind_x = offsets[x];
                            int wgt_x = weights[x];
                            int raw_w = 0;
                            for(int xx = 0; xx < 2; xx++) {
                                int wx = (xx==0)?wgt_x:(nativeres-wgt_x);
                                if(wx == 0) continue;
                                for(int yy = 0; yy < 2; yy++) {
                                    int wy = (yy==0)?wgt_y:(nativeres-wgt_y);
                                    if(wy == 0) continue;
                                    for(int zz = 0; zz < 2; zz++) {
                                        int wz = (zz==0)?wgt_z:(nativeres-wgt_z);
                                        if(wz == 0) continue;
                                        if(isSubblockSet(ind_x+xx, ind_y+yy, ind_z+zz)) {
                                            raw_w += wx*wy*wz;
                                        }
                                    }
                                }
                            }
                            map[off] = (short)((255*raw_w) / (nativeres*nativeres*nativeres));
                            if(map[off] > 255) map[off] = 255;
                            if(map[off] < 0) map[off] = 0;
                        }
                    }
                }
            }
            else {  /* nativeres > res */
                int weights[] = new int[nativeres];
                int offsets[] = new int[nativeres];
                /* LCM of resolutions is used as length of line (res * nativeres)
                 * Each native block is (res) long, each scaled block is (nativeres) long
                 * Each native block overlaps 1 or 2 scaled blocks: starting with scaled block 'offsets[]' with
                 * 'weights[]' of its (res) width in the first, and the rest in the second
                 */
                for(int v = 0, idx = 0; v < res*nativeres; v += res, idx++) {
                    offsets[idx] = (v/nativeres); /* Get index of the first scaled block we draw to */
                    if((v+res-1)/nativeres == offsets[idx]) {   /* If native block ends in same scaled block */
                        weights[idx] = res;
                    }
                    else {  /* Else, see how much is in first one */
                        weights[idx] = (offsets[idx]*nativeres + nativeres) - v;
                    }
                }
                /* Now, use weights and indices to fill in scaled map */
                long accum[] = new long[map.length];
                for(int y = 0; y < nativeres; y++) {
                    int ind_y = offsets[y];
                    int wgt_y = weights[y];
                    for(int z = 0; z < nativeres; z++) {
                        int ind_z = offsets[z];
                        int wgt_z = weights[z];
                        for(int x = 0; x < nativeres; x++) {
                            if(isSubblockSet(x, y, z)) {
                                int ind_x = offsets[x];
                                int wgt_x = weights[x];
                                for(int xx = 0; xx < 2; xx++) {
                                    int wx = (xx==0)?wgt_x:(res-wgt_x);
                                    if(wx == 0) continue;
                                    for(int yy = 0; yy < 2; yy++) {
                                        int wy = (yy==0)?wgt_y:(res-wgt_y);
                                        if(wy == 0) continue;
                                        for(int zz = 0; zz < 2; zz++) {
                                            int wz = (zz==0)?wgt_z:(res-wgt_z);
                                            if(wz == 0) continue;
                                            accum[(ind_y+yy)*res*res + (ind_z+zz)*res + (ind_x+xx)] +=
                                                wx*wy*wz;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for(int i = 0; i < map.length; i++) {
                    map[i] = (short)(accum[i]*255/nativeres/nativeres/nativeres);
                    if(map[i] > 255) map[i] = 255;                            
                    if(map[i] < 0) map[i] = 0;
                }
            }
            scaledblocks.put(Integer.valueOf(res), map);
        }
        return map;
    }
    
    /**
     * Get scaled set of models for all modelled blocks 
     * @param scale
     * @return
     */
    public static HDScaledBlockModels   getModelsForScale(int scale) {
        HDScaledBlockModels model = scaled_models_by_scale.get(Integer.valueOf(scale));
        if(model == null) {
            model = new HDScaledBlockModels();
            short[][][] blockmodels = new short[256][][];
            for(HDBlockModels m : models_by_id_data.values()) {
                short[][] row = blockmodels[m.blockid];
                if(row == null) {
                    row = new short[16][];
                    blockmodels[m.blockid] = row; 
                }
                short[] smod = m.getScaledMap(scale);
                /* See if scaled model is full block : much faster to not use it if it is */
                if(smod != null) {
                    boolean keep = false;
                    for(int i = 0; (!keep) && (i < smod.length); i++) {
                        if(smod[i] == 0) keep = true;
                    }
                    if(keep) {
                        for(int i = 0; i < 16; i++) {
                            if((m.databits & (1 << i)) != 0) {
                                row[i] = smod;
                            }
                        }
                    }
                }
            }
            model.modelvectors = blockmodels;
            scaled_models_by_scale.put(scale, model);
        }
        return model;
    }
    /**
     * Load models 
     */
    public static void loadModels(File datadir, ConfigurationNode config) {
        /* Reset models-by-ID-Data cache */
        models_by_id_data.clear();
        /* Reset scaled models by scale cache */
        scaled_models_by_scale.clear();
        
        /* Load block models */
        InputStream in = TexturePack.class.getResourceAsStream("/models.txt");
        if(in != null) {
            loadModelFile(in, "models.txt", config);
            try { in.close(); } catch (IOException iox) {} in = null;
        }
        File customdir = new File(datadir, "renderdata");
        String[] files = customdir.list();
        if(files != null) {
            for(String fn : files) {
                if(fn.endsWith("-models.txt") == false)
                    continue;
                File custom = new File(customdir, fn);
                if(custom.canRead()) {
                    try {
                        in = new FileInputStream(custom);
                        loadModelFile(in, custom.getPath(), config);
                    } catch (IOException iox) {
                        Log.severe("Error loading " + custom.getPath());
                    } finally {
                        if(in != null) { 
                            try { in.close(); } catch (IOException iox) {}
                            in = null;
                        }
                    }
                }
            }
        }
    }
    private static Integer getIntValue(Map<String,Integer> vars, String val) throws NumberFormatException {
        if(Character.isLetter(val.charAt(0))) {
            Integer v = vars.get(val);
            if(v == null)
                throw new NumberFormatException("invalid ID - " + val);
            return v;
        }
        else {
            return Integer.valueOf(val);
        }
    }
    /**
     * Load models from file
     */
    private static void loadModelFile(InputStream in, String fname, ConfigurationNode config) {
        LineNumberReader rdr = null;
        int cnt = 0;
        try {
            String line;
            ArrayList<HDBlockModels> modlist = new ArrayList<HDBlockModels>();
            HashMap<String,Integer> varvals = new HashMap<String,Integer>();
            int layerbits = 0;
            int rownum = 0;
            int scale = 0;
            rdr = new LineNumberReader(new InputStreamReader(in));
            while((line = rdr.readLine()) != null) {
                if(line.startsWith("block:")) {
                    ArrayList<Integer> blkids = new ArrayList<Integer>();
                    int databits = 0;
                    scale = 0;
                    line = line.substring(6);
                    String[] args = line.split(",");
                    for(String a : args) {
                        String[] av = a.split("=");
                        if(av.length < 2) continue;
                        if(av[0].equals("id")) {
                            blkids.add(getIntValue(varvals,av[1]));
                        }
                        else if(av[0].equals("data")) {
                            if(av[1].equals("*"))
                                databits = 0xFFFF;
                            else
                                databits |= (1 << getIntValue(varvals,av[1]));
                        }
                        else if(av[0].equals("scale")) {
                            scale = Integer.parseInt(av[1]);
                        }
                    }
                    /* If we have everything, build block */
                    if((blkids.size() > 0) && (databits != 0) && (scale > 0)) {
                        modlist.clear();
                        for(Integer id : blkids) {
                            modlist.add(new HDBlockModels(id.intValue(), databits, scale, new long[0]));
                            cnt++;
                        }
                    }
                    else {
                        Log.severe("Block model missing required parameters = line " + rdr.getLineNumber() + " of " + fname);
                    }
                    layerbits = 0;
                }
                else if(line.startsWith("layer:")) {
                    line = line.substring(6);
                    String args[] = line.split(",");
                    layerbits = 0;
                    rownum = 0;
                    for(String a: args) {
                        layerbits |= (1 << Integer.parseInt(a));
                    }
                }
                else if(line.startsWith("rotate:")) {
                    line = line.substring(7);
                    String args[] = line.split(",");
                    int id = -1;
                    int data = -1;
                    int rot = -1;
                    for(String a : args) {
                        String[] av = a.split("=");
                        if(av.length < 2) continue;
                        if(av[0].equals("id")) { id = getIntValue(varvals,av[1]); }
                        if(av[0].equals("data")) { data = getIntValue(varvals,av[1]); }
                        if(av[0].equals("rot")) { rot = Integer.parseInt(av[1]); }
                    }
                    /* get old model to be rotated */
                    HDBlockModels mod = models_by_id_data.get((id<<4)+data);
                    if((mod != null) && ((rot%90) == 0)) {
                        for(int x = 0; x < scale; x++) {
                            for(int y = 0; y < scale; y++) {
                                for(int z = 0; z < scale; z++) {
                                    if(mod.isSubblockSet(x, y, z) == false) continue;
                                    switch(rot) {
                                        case 0:
                                            for(HDBlockModels bm : modlist)
                                                bm.setSubblock(x, y, z, true);
                                            break;
                                        case 90:
                                            for(HDBlockModels bm : modlist)
                                                bm.setSubblock(scale-z-1, y, x, true);
                                            break;
                                        case 180:
                                            for(HDBlockModels bm : modlist)
                                                bm.setSubblock(scale-x-1, y, scale-z-1, true);
                                            break;
                                        case 270:
                                            for(HDBlockModels bm : modlist)
                                                bm.setSubblock(z, y, scale-x-1, true);
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
                else if(line.startsWith("linkmap:")) {
                    ArrayList<Integer> blkids = new ArrayList<Integer>();
                    line = line.substring(8);
                    String[] args = line.split(",");
                    List<Integer> map = new ArrayList<Integer>();
                    int linktype = 0;
                    for(String a : args) {
                        String[] av = a.split("=");
                        if(av.length < 2) continue;
                        if(av[0].equals("id")) {
                            blkids.add(getIntValue(varvals,av[1]));
                        }
                        else if(av[0].equals("linkalg")) {
                            linktype = Integer.parseInt(av[1]);
                        }
                        else if(av[0].equals("linkid")) {
                            map.add(getIntValue(varvals,av[1]));
                        }
                    }
                    if(linktype > 0) {
                        int[] mapids = new int[map.size()];
                        for(int i = 0; i < mapids.length; i++)
                            mapids[i] = map.get(i);
                        for(Integer bid : blkids) {
                            linkalg[bid] = linktype;
                            linkmap[bid] = mapids;
                        }
                    }
                }
                else if(line.startsWith("#") || line.startsWith(";")) {
                }
                else if(line.startsWith("enabled:")) {  /* Test if texture file is enabled */
                    line = line.substring(8).trim();
                    if(line.startsWith("true")) {   /* We're enabled? */
                        /* Nothing to do - keep processing */
                    }
                    else if(line.startsWith("false")) { /* Disabled */
                        return; /* Quit */
                    }
                    /* If setting is not defined or false, quit */
                    else if(config.getBoolean(line, false) == false) {
                        return;
                    }
                    else {
                        Log.info(line + " models enabled");
                    }
                }
                else if(line.startsWith("var:")) {  /* Test if variable declaration */
                    line = line.substring(4).trim();
                    String args[] = line.split(",");
                    for(int i = 0; i < args.length; i++) {
                        String[] v = args[i].split("=");
                        if(v.length < 2) {
                            Log.severe("Format error - line " + rdr.getLineNumber() + " of " + fname);
                            return;
                        }
                        try {
                            int val = Integer.valueOf(v[1]);    /* Parse default value */
                            int parmval = config.getInteger(v[0], val); /* Read value, with applied default */
                            varvals.put(v[0], parmval); /* And save value */
                        } catch (NumberFormatException nfx) {
                            Log.severe("Format error - line " + rdr.getLineNumber() + " of " + fname);
                            return;
                        }
                    }
                }
                else if(layerbits != 0) {   /* If we're working pattern lines */
                    /* Layerbits determine Y, rows count from North to South (X=0 to X=N-1), columns Z are West to East (N-1 to 0) */
                    for(int i = 0; (i < scale) && (i < line.length()); i++) {
                        if(line.charAt(i) == '*') { /* If an asterix, set flag */
                            for(int y = 0; y < scale; y++) {
                                if((layerbits & (1<<y)) != 0) {
                                    for(HDBlockModels mod : modlist) {
                                        mod.setSubblock(rownum, y, scale-i-1, true);
                                    }
                                }
                            }
                        }
                    }
                    /* See if we're done with layer */
                    rownum++;
                    if(rownum >= scale) {
                        rownum = 0;
                        layerbits = 0;
                    }
                }
            }
            Log.verboseinfo("Loaded " + cnt + " block models from " + fname);
        } catch (IOException iox) {
            Log.severe("Error reading models.txt - " + iox.toString());
        } catch (NumberFormatException nfx) {
            Log.severe("Format error - line " + rdr.getLineNumber() + " of " + fname);
        } finally {
            if(rdr != null) {
                try {
                    rdr.close();
                    rdr = null;
                } catch (IOException e) {
                }
            }
        }
    }
}
