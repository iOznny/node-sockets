// Referencias
const searchParams = new URLSearchParams(window.location.search);
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblSmall = document.querySelector('small');
const divAlert = document.querySelector('.alert');

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('currentTicket', (ticket) => {
    //lblNuevoTicket.innerText = 'TTUR-' + ticket;
});

btnAttend.addEventListener('click', () => {
    socket.emit('attendTicket', { desktop }, ({ code, ticket }) => {        
        if (!code) {
            lblSmall.innerText = `Nadie`
            return divAlert.style.display = '';
        }

        lblSmall.innerText = `TTUR-${ ticket.number }`


    });
});