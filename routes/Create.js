'use strict';


const Room = require('../classes/Room');
const User = require('../classes/User');
const {
    v4: uuidv4
} = require('uuid');
const sum = require('hash-sum');
const handler = function Create(server, cache) {
    server.post('/create', function (req, res, next) {

        // On verifie si le body est un user
        let body = req.params;
        if (body) {

            let user = new User(body.id, body.name);

            // Crée la room avec le user qui a demandé la creation
            let room = new Room(sum(uuidv4()), [user]);

            let success = cache.set(`ROOM_${room.id}`, room, 10000);

            if (!success) {

                res.send(500, {message: "Something went bad when trying to save room to memory..."});       

                throw 'Error creating room';
            }

            res.send(200, {message : `Room created, id = ${room.id}`})
            
        } else {
            res.send(400, {message: "Missing body, noob."});       
        }

        return next();
    });
}

module.exports = handler;