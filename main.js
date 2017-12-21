let electron = require('electron')
let path = require('path')
let Menu = electron.Menu
let app = electron.app
let menu = require('./main/menu')
let windows = require('./main/windows')
let int = parseInt

app.on('ready', function () {
	let screenElectron = electron.screen;
	let mainScreen = screenElectron.getPrimaryDisplay();
	let {width, height} = mainScreen.workAreaSize;
	let xoff = mainScreen.size.width - width, yoff=mainScreen.size.height - height;
	Menu.setApplicationMenu(menu)
	windows.create("file://" + path.resolve(__dirname, 'renderer', 'index.html'),
		300,0,
		width-300,height,
		true
	)

	windows.create("file://" + path.resolve(__dirname, 'renderer', 'AI1.html'),
		0,0,
		300,int(height/2),
	)

	windows.create("file://" + path.resolve(__dirname, 'renderer', 'AI2.html'),
		0,int((height/2)+yoff),
		300,int(height/2),
	)
})

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (windows.list.length === 0) windows.create()
})