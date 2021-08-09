'use strict';

const storageService = require('../services/storageService.js');

const handler = function Details(server) {
    server.get('/details/:roomId', function (req, res, next) {


        let requestedRoomId = req.params.roomId;

        if (requestedRoomId) {

            let roomInCache = storageService.getRoom(requestedRoomId);
            //let roomInCache = cache.get(`ROOM_${requestedRoomId}`);
            if (roomInCache) {

                res.send(200, roomInCache);

            } else {
                res.send(400, {
                    message: "This room doesn't exist !"
                })
            }
        }


        return next();
    });
}

module.exports = handler;