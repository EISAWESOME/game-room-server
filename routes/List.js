'use strict';

const storageService = require('../services/storageService.js');

const handler = function Create(server) {
    server.get('/list', function (req, res, next) {

    
        let allKeys = storageService.listKeys();
        //let allKeys = cache.keys();

        if(req.query.details) {
            let ret = {};

            allKeys.forEach(k => {

                //ret[k] = cache.get(k);           
                ret[k] = storageService.getKey(k);          
            });

            res.send(200, ret);


            
        } else {
            res.send(200, allKeys);

        }

        return next();
    });
}

module.exports = handler;