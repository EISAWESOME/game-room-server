'use strict';

const storageService = require('../services/storageService.js');

const handler = function Create(server) {
    server.post('/join', function (req, res, next) {


        let body = req.params;

        if (body) {

            let roomInCache = storageService.getRoom(body.roomId)
            //let roomInCache = cache.get(`ROOM_${body.roomId}`);
            if (roomInCache) {

                // Si on trouve la room, on y ajoute les users qui ne sont pas déja présent dans cette room
                let usersNotAlreadyInRoom = body.users.filter(u => !roomInCache.users.some(ru => ru.id === u.id));
                if(usersNotAlreadyInRoom && usersNotAlreadyInRoom.length > 0) {

                    // On check les règles de la room pour savoir si on peut ajouter le/les users

                    let canAddUsers = roomInCache.ruleset.maxRoomCapacity >= usersNotAlreadyInRoom.length + roomInCache.users.length;

                    if(canAddUsers) {
                        roomInCache.users.push(...usersNotAlreadyInRoom);

                        storageService.updateRoom(roomInCache);
                        //cache.set(`ROOM_${roomInCache.id}`, roomInCache)
                        res.send(200, {
                            message : `Users ${usersNotAlreadyInRoom.map(u => u.name).join(', ')} joined the room #${roomInCache.id}`,
                            data : roomInCache
                        });
                    } else {
                        res.send(400, {
                            message: `Room is full, max is ${roomInCache.ruleset.maxRoomCapacity} users.`
                        })
                    }

                } else {
                    res.send(400, {
                        message: "No provided users can join the provided room !"
                    })
                }

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