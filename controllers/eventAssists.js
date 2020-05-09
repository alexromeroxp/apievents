var jwtDecode = require('jwt-decode');
const db = require('../models');
const sequelize = require('sequelize');
const validaciones = require('../utils/textoDeValidaciones');



const getUserId = (token) => jwtDecode(token).userId;

const deleteAssist = (req, res, userId) => {
    db.eventAssists.destroy({
        where:{
            userId:req.query.eventId,
            userId:userId
        }
    }).then((deleteRecord)=>{
        if(deleteRecord===1)
            subAssistanceToEvents(req,res);
        else
            res.status(400).send("Error al eliminar la asistencia dele evento");
    }).catch((err)=>{
        res.status(403).send("Asistencia no registrada anteriormente");
    });
}
const subAssistanceToEvents=(req,res)=>{
    db.Events.update({
        attendances: sequelize.literal('attendances - 1')
    }, {
        where: { id: req.query.eventId },

    }).then(() => {
        db.Events.findByPk(req.query.eventId).then(event => res.send({
            id: req.query.eventId, attendances: event.attendances
        }));
    }).catch((err) => {
        if (err)
            res.status(400).send(validaciones.registroEventoAsistenciaError)
    });
}
const createAssist = (req, res, userId) => {
    db.eventAssists.create({
        eventId: req.query.eventId,
        userId: userId
    }).then((eventAssist) => {
        if (eventAssist) {
            addAssistanceToEvents(req, res, eventAssist);

        }
    }).catch((err) => {
        if (err)
            res.status(400).send(validaciones.registroEventoAsistenciaError);
    });

}
const checkAssist = (req, res) => {
    const userId = getUserId(req.headers.authorization);
    db.eventAssists.findOne({
        where: {
            eventId: req.query.eventId,
            userId: userId
        }
    }).then((eventAssist) => {
        if (eventAssist && req.method === "DELETE")
            deleteAssist(req, res, userId);
        else if(!eventAssist && req.method==="POST")
            createAssist(req, res, userId);
        else if(!eventAssist)
            res.status(404).send("Evento no encontrado")
        else
            res.status(400).send(validaciones.registroEventoAsistenciaError);
    });
}

const addAssistanceToEvents = (req, res, currEventAssist) => {
    db.Events.update({
        attendances: sequelize.literal('attendances + 1')
    }, {
        where: { id: req.query.eventId },

    }).then(() => {
        db.Events.findByPk(req.query.eventId).then(event => res.send({
            id: currEventAssist.eventId, attendances: event.attendances
        }));
    }).catch((err) => {
        if (err)
            res.status(400).send(validaciones.registroEventoAsistenciaError)
    });

}

module.exports =
{
    checkAssist
}