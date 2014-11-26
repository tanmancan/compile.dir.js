#!/usr/bin/env node

// Takes javascript files within a directory and compiles them into a single file using Closure Compiler
// Pass single argument as the directory name
// Optional second argument ('java7') to use alternative version of java on OSX if default version is lower then 7
// Required Google Closure Compiler, Nodejs and Java7+

// The MIT License (MIT)

// Copyright (c) 2014 Tanveer Karim
// tkarimdesign.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var child_process = require('child_process');

var compileScript = function(argument) {

    var dir = argument[2];

    //Get list of files within the directory
    var files = fs.readdirSync(dir);

    var fileList = '';

    //Write out list of files
    files.forEach(function(obj) {
        console.log(obj);
        fileList += dir + '/' + obj + ' ';
    });
    console.log(fileList);

    this.init = function() {
        console.log('Initializing...');
        var cmd = 'java -jar compiler.jar --js ' + fileList + ' --js_output_file ' + dir + '.min.js';
        //Use alternate location of Java7+ if the default java command is lower then version 7 (OSX may not allow install of java7 in system)
        var cmdAlt = '/Library/Internet\\ Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/bin/java -jar compiler.jar --js ' + fileList + ' --js_output_file ' + dir + '.min.js';

        if (process.argv[3] == 'java7') {
            //Run alternate java command
            this.runCmd(cmdAlt);
        } else {
            this.runCmd(cmd);
        }

        return this;
    }

    //Run a shell command
    this.runCmd = function(cmd) {
        console.log(cmd);
        exec(cmd, this.puts);
        return this;
    }

    //Command results printout...
    this.puts = function(error, stdout, stderr) {
        sys.puts(stdout);
        if (stderr) console.log(stderr);
        return this;
    }
    this.init();

}


//Check to see if correct arguments were provided
if (process.argv[2]) {
    //Check to see if correct folder is provided
    if (fs.existsSync(process.argv[2])) {
        //Run compiler
        compileScript(process.argv);
    } else {
        //Exit if folder name is incorrect
        console.log('Folder does not exists. Shutting doowwwwnnnnnn...beep');
        process.exit(1);
    }
} else {
    //Exit if argument is missing
    console.log('No folder provided!');
    process.exit(1);
}