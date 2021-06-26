// Referencias
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnGenerar = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnGenerar.disabled = false;
});

socket.on('disconnect', () => {
    btnGenerar.disabled = true;
});

socket.on('currentTicket', (ticket) => {
    console.log(ticket);
    lblNuevoTicket.innerText = 'TTUR-' + ticket;
});


btnGenerar.addEventListener('click', () => {
    socket.emit('nextTicket', null, (ticket) => {
        console.log('Desde el server', ticket);
        lblNuevoTicket.innerText = ticket;
    });
});