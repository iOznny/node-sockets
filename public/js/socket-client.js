const socket = io();

// Referencias html
const lOnline = document.querySelector('#lOnline');
const lOffline = document.querySelector('#lOffline');

// Conectarse
socket.on('connect', () => {
    console.log('Conn');

    lOffline.style.display = 'none';
    lOnline.style.display = '';
});

// Desconectar
socket.on('disconnect', () => {
    console.log('Discnn');

    lOnline.style.display = 'none';
    lOffline.style.display = '';
});
