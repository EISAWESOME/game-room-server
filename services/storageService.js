'use strict';

const NodeCache = require("node-cache");
const serverCache = new NodeCache();


const getRoom = function GetRoom(roomId) {
    return getKey(`ROOM_${roomId}`);
}
const getKey = function GetKey(key) {
    return serverCache.get(key);
}


const updateRoom = function UpdateRoom(room) {
    return serverCache.set(`ROOM_${room.id}`, room);
}

const createRoom = function CreateRoom(room) {
    return serverCache.set(`ROOM_${room.id}`, room, 10000);
}

const listKeys = function ListKeys() {
    return serverCache.keys();
}


module.exports = {
    getRoom,
    getKey,
    
    updateRoom,
    createRoom,
    listKeys,
};