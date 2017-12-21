var electron = require('electron')
var path = require('path')
var Menu = electron.Menu
var app = electron.app
var menu = require('./main/menu')
var windows = require('./main/windows')

app.on('ready', function () {
	var screenElectron = electron.screen;
	var mainScreen = screenElectron.getPrimaryDisplay();
	var dimensions = mainScreen.size;
	Menu.setApplicationMenu(menu)
	windows.create("file://" + path.resolve(__dirname, 'renderer', 'index.html'),dimensions.width/2,0,dimensions.width-300,dimensions.height,true)
	windows.create("file://" + path.resolve(__dirname, 'renderer', 'AI1.html'),0,0,300,dimensions.height/2)
	windows.create("file://" + path.resolve(__dirname, 'renderer', 'AI2.html'),0,dimensions.height/2,300,dimensions.height/2)
})

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (windows.list.length === 0) windows.create()
})