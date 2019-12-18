#!/usr/bin/env node
const fs = require('fs')
const haka = require('../index.js')
const code = []
for (const fn in haka) {
  code.push(`window.${fn} = ${haka[fn].toString()}\n`)
}
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

fs.writeFileSync('./dist/haka.js', code.join('\n'))
