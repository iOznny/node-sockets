const TicketControl = require('../models/ticket-control');
const tkControl = new TicketControl();

const socketClt = (socket) => { 
    
    socket.on('disconnect', () => { 
    });

    // Cliente conectado
    socket.emit('currentTicket', tkControl.end);
    socket.emit('statusNow', tkControl.finishTickets);
    socket.emit('ticketsPending', tkControl.tickets.length);

    socket.on('nextTicket', (payload, callback) => {
        const next = tkControl.nextTicket();
        callback(next);

        // Notificar que existe un nuevo ticket pendiente.
        socket.broadcast.emit('ticketsPending', tkControl.tickets.length);
    });

    socket.on('attendTicket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                code: false,
                message: 'El escritorio es obligatorio.'
            });
        }

        const ticket = tkControl.attendTicket(desktop);
        
        // Notificar cambios
        socket.broadcast.emit('statusNow', tkControl.finishTickets);
        socket.emit('ticketsPending', tkControl.tickets.length);
        socket.broadcast.emit('ticketsPending', tkControl.tickets.length);

        if (!ticket) {
            callback({
                code: false,
                message: 'No existen tickets pendientes.'
            });
        } else {
            callback({
                code: true,
                ticket
            });
        }
    });

}

module.exports = {
    socketClt
}