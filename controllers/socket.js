const TicketControl = require('../models/ticket-control');
const tkControl = new TicketControl();

const socketClt = (socket) => { 
    /* socket.on('disconnect', () => { 
    }); */

    socket.emit('currentTicket', tkControl.end);

    socket.on('nextTicket', (payload, callback) => {
        /* const id = 1234567;
        callback(id);
        socket.broadcast.emit('sendmsg', payload); */

        const next = tkControl.nextTicket();
        callback(next);

        // Notificar existencia de un nuevo ticket pendiente.

    });
}

module.exports = {
    socketClt
}