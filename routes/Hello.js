'use strict';

const handler = function Hello(server) {
    server.get('/hello', function (req, res, next) {
        res.send("Hello !");
        return next();
    });
}

module.exports = handler;