#!/usr/bin/env node
const fs = require('fs')
const uglify = require('uglify-js')

const code = fs.readFileSync('./index.js', 'utf-8')
  .split('\n')
  .filter(x => !/^module.exports/.test(x))
  .join('\n')

const result = uglify.minify(code)
console.log(result)

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

fs.writeFileSync('./dist/haka-min.js', result.code)