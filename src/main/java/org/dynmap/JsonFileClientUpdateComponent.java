package org.dynmap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.io.Reader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dynmap.web.Json;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import static org.dynmap.JSONUtils.*;
import java.nio.charset.Charset;

public class JsonFileClientUpdateComponent extends ClientUpdateComponent {
    protected long jsonInterval;
    protected long currentTimestamp = 0;
    protected long lastTimestamp = 0;
    protected long lastChatTimestamp = 0;
    protected JSONParser parser = new JSONParser();
    private boolean hidewebchatip;
    private boolean useplayerloginip;
    private boolean requireplayerloginip;
    private boolean trust_client_name;
    private boolean checkuserban;
    
    private HashMap<String,String> useralias = new HashMap<String,String>();
    private int aliasindex = 1;
    private long last_confighash;
    	
    private Charset cs_utf8 = Charset.forName("UTF-8");
    public JsonFileClientUpdateComponent(final DynmapCore core, final ConfigurationNode configuration) {
        super(core, configuration);
        final boolean allowwebchat = configuration.getBoolean("allowwebchat", false);
        jsonInterval = (long)(configuration.getFloat("writeinterval", 1) * 1000);
        hidewebchatip = configuration.getBoolean("hidewebchatip", false);
        useplayerloginip = configuration.getBoolean("use-player-login-ip", true);
        requireplayerloginip = configuration.getBoolean("require-player-login-ip", false);
        trust_client_name = configuration.getBoolean("trustclientname", false);
        checkuserban = configuration.getBoolean("block-banned-player-chat", true);

        MapManager.scheduleDelayedJob(new Runnable() {
            @Override
            public void run() {
                currentTimestamp = System.currentTimeMillis();
                if(last_confighash != core.getConfigHashcode()) {
                    writeConfiguration();
                }
                writeUpdates();
                if (allowwebchat) {
                    handleWebChat();
                }
                lastTimestamp = currentTimestamp;
                MapManager.scheduleDelayedJob(this, jsonInterval);
            }}, jsonInterval);
        
        core.events.addListener("buildclientconfiguration", new Event.Listener<JSONObject>() {
            @Override
            public void triggered(JSONObject t) {
                s(t, "jsonfile", true);
                s(t, "allowwebchat", allowwebchat);
                
                // For 'sendmessage.php'
                s(t, "webchat-interval", configuration.getFloat("webchat-interval", 5.0f));
            }
        });
        core.events.addListener("initialized", new Event.Listener<Object>() {
            @Override
            public void triggered(Object t) {
                writeConfiguration();
                writeUpdates(); /* Make sure we stay in sync */
            }
        });
        core.events.addListener("worldactivated", new Event.Listener<DynmapWorld>() {
            @Override
            public void triggered(DynmapWorld t) {
                writeConfiguration();
                writeUpdates(); /* Make sure we stay in sync */
            }
        });
    }
    
    protected File getStandaloneFile(String filename) {
        File webpath = new File(core.configuration.getString("webpath", "web"), "standalone/" + filename);
        if (webpath.isAbsolute())
            return webpath;
        else
            return new File(core.getDataFolder(), webpath.toString());
    }
    
    private static final int RETRY_LIMIT = 5;
    protected void writeConfiguration() {
        File outputFile;
        File outputTempFile;
        JSONObject clientConfiguration = new JSONObject();
        core.events.trigger("buildclientconfiguration", clientConfiguration);
        outputFile = getStandaloneFile("dynmap_config.json");
        outputTempFile = getStandaloneFile("dynmap_config.json.new");
        last_confighash = core.getConfigHashcode();
        
        int retrycnt = 0;
        boolean done = false;
        while(!done) {
            FileOutputStream fos = null;
            try {
                fos = new FileOutputStream(outputTempFile);
                fos.write(clientConfiguration.toJSONString().getBytes("UTF-8"));
                fos.close();
                fos = null;
                outputFile.delete();
                outputTempFile.renameTo(outputFile);
                done = true;
            } catch (IOException ioe) {
                if(retrycnt < RETRY_LIMIT) {
                    try { Thread.sleep(20 * (1 << retrycnt)); } catch (InterruptedException ix) {}
                    retrycnt++;
                }
                else {
                    Log.severe("Exception while writing JSON-configuration-file.", ioe);
                    done = true;
                }
            } finally {
                if(fos != null) {
                    try {
                        fos.close();
                    } catch (IOException iox) {
                    }
                    fos = null;
                }
            }
        }
    }
    
