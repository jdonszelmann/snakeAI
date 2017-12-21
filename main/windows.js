var electron = require('electron')
var BrowserWindow = electron.BrowserWindow
var ipcMain = electron.ipcMain
var config = require('./config')
var app = electron.app

var list = []

ipcMain.on('create-window', create)
ipcMain.on('message', function(event,arg){
  console.log("forwarding message for "+arg.receiver)
  for(i of list){
   i.webContents.send(arg.receiver, arg.message);
  }
})


function create (url,xpos,ypos,width,height,frame=false) {
  var win = new BrowserWindow({
    title: config.APP_NAME,
    width: width,
    height: height,
    x: xpos,
    y: ypos,
    acceptFirstMouse: true,
    resizable:false,
    frame:frame,
  })

  win.loadURL(url)
  win.setTitle(`${config.APP_NAME} - Window ${win.id}`)
  list.push(win)

  if (config.DEBUG) win.webContents.openDevTools()

  win.webContents.on('did-finish-load', function () {
    win.webContents.send('id', win.id)
  })

  win.on('closed', function () {
    // destroy(win)
    app.quit()
  })
}

function destroy (win) {
  var i = list.indexOf(win)
  if (i > -1) list.splice(i, 1)
  win = null
}

module.exports = { list, create, destroy }