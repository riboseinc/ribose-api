#!/usr/bin/env node

/* jshint esversion: 6, asi: true */
/* globals require, process */

// Basing on examples on https://github.com/jamesramsay/hercule

"use strict"

let findRoot = require("find-root")
let fs = require("fs")
let hercule = require("hercule")
let path = require("path")
let replacestream = require("replacestream")

let resolvers = [
  importFixture,
  hercule.resolveHttpUrl,
  hercule.resolveLocalUrl,
  hercule.resolveString,
]

/// HTML comment, possibly followed by a blank line.
/// Trailing spaces should be removed by Hercule at this point.
let commentRx = /<!--[\s\S]*?-->\n?/g

let projectRoot = findRoot(require.main.filename)
let fixturesRoot = path.join(projectRoot, "fixtures", "spec", "fixtures")

let input = process.stdin
let output = process.stdout
let transcluder = new hercule.TranscludeStream(undefined, { resolvers })
let commentsRemover = replacestream(commentRx, "")

/// Handles transclusion exceptions like dead links
transcluder.on("error", (err) => {
  console.error(err)
  process.exit(1)
})

input.pipe(transcluder).pipe(commentsRemover).pipe(output)

/// Resolves response fixture links like fixture:spaces.json
///
/// Heavily based on:
/// https://github.com/jamesramsay/hercule/blob/24b14ca/src/resolver.js#L24-L34
function importFixture(url, source) {
  let match = url.match("^fixture:(.*)$")

  if (match) {
    let fixturePath = path.join(fixturesRoot, match[1])
    let fixture = fs.createReadStream(fixturePath, {encoding: "utf8"})
    return {content: fixture, url: fixturePath}
  } else {
    return null
  }
}
