const db = require('../models');
const {UniqueConstraintError} = require('sequelize')
const validaciones = require('../utils/textoDeValidaciones');

const createUser = (req, res) => {
        console.log(req.body);
        db.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender
        }).then(submitedUser => res.send({id:submitedUser.id.toString()}
        )).catch(function(error){
                if (error instanceof UniqueConstraintError)
                    res.status(403).send(validaciones.cuentaPreviamenteRegistrada);
                else
                    res.status(400).send(validaciones.datosInvalidos);
        });    
}

module.exports = {
    createUser,
}