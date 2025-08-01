const { readTickets, writeTickets } = require('../models/ticketModel');

exports.getAllTickets = (req, res) => {
    const tickets = readTickets();
    res.json(tickets);
};

exports.getTicketById = (req, res) => {
    const { id } = req.params;
    const tickets = readTickets();
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
};

exports.createTicket = (req, res) => {
    const { title, description, priority, user } = req.body;
    const tickets = readTickets();

    const newTicket = {
        id: Date.now().toString(),
        title,
        description,
        priority,
        user,
        status: 'pending'
    };

    tickets.push(newTicket);
    writeTickets(tickets);
    res.status(201).json(newTicket);
};

exports.updateTicket = (req, res) => {
    const { id } = req.params;
    const { title, description, priority } = req.body;

    const tickets = readTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Ticket not found" });

    if (title) tickets[index].title = title;
    if (description) tickets[index].description = description;
    if (priority) tickets[index].priority = priority;

    writeTickets(tickets);
    res.json(tickets[index]);
};

exports.deleteTicket = (req, res) => {
    const { id } = req.params;
    const tickets = readTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Ticket not found" });

    const removed = tickets.splice(index, 1);
    writeTickets(tickets);
    res.json({ message: "Ticket deleted", ticket: removed[0] });
};

exports.resolveTicket = (req, res) => {
    const { id } = req.params;
    const tickets = readTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Ticket not found" });

    tickets[index].status = 'resolved';
    writeTickets(tickets);
    res.json({ message: "Ticket resolved", ticket: tickets[index] });
};
