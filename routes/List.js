'use strict';

const handler = function Create(server, cache) {
    server.get('/list', function (req, res, next) {

        res.send(200, cache.keys());

        return next();
    });
}

module.exports = handler;