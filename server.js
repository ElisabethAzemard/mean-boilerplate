/* IMPORTS */

// node modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

// services
const mongoDB = require('./services/db.service');

// main router
const { mainRouter } = require('./routes/main.router');

/* SERVER CONFIGURATION */

// declarations
const server = express();
const port = process.env.PORT;

// definition
class ServerClass {
    init() {
        // view engine configuration
        server.engine('html', ejs.renderFile);
        server.set('view engine', 'html');

        // static path configuration
        server.set('views', __dirname + '/www');
        server.use(express.static(path.join(__dirname, 'www')));

        // use BodyParser to get user body data
        server.use(bodyParser.json({ limit: '10mb' }));
        server.use(bodyParser.urlencoded({ extended: true }));

        // use CookieParser to setup server-side cookies
        server.use(cookieParser(process.env.COOKIE_SECRET));

        // set server main router
        server.use('/', mainRouter);

        // start server
        this.launch();
    };

    launch() {
        // connect to MongoDB
        mongoDB.initClient()
            .then(db => {
                // launch server
                server.listen(port, () => console.log({ db: db, server: `Server is running on port ${port}`}));
            })
            .catch(mongooseError => console.log(mongooseError));
    };
}

/* START SERVER */
new ServerClass().init();
