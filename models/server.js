const express = require('express');
const cors = require('cors');
const { socketClt } = require('../controllers/socket');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Routes Path
        this.paths = {}

        // Middleware: Agregan otra funcionalidad la cual siempre se ejecutara al levantar el servidor.
        this.middlewares();

        // Rutas
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Directorio publico.
        this.app.use(express.static('public'));
    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth.routes'));
    }

    sockets() {
        this.io.on('connection', socketClt);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
