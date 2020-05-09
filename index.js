const express = require('express');
const app = express();
const db = require('./models');
const events = require('./routes/events');
const users = require('./routes/users');
const jwt = require('jsonwebtoken');
const validaciones = require('./utils/textoDeValidaciones');
const key = require('./utils/token');
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);


//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req);
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

// io.on('events/', function (socket) {
//     socket.emit('events',()=>{
//         db.Events.findAll().then(items)
//     });

// });
//Routes
app.use("/events", events);
app.use("/users", users);


//Starting the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
    });
});
