const socket = io();

// Referencias html
const lOnline = document.querySelector('#lOnline');
const lOffline = document.querySelector('#lOffline');

socket.on('connect', () => {
    console.log('Conn');

    lOffline.style.display = 'none';
    lOnline.style.display = '';
});


socket.on('disconnect', () => {
    console.log('Discnn');

    lOnline.style.display = 'none';
    lOffline.style.display = '';
});