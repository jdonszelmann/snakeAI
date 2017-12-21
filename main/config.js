var path = require('path')
var argv = require('minimist')(process.argv.slice(2))

module.exports = {
  APP_NAME: 'Snake AI',
  DEBUG: argv.debug
}