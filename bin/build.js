#!/usr/bin/env node

/* jshint esversion: 6, asi: true */
/* globals require, process */

// Basing on examples on https://github.com/jamesramsay/hercule

"use strict"

let hercule = require("hercule")

let input = process.stdin
let output = process.stdout
let transcluder = new hercule.TranscludeStream()

/// Handles transclusion exceptions like dead links
transcluder.on("error", (err) => {
  console.error(err)
  process.exit(1)
})

input.pipe(transcluder).pipe(output)
