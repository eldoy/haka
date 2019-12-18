#!/usr/bin/env node
const fs = require('fs')
const uglify = require('uglify-js')

if (!fs.existsSync('./dist/haka.js')) {
  console.log("Run 'npm run build' and try again")
} else {
  const code = fs.readFileSync('./dist/haka.js', 'utf-8')
  const result = uglify.minify(code)
  fs.writeFileSync('./dist/haka-min.js', result.code)
}
