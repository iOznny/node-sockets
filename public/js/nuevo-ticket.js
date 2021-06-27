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
    lblNuevoTicket.innerText = 'Ticket-' + ticket;
});

btnGenerar.addEventListener('click', () => {
    socket.emit('nextTicket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });
});