'use strict';

const storageService = require('../services/storageService.js');
const Room = require('../classes/Room');
const User = require('../classes/User');
const {
    v4: uuidv4
} = require('uuid');
const sum = require('hash-sum');
const handler = function Create(server, config) {
    server.post('/create', function (req, res, next) {

        let body = req.params;
        if (body) {

            let gameId = body.gameId;
            // On vérifie si le gameId fournis est valide

            let gameRuleset = config.rulesets.find(rs => rs.gameId === gameId);

            if (gameRuleset) {

                // Crée la room avec le user qui a demandé la creation
                let room = new Room(sum(uuidv4()), gameRuleset, []);

                 // On verifie si le body contient un user
                if (body.user) {
                    // Si oui on l'ajoute a la room
                    let user = new User(body.user.id, body.user.name);
                    room.users.push(user);
                }


                let success = storageService.createRoom(room)
                //let success = cache.set(`ROOM_${room.id}`, room, 10000);

                if (success) {
                    res.send(200, {

                        message: `Room created, id = ${room.id}`,
                        data : room
                    })
                } else {
                    res.send(500, {
                        message: "Something went bad when trying to save room to memory..."
                    });

                    throw 'Error creating room';
                }


            } else {
                res.send(400, {
                    message: "Invalid game id"
                });
            }


        } else {
            res.send(400, {
                message: "Missing body, noob."
            });
        }

        return next();
    });
}

module.exports = handler;