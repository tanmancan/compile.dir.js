compile.dir.js
==============

Handy node script to quickly compile all scripts within a directory using Google's Closure Compiler

Requires [Node.js](http://nodejs.org/), [Closure Compiler](https://developers.google.com/closure/compiler/), and [Java7+](https://www.java.com/en/)

[Download](https://github.com/tanmancan/compile.dir.js/releases/latest)

##Usage

1. Place `compile.dir.js` and `compiler.jar` in the same path as the plugins directory
2. Execute script and pass plugin diretory name as an argument

`node compile.dir.js plugins`

The output file will be named `[plugin directory name].min.js`