    @SuppressWarnings("unchecked")
    protected void writeUpdates() {
        File outputFile;
        File outputTempFile;
        if(core.mapManager == null) return;
        //Handles Updates
        ArrayList<DynmapWorld> wlist = new ArrayList<DynmapWorld>(core.mapManager.getWorlds());	// Grab copy of world list
        for (int windx = 0; windx < wlist.size(); windx++) {
        	DynmapWorld dynmapWorld = wlist.get(windx);
            JSONObject update = new JSONObject();
            update.put("timestamp", currentTimestamp);
            ClientUpdateEvent clientUpdate = new ClientUpdateEvent(currentTimestamp - 30000, dynmapWorld, update);
            core.events.trigger("buildclientupdate", clientUpdate);

            outputFile = getStandaloneFile("dynmap_" + dynmapWorld.getName() + ".json");
            outputTempFile = getStandaloneFile("dynmap_" + dynmapWorld.getName() + ".json.new");
            int retrycnt = 0;
            boolean done = false;
            while(!done) {
                FileOutputStream fos = null;
                try {
                    fos = new FileOutputStream(outputTempFile);
                    fos.write(Json.stringifyJson(update).getBytes("UTF-8"));
                    fos.close();
                    fos = null;
                    outputFile.delete();
                    outputTempFile.renameTo(outputFile);
                    done = true;
                } catch (IOException ioe) {
                    if(retrycnt < RETRY_LIMIT) {
                        try { Thread.sleep(20 * (1 << retrycnt)); } catch (InterruptedException ix) {}
                        retrycnt++;
                    }
                    else {
                        Log.severe("Exception while writing JSON-file.", ioe);
                        done = true;
                    }
                } finally {
                    if(fos != null) {
                        try {
                            fos.close();
                        } catch (IOException iox) {
                        }
                        fos = null;
                    }
                }
            }
            core.events.<ClientUpdateEvent>trigger("clientupdatewritten", clientUpdate);
        }
        
        core.events.<Object>trigger("clientupdateswritten", null);
    }
    
    protected void handleWebChat() {
        File webchatFile = getStandaloneFile("dynmap_webchat.json");
        if (webchatFile.exists() && lastTimestamp != 0) {
            JSONArray jsonMsgs = null;
            Reader inputFileReader = null;
            try {
                inputFileReader = new InputStreamReader(new FileInputStream(webchatFile), cs_utf8);
                jsonMsgs = (JSONArray) parser.parse(inputFileReader);
            } catch (IOException ex) {
                Log.severe("Exception while reading JSON-file.", ex);
            } catch (ParseException ex) {
                Log.severe("Exception while parsing JSON-file.", ex);
            } finally {
                if(inputFileReader != null) {
                    try {
                        inputFileReader.close();
                    } catch (IOException iox) {
                        
                    }
                    inputFileReader = null;
                }
            }

            if (jsonMsgs != null) {
                Iterator<?> iter = jsonMsgs.iterator();
                boolean init_skip = (lastChatTimestamp == 0);
                while (iter.hasNext()) {
                    JSONObject o = (JSONObject) iter.next();
                    String ts = String.valueOf(o.get("timestamp"));
                    if(ts.equals("null")) ts = "0";
                    long cts = Long.parseLong(ts);
                    if (cts > lastChatTimestamp) {
                        String name = String.valueOf(o.get("name"));
                        String ip = String.valueOf(o.get("ip"));
                        boolean isip = true;
                        lastChatTimestamp = cts;
                        if(init_skip)
                            continue;
                        if((!trust_client_name) || (name == null) || (name.equals(""))) {
                            if(ip != null)
                                name = ip;
                        }
                        if(useplayerloginip) {  /* Try to match using IPs of player logins */
                            List<String> ids = core.getIDsForIP(name);
                            if(ids != null) {
                                name = ids.get(0);
                                isip = false;
                                if(checkuserban) {
                                    if(core.getServer().isPlayerBanned(name)) {
                                        Log.info("Ignore message from '" + ip + "' - banned player (" + name + ")");
                                        return;
                                    }
                                }
                            }
                            else if(requireplayerloginip) {
                                Log.info("Ignore message from '" + name + "' - no matching player login recorded");
                                return;
                            }
                        }
                        if(hidewebchatip && isip) {
                            String n = useralias.get(name);
                            if(n == null) { /* Make ID */
                                n = String.format("web-%03d", aliasindex);
                                aliasindex++;
                                useralias.put(name, n);
                            }
                            name = n;
                        }
                        String message = String.valueOf(o.get("message"));
                        webChat(name, message);
                    }
                }
            }
        }
    }
    
    protected void webChat(String name, String message) {
        if(core.mapManager == null) return;
        // TODO: Change null to something meaningful.
        core.mapManager.pushUpdate(new Client.ChatMessage("web", null, name, message, null));
        Log.info(unescapeString(core.configuration.getString("webprefix", "\u00A2[WEB] ")) + name + ": " + unescapeString(core.configuration.getString("websuffix", "\u00A7f")) + message);
        ChatEvent event = new ChatEvent("web", name, message);
        core.events.trigger("webchat", event);
    }
    
    @Override
    public void dispose() {
        super.dispose();
    }
}
