const db = require('../models');
const { UniqueConstraintError } = require('sequelize')

const getEvents = (req, res) => {
    const location = req.query.lng.toString() + ',' + req.query.lat.toString();
    db.Events.findAll({
        where: {
            location: location,
            title: req.query.title
        }
    }).then(function (items) {
        const events = items
        items.forEach((event, i) => {
            events[i].location = event.location.split(",").map(Number);;
        });
        res.status(200).send({
            page: req.query.page,
            pages: Math.ceil(req.query.limit/10),
            items: events
        })
    })
}
const createEvent = (req, res) => {
    const falseLocation = [2.123123, -2.123123];
    const location = falseLocation.toString();
    db.Events.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        image: req.body.image,
        attendances: req.body.attendances,
        location: location,
        willYouAttend: req.body.willYouAttend

    }).then(submmitedEvent => res.send({
        id: submmitedEvent.id
    })).catch(function (error) {
        console.log(error);
    });
}
module.exports = {
    createEvent,
    getEvents
}