const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const eventAssists = require('../controllers/eventAssists');

router.post("/attendance",eventAssists.checkAssist);

router.get("", eventsController.getEvents);

router.post("", eventsController.createEvent);

router.delete("/attendance",eventAssists.checkAssist)


module.exports = router; 