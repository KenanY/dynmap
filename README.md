# Dynmap - Realtime Minecraft maps

This is a fork of the [main Dynmap repository](https://github.com/webbukkit/dynmap). Actually, **this isn't 100% true anymore** because the authors of Dynmap have [split](https://github.com/webbukkit/dynmap/commit/fc319a2d32f6d5edecd9b7a287fb71a685495736) the plugin between two repositories: the original and [DynmapCore](https://github.com/webbukkit/DynmapCore). This fork focuses on the web front-end of Dynmap, instead of the Java that's working behind the scenes. Because the web portion of Dynmap is **now** found in DynmapCore, this is now actually a fork of DynmapCore, although it was originally a fork of Dynmap **before** the split.

### What's different?

* Moved `charset` to the top of `index.html` because it should be found in the first [mebibyte][].
* Removed unnecessary whitespace in both `index.html` and the CSS files.
* Moved JavaScript to the bottom of `index.html` so that the page content can load first. Although this is a tile map anyways, it's a habit of mine.
* Use Google CDN's jQuery because it's likely to have been cached previously. Fallback to a local copy if offline as well.
* Combined CSS files so that less files are loaded.
* Minified CSS files to save a few bytes and thus maps load faster.
* Added [normalize.css][] to retain useful browser defaults and include several common fixes to improve cross-browser styling consistency
* Modernizr!

### Installation

_Note that these are the installation instructions for this fork, not the original Dynmap repository_

Because I've been having trouble compiling the Dynmap source, I'm unable to build the entire plugin which would've allowed you (the server admin) to install my fork instead of the actual Dynmap. Nevertheless, you can still install my fork the hard way: 

* I'll assume that you have the [latest recommended build of Bukkit](http://dl.bukkit.org/downloads/craftbukkit/list/rb/), you've installed the latest stable version of Dynmap ([0.34](http://webbukkit.org/jenkins/public/dynmap/dynmap-0.34-bin.zip)) successfully, and that directory your server is located is called `minecraft_server` (this is only for instruction purposes, the directory name doesn't matter to Bukkit)
* [Download my fork](https://github.com/KenanY/dynmap/downloads)
* Unzip the contents
* Copy the contents of the `web` folder (from my fork) into `minecraft_server/plugins/dynmap/web`
* Overwrite anything necessary
* Run your server
* Point your browser to `http://localhost:8123/` (the default Dynmap port is 8123)

If the map is shown properly, then you've done everything correctly. Make sure you're using a **modern web browser**. I personally test my changes on the latest Mozilla Firefox [Nightly](http://nightly.mozilla.org/) build and the latest [Google Chrome][]. This doesn't mean that other browsers won't work, of course. The latest [Safari][], [Opera 11][Opera], and [Internet Explorer][] 7 or higher should all (hopefully) fair well in loading your maps.

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
   [Google Chrome]: http://www.google.com/chrome/
   [Safari]: http://www.apple.com/safari/
   [Opera]: http://www.opera.com/browser/
   [Internet Explorer]: http://www.microsoft.com/windows/internet-explorer/