const socketClt = (socket) => {
    console.log('Client Conn', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('sendmsg', (payload, callback) => {
        const id = 1234567;
        callback(id);
        socket.broadcast.emit('sendmsg', payload);
    });
}

module.exports = {
    socketClt
}