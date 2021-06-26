const TicketControl = require('../models/ticket-control');
const tkControl = new TicketControl();

const socketClt = (socket) => { 
    
    socket.on('disconnect', () => { 
    });

    socket.emit('currentTicket', tkControl.end);

    socket.on('nextTicket', (payload, callback) => {
        /* const id = 1234567;
        callback(id);
        socket.broadcast.emit('sendmsg', payload); */

        const next = tkControl.nextTicket();
        callback(next);

        // Notificar existencia de un nuevo ticket pendiente.

    });

    socket.on('attendTicket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                code: false,
                message: 'El escritorio es obligatorio.'
            });
        }

        const ticket = tkControl.attendTicket(desktop);
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