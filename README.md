# Dynmap - Realtime Minecraft maps

## Fork
This is a fork of the [main Dynmap repository](https://github.com/webbukkit/dynmap). This fork focuses on the web front-end of Dynmap, instead of the Java that's working behind the scenes. Minifying CSS and JavaScript files is one thing that should come to mind.

### What's different?
* Moved `charset` to the top of `index.html` because it should be found in the first [mebibyte][] - d09b21a
* Removed unnecessary whitespace in both `index.html` and the CSS files - d09b21a
* Moved JavaScript to the bottom of `index.html` so that the page content can load first. Although this is a tile map anyways, it's part of my personal standards - f5f51cc
* Use Google CDN's jQuery because it's likely to have been cached previously - bc7dead
* Combined CSS files so that less files are loaded - 976a154
* Minified CSS files to save a few bytes and thus maps load faster - 38f4c96
* Added [normalize.css][] to retain useful browser defaults and include several common fixes to improve cross-browser styling consistency - 095a5f8

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
   [normalize.css]: http://necolas.github.com/normalize.css/
   [mebibyte]: https://en.wikipedia.org/wiki/Mebibyte
