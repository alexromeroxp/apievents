const db = require('../models');
const jwt = require('jsonwebtoken');
const key = require('../utils/token');
const validaciones = require('../utils/textoDeValidaciones');

function getToken(userId) {
    const payload = {
        userId:userId
    };
    return jwt.sign(payload, key.key, {
        expiresIn: 60 * 60
    });
}

const authenticate = async (req, res) => {
    console.log(req.body);
    db.Users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        },
    }).then(function (data) {
        if (data) {
            const token = getToken(data.id);
            res.status(200).send({
                id: data.id.toString(),
                firstName: data.firstName,
                lastName: data.lastName,
                token: token
            });
        }
        else
            res.status(400).send(validaciones.credencialesInvalidas);
    }).catch(function (error) {
    });
}

module.exports = {
    authenticate,
}