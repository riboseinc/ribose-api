#!/usr/bin/env node

/* jshint esversion: 6, asi: true */
/* globals require, process */

let colors = require("colors")
let drafter = require("drafter.js")
let fs = require("fs")
let glob = require("glob")
let util = require("util")

// Files to validate. Globs like **/*.apib are supported here.
let patterns = ["apiary.apib"]

function main() {
  let files = [].concat(...patterns.map((p) => glob.sync(p, {strict: true})))
  let errs = files.reduce(((acc, f) => validateFile(f) + acc ), 0)

  if (errs > 0) {
    print("There were %d errors or warnings in %d files.\n", errs, files.length)
  } else {
    print("All ok in %d files.\n", errs, files.length)
  }

  process.exit(errs > 0 ? 1 : 0)
}

function validateFile(path) {
  print("Checking %s… ", path)
  let apib = fs.readFileSync(path, "utf8")
  let result = drafter.validateSync(apib)

  if (result) {
    print("FAIL\n".red.bold)
    printErrors(apib, result)
  } else {
    print("OK\n".green)
  }

  return result ? result.content.length : 0
}

function printErrors(apib, parseResult) {
  parseResult.content.forEach(function(problem) {
    let isError = problem.meta.classes.includes("error")
    let severityStr = isError ? "error".yellow : "warning".magenta
    let code = problem.attributes.code
    let description = problem.content
    let location = problem.attributes.sourceMap[0].content[0]
    let line = countNewlines(apib.substr(0, location[0]) + 1)
    let problemStr = apib.substr(...location).trimRight()
    print("  %s code %d in line %d - %s:\n", severityStr, code, line, description)
    print("%s\n", indent(problemStr, "    "))
  })
}

function print(string, ...interpolations) {
  let formatted = util.format(string, ...interpolations)
  process.stdout.write(formatted)
}

function indent(string, indentation) {
  return string.replace(/^(?=.)/gm, indentation)
}

function countNewlines(string) {
  let match = string.match(/\n/g) || []
  return match.length
}

main()
