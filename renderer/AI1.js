const ipc = require('electron').ipcRenderer


ipc.on('AI1', (event, message) => {
    console.log(message);
})

function send_message(receiving_window,message){
	ipc.send('message', {receiver:receiving_window,message:message});
}
