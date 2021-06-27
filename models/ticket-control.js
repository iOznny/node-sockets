const fs = require('fs');
const path = require('path');

class Ticket {
    constructor(number, window) {
        this.number = number;
        this.window = window;
    }
}

class TicketControl {

    constructor() {
        this.end = 0;
        this.now = new Date().getDate(); 
        this.tickets = [];
        this.finishTickets = [];

        this.init();
    }

    get toJson() {
        return {
            end: this.end,
            now: this.now,
            tickets: this.tickets,
            finishTickets: this.finishTickets
        }
    }

    // Inicializar
    init() {
        const { end, now, tickets, finishTickets } = require('../db/db.json');
    
        if (now === this.now) {
            this.end = end;
            this.tickets = tickets;
            this.finishTickets = finishTickets;
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

    // Siguiente Ticket
    nextTicket() {
        // Incrementamos el ticket
        this.end += 1;

        // Asignamos el nuevo ticket.
        const ticket = new Ticket(this.end, null);
        this.tickets.push(ticket);

        // Guardamos
        this.saveDB();
        return 'Ticket-' + ticket.number;
    }

    // Atender Ticket
    attendTicket(window) {        
        // Sin Tickets 
        if (this.tickets.length === 0) {
            return null;
        }

        // Eliminamos el primer elemento del arreblo (shift)
        const ticket = this.tickets.shift(); //this.tickets[0];        
        ticket.window = window;

        // Agregamos el elemento a la primera posición del arreblo (unshift)
        this.finishTickets.unshift(ticket);

        // Verificar la existencia de 4 tikcets.
        if (this.finishTickets.length > 4) {
            // Eliminar el 5to elemento.
            this.finishTickets.splice(-1, 1);
        }

        // Guardamos
        this.saveDB();
        return ticket;
    }

}

module.exports = TicketControl;