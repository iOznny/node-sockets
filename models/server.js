const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Routes Path
        this.paths = {}

        // Middleware: Agregan otra funcionalidad la cual siempre se ejecutara al levantar el servidor.
        this.middlewares();

        // Rutas
        this.routes();
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

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
