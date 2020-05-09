const express = require('express');
const app = express();
const db = require('./models');
const events = require('./routes/events');
const users = require('./routes/users');
const images= require('./routes/images')
const jwt = require('jsonwebtoken');
const validaciones = require('./utils/textoDeValidaciones');
const key = require('./utils/token');
const portSocket = 4000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');


//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    if (req.path === "/events/" || req.path === "/images/") {
        const token = req.headers.authorization
        if (!token) {
            console.log("notoken");
            res.status(401).json(validaciones.accesoDenegado);
        }
        else {
            const decoded = jwt.verify(token, key.key, (err, result) => {
                if (err) {
                    res.status(401).json(validaciones.accesoDenegado);
                } else
                    next();
            });
        }
    } else
        next();
});

server.listen(portSocket, () => {
    console.log('Socket listening at portSocket %d', portSocket);
});
io.on('events/', function (socket) {
    socket.emit('events',()=>{
        console.log('hola')
        db.Events.findAll().then(items)
    });
});
//routes
app.use("/events", events);
app.use("/users", users);
app.use("/images",images);


//Starting the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
    });
});
