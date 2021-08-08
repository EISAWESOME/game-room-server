'use strict';

const handler = function Create(server, cache) {
    server.get('/list', function (req, res, next) {

        let allKeys = cache.keys();

        if(req.query.details) {
            let ret = {};

            allKeys.forEach(k => {
                ret[k] = cache.get(k);                
            });

            res.send(200, ret);


            
        } else {
            res.send(200, allKeys);

        }

        return next();
    });
}

module.exports = handler;