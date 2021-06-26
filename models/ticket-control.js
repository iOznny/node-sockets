const fs = require('fs');
const path = require('path');

class TicketControl {

    constructor() {
        this.end = 0;
        this.now = new Date().getDate(); 
        this.tickets = [];
        this.finishTockets = [];

        this.init();
    }

    get toJson() {
        return {
            end: this.end,
            now: this.now,
            tickets: this.tickets,
            finishTockets: this.finishTockets
        }
    }

    // Inicializar
    init() {
        const { end, now, tickets, finishTockets } = require('../db/db.json');
    
        if (now === this.now) {
            this.end = end;
            this.tickets = tickets;
            this.finishTockets = finishTockets;
        } else {
            // Guardar db.
            this.saveDB();
        }

    }

    // Save DB
    saveDB() {
        const pathDB = path.join(__dirname, '../db/db.json');
        fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
    }

}

module.exports = TicketControl;