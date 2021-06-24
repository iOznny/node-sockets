const socket = io();

// Referencias html
const lOnline = document.querySelector('#lOnline');
const lOffline = document.querySelector('#lOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

// Conectarse
socket.on('connect', () => {
    lOffline.style.display = 'none';
    lOnline.style.display = '';
});

// Desconectar
socket.on('disconnect', () => {
    lOnline.style.display = 'none';
    lOffline.style.display = '';
});

socket.on('sendmsg', (payload) => {
    console.log('SV', payload);
});

btnSend.addEventListener('click', () => {
    const msg = txtMsg.value;

    const payload = {
        msg,
        id: 'dwad'
    }
    socket.emit('sendmsg', payload, (id) => {
        console.log('Desde el SV', id);
    });
});
