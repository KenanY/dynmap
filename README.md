# Dynmap - Realtime Minecraft maps

## Fork

This is a fork of the [main Dynmap repository](https://github.com/webbukkit/dynmap). This fork focuses on the web front-end of Dynmap, instead of the Java that's working behind the scenes. Minifying CSS and JavaScript files is one thing that should come to mind.

### Installation

_Note that these are the installation instructions for this fork, not the original Dynmap repository_

Because I've been having trouble compiling the Dynmap source, I'm unable to build the entire plugin which would've allowed you (the server admin) to install my fork instead of the actual Dynmap. Nevertheless, you can still install my fork by [downloading it](https://github.com/KenanY/dynmap/downloads). Once you've unzipped the contents, overwrite the `web` folder of your current Dynmap installation (found at `plugins/dynmap`) with the `web` folder of this fork.

## What is Dynmap?

[Dynmap][] was started by k-zed as a plugin for hMod. The plugin was ported to [Bukkit][] soon after Bukkit was released. The current version of Dynmap provides an in-browser map, like [Google Maps][], of your [Minecraft][] world. It updates the map in realtime while you have your browser opened and shows the current players, regions and in-game messages on top of the map. It also allows viewers of the map to chat from within their browser with players in-game.

### Features

* Configurable maps of different types
* Configurable color-schemes
* Realtime players (with portraits) on map
* Mark places that will show on the map
* Two-way chatting through web and Minecraft
* Time on map
* Weather on map

   [Dynmap]: http://forums.bukkit.org/threads/489
   [Bukkit]: http://bukkit.org/
   [Google Maps]: https://maps.google.com/
   [Minecraft]: https://minecraft.net/