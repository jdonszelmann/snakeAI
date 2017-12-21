const ipc = require('electron').ipcRenderer


ipc.on('index', (event, message) => {
    console.log(message); // logs out "Hello second window!"
})

function send_message(receiving_window,message){
	ipc.send('message', {receiver:receiving_window,message:message});
}
