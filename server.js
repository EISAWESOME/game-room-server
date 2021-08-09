'use strict';

const restify = require('restify');
const config = require("./config.json")
const corsMiddleware  = require("restify-cors-middleware");

// Logger
const bunyan = require('bunyan');
const log = bunyan.createLogger({
    name: "RoomServer"
});

try {


    const server = restify.createServer({
        name: config.name,
        version: config.version,
        log: log
    });


    const cors = corsMiddleware({
        origins: ["*"],
        allowHeaders: ["Authorization"],
        exposeHeaders: ["Authorization"]
    });

    server.pre(cors.preflight);
    server.use(cors.actual);

    server.use(restify.plugins.bodyParser({
        mapParams: true
    }));
    server.use(restify.plugins.queryParser());

    require('./routes/Hello.js')(server);
    require('./routes/Create.js')(server, config);
    require('./routes/Join.js')(server);
    require('./routes/Details.js')(server);

    require('./routes/List.js')(server);



    server.listen(8080, () => {
        console.log('%s listening at %s', server.name, server.url);
    });



} catch (ex) {
    log.error(ex);
}