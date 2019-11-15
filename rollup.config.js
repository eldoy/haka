const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify-es')

module.exports = {
  input: 'lib/haka.js',
  plugins: [
    uglify()
  ],
  output: {
    file: 'index.js',
    format: 'cjs',
    strict: false
  }
}
